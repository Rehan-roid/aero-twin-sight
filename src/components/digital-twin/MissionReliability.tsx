import { mission } from "@/data/mock-engine-data";
import { StatusIndicator } from "./StatusIndicator";

export function MissionReliability() {
  return <section className="mission-strip" aria-labelledby="mission-title">
    <div><p className="section-kicker">Mission reliability</p><h2 id="mission-title">Flight readiness</h2></div>
    <div className="mission-stat"><span>Health</span><strong>{mission.health}%</strong></div>
    <div className="mission-stat"><span>Fault probability</span><strong>{mission.faultProbability}%</strong></div>
    <div className="mission-stat"><span>Estimated RUL</span><strong>{mission.rul}</strong></div>
    <div className="mission-stat"><span>Mission risk</span><strong>{mission.risk}</strong></div>
    <StatusIndicator status={mission.status} label="CAUTION" />
  </section>;
}
