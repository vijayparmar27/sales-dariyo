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
  softwareEngineering: "https://www.wikidata.org/wiki/Q8078",
  webDevelopment: "https://www.wikidata.org/wiki/Q386275",
  cloudComputing: "https://www.wikidata.org/wiki/Q483639",
  microservices: "https://www.wikidata.org/wiki/Q18344607",
  headlessCommerce: "https://www.wikidata.org/wiki/Q105822180",
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
 * When a non-default language is specified, properly maintains self-referencing canonicals
 * as required by Google Search Central multilingual indexing guidelines.
 */
export function getCanonicalUrl(path = "", lang?: string): string {
  const base = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  if (!path) {
    return lang && lang !== "en" ? `${base}/?lang=${lang}` : base;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (lang && lang !== "en" && !cleanPath.includes("?lang=")) {
    const separator = cleanPath.includes("?") ? "&" : "?";
    return `${base}${cleanPath}${separator}lang=${lang}`;
  }
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
    alternates[lang] = getCanonicalUrl(cleanPath, lang);
  }

  // x-default directs global searchers to default English root
  alternates["x-default"] = getCanonicalUrl(cleanPath, "en");

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
 * Specifies geographic areas served, dual commerce product & developer staffing catalogs,
 * multi-script name variants, and official contact points.
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
      "டாரியோ",
      "డారియో",
      "ಡಾರಿಯೋ",
      "ഡാരിയോ",
      "ডারিয়ো",
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
      WIKIDATA_ENTITIES.softwareEngineering,
      WIKIDATA_ENTITIES.webDevelopment,
      WIKIDATA_ENTITIES.cloudComputing,
      WIKIDATA_ENTITIES.microservices,
      WIKIDATA_ENTITIES.headlessCommerce,
    ],
    areaServed: [
      { "@type": "Country", name: "India", identifier: "IN" },
      { "@type": "Country", name: "United States", identifier: "US" },
      { "@type": "Country", name: "United Kingdom", identifier: "GB" },
      { "@type": "Country", name: "Germany", identifier: "DE" },
      { "@type": "Country", name: "France", identifier: "FR" },
      { "@type": "Country", name: "Spain", identifier: "ES" },
      { "@type": "Country", name: "United Arab Emirates", identifier: "AE" },
      { "@type": "Country", name: "Saudi Arabia", identifier: "SA" },
      { "@type": "Country", name: "Singapore", identifier: "SG" },
      { "@type": "Country", name: "Australia", identifier: "AU" },
      { "@type": "Country", name: "Canada", identifier: "CA" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dariyo Solutions Primary Services & Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Commerce Platform Software Licenses",
          description: "Permanent commercial source code licenses for Next.js 16 storefront, React 19 admin, and B2B wholesale portal.",
          url: getCanonicalUrl("/pricing"),
        },
        {
          "@type": "OfferCatalog",
          name: "Software Engineering & Dedicated Developer Staffing",
          description: "Pre-vetted senior React, Next.js, Node.js, and FastAPI engineers available for dedicated full-time and part-time hire.",
          url: getCanonicalUrl("/services"),
        },
      ],
    },
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getCanonicalUrl("/blog")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
            description: "Hire dedicated Node.js, React.js, Next.js, React Native, and FastAPI software engineers with 1-week risk-free trial.",
            serviceType: "Staff Augmentation",
            category: "Software Development",
            sameAs: WIKIDATA_ENTITIES.softwareEngineering,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Application Development",
            description: "Turnkey development of responsive, accessible, high-performance web applications using Next.js 16 and React 19.",
            serviceType: "Custom Software Engineering",
            category: "Web Development",
            sameAs: WIKIDATA_ENTITIES.webDevelopment,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Mobile App Development",
            description: "Cross-platform iOS and Android mobile app development with React Native, Expo, and offline synchronization.",
            serviceType: "Mobile Application Development",
            category: "Mobile Engineering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Commerce Cloud Deployment",
            description: "Production cloud infrastructure provisioning on AWS, Hetzner, or VPS with Docker, Redis, and PostgreSQL.",
            serviceType: "DevOps & Cloud Infrastructure",
            category: "Cloud Engineering",
            sameAs: WIKIDATA_ENTITIES.cloudComputing,
          },
        },
      ],
    },
  };
}

/**
 * Structured Table / Comparison Schema for platform evaluations.
 */
export function buildComparisonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    name: "eCommerce Platform Architecture and 3-Year TCO Comparison",
    about: "Evaluation of Dariyo Commerce Clone vs Shopify Plus vs MedusaJS vs In-House Development",
    description:
      "Comprehensive matrix comparing total cost of ownership (TCO), source code rights, B2B wholesale features, and launch velocity.",
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

/**
 * HowTo Schema for capturing step-by-step rich SERP snippets in Google Search.
 */
export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export function buildHowToJsonLd(data: {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    ...(data.totalTime ? { totalTime: data.totalTime } : {}),
    ...(data.inLanguage ? { inLanguage: data.inLanguage } : { inLanguage: "en" }),
    step: data.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

export const COMMERCE_LAUNCH_HOW_TO = {
  name: "How to Launch a Self-Hosted B2B & D2C Commerce Platform in 48 Hours",
  description:
    "A step-by-step guide to provisioning, customizing, and deploying a permanent Next.js 16 eCommerce platform with full source code ownership.",
  totalTime: "P2D",
  steps: [
    {
      name: "Select Platform Architecture & Package Tier",
      text: "Choose between Starter, Growth, or Complete edition depending on your need for B2B wholesale portals, multi-currency support, and 3D product visualizers.",
      url: getCanonicalUrl("/pricing"),
    },
    {
      name: "Provision Secure Cloud Infrastructure",
      text: "Deploy Docker Compose containers on AWS, Hetzner, or a private VPS with automated PostgreSQL, Redis, and SSL certificate provisioning.",
    },
    {
      name: "Connect Payment Gateways & Tax Validation",
      text: "Configure Razorpay, Stripe, Cashfree, or Cash on Delivery credentials, and enable real-time GSTIN / tax ID verification webhooks.",
    },
    {
      name: "Import Product Catalog & Configure Wholesale Margin Tiers",
      text: "Upload your product catalog, image assets, inventory batches, and set up tiered bulk discount brackets for verified B2B buyers.",
    },
    {
      name: "Point Domain & Go Live with 95+ Core Web Vitals",
      text: "Map your production domain DNS, configure Cloudflare edge caching, and launch your storefront with sub-second page speeds and 0% GMV commission.",
    },
  ],
};

export const DEVELOPER_HIRING_HOW_TO = {
  name: "How to Hire Dedicated Senior Software Engineers with 1-Week Trial",
  description:
    "Step-by-step roadmap for hiring pre-vetted full-time or part-time React, Next.js, Node.js, and DevOps engineers with zero placement fees.",
  totalTime: "P3D",
  steps: [
    {
      name: "Define Technical Requirements & Role Scope",
      text: "Identify your target technology stack, seniority requirements, and required timezone overlap for frontend, backend, or cloud engineers.",
      url: getCanonicalUrl("/services"),
    },
    {
      name: "Receive Matched Candidate Profiles within 24 Hours",
      text: "Our engineering leads match your requirements with pre-vetted senior developers who have verified production experience in our active codebases.",
    },
    {
      name: "Conduct Direct Live Technical Alignment Interview",
      text: "Meet shortlisted engineers directly on Google Meet or Zoom to assess communication, architectural reasoning, and team culture fit.",
    },
    {
      name: "Initiate 1-Week Risk-Free Technical Evaluation Trial",
      text: "Integrate the developer into your Slack, Jira, and GitHub. If velocity or code quality does not meet your standards within 7 days, you owe nothing.",
    },
    {
      name: "Seamless Onboarding & Predictable Monthly Scaling",
      text: "Commence regular sprints with dedicated 4-5 hours daily synchronous overlap, signed NDA protection, and full IP ownership of all commits.",
    },
  ],
};

/**
 * CollectionPage Schema for the HTML Sitemap page.
 * Establishes hierarchical crawl paths and lists major site hubs and resources for search bots.
 */
export function buildSitemapCollectionJsonLd(baseUrl: string) {
  return {
    "@type": "CollectionPage",
    "@id": `${baseUrl}/sitemap#collection`,
    url: `${baseUrl}/sitemap`,
    name: "Dariyo Complete Site Directory & Architecture Index",
    description:
      "Hierarchical index of commerce software clone packages, dedicated engineering services, and technical documentation.",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "E-Commerce Solutions & Clones",
          url: `${baseUrl}/#features`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Software Engineering & Dedicated Developer Staffing",
          url: `${baseUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Commercial Pricing & License Packages",
          url: `${baseUrl}/pricing`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Technical Blog & Architecture Guides",
          url: `${baseUrl}/blog`,
        },
      ],
    },
  };
}


