import type { TranslationDictionary } from "./types";
import { en } from "./en";

export const es: TranslationDictionary = {
  ...en,
  nav: {
    ...en.nav,
    features: "Características",
    services: "Servicios",
    pricing: "Precios de Clonación",
    blog: "Blog",
    about: "Nosotros",
    contact: "Contacto",
    platform: "Plataforma",
    liveDemo: "Probar Demo en Vivo",
    buildQuote: "Crear Presupuesto",
    callNow: "Llámanos",
    chatWhatsApp: "WhatsApp",
    platformLinks: {
      demo: { label: "Demo en Vivo", blurb: "Pruebe la tienda y el panel de administración" },
      apps: { label: "Tres Aplicaciones Conectadas", blurb: "Tienda, panel de administración y backend integrados" },
      retailWholesale: { label: "Minorista y Mayorista", blurb: "Compradores y clientes B2B en un solo catálogo" },
      adminConsole: { label: "Consola de Administración", blurb: "Pedidos, inventario, facturas y cotizaciones B2B" },
      immersive: { label: "3D y Medios Enriquecidos", blurb: "Vistas de producto en 3D y galerías de video" },
      technology: { label: "Tecnología", blurb: "Una arquitectura moderna construida en TypeScript" },
      howItWorks: { label: "Cómo Funciona", blurb: "Del inicio a la primera venta en cuatro pasos" },
      faqs: { label: "Preguntas Frecuentes", blurb: "Licencias, alojamiento, plazos y costos" },
    },
  },

  hero: {
    ...en.hero,
    badgeTurnkey: "Licencia de Plataforma Llave en Mano",
    badgeProven: "Comprobado en Vivo en dariyo.in",
    titlePart1: "El motor de comercio completo.",
    titleItalic: "Construido, probado, listo para clonar.",
    subtitle:
      "Construimos, probamos y escalamos la plataforma de comercio detrás de dariyo.in — y personalizaremos, adaptaremos con su marca y desplegaremos un clon dedicado para su empresa.",
    ctaQuote: "Construya su Presupuesto",
    ctaDemo: "Explorar Tienda en Vivo",
    licenseText: "Licencia de código permanente · 0% comisión de ventas · Desplegado en su nube",
    readyToDispatch: "Listo para despachar",
    inYourCart: "En su carrito",
    pillarBrand: "Su Marca",
    pillarBrandDesc: "Su logotipo, colores, tipografía y dominio personalizado",
    pillarProducts: "Sus Productos",
    pillarProductsDesc: "Cargado con sus paquetes, categorías y precios",
    pillarTurnkey: "Clon Llave en Mano",
    pillarTurnkeyDesc: "Tienda online + B2B Mayorista + Consola de administración",
    pillarCommission: "0% Comisión",
    pillarCommissionDesc: "Licencia de código permanente en su propia nube",
  },

  proof: {
    ariaLabel: "Estadísticas de la plataforma",
    stats: {
      apps: "aplicaciones conectadas, construidas como una sola",
      hours: "horas de ingeniería dedicada detrás del motor",
      commission: "comisión sobre sus ventas, para siempre",
      fixes: "días de correcciones y soporte gratuito post-lanzamiento",
    },
  },

  threeApps: {
    eyebrow: "Tres Aplicaciones Conectadas",
    titlePart1: "Un sistema completo.",
    titleItalic: "Diseñado para trabajar como uno solo.",
    subtitle:
      "Tienda para compradores, consola para su equipo y backend en la nube: tres aplicaciones independientes diseñadas para funcionar en perfecta sincronía.",
    storefront: {
      name: "Tienda del Cliente",
      blurb: "Una experiencia de compra ultrarrápida construida con Next.js 16, React 19 y Tailwind CSS.",
      points: [
        { title: "Múltiples Presentaciones", body: "Gramos, kilogramos, cajas o paquetes, cada uno con su precio en vivo." },
        { title: "Checkout Optimizado", body: "Tarjetas, billeteras digitales, transferencias y pago contra entrega." },
        { title: "Cuentas de Cliente", body: "Inicio de sesión seguro, seguimiento en vivo y facturas oficiales." },
        { title: "Instalable como App", body: "Los clientes pueden añadir la tienda a la pantalla de inicio de su móvil." },
      ],
      mockLabel: "Carrito",
      mockStatus: "Envío disponible en su zona",
    },
    adminPanel: {
      name: "Consola de Administración",
      blurb: "Todo lo que su equipo necesita gestionar a diario: productos, existencias, pedidos y envíos.",
      points: [
        { title: "Productos e Inventario", body: "Conteo centralizado por presentación con alertas de stock bajo." },
        { title: "Logística Integrada", body: "Comparación de tarifas de mensajería, etiquetas automáticas y recolecciones." },
        { title: "Operaciones Mayoristas", body: "Cuentas B2B, presupuestos escalonados, facturas proforma y negociación." },
        { title: "Impuestos y Facturación", body: "Generación automática de facturas legales, notas de crédito y reportes." },
      ],
      mockLabel: "Despacho",
      mockStatus: "Listo para envío",
      mockTitle: "Recogida de Paquetería",
      mockDetail: "Programada para hoy · 14 paquetes",
    },
    backend: {
      name: "Motor de API Comercial",
      blurb: "La única fuente de verdad para precios, inventario, pagos y cumplimiento de pedidos.",
      points: [
        { title: "Cálculos en Servidor", body: "Cada precio, descuento e impuesto se calcula estrictamente en el servidor." },
        { title: "Sincronización en Tiempo Real", body: "Expiración de reservas de stock y actualizaciones WebSocket en vivo." },
        { title: "Seguridad Robusta", body: "Webhooks verificados con HMAC, claves cifradas con AES-256 y límite de tasa." },
        { title: "Independencia de Nube", body: "Se ejecuta en contenedores Docker en su propia cuenta de AWS o servidor." },
      ],
      mockLabel: "Motor de API",
      mockStatus: "Activo · 99.99% de disponibilidad",
      mockTitle: "Microservicios",
      mockDetail: "Caché Redis activa · Límites de tasa normales",
    },
  },

  platformBenefits: {
    eyebrow: "Capacidades de la Plataforma",
    titlePart1: "Preparado para alto volumen y",
    titleItalic: "comercio sin fricciones.",
    subtitle:
      "Desde variantes de productos hasta el despacho en almacén, cada funcionalidad ha sido probada bajo volumen de transacciones reales en dariyo.in.",
    cards: {
      packSizes: {
        title: "Múltiples Presentaciones y SKUs",
        body: "Venda muestras individuales o sacos industriales al por mayor con códigos de barras, precios y pesos independientes.",
        footnote: "Un inventario central dinámico se actualiza en todas las variantes.",
      },
      checkout: {
        title: "Checkout de Alta Velocidad",
        body: "Experiencia sin fricción con pago en 1 clic, direcciones guardadas y soporte para envíos express.",
        footnote: "Cero redirecciones a terceros; el pago se completa en su propio dominio.",
      },
      shipping: {
        title: "Logística Automatizada y Rastreo",
        body: "Reserva automática con transportistas, webhooks de rastreo en vivo y notificaciones de estado por WhatsApp/SMS.",
        footnote: "Integración directa con los principales operadores logísticos y almacenes.",
      },
      permissions: {
        title: "Acceso Basado en Roles",
        body: "Permisos detallados para personal de almacén, agentes de soporte, contadores y administradores.",
        footnote: "Control estricto en cada punto de acceso a la API con auditoría completa.",
      },
      speed: {
        title: "Velocidad de Carga Subsegundo",
        body: "Construido sobre Next.js 16 con generación estática, almacenamiento en caché perimetral y optimización de medios.",
        footnote: "Puntuación de 95+ en Google Lighthouse Mobile y Core Web Vitals.",
      },
      trade: {
        title: "Portal Mayorista B2B Integrado",
        body: "Precios por volumen, cotizaciones personalizadas, reserva de stock y cálculo de flete para distribuidores.",
        footnote: "Opere su canal minorista directo al consumidor y mayorista desde el mismo panel.",
      },
    },
  },

  retailWholesale: {
    eyebrow: "Dos Canales, Un Inventario",
    titlePart1: "Venta directa y comercio mayorista.",
    titleItalic: "El mismo catálogo.",
    subtitle:
      "No necesita dos plataformas diferentes. Su tienda Dariyo atiende a compradores minoristas diarios y a empresas compradoras con flujos de trabajo especializados.",
    retailBadge: "Canal Minorista (B2C)",
    retailTitle: "Experiencia de compra fluida y rápida",
    retailDesc:
      "Optimizada para la conversión móvil, compras por impulso y fidelidad de marca con un proceso de pago en segundos.",
    retailFeatures: [
      "Variantes por peso y volumen con precios en vivo",
      "Soporte para cupones, descuentos escalonados y ofertas flash",
      "Seguimiento de pedidos en tiempo real por SMS y correo",
      "Reseñas verificadas de clientes y preguntas y respuestas",
    ],
    wholesaleBadge: "Canal Mayorista (B2B)",
    wholesaleTitle: "Flujos de cotización y pedidos a escala",
    wholesaleDesc:
      "Proporcione a compradores comerciales un portal profesional con listas de precios personalizadas, crédito y pedidos masivos.",
    wholesaleFeatures: [
      "Precios por volumen escalonados por grupo de clientes",
      "Flujo de trabajo de cotizaciones con aprobación y negociación",
      "Generación instantánea de facturas proforma y órdenes de compra",
      "Límites de crédito, plazos de pago y transferencias bancarias",
    ],
  },

  adminShowcase: {
    eyebrow: "Control Total",
    titlePart1: "Una consola de administración",
    titleItalic: "construida para operaciones reales.",
    subtitle:
      "Diseñada para los equipos que operan la tienda día a día: desde el empaque de pedidos hasta la conciliación fiscal.",
    tabs: {
      orders: "Pedidos y Despacho",
      inventory: "Inventario y Variantes",
      shipping: "Envíos y Transportistas",
      reports: "Reportes y Finanzas",
    },
    badge: "Consola en Vivo",
  },

  immersiveShowcase: {
    eyebrow: "Experiencia de Producto",
    titlePart1: "Presente sus productos",
    titleItalic: "en 3D y video interactivo.",
    subtitle:
      "Permita a sus clientes rotar modelos 3D en tiempo real, explorar etiquetas y ver videos explicativos antes de comprar.",
    features: {
      viewer3d: {
        title: "Visor 3D Interactivo",
        desc: "Visualización 360° en tiempo real optimizada para dispositivos móviles sin tiempos de carga lentos.",
      },
      videos: {
        title: "Galerías de Video",
        desc: "Videos demostrativos integrados directamente en las fichas de producto con carga diferida.",
      },
      studio: {
        title: "Estudio de Marca",
        desc: "Diseños interactivos que destacan los ingredientes, certificaciones y valor diferencial de sus productos.",
      },
    },
  },

  techStack: {
    eyebrow: "Arquitectura Moderna",
    titlePart1: "Construido con las tecnologías",
    titleItalic: "más avanzadas y confiables.",
    subtitle:
      "Sin dependencias obsoletas ni sistemas monolíticos lentos. Un stack moderno, tipado y optimizado para el rendimiento.",
    pillars: {
      architecture: {
        title: "Arquitectura Headless y Modular",
        desc: "Frontend y backend desacoplados, comunicados mediante APIs REST y WebSocket ultrarrápidas.",
      },
      backend: {
        title: "Node.js y TypeScript de Alto Rendimiento",
        desc: "Lógica comercial centralizada, validación estricta de esquemas y transacciones atómicas.",
      },
      frontend: {
        title: "Next.js 16, React 19 y Tailwind",
        desc: "Renderizado en el servidor, componentes de servidor React y diseño totalmente adaptable.",
      },
      security: {
        title: "Seguridad y Cumplimiento Estricto",
        desc: "Protección contra CSRF, firmas HMAC, aislamiento de datos y almacenamiento seguro en su propia infraestructura.",
      },
    },
  },

  devValue: {
    eyebrow: "Comparación de Valor",
    titlePart1: "¿Construir desde cero o",
    titleItalic: "clonar una plataforma probada?",
    subtitle:
      "Ahorre meses de desarrollo, cientos de errores imprevistos y miles de dólares adquiriendo un sistema listo para operar.",
    optionA: {
      badge: "Opción A · Desde Cero",
      title: "Desarrollo a Medida con Agencia",
      desc: "Contratar una agencia de software o un equipo interno para diseñar, desarrollar y probar todo desde el principio.",
      engineeringLabel: "Tiempo de Ingeniería",
      costLabel: "Costo Estimado",
      timelineLabel: "Tiempo de Entrega",
      timelineValue: "6 a 12 meses",
      riskLabel: "Nivel de Riesgo",
      riskValue: "Alto (retrasos frecuentes y desvíos presupuestarios)",
      footnote: "El 70% de los proyectos de comercio electrónico a medida superan su presupuesto inicial.",
    },
    optionB: {
      badge: "Opción B · Dariyo Turnkey",
      titlePart1: "Clonar la Plataforma",
      titleItalic: "Dariyo Probada",
      desc: "Un clon llave en mano, personalizado con su marca, desplegado en su propia nube y listo para vender.",
      setupFeeLabel: "Inversión Única de Instalación",
      setupFeeSub: "Sin suscripciones recurrentes obligatorias ni comisiones sobre ventas.",
      timelineLabel: "Tiempo de Lanzamiento",
      timelineSub: "Totalmente personalizado y operativo en semanas.",
      inclusionsHeader: "Qué está incluido:",
      licenseNote: "Licencia perpetua de código fuente · Su marca · Su nube · Cero comisiones",
      cta: "Personalizar Mi Presupuesto",
    },
  },

  packagesPricing: {
    eyebrow: "Precios Transparentes",
    titlePart1: "Planes claros.",
    titleItalic: "Sin costos ocultos ni comisiones.",
    subtitle:
      "Elija un paquete preconfigurado o utilice nuestro configurador para seleccionar exactamente los módulos que su negocio necesita.",
    mostPopular: "Más Popular",
    oneTimeSetup: "Pago único de instalación",
    liveInAbout: "Lanzamiento en aprox.",
    choosePackage: "Seleccionar Paquete",
    bottomPrompt: "¿Necesita una configuración específica o módulos a la medida?",
    bottomSub: "Configure cada característica, integración y nivel de soporte con nuestro creador interactivo.",
    openBuilder: "Abrir Creador de Presupuesto",
  },

  customModules: {
    eyebrow: "Módulos Adicionales",
    titlePart1: "Personalice su plataforma",
    titleItalic: "con módulos especializados.",
    subtitle:
      "Agregue exactamente las capacidades que requiere su operación actual y expanda más adelante.",
    quoteThis: "Cotizar este módulo",
    configureAll: "Configurar todos los módulos",
  },

  howItWorks: {
    eyebrow: "Proceso de Trabajo",
    titlePart1: "Del acuerdo al lanzamiento",
    titleItalic: "en cuatro sencillos pasos.",
    subtitle:
      "Un proceso estructurado y transparente para personalizar, probar y desplegar su plataforma con total seguridad.",
    steps: {
      step1: {
        title: "1. Alcance y Personalización de Marca",
        body: "Definimos sus requerimientos, colores, tipografía, dominio e integraciones de pago y envío necesarias.",
        result: "Resultado: Plan de despliegue y diseños preliminares aprobados.",
      },
      step2: {
        title: "2. Configuración y Carga de Catálogo",
        body: "Desplegamos el entorno en su nube, configuramos variantes, SKUs, categorías y políticas comerciales.",
        result: "Resultado: Plataforma completamente funcional con su catálogo real.",
      },
      step3: {
        title: "3. Pruebas Exhaustivas y Capacitación",
        body: "Verificamos pagos reales, sincronización de stock, envíos y capacitamos a su equipo de operaciones.",
        result: "Resultado: Equipo capacitado y flujo de pedidos 100% verificado.",
      },
      step4: {
        title: "4. Lanzamiento Oficial y Soporte",
        body: "Conectamos su dominio principal, activamos el monitoreo continuo y le acompañamos en sus primeras ventas.",
        result: "Resultado: Tienda en vivo con 30 días de correcciones y soporte incluidos.",
      },
    },
  },

  faq: {
    eyebrow: "Preguntas Frecuentes",
    titlePart1: "Todo lo que necesita saber",
    titleItalic: "antes de comenzar.",
    subtitle:
      "Respuestas claras y directas sobre propiedad del código, alojamiento, soporte técnico y costos.",
    items: {
      sourceCode: {
        q: "¿Realmente somos propietarios del código fuente?",
        a1: "Sí. Usted recibe una licencia permanente e irrevocable para utilizar, modificar y alojar el código fuente completo en su propia infraestructura en la nube.",
        a2: "A diferencia de plataformas SaaS cerradas, no hay bloqueo de proveedor ni cuotas mensuales obligatorias para mantener su tienda funcionando.",
      },
      hosting: {
        q: "¿Dónde se aloja la plataforma?",
        a: "La plataforma se despliega en su propia cuenta de nube (como AWS, DigitalOcean o su proveedor preferido). Los costos de infraestructura se pagan directamente a ellos, sin márgenes ocultos.",
      },
      customFeatures: {
        q: "¿Pueden desarrollar funcionalidades personalizadas para nosotros?",
        a: "Por supuesto. Ofrecemos paquetes de ingeniería a medida para integrar sus sistemas ERP internos, transportistas locales o flujos de trabajo específicos.",
      },
      requirements: {
        q: "¿Qué necesitamos preparar antes de empezar?",
        a: "Solo necesita su logotipo e identidad de marca, el catálogo de productos con precios y fotografías, y sus cuentas comerciales de pasarelas de pago y logística.",
      },
      launchTime: {
        q: "¿Cuánto tiempo toma el lanzamiento?",
        a: "La mayoría de las implementaciones se completan y están listas para operar entre 2 y 4 semanas, dependiendo de las personalizaciones requeridas.",
      },
      ongoingCosts: {
        q: "¿Cuáles son los costos operativos posteriores?",
        a: "Solo los costos directos de sus servidores en la nube y las tarifas por transacción de su pasarela de pago. Ofrecemos planes de soporte y mantenimiento opcionales si desea que cuidemos de su sistema.",
      },
    },
  },

  finalCta: {
    badge: "Comience Hoy",
    titlePart1: "¿Listo para ser dueño de",
    titleItalic: "su propio motor de comercio?",
    subtitle:
      "Obtenga una plataforma de nivel empresarial sin meses de espera ni costos millonarios de desarrollo.",
    ctaQuote: "Construya su Presupuesto",
    ctaDemo: "Ver Demo en Vivo",
    chatWithUs: "Conversar por WhatsApp",
  },

  pricing: {
    badge: "Calculadora de Presupuesto",
    provenAt: "Probado en dariyo.in",
    title: "Configure su plataforma.",
    titleItalic: "Obtenga un presupuesto exacto al instante.",
    subtitle:
      "Seleccione un paquete base o elija módulos individuales. Conozca el costo exacto de instalación y los plazos estimados de entrega.",
    startWithPackage: "Comience con un paquete",
    customSelection: "Selección personalizada de módulos",
    orTickBelow: "O seleccione los módulos a continuación",
    popularBadge: "Más Popular",
    oneTimeBeforeGst: "Costo único de instalación",
    oneTimeSetup: "Instalación única",
    includedWithSetup: "Incluido con la instalación",
    everyMonth: "al mes",
    setupTotal: "Total de Instalación",
    monthlyTotal: "Total Mensual Opcional",
    subtotal: "Subtotal",
    gstLabel: "Impuestos aplicables",
    noPlan: "Sin plan mensual",
    hostingPaidToProviders: "El alojamiento en la nube se paga directamente a su proveedor.",
    hostingAbout: "Costo aproximado de servidor",
    paymentSchedule: "Cronograma de Pagos",
    launchTimeline: "Plazo de Lanzamiento",
    weeksEstimate: "semanas estimadas",
    copyLink: "Copiar Enlace del Presupuesto",
    linkCopied: "¡Enlace copiado al portapapeles!",
    printQuote: "Imprimir Presupuesto",
    submitQuote: "Enviar Solicitud de Presupuesto",
    mostPopular: "Más Popular",
    liveInAbout: "Lanzamiento en aprox.",
    payAsYouGo: "Soporte según demanda",
    anHour: "por hora",
    hoursPerMonth: "horas al mes",
    choosePackage: "Seleccionar Paquete",
    pickModules: "Seleccionar Módulos",
    supportPlan: "Plan de Soporte Técnico",
    hostingTier: "Capacidad de Servidor",
    feesGrowthTitle: "Tarifas de Terceros y Crecimiento",
    feesGrowthSub: "Transparencia total sobre los costos externos necesarios.",
    notIncludedTitle: "Qué no está incluido",
    notIncludedSub: "Servicios que corresponden al cliente o se cotizan por separado.",
    modal: {
      title: "Enviar su Presupuesto",
      subtitle: "Revisaremos su selección y nos pondremos en contacto dentro de las próximas 24 horas.",
      nameLabel: "Nombre completo",
      emailLabel: "Correo electrónico corporativo",
      phoneLabel: "Número de teléfono / WhatsApp",
      companyLabel: "Nombre de la empresa o marca",
      requirementsLabel: "Detalles o requerimientos adicionales",
      submitButton: "Enviar Presupuesto",
      submitting: "Enviando...",
      successTitle: "¡Presupuesto Recibido con Éxito!",
      successSubtitle: "Nuestro equipo técnico analizará su solicitud y le contactará hoy mismo.",
      immediateResponse: "¿Necesita una respuesta inmediata? Escríbanos por WhatsApp.",
      doneButton: "Entendido",
    },
  },

  services: {
    badge: "Servicios de Ingeniería",
    title: "Ingeniería de software experta.",
    titleItalic: "Construida para escalar.",
    subtitle:
      "Además de nuestra plataforma de comercio, ofrecemos desarrollo especializado a medida, integración de sistemas y equipos dedicados de ingeniería.",
    fixedProjects: "Proyectos a Precio Fijo",
    staffing: "Ingeniería Dedicada y Aumento de Personal",
    technologies: "Especialidades Tecnológicas",
    inquireNow: "Consultar Servicio",
    perHour: "por hora",
    fullTimeRate: "Tarifa tiempo completo",
    partTimeRate: "Tarifa medio tiempo",
    timeline: "Plazo estimado",
    deliverables: "Entregables clave",
    modal: {
      title: "Solicitar Consulta de Servicios",
      subtitle: "Cuéntenos sobre su proyecto y prepararemos una propuesta detallada.",
      nameLabel: "Nombre completo",
      emailLabel: "Correo electrónico corporativo",
      phoneLabel: "Número de teléfono / WhatsApp",
      companyLabel: "Nombre de la empresa",
      serviceLabel: "Servicio de interés",
      modelLabel: "Modelo de contratación",
      notesLabel: "Descripción del proyecto o requerimientos",
      submitButton: "Enviar Consulta",
      submitting: "Enviando...",
      successTitle: "¡Consulta Recibida!",
      successSubtitle: "Un director de ingeniería se pondrá en contacto para coordinar una llamada inicial.",
      doneButton: "Cerrar",
    },
  },

  contact: {
    badge: "Hablemos",
    title: "Inicie su proyecto con nosotros.",
    subtitle:
      "¿Tiene preguntas sobre la plataforma o desea una demostración guiada? Nuestro equipo está listo para ayudarle.",
    nameLabel: "Nombre",
    emailLabel: "Correo electrónico",
    phoneLabel: "Teléfono / WhatsApp",
    companyLabel: "Empresa",
    messageLabel: "Mensaje o consulta",
    submitButton: "Enviar Mensaje",
    sending: "Enviando...",
    directChannels: "Canales Directos",
    thankYou: "¡Gracias por contactarnos!",
    thankYouDesc: "Hemos recibido su mensaje y responderemos en breve.",
  },

  about: {
    badge: "Nuestra Historia",
    title: "Construido en el mundo real.",
    titleItalic: "No en una presentación de diapositivas.",
    subtitle:
      "Dariyo nació de la necesidad de operar un negocio de comercio moderno sin las restricciones ni comisiones abusivas de los gigantes tecnológicos.",
    storyTitle: "Nuestra Filosofía",
    storyBody:
      "Creemos firmemente que los negocios deben ser dueños de su propia infraestructura tecnológica, sus datos de clientes y sus márgenes de beneficio. Creamos software robusto, bien probado y accesible para que las empresas crezcan sin ataduras.",
  },

  footer: {
    tagline: "El motor de comercio completo. Construido, probado, listo para clonar.",
    navigation: "Navegación",
    platform: "Plataforma",
    clonePricing: "Precios de Clonación",
    companyContact: "Contacto y Empresa",
    services: "Servicios de Ingeniería",
    legal: "Legal",
    allRightsReserved: "Todos los derechos reservados.",
    noCommission: "0% de comisión sobre ventas. Su plataforma, su nube, su código.",
    priceBuilderLink: "Creador de Presupuesto Interactivo",
  },

  catalog: {
    ...en.catalog,
    groups: {
      core: { name: "Núcleo Esencial", blurb: "Tienda, consola de administración y backend con su marca." },
      selling: { name: "Ventas y Conversión", blurb: "Portal mayorista, cupones de descuento y promociones." },
      showcase: { name: "Experiencia de Marca", blurb: "Inicio interactivo en 3D y visualizadores de producto." },
      growth: { name: "Crecimiento y SEO", blurb: "Páginas de búsqueda optimizadas, recetas y analíticas." },
    },
    packages: {
      starter: { name: "Starter", blurb: "Su tienda online con su marca, lista para vender a clientes minoristas." },
      growth: { name: "Growth", blurb: "Para marcas en expansión que buscan vender tanto al por menor como al por mayor." },
      complete: { name: "Complete", blurb: "La suite completa: tienda minorista, portal B2B, experiencia 3D y SEO." },
    },
    supportPlans: {
      none: { name: "Sin plan mensual", covers: ["Soporte técnico y modificaciones facturados por hora según necesidad"] },
      essential: { name: "Essential", covers: ["Actualizaciones de seguridad y dependencias", "Monitoreo 24/7", "Corrección de errores prioritarios"] },
      basic: { name: "Basic", covers: ["Todo lo de Essential", "Pequeños ajustes de diseño y cambios de contenido"] },
      standard: { name: "Standard", covers: ["Todo lo de Basic", "Horas dedicadas cada mes para el desarrollo de nuevas funciones"] },
    },
    hostingTiers: {
      launch: { name: "Nivel Inicial", blurb: "Servidor en la nube de costo eficiente ideal para tiendas nuevas" },
      scale: { name: "Nivel Escala", blurb: "Infraestructura dedicada de alto rendimiento para tiendas con alto tráfico" },
    },
  },

  common: {
    currency: "Moneda",
    language: "Idioma",
    select: "Seleccionar",
    selected: "Seleccionado",
    required: "Obligatorio",
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
    loading: "Cargando...",
    contactUs: "Contáctenos",
    included: "Incluido",
  },
};

