import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/site-api";

/**
 * Revalidated hourly so crawlers see fresh blog updates without running heavy fetches on every hit.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  const now = new Date();

  // Core static marketing and product pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog articles from the admin panel CMS
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogRoutes = posts.map((post) => {
      const dateStr = post.updatedAt || post.publishedAt;
      const parsedDate = dateStr ? new Date(dateStr) : now;
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      };
    });
  } catch (error) {
    console.warn("[sitemap] Failed to fetch dynamic blog posts:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
