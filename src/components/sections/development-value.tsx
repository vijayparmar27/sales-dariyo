import { ArrowRight, Check } from "lucide-react";

import { ButtonLink, CatalisBadge, SectionHeading } from "@/components/ui";
import { CUSTOM_BUILD, HOURLY_RATE, SETUP_INCLUDES } from "@/data/catalog";
import { count, lakh, rupees } from "@/lib/format";
import { packageFigures } from "@/lib/packages";

export function DevelopmentValue() {
  // The cheapest and the fullest package, priced by the quote function: this
  // card used to say "₹1.75L – ₹7.10L" and "2 to 4 weeks" as typed text, and
  // the second had never matched the 11 weeks the Complete package takes.
  const packages = packageFigures();
  const fees = packages.map((p) => p.setupFee);
  const launch = packages.map((p) => p.launchWeeks);
  const freeFixes = SETUP_INCLUDES.find((line) => line.includes("free fixes"));

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Build or buy"
          title={
            <>
              {count(CUSTOM_BUILD.hours)} hours of engineering.{" "}
              <span className="italic text-muted">Ready on day one.</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          A storefront, an admin panel, a wholesale portal and courier and payment integrations
          take a long time and a lot of money to build from nothing.
        </SectionHeading>

        <div className="grid items-stretch gap-5 lg:grid-cols-12">
          {/* Building it yourself */}
          <article className="reveal flex flex-col rounded-[28px] bg-sunken p-7 sm:p-9 lg:col-span-5">
            <CatalisBadge variant="white" className="self-start">
              Option A · build from scratch
            </CatalisBadge>
            <h3 className="mt-6 font-serif text-[2.1rem] leading-none tracking-[-0.02em] text-ink">
              Commission it from scratch
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Hire an agency or contractors to write three applications from empty repositories.
            </p>

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">Engineering</dt>
                <dd className="font-medium text-ink tabular-nums">about {count(CUSTOM_BUILD.hours)} hours</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">Cost at {rupees(HOURLY_RATE)} an hour</dt>
                <dd className="font-medium text-rose-600 tabular-nums">about {lakh(CUSTOM_BUILD.cost)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">Time to launch</dt>
                <dd className="font-medium text-ink">12 to 18 months</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">Risk</dt>
                <dd className="font-medium text-ink">New, untested code</dd>
              </div>
            </dl>

            <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">
              Delays, scope creep and payment bugs that only show up under real orders.
            </p>
          </article>

          {/* Starting from this platform */}
          <article className="reveal flex flex-col rounded-[28px] bg-[#111218] p-7 text-white sm:p-10 lg:col-span-7">
            <CatalisBadge variant="dark" className="self-start">
              Option B · start from this platform
            </CatalisBadge>
            <h3 className="mt-6 font-serif text-[2.5rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              Start from a platform that{" "}
              <span className="italic text-white/70">already runs a store.</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              You get a permanent licence to the full source code, set up in your brand on servers
              in your own name.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">Setup fee</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">
                  {rupees(Math.min(...fees))} – {rupees(Math.max(...fees))}
                </p>
                <p className="mt-1 text-xs text-white/60">One-time, before GST, by package</p>
              </div>
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">Time to launch</p>
                <p className="mt-2 text-2xl font-semibold text-[#7FD4A8] tabular-nums">
                  {Math.min(...launch)} to {Math.max(...launch)} weeks
                </p>
                <p className="mt-1 text-xs text-white/60">From kick-off, by package</p>
              </div>
            </div>

            <ul className="mt-7 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#7FB2FF]" />
                Already taking real orders, with Razorpay payments and Delhivery tracking.
              </li>
              <li className="flex items-start gap-3">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#7FB2FF]" />
                Plain TypeScript that any good developer can maintain.
              </li>
              {freeFixes ? (
                <li className="flex items-start gap-3">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#7FB2FF]" />
                  {freeFixes}.
                </li>
              ) : null}
            </ul>

            <div className="mt-auto flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-center">
              <span className="text-xs text-white/60">Months sooner, for a fraction of the cost.</span>
              <ButtonLink href="/pricing" variant="white" className="h-12 px-7 text-[15px] whitespace-nowrap">
                Work out your setup price
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
