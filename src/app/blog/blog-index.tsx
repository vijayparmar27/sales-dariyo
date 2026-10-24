"use client";

import { Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { Accent } from "@/components/content/accent";
import { PostCardTile } from "@/components/content/post-card";
import { CatalisBadge, StarIcon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/context";
import type { PostCardView, SectionHead } from "@/lib/site-types";

/**
 * Everything on the blog under its heading: the search box, the featured row
 * and the grid with its category filter. The site lists every post on one
 * page — a sales site's blog runs to dozens, not thousands — so searching and
 * filtering happen here, instantly, with no request.
 */
export function BlogIndex({
  posts,
  categories,
  searchPlaceholder,
  featuredHeading,
  showFeatured,
  latest,
}: {
  posts: PostCardView[];
  categories: { slug: string; name: string }[];
  searchPlaceholder: string;
  featuredHeading: string;
  showFeatured: boolean;
  latest: SectionHead & { emptyText: string };
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const deferredQuery = useDeferredValue(query);

  const matches = useMemo(() => {
    const words = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (category && post.category?.slug !== category) return false;
      if (words.length === 0) return true;
      const haystack = [post.title, post.excerpt, post.category?.name ?? "", ...post.tags].join(" ").toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [posts, category, deferredQuery]);

  const featured = posts.filter((post) => post.featured);
  const filtering = query.trim() !== "" || category !== "";
  // Only categories something is filed under: a pill that finds nothing is a dead end.
  const usedCategories = categories.filter((item) => posts.some((post) => post.category?.slug === item.slug));

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="mx-auto mt-10 flex w-full max-w-lg items-center gap-2 rounded-full bg-sunken p-1.5 pl-5"
      >
        <Search aria-hidden className="size-4 shrink-0 text-muted" />
        <label htmlFor="blog-search" className="sr-only">
          {searchPlaceholder || t.blog.searchPlaceholder}
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder || t.blog.searchPlaceholder}
          className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t.blog.clearSearch}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-white hover:text-ink"
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
        <button
          type="submit"
          className="h-10 shrink-0 cursor-pointer rounded-full bg-[#111218] px-5 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          {t.blog.searchButton}
        </button>
      </form>

      {showFeatured && featured.length > 0 && !filtering ? (
        <FeaturedRow posts={featured} heading={featuredHeading} />
      ) : null}

      <div id="articles" className="mx-auto max-w-7xl scroll-mt-28 pt-20 text-left sm:pt-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {latest.eyebrow ? <CatalisBadge className="mb-5">{latest.eyebrow}</CatalisBadge> : null}
            <h2 className="font-serif text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance text-ink sm:text-6xl">
              <Accent text={latest.heading} />
            </h2>
            {latest.intro ? <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{latest.intro}</p> : null}
          </div>
          {usedCategories.length > 0 ? (
            <div role="group" aria-label={t.blog.filterCategory} className="flex flex-wrap gap-2">
              {[{ slug: "", name: t.blog.all }, ...usedCategories].map((item) => {
                const active = category === item.slug;
                return (
                  <button
                    key={item.slug || "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(item.slug)}
                    className={cn(
                      "h-10 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                      active ? "bg-[#111218] text-white" : "bg-sunken text-muted hover:bg-[#ECF0F6] hover:text-ink",
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-[28px] bg-sunken px-6 py-20 text-center">
            <StarIcon className="size-6 text-brand-blue" />
            <p className="mt-4 max-w-md text-lg text-muted">{latest.emptyText || "No articles yet."}</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-[28px] bg-sunken px-6 py-16 text-center">
            <p className="text-lg text-ink">{t.blog.noArticlesMatch}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
              className="mt-4 h-10 cursor-pointer rounded-full border border-line bg-white px-5 text-sm font-medium text-ink hover:bg-white/70"
            >
              {t.blog.showAllArticles}
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((post, idx) => (
              <li key={post.slug} className={cn("reveal", `stagger-${(idx % 6) + 1}`)}>
                <PostCardTile post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

/**
 * The featured posts in a row that scrolls by itself, as on the reference,
 * pausing under the pointer or keyboard focus. Fewer than three are not worth
 * a moving row and sit still; with reduced motion asked for, the row is a
 * plain sideways scroller.
 */
/**
 * Cards in one copy of the moving row. One copy has to be wider than the
 * widest screen, or the end of each loop shows a gap: a card and its gap are
 * 372px, so twelve make about 4,460px, past a 4K screen. A short list is
 * repeated until it is that long.
 */
const LOOP_LENGTH = 12;

function FeaturedRow({ posts, heading }: { posts: PostCardView[]; heading: string }) {
  const moving = posts.length >= 3;
  const loop = Array.from({ length: Math.max(1, Math.ceil(LOOP_LENGTH / posts.length)) }, () => posts).flat();
  return (
    <section aria-label={heading || "Featured"} className="relative -mx-4 mt-16 sm:-mx-6 lg:-mx-8">
      {heading ? (
        <p className="mb-6 text-center text-[11px] font-medium tracking-[0.14em] text-muted uppercase">{heading}</p>
      ) : null}
      {moving ? (
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max" style={{ ["--marquee-duration" as string]: `${loop.length * 8}s` }}>
            {[0, 1].map((copy) => (
              // Each copy ends with the gap the next one starts after, so
              // sliding by exactly one copy's width lands seamlessly.
              <ul key={copy} aria-hidden={copy === 1 || undefined} className={cn("flex gap-5 pr-5", copy === 1 && "marquee-copy")}>
                {loop.map((post, index) => {
                  // Only the first showing of each post is reachable by keyboard.
                  const repeat = copy === 1 || index >= posts.length;
                  return (
                    <li key={`${copy}-${index}`} aria-hidden={(copy === 0 && repeat) || undefined} className="w-[19rem] shrink-0 text-left sm:w-[22rem]">
                      <PostCardTile post={post} sizes="360px" {...(repeat ? { tabIndex: -1 } : {})} />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5 px-4">
          {posts.map((post) => (
            <li key={post.slug} className="w-full text-left sm:w-[22rem]">
              <PostCardTile post={post} sizes="360px" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
