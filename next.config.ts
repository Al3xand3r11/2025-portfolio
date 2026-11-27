import type { NextConfig } from "next";

/* Routing between alexandernance.com and lagree.alexandernance.com, including
   the redirects for the Lagree pages' old paths, lives in proxy.ts. */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.are.na" },
      { protocol: "https", hostname: "d2w9rnfcy7mm78.cloudfront.net" },
    ],
  },
};

export default nextConfig;
