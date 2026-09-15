import { Activity, ChartNoAxesCombined, Gauge, House, Plane, Radar, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", icon: House }, { label: "Engine Twin", icon: Wrench },
  { label: "Telemetry", icon: Activity }, { label: "Fault Analysis", icon: Radar },
  { label: "RUL", icon: ChartNoAxesCombined }, { label: "Mission Reliability", icon: ShieldCheck },
];

export function Navigation({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return <aside className="app-nav">
    <div className="brand-lockup"><Plane aria-hidden="true" /><div><strong>Prometheon</strong><small>SIH 26054</small></div></div>
    <nav aria-label="Digital twin sections">{items.map(({ label, icon: Icon }) => <button key={label} type="button" className={cn("nav-item", active === label && "nav-item-active")} onClick={() => onChange(label)} aria-label={label} title={label}><Icon /><span>{label}</span></button>)}</nav>
    <div className="nav-footer"><span>Smarter Engines</span><strong>Safer Missions</strong><i /></div>
  </aside>;
}
