import { createAuthClient } from "better-auth/react";

/**
 * Client for Neon's hosted Better Auth instance. baseURL is intentionally
 * omitted: in the browser, Better Auth resolves it to the current origin
 * (so requests hit this app's own /api/auth/*), which next.config.ts
 * proxies server-side to Neon's AUTH_URL. An explicit relative path here
 * (e.g. "/api/auth") fails Better Auth's URL validation during Next.js's
 * server-side render pass, since that has no `window` to resolve against.
 */
export const authClient = createAuthClient();
