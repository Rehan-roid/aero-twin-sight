import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import engineAsset from "@/assets/twin-piston-engine.glb.asset.json";
import { EngineControls, type CameraView } from "./EngineControls";

const VIEW_POSITIONS: Record<CameraView, THREE.Vector3> = { reset: new THREE.Vector3(5.6, 3.2, 6.4), front: new THREE.Vector3(0, 0.2, 8), side: new THREE.Vector3(8, 0.2, 0), top: new THREE.Vector3(0, 8, 0.01) };

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="engine-loader"><div className="loader-rings"><span /><span /><span /></div><strong>Loading Twin-Piston Engine</strong><p>Preparing Digital Twin...</p><div className="loader-progress"><span style={{ width: `${progress}%` }} /></div><small>{Math.round(progress)}%</small></div></Html>;
}

function CameraRig({ targetView, controlsRef }: { targetView: CameraView; controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  const targetPosition = useMemo(() => VIEW_POSITIONS[targetView].clone(), [targetView]);
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (camera.position.distanceTo(targetPosition) > 0.02) {
      camera.position.lerp(targetPosition, 1 - Math.exp(-5 * delta));
      camera.lookAt(0, 0, 0);
      controlsRef.current?.target.lerp(new THREE.Vector3(0, 0, 0), 1 - Math.exp(-5 * delta));
      controlsRef.current?.update();
    }
  });
  return null;
}

function EngineModel({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  const { scene } = useGLTF(engineAsset.url);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!child.geometry.attributes.normal) child.geometry.computeVertexNormals();
        child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color("#75848c"), metalness: 0.72, roughness: 0.3, emissive: new THREE.Color(selected ? "#9a4c16" : "#000000"), emissiveIntensity: selected ? 0.12 : 0 });
      }
    });
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    clone.scale.setScalar(4.7 / Math.max(size.x, size.y, size.z));
    const scaled = new THREE.Box3().setFromObject(clone);
    const center = scaled.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    return clone;
  }, [scene, selected]);
  return <primitive object={object} onClick={(event: { stopPropagation: () => void }) => { event.stopPropagation(); onSelect(); }} />;
}

export function EngineViewer({ selectedId, onSelectAssembly }: { selectedId: string; onSelectAssembly: () => void }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [view, setView] = useState<CameraView>("reset");
  const [explode, setExplode] = useState(0);
  useEffect(() => { if (view !== "reset") setAutoRotate(false); }, [view]);
  const changeView = (next: CameraView) => { setView(next); window.setTimeout(() => setView("reset"), 1200); };
  const fullscreen = () => { if (containerRef.current?.requestFullscreen) void containerRef.current.requestFullscreen(); };
  return <section className="viewer-shell" ref={containerRef} aria-label="Interactive twin-piston engine model">
    <div className="viewer-title"><div><p className="section-kicker">Asset DT-TPA-01</p><h1>Engine digital twin</h1></div><div className="viewer-live"><span />SYNCHRONIZED <small>DEMO</small></div></div>
    <div className="canvas-wrap">
      <Canvas dpr={[1, 1.5]} camera={{ position: [5.6, 3.2, 6.4], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onPointerMissed={onSelectAssembly}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 7, 5]} intensity={3.2} />
        <directionalLight position={[-5, 1, -3]} intensity={1.8} color="#a9d4dd" />
        <Environment resolution={128}><Lightformer intensity={4} position={[0, 5, 2]} scale={[8, 8, 1]} /><Lightformer intensity={2} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} /></Environment>
        <Suspense fallback={<Loader />}><EngineModel selected={selectedId === "assembly"} onSelect={onSelectAssembly} /></Suspense>
        <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.075} rotateSpeed={0.62} zoomSpeed={0.7} panSpeed={0.55} minDistance={3.8} maxDistance={13} autoRotate={autoRotate} autoRotateSpeed={0.7} />
        <CameraRig targetView={view} controlsRef={controlsRef} />
      </Canvas>
      <div className="reticle" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="engine-zone-tag zone-left"><i />CYL 01 <b>NORMAL</b></div>
      <button type="button" className="engine-zone-tag zone-right" onClick={() => onSelectAssembly()}><i />CYL 02 <b>CAUTION</b></button>
    </div>
    <EngineControls autoRotate={autoRotate} onAutoRotate={() => setAutoRotate((v) => !v)} onView={changeView} onFullscreen={fullscreen} assembledOnly />
    <div className="explode-bar"><div><span>Exploded assembly</span><small>Component-separated GLB required</small></div><input type="range" min="0" max="100" value={explode} onChange={(event) => setExplode(Number(event.target.value))} disabled aria-label="Exploded view amount" /><button type="button" disabled>EXPLORE ENGINE</button></div>
  </section>;
}

useGLTF.preload(engineAsset.url);
