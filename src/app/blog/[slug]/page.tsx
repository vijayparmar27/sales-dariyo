import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Accent } from "@/components/content/accent";
import { PageCta } from "@/components/content/page-cta";
import { PostBody } from "@/components/content/post-body";
import { PostCardTile } from "@/components/content/post-card";
import { SiteImage } from "@/components/content/site-image";
import { CatalisBadge } from "@/components/ui";
import { site } from "@/config/site";
import { postDate } from "@/lib/dates";
import { getServerI18n } from "@/lib/i18n/server";
import { cardView, getPage, getPost, getPosts, imageOf } from "@/lib/site-api";

import { buildArticleJsonLd, buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

import { ShareLinks } from "./share-links";

/** Read from the admin panel; refreshed at once by a save there, or after five minutes. */
export const revalidate = 300;

/** The posts there are at build time, rendered then; any published later, on first visit. */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) return { title: "Article not found" };
  const { post } = found;
  const cover = imageOf(post.coverImage);
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(cover && /^https:\/\//.test(cover.src) ? { images: [{ url: cover.src, alt: post.coverAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      ...(cover && /^https:\/\//.test(cover.src) ? { images: [cover.src] } : {}),
    },
  };
}

/**
 * One article, after the reference's blog post: the title and lead in a
 * reading column, a wide cover, the body, and three more posts to read before
 * the sky panel. The body is the API's parse of the Markdown written in the
 * panel (`PostBody`).
 */
export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [{ t }, found, blog] = await Promise.all([getServerI18n(), getPost(slug), getPage("blog")]);
  if (!found) notFound();
  const { post, related } = found;
  const cover = imageOf(post.coverImage);
  const avatar = post.author ? imageOf(post.author.avatar) : null;
  const date = postDate(post.publishedAt);

  const articleJsonLd = serializeJsonLd(
    buildArticleJsonLd({
      headline: post.title,
      description: post.seo.description,
      url: `${site.url.replace(/\/+$/, "")}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      image: cover?.src,
      authorName: post.author?.name,
      wordCount: post.wordCount,
      category: post.category?.name,
    }),
  );
  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* pt-28: the site header is fixed over the page, not in its flow. */}
      <article className="px-4 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {t.blog.allArticles}
          </Link>
          <div>
            <CatalisBadge>{post.category?.name ?? "Blog"}</CatalisBadge>
          </div>
          <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.02] tracking-[-0.025em] text-balance text-ink sm:text-6xl lg:text-[4.5rem]">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted sm:text-xl">{post.excerpt}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
            {post.author ? (
              <div className="flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-sunken">
                  {avatar ? (
                    <SiteImage image={avatar} alt="" sizes="44px" />
                  ) : (
                    <span className="flex size-full items-center justify-center font-serif text-lg text-ink">
                      {post.author.name.slice(0, 1)}
                    </span>
                  )}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{post.author.name}</span>
                  {post.author.role ? <span className="block text-xs text-muted">{post.author.role}</span> : null}
                </span>
              </div>
            ) : null}
            <p className="text-sm text-muted">{[date, `${post.readingMinutes} ${t.blog.minRead}`].filter(Boolean).join(" · ")}</p>
          </div>
        </header>

        {cover ? (
          <div className="relative mx-auto mt-12 aspect-[16/9] max-w-6xl overflow-hidden rounded-[28px] bg-sunken sm:mt-16 sm:rounded-[2.5rem]">
            <SiteImage image={cover} alt={post.coverAlt} sizes="(min-width: 1200px) 1152px, 96vw" preload />
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <PostBody blocks={post.blocks} />

          <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-sunken px-3.5 py-1.5 text-xs font-medium text-ink/80">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : (
              <span />
            )}
            <ShareLinks title={post.title} />
          </div>

          {post.author?.bio ? (
            <aside className="mt-10 flex flex-col gap-4 rounded-[28px] bg-sunken p-6 sm:flex-row sm:items-start sm:p-8">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white">
                {avatar ? (
                  <SiteImage image={avatar} alt="" sizes="64px" />
                ) : (
                  <span className="flex size-full items-center justify-center font-serif text-2xl text-ink">
                    {post.author.name.slice(0, 1)}
                  </span>
                )}
              </span>
              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">{t.blog.writtenBy}</p>
                <p className="mt-1 font-serif text-3xl leading-tight text-ink">{post.author.name}</p>
                {post.author.role ? <p className="text-sm text-muted">{post.author.role}</p> : null}
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{post.author.bio}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
              {blog.related.eyebrow ? <CatalisBadge className="mb-5">{blog.related.eyebrow}</CatalisBadge> : null}
              <h2 className="font-serif text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance text-ink sm:text-6xl">
                <Accent text={blog.related.heading} />
              </h2>
              {blog.related.intro ? (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{blog.related.intro}</p>
              ) : null}
            </div>
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="reveal">
                  <PostCardTile post={cardView(item)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="h-24" />
      )}

      <PageCta cta={blog.cta} />
    </>
  );
}
