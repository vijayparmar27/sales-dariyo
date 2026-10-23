import type { TranslationDictionary } from "./types";
import { en } from "./en";

export const de: TranslationDictionary = {
  ...en,
  nav: {
    ...en.nav,
    features: "Funktionen",
    services: "Dienstleistungen",
    pricing: "Preise & Klonen",
    blog: "Blog",
    about: "Über Uns",
    contact: "Kontakt",
    platform: "Plattform",
    liveDemo: "Live-Demo testen",
    buildQuote: "Angebot erstellen",
    callNow: "Anrufen",
    chatWhatsApp: "WhatsApp",
    platformLinks: {
      demo: { label: "Live-Demo", blurb: "Testen Sie den Onlineshop und das Admin-Panel" },
      apps: { label: "Drei Vernetzte Apps", blurb: "Shop, Admin-Konsole und Backend als Einheit" },
      retailWholesale: { label: "Einzel- & Großhandel", blurb: "Endkunden und B2B-Käufer in einem Katalog" },
      adminConsole: { label: "Admin-Konsole", blurb: "Bestellungen, Lager, Rechnungen und B2B-Angebote" },
      immersive: { label: "3D & Rich Media", blurb: "3D-Produktansichten und flüssige Videogalerien" },
      technology: { label: "Technologie", blurb: "Ein moderner, typisierter Stack in TypeScript" },
      howItWorks: { label: "Ablauf & Schritte", blurb: "Vom Kickoff bis zum ersten Verkauf in vier Schritten" },
      faqs: { label: "Häufige Fragen (FAQ)", blurb: "Lizenzen, Hosting, Zeitplan und Kosten" },
    },
  },

  hero: {
    ...en.hero,
    badgeTurnkey: "Schlüsselfertige Plattformlizenz",
    badgeProven: "Live bewährt auf dariyo.in",
    titlePart1: "Die komplette E-Commerce-Engine.",
    titleItalic: "Gebaut, getestet, bereit zum Klonen.",
    subtitle:
      "Wir haben die vollständige Handelsplattform hinter dariyo.in entwickelt, im Realbetrieb getestet und skaliert — und wir passen einen dedizierten Klon mit Ihrem Branding für Ihr Unternehmen an.",
    ctaQuote: "Individuelles Angebot Erstellen",
    ctaDemo: "Live-Storefront Erkunden",
    licenseText: "Permanente Quellcodelizenz · 0% Umsatzprovision · In Ihrer Cloud gehostet",
    readyToDispatch: "Versandbereit",
    inYourCart: "In Ihrem Warenkorb",
    pillarBrand: "Ihre Marke",
    pillarBrandDesc: "Ihr Logo, Farben, Schriftarten und eigene Domain",
    pillarProducts: "Ihre Produkte",
    pillarProductsDesc: "Konfiguriert mit Ihren Packungsgrößen, Kategorien & Preisen",
    pillarTurnkey: "Schlüsselfertiger Klon",
    pillarTurnkeyDesc: "Storefront + B2B-Großhandel + Admin-Konsole",
    pillarCommission: "0% Provision",
    pillarCommissionDesc: "Dauerhafte Quellcodelizenz in Ihrer eigenen Cloud",
  },

  proof: {
    ariaLabel: "Plattformkennzahlen",
    stats: {
      apps: "vernetzte Anwendungen, aus einem Guss gebaut",
      hours: "Engineering-Stunden in der Plattform-Engine",
      commission: "Umsatzprovision auf Ihre Verkäufe, für immer",
      fixes: "Tage kostenlose Fehlerbehebung & Support nach dem Start",
    },
  },

  threeApps: {
    eyebrow: "Drei Vernetzte Anwendungen",
    titlePart1: "Ein geschlossenes System.",
    titleItalic: "Entwickelt, um nahtlos zusammenzuarbeiten.",
    subtitle:
      "Kunden-Storefront, Admin-Konsole und Cloud-Backend: drei eigenständige Anwendungen, die perfekt aufeinander abgestimmt sind.",
    storefront: {
      name: "Kunden-Storefront",
      blurb: "Ein blitzschnelles Einkaufserlebnis, entwickelt mit Next.js 16, React 19 und Tailwind CSS.",
      points: [
        { title: "Flexible Packungsgrößen", body: "Gramm, Kilogramm, Gläser oder Beutel – jede Variante mit eigenem Live-Preis." },
        { title: "Optimierter Checkout", body: "Kreditkarten, digitale Wallets, Überweisungen und Nachnahme." },
        { title: "Sichere Kundenkonten", body: "Passwortloser Login, Live-Sendungsverfolgung und offizielle Rechnungsdownloads." },
        { title: "Als App installierbar", body: "Käufer können Ihren Shop direkt auf dem Smartphone-Startbildschirm speichern." },
      ],
      mockLabel: "Warenkorb",
      mockStatus: "Lieferung in Ihrer Region verfügbar",
    },
    adminPanel: {
      name: "Admin-Konsole",
      blurb: "Alles für das Tagesgeschäft Ihres Teams: Produkte, Lagerbestände, Bestellungen und Versand.",
      points: [
        { title: "Produkte & Lagerbestand", body: "Zentrale Bestandsführung je Variante mit automatischer Warnung bei Knappheit." },
        { title: "Integrierte Versandlogistik", body: "Tarifvergleich der Paketdienste, automatische Etikettierung und Abholplanung." },
        { title: "B2B-Großhandelsportal", body: "Händlerkonten, gestaffelte Angebote, Proforma-Rechnungen und Verhandlungschat." },
        { title: "Steuern & Buchhaltung", body: "Automatische Rechnungserstellung, Gutschriften und monatliche Exportberichte." },
      ],
      mockLabel: "Versand",
      mockStatus: "Bereit zur Abholung",
      mockTitle: "Paketdienst-Abholung",
      mockDetail: "Heute geplant · 14 Pakete",
    },
    backend: {
      name: "Commerce-API-Engine",
      blurb: "Die zentrale Quelle der Wahrheit für Preise, Bestände, Zahlungen und Auftragsabwicklung.",
      points: [
        { title: "Serverseitige Berechnungen", body: "Jeder Preis, Rabatt und Steuerbetrag wird ausnahmslos auf dem Server berechnet." },
        { title: "Echtzeit-Synchronisierung", body: "Ablaufende Warenkorbreservierungen und sofortige WebSocket-Updates." },
        { title: "Robuste Sicherheit", body: "HMAC-verifizierte Webhooks, AES-256-verschlüsselte Schlüssel und Rate-Limiting." },
        { title: "Cloud-Unabhängigkeit", body: "Läuft in Docker-Containern auf Ihrem eigenen AWS-Konto oder Server." },
      ],
      mockLabel: "API-Engine",
      mockStatus: "Aktiv · 99.99% Verfügbarkeit",
      mockTitle: "Mikrodienste",
      mockDetail: "Redis-Cache aktiv · Normale Anfragelast",
    },
  },

  platformBenefits: {
    eyebrow: "Leistungsfähigkeit & Skalierung",
    titlePart1: "Konzipiert für hohes Volumen und",
    titleItalic: "reibungslose Abläufe.",
    subtitle:
      "Von Produktvarianten bis zum Lagerversand: Jede Funktion wurde unter realem Transaktionsvolumen auf dariyo.in gehärtet.",
    cards: {
      packSizes: {
        title: "Multi-Packungsgrößen & SKUs",
        body: "Verkaufen Sie Probiergrößen oder Großhandelssäcke mit jeweils eigenem Barcode, Preis und Gewicht.",
        footnote: "Ein zentraler dynamischer Bestand synchronisiert sich über alle Packungsgrößen hinweg.",
      },
      checkout: {
        title: "Hochgeschwindigkeits-Checkout",
        body: "Reibungsloser Kaufprozess mit Express-Zahlung, gespeicherten Lieferadressen und minimaler Abbruchquote.",
        footnote: "Keine lästigen Drittanbieter-Weiterleitungen; Zahlung wird auf Ihrer eigenen Domain abgeschlossen.",
      },
      shipping: {
        title: "Automatisierte Logistik & Tracking",
        body: "Automatische Versandetiketten, Live-Tracking-Webhooks und Statusbenachrichtigungen per WhatsApp und E-Mail.",
        footnote: "Direkte Schnittstellen zu führenden Paketdiensten und Multi-Lager-Logistikern.",
      },
      permissions: {
        title: "Rollenbasierte Mitarbeiterrechte",
        body: "Fein abgestufte Berechtigungen für Lagerpacker, Kundenservice, Buchhaltung und Administratoren.",
        footnote: "Strikte Autorisierung an jedem API-Endpunkt inklusive detaillierter Prüfprotokolle.",
      },
      speed: {
        title: "Ladezeiten unter einer Sekunde",
        body: "Auf Next.js 16 gebaut mit statischer Generierung, Edge-Caching und automatischer Bildkomprimierung.",
        footnote: "Über 95 Punkte im Google Lighthouse Mobile Score und Core Web Vitals.",
      },
      trade: {
        title: "Integriertes B2B-Großhandelsportal",
        body: "Staffelpreise, individuelle Angebotsanfragen, Bestandsreservierung und Frachtkostenberechnung.",
        footnote: "Betreiben Sie Ihren Endkundenshop und Ihr B2B-Geschäft über dieselbe Plattform.",
      },
    },
  },

  retailWholesale: {
    eyebrow: "Zwei Vertriebswege, Ein Lager",
    titlePart1: "Endkundenshop und Großhandel.",
    titleItalic: "Ein gemeinsamer Katalog.",
    subtitle:
      "Sie benötigen keine zwei separaten Systeme. Ihre Dariyo-Plattform bedient tägliche Onlinekäufer und gewerbliche Großkunden mit maßgeschneiderten Workflows.",
    retailBadge: "Endkunden-Kanal (B2C)",
    retailTitle: "Modernes und schnelles Einkaufserlebnis",
    retailDesc:
      "Optimiert für Smartphone-Käufer, hohe Konversionsraten und Kundenbindung durch einen ultraschnellen Checkout.",
    retailFeatures: [
      "Gewichts- und Gebindevarianten mit Live-Preisen",
      "Gutscheincodes, Rabattstaffeln und zeitlich begrenzte Aktionen",
      "Echtzeit-Paketverfolgung per SMS und E-Mail",
      "Verifizierte Kundenbewertungen und Produktfragen",
    ],
    wholesaleBadge: "Geschäftskunden-Kanal (B2B)",
    wholesaleTitle: "Großmengen, Angebote und Abrechnung",
    wholesaleDesc:
      "Geben Sie Geschäftspartnern ein professionelles Portal mit individuellen Preislisten, Zahlungszielen und Sammelbestellungen.",
    wholesaleFeatures: [
      "Staffelpreise und individuelle Kundengruppen-Konditionen",
      "Digitaler Angebotsworkflow mit Verhandlungsverlauf",
      "Sofortige Erstellung von Proforma-Rechnungen und Auftragsbestätigungen",
      "Kreditlimite, Rechnungszahlung und SEPA-Überweisungen",
    ],
  },

  adminShowcase: {
    eyebrow: "Volle Kontrolle",
    titlePart1: "Eine Admin-Konsole,",
    titleItalic: "gebaut für den praktischen Alltag.",
    subtitle:
      "Entwickelt für das operative Team: Vom Kommissionieren der Pakete bis zur monatlichen Buchhaltungsabstimmung.",
    tabs: {
      orders: "Bestellungen & Versand",
      inventory: "Katalog & Varianten",
      shipping: "Logistik & Sendungsverfolgung",
      reports: "Berichte & Buchhaltung",
    },
    badge: "Live-Konsole",
  },

  immersiveShowcase: {
    eyebrow: "Visuelle Produkterlebnisse",
    titlePart1: "Präsentieren Sie Ihre Produkte",
    titleItalic: "in 3D und interaktivem Video.",
    subtitle:
      "Lassen Sie Kunden Ihre Verpackungen in 3D drehen, Inhaltsstoffe vergrößern und Produktvideos ohne Ladeverzögerung ansehen.",
    features: {
      viewer3d: {
        title: "Interaktiver 3D-Betrachter",
        desc: "360-Grad-Ansicht in Echtzeit, optimiert für Mobilgeräte mit sofortigen Ladezeiten.",
      },
      videos: {
        title: "Integrierte Videogalerien",
        desc: "Hochauflösende Demovideos direkt auf den Produktseiten mit asynchronem Laden.",
      },
      studio: {
        title: "Marken-Präsentationsseiten",
        desc: "Interaktive Layouts, die Herkunft, Qualitätssiegel und Produktvorteile wirkungsvoll herausstellen.",
      },
    },
  },

  techStack: {
    eyebrow: "Moderne Architektur",
    titlePart1: "Entwickelt mit den fortschrittlichsten",
    titleItalic: "und zuverlässigsten Technologien.",
    subtitle:
      "Keine veralteten Abhängigkeiten oder trägen Altsysteme. Ein hochperformanter, durchgehend typisierter moderner Stack.",
    pillars: {
      architecture: {
        title: "Modulare Headless-Architektur",
        desc: "Getrennte Storefront und Backend-Logik, verbunden über optimierte REST- und WebSocket-APIs.",
      },
      backend: {
        title: "Hochperformantes Node.js & TypeScript",
        desc: "Zentrale Geschäftslogik, strikte Schemavalidierung und atomare Datenbanktransaktionen.",
      },
      frontend: {
        title: "Next.js 16, React 19 & Tailwind CSS",
        desc: "Server-Side Rendering, React Server Components und reaktionsschnelles Mobil-Design.",
      },
      security: {
        title: "Sicherheit & Datenhoheit",
        desc: "CSRF-Schutz, kryptografische HMAC-Prüfung und Betrieb in Ihrer eigenen kontrollierten Cloud-Umgebung.",
      },
    },
  },

  devValue: {
    eyebrow: "Wirtschaftlichkeitsvergleich",
    titlePart1: "Von Grund auf neu entwickeln oder",
    titleItalic: "ein bewährtes System klonen?",
    subtitle:
      "Sparen Sie monatelange Entwicklungszeit, unzählige Kinderkrankheiten und beträchtliche Budgets durch eine erprobte Plattform.",
    optionA: {
      badge: "Option A · Eigenentwicklung",
      title: "Individuelle Agenturentwicklung",
      desc: "Eine Softwareagentur beauftragen oder ein eigenes Entwicklerteam anheuern, um alles von Grund auf neu zu programmieren.",
      engineeringLabel: "Erforderliche Entwicklungszeit",
      costLabel: "Typische Kosten",
      timelineLabel: "Dauer bis zum Launch",
      timelineValue: "6 bis 12 Monate",
      riskLabel: "Projektrisiko",
      riskValue: "Hoch (häufige Verzögerungen und Budgetüberschreitungen)",
      footnote: "Über 70 % aller individuellen E-Commerce-Neuentwicklungen übersteigen das ursprüngliche Budget maßgeblich.",
    },
    optionB: {
      badge: "Option B · Schlüsselfertiges Dariyo-System",
      titlePart1: "Klonen der bewährten",
      titleItalic: "Dariyo-Plattform",
      desc: "Ein schlüsselfertiger Klon, angepasst an Ihr Branding, in Ihrer eigenen Cloud eingerichtet und sofort einsatzbereit.",
      setupFeeLabel: "Einmalige Einrichtungspauschale",
      setupFeeSub: "Keine verpflichtenden Software-Abos, 0% Abgabe auf Ihre Verkaufsumsätze.",
      timelineLabel: "Dauer bis zum Livegang",
      timelineSub: "Vollständig angepasst und einsatzbereit in wenigen Wochen.",
      inclusionsHeader: "Fest enthaltene Leistungen:",
      licenseNote: "Permanente Quellcodelizenz · Ihre Marke · Ihre Cloud · Keine Provisionen",
      cta: "Mein Angebot Konfigurieren",
    },
  },

  packagesPricing: {
    eyebrow: "Transparente Preisgestaltung",
    titlePart1: "Klare Pakete.",
    titleItalic: "Ohne versteckte Gebühren oder Provisionen.",
    subtitle:
      "Wählen Sie ein vorkonfiguriertes Paket oder nutzen Sie unseren interaktiven Konfigurator, um genau die Module auszuwählen, die Ihr Unternehmen benötigt.",
    mostPopular: "Beliebteste Wahl",
    oneTimeSetup: "Einmalige Einrichtung",
    liveInAbout: "Startklar in ca.",
    choosePackage: "Paket Auswählen",
    bottomPrompt: "Benötigen Sie eine individuelle Konfiguration oder spezielle Schnittstellen?",
    bottomSub: "Stellen Sie jede Funktion und den gewünschten Supportlevel im interaktiven Rechner zusammen.",
    openBuilder: "Angebotskonfigurator Öffnen",
  },

  customModules: {
    eyebrow: "Individuelle Module",
    titlePart1: "Erweitern Sie Ihre Plattform",
    titleItalic: "mit maßgeschneiderten Modulen.",
    subtitle:
      "Starten Sie mit den für Ihren Launch essenziellen Modulen und erweitern Sie Ihr System flexibel im weiteren Verlauf.",
    quoteThis: "Dieses Modul anfragen",
    configureAll: "Alle Module konfigurieren",
  },

  howItWorks: {
    eyebrow: "Projektablauf",
    titlePart1: "Vom ersten Gespräch zum Launch",
    titleItalic: "in vier klaren Schritten.",
    subtitle:
      "Ein transparenter, strukturierter Ablauf zur Anpassung, Qualitätssicherung und Inbetriebnahme Ihres Systems.",
    steps: {
      step1: {
        title: "1. Abstimmung & Markenanpassung",
        body: "Festlegung Ihrer Anforderungen, Anpassung an Ihr Corporate Design, Farben, Schriftarten und Auswahl der Zahlungsanbieter.",
        result: "Ergebnis: Abgestimmter Umsetzungsplan und freigegebene Design-Entwürfe.",
      },
      step2: {
        title: "2. Cloud-Bereitstellung & Katalogaufbau",
        body: "Einrichtung in Ihrer Cloud-Infrastruktur, Einpflege Ihrer Produkte, Varianten, Preise und Versandkonditionen.",
        result: "Ergebnis: Voll funktionsfähige Plattform mit Ihrem echten Sortiment.",
      },
      step3: {
        title: "3. Qualitätssicherung & Teamschulung",
        body: "Gemeinsamer Durchlauf echter Testbestellungen, Schnittstellenprüfungen und gründliche Einweisung Ihres Teams.",
        result: "Ergebnis: Sicheres Team und 100% geprüfte Bestellabläufe.",
      },
      step4: {
        title: "4. Livegang & Begleitung",
        body: "Aufschaltung Ihrer Hauptdomain, Aktivierung des 24/7-Monitorings und Begleitung der ersten realen Kundenbestellungen.",
        result: "Ergebnis: Erfolgreicher Onlineshop mit 30 Tagen kostenfreiem Support und Fehlerbehebungen inklusive.",
      },
    },
  },

  faq: {
    eyebrow: "Häufig Gestellte Fragen",
    titlePart1: "Alles, was Sie vor dem Start",
    titleItalic: "wissen möchten.",
    subtitle:
      "Klare Antworten zu Quellcode-Eigentum, Cloud-Hosting, technischer Betreuung und anfallenden Kosten.",
    items: {
      sourceCode: {
        q: "Gehört uns der Quellcode wirklich?",
        a1: "Ja. Sie erhalten eine unbefristete, unwiderrufliche Lizenz zur Nutzung, Anpassung und zum Hosting des gesamten Quellcodes in Ihrer eigenen Cloud-Umgebung.",
        a2: "Im Gegensatz zu geschlossenen SaaS-Plattformen gibt es keine Abhängigkeit und keine monatlichen Zwangsabgaben, um Ihren Shop online zu halten.",
      },
      hosting: {
        q: "Wo wird die Plattform gehostet?",
        a: "Die Plattform wird direkt in Ihrem bevorzugten Cloud-Konto (z. B. AWS, Hetzner oder DigitalOcean) betrieben. Die Infrastrukturkosten zahlen Sie ohne Aufschlag direkt an den Anbieter.",
      },
      customFeatures: {
        q: "Können Sie individuelle Sonderfunktionen für uns entwickeln?",
        a: "Selbstverständlich. Wir bieten maßgeschneiderte Entwicklungspakete für ERP-Anbindungen, regionale Versanddienstleister oder spezifische Vertriebsabläufe an.",
      },
      requirements: {
        q: "Was benötigen wir, um loszulegen?",
        a: "Lediglich Ihre Markenelemente (Logo, Farbcodes), Ihre Produktdaten mit Bildmaterial und Preisen sowie Konten bei den gewünschten Zahlungs- und Versandpartnern.",
      },
      launchTime: {
        q: "Wie viel Zeit vergeht bis zum Go-Live?",
        a: "Die meisten Projekte sind innerhalb von 2 bis 4 Wochen vollständig eingerichtet, getestet und verkaufsbereit.",
      },
      ongoingCosts: {
        q: "Welche laufenden Kosten entstehen nach dem Start?",
        a: "Ausschließlich Ihre tatsächlichen Serverkosten beim Cloud-Anbieter und die regulären Gebühren Ihrer Zahlungsdienstleister. Wir bieten optionale Wartungspakete für dauerhafte Betreuung an.",
      },
    },
  },

  finalCta: {
    badge: "Jetzt Starten",
    titlePart1: "Bereit für Ihre eigene,",
    titleItalic: "unabhängige E-Commerce-Plattform?",
    subtitle:
      "Sichern Sie sich ein bewährtes, professionelles System ohne monatelange Verzögerungen oder ausufernde Entwicklungskosten.",
    ctaQuote: "Angebot Jetzt Konfigurieren",
    ctaDemo: "Live-Demo Ansehen",
    chatWithUs: "Via WhatsApp Schreiben",
  },

  pricing: {
    badge: "Angebotsrechner",
    provenAt: "Bewährt auf dariyo.in",
    title: "Stellen Sie Ihr System zusammen.",
    titleItalic: "Erhalten Sie sofort eine verlässliche Kalkulation.",
    subtitle:
      "Wählen Sie ein fertiges Paket oder stellen Sie einzelne Bausteine zusammen. Berechnen Sie Einrichtungskosten und den geschätzten Zeitplan.",
    startWithPackage: "Mit einem Paket starten",
    customSelection: "Individuelle Modulauswahl",
    orTickBelow: "Oder einzelne Module unten auswählen",
    popularBadge: "Sehr Beliebt",
    oneTimeBeforeGst: "Einmalige Einrichtung",
    oneTimeSetup: "Einmalige Einrichtung",
    includedWithSetup: "In der Einrichtung enthalten",
    everyMonth: "pro Monat",
    setupTotal: "Einrichtungssumme",
    monthlyTotal: "Optionale Monatliche Betreuung",
    subtotal: "Zwischensumme",
    gstLabel: "Anwendbare Steuern",
    noPlan: "Kein monatlicher Plan",
    hostingPaidToProviders: "Cloud-Hosting wird direkt an Ihren Provider gezahlt.",
    hostingAbout: "Ungefähre Serverkosten",
    paymentSchedule: "Zahlungsplan",
    launchTimeline: "Geschätzte Umsetzungszeit",
    weeksEstimate: "Wochen geschätzt",
    copyLink: "Angebotslink Kopieren",
    linkCopied: "Link in die Zwischenablage kopiert!",
    printQuote: "Angebot Drucken",
    submitQuote: "Dieses Angebot Anfragen",
    mostPopular: "Beliebteste Wahl",
    liveInAbout: "Startklar in ca.",
    payAsYouGo: "Support nach tatsächlichem Aufwand",
    anHour: "pro Stunde",
    hoursPerMonth: "Stunden pro Monat",
    choosePackage: "Dieses Paket Wählen",
    pickModules: "Module Auswählen",
    supportPlan: "Support & Wartungspaket",
    hostingTier: "Server-Leistungsstufe",
    feesGrowthTitle: "Drittkosten & Skalierbarkeit",
    feesGrowthSub: "Vollständige Kostentransparenz ohne versteckte Posten.",
    notIncludedTitle: "Nicht enthaltene Leistungen",
    notIncludedSub: "Kundenseitige Vorleistungen oder separat zu kalkulierende Sonderleistungen.",
    modal: {
      title: "Angebotsanfrage Absenden",
      subtitle: "Wir prüfen Ihre Konfiguration und melden uns innerhalb von 24 Stunden bei Ihnen.",
      nameLabel: "Vollständiger Name",
      emailLabel: "Geschäftliche E-Mail-Adresse",
      phoneLabel: "Telefonnummer / WhatsApp",
      companyLabel: "Unternehmens- oder Markenname",
      requirementsLabel: "Besondere Anforderungen oder Anmerkungen",
      submitButton: "Anfrage Absenden",
      submitting: "Wird übermittelt...",
      successTitle: "Anfrage Erfolgreich Erhalten!",
      successSubtitle: "Unser Entwicklungsteam prüft Ihre Angaben und setzt sich zeitnah mit Ihnen in Verbindung.",
      immediateResponse: "Dringende Frage? Schreiben Sie uns direkt per WhatsApp.",
      doneButton: "Verstanden",
    },
  },

  services: {
    badge: "Engineering-Leistungen",
    title: "Erstklassige Software-Entwicklung.",
    titleItalic: "Entwickelt für Stabilität und Wachstum.",
    subtitle:
      "Neben unserer Handelsplattform realisieren wir anspruchsvolle Individualsoftware, komplexe Systemintegrationen und stellen erfahrene Entwicklerteams bereit.",
    fixedProjects: "Festpreisprojekte",
    staffing: "Dedizierte Entwickler & Teamerweiterung",
    technologies: "Technologische Kernkompetenzen",
    inquireNow: "Dienstleistung Anfragen",
    perHour: "pro Stunde",
    fullTimeRate: "Monatstarif Vollzeit",
    partTimeRate: "Monatstarif Teilzeit",
    timeline: "Geschätzte Dauer",
    deliverables: "Wesentliche Ergebnisse",
    modal: {
      title: "Dienstleistungsanfrage Stellen",
      subtitle: "Beschreiben Sie Ihr Projekt für einen maßgeschneiderten Umsetzungsvorschlag.",
      nameLabel: "Vollständiger Name",
      emailLabel: "Geschäftliche E-Mail",
      phoneLabel: "Telefon / WhatsApp",
      companyLabel: "Unternehmen",
      serviceLabel: "Gewünschte Leistung",
      modelLabel: "Zusammenarbeitsmodell",
      notesLabel: "Projektbeschreibung oder Rahmenbedingungen",
      submitButton: "Anfrage Absenden",
      submitting: "Wird gesendet...",
      successTitle: "Anfrage Übermittelt!",
      successSubtitle: "Ein Senior Engineer wird sich zeitnah mit Ihnen für ein Erstgespräch abstimmen.",
      doneButton: "Schließen",
    },
  },

  contact: {
    badge: "Kontakt",
    title: "Lassen Sie uns Ihr Vorhaben besprechen.",
    subtitle:
      "Haben Sie Fragen zur Architektur oder möchten Sie eine geführte Demo vereinbaren? Wir freuen uns auf das Gespräch.",
    nameLabel: "Name",
    emailLabel: "E-Mail-Adresse",
    phoneLabel: "Telefon / WhatsApp",
    companyLabel: "Unternehmen",
    messageLabel: "Ihre Nachricht oder Projektidee",
    submitButton: "Nachricht Senden",
    sending: "Wird übermittelt...",
    directChannels: "Direkte Kanäle",
    thankYou: "Vielen Dank für Ihre Kontaktaufnahme!",
    thankYouDesc: "Wir haben Ihre Nachricht erhalten und melden uns in Kürze.",
  },

  about: {
    badge: "Unsere Geschichte",
    title: "Aus der Praxis entstanden.",
    titleItalic: "Kein theoretisches Folienkonzept.",
    subtitle:
      "Dariyo entstand aus der praktischen Notwendigkeit heraus, einen erfolgreichen E-Commerce-Betrieb ohne knebelnde Plattformgebühren und fremde Einschränkungen zu führen.",
    storyTitle: "Unsere Überzeugung",
    storyBody:
      "Wir sind überzeugt, dass Marken die volle Kontrolle über ihre Technologie, Kundendaten und Erträge besitzen sollten. Wir entwickeln langlebige, transparente und erprobte Softwarelösungen für echte unternehmerische Unabhängigkeit.",
  },

  footer: {
    tagline: "Die komplette E-Commerce-Engine. Gebaut, getestet, bereit zum Klonen.",
    navigation: "Navigation",
    platform: "Plattform",
    clonePricing: "Preise & Klonen",
    companyContact: "Unternehmen & Kontakt",
    services: "Engineering-Services",
    legal: "Rechtliches",
    allRightsReserved: "Alle Rechte vorbehalten.",
    noCommission: "0% Provision auf Ihre Verkäufe. Ihre Plattform, Ihre Cloud, Ihr Code.",
    priceBuilderLink: "Interaktiver Angebotsrechner",
  },

  catalog: {
    ...en.catalog,
    groups: {
      core: { name: "Grundausstattung", blurb: "Storefront, Admin-Konsole und Backend mit Ihrem Branding." },
      selling: { name: "Verkauf & Umsatz", blurb: "B2B-Großhandelsportal, Rabattcodes und Aktionen." },
      showcase: { name: "Präsentation", blurb: "Interaktive 3D-Startseite und flüssige Produktansichten." },
      growth: { name: "Wachstum & SEO", blurb: "Erweiterte Suchseiten, Rezeptwelten und Analytics." },
    },
    packages: {
      starter: { name: "Starter", blurb: "Ihr gebrandeter Onlineshop, sofort bereit für den Direktverkauf an Endkunden." },
      growth: { name: "Growth", blurb: "Für wachsende Marken, die sowohl Endkunden als auch Händler beliefern." },
      complete: { name: "Complete", blurb: "Das Gesamtsystem: Endkunden-Shop, B2B-Händlerportal, 3D-Erlebnis und SEO." },
    },
    supportPlans: {
      none: { name: "Kein monatlicher Plan", covers: ["Bedarfsbezogene Unterstützung und Anpassungen auf Stundenbasis"] },
      essential: { name: "Essential", covers: ["Sicherheits- & Bibliotheksupdates", "24/7 Serverüberwachung", "Priorisierte Fehlerbehebung"] },
      basic: { name: "Basic", covers: ["Alle Leistungen aus Essential", "Kleinere Layoutanpassungen und Inhaltspflege"] },
      standard: { name: "Standard", covers: ["Alle Leistungen aus Basic", "Feste monatliche Entwicklerstunden für neue Funktionen"] },
    },
    hostingTiers: {
      launch: { name: "Launch-Stufe", blurb: "Kosteneffizienter Cloud-Server, ideal für neu startende Onlineshops" },
      scale: { name: "Skalierungsstufe", blurb: "Leistungsstarke Cloud-Infrastruktur für hohe gleichzeitige Besucherzahlen" },
    },
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
    loading: "Wird geladen...",
    contactUs: "Kontaktieren",
    included: "Inklusive",
  },
};

