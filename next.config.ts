import type { NextConfig } from "next";

/**
 * Sent with every response. The site embeds nothing and loads no third-party
 * script, so it can refuse to be framed and keep its own URLs to itself: a
 * buyer's whole quote rides in the pricing page's query string, and none of
 * it should reach WhatsApp or a mail client as a referrer when they follow a
 * link out.
 */
const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
