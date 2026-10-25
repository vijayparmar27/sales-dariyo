import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { ROLE_LANDING_PAGES, SOLUTION_LANDING_PAGES } from "@/data/seo-landing-data";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n/languages";
import { getCanonicalUrl, getLanguageAlternates } from "@/lib/seo";
import { getPosts } from "@/lib/site-api";

/**
 * Revalidated hourly so crawlers see fresh blog updates without running heavy fetches on every hit.
 */
export const revalidate = 3600;

/**
 * Significant release revision date.
 * Following Google Search Central best practices: a static page's `lastmod` should only move
 * when significant content or architectural updates occur, teaching search engines to trust
 * recrawl urgency rather than ignoring constantly moving generation timestamps.
 */
const CONTENT_REVISED = new Date("2026-10-25T00:00:00Z");

interface RouteSpec {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
}

/**
 * Expands a route into canonical entries for all 7 supported languages.
 * Gives search engine crawlers (Googlebot, Bingbot, Yandex, Baidu) explicit crawl targets
 * for each localized version, while binding them together with cross-referencing hreflang alternates.
 */
function expandMultilingualRoutes(baseUrl: string, spec: RouteSpec): MetadataRoute.Sitemap {
  const cleanPath = spec.path.startsWith("/") ? spec.path : `/${spec.path}`;
  const languageAlternates = getLanguageAlternates(cleanPath);
  const primaryUrl = cleanPath === "/" ? baseUrl : `${baseUrl}${cleanPath}`;

  const items: MetadataRoute.Sitemap = [
    {
      url: primaryUrl,
      lastModified: spec.lastModified || CONTENT_REVISED,
      changeFrequency: spec.changeFrequency,
      priority: spec.priority,
      alternates: {
        languages: languageAlternates,
      },
    },
  ];

  for (const lang of Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]) {
    if (lang === "en") continue;
    const localizedUrl = getCanonicalUrl(cleanPath, lang);
    items.push({
      url: localizedUrl,
      lastModified: spec.lastModified || CONTENT_REVISED,
      changeFrequency: spec.changeFrequency,
      priority: Math.max(0.6, Number((spec.priority * 0.95).toFixed(2))),
      alternates: {
        languages: languageAlternates,
      },
    });
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";

  // Core static marketing, pricing, services, and discovery pages
  const staticSpecs: RouteSpec[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/sitemap", priority: 0.85, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

  const staticRoutes = staticSpecs.flatMap((spec) => expandMultilingualRoutes(baseUrl, spec));

  // High-intent solution landing pages for clone and commerce platform search queries
  const solutionRoutes = Object.keys(SOLUTION_LANDING_PAGES).flatMap((slug) =>
    expandMultilingualRoutes(baseUrl, {
      path: `/solutions/${slug}`,
      priority: 0.9,
      changeFrequency: "weekly",
    }),
  );

  // High-intent developer staffing landing pages for technology hiring queries
  const roleRoutes = Object.keys(ROLE_LANDING_PAGES).flatMap((role) =>
    expandMultilingualRoutes(baseUrl, {
      path: `/services/${role}`,
      priority: 0.85,
      changeFrequency: "weekly",
    }),
  );

  // Dynamic blog articles from the admin panel CMS
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogRoutes = posts.flatMap((post) => {
      const dateStr = post.updatedAt || post.publishedAt;
      const parsedDate = dateStr ? new Date(dateStr) : CONTENT_REVISED;
      const postModified = Number.isNaN(parsedDate.getTime()) ? CONTENT_REVISED : parsedDate;
      return expandMultilingualRoutes(baseUrl, {
        path: `/blog/${post.slug}`,
        priority: 0.75,
        changeFrequency: "monthly",
        lastModified: postModified,
      });
    });
  } catch (error) {
    console.warn("[sitemap] Failed to fetch dynamic blog posts:", error);
  }

  return [...staticRoutes, ...solutionRoutes, ...roleRoutes, ...blogRoutes];
}

