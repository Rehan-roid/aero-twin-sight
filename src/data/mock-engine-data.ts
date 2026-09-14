import type { EngineComponent, TelemetryMetric } from "@/types/digital-twin";

export const engineComponents: EngineComponent[] = [
  { id: "assembly", name: "Twin-Piston Assembly", shortName: "Full assembly", description: "Complete air-cooled twin-piston aircraft engine digital twin.", function: "Converts fuel energy into reliable propulsive shaft power.", health: 87, status: "caution", faultProbability: 18, parameters: [{ label: "Speed", value: "2,430 rpm" }, { label: "Oil pressure", value: "4.8 bar" }, { label: "Vibration", value: "2.8 mm/s", status: "caution" }] },
  { id: "cylinder-1", name: "Cylinder 1", shortName: "CYL 01", description: "Primary combustion chamber and piston housing.", function: "Converts combustion pressure into reciprocating motion.", health: 94, status: "normal", faultProbability: 6, parameters: [{ label: "CHT", value: "178 °C" }, { label: "EGT", value: "642 °C" }, { label: "Vibration", value: "Normal" }] },
  { id: "cylinder-2", name: "Cylinder 2", shortName: "CYL 02", description: "Monitored combustion chamber showing an elevated thermal signature.", function: "Converts combustion pressure into reciprocating motion.", health: 72, status: "caution", faultProbability: 31, parameters: [{ label: "CHT", value: "214 °C", status: "caution" }, { label: "EGT", value: "688 °C", status: "caution" }, { label: "Vibration", value: "3.4 mm/s", status: "caution" }] },
  { id: "crankcase", name: "Crankcase", shortName: "CASE", description: "Structural enclosure and bearing support for the rotating assembly.", function: "Maintains alignment and distributes mechanical loads.", health: 91, status: "normal", faultProbability: 8, parameters: [{ label: "Oil temp", value: "96 °C" }, { label: "Case pressure", value: "1.02 bar" }, { label: "Vibration", value: "Normal" }] },
  { id: "intake", name: "Intake System", shortName: "INTAKE", description: "Air induction path for both cylinders.", function: "Meters and distributes combustion air.", health: 89, status: "normal", faultProbability: 9, parameters: [{ label: "Manifold", value: "28.4 inHg" }, { label: "Air temp", value: "31 °C" }, { label: "Flow", value: "Balanced" }] },
  { id: "exhaust", name: "Exhaust System", shortName: "EXHAUST", description: "High-temperature gas evacuation assembly.", function: "Routes combustion gases away with minimal back pressure.", health: 85, status: "normal", faultProbability: 12, parameters: [{ label: "EGT mean", value: "665 °C" }, { label: "Delta EGT", value: "46 °C", status: "caution" }, { label: "Leak", value: "None" }] },
  { id: "sensors", name: "Sensor Network", shortName: "SENSORS", description: "Virtual representation of thermal, pressure and vibration sensing.", function: "Supplies condition data to the monitoring model.", health: 98, status: "normal", faultProbability: 2, parameters: [{ label: "Online", value: "12 / 12" }, { label: "Latency", value: "18 ms" }, { label: "Confidence", value: "97.4%" }] },
];

export const telemetry: TelemetryMetric[] = [
  { id: "rpm", label: "Engine speed", value: "2,430", unit: "RPM", status: "normal", trend: [2240, 2290, 2350, 2380, 2410, 2450, 2430, 2440, 2420, 2430] },
  { id: "egt", label: "Exhaust gas", value: "665", unit: "°C", status: "caution", trend: [638, 642, 649, 654, 659, 663, 667, 671, 668, 665] },
  { id: "cht", label: "Cylinder head", value: "196", unit: "°C", status: "caution", trend: [178, 181, 184, 188, 191, 196, 201, 199, 197, 196] },
  { id: "oil-temp", label: "Oil temperature", value: "96", unit: "°C", status: "normal", trend: [83, 85, 87, 89, 91, 92, 94, 95, 95, 96] },
  { id: "oil-pressure", label: "Oil pressure", value: "4.8", unit: "bar", status: "normal", trend: [4.9, 4.8, 4.9, 4.8, 4.8, 4.7, 4.8, 4.8, 4.9, 4.8] },
  { id: "vibration", label: "Vibration", value: "2.8", unit: "mm/s", status: "caution", trend: [1.8, 1.9, 2.1, 2.0, 2.2, 2.4, 2.6, 2.5, 2.7, 2.8] },
  { id: "fuel", label: "Fuel flow", value: "31.4", unit: "L/h", status: "normal", trend: [29.1, 29.8, 30.2, 30.8, 31.1, 31.5, 31.2, 31.7, 31.5, 31.4] },
  { id: "altitude", label: "Altitude", value: "15,240", unit: "ft", status: "normal", trend: [14100, 14350, 14600, 14880, 15100, 15240, 15240, 15240, 15240, 15240] },
];

export const mission = { health: 87, faultProbability: 18, anomalyScore: 0.27, degradationRate: "0.34% / 10h", rul: "126 h", risk: "LOW–MODERATE", status: "caution" as const };
