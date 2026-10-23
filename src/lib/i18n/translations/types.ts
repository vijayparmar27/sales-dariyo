/**
 * Type definitions for the complete Multi-Language Translation Dictionary.
 * Every user-facing string across the sales site is declared here.
 */

export interface TranslationDictionary {
  nav: {
    features: string;
    services: string;
    pricing: string;
    blog: string;
    about: string;
    contact: string;
    platform: string;
    liveDemo: string;
    buildQuote: string;
    callNow: string;
    chatWhatsApp: string;
    platformLinks: {
      demo: { label: string; blurb: string };
      apps: { label: string; blurb: string };
      retailWholesale: { label: string; blurb: string };
      adminConsole: { label: string; blurb: string };
      immersive: { label: string; blurb: string };
      technology: { label: string; blurb: string };
      howItWorks: { label: string; blurb: string };
      faqs: { label: string; blurb: string };
    };
  };

  hero: {
    badgeTurnkey: string;
    badgeProven: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    ctaQuote: string;
    ctaDemo: string;
    licenseText: string;
    readyToDispatch: string;
    inYourCart: string;
    pillarBrand: string;
    pillarBrandDesc: string;
    pillarProducts: string;
    pillarProductsDesc: string;
    pillarTurnkey: string;
    pillarTurnkeyDesc: string;
    pillarCommission: string;
    pillarCommissionDesc: string;
  };

  proof: {
    ariaLabel: string;
    stats: {
      apps: string;
      hours: string;
      commission: string;
      fixes: string;
    };
  };

  threeApps: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    storefront: {
      name: string;
      blurb: string;
      points: { title: string; body: string }[];
      mockLabel: string;
      mockStatus: string;
    };
    adminPanel: {
      name: string;
      blurb: string;
      points: { title: string; body: string }[];
      mockLabel: string;
      mockStatus: string;
      mockTitle: string;
      mockDetail: string;
    };
    backend: {
      name: string;
      blurb: string;
      points: { title: string; body: string }[];
      mockLabel: string;
      mockStatus: string;
      mockTitle: string;
      mockDetail: string;
    };
  };

  platformBenefits: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    cards: {
      packSizes: { title: string; body: string; footnote: string };
      checkout: { title: string; body: string; footnote: string };
      shipping: { title: string; body: string; footnote: string };
      permissions: { title: string; body: string; footnote: string };
      speed: { title: string; body: string; footnote: string };
      trade: { title: string; body: string; footnote: string };
    };
  };

  retailWholesale: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    retailBadge: string;
    retailTitle: string;
    retailDesc: string;
    retailFeatures: string[];
    wholesaleBadge: string;
    wholesaleTitle: string;
    wholesaleDesc: string;
    wholesaleFeatures: string[];
  };

  adminShowcase: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    tabs: {
      orders: string;
      inventory: string;
      shipping: string;
      reports: string;
    };
    badge: string;
  };

  immersiveShowcase: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    features: {
      viewer3d: { title: string; desc: string };
      videos: { title: string; desc: string };
      studio: { title: string; desc: string };
    };
  };

  techStack: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    pillars: {
      architecture: { title: string; desc: string };
      backend: { title: string; desc: string };
      frontend: { title: string; desc: string };
      security: { title: string; desc: string };
    };
  };

  devValue: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    optionA: {
      badge: string;
      title: string;
      desc: string;
      engineeringLabel: string;
      costLabel: string;
      timelineLabel: string;
      timelineValue: string;
      riskLabel: string;
      riskValue: string;
      footnote: string;
    };
    optionB: {
      badge: string;
      titlePart1: string;
      titleItalic: string;
      desc: string;
      setupFeeLabel: string;
      setupFeeSub: string;
      timelineLabel: string;
      timelineSub: string;
      inclusionsHeader: string;
      licenseNote: string;
      cta: string;
    };
  };

  packagesPricing: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    mostPopular: string;
    oneTimeSetup: string;
    liveInAbout: string;
    choosePackage: string;
    bottomPrompt: string;
    bottomSub: string;
    openBuilder: string;
  };

  customModules: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    quoteThis: string;
    configureAll: string;
  };

  howItWorks: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    steps: {
      step1: { title: string; body: string; result: string };
      step2: { title: string; body: string; result: string };
      step3: { title: string; body: string; result: string };
      step4: { title: string; body: string; result: string };
    };
  };

  faq: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    items: {
      sourceCode: { q: string; a1: string; a2: string };
      hosting: { q: string; a: string };
      customFeatures: { q: string; a: string };
      requirements: { q: string; a: string };
      launchTime: { q: string; a: string };
      ongoingCosts: { q: string; a: string };
    };
  };

  finalCta: {
    badge: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    ctaQuote: string;
    ctaDemo: string;
    chatWithUs: string;
  };

  pricing: {
    badge: string;
    provenAt: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    startWithPackage: string;
    customSelection: string;
    orTickBelow: string;
    popularBadge: string;
    oneTimeBeforeGst: string;
    oneTimeSetup: string;
    includedWithSetup: string;
    everyMonth: string;
    setupTotal: string;
    monthlyTotal: string;
    subtotal: string;
    gstLabel: string;
    noPlan: string;
    hostingPaidToProviders: string;
    hostingAbout: string;
    paymentSchedule: string;
    launchTimeline: string;
    weeksEstimate: string;
    copyLink: string;
    linkCopied: string;
    printQuote: string;
    submitQuote: string;
    mostPopular: string;
    liveInAbout: string;
    payAsYouGo: string;
    anHour: string;
    hoursPerMonth: string;
    choosePackage: string;
    pickModules: string;
    supportPlan: string;
    hostingTier: string;
    feesGrowthTitle: string;
    feesGrowthSub: string;
    notIncludedTitle: string;
    notIncludedSub: string;
    modal: {
      title: string;
      subtitle: string;
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      companyLabel: string;
      requirementsLabel: string;
      submitButton: string;
      submitting: string;
      successTitle: string;
      successSubtitle: string;
      immediateResponse: string;
      doneButton: string;
    };
  };

  services: {
    badge: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    fixedProjects: string;
    staffing: string;
    technologies: string;
    inquireNow: string;
    perHour: string;
    fullTimeRate: string;
    partTimeRate: string;
    timeline: string;
    deliverables: string;
    modal: {
      title: string;
      subtitle: string;
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      companyLabel: string;
      serviceLabel: string;
      modelLabel: string;
      notesLabel: string;
      submitButton: string;
      submitting: string;
      successTitle: string;
      successSubtitle: string;
      doneButton: string;
    };
  };

  contact: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    companyLabel: string;
    messageLabel: string;
    submitButton: string;
    sending: string;
    directChannels: string;
    thankYou: string;
    thankYouDesc: string;
  };

  about: {
    badge: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    storyTitle: string;
    storyBody: string;
  };

  footer: {
    tagline: string;
    navigation: string;
    platform: string;
    clonePricing: string;
    companyContact: string;
    services: string;
    legal: string;
    allRightsReserved: string;
    noCommission: string;
    priceBuilderLink: string;
  };

  catalog: {
    groups: Record<string, { name: string; blurb: string }>;
    modules: Record<string, { name: string; summary: string; includes: string[]; note?: string }>;
    packages: Record<string, { name: string; blurb: string }>;
    supportPlans: Record<string, { name: string; covers: string[] }>;
    hostingTiers: Record<string, { name: string; blurb: string }>;
    setupIncludes: string[];
    notIncluded: string[];
    licence: string;
    paymentStages: { label: string; percent: number }[];
  };

  common: {
    currency: string;
    language: string;
    select: string;
    selected: string;
    required: string;
    optional: string;
    close: string;
    submit: string;
    cancel: string;
    month: string;
    week: string;
    weeks: string;
    day: string;
    days: string;
    hour: string;
    hours: string;
    loading: string;
    contactUs: string;
    included: string;
  };
}

