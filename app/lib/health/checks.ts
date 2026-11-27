import type { Target } from "./targets";

export type CheckResult = {
  ok: boolean;
  statusCode: number | null;
  latencyMs: number | null;
  detail: string | null;
};

export interface Check {
  id: string;
  run(target: Target): Promise<CheckResult>;
}

const TIMEOUT_MS = 10_000;

function failureDetail(error: unknown): string {
  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return "Timed out";
  }
  return error instanceof Error ? error.message : "Request failed";
}

/** A homepage response in the 2xx or 3xx range counts as up. */
export const httpCheck: Check = {
  id: "http",
  async run(target) {
    const started = Date.now();
    try {
      const response = await fetch(target.url, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: "follow",
        cache: "no-store",
        headers: { "User-Agent": "alexandernance-dashboard/1.0 (+https://alexandernance.com)" },
      });
      await response.body?.cancel();
      const ok = response.status >= 200 && response.status < 400;
      return {
        ok,
        statusCode: response.status,
        latencyMs: Date.now() - started,
        detail: ok ? null : `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        ok: false,
        statusCode: null,
        latencyMs: Date.now() - started,
        detail: failureDetail(error),
      };
    }
  },
};
