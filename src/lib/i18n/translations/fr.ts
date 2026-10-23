import type { TranslationDictionary } from "./types";
import { en } from "./en";

export const fr: TranslationDictionary = {
  ...en,
  nav: {
    ...en.nav,
    features: "Fonctionnalités",
    services: "Services",
    pricing: "Tarifs de Clonage",
    blog: "Blog",
    about: "À Propos",
    contact: "Contact",
    platform: "Plateforme",
    liveDemo: "Tester la Démo",
    buildQuote: "Créer un Devis",
    callNow: "Nous appeler",
    chatWhatsApp: "WhatsApp",
    platformLinks: {
      demo: { label: "Démo en Direct", blurb: "Testez la boutique et la console d'administration" },
      apps: { label: "Trois Applications Connectées", blurb: "Boutique, console et backend intégrés" },
      retailWholesale: { label: "B2C et Grossiste B2B", blurb: "Clients particuliers et professionnels sur un seul catalogue" },
      adminConsole: { label: "Console d'Administration", blurb: "Commandes, stocks, factures et devis B2B" },
      immersive: { label: "3D & Médias Interactifs", blurb: "Vues produits 3D et galeries vidéo fluides" },
      technology: { label: "Architecture Technique", blurb: "Une stack moderne et typée en TypeScript" },
      howItWorks: { label: "Comment Ça Marche", blurb: "Du cadrage à la première vente en quatre étapes" },
      faqs: { label: "FAQ", blurb: "Licences, hébergement, délais et coûts" },
    },
  },

  hero: {
    ...en.hero,
    badgeTurnkey: "Licence de Plateforme Clé en Main",
    badgeProven: "Éprouvé en Direct sur dariyo.in",
    titlePart1: "Le moteur de commerce complet.",
    titleItalic: "Conçu, testé, prêt à cloner.",
    subtitle:
      "Nous avons développé, testé et mis à l'échelle la plateforme e-commerce de dariyo.in — et nous personnalisons, adaptons à votre marque et déployons un clone dédié pour votre entreprise.",
    ctaQuote: "Créer Votre Devis Personnalisé",
    ctaDemo: "Découvrir la Boutique en Direct",
    licenseText: "Licence perpétuelle de code · 0% de commission sur les ventes · Déployé dans votre cloud",
    readyToDispatch: "Prêt pour expédition",
    inYourCart: "Dans votre panier",
    pillarBrand: "Votre Marque",
    pillarBrandDesc: "Votre logo, vos couleurs, vos polices et votre domaine",
    pillarProducts: "Vos Produits",
    pillarProductsDesc: "Configuré avec vos formats, catégories et tarifs",
    pillarTurnkey: "Clone Clé en Main",
    pillarTurnkeyDesc: "Boutique B2C + Espace Grossiste B2B + Console d'administration",
    pillarCommission: "0% de Commission",
    pillarCommissionDesc: "Licence permanente de code source dans votre propre cloud",
  },

  proof: {
    ariaLabel: "Chiffres clés de la plateforme",
    stats: {
      apps: "applications interconnectées, développées d'un seul bloc",
      hours: "heures d'ingénierie investies dans le moteur",
      commission: "commission prélevée sur vos ventes, à vie",
      fixes: "jours de support et correctifs gratuits après lancement",
    },
  },

  threeApps: {
    eyebrow: "Trois Applications Interconnectées",
    titlePart1: "Un système complet.",
    titleItalic: "Conçu pour fonctionner d'un seul tenant.",
    subtitle:
      "Boutique client, console d'administration et backend cloud : trois applications distinctes conçues pour fonctionner en harmonie totale.",
    storefront: {
      name: "Boutique Client (Storefront)",
      blurb: "Une expérience d'achat ultra-rapide construite avec Next.js 16, React 19 et Tailwind CSS.",
      points: [
        { title: "Formats Multiples", body: "Grammes, kilos, bocaux ou sachets, avec prix en direct pour chaque variante." },
        { title: "Paiement Simplifié", body: "Cartes bancaires, portefeuilles numériques, virements et paiement à la livraison." },
        { title: "Espace Client Sécurisé", body: "Connexion sécurisée, suivi en direct des colis et factures téléchargeables." },
        { title: "Installable comme une App", body: "Les clients peuvent épingler votre boutique sur l'écran d'accueil de leur mobile." },
      ],
      mockLabel: "Panier",
      mockStatus: "Livraison disponible dans votre région",
    },
    adminPanel: {
      name: "Console d'Administration",
      blurb: "Tout ce dont votre équipe a besoin au quotidien : catalogue, stocks, commandes et logistique.",
      points: [
        { title: "Produits et Inventaire", body: "Gestion centralisée des stocks par format avec alertes de rupture imminente." },
        { title: "Expéditions Intégrées", body: "Comparaison des transporteurs, étiquetage automatique et gestion des ramassages." },
        { title: "Espace B2B Grossiste", body: "Comptes professionnels, devis sur mesure, factures proforma et messagerie de négociation." },
        { title: "Fiscalité et Facturation", body: "Génération automatique des factures conformes, avoirs et rapports financiers." },
      ],
      mockLabel: "Expéditions",
      mockStatus: "Prêt pour ramassage",
      mockTitle: "Ramassage Transporteur",
      mockDetail: "Planifié pour aujourd'hui · 14 colis",
    },
    backend: {
      name: "Moteur d'API Commerce",
      blurb: "L'unique source de vérité pour les tarifs, l'inventaire, les paiements et le traitement des commandes.",
      points: [
        { title: "Calculs Côté Serveur", body: "Chaque prix, réduction et taxe est rigoureusement validé côté serveur." },
        { title: "Synchronisation Temps Réel", body: "Expiration des réservations de stock et mises à jour WebSocket en direct." },
        { title: "Sécurité Renforcée", body: "Webhooks signés par HMAC, clés chiffrées AES-256 et limitation du débit d'appels." },
        { title: "Indépendance Cloud", body: "Fonctionne sous conteneurs Docker dans votre propre compte AWS ou infrastructure dédiée." },
      ],
      mockLabel: "Moteur d'API",
      mockStatus: "Opérationnel · 99.99% de disponibilité",
      mockTitle: "Microservices",
      mockDetail: "Cache Redis actif · Débit d'appels nominal",
    },
  },

  platformBenefits: {
    eyebrow: "Performances & Robustesse",
    titlePart1: "Conçu pour les volumes élevés et",
    titleItalic: "un commerce sans friction.",
    subtitle:
      "Des déclinaisons de conditionnement jusqu'à l'expédition en entrepôt, chaque fonctionnalité a été validée sous de véritables volumes d'achat sur dariyo.in.",
    cards: {
      packSizes: {
        title: "Multi-Formats et Références SKU",
        body: "Vendez des échantillons individuels ou des sacs industriels en gros avec code-barres, prix et poids dédiés.",
        footnote: "Un stock unifié se met à jour dynamiquement sur toutes les variantes.",
      },
      checkout: {
        title: "Tunnel d'Achat Haute Vitesse",
        body: "Une expérience fluide avec paiement rapide, adresses enregistrées et prise en charge des livraisons express.",
        footnote: "Zéro redirection externe intempestive ; le paiement est validé sur votre domaine.",
      },
      shipping: {
        title: "Logistique et Suivi Automatisés",
        body: "Réservation automatique auprès des transporteurs, webhooks de suivi en direct et notifications SMS/email.",
        footnote: "Intégration directe avec les principaux transporteurs et entrepôts logistiques.",
      },
      permissions: {
        title: "Accès Équipe Basé sur les Rôles",
        body: "Droits d'accès précis pour les préparateurs de commandes, le support client, les comptables et les administrateurs.",
        footnote: "Contrôle strict sur chaque point d'API avec journalisation complète des audits.",
      },
      speed: {
        title: "Chargement en Moins d'une Seconde",
        body: "Construit sur Next.js 16 avec pré-génération statique, mise en cache périphérique (Edge) et optimisation des images.",
        footnote: "Score de 95+ sur Google Lighthouse Mobile et indicateurs Core Web Vitals.",
      },
      trade: {
        title: "Portail Grossiste B2B Dédié",
        body: "Grilles tarifaires par palier, devis personnalisés, réservation de stock et calcul des frais de transport pour les professionnels.",
        footnote: "Pilotez vos activités grand public et B2B depuis un seul et unique tableau de bord.",
      },
    },
  },

  retailWholesale: {
    eyebrow: "Deux Marchés, Un Seul Stock",
    titlePart1: "Vente directe aux particuliers et B2B.",
    titleItalic: "Le même catalogue unifié.",
    subtitle:
      "Inutile de multiplier les outils ou de synchroniser deux plateformes. Votre plateforme Dariyo sert aussi bien vos clients du quotidien que vos partenaires commerciaux à fort volume.",
    retailBadge: "Canal Grand Public (B2C)",
    retailTitle: "Expérience d'achat fluide et engageante",
    retailDesc:
      "Pensée pour maximiser la conversion sur smartphone, les paniers moyens et la fidélisation grâce à un parcours fluide.",
    retailFeatures: [
      "Variantes au gramme ou au kilo avec prix actualisés",
      "Codes promotionnels, remises automatiques et ventes flash",
      "Suivi de livraison en temps réel par SMS et email",
      "Avis clients certifiés et foire aux questions produit",
    ],
    wholesaleBadge: "Canal Professionnel (B2B)",
    wholesaleTitle: "Devis volumiques et commandes récurrentes",
    wholesaleDesc:
      "Offrez à vos acheteurs professionnels un espace dédié avec grilles tarifaires privées, encours et facturation adaptée.",
    wholesaleFeatures: [
      "Tarifs négociés et dégressifs selon les volumes de commande",
      "Module d'émission et de validation de devis avec négociation",
      "Génération immédiate de factures proforma et bons de commande",
      "Paiements à terme, limites de crédit et virements bancaires",
    ],
  },

  adminShowcase: {
    eyebrow: "Contrôle Opérationnel",
    titlePart1: "Une console de gestion",
    titleItalic: "taillée pour le monde réel.",
    subtitle:
      "Conçue pour les équipes qui gèrent la boutique au quotidien : du colisage en entrepôt au rapprochement bancaire.",
    tabs: {
      orders: "Commandes & Expéditions",
      inventory: "Catalogue & Déclinaisons",
      shipping: "Transporteurs & Suivi",
      reports: "Comptabilité & Métriques",
    },
    badge: "Console en Direct",
  },

  immersiveShowcase: {
    eyebrow: "Mise en Valeur Visuelle",
    titlePart1: "Présentez vos produits",
    titleItalic: "en 3D et vidéo haute définition.",
    subtitle:
      "Permettez à vos visiteurs d'interagir avec vos emballages en 3D, de lire les étiquettes et de visionner vos présentations vidéo.",
    features: {
      viewer3d: {
        title: "Visualiseur 3D Fluide",
        desc: "Rendu 360° en temps réel optimisé pour smartphones sans temps de chargement fastidieux.",
      },
      videos: {
        title: "Galeries Vidéo Intégrées",
        desc: "Vidéos de démonstration intégrées directement dans les fiches produits avec chargement asynchrone.",
      },
      studio: {
        title: "Studio de Marque",
        desc: "Pages de présentation détaillant vos ingrédients, vos labels de qualité et votre savoir-faire.",
      },
    },
  },

  techStack: {
    eyebrow: "Socle Technique",
    titlePart1: "Développé avec les technologies",
    titleItalic: "les plus modernes et fiables.",
    subtitle:
      "Aucun code obsolète, pas d'usines à gaz monolithiques. Une architecture moderne, typée et hautement performante.",
    pillars: {
      architecture: {
        title: "Architecture Headless Découplée",
        desc: "Storefront et backend séparés, communiquant via des API REST et WebSocket hautement optimisées.",
      },
      backend: {
        title: "Node.js & TypeScript Haute Performance",
        desc: "Règles métier centralisées, validation stricte de types et transactions de base de données atomiques.",
      },
      frontend: {
        title: "Next.js 16, React 19 & Tailwind",
        desc: "Rendu côté serveur, React Server Components et design adaptatif pensé pour le mobile.",
      },
      security: {
        title: "Sécurité & Contrôle des Données",
        desc: "Protection CSRF, signatures cryptographiques HMAC et déploiement complet sur vos propres serveurs.",
      },
    },
  },

  devValue: {
    eyebrow: "Analyse d'Investissement",
    titlePart1: "Développer de zéro ou",
    titleItalic: "cloner une plateforme éprouvée ?",
    subtitle:
      "Épargnez-vous des mois de développement, des dizaines d'imprévus et des dizaines de milliers d'euros en partant d'un moteur déjà rodé.",
    optionA: {
      badge: "Option A · Développement Traditionnel",
      title: "Création Sur Mesure en Agence",
      desc: "Faire appel à une agence web ou recruter une équipe pour tout concevoir et développer de A à Z.",
      engineeringLabel: "Temps d'Ingénierie Requis",
      costLabel: "Coût Moyen Constaté",
      timelineLabel: "Délai Avant Sortie",
      timelineValue: "6 à 12 mois",
      riskLabel: "Niveau de Risque",
      riskValue: "Élevé (retards fréquents et dépassements de budget)",
      footnote: "Plus de 70% des projets e-commerce sur mesure dépassent leur enveloppe budgétaire initiale.",
    },
    optionB: {
      badge: "Option B · Solution Dariyo Clé en Main",
      titlePart1: "Clonage de la Plateforme",
      titleItalic: "Dariyo Éprouvée",
      desc: "Un clone prêt à l'emploi, adapté à votre charte graphique, hébergé dans votre cloud et immédiatement opérationnel.",
      setupFeeLabel: "Forfait Unique d'Installation",
      setupFeeSub: "Aucun abonnement logiciel obligatoire, 0% de prélèvement sur vos ventes.",
      timelineLabel: "Délai de Mise en Ligne",
      timelineSub: "Personnalisé et opérationnel en quelques semaines seulement.",
      inclusionsHeader: "Ce qui est inclus d'office :",
      licenseNote: "Licence de code perpétuelle · Votre marque · Votre cloud · Zéro commission",
      cta: "Personnaliser Mon Devis",
    },
  },

  packagesPricing: {
    eyebrow: "Tarifs Clairs",
    titlePart1: "Des forfaits transparents.",
    titleItalic: "Sans frais cachés ni commission.",
    subtitle:
      "Choisissez une offre préconfigurée ou utilisez notre configurateur interactif pour choisir exactement les briques nécessaires à votre activité.",
    mostPopular: "Le Plus Populaire",
    oneTimeSetup: "Frais uniques d'installation",
    liveInAbout: "Mise en ligne en env.",
    choosePackage: "Sélectionner ce Pack",
    bottomPrompt: "Vous avez des besoins spécifiques ou des intégrations sur mesure ?",
    bottomSub: "Configurez chaque fonctionnalité et option de maintenance avec notre outil interactif.",
    openBuilder: "Ouvrir le Configurateur de Devis",
  },

  customModules: {
    eyebrow: "Modules à la Carte",
    titlePart1: "Adaptez la plateforme",
    titleItalic: "selon vos priorités.",
    subtitle:
      "Activez uniquement les modules requis pour votre lancement, et enrichissez votre plateforme au fur et à mesure de votre croissance.",
    quoteThis: "Ajouter au devis",
    configureAll: "Configurer tous les modules",
  },

  howItWorks: {
    eyebrow: "Méthodologie",
    titlePart1: "Du cadrage au lancement",
    titleItalic: "en quatre étapes maîtrisées.",
    subtitle:
      "Un processus structuré et transparent pour adapter, tester et déployer votre environnement en toute sérénité.",
    steps: {
      step1: {
        title: "1. Cadrage et Personnalisation Graphique",
        body: "Définition de vos besoins, intégration de votre charte graphique, logo, typographies et choix des passerelles de paiement.",
        result: "Livrable : Feuille de route validée et maquettes personnalisées approuvées.",
      },
      step2: {
        title: "2. Déploiement Cloud et Données Catalogue",
        body: "Installation de l'instance dans votre infrastructure cloud, configuration de vos références, tarifs et règles de livraison.",
        result: "Livrable : Plateforme opérationnelle avec votre véritable catalogue.",
      },
      step3: {
        title: "3. Recette Complète et Formation des Équipes",
        body: "Tests de paiements réels, simulation d'expéditions et prise en main de l'interface par vos collaborateurs.",
        result: "Livrable : Équipe autonome et parcours d'achat 100% opérationnel.",
      },
      step4: {
        title: "4. Mise en Production et Accompagnement",
        body: "Bascule de votre nom de domaine principal, activation de la supervision et accompagnement lors des premières commandes.",
        result: "Livrable : Boutique en direct avec 30 jours de support et correctifs inclus.",
      },
    },
  },

  faq: {
    eyebrow: "Questions Fréquentes",
    titlePart1: "Tout ce que vous devez savoir",
    titleItalic: "avant de démarrer.",
    subtitle:
      "Des réponses directes et claires sur la propriété du code, l'infrastructure, l'assistance et les coûts.",
    items: {
      sourceCode: {
        q: "Sommes-nous réellement propriétaires du code source ?",
        a1: "Oui. Vous bénéficiez d'une licence perpétuelle et irrévocable vous autorisant à utiliser, adapter et héberger l'intégralité du code source sur votre propre infrastructure.",
        a2: "Contrairement aux solutions SaaS fermées, vous n'êtes tributaire d'aucun abonnement obligatoire pour maintenir votre commerce en ligne.",
      },
      hosting: {
        q: "Où la plateforme est-elle hébergée ?",
        a: "La plateforme est déployée directement sur votre compte cloud (AWS, Scaleway, OVHcloud ou votre hébergeur de prédilection). Vous réglez vos serveurs au prix coûtant directement au fournisseur.",
      },
      customFeatures: {
        q: "Pouvez-vous réaliser des développements sur mesure pour nos spécificités ?",
        a: "Absolument. Nous proposons des forfaits d'ingénierie dédiés pour connecter votre ERP, vos logiciels logistiques régionaux ou implémenter des fonctionnalités sur mesure.",
      },
      requirements: {
        q: "De quoi avons-nous besoin pour débuter ?",
        a: "Simplement de vos éléments graphiques (logo, charte), de votre catalogue produit avec photos et tarifs, et de vos comptes auprès de vos prestataires de paiement et de transport.",
      },
      launchTime: {
        q: "Quel est le délai moyen pour être en ligne ?",
        a: "La majorité des déploiements sont entièrement finalisés et prêts à vendre sous 2 à 4 semaines, selon le volume de personnalisations demandées.",
      },
      ongoingCosts: {
        q: "Quels sont les coûts récurrents à prévoir après le lancement ?",
        a: "Uniquement vos coûts réels d'hébergement cloud et les commissions usuelles de votre passerelle bancaire. Nous proposons des contrats de maintenance optionnels si vous souhaitez nous confier la supervision.",
      },
    },
  },

  finalCta: {
    badge: "Passez à l'Action",
    titlePart1: "Prêt à posséder votre propre",
    titleItalic: "moteur de commerce indépendant ?",
    subtitle:
      "Disposez d'une infrastructure e-commerce de niveau professionnel sans les délais ni les budgets colossaux d'une création sur mesure.",
    ctaQuote: "Créer Votre Devis en Ligne",
    ctaDemo: "Voir la Démo en Direct",
    chatWithUs: "Échanger sur WhatsApp",
  },

  pricing: {
    badge: "Simulateur de Devis",
    provenAt: "Validé sur dariyo.in",
    title: "Composez votre plateforme.",
    titleItalic: "Obtenez un chiffrage immédiat et précis.",
    subtitle:
      "Choisissez une offre recommandée ou personnalisez chaque module. Calculez vos frais d'installation et vos délais de livraison estimés.",
    startWithPackage: "Choisir un pack recommandé",
    customSelection: "Sélection personnalisée de modules",
    orTickBelow: "Ou sélectionnez vos modules ci-dessous",
    popularBadge: "Recommandé",
    oneTimeBeforeGst: "Frais uniques d'installation",
    oneTimeSetup: "Frais d'installation uniques",
    includedWithSetup: "Inclus dans l'installation",
    everyMonth: "par mois",
    setupTotal: "Total Forfait d'Installation",
    monthlyTotal: "Maintenance Mensuelle Optionnelle",
    subtotal: "Sous-total",
    gstLabel: "Taxes applicables",
    noPlan: "Aucun forfait mensuel",
    hostingPaidToProviders: "L'hébergement cloud est réglé directement à votre fournisseur.",
    hostingAbout: "Coût indicatif d'infrastructure",
    paymentSchedule: "Échéancier de Paiement",
    launchTimeline: "Délai Estimé de Sortie",
    weeksEstimate: "semaines estimées",
    copyLink: "Copier le Lien du Devis",
    linkCopied: "Lien copié dans le presse-papier !",
    printQuote: "Imprimer le Devis",
    submitQuote: "Transmettre ce Devis",
    mostPopular: "Le Plus Choisi",
    liveInAbout: "En ligne en env.",
    payAsYouGo: "Support à la demande",
    anHour: "par heure",
    hoursPerMonth: "heures par mois",
    choosePackage: "Choisir ce Pack",
    pickModules: "Sélectionner des Modules",
    supportPlan: "Formule d'Assistance Technique",
    hostingTier: "Calibrage d'Hébergement Cloud",
    feesGrowthTitle: "Frais Tiers & Évolutivité",
    feesGrowthSub: "Une transparence totale sur l'ensemble des frais d'exploitation.",
    notIncludedTitle: "Prestations non incluses",
    notIncludedSub: "Éléments à la charge du client ou faisant l'objet d'un devis complémentaire.",
    modal: {
      title: "Transmettre Votre Devis",
      subtitle: "Nous analyserons vos choix et vous recontacterons sous 24 heures ouvrées.",
      nameLabel: "Nom et prénom",
      emailLabel: "Adresse email professionnelle",
      phoneLabel: "Numéro de téléphone / WhatsApp",
      companyLabel: "Nom de votre entreprise",
      requirementsLabel: "Précisions ou besoins spécifiques",
      submitButton: "Envoyer le Devis",
      submitting: "Transmission en cours...",
      successTitle: "Devis Bien Reçu !",
      successSubtitle: "Notre équipe technique prend connaissance de votre sélection et vous répond rapidement.",
      immediateResponse: "Besoin d'un retour immédiat ? Écrivez-nous sur WhatsApp.",
      doneButton: "Parfait",
    },
  },

  services: {
    badge: "Services d'Ingénierie",
    title: "Expertise technique sur mesure.",
    titleItalic: "Conçue pour durer et évoluer.",
    subtitle:
      "Au-delà de notre plateforme prête à l'emploi, nous concevons des briques sur mesure, des intégrations logicielles et mettons à disposition des profils d'ingénierie confirmés.",
    fixedProjects: "Projets au Forfait Fixe",
    staffing: "Régie Technique & Renfort d'Équipe",
    technologies: "Technologies Maîtrisées",
    inquireNow: "Échanger sur ce Service",
    perHour: "par heure",
    fullTimeRate: "Tarif mensuel temps plein",
    partTimeRate: "Tarif mensuel mi-temps",
    timeline: "Délai estimé",
    deliverables: "Livrables clés",
    modal: {
      title: "Demande d'Échange Technique",
      subtitle: "Présentez-nous votre projet et recevez une proposition chiffrée détaillée.",
      nameLabel: "Nom et prénom",
      emailLabel: "Email professionnel",
      phoneLabel: "Téléphone / WhatsApp",
      companyLabel: "Société",
      serviceLabel: "Type de prestation",
      modelLabel: "Format d'intervention",
      notesLabel: "Description du besoin ou contraintes",
      submitButton: "Envoyer la Demande",
      submitting: "Envoi en cours...",
      successTitle: "Demande Transmise !",
      successSubtitle: "Un directeur technique reviendra vers vous pour caler un premier échange.",
      doneButton: "Fermer",
    },
  },

  contact: {
    badge: "Contact",
    title: "Donnez vie à votre projet.",
    subtitle:
      "Des questions techniques sur l'architecture ou envie d'une présentation en direct ? Nous sommes à votre écoute.",
    nameLabel: "Nom",
    emailLabel: "Adresse email",
    phoneLabel: "Téléphone / WhatsApp",
    companyLabel: "Entreprise",
    messageLabel: "Votre message ou projet",
    submitButton: "Envoyer le Message",
    sending: "Envoi...",
    directChannels: "Lignes Directes",
    thankYou: "Merci pour votre message !",
    thankYouDesc: "Nous avons bien reçu votre demande et vous répondrons rapidement.",
  },

  about: {
    badge: "Genèse",
    title: "Créé sur le terrain.",
    titleItalic: "Pas dans un diaporama théorique.",
    subtitle:
      "Dariyo est le fruit d'une volonté simple : opérer un e-commerce performant sans dépendre de solutions fermées ni abandonner de marge excessive aux intermédiaires.",
    storyTitle: "Notre Vision",
    storyBody:
      "Nous sommes convaincus que chaque marque doit posséder ses propres outils, conserver la totale maîtrise de sa base clients et garder ses marges. Nous fournissons des systèmes fiables, testés et indépendants pour pérenniser votre activité.",
  },

  footer: {
    tagline: "Le moteur de commerce complet. Conçu, testé, prêt à cloner.",
    navigation: "Navigation",
    platform: "Plateforme",
    clonePricing: "Tarifs de Clonage",
    companyContact: "Contact & Entreprise",
    services: "Prestations d'Ingénierie",
    legal: "Mentions Légales",
    allRightsReserved: "Tous droits réservés.",
    noCommission: "0% de commission sur vos ventes. Votre plateforme, votre cloud, votre code.",
    priceBuilderLink: "Simulateur de Devis Interactif",
  },

  catalog: {
    ...en.catalog,
    groups: {
      core: { name: "Socle Essentiel", blurb: "Boutique, console d'administration et backend à votre image." },
      selling: { name: "Ventes & Conversion", blurb: "Espace B2B grossiste, codes avantages et gestion des remises." },
      showcase: { name: "Expérience Visuelle", blurb: "Accueil immersif 3D et visualisateurs interactifs de produit." },
      growth: { name: "Acquisition & Données", blurb: "Recherche avancée, fiches recettes et statistiques de visite." },
    },
    packages: {
      starter: { name: "Starter", blurb: "Votre boutique en ligne brandée, prête à enregistrer vos premières commandes." },
      growth: { name: "Growth", blurb: "Pour les marques en développement combinant vente grand public et partenariats B2B." },
      complete: { name: "Complete", blurb: "La plateforme intégrale : vente B2C, portail grossiste, 3D interactive et SEO." },
    },
    supportPlans: {
      none: { name: "Sans forfait mensuel", covers: ["Interventions et évolutions facturées au temps passé selon vos besoins"] },
      essential: { name: "Essential", covers: ["Mises à jour de sécurité critiques", "Supervision 24/7", "Correctifs d'anomalies prioritaires"] },
      basic: { name: "Basic", covers: ["Tout le pack Essential", "Ajustements graphiques légers et mises à jour de contenu"] },
      standard: { name: "Standard", covers: ["Tout le pack Basic", "Heures d'ingénierie dédiées chaque mois pour de nouvelles fonctionnalités"] },
    },
    hostingTiers: {
      launch: { name: "Formule Décollage", blurb: "Serveur cloud économique parfaitement adapté au démarrage d'une nouvelle boutique" },
      scale: { name: "Formule Croissance", blurb: "Infrastructure cloud haute performance pour absorber les pics de trafic réguliers" },
    },
  },

  common: {
    currency: "Devise",
    language: "Langue",
    select: "Choisir",
    selected: "Sélectionné",
    required: "Requis",
    optional: "Optionnel",
    close: "Fermer",
    submit: "Valider",
    cancel: "Annuler",
    month: "mois",
    week: "semaine",
    weeks: "semaines",
    day: "jour",
    days: "jours",
    hour: "heure",
    hours: "heures",
    loading: "Chargement en cours...",
    contactUs: "Nous Contacter",
    included: "Inclus",
  },
};

