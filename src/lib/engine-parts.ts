import * as THREE from "three";

export type EnginePart = {
  id: string;
  geometry: THREE.BufferGeometry;
  center: THREE.Vector3;
  direction: THREE.Vector3;
  triangles: number;
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
    while (parent[root] !== root) {
      parent[root] = parent[parent[root]];
      root = parent[root];
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
      direction: center.clone(),
      triangles: triangles.length,
    });
  });

  // Explode outward from the assembly centre, mechanically consistent per part.
  const assemblyCenter = new THREE.Vector3();
  parts.forEach((part) => assemblyCenter.add(part.center));
  assemblyCenter.divideScalar(Math.max(parts.length, 1));
  parts.forEach((part) => {
    const direction = part.center.clone().sub(assemblyCenter);
    direction.y *= 1.6;
    if (direction.lengthSq() < 1e-6) direction.set(0, 1, 0);
    part.direction = direction.normalize();
  });

  return parts.sort((a, b) => b.triangles - a.triangles);
}
