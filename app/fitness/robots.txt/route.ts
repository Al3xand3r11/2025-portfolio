import { LAGREE_ORIGIN } from "../../lib/sites";

/* Served at /robots.txt on the Lagree host, so crawlers there are pointed at
   the Lagree sitemap rather than the portfolio's. */

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${LAGREE_ORIGIN}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
