import type { Metadata } from "next";

import { Accent, plainHeading } from "@/components/content/accent";
import { PageCta } from "@/components/content/page-cta";
import { CatalisBadge } from "@/components/ui";
import { site } from "@/config/site";
import { buildBreadcrumbJsonLd, ORGANIZATION_ID, serializeJsonLd } from "@/lib/seo";
import { cardView, getPage, getPosts } from "@/lib/site-api";

import { BlogIndex } from "./blog-index";

/** Read from the admin panel; refreshed at once by a save there, or after five minutes. */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("blog");
  const title = page.seo.title || plainHeading(page.hero.heading);
  const description = page.seo.description || page.hero.intro;
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

/**
 * The blog, after Catalis's Blog V1: a centred heading with a search box, the
 * featured posts sliding by underneath, then every post in a grid of soft
 * cards with a category filter, and the sky panel to close.
 */
export default async function BlogPage() {
  const [page, posts] = await Promise.all([getPage("blog"), getPosts()]);

  const collectionJsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering & Commerce Blog",
    description: page.seo.description || page.hero.intro,
    url: `${site.url}/blog`,
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
  });
  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([{ name: "Blog", path: "/blog" }]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      {/* pt-28: the site header is fixed over the page, not in its flow. */}
      <section className="overflow-hidden px-4 pt-28 pb-20 text-center sm:px-6 sm:pt-36 sm:pb-28 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          {page.hero.eyebrow ? <CatalisBadge className="mb-6">{page.hero.eyebrow}</CatalisBadge> : null}
          <h1 className="font-serif text-[3.4rem] leading-[0.98] tracking-[-0.03em] text-balance text-ink sm:text-7xl lg:text-[5.5rem]">
            <Accent text={page.hero.heading} />
          </h1>
          {page.hero.intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{page.hero.intro}</p>
          ) : null}
        </div>

        <BlogIndex
          posts={posts.map(cardView)}
          categories={page.categories}
          searchPlaceholder={page.hero.searchPlaceholder}
          featuredHeading={page.featured.heading}
          showFeatured={page.featured.visible}
          latest={page.latest}
        />
      </section>

      <PageCta cta={page.cta} />
    </>
  );
}
