import { LAGREE_ORIGIN, LAGREE_ROUTES } from "../../lib/sites";

/* Written by hand rather than through Next's sitemap convention: that
   convention only runs at the root of the app, and this file has to describe
   the Lagree host, which middleware serves at /sitemap.xml. */

const PRIORITY: Record<string, string> = {
  "/": "1.0",
  "/schedule": "0.9",
  "/about": "0.6",
  "/music": "0.5",
};

export const dynamic = "force-static";

export function GET() {
  const lastModified = new Date().toISOString();

  const urls = LAGREE_ROUTES.map(
    (route) => `  <url>
    <loc>${LAGREE_ORIGIN}${route === "/" ? "/" : route}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${PRIORITY[route] ?? "0.5"}</priority>
  </url>`
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
