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
    seeLiveAt: string;
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
    featureSourceCode: string;
    featureNoCommission: string;
    featureServers: string;
    runningLiveAt: string;
    d2cStorefront: string;
    reviews: string;
    packSize: string;
    addToBag: string;
    orderPaid: string;
    sampleOrder: string;
    pickupBooked: string;
    packedBadge: string;
    deliveryCheck: string;
    deliversPincode: string;
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

  interactiveDemo: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    tabs: {
      storefront: string;
      storefrontShort: string;
      admin: string;
      adminShort: string;
      backend: string;
      backendShort: string;
    };
    storefront: {
      bag: string;
      fromCatalogue: string;
      sampleProducts: string;
      fromPrice: string;
      brandNotTemplate: string;
      packSizeLabel: string;
      inStock: string;
      runningLow: string;
      addToBag: string;
      expressDelivery: string;
      check: string;
      daysEstimate: string;
      shoppingBagTitle: string;
      items: string;
      hideBag: string;
      freeDeliveryUnlocked: string;
      addAmountForFree: string;
      forFreeDelivery: string;
      couponPlaceholder: string;
      remove: string;
      apply: string;
      couponApplied: string;
      subtotal: string;
      couponDiscount: string;
      shippingFee: string;
      free: string;
      ordersUnder: string;
      finalTotal: string;
      paymentMethods: string;
      inspectAdmin: string;
    };
    admin: {
      operatorConsole: string;
      ordersAndDispatch: string;
      toPack: string;
      ordersCount: string;
      sampleOrders: string;
      orderDispatchedToast: string;
      syncingDelhivery: string;
      table: {
        orderIdTime: string;
        customer: string;
        items: string;
        total: string;
        payment: string;
        status: string;
        action: string;
        booked: string;
        oneClick: string;
      };
      units: string;
    };
    backend: {
      singleSource: string;
      architectureTitle: string;
      telemetry: string;
      step1: string;
      step1Sub: string;
      step2: string;
      step2Sub: string;
      step3: string;
      step3Sub: string;
      step4: string;
      step4Sub: string;
      step5: string;
      step5Sub: string;
      copy: string;
      copied: string;
      footer: string;
      selfHosted: string;
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
    cartTotalTitle: string;
    expressLogistics: string;
    promoCodeLabel: string;
    remove: string;
    apply: string;
    discountLabel: string;
    shippingLabel: string;
    free: string;
    instantCheckout: string;
    paymentMethodsNote: string;
    pickQtyLabel: string;
    belowRetail: string;
    quotationNumber: string;
    dealTermTitle: string;
    freightTitle: string;
    freightSub: string;
    totalDealValue: string;
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
    sampleData: string;
    metrics: {
      todayRevenue: string;
      vsYesterday: string;
      pendingDispatch: string;
      pickupTime: string;
      stockHealth: string;
      packRunningLow: string;
      everyPackInStock: string;
      activeTradeDeals: string;
    };
  };

  immersiveShowcase: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    tabs: {
      viewer: string;
      viewerShort: string;
      studio: string;
      studioShort: string;
      mobile: string;
      mobileShort: string;
    };
    hotspots: {
      valve: string;
      barrier: string;
      dismiss: string;
    };
    turnPack: string;
    angles: {
      front: string;
      side: string;
      back: string;
      otherSide: string;
    };
    modelStatusStill: string;
    modelStatusLive: string;
    moduleBadge: string;
    viewerTitle: string;
    viewerDescLive: string;
    viewerDescGeneric: string;
    productLabel: string;
    spinLiveModel: string;
    viewerTryIt: string;
    adminBadge: string;
    studioTitle: string;
    studioDesc: string;
    finishLabel: string;
    finishes: {
      kraft: string;
      midnight: string;
      bronze: string;
    };
    partLabel: string;
    parts: {
      tray: string;
      lid: string;
      sleeve: string;
    };
    studioBullets: string[];
    viewStudioModule: string;
    studioPreview: string;
    partIndicator: string;
    sleeveArtworkDetails: string;
    sleeveExported: string;
    sleeveExportDetails: string;
    guideDrawn: string;
    exporting: string;
    tryExport: string;
    phoneBadge: string;
    mobileTitle: string;
    mobileDesc: string;
    mobileBullets: string[];
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
    layerTitle: string;
    layerSubtitle: string;
    liveStoreBadge: string;
    guarantee: string;
    singleSource: string;
    layers: {
      storefront: { role: string; why: string; tag: string };
      mobile: { role: string; why: string; tag: string };
      experience: { role: string; why: string; tag: string };
      operations: { role: string; why: string; tag: string };
      backend: { role: string; why: string; tag: string };
      developers: { role: string; why: string; tag: string };
      data: { role: string; why: string; tag: string };
      integrations: { role: string; why: string; tag: string };
      auth: { role: string; why: string; tag: string };
      security: { role: string; why: string; tag: string };
    };
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
    everythingIn: string;
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
    cloneOverview: {
      title: string;
      subtitle: string;
      readyBadge: string;
      storefront: { title: string; desc: string };
      wholesale: { title: string; desc: string };
      operations: { title: string; desc: string };
    };
    deliveryRoadmap: {
      eyebrow: string;
      title: string;
      subtitle: string;
      steps: {
        s1: { title: string; desc: string };
        s2: { title: string; desc: string };
        s3: { title: string; desc: string };
        s4: { title: string; desc: string };
      };
    };
    techSection: {
      eyebrow: string;
      badge: string;
      title: string;
      subtitle: string;
    };
    staffingBanner: {
      title: string;
      subtitle: string;
      ctaHub: string;
      ctaTalk: string;
      ctaCall: string;
      ctaWhatsApp: string;
      ctaEmail: string;
    };
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
    readyBadge: string;
    fixedProjects: string;
    staffing: string;
    technologies: string;
    inquireNow: string;
    perHour: string;
    fullTimeRate: string;
    partTimeRate: string;
    timeline: string;
    deliverables: string;
    highlights: {
      talent: { title: string; desc: string };
      mobileWeb: { title: string; desc: string };
      modernStack: { title: string; desc: string };
      ownership: { title: string; desc: string };
    };
    ctaQuote: string;
    ctaWhatsApp: string;
    ctaCall: string;
    ctaCommerce: string;
    coreCapabilities: { eyebrow: string; title: string; subtitle: string };
    techProficiency: { eyebrow: string; title: string; subtitle: string };
    hireRoles: { eyebrow: string; title: string; subtitle: string; cta: string };
    models: { eyebrow: string; title: string; subtitle: string };
    categories: Record<string, { title: string; summary: string; eyebrow: string; deliverables: string[] }>;
    roles: Record<string, { title: string; summary: string }>;
    engagement: Record<string, { title: string; description: string }>;
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
    sendAnother: string;
    topicLabel: string;
    topics: {
      clone: string;
      staffing: string;
      mobileApis: string;
      demo: string;
      other: string;
    };
    hints: {
      clone: string;
      staffing: string;
      mobileApis: string;
      demo: string;
      other: string;
    };
    placeholders: {
      clone: string;
      staffing: string;
      mobileApis: string;
      demo: string;
      other: string;
    };
    timelineLabel: string;
    timelines: {
      urgent: string;
      oneMonth: string;
      threeMonths: string;
      flexible: string;
    };
    budgetLabel: string;
    budgetConsultation: string;
    channelsTabForm: string;
    channelsTabWhatsApp: string;
    channelsTabCall: string;
    teamOnline: string;
    replyTime: string;
    referenceIdLabel: string;
    followUpWhatsApp: string;
    copiedReference: string;
    copyReference: string;
    explorePricing: string;
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
    platformSummary: string;
    licenseLabel: string;
    links: {
      overviewPackages: string;
      hireDevelopers: string;
      webApps: string;
      mobileApps: string;
      apis: string;
      liveDemo: string;
      apps: string;
      retailWholesale: string;
      adminPanel: string;
      immersive: string;
      addOnModules: string;
      technology: string;
      aboutUs: string;
      blog: string;
      contact: string;
      faq: string;
    };
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

  quoteMessage: {
    greeting: string;
    modulesHeader: string;
    setupLabel: string;
    supportLabel: string;
    noPlanLabel: string;
    hostingLabel: string;
    launchLabel: string;
  };

  notFound: {
    eyebrow: string;
    titlePart1: string;
    titleItalic: string;
    subtitle: string;
    buildQuote: string;
    home: string;
  };

  blog: {
    share: string;
    shareLinkedIn: string;
    shareTwitter: string;
    shareWhatsApp: string;
    copyLink: string;
    linkCopied: string;
    searchPlaceholder: string;
    searchButton: string;
    clearSearch: string;
    filterCategory: string;
    all: string;
    allArticles: string;
    noArticlesMatch: string;
    showAllArticles: string;
    minRead: string;
    writtenBy: string;
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
