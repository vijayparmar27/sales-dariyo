import { ArrowUpRight, Check, Mail, MessageCircle, Phone, ShieldCheck, Sparkles, Store, Terminal } from "lucide-react";
import type { Metadata } from "next";

import { CatalisBadge, buttonClass } from "@/components/ui";
import {
  GROUPS,
  HOSTING_TIERS,
  HOURLY_RATE,
  MODULES,
  NOT_INCLUDED,
  PACKAGES,
  SUPPORT_PLANS,
  USAGE_FEES,
} from "@/data/catalog";
import { rupees } from "@/lib/format";
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
  const selection = parseSelection(await searchParams);
  const quote = buildQuote(selection);
  const channels = await getContactChannels();
  const shareUrl = `${await requestOrigin()}${pricingHref(selection)}`;
  const message = quoteText(quote, shareUrl);
  const issuedOn = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const groups: GroupOption[] = GROUPS.map((group) => ({
    id: group.id,
    name: group.name,
    blurb: group.blurb,
    modules: MODULES.filter((m) => m.group === group.id).map((m) => ({
      id: m.id,
      name: m.name,
      summary: m.summary,
      includes: [...m.includes],
      price: rupees(m.setupFee),
      required: m.required === true,
      note: m.note ?? null,
    })),
  })).filter((group) => group.modules.length > 0);

  // Each package card shows its own setup price, worked out by the same
  // function as the quote rather than kept as a second figure that could
  // disagree with it.
  const packages: PackageOption[] = PACKAGES.map((pkg) => {
    const moduleIds = packageModules(pkg.id) ?? [];
    return {
      id: pkg.id,
      name: pkg.name,
      blurb: pkg.blurb,
      price: rupees(buildQuote({ ...selection, moduleIds }).setup.subtotal),
      moduleIds,
    };
  });

  const plans: ChoiceOption[] = SUPPORT_PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.monthlyFee > 0 ? `${rupees(plan.monthlyFee)} a month` : "Pay as you go",
    detail:
      plan.monthlyFee > 0
        ? `${plan.hoursPerMonth} hours a month, then ${rupees(HOURLY_RATE)} an hour`
        : `${rupees(HOURLY_RATE)} an hour`,
    covers: [...plan.covers],
  }));

  const hosting: ChoiceOption[] = HOSTING_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    price: `about ${rupees(buildQuote({ ...selection, hostingId: tier.id }).hosting.total)} a month`,
    detail: tier.blurb,
    covers: [],
  }));

  return (
    // pt-28: the site header is fixed over the page, not in its flow.
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-12 print:p-0">
      {/* Hero Header: Selling the Dariyo.in Clone */}
      <div className="max-w-3xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <CatalisBadge variant="blue">
            Turnkey Platform License
          </CatalisBadge>
          <a
            href="https://dariyo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1 text-xs font-medium text-ink hover:border-brand-blue/40 transition-colors shadow-xs"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Proven Live at <strong>dariyo.in</strong></span>
            <ArrowUpRight className="size-3 text-muted" />
          </a>
        </div>

        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
          Your own store. <br />
          <span className="italic text-brand-blue">A complete clone of Dariyo.in</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          We deploy the exact high-performance commerce system running at{" "}
          <a
            href="https://dariyo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline hover:text-brand-blue inline-flex items-center gap-0.5"
          >
            dariyo.in
            <ArrowUpRight className="size-3.5" />
          </a>
          — customized and re-engineered with <strong>your website, your brand, and your product catalog</strong>.
          Permanent source code license with zero revenue cut or recurring GMV commission.
        </p>

        {/* 4 Core Value Pillars */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🎨 Your Brand</span>
            <span className="mt-0.5 block text-muted">Your logo, colors, fonts and custom domain</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">📦 Your Products</span>
            <span className="mt-0.5 block text-muted">Loaded with your packs, categories & prices</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">⚡ Turnkey Clone</span>
            <span className="mt-0.5 block text-muted">Storefront + B2B Wholesale + Admin Console</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🛡️ 0% GMV Cut</span>
            <span className="mt-0.5 block text-muted">Permanent code license in your cloud</span>
          </div>
        </div>
      </div>

      {/* What is Inside the Clone Overview */}
      <div className="mt-12 rounded-[28px] border border-line bg-sunken p-6 sm:p-8 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
          <div>
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-ink">What is inside the Dariyo.in clone?</h2>
            <p className="text-xs text-muted">A full-stack commerce engine deployed in your own cloud infrastructure</p>
          </div>
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">Ready on Day 1</span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Store className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">1. Storefront</span>
            </div>
            <h3 className="font-semibold text-ink text-sm">Customer Store (dariyo.in clone)</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Ultra-fast Next.js 16 storefront, 3D interactive product models, mobile PWA experience, Razorpay UPI/cards, and Delhivery courier tracking.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">2. Wholesale</span>
            </div>
            <h3 className="font-semibold text-ink text-sm">B2B Trade Portal</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Dedicated wholesale portal with business accounts, tiered bulk pricing, stock holds, and Delhivery B2B freight with e-way bill automation.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="size-4 text-brand-blue shrink-0" />
              <span className="text-xs font-bold text-ink uppercase tracking-wider">3. Operations</span>
            </div>
            <h3 className="font-semibold text-ink text-sm">Operator Admin Panel</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Real-time order dispatching, product catalog editor, live visitor telemetry, Redis rate-limiting, and staff permission roles.
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
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">Turnkey Delivery Process</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              From Dariyo.in clone to your live store
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            Everything is set up on servers in your name, with complete source code ownership.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              1
            </span>
            <h3 className="font-semibold text-ink text-sm">Clone & Commercial License</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              We fork the production-ready codebases into your private repository with a permanent commercial license.
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              2
            </span>
            <h3 className="font-semibold text-ink text-sm">Rebrand & Custom Domain</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              We customize the storefront and admin panel with your logo, color palette, custom domain, and company details.
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              3
            </span>
            <h3 className="font-semibold text-ink text-sm">Load Products & Accounts</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Your product catalog and prices are pre-loaded. Razorpay, Delhivery, SMS OTP, and storage accounts are connected.
            </p>
          </div>

          <div className="rounded-2xl bg-sunken p-5 border border-line">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs mb-3">
              4
            </span>
            <h3 className="font-semibold text-ink text-sm">Launch & Operator Training</h3>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              Live handover in your cloud with full staff training on the admin panel, plus 30 days of free fixes post-launch.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Services & Dedicated Developer Staffing */}
      <section className="mt-8 rounded-[28px] border border-line bg-sunken p-8 sm:p-10 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <CatalisBadge variant="blue" className="mb-3">
              Services & Staffing
            </CatalisBadge>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              Custom Web & Mobile Development · Dedicated Developers
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
              Looking for custom web or mobile applications built to your exact specifications, or dedicated engineers to augment your team?
              We provide full-lifecycle software engineering in <strong>Node.js, React.js, FastAPI, React Native, and Next.js</strong>,
              along with dedicated developer talent on flexible engagement models.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            <a
              href="/contact"
              className={buttonClass("primary", "px-6 py-3 text-sm font-semibold")}
            >
              Talk to Our Team
            </a>
            {channels.phone ? (
              <a
                href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <Phone className="size-4 text-muted" />
                <span>Call {channels.phone}</span>
              </a>
            ) : null}
            {channels.whatsapp ? (
              <a
                href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent("Hi Dariyo Team, I'm interested in custom development services (Node.js/React/FastAPI/Mobile App) and dedicated developers.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            ) : null}
            {channels.email ? (
              <a
                href={`mailto:${channels.email}?subject=${encodeURIComponent("Custom Engineering & Developer Staffing Enquiry")}`}
                className={buttonClass("secondary", "px-4 py-3 text-sm font-semibold inline-flex items-center gap-1.5")}
              >
                <Mail className="size-4 text-muted" />
                <span>Email {channels.email}</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 print:hidden">
        <div className="rounded-[28px] bg-sunken p-7 sm:p-8">
          <h2 className="font-serif text-3xl tracking-[-0.01em]">Fees that grow with your sales</h2>
          <p className="mt-1 text-sm text-muted">Paid by you to each service, not to us.</p>
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
          <h2 className="font-serif text-3xl tracking-[-0.01em]">Not included</h2>
          <p className="mt-1 text-sm text-muted">
            Quoted separately, or arranged by you. Extra work is {rupees(HOURLY_RATE)} an hour,
            agreed before it starts.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
