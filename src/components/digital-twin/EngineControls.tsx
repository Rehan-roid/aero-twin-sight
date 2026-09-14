import { Box, Expand, Focus, Pause, Play, Rotate3D, ScanLine, View } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CameraView = "reset" | "front" | "side" | "top";
export function EngineControls({ autoRotate, onAutoRotate, onView, onFullscreen, assembledOnly }: { autoRotate: boolean; onAutoRotate: () => void; onView: (view: CameraView) => void; onFullscreen: () => void; assembledOnly: boolean }) {
  return <div className="viewer-controls" aria-label="Engine viewer controls">
    <div className="control-cluster">
      <Button variant="instrument" size="compactIcon" onClick={onAutoRotate} title={autoRotate ? "Pause auto rotation" : "Start auto rotation"} aria-label={autoRotate ? "Pause auto rotation" : "Start auto rotation"}>{autoRotate ? <Pause /> : <Play />}</Button>
      <Button variant="instrument" size="compactIcon" onClick={() => onView("reset")} title="Reset camera" aria-label="Reset camera"><Focus /></Button>
      <Button variant="instrument" size="compactIcon" onClick={() => onView("front")} title="Front view" aria-label="Front view"><View /></Button>
      <Button variant="instrument" size="compactIcon" onClick={() => onView("side")} title="Side view" aria-label="Side view"><Rotate3D /></Button>
      <Button variant="instrument" size="compactIcon" onClick={() => onView("top")} title="Top view" aria-label="Top view"><ScanLine /></Button>
      <Button variant="instrument" size="compactIcon" onClick={onFullscreen} title="Fullscreen" aria-label="Fullscreen"><Expand /></Button>
    </div>
    <div className="interaction-hint"><Box /><span>Drag to rotate · Scroll to zoom · Right-drag to pan</span></div>
    {assembledOnly && <span className="assembly-chip">ASSEMBLED MODEL</span>}
  </div>;
}
