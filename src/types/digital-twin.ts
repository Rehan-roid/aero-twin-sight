export type EngineStatus = "normal" | "caution" | "critical";
export type Parameter = { label: string; value: string; status?: EngineStatus };
export type EngineComponent = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  function: string;
  parameters: Parameter[];
  health: number;
  status: EngineStatus;
  faultProbability: number;
};
export type TelemetryMetric = {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: EngineStatus;
  trend: number[];
};
