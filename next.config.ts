import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder creator portraits are locally generated SVGs (see
    // scripts/generate-placeholder-portraits.mjs). Swap them for real
    // photography in public/creators and update src/lib/creators.ts —
    // no code changes needed elsewhere.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    // Proxies the browser's same-origin /api/auth/* calls to Neon's hosted
    // Better Auth instance (AUTH_URL). Keeping this server-side avoids
    // exposing AUTH_URL to the client bundle and sidesteps CORS entirely —
    // the pattern Better Auth itself recommends for a hosted/proxied setup.
    if (!process.env.AUTH_URL) return [];
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.AUTH_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
