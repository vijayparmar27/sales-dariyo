/**
 * What the platform sells and for how much. The pricing page, the quote, the
 * home page and `scripts/verify-quote.ts` all read this file and nothing else
 * holds a price, so changing an offer is an edit here and a redeploy.
 *
 * Amounts are whole rupees before GST. The file is plain data with no imports
 * so the verify script can load it straight into Node, without a bundler.
 *
 * The model is a licensed copy per buyer: a one-time setup fee for the modules
 * they pick (deployment, branding, accounts connected, training), then a
 * monthly support plan. Hosting is billed to the buyer by each provider, so it
 * is shown as an estimate beside the quote, never inside it.
 */

export type GroupId = "core" | "selling" | "showcase" | "growth";

export interface ModuleGroup {
  id: GroupId;
  name: string;
  blurb: string;
}

export interface PlatformModule {
  id: string;
  name: string;
  summary: string;
  includes: readonly string[];
  group: GroupId;
  /** One-time fee, whole rupees before GST. */
  setupFee: number;
  /** Working days this module adds to the launch plan. */
  setupDays: number;
  /** In every store; a buyer cannot take it out. */
  required?: boolean;
  /** Something the buyer supplies or pays for separately. */
  note?: string;
}

export interface Package {
  id: string;
  name: string;
  blurb: string;
  modules: readonly string[];
}

export interface SupportPlan {
  id: string;
  name: string;
  /** Whole rupees a month before GST; 0 means pay by the hour. */
  monthlyFee: number;
  hoursPerMonth: number;
  covers: readonly string[];
}

export interface HostingItem {
  name: string;
  provider: string;
  /** Whole rupees a month, paid by the buyer to the provider. */
  monthly: number;
}

export interface HostingTier {
  id: string;
  name: string;
  blurb: string;
  items: readonly HostingItem[];
}

export const GROUPS: readonly ModuleGroup[] = [
  {
    id: "core",
    name: "In every store",
    blurb: "Store, admin panel and backend, branded and deployed for you.",
  },
  {
    id: "selling",
    name: "Sell more",
    blurb: "Trade buyers, discount codes and delivery offers.",
  },
  {
    id: "showcase",
    name: "Show products in 3D",
    blurb: "A home page and product views that stand out.",
  },
  {
    id: "growth",
    name: "Get found and measure",
    blurb: "Search pages, content and reports.",
  },
];

export const MODULES: readonly PlatformModule[] = [
  {
    id: "core",
    name: "Core store",
    summary:
      "Your own online store, admin panel and backend, branded and deployed on your servers.",
    includes: [
      "Online store: product listing, product pages with pack sizes, cart and checkout",
      "Razorpay payments (UPI, cards, net banking, wallets) and cash on delivery",
      "Sign-in with Google, mobile number or email; order history, live order tracking, returns",
      "Admin panel: products, categories, orders, refunds, stock, warehouses and customers",
      "GST invoices and credit notes",
      "Delhivery shipping with pickups and live tracking",
      "Staff accounts with roles and per-person permissions",
      "Security: rate limits, flood protection, encrypted payment and courier keys",
      "Installs on phones as an app, light and dark themes, maintenance mode",
    ],
    group: "core",
    setupFee: 175000,
    setupDays: 15,
    required: true,
  },
  {
    id: "wholesale",
    name: "Wholesale and B2B",
    summary: "A trade portal for bulk buyers, run from the same admin panel.",
    includes: [
      "Business accounts and sign-up for trade buyers",
      "Bulk quote requests with automatic quotes",
      "Stock holds and capacity planning for large orders",
      "Freight by Delhivery B2B, with e-way bill details",
      "Documents, online payment and a message thread with your team on every deal",
    ],
    group: "selling",
    setupFee: 175000,
    setupDays: 10,
  },
  {
    id: "offers",
    name: "Coupons and delivery offers",
    summary: "Discount codes and store-paid delivery, set from the admin panel.",
    includes: [
      "Coupon codes with limits and rules",
      "The store pays part or all of the delivery charge",
    ],
    group: "selling",
    setupFee: 25000,
    setupDays: 1,
  },
  {
    id: "home3d",
    name: "3D animated home page",
    summary:
      "A 3D scene on your home page built around your products, with a lighter version for phones.",
    includes: [
      "Custom 3D scene with smooth scroll animation",
      "A separate, lighter version for phones",
    ],
    group: "showcase",
    setupFee: 90000,
    setupDays: 10,
    note: "3D models of your products are supplied by you or made separately.",
  },
  {
    id: "media3d",
    name: "3D product views and video",
    summary:
      "Shoppers turn a product around in 3D or watch a short video on its page.",
    includes: [
      "3D model viewer on product pages",
      "Videos for a product or for each pack size",
      "Swipeable photo, 3D and video gallery on phones",
    ],
    group: "showcase",
    setupFee: 35000,
    setupDays: 3,
    note: "3D models and videos are supplied by you.",
  },
  {
    id: "studio",
    name: "3D packaging studio",
    summary:
      "Design boxes, trays and sleeves on a live 3D pack inside the admin panel.",
    includes: [
      "Box, tray and sleeve designer with your artwork",
      "Print-ready export",
      "3D model and turntable video export",
    ],
    group: "showcase",
    setupFee: 75000,
    setupDays: 4,
  },
  {
    id: "seo",
    name: "SEO pages in 22 Indian languages",
    summary:
      "Guide pages in 22 Indian languages, with sitemaps, structured data and a Google product feed.",
    includes: [
      "Guide and article pages in 22 Indian languages",
      "Sitemaps and structured data for Google",
      "Google Merchant product feed",
    ],
    group: "growth",
    setupFee: 60000,
    setupDays: 5,
  },
  {
    id: "content",
    name: "Recipes and product guides",
    summary: "Recipe and guide pages that link straight to the products they use.",
    includes: [
      "Recipes managed from the admin panel, linked to products",
      "A guide page for each product type, such as nutrition and storage",
    ],
    group: "growth",
    setupFee: 30000,
    setupDays: 2,
  },
  {
    id: "analytics",
    name: "Analytics and visitor tracking",
    summary: "Sales reports and a visitors report, built into the admin panel.",
    includes: [
      "Sales dashboard and reports",
      "Visitors report: traffic sources, pages, devices and locations",
      "Google Analytics with Core Web Vitals",
    ],
    group: "growth",
    setupFee: 45000,
    setupDays: 3,
  },
];

export const PACKAGES: readonly Package[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "Your branded store, ready to sell.",
    modules: ["core"],
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "For brands ready to market and grow.",
    modules: ["core", "offers", "media3d", "content", "analytics"],
  },
  {
    id: "complete",
    name: "Complete",
    blurb: "Everything, including wholesale and the 3D home page.",
    modules: [
      "core",
      "wholesale",
      "offers",
      "home3d",
      "media3d",
      "studio",
      "seo",
      "content",
      "analytics",
    ],
  },
];

export const SUPPORT_PLANS: readonly SupportPlan[] = [
  {
    id: "none",
    name: "No plan",
    monthlyFee: 0,
    hoursPerMonth: 0,
    covers: ["Pay by the hour when you need help"],
  },
  {
    id: "essential",
    name: "Essential",
    monthlyFee: 7500,
    hoursPerMonth: 6,
    covers: ["Security and library updates", "Uptime monitoring", "Bug fixes"],
  },
  {
    id: "basic",
    name: "Basic",
    monthlyFee: 15000,
    hoursPerMonth: 15,
    covers: ["Everything in Essential", "Small changes and content updates"],
  },
  {
    id: "standard",
    name: "Standard",
    monthlyFee: 30000,
    hoursPerMonth: 30,
    covers: ["Everything in Basic", "Room for new features every month"],
  },
];

/**
 * Approximate provider prices, as of October 2026, for the stack the platform
 * runs on. They go to the buyer's own accounts, so they are an estimate on the
 * page and not a line in the quote.
 */
export const HOSTING_TIERS: readonly HostingTier[] = [
  {
    id: "launch",
    name: "Launch",
    blurb: "A new store on starter plans",
    items: [
      { name: "Backend server", provider: "Cloud server, 2 vCPU and 4 GB", monthly: 2000 },
      { name: "Database", provider: "MongoDB Atlas", monthly: 800 },
      { name: "Website and admin hosting", provider: "Same server", monthly: 0 },
      { name: "Photo and video storage", provider: "S3-compatible storage", monthly: 0 },
      { name: "Cache and live updates", provider: "Redis on the same server", monthly: 0 },
      { name: "CDN and DDoS protection", provider: "Cloudflare free plan", monthly: 0 },
      { name: "Domain", provider: "About ₹900 a year", monthly: 80 },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "Dedicated servers for a busy store",
    items: [
      { name: "Backend server", provider: "Cloud server, 4 vCPU and 8 GB", monthly: 4000 },
      { name: "Database", provider: "MongoDB Atlas dedicated", monthly: 5000 },
      { name: "Website and admin hosting", provider: "Vercel Pro", monthly: 1800 },
      { name: "Photo and video storage", provider: "S3-compatible storage", monthly: 2100 },
      { name: "Cache and live updates", provider: "Managed Redis", monthly: 1000 },
      { name: "CDN and DDoS protection", provider: "Cloudflare free plan", monthly: 0 },
      { name: "Domain", provider: "About ₹900 a year", monthly: 80 },
    ],
  },
];

/** Set `enabled: false` if the seller is not GST-registered; every GST line then disappears. */
export const GST = { enabled: true, percent: 18 };

/** How the setup fee is invoiced. Percentages must add up to 100. */
export const PAYMENT_STAGES: readonly { label: string; percent: number }[] = [
  { label: "On signing", percent: 50 },
  { label: "At launch", percent: 40 },
  { label: "30 days after launch", percent: 10 },
];

/** Whole rupees an hour for work outside a plan or beyond its hours. */
export const HOURLY_RATE = 1000;

/** What the full platform took to build from scratch: the anchor on the home page. */
export const CUSTOM_BUILD = { hours: 4180, cost: 4180000 };

export const DEFAULT_SELECTION = {
  packageId: "growth",
  planId: "basic",
  hostingId: "launch",
};

/** What every setup fee buys, whatever the modules. */
export const SETUP_INCLUDES: readonly string[] = [
  "Your logo, colours and domain",
  "Set up on servers in your own name",
  "Your Razorpay, Delhivery and sign-in accounts connected",
  "Your products and prices loaded",
  "Staff training on the admin panel",
  "30 days of free fixes after launch",
];

export const LICENCE =
  "You get the full source code and a permanent licence to use and change it for your own business. The licence does not allow reselling it.";

/** Fees that grow with sales, paid to each service by the buyer. */
export const USAGE_FEES: readonly { name: string; detail: string }[] = [
  { name: "Razorpay", detail: "About 2% of each online payment, plus GST on the fee" },
  {
    name: "Delhivery",
    detail: "Per shipment, by weight and distance; usually recovered through the delivery charge",
  },
  {
    name: "Firebase",
    detail: "Per SMS for mobile-number sign-in, at Google's rate for India",
  },
];

export const NOT_INCLUDED: readonly string[] = [
  "Hosting and the usage fees above",
  "Product photography, video shoots and 3D models of products",
  "Product descriptions and other writing",
  "Native Android or iOS apps (the store installs on phones as an app)",
  "Advertising and marketing campaigns",
  "Legal, tax or GST compliance advice",
];
