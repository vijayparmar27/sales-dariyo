import Link from "next/link";

import { SiteImage } from "@/components/content/site-image";
import { StarIcon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { postDate } from "@/lib/dates";
import type { PostCardView } from "@/lib/site-types";

/**
 * A post as the Catalis reference draws one: a soft grey card holding a
 * rounded photo, the serif title, a few lines of excerpt and a full-width
 * black "Read more". The whole card is the link.
 */
export function PostCardTile({
  post,
  sizes = "(min-width: 1280px) 380px, (min-width: 768px) 45vw, 92vw",
  className,
  tabIndex,
}: {
  post: PostCardView;
  sizes?: string;
  className?: string;
  /** -1 for the marquee's second copy, which only exists to close the loop. */
  tabIndex?: number;
}) {
  const date = postDate(post.publishedAt);
  return (
    <Link
      href={`/blog/${post.slug}`}
      tabIndex={tabIndex}
      className={cn(
        "card-lift group flex h-full flex-col rounded-[28px] bg-sunken p-2 transition-all duration-300 hover:bg-[#ECF0F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-[#4B8CE4]">
        {post.image ? (
          <SiteImage
            image={post.image}
            alt={post.coverAlt}
            sizes={sizes}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <CoverArt label={post.category?.name ?? "Blog"} />
        )}
        {post.category ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-ink uppercase backdrop-blur-sm">
            {post.category.name}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-2">
        <p className="text-xs text-muted">
          {[date, `${post.readingMinutes} min read`].filter(Boolean).join(" · ")}
        </p>
        <h3 className="mt-2 font-serif text-[1.7rem] leading-[1.08] tracking-[-0.01em] text-balance text-ink">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-pretty text-muted">{post.excerpt}</p>
        ) : null}
        {/* Pushed to the card's foot, so a row of cards lines up its buttons. */}
        <span className="mt-auto block pt-6">
          <span className="btn-shine flex h-11 items-center justify-center rounded-full bg-[#111218] text-sm font-medium text-white transition-all duration-300 group-hover:bg-black group-hover:shadow-md active:scale-98">
            Read more
          </span>
        </span>
      </div>
    </Link>
  );
}

/** A post without a cover gets the site's sky, with its category in the display serif. */
export function CoverArt({ label, className }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 flex items-end bg-cover bg-bottom p-6", className)}
      style={{ backgroundImage: "url('/images/hero-bg.avif')" }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#0A4FA3]/50 to-transparent" />
      <StarIcon className="absolute top-5 right-5 size-5 text-white/80" />
      <span className="relative font-serif text-4xl leading-none tracking-[-0.02em] text-white italic sm:text-5xl">{label}</span>
    </div>
  );
}
