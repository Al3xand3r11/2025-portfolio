"use client";

import { usePathname } from "next/navigation";
import { LAGREE_BASE_PATH } from "../lib/sites";

/* The site renders out of `/fitness` but is served from the root of its own
   subdomain, so `usePathname` can report either form depending on whether the
   render happened before or after the proxy rewrote the request. Normalising to
   the public path keeps server and client output identical. */
export function useLagreePathname(): string {
  const pathname = usePathname();

  if (pathname === LAGREE_BASE_PATH) return "/";
  if (pathname.startsWith(`${LAGREE_BASE_PATH}/`)) {
    return pathname.slice(LAGREE_BASE_PATH.length);
  }
  return pathname;
}
