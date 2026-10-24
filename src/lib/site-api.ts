/**
 * The pages, posts and contact details this site shows, read from the admin
 * panel's backend: dryfish-backend's `/sales-site/public/*` at `SITE_API_URL`.
 *
 * Read on the server only, with no token, and kept in Next's data cache for
 * five minutes under the tags in `cache-tags.ts`. That five minutes is a
 * ceiling, not the usual delay: a save in the panel makes the API post the
 * tags it touched to `/api/revalidate`, which drops them at once.
 *
 * The site never breaks for want of the API. With `SITE_API_URL` unset (local
 * work, a preview) the pages show their built-in text (`page-defaults.ts`)
 * and the blog is empty. When the API is set but does not answer, each read
 * falls back to the last answer this server got for it, and only then to the
 * built-in text — so a blip in the API does not swap a live page's words for
 * the defaults. Next's data cache never stores a failed answer, so the next
 * read after the API recovers is fresh.
 */
import "server-only";

import { cache } from "react";

import { site } from "@/config/site";
import { PAGE_DEFAULTS } from "@/data/page-defaults";

import { CACHE_TAGS, type CacheTag } from "./cache-tags";
import type {
  ContactChannels,
  ContactField,
  PageContents,
  PageKey,
  Post,
  PostCard,
  PostCardView,
  SiteImageSource,
} from "./site-types";

export const API_URL = (process.env.SITE_API_URL ?? "").trim().replace(/\/+$/, "");

/**
 * Where uploaded pictures are served from: the API's own origin unless a
 * bucket or CDN serves them (`SITE_ASSET_URL`). A stored path that is already
 * a full URL (a bucket upload) is used as it is.
 */
const ASSET_URL = ((process.env.SITE_ASSET_URL ?? "").trim() || API_URL).replace(/\/+$/, "");

const REVALIDATE_SECONDS = 300;
const TIMEOUT_MS = 8_000;

const PAGE_TAGS: Record<PageKey, CacheTag[]> = {
  about: [CACHE_TAGS.about],
  contact: [CACHE_TAGS.contact],
  blog: [CACHE_TAGS.blog],
};

/** The last answer each read got, for as long as this server runs. */
const lastGood = new Map<string, unknown>();

class ApiReadError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function read<T>(path: string, tags: readonly CacheTag[]): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: [...tags] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new ApiReadError(response.status, `answered ${response.status}`);
  const body = (await response.json()) as { data?: T };
  if (!body || body.data === undefined) throw new ApiReadError(502, "answered without data");
  return body.data;
}

async function remembered<T>(key: string, load: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    const value = await load();
    lastGood.set(key, value);
    return value;
  } catch (error) {
    const kept = lastGood.has(key);
    console.warn(
      `[site-api] ${key}: ${error instanceof Error ? error.message : String(error)}; showing ${kept ? "the last copy read" : "the built-in text"}`,
    );
    return kept ? (lastGood.get(key) as T) : fallback();
  }
}

/** A hostname from a URL or a bare host; null for anything else. */
const hostOf = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`).hostname;
  } catch {
    return null;
  }
};

/**
 * Hosts whose pictures Next optimises — resizes, re-encodes and caches: the
 * API's, the asset host's, and any listed in `SITE_IMAGE_HOSTS` (a bucket's
 * host, say). `next.config.ts` builds `images.remotePatterns` from the same
 * three, and Next optimises nothing outside them; a picture from anywhere
 * else, or from this machine or the local network (which Next 16 will not
 * fetch), is shown as it is rather than broken.
 */
const OPTIMISED_HOSTS: ReadonlySet<string> = new Set(
  [API_URL, ASSET_URL, ...(process.env.SITE_IMAGE_HOSTS ?? "").split(",")]
    .map(hostOf)
    .filter((host): host is string => host !== null),
);

const isLocalHost = (host: string): boolean =>
  /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\])/.test(host) || host.endsWith(".local");

/** A picture from the API, ready for `<SiteImage>`; null when there is none. */
export function imageOf(stored: string): SiteImageSource | null {
  const src = assetUrl(stored);
  const host = src ? hostOf(src) : null;
  if (!src || !host) return null;
  return { src, optimise: OPTIMISED_HOSTS.has(host) && !isLocalHost(host) };
}

/** A post card with its pictures resolved, for a list drawn in the browser. */
export const cardView = (card: PostCard): PostCardView => ({
  ...card,
  image: imageOf(card.coverImage),
  author: card.author ? { ...card.author, avatar: imageOf(card.author.avatar) } : null,
});

/** Whether pages and posts come from the admin panel, rather than the built-in text. */
export const siteApiConfigured = (): boolean => API_URL !== "";

/** A stored upload path, or a full URL, as something an `<img>` can load. */
export function assetUrl(src: string): string {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return ASSET_URL ? `${ASSET_URL}/${src.replace(/^\/+/, "")}` : "";
}

export const getPage = cache(async <P extends PageKey>(page: P): Promise<PageContents[P]> => {
  if (!API_URL) return PAGE_DEFAULTS[page];
  return remembered(
    `page:${page}`,
    async () => (await read<{ page: PageContents[P] }>(`/sales-site/public/pages/${page}`, PAGE_TAGS[page])).page,
    () => PAGE_DEFAULTS[page],
  );
});

/** Every live post, newest first, as cards. */
export const getPosts = cache(async (): Promise<PostCard[]> => {
  if (!API_URL) return [];
  return remembered(
    "posts",
    async () => (await read<{ posts: PostCard[] }>("/sales-site/public/posts", [CACHE_TAGS.posts])).posts,
    () => [],
  );
});

/**
 * One article and the three to read after it, or null when there is no such
 * post. An outage is not "no such post": with no copy read before, it throws,
 * so the page already cached for that address stays up rather than turning
 * into a 404 while the API is away.
 */
export const getPost = cache(async (slug: string): Promise<{ post: Post; related: PostCard[] } | null> => {
  if (!API_URL) return null;
  const key = `post:${slug}`;
  try {
    const value = await read<{ post: Post; related: PostCard[] }>(
      `/sales-site/public/posts/${encodeURIComponent(slug)}`,
      [CACHE_TAGS.posts, CACHE_TAGS.blog],
    );
    lastGood.set(key, value);
    return value;
  } catch (error) {
    if (error instanceof ApiReadError && (error.status === 404 || error.status === 400)) {
      lastGood.delete(key);
      return null;
    }
    if (lastGood.has(key)) return lastGood.get(key) as { post: Post; related: PostCard[] };
    throw error;
  }
});

/**
 * How to reach the seller: the contact page's details, with `site.email` and
 * `site.whatsapp` standing in for any left empty in the panel — so the site
 * reads as it did before it had a panel until someone fills them in there.
 */
export const getContactChannels = cache(async (): Promise<ContactChannels> => {
  const { channels } = await getPage("contact");
  return {
    ...channels,
    email: (channels.email || site.email).trim(),
    phone: (channels.phone || site.phone || "").trim(),
    whatsapp: (channels.whatsapp || site.whatsapp).replace(/\D/g, ""),
  };
});

export type EnquiryResult =
  | { ok: true }
  | { ok: false; status: number; message: string; fields?: Partial<Record<ContactField, string>> };

/** Sends a contact-form or quote message to the panel's Enquiries inbox. Never throws. */
export async function sendEnquiry(input: Record<string, unknown>): Promise<EnquiryResult> {
  if (!API_URL) return { ok: false, status: 0, message: "The contact form is not connected yet." };
  try {
    const visitorObj = (input.visitor as Record<string, unknown> | undefined) || {};
    const clientIp = typeof visitorObj.ip === "string" ? visitorObj.ip : "";
    const userAgent = typeof visitorObj.userAgent === "string" ? visitorObj.userAgent : "";

    const headers: Record<string, string> = {
      "content-type": "application/json",
      accept: "application/json",
    };
    if (clientIp) {
      headers["x-forwarded-for"] = clientIp;
      headers["cf-connecting-ip"] = clientIp;
      headers["x-real-ip"] = clientIp;
    }
    if (userAgent) {
      headers["user-agent"] = userAgent;
    }

    const response = await fetch(`${API_URL}/sales-site/public/enquiries`, {
      method: "POST",
      headers,
      body: JSON.stringify(input),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return { ok: true };
    const body = (await response.json().catch(() => null)) as {
      message?: string;
      details?: { fields?: Partial<Record<ContactField, string>> };
    } | null;
    return {
      ok: false,
      status: response.status,
      message: body?.message ?? "Your message could not be sent.",
      ...(body?.details?.fields ? { fields: body.details.fields } : {}),
    };
  } catch (error) {
    console.warn("[site-api] enquiry not sent:", error instanceof Error ? error.message : String(error));
    return { ok: false, status: 0, message: "Your message could not be sent." };
  }
}
