import type { NextConfig } from "next";
import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots";

/**
 * Crawlers that must find the metadata in the `<head>` of the HTML they fetch.
 *
 * On dynamic routes Next.js streams metadata into the body and updates the head in the browser.
 * HTML-only crawlers like Googlebot and AI search crawlers (OpenAI, Claude, Perplexity)
 * only read the static <head>. Extending htmlLimitedBots ensures metadata (title, canonical, robots)
 * is served unstreamed in <head> upfront.
 */
const AI_CRAWLER_UA =
  "GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|anthropic-ai|PerplexityBot|Perplexity-User|CCBot|Amazonbot|meta-externalagent|meta-externalfetcher|DuckAssistBot|MistralAI-User|cohere-ai|YouBot|Google-Extended|Applebot|Applebot-Extended";

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

/**
 * Where pictures uploaded through the admin panel may be optimised from: the
 * API (`SITE_API_URL`), the host that serves its uploads if that is another
 * one (`SITE_ASSET_URL`), and any extra hosts in `SITE_IMAGE_HOSTS` — a
 * bucket's, say. Kept to exactly these, because Next's optimiser fetches
 * whatever matches for anyone who asks. `imageOf` in `src/lib/site-api.ts`
 * reads the same three and shows a picture from any other host unoptimised.
 * Read when the site is built, like the rest of this file.
 */
function imagePatterns(): NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> {
  const sources = [
    process.env.SITE_API_URL,
    process.env.SITE_ASSET_URL,
    "https://nykjiswkyyqqfvbfseke.supabase.co",
    ...(process.env.SITE_IMAGE_HOSTS ?? "").split(","),
  ];
  const patterns: { protocol: "http" | "https"; hostname: string; port: string; pathname: string }[] = [];
  for (const raw of sources) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      patterns.push({
        protocol: url.protocol === "http:" ? "http" : "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      });
    } catch {
      // Not an address; nothing to allow.
    }
  }
  return patterns;
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  htmlLimitedBots: new RegExp(
    `${HTML_LIMITED_BOT_UA_RE.source}|Googlebot|${AI_CRAWLER_UA}`,
    "i",
  ),
  images: {
    remotePatterns: imagePatterns(),
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days
  },
  async rewrites() {
    return [
      { source: "/llms.txt", destination: "/llms" },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
