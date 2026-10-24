import { ArrowUpRight, Check, Quote } from "lucide-react";
import type { Metadata } from "next";

import { AnimatedCounter } from "@/components/animation/animated-counter";
import { Accent, plainHeading } from "@/components/content/accent";
import { CtaLink, PageCta } from "@/components/content/page-cta";
import { PostCardTile } from "@/components/content/post-card";
import { SiteImage } from "@/components/content/site-image";
import { valueIcon } from "@/components/content/value-icon";
import { CatalisBadge, SkyPanel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { cardView, getPage, getPosts, imageOf } from "@/lib/site-api";
import type { AboutPage, PageImage, SectionHead } from "@/lib/site-types";

import { site } from "@/config/site";
import type { LanguageCode } from "@/lib/i18n/languages";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { getLocalizedMetadata } from "@/lib/seo-multilingual";

/** Read from the admin panel; refreshed at once by a save there, or after five minutes. */
export const revalidate = 300;

interface AboutPageProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: AboutPageProps): Promise<Metadata> {
  const resolved = searchParams ? await searchParams : {};
  const lang = (resolved?.lang || "en") as LanguageCode;
  const localized = getLocalizedMetadata("about", lang, "/about");

  if (lang === "en") {
    try {
      const page = await getPage("about");
      const title = page.seo?.title || plainHeading(page.hero?.heading);
      const description = page.seo?.description || page.hero?.intro;
      if (title) {
        const fullTitle = `${title} | ${site.name}`;
        const metaDesc = description || localized.description || undefined;
        return {
          ...localized,
          title: { absolute: fullTitle },
          description: metaDesc,
          openGraph: {
            ...localized.openGraph,
            title: fullTitle,
            description: metaDesc,
          },
          twitter: {
            ...localized.twitter,
            title: fullTitle,
            description: metaDesc,
          },
        };
      }
    } catch {
      // Keep localized
    }
  }

  return localized;
}

/**
 * The About page, after Catalis's: a hero with two staggered pictures, the
 * story as one large statement with its numbers, the values on a grey panel,
 * the team, what clients say, the latest posts and the sky panel. Every word
 * and picture comes from the admin panel; a section with nothing in it (no
 * team yet, no testimonials) does not render at all.
 */
export default async function AboutUsPage() {
  const [page, posts] = await Promise.all([getPage("about"), getPosts()]);
  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([{ name: "About", path: "/about" }]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <Hero hero={page.hero} />
      {page.story.visible ? <Story story={page.story} /> : null}
      {page.values.visible && page.values.items.length > 0 ? <Values values={page.values} /> : null}
      {page.team.visible && page.team.members.length > 0 ? <Team team={page.team} /> : null}
      {page.testimonials.visible && page.testimonials.items.length > 0 ? (
        <Testimonials testimonials={page.testimonials} />
      ) : null}
      {page.blog.visible && posts.length > 0 ? (
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CenteredHead head={page.blog} />
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug} className="reveal">
                  <PostCardTile post={cardView(post)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <PageCta cta={page.cta} />
    </>
  );
}

function CenteredHead({ head, tone = "dark" }: { head: SectionHead; tone?: "dark" | "light" }) {
  return (
    <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
      {head.eyebrow ? <CatalisBadge className="mb-5">{head.eyebrow}</CatalisBadge> : null}
      <h2
        className={cn(
          "font-serif text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.25rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        <Accent text={head.heading} />
      </h2>
      {head.intro ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{head.intro}</p>
      ) : null}
    </div>
  );
}

/* ── hero ────────────────────────────────────────────────────────────────── */

function Hero({ hero }: { hero: AboutPage["hero"] }) {
  const [first, second] = hero.images;
  return (
    // pt-28: the site header is fixed over the page, not in its flow.
    <section className="overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
        <div>
          {hero.eyebrow ? <CatalisBadge className="mb-6">{hero.eyebrow}</CatalisBadge> : null}
          <h1 className="font-serif text-[3.4rem] leading-[0.98] tracking-[-0.03em] text-balance text-ink sm:text-7xl lg:text-[5.25rem]">
            <Accent text={hero.heading} />
          </h1>
          {hero.intro ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{hero.intro}</p>
          ) : null}
          <div className="mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 empty:hidden sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <CtaLink link={hero.primary} variant="primary" className="h-12 px-7 text-[15px]" />
            <CtaLink link={hero.secondary} variant="secondary" className="h-12 px-7 text-[15px]" />
          </div>
        </div>

        <div aria-hidden={!first && !second ? true : undefined} className="grid grid-cols-2 gap-4 sm:gap-5">
          <HeroPanel image={first} className="mt-16 aspect-[3/4] sm:mt-24" sky="sky" card="apps" />
          <HeroPanel image={second} className="aspect-[3/4.1]" sky="deep" card="commission" />
        </div>
      </div>
    </section>
  );
}

/**
 * One of the hero's two pictures: the uploaded photo, or the site's sky when
 * there is none, either way with a small card floating on it as the
 * reference has. The cards only say what is true of the platform.
 */
function HeroPanel({
  image,
  className,
  sky,
  card,
}: {
  image: PageImage | undefined;
  className: string;
  sky: "sky" | "deep";
  card: "apps" | "commission";
}) {
  const source = image ? imageOf(image.src) : null;
  const floating =
    card === "apps" ? (
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-3.5 shadow-lg backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
        <p className="text-[11px] font-semibold text-ink">One platform, three apps</p>
        <ul className="mt-2.5 space-y-1.5 text-[11px] text-muted sm:text-xs">
          {["Storefront", "Admin panel", "Backend"].map((app) => (
            <li key={app} className="flex items-center justify-between gap-2">
              <span>{app}</span>
              <span className="flex size-4 items-center justify-center rounded-full bg-brand-blue text-white">
                <Check aria-hidden className="size-2.5" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="absolute top-3 left-3 rounded-2xl bg-white/90 p-3.5 shadow-lg backdrop-blur-md sm:top-4 sm:left-4 sm:p-4">
        <p className="text-[11px] font-semibold text-ink">Commission on your sales</p>
        <p className="mt-1 font-serif text-4xl leading-none text-brand-blue sm:text-5xl">0%</p>
      </div>
    );

  if (source) {
    return (
      <div className={cn("relative overflow-hidden rounded-[28px] bg-sunken sm:rounded-[2rem]", className)}>
        <SiteImage image={source} alt={image?.alt ?? ""} sizes="(min-width: 1024px) 300px, 45vw" preload />
        <div aria-hidden="true">{floating}</div>
      </div>
    );
  }
  return (
    <SkyPanel tone={sky} className={cn("rounded-[28px] sm:rounded-[2rem]", className)}>
      <div aria-hidden="true">{floating}</div>
    </SkyPanel>
  );
}

/* ── story ───────────────────────────────────────────────────────────────── */

function Story({ story }: { story: AboutPage["story"] }) {
  const images = story.images.map((image) => ({ image, source: imageOf(image.src) })).filter((item) => item.source);
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {story.eyebrow ? <CatalisBadge className="reveal">{story.eyebrow}</CatalisBadge> : null}
          </div>
          <div className="lg:col-span-8">
            {story.statement ? (
              <p className="reveal font-serif text-[2.1rem] leading-[1.12] tracking-[-0.015em] text-pretty text-ink sm:text-5xl lg:text-[3.4rem]">
                {story.statement}
              </p>
            ) : null}
            {story.stats.length > 0 ? (
              <dl className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
                {story.stats.map((stat, index) => {
                  const staggers = ["stagger-1", "stagger-2", "stagger-3"];
                  return (
                    <div
                      key={`${stat.value}-${stat.label}`}
                      className={cn("reveal flex items-center gap-4 sm:flex-col sm:items-start sm:gap-2", staggers[index % 3])}
                    >
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-serif text-6xl leading-none tracking-[-0.02em] text-ink tabular-nums">
                        <AnimatedCounter value={stat.value} />
                      </dd>
                      <dd className="max-w-[14rem] text-sm leading-snug text-muted">{stat.label}</dd>
                    </div>
                  );
                })}
              </dl>
            ) : null}
          </div>
        </div>

        {images.length > 0 ? (
          <div
            className={cn(
              "mt-16 grid gap-4 sm:mt-20 sm:gap-5",
              images.length === 2 && "sm:grid-cols-2",
              images.length === 3 && "sm:grid-cols-[1.1fr_0.8fr_1.1fr]",
            )}
          >
            {images.map(({ image, source }) => (
              <div key={image.src} className="reveal relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sunken sm:aspect-[4/3.6] sm:rounded-[2rem]">
                <SiteImage image={source!} alt={image.alt} sizes="(min-width: 640px) 33vw, 92vw" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ── values ──────────────────────────────────────────────────────────────── */

/** Five cards sit as two over three, as on the reference; other counts in even rows. */
function valueSpan(count: number, index: number): string {
  if (count === 1) return "lg:col-span-6";
  if (count === 2 || count === 4) return "lg:col-span-3";
  if (count === 5) return index < 2 ? "lg:col-span-3" : "lg:col-span-2";
  return "lg:col-span-2";
}

function Values({ values }: { values: AboutPage["values"] }) {
  return (
    <section className="px-3 py-3">
      <div className="rounded-[28px] bg-sunken px-4 py-20 sm:rounded-[2.5rem] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <CenteredHead head={values} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {values.items.map((item, index) => {
              const Icon = valueIcon(item.icon);
              return (
                <li
                  key={`${item.title}-${index}`}
                  className={cn(
                    "reveal card-lift group rounded-[28px] bg-white p-7 sm:p-8 border border-transparent hover:border-brand-blue/20 cursor-default",
                    valueSpan(values.items.length, index),
                  )}
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-sunken text-brand-blue transition-transform duration-300 group-hover:scale-110">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-10 font-serif text-[1.85rem] leading-[1.1] tracking-[-0.01em] text-ink">{item.title}</h3>
                  {item.text ? <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted">{item.text}</p> : null}
                </li>
              );
            })}
          </ul>
          {values.cta.label && values.cta.href ? (
            <div className="reveal mt-12 flex justify-center">
              <CtaLink link={values.cta} variant="primary" className="h-12 px-7 text-[15px]" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── team ────────────────────────────────────────────────────────────────── */

function Team({ team }: { team: AboutPage["team"] }) {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <CenteredHead head={team} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => {
            const photo = imageOf(member.photo);
            return (
              <li key={member.name} className="reveal rounded-[28px] bg-sunken p-2">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-[22px] bg-[#4B8CE4] sm:aspect-[4/4.4]">
                  {photo ? (
                    <SiteImage image={photo} alt={member.name} sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw" />
                  ) : (
                    <SkyPanel className="absolute inset-0 flex items-center justify-center rounded-none sm:rounded-none">
                      <span aria-hidden="true" className="font-serif text-7xl text-white italic">
                        {member.name.slice(0, 1)}
                      </span>
                    </SkyPanel>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3 px-3 pt-4 pb-3">
                  <div>
                    <p className="text-lg font-semibold text-ink">{member.name}</p>
                    {member.role ? <p className="text-sm text-muted">{member.role}</p> : null}
                    {member.bio ? <p className="mt-2 text-sm leading-relaxed text-muted">{member.bio}</p> : null}
                  </div>
                  {member.link ? (
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} elsewhere`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink/70 transition-colors hover:text-ink"
                    >
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── testimonials ────────────────────────────────────────────────────────── */

function Testimonials({ testimonials }: { testimonials: AboutPage["testimonials"] }) {
  return (
    <section className="overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-4">
          {testimonials.eyebrow ? <CatalisBadge className="mb-5">{testimonials.eyebrow}</CatalisBadge> : null}
          <h2 className="font-serif text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance text-ink sm:text-6xl">
            <Accent text={testimonials.heading} />
          </h2>
          {testimonials.intro ? <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">{testimonials.intro}</p> : null}
        </div>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:col-span-8 lg:mx-0 lg:px-0">
          {testimonials.items.map((item) => {
            const photo = imageOf(item.photo);
            return (
              <li key={`${item.name}-${item.quote.slice(0, 16)}`} className="w-[19rem] shrink-0 snap-start sm:w-[22rem]">
                <figure className="flex h-full flex-col rounded-[28px] bg-sunken p-7">
                  <div className="flex items-center justify-between">
                    <span className="relative size-12 overflow-hidden rounded-full bg-white">
                      {photo ? (
                        <SiteImage image={photo} alt="" sizes="48px" />
                      ) : (
                        <span aria-hidden="true" className="flex size-full items-center justify-center font-serif text-xl text-ink">
                          {item.name.slice(0, 1)}
                        </span>
                      )}
                    </span>
                    <Quote aria-hidden className="size-7 fill-ink text-ink" />
                  </div>
                  <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-ink/80">{item.quote}</blockquote>
                  <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-4">
                    <span>
                      <span className="block text-sm font-semibold text-ink">{item.name}</span>
                      {item.role ? <span className="block text-xs text-muted">{item.role}</span> : null}
                    </span>
                    <span aria-hidden="true" className="hidden font-serif text-2xl whitespace-nowrap text-ink/80 italic sm:inline">
                      {item.name}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
