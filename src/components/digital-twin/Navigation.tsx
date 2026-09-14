import { Activity, ChartNoAxesCombined, Gauge, Plane, Radar, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", icon: Gauge }, { label: "Engine Twin", icon: Wrench },
  { label: "Telemetry", icon: Activity }, { label: "Fault Analysis", icon: Radar },
  { label: "RUL", icon: ChartNoAxesCombined }, { label: "Mission", icon: ShieldCheck },
];

export function Navigation({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return <aside className="app-nav">
    <div className="brand-mark"><Plane aria-hidden="true" /><span>AT</span></div>
    <nav aria-label="Digital twin sections">{items.map(({ label, icon: Icon }) => <button key={label} type="button" className={cn("nav-item", active === label && "nav-item-active")} onClick={() => onChange(label)} aria-label={label} title={label}><Icon /><span>{label}</span></button>)}</nav>
    <div className="nav-footer"><span className="status-dot status-dot-live" /><span>LIVE SIM</span></div>
  </aside>;
}
