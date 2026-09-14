import { ChevronRight, Cpu, TriangleAlert } from "lucide-react";
import type { EngineComponent } from "@/types/digital-twin";
import { StatusIndicator } from "./StatusIndicator";

export function ComponentInfoPanel({ component, components, onSelect }: { component: EngineComponent; components: EngineComponent[]; onSelect: (id: string) => void }) {
  return <aside className="detail-panel">
    <div className="panel-heading"><div><p className="section-kicker">Selected monitor zone</p><h2>{component.name}</h2></div><StatusIndicator status={component.status} /></div>
    {component.id === "cylinder-2" && <div className="warning-note"><TriangleAlert /><div><strong>Thermal deviation detected</strong><span>CHT is 12% above the recent baseline.</span></div></div>}
    <p className="component-description">{component.description}</p>
    <div className="function-block"><span>Function</span><p>{component.function}</p></div>
    <div className="parameter-list">{component.parameters.map((item) => <div key={item.label}><span>{item.label}</span><strong className={item.status === "caution" ? "value-caution" : ""}>{item.value}</strong></div>)}</div>
    <div className="health-block"><div><span>Component health</span><strong>{component.health}%</strong></div><div className="health-track"><span style={{ width: `${component.health}%` }} /></div><div className="fault-line"><span>Predicted fault probability</span><strong>{component.faultProbability}%</strong></div></div>
    <div className="component-list-heading"><Cpu /><span>Monitored zones</span><small>DEMO</small></div>
    <div className="component-list">{components.filter((item) => item.id !== "assembly").map((item) => <button type="button" key={item.id} onClick={() => onSelect(item.id)} data-active={item.id === component.id}><span className={`status-dot status-${item.status}`} /><span>{item.shortName}</span><small>{item.health}%</small><ChevronRight /></button>)}</div>
    <p className="model-caveat">Sensor zones use mock associations. Individual geometry selection requires the component-separated GLB.</p>
  </aside>;
}
