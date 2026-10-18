import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";

import { ButtonLink, SectionHeading } from "@/components/ui";
import { CUSTOM_BUILD, HOURLY_RATE } from "@/data/catalog";
import { count, lakh, rupees } from "@/lib/format";

export function DevelopmentValue() {
  return (
    <section className="py-24 sm:py-32 bg-sunken/40 border-y border-line/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Build vs. Buy Equation"
          title={
            <>
              {count(CUSTOM_BUILD.hours)} Hours of Engineering.{" "}
              <span className="italic font-serif font-normal text-muted">
                Ready on Day One.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          Building a multi-application commerce platform with custom storefront, wholesale quotation engine, carrier APIs, and operations panel from scratch requires immense time and capital.
        </SectionHeading>

        {/* Comparison Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Card A: Building from Scratch (Traditional Agency) */}
          <div className="lg:col-span-5 rounded-3xl border border-line bg-card p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Option A: Scratch Build
                </span>
                <Clock className="size-5 text-muted" />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                Commissioning From Scratch
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                Hiring an agency or dedicated software contractors to build 3 custom applications from blank repositories.
              </p>

              <div className="mt-8 space-y-4 border-y border-line/80 py-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Estimated Engineering</span>
                  <span className="font-bold text-ink tabular-nums">~{count(CUSTOM_BUILD.hours)} hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Developer Cost (at {rupees(HOURLY_RATE)}/hr)</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">~{lakh(CUSTOM_BUILD.cost)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Delivery Timeline</span>
                  <span className="font-bold text-ink">12 to 18 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Production Risk</span>
                  <span className="font-bold text-ink">High (Untested code)</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted leading-relaxed">
              Frequent delays, unexpected scope creep, and payment integration bugs under real transaction loads.
            </p>
          </div>

          {/* Card B: Ready Platform Setup (The Winning Foundation) */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-accent bg-card p-8 sm:p-10 flex flex-col justify-between shadow-xl ring-4 ring-accent/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent text-accent-ink px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
                  Option B: Our Ready Platform
                </span>
                <Sparkles className="size-5 text-accent-ink" />
              </div>

              <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                Start From the Tested, Production Foundation
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
                You receive a permanent license to the complete, production-hardened source code, customized with your brand identity and deployed in your cloud accounts.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-line bg-sunken/60 p-4">
                  <p className="text-xs font-semibold text-muted uppercase">Setup Investment</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink tabular-nums">
                    ₹1.75L – ₹7.10L
                  </p>
                  <p className="text-xs text-muted mt-1">One-time fee · Full code license</p>
                </div>

                <div className="rounded-2xl border border-line bg-sunken/60 p-4">
                  <p className="text-xs font-semibold text-muted uppercase">Launch Timeline</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-600 tabular-nums">
                    2 to 4 Weeks
                  </p>
                  <p className="text-xs text-muted mt-1">From kickoff to first order</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-ink/90">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 shrink-0" />
                  <span>Battle-tested with real orders, Delhivery tracking, and Razorpay webhooks.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 shrink-0" />
                  <span>All code in standard TypeScript that any developer can maintain.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 shrink-0" />
                  <span>30 days of included warranty bug fixes after launch.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-line/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-muted">
                Save months of development time and over ₹30 Lakhs in initial capital.
              </span>
              <ButtonLink href="/pricing" variant="primary" className="whitespace-nowrap px-6 py-3 font-bold text-sm">
                Calculate Your Setup Price
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
