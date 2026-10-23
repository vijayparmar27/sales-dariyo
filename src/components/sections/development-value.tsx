import { ArrowRight, Check } from "lucide-react";

import { ButtonLink, CatalisBadge, SectionHeading } from "@/components/ui";
import { CUSTOM_BUILD, HOURLY_RATE, LICENCE, SETUP_INCLUDES } from "@/data/catalog";
import { count } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";

export async function DevelopmentValue() {
  const { formatMoney, formatLarge, currency } = await getServerI18n();
  const packages = packageFigures();
  const fees = packages.map((p) => p.setupFee);
  const launch = packages.map((p) => p.launchWeeks);

  return (
    <section className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Build vs start here"
          title={
            <>
              What you save by starting from a{" "}
              <span className="italic text-muted">finished platform.</span>
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
                <dt className="text-muted">Cost at {formatMoney(HOURLY_RATE)} an hour</dt>
                <dd className="font-medium text-rose-600 tabular-nums">about {formatLarge(CUSTOM_BUILD.cost)}</dd>
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
                  {formatMoney(Math.min(...fees))} – {formatMoney(Math.max(...fees))}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {currency === "INR" ? "One-time, before GST, by package" : "One-time setup, by package"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">Time to launch</p>
                <p className="mt-2 text-2xl font-semibold text-[#7FD4A8] tabular-nums">
                  {Math.min(...launch)} to {Math.max(...launch)} weeks
                </p>
                <p className="mt-1 text-xs text-white/60">From kick-off, by package</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xs font-medium tracking-[0.14em] text-white/60 uppercase">
                What the setup includes
              </p>
              <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2 sm:text-sm">
                {SETUP_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/85">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                      <Check aria-hidden className="size-2.5" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
              <p className="text-xs text-white/60">{LICENCE}</p>
              <ButtonLink href="/pricing" variant="white" className="h-11 shrink-0 px-6 text-sm">
                Build your quote
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
