/* The Lagree site is served from the same deployment as the portfolio, so both
   the proxy that routes by host and the components that link across sites have
   to agree on where each one lives. */

export const ENGINEERING_ORIGIN = "https://alexandernance.com";

export const LAGREE_ORIGIN =
  process.env.NEXT_PUBLIC_LAGREE_URL ?? "https://lagree.alexandernance.com";

/** The segment `app/fitness/*` is rewritten onto from the Lagree host. */
export const LAGREE_BASE_PATH = "/fitness";

/** Matches lagree.alexandernance.com in production and lagree.localhost in dev. */
export function isLagreeHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.split(":")[0].toLowerCase().startsWith("lagree.");
}

/** Public Lagree paths, in nav order, without the internal `/fitness` prefix. */
export const LAGREE_ROUTES = ["/", "/schedule", "/music", "/about"] as const;
