import { mission } from "@/data/mock-engine-data";
import { Plane, ShieldCheck } from "lucide-react";

export function MissionReliability() {
  return <div className="mission-area"><section className="mission-card" aria-labelledby="mission-title">
    <h2 id="mission-title"><Plane />Mission Reliability</h2>
    <div><span><i className="status-dot status-normal" />Engine Health</span><strong>{mission.health}%</strong></div>
    <div><span><i className="status-dot status-caution" />Fault Probability</span><strong>{mission.faultProbability}%</strong></div>
    <div><span><i className="status-dot status-normal" />RUL</span><strong>{mission.rul}</strong></div>
    <div><span><i className="status-dot status-normal" />Mission Risk</span><strong className="value-normal">{mission.risk}</strong></div>
  </section><section className="overall-card"><ShieldCheck /><span>Overall Status</span><strong>CAUTION</strong><p>Monitor cylinder 2 parameters</p></section></div>;
}
