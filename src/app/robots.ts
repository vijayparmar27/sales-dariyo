import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * AI search engines and foundation model crawlers.
 * Explicitly identified so AI answer engines (ChatGPT Search, Perplexity, Claude, Copilot, Apple Intelligence)
 * can crawl and quote content accurately, driving referral traffic and AI citations.
 */
const AI_CRAWLERS = [
  // OpenAI
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic Claude
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "anthropic-ai",
  // Perplexity AI
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / Extended
  "Google-Extended",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Other assistants and knowledge indexers
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "MistralAI-User",
  "CCBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  const disallow = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: AI_CRAWLERS, allow: "/", disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
