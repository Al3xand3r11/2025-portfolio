import { unknownSummary, type ModuleSummary, type Signal } from "../signals/types";

/** Are.na is connected in a later step. The shape is the one the overview already renders. */
export async function getProcessSummary(): Promise<ModuleSummary> {
  return unknownSummary("process", "Not connected yet", "/dashboard/process");
}

export async function getProcessSignals(): Promise<Signal[]> {
  return [];
}
