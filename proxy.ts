import { NextResponse, type NextRequest } from "next/server";
import {
  LAGREE_BASE_PATH,
  LAGREE_ORIGIN,
  LAGREE_ROUTES,
  isLagreeHost,
} from "./app/lib/sites";

/* The portfolio and the Lagree site share one deployment but read as two
   separate sites, so every decision about which one a request belongs to is
   made here rather than being split between this file and next.config. */

/* Paths that used to live on the portfolio, and where they went on the Lagree
   site. Only ever consulted for requests to the portfolio: `/music` is a real
   page on the Lagree host, and redirecting it there would loop. */
const MOVED_FROM_ENGINEERING: Record<string, string> = {
  "/lagree": "/schedule",
  "/music": "/music",
};

const PUBLIC_LAGREE_ROUTES = new Set<string>(LAGREE_ROUTES);

/** `/fitness/schedule` -> `/schedule`, `/fitness` -> `/` */
function stripBasePath(pathname: string): string {
  return pathname.slice(LAGREE_BASE_PATH.length) || "/";
}

function withoutTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function handleLagreeHost(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const pathname = withoutTrailingSlash(url.pathname);

  if (pathname === LAGREE_BASE_PATH || pathname.startsWith(`${LAGREE_BASE_PATH}/`)) {
    const publicPath = stripBasePath(pathname);

    /* Only the pages a visitor can land on are worth collapsing to one URL.
       Generated assets under the segment (the OG image, the icon) are served
       where Next emits them so their links resolve without a redirect. */
    if (!PUBLIC_LAGREE_ROUTES.has(publicPath)) {
      return NextResponse.next();
    }

    url.pathname = publicPath;
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `${LAGREE_BASE_PATH}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function handleEngineeringHost(request: NextRequest): NextResponse {
  const pathname = withoutTrailingSlash(request.nextUrl.pathname);

  const moved = MOVED_FROM_ENGINEERING[pathname];
  const isLagreePath =
    pathname === LAGREE_BASE_PATH || pathname.startsWith(`${LAGREE_BASE_PATH}/`);

  if (!moved && !isLagreePath) {
    return NextResponse.next();
  }

  const target = new URL(moved ?? stripBasePath(pathname), LAGREE_ORIGIN);
  target.search = request.nextUrl.search;
  return NextResponse.redirect(target, 308);
}

export function proxy(request: NextRequest) {
  return isLagreeHost(request.headers.get("host"))
    ? handleLagreeHost(request)
    : handleEngineeringHost(request);
}

export const config = {
  /* Static assets are skipped, but sitemap.xml and robots.txt deliberately are
     not: each host has to be able to serve its own. */
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:webp|avif|png|jpe?g|gif|svg|ico|woff2?|ttf|otf|mp4|webm|css|js|map)$).*)",
  ],
};
