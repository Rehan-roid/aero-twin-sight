import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bell, CircleHelp, Clock3 } from "lucide-react";
import { Navigation } from "@/components/digital-twin/Navigation";
import { EngineViewer } from "@/components/digital-twin/EngineViewer";
import { ComponentInfoPanel } from "@/components/digital-twin/ComponentInfoPanel";
import { MissionReliability } from "@/components/digital-twin/MissionReliability";
import { TelemetryPanel } from "@/components/digital-twin/TelemetryPanel";
import { engineComponents, telemetry } from "@/data/mock-engine-data";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [
    { title: "AeroTwin — Engine Digital Twin" },
    { name: "description", content: "Interactive twin-piston aero-engine health and mission reliability demonstrator." },
    { property: "og:title", content: "AeroTwin — Engine Digital Twin" },
    { property: "og:description", content: "Interactive twin-piston aero-engine health and mission reliability demonstrator." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const [active, setActive] = useState("Engine Twin");
  const [selectedId, setSelectedId] = useState("cylinder-2");
  const selected = useMemo(() => engineComponents.find((item) => item.id === selectedId) ?? engineComponents[0], [selectedId]);
  if (!selected) return null;
  return <main className="digital-twin-app">
    <Navigation active={active} onChange={setActive} />
    <div className="workspace">
      <header className="topbar">
        <div><div className="product-name"><span>AERO</span>TWIN <small>SIH26054</small></div><p>MALE UAV propulsion health intelligence</p></div>
        <div className="topbar-meta"><span><Clock3 />MISSION T+ 04:27:18</span><button type="button" title="Alerts" aria-label="Alerts"><Bell /><i /></button><button type="button" title="Help" aria-label="Help"><CircleHelp /></button><div className="operator"><strong>VK</strong><span>Vehicle 04<small>FLIGHT DEMO</small></span></div></div>
      </header>
      <div className="main-grid">
        <EngineViewer selectedId={selectedId} onSelectComponent={setSelectedId} />
        <ComponentInfoPanel component={selected} components={engineComponents} onSelect={setSelectedId} />
      </div>
      <MissionReliability />
      <TelemetryPanel telemetry={telemetry} />
      <footer><span>FRONTEND DEMONSTRATOR · MOCK TELEMETRY</span><span>MODEL QUALITY <b>97.4%</b> · LAST UPDATE <b>18 ms</b></span></footer>
    </div>
  </main>;
}
