import { ArrowRight, Check, ExternalLink, LayoutDashboard, Server, ShieldCheck, Store } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink, ExternalButton, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import {
  CUSTOM_BUILD,
  DEFAULT_SELECTION,
  GST,
  HOSTING_TIERS,
  HOURLY_RATE,
  LICENCE,
  MODULES,
  PACKAGES,
  SETUP_INCLUDES,
  SUPPORT_PLANS,
} from "@/data/catalog";
import { count, lakh, rupees, weeks } from "@/lib/format";
import { buildQuote } from "@/lib/quote";
import { packageModules, pricingHref, type Selection } from "@/lib/selection";

const APPS = [
  {
    icon: Store,
    title: "Online store",
    points: [
      "Product pages with pack sizes, photos, 3D and video",
      "Checkout with saved addresses, map pin and pincode check",
      "Razorpay (UPI, cards, net banking) and cash on delivery",
      "Sign-in with Google, mobile number or email",
      "Live order tracking, returns and GST invoices to download",
      "Installs on phones like an app",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Admin panel",
    points: [
      "Products, pack sizes, categories, stock and warehouses",
      "Orders, refunds, GST invoices and credit notes",
      "Shipments, courier pickups and tracking",
      "Wholesale requests, quotes and payments",
      "Staff accounts with roles and permissions",
      "Sales and visitor reports",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    points: [
      "One source of truth for prices, stock and orders",
      "Unpaid orders cancelled and stock released on their own",
      "Parcel tracking kept current from courier scans",
      "Payment and courier webhooks verified by signature",
      "Rate limits and flood protection behind Cloudflare",
      "Payment and courier keys stored encrypted",
    ],
  },
];

const STACK = [
  {
    layer: "Online store",
    tech: "Next.js 16, React 19, Tailwind CSS 4",
    why: "Fast pages that rank on Google and refresh the moment you change a price",
  },
  {
    layer: "3D and motion",
    tech: "Three.js (React Three Fiber), GSAP",
    why: "A 3D home page and product views that stay smooth on phones",
  },
  {
    layer: "Admin panel",
    tech: "Next.js, TanStack Query and Table, React Hook Form, Zod",
    why: "Quick tables and checked forms for the day-to-day work",
  },
  {
    layer: "Backend",
    tech: "Node.js, Express 5, TypeScript",
    why: "Every price and stock rule in one place, so store and admin never disagree",
  },
  {
    layer: "Data and live updates",
    tech: "MongoDB Atlas, Redis, Socket.IO",
    why: "Flexible catalogue and orders; tracking and messages without refreshing",
  },
  {
    layer: "Payments and delivery",
    tech: "Razorpay, Delhivery",
    why: "Indian payments and shipping, confirmed by webhooks",
  },
  {
    layer: "Sign-in",
    tech: "Firebase Authentication",
    why: "Google, mobile number or email sign-in",
  },
  {
    layer: "Security and deployment",
    tech: "Cloudflare, Docker, AES-256-GCM",
    why: "DDoS protection, one-container deploys and encrypted keys",
  },
];

const STEPS = [
  { title: "Build your price", body: "Pick modules on the pricing page and send us the quote." },
  {
    title: "Kick-off",
    body: "We agree the plan, take the first payment and collect your logo, colours and products.",
  },
  {
    title: "Set up and connect",
    body: "We deploy on servers in your name and connect Razorpay, Delhivery and sign-in.",
  },
  {
    title: "Launch and support",
    body: "You go live, we fix anything for 30 days, then your support plan takes over.",
  },
];

export default function HomePage() {
  const base = {
    planId: DEFAULT_SELECTION.planId,
    hostingId: DEFAULT_SELECTION.hostingId,
  };
  const packages = PACKAGES.map((pkg) => {
    const selection: Selection = { ...base, moduleIds: packageModules(pkg.id) ?? [] };
    return { ...pkg, quote: buildQuote(selection), href: pricingHref(selection) };
  });
  const paidPlanFees = SUPPORT_PLANS.filter((p) => p.monthlyFee > 0).map((p) => p.monthlyFee);
  const cheapestPlan = paidPlanFees.length > 0 ? Math.min(...paidPlanFees) : null;
  const hostingTotals = HOSTING_TIERS.map((tier) => ({
    name: tier.name,
    total: buildQuote({ ...base, moduleIds: [], hostingId: tier.id }).hosting.total,
  }));
  const growth = packages.find((p) => p.id === "growth") ?? packages[0];
  const fastest = packages[0];
  const slowest = packages.at(-1);
  const addOns = MODULES.filter((m) => !m.required);
  const showcase = site.showcase.enabled ? site.showcase : null;

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-24">
        <div>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            For food brands that sell retail and wholesale
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your own online store, wholesale portal and admin panel
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
            {showcase
              ? `The platform that runs ${showcase.name}, licensed to your brand and set up on your own servers. `
              : "A complete commerce platform, licensed to your brand and set up on your own servers. "}
            One setup fee, then a monthly support plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/pricing">
              Build your price
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            {showcase ? (
              <ExternalButton href={showcase.url} variant="secondary">
                See {showcase.name} live
                <ExternalLink aria-hidden className="size-4" />
              </ExternalButton>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold">Packages</p>
          <p className="text-xs text-muted">
            {GST.enabled ? "One-time setup, before GST" : "One-time setup"}
          </p>
          <ul className="mt-4 divide-y divide-line">
            {packages.map((pkg) => (
              <li key={pkg.id}>
                <Link
                  href={pkg.href}
                  className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span>
                    <span className="font-semibold">{pkg.name}</span>
                    <span className="block text-sm text-muted">{pkg.blurb}</span>
                  </span>
                  <span className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap tabular-nums">
                    {rupees(pkg.quote.setup.subtotal)}
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-muted transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-line pt-4 text-sm text-muted">
            {cheapestPlan === null ? "" : `Support plans from ${rupees(cheapestPlan)} a month. `}
            Hosting is billed to you by each provider, from about{" "}
            {rupees(hostingTotals[0]?.total ?? 0)} a month.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          <Stat value="3 apps" label="Store, admin panel and backend" />
          <Stat value="2.7 lakh" label="lines of TypeScript" />
          <Stat value={`${count(CUSTOM_BUILD.hours)} hours`} label="to build it from scratch" />
          <Stat
            value={weeks(growth?.quote.launchWeeks ?? 0)}
            label={`to launch the ${growth?.name ?? "Growth"} package`}
          />
        </dl>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="What you get" title="Three apps that work as one">
          A store for shoppers and trade buyers, an admin panel for your team, and one backend that
          keeps prices, stock and orders right.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {APPS.map((app) => (
            <div key={app.title} className="rounded-3xl border border-line bg-card p-6">
              <app.icon aria-hidden className="size-6 text-accent" />
              <h3 className="mt-4 text-lg font-semibold">{app.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {app.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Modules" title="Add only what you need">
          Every store starts with the core. Add wholesale, 3D or search pages when you want them,
          now or later.
        </SectionHeading>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((m) => (
            <li key={m.id} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">{m.name}</h3>
                <span className="text-sm font-semibold whitespace-nowrap tabular-nums">
                  {rupees(m.setupFee)}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{m.summary}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/pricing"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
        >
          Pick modules and see your price
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="How it works" title="From quote to launch" />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-line bg-card p-6">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-24 sm:px-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-card p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Every setup includes</h2>
          <ul className="mt-6 space-y-3">
            {SETUP_INCLUDES.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-accent p-8 text-accent-ink">
          <ShieldCheck aria-hidden className="size-7" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Your copy, your servers</h2>
          <p className="mt-4 text-pretty opacity-90">{LICENCE}</p>
          <p className="mt-4 text-pretty opacity-90">
            Your domain, servers, database and payment accounts are in your name from day one.
          </p>
        </div>
      </section>

      <section id="technology" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Technology" title="Built on tools any developer knows">
          All TypeScript on current open-source tools, with no licence fees, so your own team or
          any JavaScript developer can work on it.
        </SectionHeading>
        <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-card">
          <dl className="divide-y divide-line">
            {STACK.map((row) => (
              <div key={row.layer} className="grid gap-1 p-5 md:grid-cols-[12rem_1fr_1.2fr] md:gap-6">
                <dt className="font-semibold">{row.layer}</dt>
                <dd className="text-sm">{row.tech}</dd>
                <dd className="text-sm text-muted">{row.why}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-8 rounded-3xl border border-line bg-card p-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Built from scratch, this platform took {count(CUSTOM_BUILD.hours)} hours
            </h2>
            <p className="mt-4 text-pretty text-muted">
              That is about {lakh(CUSTOM_BUILD.cost)} of development at {rupees(HOURLY_RATE)} an
              hour. You start from the finished, tested version for a one-time setup fee.
            </p>
          </div>
          <div className="md:justify-self-end">
            <ButtonLink href="/pricing">
              See your price
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          <Faq question="Who owns the code?">
            {LICENCE} Your servers, domain and data are in your name from day one.
          </Faq>
          <Faq question="Is hosting included?">
            No. Servers, database and storage are billed to you by each provider:{" "}
            {hostingTotals
              .map((tier) => `about ${rupees(tier.total)} a month on the ${tier.name} estimate`)
              .join(", and ")}
            .
          </Faq>
          <Faq question="Can you add features we need?">
            Yes. Work outside the modules is {rupees(HOURLY_RATE)} an hour, quoted before it
            starts, or comes out of your support plan&apos;s hours.
          </Faq>
          <Faq question="What do we need to provide?">
            Your logo and colours, product photos and details, and accounts with Razorpay,
            Delhivery and Firebase. We help you open them.
          </Faq>
          <Faq question="How long does setup take?">
            About {weeks(fastest?.quote.launchWeeks ?? 0)} for {fastest?.name} and about{" "}
            {weeks(slowest?.quote.launchWeeks ?? 0)} for {slowest?.name}, from kick-off.
          </Faq>
          <Faq question="Does it suit products other than food?">
            It is built for packaged goods sold by pack size, retail and wholesale, and food brands
            fit it best. Tell us what you sell and we will say plainly whether it fits.
          </Faq>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-page sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">See your price in a minute</h2>
            <p className="mt-2 opacity-80">Tick the modules you want and send us the quote.</p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-page px-5 py-2.5 text-sm font-semibold text-ink hover:opacity-90"
          >
            Build your price
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  // The label comes first for a screen reader ("lines of TypeScript: 2.7
  // lakh") and second on screen, under the big number.
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-sm text-muted">{label}</dt>
      <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</dd>
    </div>
  );
}

function Faq({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="group py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
        {question}
        <span aria-hidden className="text-xl text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-pretty text-muted">{children}</p>
    </details>
  );
}
