import { site } from "@/config/site";
import { packageFigures } from "@/lib/packages";

/**
 * Stable Entity IDs for Schema.org linked data graphs.
 * Consistent IDs allow search and answer engines to assemble a unified Knowledge Graph node.
 */
export const ORGANIZATION_ID = `${site.url.replace(/\/+$/, "")}/#organization`;
export const WEBSITE_ID = `${site.url.replace(/\/+$/, "")}/#website`;

export const LOGO_URL = `${site.url.replace(/\/+$/, "")}/logo/dariyo-full-logo.png`;

/**
 * Returns an absolute canonical URL for any route path.
 */
export function getCanonicalUrl(path = ""): string {
  const base = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  if (!path) return base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Safely serializes JSON-LD structured data for injection into inline <script> elements.
 * Escapes characters that can terminate HTML script tags (<, >, &) and line terminators.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Organization Schema identifying the business entity.
 */
export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: `${site.name} Technologies`,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 1200,
      height: 200,
    },
    description: site.description,
    ...(site.email || site.phone || site.whatsapp
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              ...(site.email ? { email: site.email } : {}),
              ...(site.phone ? { telephone: site.phone } : {}),
              availableLanguage: ["en", "hi", "gu"],
            },
          ],
        }
      : {}),
    sameAs: [
      site.showcase.enabled ? site.showcase.url : null,
    ].filter(Boolean),
  };
}

/**
 * WebSite Schema for the entire domain.
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${site.name} — ${site.product}`,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
    inLanguage: ["en", "hi", "gu", "es", "fr", "de", "ar"],
  };
}

/**
 * SoftwareApplication Schema representing the Commerce Platform product.
 */
export function buildSoftwareApplicationJsonLd() {
  const figures = packageFigures();
  const offers = figures.map((pkg) => ({
    "@type": "Offer",
    name: `${pkg.name} Package`,
    description: pkg.blurb,
    price: pkg.setupFee,
    priceCurrency: "INR",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    url: getCanonicalUrl(`/pricing?pkg=${pkg.id}`),
    seller: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${site.name} ${site.product}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Linux, Node.js 20+, Docker",
    description: site.description,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: figures[0]?.setupFee ?? 125000,
      highPrice: figures.at(-1)?.setupFee ?? 460000,
      offerCount: figures.length,
      offers,
    },
    featureList: [
      "Custom Branded Next.js Storefront",
      "B2B Wholesale Portal & GST Verification",
      "React Operator Admin Console",
      "High-Performance Express & PostgreSQL API",
      "Interactive 3D Product Viewers",
      "Complete Source Code License",
      "Zero Recurring GMV Commission",
    ],
  };
}

/**
 * Service Schema for custom software engineering and developer staffing on /services.
 */
export function buildServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Engineering & Dedicated Developer Staffing",
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering & Staffing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dedicated Developer Staffing",
            description: "Hire dedicated Node.js, React.js, Next.js, React Native, and FastAPI software engineers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Application Development",
            description: "Turnkey development of responsive, accessible, high-performance web applications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Mobile App Development",
            description: "Cross-platform iOS and Android mobile app development with React Native.",
          },
        },
      ],
    },
  };
}

/**
 * FAQPage Schema for rich Google search result accordions.
 */
export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema for hierarchical search navigation.
 */
export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getCanonicalUrl("/"),
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: getCanonicalUrl(item.path),
      })),
    ],
  };
}

/**
 * BlogPosting Schema for article pages (/blog/[slug]).
 */
export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string | null;
  image?: string;
  authorName?: string;
  wordCount?: number;
  category?: string;
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: input.url,
    datePublished: input.datePublished,
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.category ? { articleSection: input.category } : {}),
    author: {
      "@type": "Person",
      name: input.authorName || site.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };
}
