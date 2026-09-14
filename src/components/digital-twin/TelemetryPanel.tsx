import type { TelemetryMetric } from "@/types/digital-twin";

function Sparkline({ points, caution }: { points: number[]; caution: boolean }) {
  const min = Math.min(...points), max = Math.max(...points), span = max - min || 1;
  const coords = points.map((v, i) => `${(i / (points.length - 1)) * 100},${30 - ((v - min) / span) * 24}`).join(" ");
  return <svg className={caution ? "sparkline sparkline-caution" : "sparkline"} viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 31 H100" /><polyline points={coords} /></svg>;
}

export function TelemetryPanel({ telemetry }: { telemetry: TelemetryMetric[] }) {
  return <section className="telemetry-band" aria-labelledby="telemetry-title">
    <div className="telemetry-title"><div><p className="section-kicker">Demo telemetry · 60 sec</p><h2 id="telemetry-title">Engine parameters</h2></div><span>MOCK DATA</span></div>
    <div className="telemetry-grid">{telemetry.map((metric) => <article className="telemetry-cell" key={metric.id}><div className="metric-head"><span>{metric.label}</span><i className={`status-${metric.status}`} /></div><div className="metric-value"><strong>{metric.value}</strong><span>{metric.unit}</span></div><Sparkline points={metric.trend} caution={metric.status === "caution"} /></article>)}</div>
  </section>;
}
