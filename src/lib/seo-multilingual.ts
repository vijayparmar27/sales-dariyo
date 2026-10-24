import type { Metadata } from "next";
import { site } from "@/config/site";
import type { LanguageCode } from "@/lib/i18n/languages";
import { getCanonicalUrl, getLanguageAlternates } from "./seo";

export type SeoPageKey = "home" | "pricing" | "services" | "about" | "contact" | "blog";

export interface LocalizedSeoContent {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * Native, localized SEO copy for all 7 languages.
 * Hand-tailored with high-intent commercial and transactional queries in each native language
 * to ensure top rankings in global and Indian regional search engines.
 */
export const MULTILINGUAL_SEO_CONTENT: Record<SeoPageKey, Record<LanguageCode, LocalizedSeoContent>> = {
  home: {
    en: {
      title: "Commerce Platform Source Code & Engineering | Own Your Store",
      description:
        "Launch your own branded online store, B2B wholesale portal, and operator admin console. Complete permanent source code license, 0% recurring GMV cut, deployed in your private cloud.",
      keywords: [
        "commerce platform source code",
        "ecommerce clone source code",
        "buy ecommerce software license",
        "next.js 16 ecommerce platform",
        "react operator admin console",
        "b2b wholesale portal software",
        "hire dedicated nextjs developers",
        "self hosted ecommerce platform India",
      ],
    },
    hi: {
      title: "ई-कॉमर्स प्लेटफॉर्म सोर्स कोड और डेवलपर सर्विसेज | Dariyo",
      description:
        "अपना खुद का ऑनलाइन स्टोर, थोक B2B पोर्टल और एडमिन पैनल शुरू करें। स्थायी सोर्स कोड लाइसेंस, 0% कमीशन, और अपनी निजी क्लाउड पर पूर्ण नियंत्रण।",
      keywords: [
        "ई-कॉमर्स प्लेटफॉर्म सोर्स कोड",
        "ऑनलाइन स्टोर सॉफ्टवेयर कोड",
        "थोक व्यापार B2B पोर्टल",
        "रिएक्ट एडमिन पैनल",
        "नेक्स्ट जेएस ई-कॉमर्स स्क्रिप्ट",
        "समर्पित सॉफ्टवेयर डेवलपर्स हायर करें",
        "0% कमीशन ऑनलाइन स्टोर",
      ],
    },
    gu: {
      title: "વાણિજ્ય પ્લેટફોર્મ સોર્સ કોડ અને સોફ્ટવેર એન્જિનિયરિંગ | Dariyo",
      description:
        "તમારો પોતાનો બ્રાન્ડેડ ઓનલાઇન સ્ટોર, જથ્થાબંધ પોર્ટલ અને એડમિન કન્સોલ લોન્ચ કરો. કાયમી સોર્સ કોડ લાઇસન્સ, 0% કમિશન, અને તમારા પોતાના ક્લાઉડ પર સંપૂર્ણ નિયંત્રણ.",
      keywords: [
        "વાણિજ્ય પ્લેટફોર્મ સોર્સ કોડ",
        "ઓનલાઇન સ્ટોર સોફ્ટવેર ખરીદો",
        "જથ્થાબંધ વેપાર પોર્ટલ",
        "નેક્સ્ટ જેએસ ઈ-કોમર્સ",
        "ડેડિકેટેડ સોફ્ટવેર ડેવલપર હાયર કરો",
        "શૂન્ય કમિશન ઈ-કોમર્સ પ્લેટફોર્મ",
      ],
    },
    es: {
      title: "Código Fuente de Plataforma de Comercio Electrónico | Dariyo",
      description:
        "Lanza tu propia tienda en línea, portal mayorista B2B y panel de administración. Licencia de código fuente permanente, 0% de comisión por ventas, alojado en tu propia nube.",
      keywords: [
        "código fuente ecommerce",
        "comprar plataforma comercio electronico",
        "licencia de software ecommerce",
        "desarrolladores next.js dedicados",
        "portal b2b mayorista",
        "plataforma ecommerce autoalojada",
      ],
    },
    fr: {
      title: "Code Source de Plateforme E-Commerce Clé en Main | Dariyo",
      description:
        "Lancez votre propre boutique en ligne, portail B2B de gros et panneau d'administration. Licence de code source permanente, 0% de commission, déployé sur vos serveurs.",
      keywords: [
        "code source plateforme ecommerce",
        "acheter clone ecommerce",
        "licence logicielle ecommerce permanente",
        "recruter développeurs next.js dédiés",
        "portail grossiste b2b",
        "e-commerce auto-hébergé",
      ],
    },
    de: {
      title: "E-Commerce-Plattform Quellcode & Entwickler-Dienstleistungen | Dariyo",
      description:
        "Starten Sie Ihren eigenen Online-Shop, B2B-Großhandelsportal und Admin-Bereich. Dauerhafte Quellcode-Lizenz, 0% Umsatzprovision, in Ihrer eigenen Cloud gehostet.",
      keywords: [
        "ecommerce plattform quellcode",
        "onlineshop quellcode lizenz kaufen",
        "next.js 16 ecommerce plattform",
        "dedizierte entwickler mieten",
        "b2b großhandel webportal",
        "selbst gehostetes ecommerce",
      ],
    },
    ar: {
      title: "كود المصدر لمنصة التجارة الإلكترونية وخدمات المطورين | Dariyo",
      description:
        "أطلق متجرك الإلكتروني، وبوابة البيع بالجملة B2B، ولوحة تحكم المشغل. ترخيص دائم لكود المصدر الكامل، 0% عمولة على المبيعات، واستضافة على خوادمك الخاصة.",
      keywords: [
        "كود مصدر التجارة الإلكترونية",
        "شراء كود متجر إلكتروني",
        "ترخيص برمجي دائم",
        "توظيف مطورين مخصصين",
        "بوابة الجملة b2b",
        "منصة تجارة إلكترونية بدون عمولة",
      ],
    },
  },

  pricing: {
    en: {
      title: "Transparent Packages & Pricing Calculator | Own the Codebase",
      description:
        "Choose the modules your brand needs: retail storefront, wholesale B2B portal, 3D studio, and admin panel. Transparent one-time setup fee, permanent license, 0% GMV cut.",
      keywords: [
        "ecommerce clone pricing",
        "turnkey commerce platform packages",
        "source code setup fee",
        "b2b wholesale portal cost",
        "ecommerce software license price",
        "interactive pricing calculator ecommerce",
      ],
    },
    hi: {
      title: "पारदर्शी पैकेज और मूल्य कैलकुलेटर | Dariyo",
      description:
        "अपनी जरूरत के मॉड्यूल चुनें: ऑनलाइन स्टोर, थोक B2B पोर्टल, 3D उत्पाद व्यूअर और एडमिन पैनल। एकमुश्त सेटअप शुल्क, स्थायी लाइसेंस और 0% कमीशन।",
      keywords: [
        "ई-कॉमर्स क्लोन की कीमत",
        "सॉफ्टवेयर सोर्स कोड पैकेज",
        "ऑनलाइन स्टोर सेटअप शुल्क",
        "थोक B2B पोर्टल लागत",
      ],
    },
    gu: {
      title: "પારદર્શક પેકેજો અને પ્રાઇસીંગ કેલ્ક્યુલેટર | Dariyo",
      description:
        "તમારા વ્યવસાય માટે મોડ્યુલો પસંદ કરો: ઓનલાઇન સ્ટોર, જથ્થાબંધ પોર્ટલ, 3D વ્યુઅર અને એડમિન પેનલ. એક વખતની સેટઅપ ફી અને 0% કમિશન.",
      keywords: [
        "ઈ-કોમર્સ ક્લોન પેકેજ કિંમત",
        "સોર્સ કોડ સેટઅપ ફી",
        "જથ્થાબંધ પોર્ટલ ખર્ચ",
      ],
    },
    es: {
      title: "Precios Transparentes y Paquetes de Licencia | Dariyo",
      description:
        "Calcula el costo de tu plataforma de comercio: tienda minorista, portal mayorista B2B, estudio 3D y consola administrativa. Tarifa única, licencia permanente y 0% comisión.",
      keywords: [
        "precio código fuente ecommerce",
        "paquetes plataforma comercio electrónico",
        "calculadora de precios ecommerce",
      ],
    },
    fr: {
      title: "Tarifs Transparents & Calculateur de Licence | Dariyo",
      description:
        "Sélectionnez les modules dont vous avez besoin : boutique en ligne, portail B2B, visualiseur 3D et console d'administration. Frais d'installation uniques, 0% de commission.",
      keywords: [
        "prix code source ecommerce",
        "forfaits plateforme e-commerce",
        "coût portail grossiste b2b",
      ],
    },
    de: {
      title: "Transparente Preise & Paket-Kalkulator | Dariyo",
      description:
        "Wählen Sie Ihre Module: Storefront, B2B-Großhandelsportal, 3D-Viewer und Admin-Konsole. Einmalige Setup-Gebühr, lebenslange Lizenz, 0% Provision.",
      keywords: [
        "onlineshop quellcode preise",
        "ecommerce software pakete kalkulator",
        "b2b großhandelsportal kosten",
      ],
    },
    ar: {
      title: "حاسبة الأسعار وباقات الترخيص البرمجي | Dariyo",
      description:
        "اختر الوحدات التي تناسب عملك: متجر التجزئة، بوابة الجملة B2B، عارض النماذج ثلاثية الأبعاد، ولوحة الإدارة. تكلفة لمرة واحدة وبدون أي عمولة على المبيعات.",
      keywords: [
        "تكلفة كود المصدر للتجارة الإلكترونية",
        "باقات منصة التجارة الإلكترونية",
        "سعر بوابة الجملة b2b",
      ],
    },
  },

  services: {
    en: {
      title: "Hire Dedicated Next.js, React & Node Developers | Engineering Services",
      description:
        "Hire vetted senior software engineers on dedicated monthly engagements in Node.js, React 19, Next.js 16, Python FastAPI, and React Native. Custom web & mobile applications.",
      keywords: [
        "hire dedicated nextjs developers",
        "hire senior react 19 engineers",
        "hire node.js backend developers",
        "dedicated python fastapi engineers",
        "hire react native mobile app developers",
        "custom ecommerce software engineering",
        "offshore dedicated engineering team India",
      ],
    },
    hi: {
      title: "समर्पित नेक्स्ट जेएस, रिएक्ट और नोड डेवलपर्स हायर करें | Dariyo",
      description:
        "Node.js, React 19, Next.js 16, FastAPI और React Native में अनुभवी सॉफ्टवेयर डेवलपर्स मासिक आधार पर हायर करें। कस्टम वेब और मोबाइल एप्लीकेशन विकास।",
      keywords: [
        "नेक्स्ट जेएस डेवलपर्स हायर करें",
        "रिएक्ट सॉफ्टवेयर इंजीनियर",
        "नोड जेएस बैकएंड डेवलपर्स",
        "मोबाइल ऐप डेवलपर हायर करें",
        "कस्टम सॉफ्टवेयर इंजीनियरिंग सर्विसेज",
      ],
    },
    gu: {
      title: "ડેડિકેટેડ નેક્સ્ટ જેએસ, રિએક્ટ અને નોડ ડેવલપર્સ હાયર કરો | Dariyo",
      description:
        "Node.js, React 19, Next.js 16, FastAPI અને React Native માટે અનુભવી સોફ્ટવેર એન્જિનિયરો હાયર કરો. કસ્ટમ વેબ અને મોબાઇલ એપ્લિકેશન ડેવલપમેન્ટ.",
      keywords: [
        "નેક્સ્ટ જેએસ ડેવલપર હાયર કરો",
        "સોફ્ટવેર એન્જિનિયરિંગ સેવાઓ",
        "મોબાઇલ એપ ડેવલપમેન્ટ",
      ],
    },
    es: {
      title: "Contratar Desarrolladores Dedicados Next.js, React y Node | Dariyo",
      description:
        "Contrata ingenieros de software senior dedicados en Node.js, React 19, Next.js 16, FastAPI y React Native. Desarrollo a medida de aplicaciones web y móviles.",
      keywords: [
        "contratar desarrolladores next.js",
        "ingenieros react senior",
        "desarrolladores backend node.js",
        "servicios de ingenieria de software",
      ],
    },
    fr: {
      title: "Recruter Développeurs Dédiés Next.js, React & Node | Dariyo",
      description:
        "Recrutez des ingénieurs logiciels seniors dédiés en Node.js, React 19, Next.js 16, FastAPI et React Native. Développement web et mobile sur mesure.",
      keywords: [
        "recruter développeur next.js",
        "ingénieurs react senior",
        "développeurs backend node.js",
        "développement logiciel sur mesure",
      ],
    },
    de: {
      title: "Dedizierte Next.js, React & Node Entwickler Mieten | Dariyo",
      description:
        "Mieten Sie erfahrene Senior-Softwareentwickler in Node.js, React 19, Next.js 16, FastAPI und React Native für Vollzeit- und Teilzeitprojekte.",
      keywords: [
        "next.js entwickler mieten",
        "react softwareentwickler",
        "node.js backend entwickler",
        "individuelle softwareentwicklung",
      ],
    },
    ar: {
      title: "توظيف مطورين متخصصين في Next.js و React و Node | Dariyo",
      description:
        "وظف مهندسي برمجيات محترفين ومتفرغين في Node.js و React 19 و Next.js 16 و FastAPI و React Native. تطوير تطبيقات الويب والجوال المخصصة.",
      keywords: [
        "توظيف مطورين next.js",
        "مهندسين برمجيات react",
        "مطورين تطبيقات جوال",
        "خدمات تطوير البرمجيات المخصصة",
      ],
    },
  },

  about: {
    en: {
      title: "About Dariyo Solutions | 4,180 Hours of Battle-Tested Engineering",
      description:
        "Learn the story behind the Dariyo Commerce Platform: over 4,180 hours of verified engineering, powering retail and wholesale commerce, licensed directly to your brand.",
      keywords: [
        "dariyo solutions about",
        "verified engineering commerce platform",
        "ecommerce platform story",
        "source code software ownership",
      ],
    },
    hi: {
      title: "दिरयो सॉल्यूशंस के बारे में | 4,180 घंटे का प्रमाणित इंजीनियरिंग प्रयास",
      description:
        "दिरयो वाणिज्य प्लेटफॉर्म के पीछे की कहानी: 4,180 से अधिक घंटों का प्रमाणित सॉफ्टवेयर विकास, जो खुदरा और थोक व्यापार को शक्ति प्रदान करता है।",
      keywords: ["दिरयो सॉल्यूशंस", "सॉफ्टवेयर कंपनी", "ई-कॉमर्स प्लेटफॉर्म कहानी"],
    },
    gu: {
      title: "દરિયો સોલ્યુશન્સ વિશે | 4,180 કલાકનું સાબિત થયેલ એન્જિનિયરિંગ",
      description:
        "દરિયો વાણિજ્ય પ્લેટફોર્મની વાર્તા: 4,180 કરતાં વધુ કલાકોનું ચકાસાયેલ સોફ્ટવેર ડેવલપમેન્ટ, જે ભારતમાં રિટેલ અને જથ્થાબંધ વેપારને સફળ બનાવે છે.",
      keywords: ["દરિયો સોલ્યુશન્સ", "ઈ-કોમર્સ સોફ્ટવેર એન્જિનિયરિંગ"],
    },
    es: {
      title: "Acerca de Dariyo Solutions | 4,180 Horas de Ingeniería Verificada",
      description:
        "Conoce la historia detrás de la plataforma de comercio Dariyo: más de 4,180 horas de ingeniería de software probada en producción.",
      keywords: ["acerca de dariyo", "ingenieria software ecommerce"],
    },
    fr: {
      title: "À Propos de Dariyo Solutions | 4,180 Heures d'Ingénierie Éprouvée",
      description:
        "Découvrez l'histoire de la plateforme Dariyo : plus de 4,180 heures de développement éprouvé en production pour le commerce de détail et de gros.",
      keywords: ["a propos de dariyo", "expertise e-commerce"],
    },
    de: {
      title: "Über Dariyo Solutions | 4.180 Stunden Geprüftes Engineering",
      description:
        "Erfahren Sie die Geschichte hinter der Dariyo Commerce-Plattform: Über 4.180 Stunden bewährte Softwareentwicklung für den Einzel- und Großhandel.",
      keywords: ["uber dariyo", "software engineering ecommerce"],
    },
    ar: {
      title: "عن حلول داريو | أكثر من 4,180 ساعة من التطوير الهندسي المعتمد",
      description:
        "تعرف على قصة منصة داريو للتجارة الإلكترونية: أكثر من 4,180 ساعة من التطوير البرمجي الموثق لخدمة قطاع التجزئة والجملة.",
      keywords: ["عن داريو", "تطوير برمجيات التجارة الإلكترونية"],
    },
  },

  contact: {
    en: {
      title: "Contact & Enterprise Inquiry | Get a Custom Quote in 60 Seconds",
      description:
        "Speak directly with an enterprise software engineer. Inquire about source code licensing, platform customization, or hiring dedicated developers.",
      keywords: [
        "contact ecommerce platform",
        "request ecommerce quote",
        "hire software team contact",
        "enterprise commerce inquiry",
      ],
    },
    hi: {
      title: "संपर्क और पूछताछ | 60 सेकंड में कस्टम कोट प्राप्त करें",
      description:
        "सीधे हमारे सॉफ्टवेयर इंजीनियरों से बात करें। सोर्स कोड लाइसेंसिंग, प्लेटफॉर्म कस्टमाइजेशन, या समर्पित डेवलपर्स हायर करने के लिए संपर्क करें।",
      keywords: ["संपर्क करें", "कोटेशन प्राप्त करें", "डेवलपर्स हायर पूछताछ"],
    },
    gu: {
      title: "સંપર્ક અને પૂછપરછ | 60 સેકન્ડમાં કસ્ટમ ક્વોટ મેળવો",
      description:
        "અમારા સોફ્ટવેર એન્જિનિયરો સાથે સીધી વાત કરો. સોર્સ કોડ લાઇસન્સિંગ અથવા ડેવલપર્સ હાયર કરવા માટે પૂછપરછ કરો.",
      keywords: ["સંપર્ક કરો", "ક્વોટેશન મેળવો"],
    },
    es: {
      title: "Contacto y Consultas Empresariales | Cotización Personalizada",
      description:
        "Habla directamente con un ingeniero de software. Consulta sobre licencias de código fuente o contratación de desarrolladores dedicados.",
      keywords: ["contacto ecommerce", "cotizacion software ecommerce"],
    },
    fr: {
      title: "Contact & Demande Entreprise | Devis sur Mesure en 60 Secondes",
      description:
        "Échangez directement avec un ingénieur logiciel. Renseignez-vous sur les licences de code source ou le recrutement de développeurs.",
      keywords: ["contact e-commerce", "devis plateforme e-commerce"],
    },
    de: {
      title: "Kontakt & Projektanfrage | Individuelles Angebot Erhalten",
      description:
        "Sprechen Sie direkt mit unseren Software-Ingenieuren über Quellcode-Lizenzen, Plattformanpassungen oder dedizierte Entwicklerteams.",
      keywords: ["kontakt softwareentwicklung", "ecommerce angebot anfordern"],
    },
    ar: {
      title: "اتصل بنا واستفسر عن باقات الشركات | احصل على عرض سعر مخصص",
      description:
        "تحدث مباشرة مع مهندسينا. استفسر عن تراخيص كود المصدر أو تخصيص المنصة أو توظيف المطورين المخصصين لمشروعك.",
      keywords: ["اتصل بنا", "طلب عرض سعر برمجيات"],
    },
  },

  blog: {
    en: {
      title: "Engineering & Commerce Architecture Blog | Technical Insights",
      description:
        "Deep dives into high-performance e-commerce architecture: sub-second checkouts, Next.js 16 SSR, wholesale pricing engines, and Redis state sync.",
      keywords: [
        "ecommerce architecture blog",
        "next.js commerce performance",
        "high concurrency checkout engineering",
        "wholesale digital ordering case study",
      ],
    },
    hi: {
      title: "इंजीनियरिंग और कॉमर्स आर्किटेक्चर ब्लॉग | तकनीकी अंतर्दृष्टि",
      description:
        "उच्च प्रदर्शन वाले ई-कॉमर्स आर्किटेक्चर के गहन लेख: सब-सेकंड चेकआउट, नेक्स्ट जेएस 16, और थोक मूल्य निर्धारण इंजन।",
      keywords: ["इंजीनियरिंग ब्लॉग", "ई-कॉमर्स आर्किटेक्चर"],
    },
    gu: {
      title: "એન્જિનિયરિંગ અને કોમર્સ આર્કિટેક્ચર બ્લોગ | ટેકનિકલ લેખો",
      description:
        "હાઇ-પર્ફોર્મન્સ ઈ-કોમર્સ આર્કિટેક્ચર વિશે ટેકનિકલ લેખો: સબ-સેકન્ડ ચેકઆઉટ, નેક્સ્ટ જેએસ 16 અને હોલસેલ એન્જિન.",
      keywords: ["ટેકનિકલ બ્લોગ", "ઈ-કોમર્સ એન્જિનિયરિંગ"],
    },
    es: {
      title: "Blog de Arquitectura de Comercio e Ingeniería | Artículos Técnicos",
      description:
        "Artículos técnicos sobre arquitectura e-commerce de alto rendimiento: checkouts ultrarrápidos, Next.js 16 y optimización de bases de datos.",
      keywords: ["blog arquitectura ecommerce", "rendimiento nextjs"],
    },
    fr: {
      title: "Blog d'Architecture E-Commerce & Ingénierie | Dariyo",
      description:
        "Analyses approfondies sur l'architecture e-commerce haute performance : paiements ultra-rapides, Next.js 16 et gestion de charge élevée.",
      keywords: ["blog technique e-commerce", "performance nextjs"],
    },
    de: {
      title: "Technik-Blog zu E-Commerce-Architektur & Performance | Dariyo",
      description:
        "Fundierte Einblicke in hochperformante E-Commerce-Architektur: Subsekunden-Checkouts, Next.js 16 und skalierbare Backend-Systeme.",
      keywords: ["ecommerce architektur blog", "nextjs performance"],
    },
    ar: {
      title: "مدونة هندسة التجارة الإلكترونية والتقنيات السحابية | Dariyo",
      description:
        "مقالات تقنية متقدمة حول بنية التجارة الإلكترونية عالية الأداء: تسريع عمليات الدفع، هندسة Next.js 16، وبوابات التجارة بالجملة.",
      keywords: ["مدونة التجارة الإلكترونية", "هندسة البرمجيات"],
    },
  },
};

/**
 * Returns localized Metadata (title, description, keywords, OpenGraph, Twitter, canonical, hreflang)
 * matching the user's or crawler's selected language.
 */
export function getLocalizedMetadata(pageKey: SeoPageKey, lang: LanguageCode, path = ""): Metadata {
  const content = MULTILINGUAL_SEO_CONTENT[pageKey][lang] || MULTILINGUAL_SEO_CONTENT[pageKey].en;
  const canonicalUrl = getCanonicalUrl(path);
  const languageAlternates = getLanguageAlternates(path);

  return {
    title: {
      absolute: content.title,
    },
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`,
      alternateLocale: ["en_IN", "hi_IN", "gu_IN", "es_ES", "fr_FR", "de_DE", "ar_AE"],
      siteName: `${site.name} ${site.product}`,
      title: content.title,
      description: content.description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      site: "@dariyo_official",
      creator: "@dariyo_official",
      title: `${content.title} | ${site.name}`,
      description: content.description,
    },
  };
}
