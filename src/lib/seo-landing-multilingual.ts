import type { LanguageCode } from "@/lib/i18n/languages";

export interface LocalizedLandingMeta {
  title: string;
  description: string;
  keywords: string[];
}

export const ROLE_MULTILINGUAL_METADATA: Record<string, Record<LanguageCode, LocalizedLandingMeta>> = {
  "hire-react-developers": {
    en: {
      title: "Hire Dedicated React.js Developers | Pre-Vetted Senior Engineers | Dariyo",
      description: "Hire top 1% dedicated React.js developers in India. Senior engineers with React 19, TypeScript, and modern frontend architecture. Onboard in 48 hours with 1-week trial.",
      keywords: ["hire react developers", "dedicated react developers India", "hire react.js engineer", "react 19 developers for hire"],
    },
    hi: {
      title: "समर्पित रिएक्ट जेएस डेवलपर्स हायर करें | प्री-वेटेड इंजीनियर्स | Dariyo",
      description: "भारत में शीर्ष समर्पित React.js डेवलपर्स हायर करें। React 19, TypeScript और आधुनिक फ्रंटएंड आर्किटेक्चर। 48 घंटे में 1-सप्ताह के जोखिम-मुक्त परीक्षण के साथ ऑनबोर्ड करें।",
      keywords: ["रिएक्ट डेवलपर हायर करें", "समर्पित रिएक्ट इंजीनियर", "React.js प्रोग्रामर", "नेक्स्ट जेएस फ्रंटएंड"],
    },
    gu: {
      title: "ડેડિકેટેડ રિએક્ટ જેએસ ડેવલપર્સ હાયર કરો | અનુભવી એન્જિનિયર્સ | Dariyo",
      description: "ભારતમાં અનુભવી ડેડિકેટેડ React.js ડેવલપર્સ હાયર કરો. React 19, TypeScript અને મોર્ડન ફ્રન્ટએન્ડ આર્કિટેક્ચર. 1 અઠવાડિયાના જોખમ મુક્ત ટ્રાયલ સાથે 48 કલાકમાં શરૂ કરો.",
      keywords: ["રિએક્ટ ડેવલપર હાયર કરો", "ડેડિકેટેડ સોફ્ટવેર એન્જિનિયર", "રિએક્ટ પ્રોગ્રામર"],
    },
    es: {
      title: "Contratar Desarrolladores React.js Dedicados | Ingenieros Senior Verificados | Dariyo",
      description: "Contrate desarrolladores dedicados de React.js de alto nivel en la India. Expertos en React 19, TypeScript y arquitectura frontend moderna. Prueba de 1 semana sin riesgo.",
      keywords: ["contratar desarrolladores react", "desarrollador react dedicado", "programador react.js", "frontend react 19"],
    },
    fr: {
      title: "Recruter des Développeurs React.js Dédiés | Ingénieurs Senior | Dariyo",
      description: "Recrutez des développeurs dédiés React.js de premier ordre. Experts en React 19, TypeScript et architecture frontend moderne. Essai de 1 semaine sans risque.",
      keywords: ["recruter développeur react", "développeur react dédié", "programmeur react 19"],
    },
    de: {
      title: "Dedizierte React.js-Entwickler mieten | Geprüfte Senior-Entwickler | Dariyo",
      description: "Mieten Sie dedizierte React.js-Entwickler in Indien. Experten für React 19, TypeScript und moderne Frontend-Architektur. Onboarding in 48 Stunden mit 1-wöchiger risikofreier Testphase.",
      keywords: ["react entwickler mieten", "dedizierte react entwickler", "react 19 programmierer"],
    },
    ar: {
      title: "توظيف مطوري React.js مخصصين | مهندسون معتمدون | Dariyo",
      description: "وظف أفضل مطوري React.js المخصصين في الهند. خبراء في React 19 و TypeScript وهندسة الواجهات الحديثة. ابدأ في 48 ساعة مع فترة تجريبية لمدة أسبوع بدون مخاطر.",
      keywords: ["توظيف مطور ريأكت", "مطور react مخصص", "مبرمجين ريأكت"],
    },
  },
  "hire-nextjs-developers": {
    en: {
      title: "Hire Dedicated Next.js Developers | Next.js 16 App Router Specialists | Dariyo",
      description: "Hire dedicated Next.js developers for production App Router, Server Components, SSR, and eCommerce platforms. Top-tier 95+ Lighthouse scores guaranteed.",
      keywords: ["hire nextjs developers", "dedicated next.js engineers", "next.js 16 specialists India", "hire react server component developers"],
    },
    hi: {
      title: "समर्पित नेक्स्ट जेएस डेवलपर्स हायर करें | नेक्स्ट जेएस 16 स्पेशलिस्ट्स | Dariyo",
      description: "प्रोडक्शन ऐप राउटर, सर्वर कंपोनेंट्स, एसएसआर और ई-कॉमर्स प्लेटफॉर्म के लिए समर्पित Next.js डेवलपर्स हायर करें। 95+ लाइटहाउस स्कोर गारंटीकृत।",
      keywords: ["नेक्स्ट जेएस डेवलपर्स हायर करें", "समर्पित Next.js इंजीनियर", "नेक्स्ट जेएस 16 प्रोग्रामर"],
    },
    gu: {
      title: "ડેડિકેટેડ નેક્સ્ટ જેએસ ડેવલપર્સ હાયર કરો | નેક્સ્ટ જેએસ 16 સ્પેશિયાલિસ્ટ | Dariyo",
      description: "પ્રોડક્શન એપ રાઉટર, સર્વર કમ્પોનન્ટ્સ અને ઈ-કોમર્સ માટે ડેડિકેટેડ Next.js ડેવલપર્સ હાયર કરો. 95+ લાઇટહાઉસ સ્કોરની ખાતરી.",
      keywords: ["નેક્સ્ટ જેએસ ડેવલપર", "Next.js સોફ્ટવેર એન્જિનિયર", "નેક્સ્ટ જેએસ 16"],
    },
    es: {
      title: "Contratar Desarrolladores Next.js Dedicados | Especialistas en Next.js 16 | Dariyo",
      description: "Contrate desarrolladores Next.js dedicados para App Router, Server Components y plataformas e-commerce de alto rendimiento. Puntuación Lighthouse 95+ garantizada.",
      keywords: ["contratar desarrolladores nextjs", "ingenieros next.js dedicados", "especialistas next.js 16"],
    },
    fr: {
      title: "Recruter des Développeurs Next.js Dédiés | Spécialistes Next.js 16 | Dariyo",
      description: "Recrutez des développeurs Next.js dédiés pour App Router en production, Server Components, SSR et e-commerce. Score Lighthouse supérieur à 95 garanti.",
      keywords: ["recruter développeurs nextjs", "ingénieurs next.js dédiés", "spécialistes next.js 16"],
    },
    de: {
      title: "Dedizierte Next.js-Entwickler mieten | Next.js 16 Spezialisten | Dariyo",
      description: "Mieten Sie dedizierte Next.js-Entwickler für App Router, Server Components, SSR und E-Commerce-Plattformen. Überragende 95+ Lighthouse-Werte garantiert.",
      keywords: ["nextjs entwickler mieten", "dedizierte next.js entwickler", "next.js 16 experten"],
    },
    ar: {
      title: "توظيف مطوري Next.js مخصصين | خبراء Next.js 16 | Dariyo",
      description: "وظف مطوري Next.js المخصصين لتطبيقات App Router و Server Components ومتاجر التجارة الإلكترونية عالية الأداء. درجات Lighthouse تفوق 95 مضمونة.",
      keywords: ["توظيف مطور nextjs", "مطور next.js مخصص", "مبرمجي nextjs 16"],
    },
  },
  "hire-nodejs-developers": {
    en: {
      title: "Hire Dedicated Node.js Developers | High-Throughput Backend Engineers | Dariyo",
      description: "Hire senior Node.js backend developers in India. Experts in TypeScript, Express 5, Fastify, PostgreSQL, MongoDB, Redis, and event-driven microservices.",
      keywords: ["hire nodejs developers", "dedicated node.js backend engineer", "hire typescript backend developer", "express fastify developers India"],
    },
    hi: {
      title: "समर्पित नोड जेएस डेवलपर्स हायर करें | हाई-थ्रूपुट बैकएंड इंजीनियर्स | Dariyo",
      description: "भारत में सीनियर Node.js बैकएंड डेवलपर्स हायर करें। TypeScript, Express 5, Fastify, PostgreSQL, MongoDB और Redis में एक्सपर्ट। 48 घंटे में ऑनबोर्ड करें।",
      keywords: ["नोड जेएस डेवलपर्स हायर करें", "समर्पित नोड बैकएंड इंजीनियर", "टाइपस्क्रिप्ट एपीआई डेवलपर"],
    },
    gu: {
      title: "ડેડિકેટેડ નોડ જેએસ ડેવલપર્સ હાયર કરો | બેકએન્ડ એન્જિનિયર્સ | Dariyo",
      description: "ભારતમાં સિનિયર Node.js બેકએન્ડ ડેવલપર્સ હાયર કરો. TypeScript, Express 5, PostgreSQL, MongoDB અને Redis ના નિષ્ણાત. 48 કલાકમાં ઓનબોર્ડિંગ.",
      keywords: ["નોડ જેએસ ડેવલપર", "બેકએન્ડ એન્જિનિયર હાયર કરો", "ટાઇપસ્ક્રિપ્ટ ડેવલપર"],
    },
    es: {
      title: "Contratar Desarrolladores Node.js Dedicados | Ingenieros Backend de Alto Rendimiento | Dariyo",
      description: "Contrate desarrolladores backend Node.js senior en la India. Expertos en TypeScript, Express 5, Fastify, PostgreSQL, MongoDB, Redis y microservicios escalables.",
      keywords: ["contratar desarrolladores nodejs", "ingeniero backend node.js", "desarrollador typescript backend"],
    },
    fr: {
      title: "Recruter des Développeurs Node.js Dédiés | Ingénieurs Backend Haute Performance | Dariyo",
      description: "Recrutez des développeurs backend Node.js senior. Experts en TypeScript, Express 5, Fastify, PostgreSQL, MongoDB, Redis et architectures microservices.",
      keywords: ["recruter développeurs nodejs", "ingénieur backend node.js", "développeur typescript backend"],
    },
    de: {
      title: "Dedizierte Node.js-Entwickler mieten | Skalierbare Backend-Ingenieure | Dariyo",
      description: "Mieten Sie Senior Node.js-Backend-Entwickler in Indien. Experten für TypeScript, Express 5, Fastify, PostgreSQL, MongoDB, Redis und ereignisgesteuerte Microservices.",
      keywords: ["nodejs entwickler mieten", "dedizierte node.js backend entwickler", "typescript backend entwickler"],
    },
    ar: {
      title: "توظيف مطوري Node.js مخصصين | مهندسو خوادم وبنى خلفية عالية الأداء | Dariyo",
      description: "وظف كبار مطوري الواجهات الخلفية لـ Node.js في الهند. خبراء في TypeScript و Express 5 و Fastify و PostgreSQL و MongoDB و Redis والخدمات المصغرة.",
      keywords: ["توظيف مطور nodejs", "مهندس خلفي node.js", "مبرمج typescript"],
    },
  },
  "hire-fastapi-developers": {
    en: {
      title: "Hire Dedicated Python FastAPI Developers | AI & Async Microservices | Dariyo",
      description: "Hire dedicated FastAPI and Python engineers. Specialists in asynchronous APIs, AI/LLM integrations, vector databases, Pydantic validation, and Celery workers.",
      keywords: ["hire fastapi developers", "dedicated python developer India", "hire async python engineers", "ai microservice developers"],
    },
    hi: {
      title: "समर्पित पायथन फास्टएपीआई डेवलपर्स हायर करें | AI और एसिंक्रोनस माइक्रोसर्विसेज | Dariyo",
      description: "समर्पित FastAPI और Python इंजीनियर्स हायर करें। एसिंक्रोनस APIs, AI/LLM इंटीग्रेशन, वेक्टर डेटाबेस और Celery बैकग्राउंड वर्कर्स के विशेषज्ञ।",
      keywords: ["पायथन फास्टएपीआई डेवलपर", "समर्पित पायथन इंजीनियर", "AI माइक्रोसर्विसेज डेवलपर्स"],
    },
    gu: {
      title: "ડેડિકેટેડ પાયથોન ફાસ્ટએપીઆઈ ડેવલપર્સ હાયર કરો | AI અને માઇક્રોસર્વિસિસ | Dariyo",
      description: "ડેડિકેટેડ FastAPI અને Python એન્જિનિયર્સ હાયર કરો. અસિંક્રોનસ APIs, AI/LLM ઇન્ટિગ્રેશન, વેક્ટર ડેટાબેઝ અને Celery વર્કર્સના સ્પેશિયાલિસ્ટ.",
      keywords: ["પાયથોન ફાસ્ટએપીઆઈ ડેવલપર", "AI ડેવલપર હાયર કરો", "પાયથોન પ્રોગ્રામર"],
    },
    es: {
      title: "Contratar Desarrolladores Python FastAPI | Microservicios Asíncronos e IA | Dariyo",
      description: "Contrate ingenieros dedicados de FastAPI y Python. Especialistas en APIs asíncronas, integraciones de IA/LLM, bases de datos vectoriales y colas Celery.",
      keywords: ["contratar desarrolladores fastapi", "desarrollador python dedicado", "ingenieros python asincrono"],
    },
    fr: {
      title: "Recruter des Développeurs Python FastAPI Dédiés | Microservices Asynchrones & IA | Dariyo",
      description: "Recrutez des ingénieurs dédiés FastAPI et Python. Spécialistes des API asynchrones, intégrations IA/LLM, bases vectorielles et workers Celery.",
      keywords: ["recruter développeurs fastapi", "développeur python dédié", "microservices ia python"],
    },
    de: {
      title: "Dedizierte Python FastAPI-Entwickler mieten | KI & Asynchrone Microservices | Dariyo",
      description: "Mieten Sie dedizierte FastAPI- und Python-Ingenieure. Spezialisten für asynchrone APIs, KI/LLM-Integrationen, Vektordatenbanken und Celery-Worker.",
      keywords: ["fastapi entwickler mieten", "dedizierte python entwickler", "ki microservice entwickler"],
    },
    ar: {
      title: "توظيف مطوري بايثون FastAPI مخصصين | خدمات مصغرة غير متزامنة وذكاء اصطناعي | Dariyo",
      description: "وظف مهندسي FastAPI و Python مخصصين. متخصصون في واجهات برمجة التطبيقات غير المتزامنة وتكاملات الذكاء الاصطناعي وقواعد البيانات الموجهة.",
      keywords: ["توظيف مطور fastapi", "مطور بايثون مخصص", "مهندس ذكاء اصطناعي"],
    },
  },
  "hire-react-native-developers": {
    en: {
      title: "Hire Dedicated React Native Developers | iOS & Android Mobile Apps | Dariyo",
      description: "Hire dedicated React Native and Expo mobile app developers. Build 60fps cross-platform apps for iOS and Android with offline sync, biometrics, and push notifications.",
      keywords: ["hire react native developers", "dedicated mobile app developer India", "expo mobile app developers", "cross platform ios android engineers"],
    },
    hi: {
      title: "समर्पित रिएक्ट नेटिव डेवलपर्स हायर करें | iOS और एंड्रॉइड मोबाइल ऐप्स | Dariyo",
      description: "समर्पित React Native और Expo मोबाइल ऐप डेवलपर्स हायर करें। ऑफलाइन सिंक, बायोमेट्रिक्स और पुश नोटिफिकेशन के साथ iOS और Android के लिए 60fps ऐप्स बनाएं।",
      keywords: ["रिएक्ट नेटिव डेवलपर", "मोबाइल ऐप डेवलपर हायर करें", "iOS एंड्रॉइड ऐप्स"],
    },
    gu: {
      title: "ડેડિકેટેડ રિએક્ટ નેટિવ ડેવલપર્સ હાયર કરો | iOS અને એન્ડ્રોઇડ એપ્સ | Dariyo",
      description: "ડેડિકેટેડ React Native અને Expo મોબાઈલ એપ ડેવલપર્સ હાયર કરો. ઑફલાઇન સિંક, બાયોમેટ્રિક્સ અને પુશ નોટિફિકેશન સાથે 60fps એપ્લિકેશન્સ બનાવો.",
      keywords: ["રિએક્ટ નેટિવ ડેવલપર", "મોબાઇલ એપ ડેવલપર", "iOS એન્ડ્રોઇડ ડેવલપર"],
    },
    es: {
      title: "Contratar Desarrolladores React Native Dedicados | Apps Móviles iOS y Android | Dariyo",
      description: "Contrate desarrolladores móviles dedicados de React Native y Expo. Cree aplicaciones multiplataforma a 60 fps para iOS y Android con sincronización offline y biometría.",
      keywords: ["contratar desarrolladores react native", "desarrollador apps moviles", "ingenieros expo ios android"],
    },
    fr: {
      title: "Recruter des Développeurs React Native Dédiés | Applications Mobiles iOS & Android | Dariyo",
      description: "Recrutez des développeurs mobiles dédiés React Native et Expo. Créez des applications multiplateformes à 60 ips pour iOS et Android avec synchronisation hors ligne.",
      keywords: ["recruter développeurs react native", "développeur mobile ios android", "développeur expo mobile"],
    },
    de: {
      title: "Dedizierte React Native-Entwickler mieten | Mobile Apps für iOS & Android | Dariyo",
      description: "Mieten Sie dedizierte React Native- und Expo-Mobile-App-Entwickler. Entwickeln Sie native 60fps plattformübergreifende Apps für iOS und Android mit Offline-Sync.",
      keywords: ["react native entwickler mieten", "mobile app entwickler indien", "cross platform entwickler"],
    },
    ar: {
      title: "توظيف مطوري React Native مخصصين | تطبيقات الهواتف الذكية لنظامي iOS و Android | Dariyo",
      description: "وظف مطوري تطبيقات React Native و Expo مخصصين. ابنِ تطبيقات متعددة المنصات بسرعة 60 إطاراً في الثانية لأنظمة iOS و Android مع المزامنة بدون إنترنت.",
      keywords: ["توظيف مطور react native", "مطور تطبيقات هواتف", "مبرمج تطبيقات جوال"],
    },
  },
  "hire-fullstack-developers": {
    en: {
      title: "Hire Full-Stack TypeScript Leads | Senior Web & Cloud Architects | Dariyo",
      description: "Hire senior full-stack TypeScript developers and architects in India. Experts in Next.js, Node.js, PostgreSQL, Docker, AWS, and complete end-to-end system delivery.",
      keywords: ["hire fullstack developers", "dedicated full-stack typescript engineer", "hire software architect India", "nextjs nodejs full stack developer"],
    },
    hi: {
      title: "फुल-स्टैक टाइपस्क्रिप्ट लीड्स हायर करें | सीनियर वेब और क्लाउड आर्किटेक्ट्स | Dariyo",
      description: "भारत में सीनियर फुल-स्टैक टाइपस्क्रिप्ट डेवलपर्स और आर्किटेक्ट्स हायर करें। Next.js, Node.js, PostgreSQL, Docker, AWS और एंड-टू-एंड सिस्टम डिलीवरी में विशेषज्ञ।",
      keywords: ["फुलस्टैक डेवलपर हायर करें", "टाइपस्क्रिप्ट आर्किटेक्ट", "नेक्स्ट जेएस नोड जेएस डेवलपर"],
    },
    gu: {
      title: "ફુલ-સ્ટેક ટાઇપસ્ક્રિપ્ટ લીડ્સ હાયર કરો | સિનિયર સોફ્ટવેર આર્કિટેક્ટ્સ | Dariyo",
      description: "ભારતમાં સિનિયર ફુલ-સ્ટેક TypeScript ડેવલપર્સ અને આર્કિટેક્ટ્સ હાયર કરો. Next.js, Node.js, PostgreSQL, Docker, AWS અને એન્ડ-ટુ-એન્ડ સિસ્ટમ ડિલિવરીના નિષ્ણાત.",
      keywords: ["ફુલસ્ટેક ડેવલપર", "સોફ્ટવેર આર્કિટેક્ટ હાયર કરો", "ટાઇપસ્ક્રિપ્ટ લીડ"],
    },
    es: {
      title: "Contratar Líderes Full-Stack TypeScript | Arquitectos Web y Cloud Senior | Dariyo",
      description: "Contrate desarrolladores y arquitectos full-stack TypeScript senior en la India. Expertos en Next.js, Node.js, PostgreSQL, Docker, AWS y entrega integral de sistemas.",
      keywords: ["contratar desarrolladores fullstack", "arquitecto software typescript", "desarrollador nextjs nodejs"],
    },
    fr: {
      title: "Recruter des Leads Full-Stack TypeScript | Architectes Web et Cloud Senior | Dariyo",
      description: "Recrutez des développeurs et architectes full-stack TypeScript senior. Experts en Next.js, Node.js, PostgreSQL, Docker, AWS et déploiement de bout en bout.",
      keywords: ["recruter développeurs fullstack", "architecte typescript senior", "lead developer nextjs nodejs"],
    },
    de: {
      title: "Full-Stack TypeScript Leads mieten | Senior Web- & Cloud-Architekten | Dariyo",
      description: "Mieten Sie Senior Full-Stack TypeScript-Entwickler und Architekten in Indien. Experten für Next.js, Node.js, PostgreSQL, Docker, AWS und End-to-End-Systembereitstellung.",
      keywords: ["fullstack entwickler mieten", "typescript software architekt", "lead entwickler indien"],
    },
    ar: {
      title: "توظيف قادة برمجيات Full-Stack TypeScript | مهندسو بنية سحابية ومواقع ويب | Dariyo",
      description: "وظف كبار مطوري ومهندسي Full-Stack TypeScript في الهند. خبراء في Next.js و Node.js و PostgreSQL و Docker و AWS وتسليم النظم المتكاملة.",
      keywords: ["توظيف مطور fullstack", "مهندس معماري برمجيات", "مطور typescript"],
    },
  },
};

export const SOLUTION_MULTILINGUAL_METADATA: Record<string, Record<LanguageCode, LocalizedLandingMeta>> = {
  "b2b-wholesale-ecommerce-platform": {
    en: {
      title: "B2B Wholesale eCommerce Platform Source Code | Turnkey License | Dariyo",
      description: "Launch your B2B wholesale commerce portal with full source code ownership. Tiered bulk pricing, GST validation, credit terms, and 0% revenue commissions.",
      keywords: ["b2b wholesale ecommerce platform", "wholesale portal source code", "b2b ecommerce software license", "tiered volume pricing ecommerce"],
    },
    hi: {
      title: "B2B थोक ई-कॉमर्स प्लेटफॉर्म सोर्स कोड | स्थायी टर्नकी लाइसेंस | Dariyo",
      description: "पूर्ण सोर्स कोड स्वामित्व के साथ अपना B2B थोक कॉमर्स पोर्टल लॉन्च करें। टियर वाली थोक कीमतें, GST सत्यापन, क्रेडिट शर्तें और 0% राजस्व कमीशन।",
      keywords: ["B2B थोक ई-कॉमर्स प्लेटफॉर्म", "थोक पोर्टल सोर्स कोड", "B2B ई-कॉमर्स सॉफ्टवेयर लाइसेंस"],
    },
    gu: {
      title: "B2B જથ્થાબંધ ઈ-કોમર્સ પ્લેટફોર્મ સોર્સ કોડ | કાયમી લાઇસન્સ | Dariyo",
      description: "સંપૂર્ણ સોર્સ કોડ માલિકી સાથે તમારું B2B જથ્થાબંધ કોમર્સ પોર્ટલ શરૂ કરો. વોલ્યુમ આધારિત કિંમતો, GST ચકાસણી, ક્રેડિટ શરતો અને 0% કમિશન.",
      keywords: ["B2B જથ્થાબંધ ઈ-કોમર્સ", "જથ્થાબંધ પોર્ટલ સોર્સ કોડ", "B2B સોફ્ટવેર લાઇસન્સ"],
    },
    es: {
      title: "Plataforma de Comercio Mayorista B2B Código Fuente | Licencia Llave en Mano | Dariyo",
      description: "Lance su portal de comercio mayorista B2B con propiedad total del código fuente. Precios por volumen escalonados, validación de impuestos y 0% de comisión.",
      keywords: ["plataforma comercio mayorista b2b", "codigo fuente portal b2b", "licencia software ecommerce b2b"],
    },
    fr: {
      title: "Plateforme E-Commerce B2B de Vente en Gros Code Source | Licence Complète | Dariyo",
      description: "Lancez votre portail de vente en gros B2B avec pleine propriété du code source. Tarification par paliers, validation fiscale et 0% de commission sur les ventes.",
      keywords: ["plateforme ecommerce b2b gros", "code source portail b2b", "licence logicielle b2b"],
    },
    de: {
      title: "B2B Großhandel E-Commerce-Plattform Quellcode | Vollständige Lizenz | Dariyo",
      description: "Starten Sie Ihr B2B-Großhandelsportal mit vollständigem Quellcode-Eigentum. Gestaffelte Mengenpreise, Steuerprüfung, Zahlungsziele und 0% Umsatzprovision.",
      keywords: ["b2b großhandel ecommerce plattform", "großhandelsportal quellcode", "b2b ecommerce softwarelizenz"],
    },
    ar: {
      title: "كود منصة التجارة الإلكترونية بالجملة B2B | ترخيص برمجي دائم | Dariyo",
      description: "أطلق بوابة التجارة الإلكترونية بالجملة B2B مع الملكية الكاملة للكود المصدري. أسعار متدرجة حسب الكمية، والتحقق الضريبي، وعمولة مبيعات 0%.",
      keywords: ["منصة تجارة الكترونية بالجملة b2b", "كود بوابة التجارة بالجملة", "ترخيص برنامج b2b"],
    },
  },
  "nextjs-ecommerce-clone-script": {
    en: {
      title: "Next.js 16 eCommerce Clone Script | Full Source Code License | Dariyo",
      description: "Buy the complete Next.js 16 and React 19 eCommerce platform source code. Turnkey storefront, operator admin panel, backend API, 0% GMV cut, self-hosted.",
      keywords: ["nextjs ecommerce clone script", "buy ecommerce source code", "next.js 16 online store clone", "react operator admin console"],
    },
    hi: {
      title: "नेक्स्ट जेएस 16 ई-कॉमर्स क्लोन स्क्रिप्ट | पूर्ण सोर्स कोड लाइसेंस | Dariyo",
      description: "पूर्ण Next.js 16 और React 19 ई-कॉमर्स प्लेटफॉर्म सोर्स कोड खरीदें। टर्नकी स्टोरफ्रंट, ऑपरेटर एडमिन पैनल, बैकएंड एपीआई, 0% कमीशन, सेल्फ-होस्टेड।",
      keywords: ["नेक्स्ट जेएस ई-कॉमर्स क्लोन स्क्रिप्ट", "ई-कॉमर्स सोर्स कोड खरीदें", "ऑनलाइन स्टोर क्लोन"],
    },
    gu: {
      title: "નેક્સ્ટ જેએસ 16 ઈ-કોમર્સ ક્લોન સ્ક્રિપ્ટ | સંપૂર્ણ સોર્સ કોડ લાઇસન્સ | Dariyo",
      description: "સંપૂર્ણ Next.js 16 અને React 19 ઈ-કોમર્સ પ્લેટફોર્મ સોર્સ કોડ ખરીદો. ટર્નકી સ્ટોરફ્રન્ટ, ઓપરેટર એડમિન પેનલ, બેકએન્ડ API, 0% કમિશન.",
      keywords: ["નેક્સ્ટ જેએસ ઈ-કોમર્સ ક્લોન", "ઈ-કોમર્સ સોર્સ કોડ ખરીદો", "ઓનલાઇન સ્ટોર સ્ક્રિપ્ટ"],
    },
    es: {
      title: "Script Clon de E-Commerce Next.js 16 | Licencia de Código Fuente Completo | Dariyo",
      description: "Compre el código fuente completo de la plataforma de comercio electrónico Next.js 16 y React 19. Tienda llave en mano, panel de administración y 0% de comisión.",
      keywords: ["script clon ecommerce nextjs", "comprar codigo fuente ecommerce", "tienda online clon nextjs 16"],
    },
    fr: {
      title: "Script Clone E-Commerce Next.js 16 | Licence de Code Source Complète | Dariyo",
      description: "Achetez le code source complet de la plateforme e-commerce Next.js 16 et React 19. Boutique clé en main, console d'administration et 0% de commission.",
      keywords: ["script clone ecommerce nextjs", "acheter code source ecommerce", "boutique en ligne clone nextjs 16"],
    },
    de: {
      title: "Next.js 16 E-Commerce-Klon-Skript | Vollständige Quellcode-Lizenz | Dariyo",
      description: "Kaufen Sie den vollständigen Next.js 16 und React 19 E-Commerce-Plattform-Quellcode. Turnkey-Storefront, Betreiber-Admin-Panel, Backend-API, 0% Provision.",
      keywords: ["nextjs ecommerce klon skript", "ecommerce quellcode kaufen", "online shop klon nextjs 16"],
    },
    ar: {
      title: "سكريبت استنساخ التجارة الإلكترونية Next.js 16 | ترخيص الكود المصدري الكامل | Dariyo",
      description: "اشترِ الكود المصدري الكامل لمنصة التجارة الإلكترونية Next.js 16 و React 19. متجر جاهز للتسليم، لوحة تحكم إدارية، واجهة برمجة خلفية، وعمولة 0%.",
      keywords: ["سكريبت استنساخ متجر الكتروني", "شراء كود مصدر متجر الكتروني", "استنساخ متجر nextjs 16"],
    },
  },
  "self-hosted-ecommerce-alternative": {
    en: {
      title: "Self-Hosted Shopify & Medusa Alternative | Zero Commission Platform | Dariyo",
      description: "A complete self-hosted alternative to Shopify, MedusaJS, and Magento. Permanent source code license, 0% GMV cut, hosted in your cloud accounts.",
      keywords: ["self hosted shopify alternative", "medusajs alternative with admin panel", "zero commission ecommerce platform", "open source ecommerce alternative"],
    },
    hi: {
      title: "सेल्फ-होस्टेड शॉपिफ़ाई और मेडुसा विकल्प | 0% कमीशन प्लेटफॉर्म | Dariyo",
      description: "Shopify, MedusaJS और Magento का संपूर्ण सेल्फ-होस्टेड विकल्प। स्थायी सोर्स कोड लाइसेंस, 0% बिक्री कमीशन, आपके अपने क्लाउड में होस्टेड।",
      keywords: ["शॉपिफ़ाई विकल्प सेल्फ होस्टेड", "मेडुसा विकल्प एडमिन पैनल", "0% कमीशन ई-कॉमर्स"],
    },
    gu: {
      title: "સેલ્ફ-હોસ્ટેડ શોપિફાય અને મેડુસા વિકલ્પ | 0% કમિશન પ્લેટફોર્મ | Dariyo",
      description: "Shopify, MedusaJS અને Magento નો સંપૂર્ણ સેલ્ફ-હોસ્ટેડ વિકલ્પ. કાયમી સોર્સ કોડ લાઇસન્સ, 0% કમિશન, તમારા પોતાના ક્લાઉડમાં હોસ્ટેડ.",
      keywords: ["શોપિફાય વિકલ્પ", "મેડુસા વિકલ્પ", "ઝીરો કમિશન ઈ-કોમર્સ પ્લેટફોર્મ"],
    },
    es: {
      title: "Alternativa Autoalojada a Shopify y Medusa | Plataforma sin Comisiones | Dariyo",
      description: "Una alternativa completa autoalojada a Shopify, MedusaJS y Magento. Licencia de código fuente permanente, 0% de comisión por ventas y alojado en su propia nube.",
      keywords: ["alternativa autoalojada shopify", "alternativa medusajs con panel", "plataforma ecommerce sin comisiones"],
    },
    fr: {
      title: "Alternative Auto-Hébergée à Shopify et Medusa | Plateforme 0% Commission | Dariyo",
      description: "Une alternative auto-hébergée complète à Shopify, MedusaJS et Magento. Licence de code source permanente, 0% de commission sur vos ventes, hébergée sur vos serveurs.",
      keywords: ["alternative auto hébergée shopify", "alternative medusajs avec admin", "plateforme ecommerce sans commission"],
    },
    de: {
      title: "Selbst gehostete Shopify & Medusa Alternative | 0% Provisions-Plattform | Dariyo",
      description: "Eine vollwertige, selbst gehostete Alternative zu Shopify, MedusaJS und Magento. Dauerhafte Quellcode-Lizenz, 0% Provisionsabgabe, in Ihrer eigenen Cloud gehostet.",
      keywords: ["selbst gehostete shopify alternative", "medusajs alternative mit admin panel", "provisionsfreie ecommerce plattform"],
    },
    ar: {
      title: "بديل شوبيفاي وميدوسا ذاتي الاستضافة | منصة بعمولة 0% | Dariyo",
      description: "بديل متكامل ذاتي الاستضافة لـ Shopify و MedusaJS و Magento. ترخيص كود مصدري دائم، عمولة 0% على المبيعات، ومستضاف في حساباتك السحابية الخاصة.",
      keywords: ["بديل شوبيفاي ذاتي الاستضافة", "بديل ميدوسا مع لوحة تحكم", "منصة تجارة الكترونية بدون عمولة"],
    },
  },
};

/**
 * Returns localized metadata for developer staffing role landing pages.
 */
export function getRoleLocalizedMetadata(roleSlug: string, lang: LanguageCode): LocalizedLandingMeta {
  const roleRecord = ROLE_MULTILINGUAL_METADATA[roleSlug];
  if (roleRecord) {
    return roleRecord[lang] || roleRecord.en;
  }
  return {
    title: "Hire Dedicated Developers | Dariyo",
    description: "Hire pre-vetted senior software engineers in India.",
    keywords: ["hire developers", "dedicated software engineers"],
  };
}

/**
 * Returns localized metadata for commerce platform solution landing pages.
 */
export function getSolutionLocalizedMetadata(solutionSlug: string, lang: LanguageCode): LocalizedLandingMeta {
  const solutionRecord = SOLUTION_MULTILINGUAL_METADATA[solutionSlug];
  if (solutionRecord) {
    return solutionRecord[lang] || solutionRecord.en;
  }
  return {
    title: "Commerce Platform Solutions & Source Code | Dariyo",
    description: "Launch your own online store and wholesale portal with full source code ownership.",
    keywords: ["commerce platform", "source code license"],
  };
}
