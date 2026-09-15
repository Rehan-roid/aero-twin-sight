import type { EngineComponent, TelemetryMetric } from "@/types/digital-twin";

export const engineComponents: EngineComponent[] = [
  { id: "assembly", name: "Twin-Piston Assembly", shortName: "Full assembly", description: "Complete air-cooled twin-piston aircraft engine digital twin.", function: "Converts fuel energy into reliable propulsive shaft power.", health: 87, status: "caution", faultProbability: 12, parameters: [{ label: "Speed", value: "2,850 rpm" }, { label: "Oil pressure", value: "4.8 bar" }, { label: "Vibration", value: "2.1 mm/s" }] },
  { id: "cylinder-1", name: "Cylinder 01", shortName: "CYL 01", description: "Primary combustion chamber and piston housing.", function: "Combustion chamber and piston housing for cylinder 1.", health: 94, status: "normal", faultProbability: 6, parameters: [{ label: "CHT", value: "178 °C" }, { label: "EGT", value: "642 °C" }, { label: "Vibration", value: "Normal" }] },
  { id: "cylinder-2", name: "Cylinder 02", shortName: "CYL 02", description: "Monitored combustion chamber showing an elevated thermal signature.", function: "Combustion chamber and piston housing for cylinder 2.", health: 86, status: "caution", faultProbability: 12, parameters: [{ label: "CHT", value: "182 °C", status: "caution" }, { label: "EGT", value: "658 °C", status: "caution" }, { label: "Vibration", value: "Normal" }, { label: "Health", value: "86%", status: "caution" }, { label: "Status", value: "CAUTION", status: "caution" }] },
  { id: "crankcase", name: "Crankcase", shortName: "CASE", description: "Structural enclosure and bearing support for the rotating assembly.", function: "Maintains alignment and distributes mechanical loads.", health: 91, status: "normal", faultProbability: 8, parameters: [{ label: "Oil temp", value: "96 °C" }, { label: "Case pressure", value: "1.02 bar" }, { label: "Vibration", value: "Normal" }] },
  { id: "intake", name: "Intake System", shortName: "INTAKE", description: "Air induction path for both cylinders.", function: "Meters and distributes combustion air.", health: 89, status: "normal", faultProbability: 9, parameters: [{ label: "Manifold", value: "28.4 inHg" }, { label: "Air temp", value: "31 °C" }, { label: "Flow", value: "Balanced" }] },
  { id: "exhaust", name: "Exhaust System", shortName: "EXHAUST", description: "High-temperature gas evacuation assembly.", function: "Routes combustion gases away with minimal back pressure.", health: 85, status: "normal", faultProbability: 12, parameters: [{ label: "EGT mean", value: "665 °C" }, { label: "Delta EGT", value: "46 °C", status: "caution" }, { label: "Leak", value: "None" }] },
  { id: "sensors", name: "Sensor Network", shortName: "SENSORS", description: "Virtual representation of thermal, pressure and vibration sensing.", function: "Supplies condition data to the monitoring model.", health: 98, status: "normal", faultProbability: 2, parameters: [{ label: "Online", value: "12 / 12" }, { label: "Latency", value: "18 ms" }, { label: "Confidence", value: "97.4%" }] },
];

export const telemetry: TelemetryMetric[] = [
  { id: "rpm", label: "RPM", value: "2,850", unit: "rpm", status: "normal", trend: [72, 70, 76, 74, 82, 80, 86, 82, 88, 84, 91, 87] },
  { id: "egt", label: "EGT", value: "642", unit: "°C", status: "normal", trend: [62, 65, 64, 70, 68, 72, 69, 75, 70, 76, 72, 80] },
  { id: "cht", label: "CHT", value: "178", unit: "°C", status: "normal", trend: [60, 67, 65, 72, 70, 69, 76, 72, 78, 74, 79, 77] },
  { id: "vibration", label: "Vibration", value: "2.1", unit: "mm/s", status: "normal", trend: [50, 58, 48, 62, 50, 55, 52, 63, 49, 57, 51, 60] },
  { id: "oil-temp", label: "Oil Temperature", value: "92", unit: "°C", status: "normal", trend: [58, 60, 64, 66, 68, 70, 73, 75, 78, 80, 82, 84] },
  { id: "oil-pressure", label: "Oil pressure", value: "4.8", unit: "bar", status: "normal", trend: [4.9, 4.8, 4.9, 4.8, 4.8, 4.7, 4.8, 4.8, 4.9, 4.8] },
  { id: "fuel", label: "Fuel flow", value: "31.4", unit: "L/h", status: "normal", trend: [29.1, 29.8, 30.2, 30.8, 31.1, 31.5, 31.2, 31.7, 31.5, 31.4] },
  { id: "altitude", label: "Altitude", value: "15,240", unit: "ft", status: "normal", trend: [14100, 14350, 14600, 14880, 15100, 15240, 15240, 15240, 15240, 15240] },
];

export const mission = { health: 87, faultProbability: 12, anomalyScore: 0.18, degradationRate: "0.18% / 10h", rul: "184 h", risk: "LOW", status: "caution" as const };
