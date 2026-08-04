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
};

export default nextConfig;
