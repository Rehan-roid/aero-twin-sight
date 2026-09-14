import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import engineAsset from "@/assets/twin-piston-engine.glb.asset.json";
import { EngineControls, type CameraView } from "./EngineControls";
import { splitEngineParts, type EngineZone } from "@/lib/engine-parts";
import { Button } from "@/components/ui/button";

const VIEW_POSITIONS: Record<CameraView, THREE.Vector3> = { reset: new THREE.Vector3(5.6, 3.2, 6.4), front: new THREE.Vector3(0, 0.2, 8), side: new THREE.Vector3(8, 0.2, 0), top: new THREE.Vector3(0, 8, 0.01) };
const COMPONENT_FOCUS: Record<string, THREE.Vector3> = {
  assembly: new THREE.Vector3(0, 0, 0),
  "cylinder-1": new THREE.Vector3(-1.25, 0.05, 0),
  "cylinder-2": new THREE.Vector3(1.25, 0.05, 0),
  crankcase: new THREE.Vector3(0, -0.15, 0.15),
  intake: new THREE.Vector3(0, 0.95, -0.1),
  exhaust: new THREE.Vector3(0, -0.35, 0.75),
  sensors: new THREE.Vector3(0, 0.35, 0.35),
};
const ZONE_LABELS: Record<EngineZone, string> = { "cylinder-1": "Cylinder 1", "cylinder-2": "Cylinder 2", crankcase: "Crankcase", intake: "Intake system", exhaust: "Exhaust system" };

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="engine-loader"><div className="loader-rings"><span /><span /><span /></div><strong>Loading Twin-Piston Engine</strong><p>Preparing Digital Twin...</p><div className="loader-progress"><span style={{ width: `${progress}%` }} /></div><small>{Math.round(progress)}%</small></div></Html>;
}

function CameraRig({ position, lookAt, transitionKey, controlsRef }: { position: THREE.Vector3; lookAt: THREE.Vector3; transitionKey: number; controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  const moving = useRef(true);
  useEffect(() => { moving.current = true; }, [transitionKey]);
  useFrame((_, rawDelta) => {
    if (!moving.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const damping = 1 - Math.exp(-5 * delta);
    camera.position.lerp(position, damping);
    controlsRef.current?.target.lerp(lookAt, damping);
    controlsRef.current?.update();
    if (camera.position.distanceTo(position) < 0.015 && (controlsRef.current?.target.distanceTo(lookAt) ?? 0) < 0.015) moving.current = false;
  });
  return null;
}

function EngineModel({ selectedId, hoveredZone, onHover, onSelect, explode }: { selectedId: string; hoveredZone: EngineZone | null; onHover: (zone: EngineZone | null, x?: number, y?: number) => void; onSelect: (id: string) => void; explode: number }) {
  const { scene } = useGLTF(engineAsset.url);
  const groupRef = useRef<THREE.Group>(null);
  const explodeRef = useRef(0);

  const { parts, scale, offset } = useMemo(() => {
    let geometry: THREE.BufferGeometry | null = null;
    scene.traverse((child) => { if (child instanceof THREE.Mesh && !geometry) geometry = child.geometry as THREE.BufferGeometry; });
    if (!geometry) return { parts: [], scale: 1, offset: new THREE.Vector3() };
    const split = splitEngineParts(geometry);
    const bounds = new THREE.Box3();
    split.forEach((part) => { part.geometry.computeBoundingBox(); if (part.geometry.boundingBox) bounds.union(part.geometry.boundingBox); });
    const size = bounds.getSize(new THREE.Vector3());
    return { parts: split, scale: 4.7 / Math.max(size.x, size.y, size.z), offset: bounds.getCenter(new THREE.Vector3()).negate() };
  }, [scene]);

  const materials = useMemo(() => ({
    base: new THREE.MeshStandardMaterial({ color: new THREE.Color("#75848c"), metalness: 0.72, roughness: 0.3 }),
    hover: new THREE.MeshStandardMaterial({ color: new THREE.Color("#8ba5ad"), emissive: new THREE.Color("#356c79"), emissiveIntensity: 0.16, metalness: 0.67, roughness: 0.27 }),
    selected: new THREE.MeshStandardMaterial({ color: new THREE.Color("#82949b"), emissive: new THREE.Color("#2d7180"), emissiveIntensity: 0.2, metalness: 0.68, roughness: 0.28 }),
    caution: new THREE.MeshStandardMaterial({ color: new THREE.Color("#8a847d"), emissive: new THREE.Color("#9a4c16"), emissiveIntensity: 0.24, metalness: 0.65, roughness: 0.3 }),
  }), []);
  useEffect(() => () => { Object.values(materials).forEach((material) => material.dispose()); parts.forEach((part) => part.geometry.dispose()); }, [materials, parts]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    explodeRef.current = THREE.MathUtils.lerp(explodeRef.current, explode, 1 - Math.exp(-6 * delta));
    const group = groupRef.current;
    if (!group) return;
    const amount = explodeRef.current;
    group.children.forEach((child, i) => {
      const part = parts[i];
      if (!part) return;
      child.position.copy(part.explodeOffset).multiplyScalar(amount);
    });
  });

  return <group scale={scale}>
    <group ref={groupRef} position={[offset.x, offset.y, offset.z]}>
      {parts.map((part) => {
        const selected = selectedId === part.zone;
        const material = selected && part.zone === "cylinder-2" ? materials.caution : selected ? materials.selected : hoveredZone === part.zone ? materials.hover : materials.base;
        return <mesh
          key={part.id}
          geometry={part.geometry}
          material={material}
          onPointerMove={(event) => { event.stopPropagation(); onHover(part.zone, event.clientX, event.clientY); }}
          onPointerOut={() => onHover(null)}
          onClick={(event) => { event.stopPropagation(); onSelect(part.zone); }}
        />;
      })}
    </group>
  </group>;
}


export function EngineViewer({ selectedId, onSelectComponent }: { selectedId: string; onSelectComponent: (id: string) => void }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [explode, setExplode] = useState(0);
  const [hovered, setHovered] = useState<{ zone: EngineZone; x: number; y: number } | null>(null);
  const [cameraRequest, setCameraRequest] = useState(() => ({ position: VIEW_POSITIONS.reset.clone(), lookAt: new THREE.Vector3(), key: 0 }));
  const requestCamera = (position: THREE.Vector3, lookAt = new THREE.Vector3()) => setCameraRequest((current) => ({ position: position.clone(), lookAt: lookAt.clone(), key: current.key + 1 }));
  useEffect(() => {
    const focus = COMPONENT_FOCUS[selectedId] ?? COMPONENT_FOCUS.assembly;
    if (!focus) return;
    const distance = selectedId === "assembly" ? 1 : 0.78;
    requestCamera(VIEW_POSITIONS.reset.clone().multiplyScalar(distance).add(focus), focus);
    setAutoRotate(selectedId === "assembly");
  }, [selectedId]);
  const changeView = (next: CameraView) => {
    setAutoRotate(false);
    if (next === "reset") onSelectComponent("assembly");
    requestCamera(VIEW_POSITIONS[next]);
  };
  const resetViewer = () => { setExplode(0); setHovered(null); onSelectComponent("assembly"); requestCamera(VIEW_POSITIONS.reset); };
  const fullscreen = () => { if (containerRef.current?.requestFullscreen) void containerRef.current.requestFullscreen(); };
  return <section className="viewer-shell" ref={containerRef} aria-label="Interactive twin-piston engine model">
    <div className="viewer-title"><div><p className="section-kicker">Asset DT-TPA-01</p><h1>Engine digital twin</h1></div><div className="viewer-live"><span />SYNCHRONIZED <small>DEMO</small></div></div>
    <div className="canvas-wrap">
      <Canvas dpr={[1, 1.5]} camera={{ position: [5.6, 3.2, 6.4], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onPointerMissed={() => { setHovered(null); onSelectComponent("assembly"); }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 7, 5]} intensity={3.2} />
        <directionalLight position={[-5, 1, -3]} intensity={1.8} color="#a9d4dd" />
        <Environment resolution={128}><Lightformer intensity={4} position={[0, 5, 2]} scale={[8, 8, 1]} /><Lightformer intensity={2} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} /></Environment>
        <Suspense fallback={<Loader />}><EngineModel selectedId={selectedId} hoveredZone={hovered?.zone ?? null} onHover={(zone, x = 0, y = 0) => setHovered(zone ? { zone, x, y } : null)} onSelect={onSelectComponent} explode={explode / 100} /></Suspense>
        <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.075} rotateSpeed={0.62} zoomSpeed={0.7} panSpeed={0.55} minDistance={3.8} maxDistance={13} autoRotate={autoRotate} autoRotateSpeed={0.7} />
        <CameraRig position={cameraRequest.position} lookAt={cameraRequest.lookAt} transitionKey={cameraRequest.key} controlsRef={controlsRef} />
      </Canvas>
      {hovered && <div className="engine-tooltip" style={{ left: hovered.x, top: hovered.y }}>{ZONE_LABELS[hovered.zone]}<small>Click to inspect</small></div>}
      <div className="reticle" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="engine-zone-tag zone-left"><i />CYL 01 <b>NORMAL</b></div>
      <button type="button" className="engine-zone-tag zone-right" onClick={() => onSelectComponent("cylinder-2")}><i />CYL 02 <b>CAUTION</b></button>
    </div>
    <EngineControls autoRotate={autoRotate} onAutoRotate={() => setAutoRotate((v) => !v)} onView={changeView} onFullscreen={fullscreen} assembledOnly={explode === 0} />
    <div className="explode-bar">
      <div><span>Assembly separation</span><small>{explode === 0 ? "Complete engine" : `Controlled separation ${explode}%`}</small></div>
      <input type="range" min="0" max="100" value={explode} onChange={(event) => setExplode(Number(event.target.value))} aria-label="Exploded view amount" />
      <div className="explode-actions"><Button variant={explode === 0 ? "command" : "instrument"} size="sm" onClick={() => setExplode(0)}>Assemble</Button><Button variant={explode > 0 ? "command" : "instrument"} size="sm" onClick={() => setExplode(100)}>Explode</Button><Button variant="ghost" size="sm" onClick={resetViewer}>Reset</Button></div>
    </div>
  </section>;
}

useGLTF.preload(engineAsset.url);
