import type { MetadataRoute } from "next";
import { CASE_STUDY_SLUGS } from "./lib/caseStudies";
import { ENGINEERING_ORIGIN } from "./lib/sites";

/* The Lagree pages are on their own host now, and are listed by the sitemap
   that host serves: app/fitness/sitemap.xml/route.ts */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Array<[string, MetadataRoute.Sitemap[number]["changeFrequency"], number]> = [
    ["", "weekly", 1],
    ["/about", "monthly", 0.8],
    ["/engineering", "weekly", 0.8],
    ["/community", "monthly", 0.6],
    ["/contact", "yearly", 0.5],
  ];

  const caseStudies = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${ENGINEERING_ORIGIN}/engineering/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...pages.map(([path, changeFrequency, priority]) => ({
      url: `${ENGINEERING_ORIGIN}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...caseStudies,
  ];
}
