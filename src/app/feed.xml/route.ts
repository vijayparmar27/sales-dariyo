import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { getPosts } from "@/lib/site-api";

export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  let items = "";

  try {
    const posts = await getPosts();
    items = posts
      .map((post) => {
        const link = `${baseUrl}/blog/${post.slug}`;
        const pubDate = post.publishedAt
          ? new Date(post.publishedAt).toUTCString()
          : new Date().toUTCString();
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt || "")}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.category?.name ? `<category>${escapeXml(post.category.name)}</category>` : ""}
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
    </item>`;
      })
      .join("");
  } catch (error) {
    console.warn("[feed.xml] Error generating post items:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} Engineering &amp; Commerce Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
