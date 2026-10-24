import { NextResponse } from "next/server";
import { site } from "@/config/site";

const KEY = process.env.INDEXNOW_KEY || "0cde612cf375a9fe196fd7db2dcb6b1c";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * On-demand IndexNow submission endpoint.
 *
 * Can be called by:
 * 1. Admin panel webhook upon blog post / solution publication or update
 * 2. CI/CD post-deployment hook
 *
 * Payload:
 * {
 *   urls?: string[],      // Specific URLs to reindex, or omits to submit entire sitemap
 *   secret?: string       // Optional protection if INDEXNOW_SECRET is configured
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const secret = process.env.INDEXNOW_SECRET;

    if (secret && body.secret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
    const host = new URL(baseUrl).host;

    let urlList: string[] = Array.isArray(body.urls) && body.urls.length > 0 ? body.urls : [];

    // If no specific URLs provided, parse from the live sitemap
    if (urlList.length === 0) {
      const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
      if (!sitemapRes.ok) {
        return NextResponse.json(
          { error: `Failed to fetch sitemap: HTTP ${sitemapRes.status}` },
          { status: 502 }
        );
      }
      const text = await sitemapRes.text();
      const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.trim());
      const alts = [...text.matchAll(/<xhtml:link[^>]+href="([^"]+)"/g)].map((m) => m[1]!.trim());
      urlList = Array.from(new Set([...locs, ...alts]));
    }

    if (urlList.length === 0) {
      return NextResponse.json({ error: "No URLs found to submit" }, { status: 400 });
    }

    const payload = {
      host,
      key: KEY,
      keyLocation: `${baseUrl}/${KEY}.txt`,
      urlList: urlList.slice(0, 10000),
    };

    const upstreamRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: upstreamRes.ok || upstreamRes.status === 202,
      status: upstreamRes.status,
      submittedCount: payload.urlList.length,
      host,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
