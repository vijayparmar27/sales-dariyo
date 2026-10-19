/**
 * The names the server's data cache files API reads under. A contract with
 * dryfish-backend (`SalesSiteCacheTag` in `services/salesSiteCache.service.ts`):
 * after a save in the admin panel's Sales site screens, the API posts the tags
 * it touched to `/api/revalidate`, which drops every read filed under them.
 *
 * - `about`   — the About page.
 * - `contact` — the contact page, and the contact details in every footer
 *               and on the price builder's send buttons.
 * - `blog`    — the Blog page's words, categories and authors.
 * - `posts`   — every post: the blog, each article, the About page's latest.
 *
 * A plain module, not "use client": the route handler imports it.
 */
export const CACHE_TAGS = {
  about: "about",
  contact: "contact",
  blog: "blog",
  posts: "posts",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

const KNOWN: ReadonlySet<string> = new Set(Object.values(CACHE_TAGS));

export const isCacheTag = (value: unknown): value is CacheTag => typeof value === "string" && KNOWN.has(value);
