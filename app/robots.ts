import type { MetadataRoute } from "next";
import { ENGINEERING_ORIGIN } from "./lib/sites";

/* The Lagree host serves its own robots.txt: app/fitness/robots.txt/route.ts */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${ENGINEERING_ORIGIN}/sitemap.xml`,
  };
}
