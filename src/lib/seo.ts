import { site } from "@/config/site";
import { packageFigures } from "@/lib/packages";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";

/**
 * Authoritative Knowledge Graph and Wikidata entity reconciliation links.
 * Referencing established Wikidata IDs eliminates entity ambiguity for search engines
 * and AI grounding models (Google Gemini/SGE, OpenAI, Perplexity).
 */
export const WIKIDATA_ENTITIES = {
  ecommerce: "https://www.wikidata.org/wiki/Q48483",
  b2bEcommerce: "https://www.wikidata.org/wiki/Q852643",
  nextjs: "https://www.wikidata.org/wiki/Q105574676",
  react: "https://www.wikidata.org/wiki/Q193988",
  typescript: "https://www.wikidata.org/wiki/Q212854",
  nodejs: "https://www.wikidata.org/wiki/Q756100",
  fastapi: "https://www.wikidata.org/wiki/Q105593849",
  postgresql: "https://www.wikidata.org/wiki/Q192490",
  redis: "https://www.wikidata.org/wiki/Q193606",
  docker: "https://www.wikidata.org/wiki/Q16298585",
  threejs: "https://www.wikidata.org/wiki/Q2699320",
  tailwind: "https://www.wikidata.org/wiki/Q107125340",
} as const;

/**
 * Stable Entity IDs for Schema.org linked data graphs.
 */
export const ORGANIZATION_ID = `${site.url.replace(/\/+$/, "")}/#organization`;
export const WEBSITE_ID = `${site.url.replace(/\/+$/, "")}/#website`;
export const SOFTWARE_ID = `${site.url.replace(/\/+$/, "")}/#software`;
export const SOURCE_CODE_ID = `${site.url.replace(/\/+$/, "")}/#sourcecode`;

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
 * Generates an exhaustive `alternates.languages` (hreflang) mapping for all 7 supported
 * languages plus x-default. Crucial for international and multilingual SEO.
 */
export function getLanguageAlternates(path = ""): Record<string, string> {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const alternates: Record<string, string> = {};

  for (const lang of Object.keys(SUPPORTED_LANGUAGES)) {
    // English is default; others use ?lang= query or localized routes
    alternates[lang] = lang === "en" 
      ? getCanonicalUrl(cleanPath)
      : getCanonicalUrl(`${cleanPath}?lang=${lang}`);
  }

  // x-default directs global searchers to default English root
  alternates["x-default"] = getCanonicalUrl(cleanPath);

  return alternates;
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
 * Organization Schema identifying the business entity with Knowledge Graph semantics.
 */
export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: `${site.name} Technologies`,
    alternateName: [
      "Dariyo Solutions",
      "Dariyo Commerce",
      "દરિયો",
      "दरियो",
      "داريو",
      "Dariyo Software",
      "Dariyo Clone",
    ],
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 1200,
      height: 200,
    },
    description: site.description,
    knowsAbout: [
      WIKIDATA_ENTITIES.ecommerce,
      WIKIDATA_ENTITIES.b2bEcommerce,
      WIKIDATA_ENTITIES.nextjs,
      WIKIDATA_ENTITIES.react,
      WIKIDATA_ENTITIES.typescript,
      WIKIDATA_ENTITIES.nodejs,
      WIKIDATA_ENTITIES.fastapi,
      WIKIDATA_ENTITIES.threejs,
    ],
    ...(site.email || site.phone || site.whatsapp
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              ...(site.email ? { email: site.email } : {}),
              ...(site.phone ? { telephone: site.phone } : {}),
              availableLanguage: ["en", "hi", "gu", "es", "fr", "de", "ar"],
            },
          ],
        }
      : {}),
    sameAs: [
      site.showcase.enabled ? site.showcase.url : null,
      "https://linkedin.com/company/dariyo",
      "https://x.com/dariyo_official",
      "https://www.youtube.com/@Dariyo-Official",
      "https://www.instagram.com/dariyo.official/",
    ].filter(Boolean),
  };
}

/**
 * WebSite Schema for the entire domain with multi-language and sitelink potential.
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
 * SiteNavigationElement Schema generating clear Google Sitelinks.
 */
export function buildSiteNavigationJsonLd() {
  const items = [
    { name: "Pricing & Packages", url: getCanonicalUrl("/pricing"), description: "Turnkey commerce license packages and interactive pricing calculator." },
    { name: "Software Engineering Services", url: getCanonicalUrl("/services"), description: "Hire dedicated Node.js, React, Next.js, and FastAPI developers." },
    { name: "About Dariyo Solutions", url: getCanonicalUrl("/about"), description: "Our engineering story, architecture values, and verified delivery stats." },
    { name: "Engineering Blog", url: getCanonicalUrl("/blog"), description: "Technical articles on modern commerce architecture and web performance." },
    { name: "Contact & Inquiries", url: getCanonicalUrl("/contact"), description: "Schedule an enterprise consultation and quote discussion." },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };
}

/**
 * SoftwareApplication Schema representing the Commerce Platform product with rich review stars.
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
    "@id": SOFTWARE_ID,
    name: `${site.name} ${site.product}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "E-Commerce Platform & Online Storefront",
    operatingSystem: "Cloud, Linux, Node.js 20+, Docker, AWS, Hetzner, Vercel",
    description: site.description,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.94",
      reviewCount: "38",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "D2C Brand Founder" },
        datePublished: "2026-09-15",
        reviewBody:
          "Turnkey commerce engine with exceptional sub-second checkout speeds, seamless wholesale GST handling, and zero recurring GMV cuts.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: figures[0]?.setupFee ?? 175000,
      highPrice: figures.at(-1)?.setupFee ?? 710000,
      offerCount: figures.length,
      offers,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-subtitle", ".speakable-intro"],
    },
    featureList: [
      "Custom Branded Next.js 16 Storefront",
      "B2B Wholesale Portal & Automated GSTIN Verification",
      "React 19 Operator Admin Console",
      "High-Performance Express & PostgreSQL Backend API",
      "Interactive 3D Product Viewers with Three.js",
      "Permanent Source Code License",
      "0% Recurring GMV Commission",
    ],
  };
}

/**
 * SoftwareSourceCode Schema explicitly documenting the licensed code repository.
 */
export function buildSoftwareSourceCodeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": SOURCE_CODE_ID,
    name: `${site.name} Commerce Engine Full Source Code`,
    description:
      "Production-hardened TypeScript, Python, and SQL source code for storefront, wholesale portal, admin dashboard, and backend services.",
    programmingLanguage: [
      { "@type": "ComputerLanguage", name: "TypeScript", sameAs: WIKIDATA_ENTITIES.typescript },
      { "@type": "ComputerLanguage", name: "Python", sameAs: "https://www.wikidata.org/wiki/Q28865" },
      { "@type": "ComputerLanguage", name: "SQL", sameAs: "https://www.wikidata.org/wiki/Q47607" },
    ],
    runtimePlatform: ["Node.js 20+", "Docker", "Linux", "PostgreSQL 16+", "Redis 7+"],
    license: getCanonicalUrl("/about#license"),
    codeRepository: getCanonicalUrl("/pricing"),
    targetProduct: {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
    },
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
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article header p", ".post-body p:first-of-type"],
    },
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
