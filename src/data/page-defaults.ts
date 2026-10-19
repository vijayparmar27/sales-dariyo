import type { PageContents } from "@/lib/site-types";

/**
 * What the About, Contact and Blog pages say when the site cannot ask the API
 * — `SITE_API_URL` unset (local work, a preview), or the API down with
 * nothing read since this server started.
 *
 * A mirror of `PAGE_DEFAULTS` in dryfish-backend's
 * `modules/salesSite/services/pageContent.service.ts`, which is what the
 * admin panel shows before anyone edits a page. Keep the two in step; a
 * drift only shows while the API is unreachable. No team members and no
 * testimonials, on purpose: an empty list hides its section, and invented
 * ones would be a lie next to a real business.
 */
export const PAGE_DEFAULTS: PageContents = {
  about: {
    seo: {
      title: "About us",
      description:
        "Who builds and supports the commerce platform: a storefront, an admin panel and a backend, licensed to your brand and set up on servers in your name.",
    },
    hero: {
      eyebrow: "About us",
      heading: "Discover our *journey* and what drives us",
      intro:
        "We build and license a ready-made commerce platform for brands that sell retail and wholesale: a storefront, an admin panel and a backend, set up on servers in your name.",
      primary: { label: "Build your package", href: "/pricing" },
      secondary: { label: "Contact us", href: "/contact" },
      images: [],
    },
    story: {
      visible: true,
      eyebrow: "Our story",
      statement:
        "We believe a growing brand should own its store, its data and its customers, not rent them from a marketplace that takes a cut of every sale.",
      stats: [
        { value: "3", label: "Connected apps: storefront, admin panel and backend" },
        { value: "0%", label: "Commission on your sales, ever" },
        { value: "4,180", label: "Hours of engineering already in the platform" },
      ],
      images: [],
    },
    values: {
      visible: true,
      eyebrow: "What sets us apart",
      heading: "Built for brands that want to *own* their growth",
      intro: "A platform you license once and run as your own, with the people who built it behind it.",
      items: [
        {
          icon: "lock",
          title: "You own the setup",
          text: "Servers, domain, customer records and database are in your company's name from day one, so you are never locked in.",
        },
        {
          icon: "shield",
          title: "Hardened on a live store",
          text: "The same code takes real orders, payments and courier bookings every day. You start from production, not a prototype.",
        },
        {
          icon: "store",
          title: "Retail and wholesale",
          text: "One catalogue for shoppers and trade buyers, with wholesale quotes, credit terms and GST invoices.",
        },
        {
          icon: "receipt",
          title: "Straight pricing",
          text: "A one-time setup fee for the modules you pick and an optional monthly plan. No commission on your sales.",
        },
        {
          icon: "headset",
          title: "Support that stays",
          text: "Thirty days of free fixes after launch, then a monthly plan or hourly help when you need it.",
        },
      ],
      cta: { label: "See what's included", href: "/#features" },
    },
    team: { visible: true, eyebrow: "Team", heading: "The people behind the *platform*", intro: "", members: [] },
    testimonials: { visible: true, eyebrow: "Testimonials", heading: "What our *clients* are saying", intro: "", items: [] },
    blog: {
      visible: true,
      eyebrow: "Blog and articles",
      heading: "Discover the latest *articles*",
      intro: "Guides and notes on selling online, retail and wholesale.",
    },
    cta: {
      visible: true,
      eyebrow: "Join us",
      heading: "Let's build your store on the *right foundation*",
      intro:
        "Tell us what you sell and how you sell it. We will show you the platform running and price exactly what you need.",
      primary: { label: "Contact us", href: "/contact" },
      secondary: { label: "Build your package", href: "/pricing" },
    },
  },
  contact: {
    seo: {
      title: "Contact us",
      description:
        "Ask about the commerce platform, a live demo or a quote. Tell us what you sell and we will get back to you.",
    },
    hero: {
      eyebrow: "Contact us",
      heading: "Get in *touch*",
      intro: "Tell us what you sell and how you sell it, and we will get back to you with a demo and a price.",
    },
    channels: { email: "", phone: "", whatsapp: "", address: "", hours: "", mapUrl: "" },
    socials: [],
    form: {
      fields: {
        name: { label: "Your name", placeholder: "Enter your name", enabled: true, required: true },
        email: { label: "Email address", placeholder: "Enter your email", enabled: true, required: true },
        phone: { label: "Phone or WhatsApp", placeholder: "+91 98765 43210", enabled: true, required: false },
        company: { label: "Company", placeholder: "Your brand or company", enabled: true, required: false },
        topic: { label: "What is it about?", placeholder: "Choose a topic", enabled: true, required: false },
        message: { label: "Your message", placeholder: "Write something...", enabled: true, required: true },
      },
      topics: ["Pricing and packages", "A live demo", "Custom features", "Support for my store", "Something else"],
      submitLabel: "Send message",
      successTitle: "Thank you!",
      successMessage: "Your message has reached us. We will reply to the email address you gave.",
      note: "We use these details only to reply to you.",
    },
  },
  blog: {
    seo: {
      title: "Blog",
      description:
        "Guides and notes on selling online: storefronts, wholesale, payments, shipping and running a brand's own store.",
    },
    hero: {
      eyebrow: "Blog and articles",
      heading: "Discover the latest *articles*",
      intro: "Guides and notes on selling online, from storefronts and wholesale to payments and shipping.",
      searchPlaceholder: "Search articles",
    },
    featured: { visible: true, heading: "Featured" },
    latest: {
      eyebrow: "Latest",
      heading: "Latest *articles*",
      intro: "",
      emptyText: "No articles yet. The first ones are on their way.",
    },
    related: { eyebrow: "Keep reading", heading: "Discover the latest *articles*", intro: "" },
    categories: [],
    authors: [],
    cta: {
      visible: true,
      eyebrow: "Join us",
      heading: "Ready to run your own *store*?",
      intro: "Pick the modules you need and get an itemised quote in a minute, with no commission on your sales.",
      primary: { label: "Build your package", href: "/pricing" },
      secondary: { label: "Contact us", href: "/contact" },
    },
  },
};
