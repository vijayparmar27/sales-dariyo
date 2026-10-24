import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { ROLE_LANDING_PAGES, SOLUTION_LANDING_PAGES } from "@/data/seo-landing-data";
import { getLanguageAlternates } from "@/lib/seo";
import { getPosts } from "@/lib/site-api";

/**
 * Revalidated hourly so crawlers see fresh blog updates without running heavy fetches on every hit.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  const now = new Date();

  // Core static marketing, pricing, and services pages with full multilingual alternates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: getLanguageAlternates("/"),
      },
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: getLanguageAlternates("/pricing"),
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: getLanguageAlternates("/services"),
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates("/about"),
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates("/blog"),
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: getLanguageAlternates("/contact"),
      },
    },
  ];

  // High-intent solution landing pages for clone and commerce platform search queries
  const solutionRoutes: MetadataRoute.Sitemap = Object.keys(SOLUTION_LANDING_PAGES).map((slug) => {
    const solPath = `/solutions/${slug}`;
    return {
      url: `${baseUrl}${solPath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: getLanguageAlternates(solPath),
      },
    };
  });

  // High-intent developer staffing landing pages for technology hiring queries
  const roleRoutes: MetadataRoute.Sitemap = Object.keys(ROLE_LANDING_PAGES).map((role) => {
    const rolePath = `/services/${role}`;
    return {
      url: `${baseUrl}${rolePath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: getLanguageAlternates(rolePath),
      },
    };
  });

  // Dynamic blog articles from the admin panel CMS
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogRoutes = posts.map((post) => {
      const dateStr = post.updatedAt || post.publishedAt;
      const parsedDate = dateStr ? new Date(dateStr) : now;
      const postPath = `/blog/${post.slug}`;
      return {
        url: `${baseUrl}${postPath}`,
        lastModified: Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: {
          languages: getLanguageAlternates(postPath),
        },
      };
    });
  } catch (error) {
    console.warn("[sitemap] Failed to fetch dynamic blog posts:", error);
  }

  return [...staticRoutes, ...solutionRoutes, ...roleRoutes, ...blogRoutes];
}
