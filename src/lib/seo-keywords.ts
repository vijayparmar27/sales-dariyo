/**
 * Curated B2B and technical SEO keyword taxonomy for the Dariyo Commerce Platform.
 * Categorized by search intent and target customer profiles (CTOs, D2C Founders, Wholesale Distributors).
 */

export interface KeywordCluster {
  category: string;
  intent: "commercial" | "transactional" | "informational";
  primary: string;
  keywords: string[];
}

export const SEO_KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    category: "Platform & Source Code Licensing",
    intent: "commercial",
    primary: "commerce platform source code license",
    keywords: [
      "buy ecommerce platform source code",
      "self-hosted ecommerce platform",
      "turnkey ecommerce platform source code",
      "zero commission ecommerce platform",
      "ecommerce code license India",
      "white-label ecommerce software",
      "enterprise commerce source code",
      "own your ecommerce codebase",
    ],
  },
  {
    category: "Modern Technology Stack",
    intent: "commercial",
    primary: "next.js 16 ecommerce platform",
    keywords: [
      "next.js 16 react 19 ecommerce",
      "react operator admin console template",
      "node.js express commerce api backend",
      "fastapi python ecommerce microservices",
      "three.js interactive 3d product viewer ecommerce",
      "tailwind css 4 storefront",
      "dockerized ecommerce deployment",
      "postgresql prisma high-concurrency commerce",
    ],
  },
  {
    category: "B2B Wholesale & Omnichannel Commerce",
    intent: "commercial",
    primary: "b2b wholesale ecommerce portal software",
    keywords: [
      "automated gstin verification wholesale portal",
      "tiered bulk pricing ecommerce portal",
      "hybrid retail and wholesale commerce engine",
      "digital wholesale order management",
      "commercial b2b quotation builder",
      "pan-india wholesale dry fish and grocery platform",
    ],
  },
  {
    category: "Dedicated Developer Staffing & Engineering",
    intent: "transactional",
    primary: "hire dedicated next.js react node developers",
    keywords: [
      "hire dedicated react 19 developers India",
      "hire senior node.js backend engineers",
      "dedicated python fastapi developer staffing",
      "hire react native mobile app developers",
      "custom ecommerce development agency India",
      "offshore full stack typescript software engineers",
    ],
  },
  {
    category: "Multilingual & Regional Intent",
    intent: "informational",
    primary: "ecommerce platform India",
    keywords: [
      // Hindi
      "ई-कॉमर्स प्लेटफॉर्म सोर्स कोड",
      "ऑनलाइन स्टोर सॉफ्टवेयर",
      "थोक व्यापार पोर्टल",
      // Gujarati
      "ઓનલાઇન સ્ટોર સોફ્ટવેર",
      "વાણિજ્ય પ્લેટફોર્મ સોર્સ કોડ",
      // International
      "plateforme e-commerce code source",
      "plataforma de comercio electrónico código fuente",
      "E-Commerce-Plattform Quellcode-Lizenz",
      "منصة التجارة الإلكترونية كود المصدر",
    ],
  },
];

/**
 * Flattened array of all primary keywords for meta tags and content auditing.
 */
export const ALL_KEYWORDS: string[] = Array.from(
  new Set(SEO_KEYWORD_CLUSTERS.flatMap((c) => [c.primary, ...c.keywords])),
);
