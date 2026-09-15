import { Box, X } from "lucide-react";
import { useState, type CSSProperties } from "react";
import type { EngineComponent } from "@/types/digital-twin";
import { StatusIndicator } from "./StatusIndicator";

export function ComponentInfoPanel({ component }: { component: EngineComponent; components: EngineComponent[]; onSelect: (id: string) => void }) {
  const [tab, setTab] = useState("Overview");
  return <aside className="detail-panel">
    <div className="drawer-title"><strong>Component Intelligence</strong><X aria-label="Close panel" /></div>
    <div className="panel-heading"><div className="component-icon"><Box /></div><h2>{component.name}</h2><StatusIndicator status={component.status} /></div>
    <div className="panel-tabs">{["Overview", "Parameters", "History"].map((name) => <button type="button" data-active={tab === name} onClick={() => setTab(name)} key={name}>{name}</button>)}</div>
    {tab === "Overview" && <>
      <div className="component-summary"><div className="component-thumb"><Box /></div><div><span>Function</span><p>{component.function}</p></div></div>
      <section className="parameter-section"><h3>Current Parameters</h3><div className="parameter-list">{component.parameters.map((item) => <div key={item.label}><span>{item.label}</span><strong className={item.status === "caution" ? "value-caution" : ""}>{item.value}<i className={`status-dot status-${item.status ?? "normal"}`} /></strong></div>)}</div></section>
    </>}
    {tab === "Parameters" && <div className="tab-copy"><strong>Live sensor envelope</strong><p>Thermal, vibration, and health channels update against the demo operating baseline.</p></div>}
    {tab === "History" && <div className="tab-copy"><strong>Recent trend</strong><p>Cylinder temperature has increased by 3% over the current mission window.</p></div>}
    <section className="engine-health"><h3>Engine Health</h3><div className="health-layout"><div className="health-gauge" style={{ "--health": "87%" } as CSSProperties}><span>87%</span></div><div className="health-metrics"><div><span>Status</span><strong className="value-caution">CAUTION</strong></div><div><span>Anomaly Score</span><strong>0.18</strong></div><div><span>Fault Probability</span><strong>12%</strong></div><div><span>RUL</span><strong>184 h</strong></div><div><span>Mission Risk</span><strong className="value-normal">LOW</strong></div></div></div></section>
  </aside>;
}
