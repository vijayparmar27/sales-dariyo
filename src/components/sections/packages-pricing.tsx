import { ArrowRight, Check } from "lucide-react";

import { ButtonLink, SectionHeading, SkyPanel } from "@/components/ui";
import { GST, HOSTING_TIERS, HOURLY_RATE, SUPPORT_PLANS } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { weeks } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";
import { buildQuote } from "@/lib/quote";

/** The package the cards point buyers to; it gets the dark card and the badge. */
const FEATURED = "growth";

export async function PackagesPricing() {
  const { currency, formatMoney } = await getServerI18n();
  const packages = packageFigures();
  const cheapestPlan = Math.min(...SUPPORT_PLANS.filter((p) => p.monthlyFee > 0).map((p) => p.monthlyFee));
  const launchTier = HOSTING_TIERS[0];
  const hostingFrom = launchTier
    ? buildQuote({ moduleIds: [], planId: "none", hostingId: launchTier.id }).hosting.total
    : null;

  const isDomestic = currency === "INR";

  return (
    <section id="pricing" className="scroll-mt-24 px-3 py-3">
      <SkyPanel tone="deep" className="px-4 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pricing"
            badgeVariant="white"
            tone="light"
            title={
              <>
                Simple, transparent <span className="italic">pricing.</span>
              </>
            }
            align="center"
            className="mb-14"
          >
            A one-time setup fee for your licence and launch, then an optional monthly support
            plan. No commission on your sales, ever.
          </SectionHeading>

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {packages.map((pkg, index) => {
              const featured = pkg.id === FEATURED;
              const previous = index > 0 ? packages[index - 1] : undefined;
              const added = previous
                ? pkg.modules.filter((m) => !previous.modules.some((p) => p.id === m.id))
                : [];
              const core = pkg.modules.find((m) => m.required);

              return (
                <article
                  key={pkg.id}
                  className={cn(
                    "reveal flex flex-col rounded-[28px] p-7 sm:p-8",
                    featured ? "bg-[#111218] text-white shadow-2xl lg:-my-3 lg:py-11" : "bg-white text-ink",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-4xl leading-none tracking-[-0.02em]">{pkg.name}</h3>
                    {featured ? (
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <p className={cn("mt-3 min-h-10 text-sm leading-relaxed", featured ? "text-white/70" : "text-muted")}>
                    {pkg.blurb}
                  </p>

                  <div className={cn("mt-6 border-y py-5", featured ? "border-white/15" : "border-line")}>
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">{formatMoney(pkg.setupFee)}</span>
                      <span className={cn("text-xs", featured ? "text-white/60" : "text-muted")}>
                        {isDomestic && GST.enabled ? `+ ${GST.percent}% GST` : "one-time"}
                      </span>
                    </p>
                    <p className={cn("mt-1.5 text-xs", featured ? "text-white/60" : "text-muted")}>
                      One-time setup · live in about {weeks(pkg.launchWeeks)}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm">
                    {previous ? (
                      <li className="font-medium">Everything in {previous.name}, plus:</li>
                    ) : null}
                    {(previous ? added.map((m) => ({ key: m.id, text: m.name, sub: m.summary })) : (core?.includes ?? []).map((line) => ({ key: line, text: line, sub: null }))).map(
                      (item) => (
                        <li key={item.key} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                              featured ? "bg-white text-ink" : "bg-[#111218] text-white",
                            )}
                          >
                            <Check aria-hidden className="size-3" strokeWidth={3} />
                          </span>
                          <span className="leading-snug">
                            {item.text}
                            {item.sub ? (
                              <span className={cn("mt-0.5 block text-xs", featured ? "text-white/60" : "text-muted")}>
                                {item.sub}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href={`/pricing?pkg=${pkg.id}`}
                      variant={featured ? "white" : "primary"}
                      className="h-12 w-full text-[15px]"
                    >
                      Choose {pkg.name}
                      <ArrowRight aria-hidden className="size-4" />
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-white p-6 text-ink shadow-xl sm:p-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h3 className="text-base font-semibold">Want different modules, or to see the monthly costs?</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Support plans start at {formatMoney(cheapestPlan)} a month, or pay {formatMoney(HOURLY_RATE)} an
                hour as you go.
                {hostingFrom !== null
                  ? ` Hosting is billed to you by each provider, from about ${formatMoney(hostingFrom)} a month.`
                  : null}
              </p>
            </div>
            <ButtonLink href="/pricing" variant="primary" className="h-12 shrink-0 px-6 text-[15px] whitespace-nowrap">
              Open the price builder
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </SkyPanel>
    </section>
  );
}
