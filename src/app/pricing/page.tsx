import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cloud,
  Database,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Server,
  Smartphone,
  Sparkles,
  Store,
  Terminal,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

import { CatalisBadge, buttonClass } from "@/components/ui";
import {
  GROUPS,
  HOSTING_TIERS,
  HOURLY_RATE,
  MODULES,
  PACKAGES,
  SUPPORT_PLANS,
  USAGE_FEES,
} from "@/data/catalog";
import { formatCurrency } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";
import { buildQuote } from "@/lib/quote";
import { mailHref, quoteText, requestOrigin, whatsappHref } from "@/lib/quote-message";
import { getContactChannels } from "@/lib/site-api";
import {
  packageModules,
  parseSelection,
  pricingHref,
  type SearchParams,
} from "@/lib/selection";

import {
  Configurator,
  type ChoiceOption,
  type GroupOption,
  type PackageOption,
} from "./configurator";
import { QuoteSummary, QuoteTotals } from "./quote-summary";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pick the modules you need and see the one-time setup fee, the monthly support plan and the hosting estimate.",
};

/**
 * Rendered per request from the URL: the selection is in the query string, the
 * quote is computed here, and the configurator gets back only display strings
 * plus the finished summary.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const selection = parseSelection(params);
  const { currency, t, formatMoney } = await getServerI18n(params);
  const quote = buildQuote(selection, currency);
  const channels = await getContactChannels();
  const shareUrl = `${await requestOrigin()}${pricingHref(selection)}`;
  const message = quoteText(quote, shareUrl, t);
  const issuedOn = new Intl.DateTimeFormat(currency === "INR" ? "en-IN" : "en-US", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const groups: GroupOption[] = GROUPS.map((group) => {
    const locGroup = t.catalog.groups[group.id];
    return {
      id: group.id,
      name: locGroup?.name ?? group.name,
      blurb: locGroup?.blurb ?? group.blurb,
      modules: MODULES.filter((m) => m.group === group.id).map((m) => {
        const locMod = t.catalog.modules[m.id];
        return {
          id: m.id,
          name: locMod?.name ?? m.name,
          summary: locMod?.summary ?? m.summary,
          includes: locMod?.includes ?? [...m.includes],
          price: formatMoney(m.setupFee),
          required: m.required === true,
          note: locMod?.note ?? m.note ?? null,
        };
      }),
    };
  }).filter((group) => group.modules.length > 0);

  // Each package card shows its own setup price, worked out by the same
  // function as the quote rather than kept as a second figure that could
  // disagree with it.
  const packages: PackageOption[] = PACKAGES.map((pkg) => {
    const moduleIds = packageModules(pkg.id) ?? [];
    const locPkg = t.catalog.packages[pkg.id];
    return {
      id: pkg.id,
      name: locPkg?.name ?? pkg.name,
      blurb: locPkg?.blurb ?? pkg.blurb,
      price: formatCurrency(buildQuote({ ...selection, moduleIds }, currency).setup.subtotal, currency),
      moduleIds,
    };
  });

  const plans: ChoiceOption[] = SUPPORT_PLANS.map((plan) => {
    const locPlan = t.catalog.supportPlans[plan.id];
    return {
      id: plan.id,
      name: locPlan?.name ?? plan.name,
      price: plan.monthlyFee > 0 ? `${formatMoney(plan.monthlyFee)}/${t.common.month}` : t.pricing.payAsYouGo,
      detail:
        plan.monthlyFee > 0
          ? `${plan.hoursPerMonth} ${t.pricing.hoursPerMonth}, +${formatMoney(HOURLY_RATE)} ${t.pricing.anHour}`
          : `${formatMoney(HOURLY_RATE)} ${t.pricing.anHour}`,
      covers: locPlan?.covers ?? [...plan.covers],
    };
  });

  const hosting: ChoiceOption[] = HOSTING_TIERS.map((tier) => {
    const locTier = t.catalog.hostingTiers[tier.id];
    return {
      id: tier.id,
      name: locTier?.name ?? tier.name,
      price: `~${formatCurrency(buildQuote({ ...selection, hostingId: tier.id }, currency).hosting.total, currency)}/${t.common.month}`,
      detail: locTier?.blurb ?? tier.blurb,
      covers: [],
    };
  });

  return (
    // pt-28: the site header is fixed over the page, not in its flow.
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-12 print:p-0">
      {/* Hero Header: Selling the Dariyo.in Clone */}
      <div className="max-w-3xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <CatalisBadge variant="blue">
            {t.pricing.badge}
          </CatalisBadge>
          <a
            href="https://dariyo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1 text-xs font-medium text-ink hover:border-brand-blue/40 transition-colors shadow-xs"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.pricing.provenAt}</span>
            <ArrowUpRight className="size-3 text-muted" />
          </a>
        </div>

        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
          {t.pricing.title} <br />
          <span className="italic text-brand-blue">{t.pricing.titleItalic}</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {t.pricing.subtitle}
        </p>

        {/* 4 Core Value Pillars */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🎨 {t.hero.pillarBrand}</span>
            <span className="mt-0.5 block text-muted">{t.hero.pillarBrandDesc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">📦 {t.hero.pillarProducts}</span>
            <span className="mt-0.5 block text-muted">{t.hero.pillarProductsDesc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">⚡ {t.hero.pillarTurnkey}</span>
            <span className="mt-0.5 block text-muted">{t.hero.pillarTurnkeyDesc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🛡️ {t.hero.pillarCommission}</span>
            <span className="mt-0.5 block text-muted">{t.hero.pillarCommissionDesc}</span>
          </div>
        </div>

        {/* Core Technologies Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider mr-1">
            {t.services.technologies}:
          </span>
          {[
            "Node.js",
            "React.js",
            "FastAPI",
            "React Native",
            "Next.js 16",
            "TypeScript",
            "Tailwind CSS",
            "MongoDB",
            "Redis",
            "Docker",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-lg border border-line bg-card px-2.5 py-1 text-xs font-medium text-ink shadow-2xs hover:border-brand-blue/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          <a
            href="#technologies"
            className="text-xs font-semibold text-brand-blue hover:underline ml-1 inline-flex items-center gap-0.5"
          >
            {t.pricing.techSection.title} &darr;
          </a>
        </div>
      </div>

      {/* What is Inside the Clone Overview */}
      <div className="mt-12 rounded-[28px] border border-line bg-sunken p-6 sm:p-8 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
          <div>
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-ink">{t.pricing.cloneOverview.title}</h2>
            <p className="text-xs text-muted">{t.pricing.cloneOverview.subtitle}</p>
          </div>
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{t.pricing.cloneOverview.readyBadge}</span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Store className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">{t.pricing.cloneOverview.storefront.title}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.cloneOverview.storefront.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">{t.pricing.cloneOverview.wholesale.title}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.cloneOverview.wholesale.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">{t.pricing.cloneOverview.operations.title}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.cloneOverview.operations.desc}
            </p>
          </div>
        </div>
      </div>

      <Configurator
        selection={selection}
        groups={groups}
        packages={packages}
        plans={plans}
        hosting={hosting}
        summary={
          <QuoteSummary
            quote={quote}
            shareUrl={shareUrl}
            whatsappHref={whatsappHref(message, channels.whatsapp)}
            mailHref={mailHref(message, channels.email)}
            channels={channels}
            issuedOn={issuedOn}
          />
        }
        totals={<QuoteTotals quote={quote} />}
      />

      {/* 4-Step Onboarding Roadmap */}
      <section className="mt-16 rounded-[28px] border border-line bg-card p-8 sm:p-10 shadow-xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{t.pricing.deliveryRoadmap.eyebrow}</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.pricing.deliveryRoadmap.title}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.pricing.deliveryRoadmap.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              1
            </span>
            <h3 className="font-semibold text-ink text-sm">{t.pricing.deliveryRoadmap.steps.s1.title}</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.deliveryRoadmap.steps.s1.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              2
            </span>
            <h3 className="font-semibold text-ink text-sm">{t.pricing.deliveryRoadmap.steps.s2.title}</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.deliveryRoadmap.steps.s2.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              3
            </span>
            <h3 className="font-semibold text-ink text-sm">{t.pricing.deliveryRoadmap.steps.s3.title}</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.deliveryRoadmap.steps.s3.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              4
            </span>
            <h3 className="font-semibold text-ink text-sm">{t.pricing.deliveryRoadmap.steps.s4.title}</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {t.pricing.deliveryRoadmap.steps.s4.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Technologies & Modern Architecture Section */}
      <section id="technologies" className="mt-16 rounded-[28px] border border-line bg-card p-8 sm:p-10 shadow-xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CatalisBadge variant="blue">
                {t.pricing.techSection.eyebrow}
              </CatalisBadge>
              <span className="text-xs font-semibold text-muted font-mono uppercase tracking-wider">{t.pricing.techSection.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.pricing.techSection.title}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.pricing.techSection.subtitle}
          </p>
        </div>

        {/* 6 Technology Architecture Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. Frontend & Storefront */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Globe className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Web & Storefront
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">Next.js 16 & React 19</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Server-rendered storefront with instant edge routing, responsive Tailwind CSS v4 styling, and interactive 3D product visuals.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Next.js 16", "React 19", "Tailwind CSS v4", "Three.js", "GSAP"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>App Router & Server Components (RSC)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>95+ Google Lighthouse SEO & speed score</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Interactive 3D model pack viewer</span>
              </li>
            </ul>
          </div>

          {/* 2. Cross-Platform Mobile Apps */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Smartphone className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Mobile Apps
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">React Native & Expo</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Native iOS and Android mobile store apps with unified business logic, push notifications, and direct publishing to App Store & Google Play.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["React Native", "Expo SDK", "iOS", "Android", "Push Notifications"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Single unified codebase for iOS & Android</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Offline catalog caching & persistent cart</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Biometric login & native checkout flow</span>
              </li>
            </ul>
          </div>

          {/* 3. Backend & Microservices */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Server className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Backend & APIs
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">Node.js & FastAPI (Python)</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Type-safe Node.js Express 5 API server for orders and inventory, paired with high-performance Python FastAPI microservices for computing.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Node.js", "FastAPI (Python)", "Express 5", "TypeScript", "Socket.IO"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Strict Zod runtime request validation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Real-time WebSocket live order updates</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>HMAC-SHA256 verified webhook security</span>
              </li>
            </ul>
          </div>

          {/* 4. Database & Caching */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Database className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Data & Cache
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">MongoDB Atlas & Redis</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Flexible document database for complex product variants and customer orders, backed by in-memory Redis for sub-millisecond responses.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["MongoDB Atlas", "Redis", "Redis Streams", "Automated Backups"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Distributed stock reservation locks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Sub-millisecond product caching in Redis</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Token rate-limiting protecting against abuse</span>
              </li>
            </ul>
          </div>

          {/* 5. DevOps & Cloud Deployment */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Cloud className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Cloud & Security
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">Docker & AWS / Cloud</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Containerized deployment ready for AWS, DigitalOcean, Hetzner, or private VPS with Cloudflare DDoS defense and edge caching.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Docker", "AWS", "Cloudflare", "GitHub Actions", "AES-256"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Single-command Docker container startup</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>100% hosted in your own cloud account</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>AES-256-GCM encryption for credentials at rest</span>
              </li>
            </ul>
          </div>

          {/* 6. Commerce Gateways */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Zap className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted bg-card px-2 py-0.5 rounded-md border border-line">
                  Integrations
                </span>
              </div>
              <h3 className="font-semibold text-ink text-base">Razorpay & Delhivery</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Pre-wired Indian commerce infrastructure for instant UPI, automated courier dispatch, live tracking, and mobile SMS OTP authentication.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Razorpay UPI", "Delhivery Logistics", "Firebase Auth", "SMS OTP"].map((t) => (
                  <span key={t} className="rounded-md bg-card border border-line px-2 py-0.5 text-[11px] font-medium text-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-muted border-t border-line/60 pt-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Native UPI intent (PhonePe, GPay, Paytm)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Delhivery automated AWB & B2B freight</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>Phone SMS OTP & Google 1-tap sign-in</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dedicated Developer Staffing & Custom Engineering Section */}
      <section className="mt-8 rounded-[28px] border border-line bg-sunken p-8 sm:p-10 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-line">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CatalisBadge variant="blue">
                {t.services.badge}
              </CatalisBadge>
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{t.services.staffing}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.pricing.staffingBanner.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
              {t.pricing.staffingBanner.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            <a
              href="/services"
              className={buttonClass("primary", "px-6 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
            >
              <span>{t.pricing.staffingBanner.ctaHub}</span>
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/contact"
              className={buttonClass("secondary", "px-5 py-3 text-sm font-semibold")}
            >
              {t.pricing.staffingBanner.ctaTalk}
            </a>
            {channels.phone ? (
              <a
                href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <Phone className="size-4 text-muted" />
                <span>{t.pricing.staffingBanner.ctaCall} {channels.phone}</span>
              </a>
            ) : null}
            {channels.whatsapp ? (
              <a
                href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent("Hi Dariyo Team, I'm interested in dedicated developers and custom engineering services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>{t.pricing.staffingBanner.ctaWhatsApp}</span>
              </a>
            ) : null}
            {channels.email ? (
              <a
                href={`mailto:${channels.email}?subject=${encodeURIComponent("Custom Engineering & Developer Staffing Enquiry")}`}
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <Mail className="size-4 text-muted" />
                <span>{t.pricing.staffingBanner.ctaEmail}</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* 5 Developer Roles Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-xs">
          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="inline-block rounded-md bg-brand-blue/10 text-brand-blue font-mono font-bold text-[10px] px-2 py-0.5 mb-2">
              NODE.JS
            </span>
            <h4 className="font-semibold text-ink text-sm">{t.services.roles["nodejs-dev"]?.title ?? "Node.js Architect"}</h4>
            <p className="mt-1 text-muted leading-relaxed">
              {t.services.roles["nodejs-dev"]?.summary ?? "APIs and microservices"}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="inline-block rounded-md bg-brand-blue/10 text-brand-blue font-mono font-bold text-[10px] px-2 py-0.5 mb-2">
              REACT / NEXT.JS
            </span>
            <h4 className="font-semibold text-ink text-sm">{t.services.roles["react-nextjs-dev"]?.title ?? "Frontend Engineer"}</h4>
            <p className="mt-1 text-muted leading-relaxed">
              {t.services.roles["react-nextjs-dev"]?.summary ?? "Storefronts and web apps"}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="inline-block rounded-md bg-brand-blue/10 text-brand-blue font-mono font-bold text-[10px] px-2 py-0.5 mb-2">
              FASTAPI (PYTHON)
            </span>
            <h4 className="font-semibold text-ink text-sm">{t.services.roles["fastapi-dev"]?.title ?? "Backend Specialist"}</h4>
            <p className="mt-1 text-muted leading-relaxed">
              {t.services.roles["fastapi-dev"]?.summary ?? "High-performance data APIs"}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="inline-block rounded-md bg-brand-blue/10 text-brand-blue font-mono font-bold text-[10px] px-2 py-0.5 mb-2">
              REACT NATIVE
            </span>
            <h4 className="font-semibold text-ink text-sm">{t.services.roles["react-native-dev"]?.title ?? "Mobile App Engineer"}</h4>
            <p className="mt-1 text-muted leading-relaxed">
              {t.services.roles["react-native-dev"]?.summary ?? "iOS and Android apps"}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="inline-block rounded-md bg-brand-blue/10 text-brand-blue font-mono font-bold text-[10px] px-2 py-0.5 mb-2">
              FULL-STACK
            </span>
            <h4 className="font-semibold text-ink text-sm">{t.services.roles["fullstack-engineer"]?.title ?? "Full-Stack Lead"}</h4>
            <p className="mt-1 text-muted leading-relaxed">
              {t.services.roles["fullstack-engineer"]?.summary ?? "End-to-end commerce features"}
            </p>
          </div>
        </div>

        {/* 3 Flexible Engagement Models */}
        <div className="mt-6 rounded-2xl bg-card/80 border border-line p-5">
          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink block">{t.services.engagement["full-time"]?.title ?? "Dedicated Full-Time"}</span>
                <span className="text-muted">{t.services.engagement["full-time"]?.description ?? "160 hours/month"}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink block">{t.services.engagement["part-time"]?.title ?? "Dedicated Part-Time"}</span>
                <span className="text-muted">{t.services.engagement["part-time"]?.description ?? "80 hours/month"}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink block">{t.services.engagement["squad"]?.title ?? "Dedicated Engineering Squad"}</span>
                <span className="text-muted">{t.services.engagement["squad"]?.description ?? "Multi-disciplinary team"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 print:hidden">
        <div className="rounded-[28px] bg-sunken p-7 sm:p-8">
          <h2 className="font-serif text-3xl tracking-[-0.01em]">{t.pricing.feesGrowthTitle}</h2>
          <p className="mt-1 text-sm text-muted">{t.pricing.feesGrowthSub}</p>
          <ul className="mt-4 space-y-3 text-sm">
            {USAGE_FEES.map((fee) => (
              <li key={fee.name}>
                <span className="font-semibold">{fee.name}</span>
                <span className="block text-muted">{fee.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] bg-sunken p-7 sm:p-8">
          <h2 className="font-serif text-3xl tracking-[-0.01em]">{t.pricing.notIncludedTitle}</h2>
          <p className="mt-1 text-sm text-muted">
            {t.pricing.notIncludedSub} ({formatMoney(HOURLY_RATE)} {t.pricing.anHour}).
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
            {t.catalog.notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
