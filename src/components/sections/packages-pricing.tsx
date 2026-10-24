import { ArrowRight, Check } from "lucide-react";

import { CardTilt3D } from "@/components/animation/card-tilt-3d";
import { ButtonLink, SectionHeading, SkyPanel } from "@/components/ui";
import { GST, HOSTING_TIERS } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { weeks } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";
import { buildQuote } from "@/lib/quote";

/** The package the cards point buyers to; it gets the dark card and the badge. */
const FEATURED = "growth";

export async function PackagesPricing() {
  const { currency, formatMoney, t } = await getServerI18n();
  const packages = packageFigures();
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
            eyebrow={t.packagesPricing.eyebrow}
            badgeVariant="white"
            tone="light"
            title={
              <>
                {t.packagesPricing.titlePart1} <span className="italic">{t.packagesPricing.titleItalic}</span>
              </>
            }
            align="center"
            className="mb-14"
          >
            {t.packagesPricing.subtitle}
          </SectionHeading>

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {packages.map((pkg, index) => {
              const featured = pkg.id === FEATURED;
              const previous = index > 0 ? packages[index - 1] : undefined;
              const pkgName = t.catalog.packages[pkg.id]?.name || pkg.name;
              const pkgBlurb = t.catalog.packages[pkg.id]?.blurb || pkg.blurb;
              const prevName = previous ? (t.catalog.packages[previous.id]?.name || previous.name) : "";
              const added = previous
                ? pkg.modules.filter((m) => !previous.modules.some((p) => p.id === m.id))
                : [];
              const core = pkg.modules.find((m) => m.required);
              const coreIncludes = t.catalog.modules.core?.includes || core?.includes || [];

              const staggers = ["stagger-1", "stagger-2", "stagger-3"];
              return (
                <div key={pkg.id} className={cn("reveal", staggers[index], featured && "lg:-my-3")}>
                  <CardTilt3D
                    maxTilt={featured ? 7 : 8}
                    glare
                    glareOpacity={featured ? 0.18 : 0.22}
                    className={cn(
                      "flex h-full flex-col rounded-[28px] p-7 sm:p-8 cursor-default",
                      featured
                        ? "card-lift-dark bg-[#111218] text-white shadow-2xl lg:py-11 border border-white/10 hover:border-white/30"
                        : "card-lift bg-white text-ink shadow-sm border border-transparent hover:border-brand-blue/20",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 translate-z-30">
                      <h3 className="font-serif text-4xl leading-none tracking-[-0.02em]">{pkgName}</h3>
                      {featured ? (
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase shadow-md animate-pulse-subtle">
                          {t.packagesPricing.mostPopular}
                        </span>
                      ) : null}
                    </div>
                    <p className={cn("mt-3 min-h-10 text-sm leading-relaxed translate-z-10", featured ? "text-white/70" : "text-muted")}>
                      {pkgBlurb}
                    </p>

                    <div className={cn("mt-6 border-y py-5 translate-z-20", featured ? "border-white/15" : "border-line")}>
                      <p className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-semibold tracking-tight tabular-nums">{formatMoney(pkg.setupFee)}</span>
                        <span className={cn("text-xs", featured ? "text-white/60" : "text-muted")}>
                          {isDomestic && GST.enabled ? `+ ${GST.percent}% ${t.pricing.gstLabel}` : t.pricing.oneTimeBeforeGst}
                        </span>
                      </p>
                      <p className={cn("mt-1.5 text-xs", featured ? "text-white/60" : "text-muted")}>
                        {t.packagesPricing.oneTimeSetup} · {t.packagesPricing.liveInAbout} {weeks(pkg.launchWeeks)}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm translate-z-10">
                      {previous ? (
                        <li className="font-medium">
                          {t.packagesPricing.everythingIn.replace("{name}", prevName)}
                        </li>
                      ) : null}
                      {(previous
                        ? added.map((m) => {
                            const locM = t.catalog.modules[m.id];
                            return {
                              key: m.id,
                              text: locM?.name || m.name,
                              sub: locM?.summary || m.summary,
                            };
                          })
                        : coreIncludes.map((line) => ({ key: line, text: line, sub: null }))
                      ).map((item) => (
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
                      ))}
                    </ul>

                    <div className="mt-auto pt-8 translate-z-30">
                      <ButtonLink
                        href={`/pricing?pkg=${pkg.id}`}
                        variant={featured ? "white" : "primary"}
                        className="group h-12 w-full text-[15px] transition-transform hover:scale-[1.01]"
                      >
                        {t.packagesPricing.choosePackage} {pkgName}
                        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </ButtonLink>
                    </div>
                  </CardTilt3D>
                </div>
              );
            })}
          </div>

          <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-white p-6 text-ink shadow-xl sm:p-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h3 className="text-base font-semibold">{t.packagesPricing.bottomPrompt}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t.packagesPricing.bottomSub}
                {hostingFrom !== null
                  ? ` ${t.pricing.hostingPaidToProviders} (~${formatMoney(hostingFrom)}/${t.common.month}).`
                  : null}
              </p>
            </div>
            <ButtonLink href="/pricing" variant="primary" className="h-12 shrink-0 px-6 text-[15px] whitespace-nowrap">
              {t.packagesPricing.openBuilder}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </SkyPanel>
    </section>
  );
}
