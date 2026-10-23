/**
 * Multi-Language Translations Dictionary.
 *
 * Provides complete localized text for all supported languages:
 * - English (en)
 * - Hindi (hi)
 * - Gujarati (gu)
 * - Spanish (es)
 * - French (fr)
 * - German (de)
 * - Arabic (ar)
 */

import type { LanguageCode } from "../languages.ts";

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
    pillarBrand: string;
    pillarBrandDesc: string;
    pillarProducts: string;
    pillarProductsDesc: string;
    pillarTurnkey: string;
    pillarTurnkeyDesc: string;
    pillarCommission: string;
    pillarCommissionDesc: string;
  };
  pricing: {
    badge: string;
    provenAt: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    yourQuote: string;
    oneTimeSetup: string;
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
    oneTime: string;
    liveInAbout: string;
    payAsYouGo: string;
    anHour: string;
    hoursPerMonth: string;
    choosePackage: string;
    pickModules: string;
    supportPlan: string;
    hostingTier: string;
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
  };
  footer: {
    tagline: string;
    navigation: string;
    platform: string;
    legal: string;
    allRightsReserved: string;
    noCommission: string;
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
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
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
      pillarBrand: "Your Brand",
      pillarBrandDesc: "Your logo, colors, fonts and custom domain",
      pillarProducts: "Your Products",
      pillarProductsDesc: "Loaded with your packs, categories & prices",
      pillarTurnkey: "Turnkey Clone",
      pillarTurnkeyDesc: "Storefront + B2B Wholesale + Admin Console",
      pillarCommission: "0% GMV Cut",
      pillarCommissionDesc: "Permanent code license in your cloud",
    },
    pricing: {
      badge: "Turnkey Platform License",
      provenAt: "Proven Live at dariyo.in",
      title: "Your own store.",
      titleItalic: "A complete clone of Dariyo.in",
      subtitle:
        "We deploy the exact high-performance commerce system running at dariyo.in — customized and re-engineered with your website, your brand, and your product catalog. Permanent source code license with zero revenue cut or recurring GMV commission.",
      yourQuote: "Your quote",
      oneTimeSetup: "One-time setup",
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
      oneTime: "one-time",
      liveInAbout: "live in about",
      payAsYouGo: "Pay as you go",
      anHour: "an hour",
      hoursPerMonth: "hours a month",
      choosePackage: "Start with a package",
      pickModules: "Pick your modules",
      supportPlan: "Support plan",
      hostingTier: "Hosting estimate",
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
    },
    footer: {
      tagline: "The complete dry-fish and specialty commerce engine. Built, tested, ready to clone.",
      navigation: "Navigation",
      platform: "Platform",
      legal: "Legal",
      allRightsReserved: "All rights reserved.",
      noCommission: "0% commission on sales. Your platform, your cloud, your code.",
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
    },
  },

  hi: {
    nav: {
      features: "विशेषताएं",
      services: "सेवाएं",
      pricing: "क्लोन मूल्य निर्धारण",
      blog: "ब्लॉग",
      about: "हमारे बारे में",
      contact: "संपर्क",
      platform: "प्लेटफ़ॉर्म",
      liveDemo: "लाइव डेमो देखें",
      buildQuote: "कोटेशन बनाएं",
    },
    hero: {
      badgeTurnkey: "टर्नकी प्लेटफ़ॉर्म लाइसेंस",
      badgeProven: "dariyo.in पर लाइव प्रमाणित",
      titlePart1: "संपूर्ण ई-कॉमर्स इंजन।",
      titleItalic: "निर्मित, परीक्षित, क्लोन के लिए तैयार।",
      subtitle:
        "हमने dariyo.in के पीछे संपूर्ण कॉमर्स प्लेटफ़ॉर्म बनाया, परखा और बढ़ाया — और हम आपके व्यवसाय के लिए एक समर्पित क्लोन तैयार और तैनात करेंगे।",
      ctaQuote: "अपना कस्टम कोटेशन बनाएं",
      ctaDemo: "लाइव स्टोर देखें",
      licenseText: "स्थायी स्रोत कोड लाइसेंस · 0% राजस्व कटौती · आपके क्लाउड में तैनात",
      pillarBrand: "आपका ब्रांड",
      pillarBrandDesc: "आपका लोगो, रंग, फ़ॉन्ट और कस्टम डोमेन",
      pillarProducts: "आपके उत्पाद",
      pillarProductsDesc: "आपके पैक, श्रेणियों और कीमतों के साथ लोड",
      pillarTurnkey: "टर्नकी क्लोन",
      pillarTurnkeyDesc: "स्टोरफ्रंट + B2B थोक + व्यवस्थापक पैनल",
      pillarCommission: "0% GMV कटौती",
      pillarCommissionDesc: "आपके क्लाउड में स्थायी कोड लाइसेंस",
    },
    pricing: {
      badge: "टर्नकी प्लेटफ़ॉर्म लाइसेंस",
      provenAt: "dariyo.in पर लाइव प्रमाणित",
      title: "आपका अपना स्टोर।",
      titleItalic: "Dariyo.in का संपूर्ण क्लोन",
      subtitle:
        "हम dariyo.in पर चल रहे उच्च-प्रदर्शन वाणिज्य सिस्टम को आपके लिए तैनात करते हैं — आपकी वेबसाइट, आपके ब्रांड और आपके उत्पाद कैटलॉग के साथ पुन: डिज़ाइन किया गया। शून्य राजस्व कटौती के साथ स्थायी स्रोत कोड लाइसेंस।",
      yourQuote: "आपका कोटेशन",
      oneTimeSetup: "एकमुश्त सेटअप",
      everyMonth: "प्रति माह",
      setupTotal: "कुल सेटअप",
      monthlyTotal: "मासिक कुल",
      subtotal: "उप-योग",
      gstLabel: "जीएसटी",
      noPlan: "कोई सपोर्ट प्लान नहीं, घंटे के हिसाब से भुगतान",
      hostingPaidToProviders: "होस्टिंग, प्रदाताओं को देय",
      hostingAbout: "लगभग",
      paymentSchedule: "भुगतान अनुसूची",
      launchTimeline: "लॉन्च समयरेखा",
      weeksEstimate: "हफ्ते अनुबंध से",
      copyLink: "लिंक कॉपी करें",
      linkCopied: "लिंक कॉपी हो गया!",
      printQuote: "कोटेशन प्रिंट करें",
      submitQuote: "कोटेशन जमा करें और कॉल का अनुरोध करें",
      mostPopular: "सर्वाधिक लोकप्रिय",
      oneTime: "एकमुश्त",
      liveInAbout: "शुरू होने में लगभग",
      payAsYouGo: "जैसे उपयोग करें वैसे भुगतान करें",
      anHour: "प्रति घंटा",
      hoursPerMonth: "घंटे प्रति माह",
      choosePackage: "एक पैकेज से शुरुआत करें",
      pickModules: "अपने मॉड्यूल चुनें",
      supportPlan: "सपोर्ट प्लान",
      hostingTier: "होस्टिंग अनुमान",
    },
    services: {
      badge: "इंजीनियरिंग और स्टाफिंग",
      title: "कस्टम सॉफ्टवेयर विकास और",
      titleItalic: "समर्पित इंजीनियरिंग प्रतिभा",
      subtitle:
        "हमारे टर्नकी कॉमर्स प्लेटफ़ॉर्म के अलावा, हमारी टीम उच्च-प्रदर्शन वेब एप्लिकेशन, मोबाइल ऐप और समर्पित डेवलपर प्रदान करती है।",
      fixedProjects: "टर्नकी प्रोजेक्ट पैकेज",
      staffing: "समर्पित सॉफ्टवेयर इंजीनियर",
      technologies: "तकनीकी क्षमताएं",
      inquireNow: "अभी पूछताछ करें",
      perHour: "/घंटा",
      fullTimeRate: "160 घंटे / माह",
      partTimeRate: "80 घंटे / माह",
    },
    contact: {
      badge: "संपर्क करें",
      title: "आइए अपना अगला प्लेटफ़ॉर्म बनाएं",
      subtitle: "हमें अपने प्रोजेक्ट के बारे में बताएं या हमारी इंजीनियरिंग टीम के साथ परामर्श बुक करें।",
      nameLabel: "आपका नाम",
      emailLabel: "कार्य ईमेल",
      phoneLabel: "फ़ोन नंबर",
      companyLabel: "कंपनी का नाम",
      messageLabel: "परियोजना विवरण",
      submitButton: "पूछताछ भेजें",
      sending: "भेज रहा है...",
      directChannels: "सीधे संपर्क माध्यम",
    },
    footer: {
      tagline: "संपूर्ण ड्राई-फिश और विशेषता कॉमर्स इंजन। निर्मित, परीक्षित, क्लोन के लिए तैयार।",
      navigation: "नेविगेशन",
      platform: "प्लेटफ़ॉर्म",
      legal: "कानूनी",
      allRightsReserved: "सर्वाधिकार सुरक्षित।",
      noCommission: "बिक्री पर 0% कमीशन। आपका प्लेटफ़ॉर्म, आपका क्लाउड, आपका कोड।",
    },
    common: {
      currency: "मुद्रा",
      language: "भाषा",
      select: "चुनें",
      selected: "चयनित",
      required: "आवश्यक",
      optional: "वैकल्पिक",
      close: "बंद करें",
      submit: "जमा करें",
      cancel: "रद्द करें",
      month: "माह",
      week: "सप्ताह",
      weeks: "सप्ताह",
      day: "दिन",
      days: "दिन",
      hour: "घंटा",
      hours: "घंटे",
    },
  },

  gu: {
    nav: {
      features: "સુવિધાઓ",
      services: "સેવાઓ",
      pricing: "ક્લોન કિંમત",
      blog: "બ્લોગ",
      about: "અમારા વિશે",
      contact: "સંપર્ક",
      platform: "પ્લેટફોર્મ",
      liveDemo: "લાઈવ ડેમો જુઓ",
      buildQuote: "ક્વોટ બનાવો",
    },
    hero: {
      badgeTurnkey: "ટર્નકી પ્લેટફોર્મ લાઇસન્સ",
      badgeProven: "dariyo.in પર લાઇવ સાબિત",
      titlePart1: "સંપૂર્ણ ઈ-કોમર્સ એન્જિન.",
      titleItalic: "બનાવેલું, ચકાસાયેલું, ક્લોન માટે તૈયાર.",
      subtitle:
        "અમે dariyo.in પાછળનું સંપૂર્ણ કોમર્સ પ્લેટફોર્મ બનાવ્યું અને સ્કેલ કર્યું — અને અમે તમારા બિઝનેસ માટે સમર્પિત ક્લોન કસ્ટમાઇઝ અને ડિપ્લોય કરીશું.",
      ctaQuote: "તમારો કસ્ટમ ક્વોટ બનાવો",
      ctaDemo: "લાઈવ સ્ટોર જુઓ",
      licenseText: "કાયમી સોર્સ કોડ લાઇસન્સ · 0% કમિશન · તમારા ક્લાઉડમાં ડિપ્લોય",
      pillarBrand: "તમારી બ્રાન્ડ",
      pillarBrandDesc: "તમારો લોગો, કલર્સ અને કસ્ટમ ડોમેન",
      pillarProducts: "તમારા ઉત્પાદનો",
      pillarProductsDesc: "તમારા પેક, કેટેગરી અને ભાવો સાથે સેટ",
      pillarTurnkey: "ટર્નકી ક્લોન",
      pillarTurnkeyDesc: "સ્ટોરફ્રન્ટ + B2B જથ્થાબંધ + એડમિન પેનલ",
      pillarCommission: "0% GMV કમિશન",
      pillarCommissionDesc: "તમારા ક્લાઉડમાં કાયમી કોડ લાઇસન્સ",
    },
    pricing: {
      badge: "ટર્નકી પ્લેટફોર્મ લાઇસન્સ",
      provenAt: "dariyo.in પર લાઇવ સાબિત",
      title: "તમારો પોતાનો સ્ટોર.",
      titleItalic: "Dariyo.in નો સંપૂર્ણ ક્લોન",
      subtitle:
        "અમે dariyo.in પર ચાલતી હાઇ-પરફોર્મન્સ કોમર્સ સિસ્ટમ તમારા માટે તૈયાર કરી આપીએ છીએ — તમારી વેબસાઇટ, તમારી બ્રાન્ડ અને તમારા પ્રોડક્ટ્સ સાથે. કાયમી સોર્સ કોડ લાઇસન્સ સાથે કોઈ આવક કપાત નહીં.",
      yourQuote: "તમારો ક્વોટ",
      oneTimeSetup: "વન-ટાઇમ સેટઅપ",
      everyMonth: "દર મહિને",
      setupTotal: "કુલ સેટઅપ",
      monthlyTotal: "માસિક કુલ",
      subtotal: "સબટોટલ",
      gstLabel: "જીએસટી",
      noPlan: "કોઈ સપોર્ટ પ્લાન નથી, કલાક મુજબ ચૂકવો",
      hostingPaidToProviders: "હોસ્ટિંગ, પ્રોવાઇડર્સને ચૂકવવાપાત્ર",
      hostingAbout: "આશરે",
      paymentSchedule: "ચુકવણી શેડ્યૂલ",
      launchTimeline: "લોન્ચ સમયરેખા",
      weeksEstimate: "અઠવાડિયા સહી કર્યા પછી",
      copyLink: "લિંક કોપી કરો",
      linkCopied: "લિંક કોપી થઈ ગઈ!",
      printQuote: "ક્વોટ પ્રિન્ટ કરો",
      submitQuote: "ક્વોટ સબમિટ કરો અને કોલ મેળવો",
      mostPopular: "સૌથી વધુ લોકપ્રિય",
      oneTime: "એકવાર",
      liveInAbout: "શરૂ થવામાં આશરે",
      payAsYouGo: "ઉપયોગ મુજબ ચૂકવો",
      anHour: "કલાક દીઠ",
      hoursPerMonth: "કલાક પ્રતિ મહિને",
      choosePackage: "પેકેજથી શરૂ કરો",
      pickModules: "મોડ્યુલ્સ પસંદ કરો",
      supportPlan: "સપોર્ટ પ્લાન",
      hostingTier: "હોસ્ટિંગ અંદાજ",
    },
    services: {
      badge: "એન્જિનિયરિંગ અને સ્ટાફિંગ",
      title: "કસ્ટમ સોફ્ટવેર ડેવલપમેન્ટ અને",
      titleItalic: "સમર્પિત એન્જિનિયરિંગ ટીમ",
      subtitle:
        "અમારા ટર્નકી કોમર્સ પ્લેટફોર્મ ઉપરાંત, અમારી ટીમ હાઇ-પરફોર્મન્સ વેબ એપ્સ, મોબાઇલ એપ્લિકેશન્સ અને સમર્પિત ડેવલપર્સ પ્રદાન કરે છે.",
      fixedProjects: "પ્રોજેક્ટ પેકેજીસ",
      staffing: "સમર્પિત સોફ્ટવેર એન્જિનિયર્સ",
      technologies: "ટેકનોલોજી ક્ષમતાઓ",
      inquireNow: "પૂછપરછ કરો",
      perHour: "/કલાક",
      fullTimeRate: "160 કલાક / મહિનો",
      partTimeRate: "80 કલાક / મહિનો",
    },
    contact: {
      badge: "સંપર્ક કરો",
      title: "ચાલો તમારું આગલું પ્લેટફોર્મ બનાવીએ",
      subtitle: "તમારા પ્રોજેક્ટ વિશે જણાવો અથવા અમારી એન્જિનિયરિંગ ટીમ સાથે કન્સલ્ટેશન બુક કરો.",
      nameLabel: "તમારું નામ",
      emailLabel: "કામનું ઇમેઇલ",
      phoneLabel: "ફોન નંબર",
      companyLabel: "કંપનીનું નામ",
      messageLabel: "પ્રોજેક્ટ જરૂરિયાતો",
      submitButton: "પૂછપરછ મોકલો",
      sending: "મોકલી રહ્યું છે...",
      directChannels: "સીધા સંપર્ક માધ્યમો",
    },
    footer: {
      tagline: "સંપૂર્ણ ડ્રાય-ફિશ અને સ્પેશિયાલિટી કોમર્સ એન્જિન. બનાવેલું, ચકાસાયેલું, ક્લોન માટે તૈયાર.",
      navigation: "નેવિગેશન",
      platform: "પ્લેટફોર્મ",
      legal: "કાનૂની",
      allRightsReserved: "સર્વ હક સુરક્ષિત.",
      noCommission: "વેચાણ પર 0% કમિશન. તમારું પ્લેટફોર્મ, તમારું ક્લાઉડ, તમારો કોડ.",
    },
    common: {
      currency: "ચલણ",
      language: "ભાષા",
      select: "પસંદ કરો",
      selected: "પસંદ કરેલ",
      required: "જરૂરી",
      optional: "વૈકલ્પિક",
      close: "બંધ કરો",
      submit: "સબમિટ કરો",
      cancel: "રદ કરો",
      month: "મહિનો",
      week: "અઠવાડિયું",
      weeks: "અઠવાડિયા",
      day: "દિવસ",
      days: "દિવસો",
      hour: "કલાક",
      hours: "કલાકો",
    },
  },

  es: {
    nav: {
      features: "Características",
      services: "Servicios",
      pricing: "Precios del Clon",
      blog: "Blog",
      about: "Nosotros",
      contact: "Contacto",
      platform: "Plataforma",
      liveDemo: "Probar Demo",
      buildQuote: "Cotizar Proyecto",
    },
    hero: {
      badgeTurnkey: "Licencia de Plataforma Llave en Mano",
      badgeProven: "Comprobado en dariyo.in",
      titlePart1: "El motor de comercio completo.",
      titleItalic: "Construido, probado, listo para clonar.",
      subtitle:
        "Creamos y escalamos la plataforma de comercio detrás de dariyo.in; ahora personalizamos e implementamos un clon dedicado para su empresa.",
      ctaQuote: "Construya su Cotización",
      ctaDemo: "Explorar Tienda en Vivo",
      licenseText: "Licencia de código fuente permanente · 0% comisión sobre ventas · En su propia nube",
      pillarBrand: "Su Marca",
      pillarBrandDesc: "Su logotipo, colores, fuentes y dominio propio",
      pillarProducts: "Sus Productos",
      pillarProductsDesc: "Cargado con sus paquetes, categorías y precios",
      pillarTurnkey: "Clon Llave en Mano",
      pillarTurnkeyDesc: "Tienda online + B2B Mayorista + Panel de control",
      pillarCommission: "0% Comisión",
      pillarCommissionDesc: "Licencia de código permanente en sus servidores",
    },
    pricing: {
      badge: "Licencia Llave en Mano",
      provenAt: "Comprobado en dariyo.in",
      title: "Su propia tienda.",
      titleItalic: "Un clon completo de Dariyo.in",
      subtitle:
        "Implementamos el sistema de comercio de alto rendimiento probado en dariyo.in: adaptado a su marca, catálogo y diseño. Licencia permanente sin comisiones sobre ventas.",
      yourQuote: "Su cotización",
      oneTimeSetup: "Configuración única",
      everyMonth: "Cada mes",
      setupTotal: "Total de configuración",
      monthlyTotal: "Total mensual",
      subtotal: "Subtotal",
      gstLabel: "Impuestos",
      noPlan: "Sin plan mensual, pago por hora",
      hostingPaidToProviders: "Alojamiento, pagado a proveedores",
      hostingAbout: "aprox.",
      paymentSchedule: "Etapas de pago",
      launchTimeline: "Plazo de lanzamiento",
      weeksEstimate: "semanas desde la firma",
      copyLink: "Copiar enlace",
      linkCopied: "¡Enlace copiado!",
      printQuote: "Imprimir cotización",
      submitQuote: "Enviar cotización y solicitar llamada",
      mostPopular: "Más popular",
      oneTime: "pago único",
      liveInAbout: "en vivo en aprox.",
      payAsYouGo: "Pago por uso",
      anHour: "por hora",
      hoursPerMonth: "horas al mes",
      choosePackage: "Comience con un paquete",
      pickModules: "Seleccione sus módulos",
      supportPlan: "Plan de soporte",
      hostingTier: "Estimación de alojamiento",
    },
    services: {
      badge: "Ingeniería y Talento",
      title: "Desarrollo de Software a Medida y",
      titleItalic: "Talento de Ingeniería Dedicado",
      subtitle:
        "Además de nuestra plataforma de comercio electrónico, nuestro equipo diseña y crea aplicaciones web escalables y equipos de desarrollo dedicados.",
      fixedProjects: "Paquetes de Proyectos",
      staffing: "Ingenieros Dedicados",
      technologies: "Habilidades Técnicas",
      inquireNow: "Consultar Ahora",
      perHour: "/hora",
      fullTimeRate: "160 hrs / mes",
      partTimeRate: "80 hrs / mes",
    },
    contact: {
      badge: "Contáctenos",
      title: "Construyamos su próxima plataforma",
      subtitle: "Cuéntenos sobre su proyecto o agende una consulta técnica con nuestros ingenieros.",
      nameLabel: "Su nombre",
      emailLabel: "Correo corporativo",
      phoneLabel: "Teléfono",
      companyLabel: "Empresa",
      messageLabel: "Requerimientos del proyecto",
      submitButton: "Enviar Consulta",
      sending: "Enviando...",
      directChannels: "Canales Directos",
    },
    footer: {
      tagline: "El motor de comercio completo. Construido, probado, listo para clonar.",
      navigation: "Navegación",
      platform: "Plataforma",
      legal: "Legal",
      allRightsReserved: "Todos los derechos reservados.",
      noCommission: "0% comisión sobre ventas. Su plataforma, su nube, su código.",
    },
    common: {
      currency: "Moneda",
      language: "Idioma",
      select: "Seleccionar",
      selected: "Seleccionado",
      required: "Requerido",
      optional: "Opcional",
      close: "Cerrar",
      submit: "Enviar",
      cancel: "Cancelar",
      month: "mes",
      week: "semana",
      weeks: "semanas",
      day: "día",
      days: "días",
      hour: "hora",
      hours: "horas",
    },
  },

  fr: {
    nav: {
      features: "Fonctionnalités",
      services: "Services",
      pricing: "Tarifs du Clone",
      blog: "Blog",
      about: "À propos",
      contact: "Contact",
      platform: "Plateforme",
      liveDemo: "Tester la Démo",
      buildQuote: "Créer un Devis",
    },
    hero: {
      badgeTurnkey: "Licence Clé en Main",
      badgeProven: "Éprouvé sur dariyo.in",
      titlePart1: "Le moteur de commerce complet.",
      titleItalic: "Conçu, testé, prêt à déployer.",
      subtitle:
        "Nous avons conçu et déployé la plateforme e-commerce complète de dariyo.in — nous personnalisons et déployons un clone dédié pour votre entreprise.",
      ctaQuote: "Créer votre Devis",
      ctaDemo: "Explorer la Démo",
      licenseText: "Licence permanente du code source · 0% de commission · Déployé dans votre cloud",
      pillarBrand: "Votre Marque",
      pillarBrandDesc: "Votre logo, vos couleurs, votre domaine",
      pillarProducts: "Vos Produits",
      pillarProductsDesc: "Configuré avec vos catégories et tarifs",
      pillarTurnkey: "Clone Clé en Main",
      pillarTurnkeyDesc: "Boutique en ligne + B2B + Panneau d'administration",
      pillarCommission: "0% Commission",
      pillarCommissionDesc: "Code source permanent dans vos serveurs",
    },
    pricing: {
      badge: "Licence Clé en Main",
      provenAt: "Éprouvé sur dariyo.in",
      title: "Votre propre boutique.",
      titleItalic: "Un clone complet de Dariyo.in",
      subtitle:
        "Nous déployons le système e-commerce haute performance de dariyo.in — personnalisé avec votre marque et votre catalogue de produits. Licence permanente sans prélèvement sur vos ventes.",
      yourQuote: "Votre devis",
      oneTimeSetup: "Configuration unique",
      everyMonth: "Chaque mois",
      setupTotal: "Total de configuration",
      monthlyTotal: "Total mensuel",
      subtotal: "Sous-total",
      gstLabel: "TVA",
      noPlan: "Sans plan de support, facturation à l'heure",
      hostingPaidToProviders: "Hébergement, payé aux fournisseurs",
      hostingAbout: "environ",
      paymentSchedule: "Échéancier de paiement",
      launchTimeline: "Délai de lancement",
      weeksEstimate: "semaines après signature",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié !",
      printQuote: "Imprimer le devis",
      submitQuote: "Envoyer le devis & Demander un rappel",
      mostPopular: "Le plus populaire",
      oneTime: "unique",
      liveInAbout: "en ligne en environ",
      payAsYouGo: "Paiement à l'usage",
      anHour: "de l'heure",
      hoursPerMonth: "heures par mois",
      choosePackage: "Commencer avec un forfait",
      pickModules: "Sélectionnez vos modules",
      supportPlan: "Plan de support",
      hostingTier: "Estimation hébergement",
    },
    services: {
      badge: "Ingénierie & Recrutement",
      title: "Développement Logiciel Sur Mesure &",
      titleItalic: "Talents d'Ingénierie Dédiés",
      subtitle:
        "Au-delà de notre plateforme clé en main, notre équipe conçoit et réalise des applications web haut débit et des équipes d'ingénierie dédiées.",
      fixedProjects: "Forfaits Clé en Main",
      staffing: "Ingénieurs Dédiés",
      technologies: "Compétences Techniques",
      inquireNow: "Demander un Devis",
      perHour: "/h",
      fullTimeRate: "160 h / mois",
      partTimeRate: "80 h / mois",
    },
    contact: {
      badge: "Contactez-nous",
      title: "Bâtissons votre prochaine plateforme",
      subtitle: "Parlez-nous de vos besoins ou réservez une consultation technique avec nos ingénieurs.",
      nameLabel: "Votre nom",
      emailLabel: "Email professionnel",
      phoneLabel: "Téléphone",
      companyLabel: "Société",
      messageLabel: "Besoins du projet",
      submitButton: "Envoyer la Demande",
      sending: "Envoi en cours...",
      directChannels: "Canaux Directs",
    },
    footer: {
      tagline: "Le moteur de commerce spécialisé complet. Conçu, testé, prêt à cloner.",
      navigation: "Navigation",
      platform: "Plateforme",
      legal: "Mentions Légales",
      allRightsReserved: "Tous droits réservés.",
      noCommission: "0% de commission sur vos ventes. Votre plateforme, votre cloud, votre code.",
    },
    common: {
      currency: "Devise",
      language: "Langue",
      select: "Sélectionner",
      selected: "Sélectionné",
      required: "Requis",
      optional: "Optionnel",
      close: "Fermer",
      submit: "Envoyer",
      cancel: "Annuler",
      month: "mois",
      week: "semaine",
      weeks: "semaines",
      day: "jour",
      days: "jours",
      hour: "heure",
      hours: "heures",
    },
  },

  de: {
    nav: {
      features: "Funktionen",
      services: "Dienste",
      pricing: "Klon-Preise",
      blog: "Blog",
      about: "Über uns",
      contact: "Kontakt",
      platform: "Plattform",
      liveDemo: "Live-Demo testen",
      buildQuote: "Angebot erstellen",
    },
    hero: {
      badgeTurnkey: "Schlüsselfertige Lizenz",
      badgeProven: "Erprobt auf dariyo.in",
      titlePart1: "Die vollständige Commerce-Engine.",
      titleItalic: "Entwickelt, getestet, bereit zum Klonen.",
      subtitle:
        "Wir haben die vollständige Commerce-Plattform hinter dariyo.in entwickelt und skaliert – und wir passen einen dedizierten Klon für Ihr Unternehmen an.",
      ctaQuote: "Individuelles Angebot erstellen",
      ctaDemo: "Live-Shop erkunden",
      licenseText: "Dauerhafte Quellcode-Lizenz · 0% Umsatzprovision · In Ihrer Cloud bereitgestellt",
      pillarBrand: "Ihre Marke",
      pillarBrandDesc: "Ihr Logo, Ihre Farben, eigene Domain",
      pillarProducts: "Ihre Produkte",
      pillarProductsDesc: "Mit Ihren Packungsgrößen & Preisen konfiguriert",
      pillarTurnkey: "Schlüsselfertiger Klon",
      pillarTurnkeyDesc: "Storefront + B2B Großhandel + Admin-Konsole",
      pillarCommission: "0% Provision",
      pillarCommissionDesc: "Permanenter Quellcode auf Ihren Servern",
    },
    pricing: {
      badge: "Schlüsselfertige Plattformlizenz",
      provenAt: "Erprobt auf dariyo.in",
      title: "Ihr eigener Shop.",
      titleItalic: "Ein vollständiger Klon von Dariyo.in",
      subtitle:
        "Wir stellen das praxiserprobte Commerce-System von dariyo.in für Sie bereit – maßgeschneidert mit Ihrer Marke und Produktkatalog. Permanente Lizenz ohne Umsatzbeteiligung.",
      yourQuote: "Ihr Angebot",
      oneTimeSetup: "Einmalige Einrichtung",
      everyMonth: "Monatlich",
      setupTotal: "Setup-Gesamt",
      monthlyTotal: "Monatlich gesamt",
      subtotal: "Zwischensumme",
      gstLabel: "MwSt",
      noPlan: "Kein Supportplan, Abrechnung nach Stunden",
      hostingPaidToProviders: "Hosting, direkt an Anbieter zahlbar",
      hostingAbout: "ca.",
      paymentSchedule: "Zahlungsplan",
      launchTimeline: "Einführungszeitraum",
      weeksEstimate: "Wochen ab Vertragsabschluss",
      copyLink: "Link kopieren",
      linkCopied: "Link kopiert!",
      printQuote: "Angebot drucken",
      submitQuote: "Angebot absenden & Rückruf anfordern",
      mostPopular: "Am beliebtesten",
      oneTime: "einmalig",
      liveInAbout: "Online in ca.",
      payAsYouGo: "Nach Aufwand",
      anHour: "pro Stunde",
      hoursPerMonth: "Stunden pro Monat",
      choosePackage: "Mit einem Paket starten",
      pickModules: "Module auswählen",
      supportPlan: "Supportplan",
      hostingTier: "Hosting-Schätzung",
    },
    services: {
      badge: "Engineering & Staffing",
      title: "Individuelle Softwareentwicklung &",
      titleItalic: "Dedizierte Entwickler-Teams",
      subtitle:
        "Neben unserer Commerce-Plattform entwickelt unser Team anspruchsvolle Webanwendungen, mobile Apps und stellt dedizierte Software-Ingenieure bereit.",
      fixedProjects: "Projekt-Pakete",
      staffing: "Dedizierte Ingenieure",
      technologies: "Technologien",
      inquireNow: "Jetzt anfragen",
      perHour: "/Std.",
      fullTimeRate: "160 Std. / Monat",
      partTimeRate: "80 Std. / Monat",
    },
    contact: {
      badge: "Kontakt aufnehmen",
      title: "Lassen Sie uns Ihre Plattform aufbauen",
      subtitle: "Erzählen Sie uns von Ihrem Projekt oder vereinbaren Sie eine technische Beratung.",
      nameLabel: "Ihr Name",
      emailLabel: "Geschäftliche E-Mail",
      phoneLabel: "Telefonnummer",
      companyLabel: "Unternehmen",
      messageLabel: "Projektanforderungen",
      submitButton: "Anfrage senden",
      sending: "Wird gesendet...",
      directChannels: "Direkte Kanäle",
    },
    footer: {
      tagline: "Die spezialisierte E-Commerce-Plattform. Entwickelt, getestet, einsatzbereit.",
      navigation: "Navigation",
      platform: "Plattform",
      legal: "Rechtliches",
      allRightsReserved: "Alle Rechte vorbehalten.",
      noCommission: "0% Provision auf Ihre Verkäufe. Ihre Plattform, Ihre Cloud, Ihr Code.",
    },
    common: {
      currency: "Währung",
      language: "Sprache",
      select: "Auswählen",
      selected: "Ausgewählt",
      required: "Erforderlich",
      optional: "Optional",
      close: "Schließen",
      submit: "Absenden",
      cancel: "Abbrechen",
      month: "Monat",
      week: "Woche",
      weeks: "Wochen",
      day: "Tag",
      days: "Tage",
      hour: "Stunde",
      hours: "Stunden",
    },
  },

  ar: {
    nav: {
      features: "المميزات",
      services: "الخدمات",
      pricing: "أسعار الاستنساخ",
      blog: "المدونة",
      about: "من نحن",
      contact: "اتصل بنا",
      platform: "المنصة",
      liveDemo: "تجربة العرض الحي",
      buildQuote: "طلب عرض سعر",
    },
    hero: {
      badgeTurnkey: "ترخيص منصة جاهزة بالكامل",
      badgeProven: "مجرب وحي على dariyo.in",
      titlePart1: "محرك التجارة الإلكترونية المتكامل.",
      titleItalic: "مبني، مجرب، وجاهز للاستنساخ.",
      subtitle:
        "قمنا ببناء واختبار وتوسيع منصة التجارة المتكاملة خلف dariyo.in — وسنقوم بتخصيص ونشر نسخة مطابقة ومخصصة لعلامتك التجارية بالكامل.",
      ctaQuote: "أنشئ عرض السعر الخاص بك",
      ctaDemo: "استكشف المتجر الحي",
      licenseText: "ترخيص كود مصدري دائم · 0% عمولة على المبيعات · منشور في سحابتك الخاصة",
      pillarBrand: "علامتك التجارية",
      pillarBrandDesc: "شعارك، ألوانك، ونطاقك الخاص",
      pillarProducts: "منتجاتك",
      pillarProductsDesc: "محمل بفئات وأسعار منتجاتك",
      pillarTurnkey: "نسخة جاهزة بالكامل",
      pillarTurnkeyDesc: "واجهة متجر + تجارة جملة B2B + لوحة إدارة",
      pillarCommission: "0% نسبة من المبيعات",
      pillarCommissionDesc: "ترخيص كود دائم في حساباتك السحابية",
    },
    pricing: {
      badge: "ترخيص منصة متكاملة",
      provenAt: "مجرب وحي على dariyo.in",
      title: "متجرك الخاص.",
      titleItalic: "استنساخ متكامل لمنصة Dariyo.in",
      subtitle:
        "نقوم بنشر نفس نظام التجارة فائق الأداء الذي يعمل على dariyo.in — مخصصاً بالكامل لعلامتك التجارية ومنتجاتك بدون أي عمولات متكررة.",
      yourQuote: "عرض السعر الخاص بك",
      oneTimeSetup: "الإعداد لمرة واحدة",
      everyMonth: "شهرياً",
      setupTotal: "إجمالي الإعداد",
      monthlyTotal: "الإجمالي الشهري",
      subtotal: "المجموع الفرعي",
      gstLabel: "الضريبة",
      noPlan: "بدون خطة دعم، الدفع بالساعة",
      hostingPaidToProviders: "الاستضافة، مدفوعة لمزودي الخدمة",
      hostingAbout: "حوالي",
      paymentSchedule: "جدول الدفعات",
      launchTimeline: "الجدول الزمني للإطلاق",
      weeksEstimate: "أسابيع من التوقيع",
      copyLink: "نسخ الرابط",
      linkCopied: "تم نسخ الرابط!",
      printQuote: "طباعة العرض",
      submitQuote: "إرسال العرض وطلب اتصال",
      mostPopular: "الأكثر طلباً",
      oneTime: "مرة واحدة",
      liveInAbout: "الإطلاق خلال حوالي",
      payAsYouGo: "الدفع حسب الاستخدام",
      anHour: "لكل ساعة",
      hoursPerMonth: "ساعات شهرياً",
      choosePackage: "ابدأ باختيار باقة",
      pickModules: "اختر الوحدات البرمجية",
      supportPlan: "خطة الدعم",
      hostingTier: "تقدير الاستضافة",
    },
    services: {
      badge: "الهندسة والتوظيف التقني",
      title: "تطوير برمجيات مخصصة و",
      titleItalic: "مهندسو برمجيات متخصصون",
      subtitle:
        "بالإضافة إلى منصتنا الجاهزة، يصمم فريقنا الهندسي تطبيقات ويب وتطبيقات هواتف ذكية عالية الأداء وفرق عمل مخصصة.",
      fixedProjects: "باقات المشاريع الجاهزة",
      staffing: "مهندسو برمجيات مخصصون",
      technologies: "القدرات التقنية",
      inquireNow: "استفسر الآن",
      perHour: "/ساعة",
      fullTimeRate: "160 ساعة / شهر",
      partTimeRate: "80 ساعة / شهر",
    },
    contact: {
      badge: "تواصل معنا",
      title: "لنبنِ منصتك القادمة معاً",
      subtitle: "أخبرنا عن متطلبات مشروعك أو احجز استشارة تقنية مع فريقنا الهندسي.",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني للعمل",
      phoneLabel: "رقم الهاتف",
      companyLabel: "اسم الشركة",
      messageLabel: "متطلبات المشروع",
      submitButton: "إرسال الاستفسار",
      sending: "جاري الإرسال...",
      directChannels: "قنوات الاتصال المباشرة",
    },
    footer: {
      tagline: "محرك التجارة الإلكترونية المتكامل. مبني، مجرب، وجاهز للاستنساخ.",
      navigation: "التنقل",
      platform: "المنصة",
      legal: "قانوني",
      allRightsReserved: "جميع الحقوق محفوظة.",
      noCommission: "0% عمولة على المبيعات. منصتك، سحابتك، كودك الخاص.",
    },
    common: {
      currency: "العملة",
      language: "اللغة",
      select: "اختر",
      selected: "تم الاختيار",
      required: "مطلوب",
      optional: "اختياري",
      close: "إغلاق",
      submit: "إرسال",
      cancel: "إلغاء",
      month: "شهر",
      week: "أسبوع",
      weeks: "أسابيع",
      day: "يوم",
      days: "أيام",
      hour: "ساعة",
      hours: "ساعات",
    },
  },
};

/**
 * Returns the translation dictionary for a given language code, falling back to English.
 */
export function getTranslations(lang: LanguageCode = "en"): TranslationDictionary {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}

