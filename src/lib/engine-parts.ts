import * as THREE from "three";

export type EngineZone = "cylinder-1" | "cylinder-2" | "crankcase" | "intake" | "exhaust";

export type EnginePart = {
  id: string;
  geometry: THREE.BufferGeometry;
  center: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  zone: EngineZone;
  triangles: number;
};

const ZONE_OFFSETS: Record<EngineZone, THREE.Vector3> = {
  "cylinder-1": new THREE.Vector3(-0.34, 0.015, 0),
  "cylinder-2": new THREE.Vector3(0.34, 0.015, 0),
  crankcase: new THREE.Vector3(0, 0, 0),
  intake: new THREE.Vector3(0, 0.26, -0.025),
  exhaust: new THREE.Vector3(0, -0.08, 0.24),
};

/**
 * The uploaded GLB is a single combined mesh, but its triangles form many
 * disconnected shells (one per real engine part). We split them by welded
 * vertex connectivity so the viewer can move each part independently for the
 * exploded animation. Runs once per model load and is cached by the caller.
 */
export function splitEngineParts(source: THREE.BufferGeometry): EnginePart[] {
  const position = source.getAttribute("position") as THREE.BufferAttribute;
  const normal = source.getAttribute("normal") as THREE.BufferAttribute | undefined;
  const index = source.getIndex();
  const triangleCount = index ? index.count / 3 : position.count / 3;
  const vertexOf = (t: number, corner: number) => (index ? index.getX(t * 3 + corner) : t * 3 + corner);

  // Weld coincident vertices so separate triangles of the same shell connect.
  const weld = new Map<string, number>();
  const parent = new Int32Array(position.count);
  for (let i = 0; i < position.count; i += 1) {
    const key = `${Math.round(position.getX(i) * 1e4)},${Math.round(position.getY(i) * 1e4)},${Math.round(position.getZ(i) * 1e4)}`;
    const existing = weld.get(key);
    if (existing === undefined) {
      weld.set(key, i);
      parent[i] = i;
    } else {
      parent[i] = existing;
    }
  }
  const find = (x: number): number => {
    let root = x;
    let up = parent[root] as number;
    while (up !== root) {
      const grand = parent[up] as number;
      parent[root] = grand;
      root = up;
      up = parent[root] as number;
    }
    return root;
  };
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  };
  for (let t = 0; t < triangleCount; t += 1) {
    const a = vertexOf(t, 0);
    const b = vertexOf(t, 1);
    const c = vertexOf(t, 2);
    union(a, b);
    union(b, c);
  }

  const buckets = new Map<number, number[]>();
  for (let t = 0; t < triangleCount; t += 1) {
    const root = find(vertexOf(t, 0));
    const bucket = buckets.get(root);
    if (bucket) bucket.push(t);
    else buckets.set(root, [t]);
  }

  const parts: EnginePart[] = [];
  let n = 0;
  buckets.forEach((triangles) => {
    const positions = new Float32Array(triangles.length * 9);
    const normals = normal ? new Float32Array(triangles.length * 9) : null;
    const box = new THREE.Box3();
    const point = new THREE.Vector3();
    triangles.forEach((t, ti) => {
      for (let corner = 0; corner < 3; corner += 1) {
        const v = vertexOf(t, corner);
        const offset = ti * 9 + corner * 3;
        point.set(position.getX(v), position.getY(v), position.getZ(v));
        positions[offset] = point.x;
        positions[offset + 1] = point.y;
        positions[offset + 2] = point.z;
        if (normals && normal) {
          normals[offset] = normal.getX(v);
          normals[offset + 1] = normal.getY(v);
          normals[offset + 2] = normal.getZ(v);
        }
        box.expandByPoint(point);
      }
    });
    const size = box.getSize(new THREE.Vector3());
    // Drop the flat backdrop slab that spans the whole model width.
    if (size.x > 1.2) return;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    if (normals) geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    else geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    const center = box.getCenter(new THREE.Vector3());
    n += 1;
    parts.push({
      id: `part-${n}`,
      geometry,
      center,
      explodeOffset: new THREE.Vector3(),
      zone: "crankcase",
      triangles: triangles.length,
    });
  });

  const retainedBounds = new THREE.Box3();
  parts.forEach((part) => retainedBounds.expandByPoint(part.center));
  const assemblyCenter = retainedBounds.getCenter(new THREE.Vector3());
  const halfSize = retainedBounds.getSize(new THREE.Vector3()).multiplyScalar(0.5);

  // The source is one mesh, so assign its disconnected shells to broad spatial
  // monitor zones. Every shell in a zone follows one restrained mechanical axis.
  parts.forEach((part) => {
    const relative = part.center.clone().sub(assemblyCenter);
    const nx = relative.x / Math.max(halfSize.x, 0.001);
    const ny = relative.y / Math.max(halfSize.y, 0.001);
    const nz = relative.z / Math.max(halfSize.z, 0.001);
    if (ny > 0.5 && Math.abs(nx) < 0.58) part.zone = "intake";
    else if (nx < -0.34) part.zone = "cylinder-1";
    else if (nx > 0.34) part.zone = "cylinder-2";
    else if (nz > 0.38 && ny < 0.3) part.zone = "exhaust";
    else part.zone = "crankcase";
    part.explodeOffset.copy(ZONE_OFFSETS[part.zone]);
  });

  return parts.sort((a, b) => b.triangles - a.triangles);
}
