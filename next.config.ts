import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* the Lagree pages used to live on the main site; keep the old links alive */
  async redirects() {
    return [
      { source: "/lagree", destination: "/fitness/schedule", permanent: true },
      { source: "/music", destination: "/fitness/music", permanent: true },
    ];
  },
};

export default nextConfig;
