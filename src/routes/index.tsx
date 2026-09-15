import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plane, Sun } from "lucide-react";
import { Navigation } from "@/components/digital-twin/Navigation";
import { EngineViewer } from "@/components/digital-twin/EngineViewer";
import { ComponentInfoPanel } from "@/components/digital-twin/ComponentInfoPanel";
import { MissionReliability } from "@/components/digital-twin/MissionReliability";
import { TelemetryPanel } from "@/components/digital-twin/TelemetryPanel";
import { engineComponents, telemetry } from "@/data/mock-engine-data";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Twin-Piston Digital Twin | Prometheon" },
    { name: "description", content: "AI-enabled aircraft engine health monitoring, fault prediction, and mission reliability dashboard." },
    { property: "og:title", content: "Twin-Piston Digital Twin | Prometheon" },
    { property: "og:description", content: "Interactive aircraft engine health and mission reliability dashboard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const [active, setActive] = useState("Engine Twin");
  const [selectedId, setSelectedId] = useState("cylinder-2");
  const selected = useMemo(() => engineComponents.find((item) => item.id === selectedId) ?? engineComponents[1], [selectedId]);
  if (!selected) return null;
  return (
    <main className="digital-twin-app">
      <Navigation active={active} onChange={setActive} />
      <div className="workspace">
        <header className="topbar">
          <div className="page-title"><h1>Twin-Piston Digital Twin</h1><p>AI-Enabled Health Monitoring <i /> Fault Prediction <i /> Mission Reliability</p></div>
          <div className="topbar-status">
            <div className="engine-online"><i /><span><strong>Engine Online</strong><small>MALE UAV – Twin Piston</small></span></div>
            <div className="mission-ready"><Plane /><span><strong>Mission Ready</strong><small>All systems nominal (demo)</small></span></div>
            <div className="weather"><Sun /><span><strong>24°C</strong><small>Clear</small></span></div>
          </div>
        </header>
        <div className="main-grid"><EngineViewer selectedId={selectedId} onSelectComponent={setSelectedId} /><ComponentInfoPanel component={selected} components={engineComponents} onSelect={setSelectedId} /></div>
        <div className="bottom-grid"><TelemetryPanel telemetry={telemetry} /><MissionReliability /></div>
      </div>
    </main>
  );
}
