import type { TranslationDictionary } from "./types";

export const en: TranslationDictionary = {
  nav: {
    features: "Features",
    services: "Services",
    pricing: "Clone Pricing",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    platform: "Platform",
    liveDemo: "Try Live Demo",
    buildQuote: "Build a Quote",
    callNow: "Call us",
    chatWhatsApp: "WhatsApp",
    platformLinks: {
      demo: { label: "Live Demo", blurb: "Try the storefront and the admin panel" },
      apps: { label: "Three Connected Apps", blurb: "Storefront, admin panel and backend as one" },
      retailWholesale: { label: "Retail & Wholesale", blurb: "Shoppers and trade buyers, one catalogue" },
      adminConsole: { label: "Admin Console", blurb: "Orders, stock, invoices and trade quotes" },
      immersive: { label: "3D & Rich Media", blurb: "3D pack views and video galleries" },
      technology: { label: "Technology", blurb: "A modern stack, built in TypeScript" },
      howItWorks: { label: "How It Works", blurb: "Kickoff to first sale in four steps" },
      faqs: { label: "FAQ", blurb: "Licensing, hosting, timelines and money" },
    },
  },

  hero: {
    badgeTurnkey: "Turnkey Platform License",
    badgeProven: "Proven Live at dariyo.in",
    titlePart1: "The complete commerce engine.",
    titleItalic: "Built, tested, ready to clone.",
    subtitle:
      "We built, tested and scaled the complete commerce platform behind dariyo.in — and we will customize, rebrand and deploy a dedicated clone for your business.",
    ctaQuote: "Build Your Custom Quote",
    ctaDemo: "Explore Live Storefront",
    licenseText: "Permanent source code license · 0% revenue cut · Deployed in your cloud",
    readyToDispatch: "Ready to dispatch",
    inYourCart: "In your cart",
    pillarBrand: "Your Brand",
    pillarBrandDesc: "Your logo, colors, fonts and custom domain",
    pillarProducts: "Your Products",
    pillarProductsDesc: "Loaded with your packs, categories & prices",
    pillarTurnkey: "Turnkey Clone",
    pillarTurnkeyDesc: "Storefront + B2B Wholesale + Admin Console",
    pillarCommission: "0% GMV Cut",
    pillarCommissionDesc: "Permanent code license in your cloud",
  },

  proof: {
    ariaLabel: "The platform in numbers",
    stats: {
      apps: "Connected apps, built as one",
      hours: "Hours of engineering behind it",
      commission: "Commission on your sales",
      fixes: "Days of free fixes after launch",
    },
  },

  threeApps: {
    eyebrow: "Three Connected Apps",
    titlePart1: "A complete system.",
    titleItalic: "Built to work together.",
    subtitle:
      "Customer storefront, operator admin panel, and cloud backend: three separate applications designed from scratch to work as one cohesive platform.",
    storefront: {
      name: "Customer Storefront",
      blurb: "A fast shop built with Next.js 16, React 19 and Tailwind CSS, customized in your brand.",
      points: [
        { title: "Pack sizes", body: "Grams, kilos, jars or pouches, each with its own live price." },
        { title: "Smooth checkout", body: "UPI, cards, net banking, wallets, and cash on delivery." },
        { title: "Customer accounts", body: "Google, phone OTP or email sign-in, live order tracking, tax invoices." },
        { title: "Installs like an app", body: "Shoppers can add your store to their phone home screen as a PWA." },
      ],
      mockLabel: "Cart",
      mockStatus: "Delivers to your area",
    },
    adminPanel: {
      name: "Admin Console",
      blurb: "Everything your operations team does each day: products, stock, orders, shipping and staff.",
      points: [
        { title: "Products & stock", body: "One central stock count per pack, automated low-stock alerts." },
        { title: "Integrated shipping", body: "Courier rate comparison, automatic label generation, pickup scheduling." },
        { title: "Wholesale deals", body: "B2B buyer accounts, tiered quotes, proforma invoices, deal chats." },
        { title: "Tax & invoices", body: "Automated GST/tax invoices, credit notes, and downloadable reports." },
      ],
      mockLabel: "Dispatch",
      mockStatus: "Ready to ship",
      mockTitle: "Courier Pickup",
      mockDetail: "Scheduled for today · 14 parcels",
    },
    backend: {
      name: "Commerce API Engine",
      blurb: "The single source of truth for prices, inventory reservations, payments and order fulfillment.",
      points: [
        { title: "Server-side math", body: "Every price, discount, and tax total is calculated strictly on the server." },
        { title: "Real-time sync", body: "Instant stock hold expiration and live WebSocket updates across devices." },
        { title: "Hardened security", body: "HMAC verified webhooks, AES-256 encrypted keys, and rate limiters." },
        { title: "Independent cloud", body: "Runs in Docker on your own AWS, Hetzner, or DigitalOcean servers." },
      ],
      mockLabel: "API Engine",
      mockStatus: "Healthy · 99.99% uptime",
      mockTitle: "Microservices",
      mockDetail: "Redis cache active · Rate limits nominal",
    },
  },

  platformBenefits: {
    eyebrow: "Platform Capabilities",
    titlePart1: "Engineered for high-volume,",
    titleItalic: "flawless commerce.",
    subtitle:
      "Every feature has been battle-tested under real transaction volume at dariyo.in, from product variants to warehouse dispatch.",
    cards: {
      packSizes: {
        title: "Multi-Pack Sizes & SKUs",
        body: "Sell sample pouches, family tins, or bulk sacks with individual barcodes, pricing, and weights.",
        footnote: "One central stock count updates dynamically across all pack variants.",
      },
      checkout: {
        title: "Optimized High-Speed Checkout",
        body: "Frictionless checkout experience supporting instant payments, saved addresses, and express delivery.",
        footnote: "Zero third-party redirects; checkout completes directly on your domain.",
      },
      shipping: {
        title: "Automated Logistics & Tracking",
        body: "Automated courier booking, real-time tracking webhooks, and customer shipment status notifications.",
        footnote: "Direct integration with leading courier partners and multi-warehouse pickups.",
      },
      permissions: {
        title: "Role-Based Staff Access",
        body: "Granular permissions for warehouse dispatch, support managers, finance accountants, and admins.",
        footnote: "Strict permission enforcement on every API endpoint and audit logging.",
      },
      speed: {
        title: "Sub-Second Page Speeds",
        body: "Built on Next.js 16 with static page generation, edge caching, and optimized media delivery.",
        footnote: "Scores 95+ on Google Lighthouse Mobile and Core Web Vitals.",
      },
      trade: {
        title: "B2B Wholesale Portal",
        body: "Special tier pricing, quotation workflows, stock reservations, and freight calculation for trade buyers.",
        footnote: "Operate your retail shop and wholesale business from one single dashboard.",
      },
    },
  },

  retailWholesale: {
    eyebrow: "Dual-Channel Commerce",
    titlePart1: "Retail and wholesale.",
    titleItalic: "Powered by one engine.",
    subtitle:
      "Why maintain two disconnected systems? Serve regular retail shoppers and bulk trade buyers from the exact same catalogue and inventory.",
    retailBadge: "Direct-to-Consumer (D2C)",
    retailTitle: "Retail Storefront",
    retailDesc: "Fast, delightful shopping experience built for maximum checkout conversion.",
    retailFeatures: [
      "Individual unit and pack size purchases",
      "UPI, credit card, net banking, and COD checkout",
      "Coupon codes and cart-based delivery promotions",
      "Live order tracking and automated customer receipts",
    ],
    wholesaleBadge: "Business-to-Business (B2B)",
    wholesaleTitle: "Wholesale Trade Portal",
    wholesaleDesc: "Dedicated portal for distributors, restaurants, and bulk enterprise buyers.",
    wholesaleFeatures: [
      "Custom price tiers by order quantity (50kg, 200kg, 500kg+)",
      "Automated quote requests and stock reservation holds",
      "Freight logistics calculation with commercial waybills",
      "Installment billing (50% upfront, 40% dispatch, 10% delivery)",
    ],
  },

  adminShowcase: {
    eyebrow: "Operations Command Center",
    titlePart1: "An admin console that",
    titleItalic: "powers your entire business.",
    subtitle:
      "Manage incoming orders, track warehouse inventory, generate tax invoices, and monitor revenue in real time.",
    tabs: {
      orders: "Orders & Fulfillment",
      inventory: "Stock & Warehouses",
      shipping: "Courier Pickups",
      reports: "Sales & Tax Reports",
    },
    badge: "Unified Management",
  },

  immersiveShowcase: {
    eyebrow: "3D & Immersive Media",
    titlePart1: "Turn products around in 3D.",
    titleItalic: "Increase buyer confidence.",
    subtitle:
      "Interactive 3D model viewers and turntable videos that let shoppers examine pack details from every angle.",
    features: {
      viewer3d: {
        title: "3D Product Viewer",
        desc: "Interactive 3D models embedded directly into product pages, with touch controls on mobile.",
      },
      videos: {
        title: "Video Demonstrations",
        desc: "High-definition video clips showing packaging, unboxing, and usage instructions.",
      },
      studio: {
        title: "3D Packaging Studio",
        desc: "Preview brand artwork, labels, and sleeve designs directly on 3D virtual pack renders.",
      },
    },
  },

  techStack: {
    eyebrow: "Engineering Architecture",
    titlePart1: "Modern TypeScript stack.",
    titleItalic: "Zero technical debt.",
    subtitle:
      "Constructed with industry-leading frameworks for blistering speed, ironclad security, and effortless maintainability.",
    pillars: {
      architecture: {
        title: "Next.js 16 & React 19",
        desc: "Server Components, App Router, concurrent rendering, and instant client-side navigations.",
      },
      backend: {
        title: "Node.js & Express 5",
        desc: "Strict TypeScript API with Joi schema validation, connection pooling, and job schedulers.",
      },
      frontend: {
        title: "Tailwind CSS v4 & Redis",
        desc: "Zero-runtime CSS styling, sub-millisecond Redis caching, and real-time Socket.IO streams.",
      },
      security: {
        title: "Enterprise Hardened",
        desc: "Distributed token-bucket rate limits, encrypted credentials in Mongo, and CSRF protection.",
      },
    },
  },

  devValue: {
    eyebrow: "Build vs Start Here",
    titlePart1: "What you save by starting from a",
    titleItalic: "finished platform.",
    subtitle:
      "Building a custom commerce platform from scratch requires months of developer hiring, architecture mistakes, and huge budgets.",
    optionA: {
      badge: "Option A · Build from scratch",
      title: "Commission it from scratch",
      desc: "Hire an agency or contractors to write three complex applications from empty repositories.",
      engineeringLabel: "Engineering",
      costLabel: "Cost at hourly rate",
      timelineLabel: "Time to launch",
      timelineValue: "12 to 18 months",
      riskLabel: "Risk level",
      riskValue: "New, untested code",
      footnote: "Prone to delays, scope creep, and payment integration bugs under real transaction loads.",
    },
    optionB: {
      badge: "Option B · Start from this platform",
      titlePart1: "Start from a platform that",
      titleItalic: "already runs a store.",
      desc: "You get a permanent licence to the full source code, customized with your brand and deployed in your cloud.",
      setupFeeLabel: "Setup fee",
      setupFeeSub: "One-time setup, by package",
      timelineLabel: "Time to launch",
      timelineSub: "From kickoff to go-live",
      inclusionsHeader: "What the setup includes",
      licenseNote: "Permanent code license. Deploy on your servers, keep all your customer data, pay zero GMV cuts.",
      cta: "Build your quote",
    },
  },

  packagesPricing: {
    eyebrow: "Transparent Packages",
    titlePart1: "Simple, transparent",
    titleItalic: "pricing.",
    subtitle:
      "A one-time setup fee for your licence and launch, then an optional monthly support plan. No commission on your sales, ever.",
    mostPopular: "Most Popular",
    oneTimeSetup: "one-time setup",
    liveInAbout: "live in about",
    choosePackage: "Choose",
    bottomPrompt: "Want different modules, or to see the monthly costs?",
    bottomSub: "Support plans start from a low monthly fee, or pay by the hour as you go.",
    openBuilder: "Open the price builder",
  },

  customModules: {
    eyebrow: "Add-on Modules",
    titlePart1: "Start with the core.",
    titleItalic: "Add only what you need.",
    subtitle:
      "Every store starts with the core engine: shop, admin console, and backend. Add wholesale, 3D, SEO, or analytics whenever you are ready.",
    quoteThis: "Quote this module",
    configureAll: "Configure every module on the pricing page",
  },

  howItWorks: {
    eyebrow: "Process & Delivery",
    titlePart1: "From kickoff to first sale",
    titleItalic: "in four clear steps.",
    subtitle:
      "No endless consulting and no surprise invoices: a fixed scope, a clear plan, and a store that launches on the agreed date.",
    steps: {
      step1: {
        title: "Choose your package",
        body: "Pick a pre-configured package or select individual modules in our live configurator to receive an itemised quote.",
        result: "An itemised quote and project timeline",
      },
      step2: {
        title: "Kickoff & brand customization",
        body: "We align on your schedule and gather your logo, brand colours, product photography, pack sizes, and prices.",
        result: "A signed rollout plan and your digital assets",
      },
      step3: {
        title: "Setup & accounts integration",
        body: "We deploy cloud servers in your name, connect your payment gateways, courier APIs, and SMS accounts, and seed your products.",
        result: "A fully working staging store ready for testing",
      },
      step4: {
        title: "Launch & warranty support",
        body: "Your store goes live on your custom domain. We train your staff on the admin console and provide 30 days of free fixes.",
        result: "A live, fully operational online business",
      },
    },
  },

  faq: {
    eyebrow: "Frequently Asked Questions",
    titlePart1: "Everything you need",
    titleItalic: "to know.",
    subtitle: "Clear answers on source code ownership, hosting, payments, timelines, and ongoing maintenance.",
    items: {
      sourceCode: {
        q: "Who owns the source code?",
        a1: "You get the full source code and a permanent licence to use and modify it for your own business. The licence does not allow reselling it.",
        a2: "Your servers, domain, customer records, and database remain in your company name from day one — zero vendor lock-in.",
      },
      hosting: {
        q: "Is hosting included in the setup fee?",
        a: "No. Cloud servers, database instances, and media storage are billed directly to your own provider accounts (AWS, Hetzner, MongoDB Atlas) so your data always remains entirely yours.",
      },
      customFeatures: {
        q: "Can you build custom features that are not listed?",
        a: "Yes. Custom software engineering outside the catalog modules is quoted upfront with a fixed milestone plan, or billed at our transparent hourly rate.",
      },
      requirements: {
        q: "What do we need to provide before kickoff?",
        a: "Your logo, brand guidelines, product photography, initial product inventory data, and business credentials for payment gateways and couriers. We assist you through the verification process.",
      },
      launchTime: {
        q: "How fast can our store go live?",
        a: "Starter stores launch in 2 to 3 weeks. Complete omnichannel deployments with wholesale and 3D showcases launch in 8 to 11 weeks.",
      },
      ongoingCosts: {
        q: "Are there any recurring revenue cuts or GMV fees?",
        a: "Never. We charge 0% commission on your sales. You only pay for your own third-party cloud hosting and payment processing fees directly to each provider.",
      },
    },
  },

  finalCta: {
    badge: "Ready When You Are",
    titlePart1: "Your next store starts with the",
    titleItalic: "right foundation.",
    subtitle:
      "Pick what your business needs, get an itemised quote in 60 seconds, and launch a branded commerce platform with 0% commission on sales.",
    ctaQuote: "Build Your Package",
    ctaDemo: "Try the Live Demo",
    chatWithUs: "Chat with an Engineer",
  },

  pricing: {
    badge: "Turnkey Platform License",
    provenAt: "Proven Live at dariyo.in",
    title: "Your own store.",
    titleItalic: "A complete clone of Dariyo.in",
    subtitle:
      "We deploy the exact high-performance commerce system running at dariyo.in — customized and re-engineered with your website, your brand, and your product catalog. Permanent source code license with zero revenue cut or recurring GMV commission.",
    startWithPackage: "Start with a package",
    customSelection: "Custom selection",
    orTickBelow: "Or tick modules below",
    popularBadge: "Popular",
    oneTimeBeforeGst: "one-time",
    oneTimeSetup: "One-time setup",
    includedWithSetup: "Included",
    everyMonth: "Every month",
    setupTotal: "Setup total",
    monthlyTotal: "Monthly total",
    subtotal: "Subtotal",
    gstLabel: "GST",
    noPlan: "No support plan, pay by the hour",
    hostingPaidToProviders: "Hosting, paid to providers",
    hostingAbout: "about",
    paymentSchedule: "Payment schedule",
    launchTimeline: "Launch timeline",
    weeksEstimate: "weeks from signing",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    printQuote: "Print quote",
    submitQuote: "Submit Quote & Request Call",
    mostPopular: "Most popular",
    liveInAbout: "live in about",
    payAsYouGo: "Pay as you go",
    anHour: "an hour",
    hoursPerMonth: "hours a month",
    choosePackage: "Start with a package",
    pickModules: "Pick your modules",
    supportPlan: "Support plan",
    hostingTier: "Hosting estimate",
    feesGrowthTitle: "Fees that grow with your sales",
    feesGrowthSub: "Paid by you directly to each service, never to us.",
    notIncludedTitle: "Not included in setup",
    notIncludedSub: "Quoted separately, or arranged by you directly.",
    modal: {
      title: "Submit Your Quote Configuration",
      subtitle: "Send your configured requirements directly to our engineering team to schedule a technical walkthrough.",
      nameLabel: "Your Name",
      emailLabel: "Work Email",
      phoneLabel: "Phone / WhatsApp",
      companyLabel: "Company / Brand Name",
      requirementsLabel: "Additional Notes or Custom Requirements",
      submitButton: "Submit Quote & Request Call",
      submitting: "Submitting...",
      successTitle: "Quote Received!",
      successSubtitle: "Our technical team will review your specifications and contact you within one business day.",
      immediateResponse: "Want an immediate response?",
      doneButton: "Done",
    },
  },

  services: {
    badge: "Engineering & Staffing",
    title: "Custom Software Development &",
    titleItalic: "Dedicated Engineering Talent",
    subtitle:
      "Beyond our turnkey commerce platform, our engineering team designs, develops, and delivers high-performance web applications, native mobile apps, and dedicated engineering pods.",
    fixedProjects: "Turnkey Project Packages",
    staffing: "Dedicated Software Engineers",
    technologies: "Technology Capabilities",
    inquireNow: "Inquire Now",
    perHour: "/hr",
    fullTimeRate: "160 hrs / month",
    partTimeRate: "80 hrs / month",
    timeline: "Timeline",
    deliverables: "Core Deliverables",
    modal: {
      title: "Inquire About Software Services",
      subtitle: "Discuss your project scope or hire dedicated developers aligned with your timezone.",
      nameLabel: "Your Name",
      emailLabel: "Work Email",
      phoneLabel: "Phone Number",
      companyLabel: "Company Name",
      serviceLabel: "Service of Interest",
      modelLabel: "Engagement Model",
      notesLabel: "Project Brief / Requirements",
      submitButton: "Send Inquiry",
      submitting: "Sending...",
      successTitle: "Inquiry Sent!",
      successSubtitle: "We have received your requirements and will reach out shortly to schedule a consultation.",
      doneButton: "Done",
    },
  },

  contact: {
    badge: "Get in touch",
    title: "Let's build your next platform",
    subtitle: "Tell us about your project requirements or book a technical consultation with our engineering team.",
    nameLabel: "Your name",
    emailLabel: "Work email",
    phoneLabel: "Phone number",
    companyLabel: "Company name",
    messageLabel: "Project requirements",
    submitButton: "Send Enquiry",
    sending: "Sending...",
    directChannels: "Direct Channels",
    thankYou: "Message Received",
    thankYouDesc: "Thank you for getting in touch. Our team will review your enquiry and respond within 24 hours.",
  },

  about: {
    badge: "Our Story",
    title: "Engineering high-performance commerce",
    titleItalic: "from the ground up.",
    subtitle: "We build, deploy, and scale robust e-commerce architectures designed for reliability and speed.",
    storyTitle: "Proven in Production",
    storyBody:
      "Dariyo was built to solve the hardest problems in specialty commerce: multi-pack product variants, complex wholesale quotation workflows, real-time logistics integrations, and rock-solid payment processing. Today, we deliver this complete, battle-tested system to ambitious brands worldwide.",
  },

  footer: {
    tagline: "The complete specialty commerce engine. Built, tested, ready to clone.",
    navigation: "Navigation",
    platform: "Platform",
    clonePricing: "Clone Pricing",
    companyContact: "Company & Contact",
    services: "Engineering Services",
    legal: "Legal",
    allRightsReserved: "All rights reserved.",
    noCommission: "0% commission on sales. Your platform, your cloud, your code.",
    priceBuilderLink: "Interactive price builder",
  },

  catalog: {
    groups: {
      core: {
        name: "In every store",
        blurb: "Storefront, admin console, and backend, branded and deployed for you.",
      },
      selling: {
        name: "Sell more",
        blurb: "Trade buyers, discount codes, and delivery promotions.",
      },
      showcase: {
        name: "Show products in 3D",
        blurb: "An animated 3D home page and interactive pack views that stand out.",
      },
      growth: {
        name: "Get found and measure",
        blurb: "Search pages, recipes, and detailed visitor analytics.",
      },
    },
    modules: {
      core: {
        name: "Core Store",
        summary: "Your own online store, admin console, and backend, branded and deployed on your servers.",
        includes: [
          "Online store: product listing, pack sizes, cart, and high-speed checkout",
          "Payment gateway integrations (UPI, cards, net banking, wallets) and cash on delivery",
          "Customer accounts with phone OTP, Google, or email sign-in, order history, and tracking",
          "Operator admin console: products, categories, orders, refunds, and customers",
          "Automated tax invoices and credit notes",
          "Courier integration with scheduled pickups and live delivery tracking",
          "Staff accounts with role-based permissions",
          "Security: rate limits, DDoS flood protection, and encrypted payment keys",
          "Progressive Web App (PWA), light and dark themes, maintenance mode",
        ],
      },
      wholesale: {
        name: "Wholesale & B2B Trade Portal",
        summary: "A trade portal for bulk enterprise buyers, operated from the same admin console.",
        includes: [
          "Dedicated business accounts and registration approval for trade buyers",
          "Bulk quotation workflow with automated quantity-tiered pricing",
          "Inventory reservation holds and capacity planning for large orders",
          "Freight logistics calculation with commercial waybill details",
          "Proforma invoices, installment payments, and direct team chat on every deal",
        ],
      },
      offers: {
        name: "Coupons & Delivery Offers",
        summary: "Discount promo codes and store-funded delivery rules managed from the admin panel.",
        includes: [
          "Coupon codes with usage limits, minimum order rules, and expiry dates",
          "Store-sponsored free or discounted delivery thresholds",
        ],
      },
      home3d: {
        name: "3D Animated Home Page",
        summary: "A custom 3D interactive hero scene designed around your products, with an optimized mobile version.",
        includes: [
          "Custom 3D scene with fluid scroll animation",
          "Lightweight optimized fallback version for mobile smartphones",
        ],
        note: "3D models of your products can be supplied by you or created separately.",
      },
      media3d: {
        name: "3D Product Views & Video",
        summary: "Shoppers can rotate products 360° in 3D or watch demonstration videos on product pages.",
        includes: [
          "Interactive 3D model viewer on product pages",
          "Embedded video showcases for individual products or pack sizes",
          "Swipeable photo, 3D render, and video gallery for mobile phones",
        ],
        note: "3D assets and video recordings are supplied by you or quoted separately.",
      },
      studio: {
        name: "3D Packaging Studio",
        summary: "Design trays, lids, and sleeves on a live 3D pack mockup directly inside the admin console.",
        includes: [
          "Interactive pack designer applying your custom artwork",
          "Print-ready sleeve template export with bleed lines, folds, and crop marks",
          "High-resolution 3D render and turntable video exports",
        ],
      },
      seo: {
        name: "Multilingual SEO Pages",
        summary: "Localized guide pages with sitemaps, structured schema data, and Google Merchant feed.",
        includes: [
          "Comprehensive regional article and landing pages",
          "Automated XML sitemaps and schema.org structured data for Google",
          "Google Merchant product feed generation",
        ],
      },
      content: {
        name: "Recipes & Product Guides",
        summary: "Educational guide pages and recipe collections that link directly to the items they use.",
        includes: [
          "Recipes managed from the admin console and linked directly to products",
          "Detailed nutritional and storage guide pages for each product category",
        ],
      },
      analytics: {
        name: "Analytics & Visitor Tracking",
        summary: "Sales intelligence dashboards and privacy-first visitor analytics built into the admin console.",
        includes: [
          "Sales revenue dashboard, average order value, and product performance reports",
          "Visitor traffic analytics: referral sources, page paths, devices, and geographic locations",
          "Google Analytics 4 integration with Core Web Vitals tracking",
        ],
      },
    },
    packages: {
      starter: {
        name: "Starter",
        blurb: "Your branded online store, ready to sell to customers.",
      },
      growth: {
        name: "Growth",
        blurb: "For growing brands ready to market, engage, and scale sales.",
      },
      complete: {
        name: "Complete",
        blurb: "Everything: storefront, wholesale portal, 3D homepage, and SEO.",
      },
    },
    supportPlans: {
      none: {
        name: "No plan",
        covers: ["Pay by the hour whenever you need technical assistance"],
      },
      essential: {
        name: "Essential",
        covers: ["Security and framework updates", "24/7 uptime monitoring", "Priority bug fixes"],
      },
      basic: {
        name: "Basic",
        covers: ["Everything in Essential", "Small design tweaks and content updates"],
      },
      standard: {
        name: "Standard",
        covers: ["Everything in Basic", "Dedicated monthly hours for new feature development"],
      },
    },
    hostingTiers: {
      launch: {
        name: "Launch Tier",
        blurb: "A new store running on cost-efficient cloud servers",
      },
      scale: {
        name: "Scale Tier",
        blurb: "Dedicated high-availability cloud servers for high-volume stores",
      },
    },
    setupIncludes: [
      "Your logo, brand colors, typography, and custom domain",
      "Setup on cloud servers registered in your company's own name",
      "Your payment gateways, shipping couriers, and authentication connected",
      "Your initial products, pack variants, and prices loaded",
      "Staff onboarding training on the operator admin console",
      "30 days of comprehensive warranty and bug-fixing after go-live",
    ],
    notIncluded: [
      "Third-party hosting and usage fees (billed directly by AWS, MongoDB, etc.)",
      "Product studio photography, video shoots, and 3D CAD modeling",
      "Copywriting, product descriptions, and marketing campaigns",
      "Custom native mobile apps (available as a separate dedicated service)",
      "Legal, tax, or accounting advice",
    ],
    licence:
      "You receive the full source code and a permanent licence to deploy, use, and modify it for your business. The licence does not permit reselling the platform.",
    paymentStages: [
      { label: "On signing", percent: 50 },
      { label: "At launch", percent: 40 },
      { label: "30 days after launch", percent: 10 },
    ],
  },

  common: {
    currency: "Currency",
    language: "Language",
    select: "Select",
    selected: "Selected",
    required: "Required",
    optional: "Optional",
    close: "Close",
    submit: "Submit",
    cancel: "Cancel",
    month: "month",
    week: "week",
    weeks: "weeks",
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    loading: "Loading...",
    contactUs: "Contact Us",
    included: "Included",
  },
};

