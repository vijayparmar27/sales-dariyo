import { ArrowRight, Check } from "lucide-react";

import { AnimatedCounter } from "@/components/animation/animated-counter";
import { ButtonLink, CatalisBadge, SectionHeading } from "@/components/ui";
import { CUSTOM_BUILD, HOURLY_RATE } from "@/data/catalog";
import { count } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";

export async function DevelopmentValue() {
  const { formatMoney, formatLarge, t } = await getServerI18n();
  const packages = packageFigures();
  const fees = packages.map((p) => p.setupFee);
  const launch = packages.map((p) => p.launchWeeks);

  return (
    <section className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.devValue.eyebrow}
          title={
            <>
              {t.devValue.titlePart1}{" "}
              <span className="italic text-muted">{t.devValue.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.devValue.subtitle}
        </SectionHeading>

        <div className="grid items-stretch gap-5 lg:grid-cols-12">
          {/* Building it yourself */}
          <article className="reveal stagger-1 card-lift flex flex-col rounded-[28px] bg-sunken p-7 sm:p-9 lg:col-span-5 border border-transparent hover:border-line cursor-default">
            <CatalisBadge variant="white" className="self-start">
              {t.devValue.optionA.badge}
            </CatalisBadge>
            <h3 className="mt-6 font-serif text-[2.1rem] leading-none tracking-[-0.02em] text-ink">
              {t.devValue.optionA.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.devValue.optionA.desc}
            </p>

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">{t.devValue.optionA.engineeringLabel}</dt>
                <dd className="font-medium text-ink tabular-nums">
                  ~<AnimatedCounter value={count(CUSTOM_BUILD.hours)} /> {t.common.hours}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">{t.devValue.optionA.costLabel} ({formatMoney(HOURLY_RATE)}/{t.common.hour})</dt>
                <dd className="font-medium text-rose-600 tabular-nums">~{formatLarge(CUSTOM_BUILD.cost)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">{t.devValue.optionA.timelineLabel}</dt>
                <dd className="font-medium text-ink">{t.devValue.optionA.timelineValue}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-muted">{t.devValue.optionA.riskLabel}</dt>
                <dd className="font-medium text-ink">{t.devValue.optionA.riskValue}</dd>
              </div>
            </dl>

            <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">
              {t.devValue.optionA.footnote}
            </p>
          </article>

          {/* Starting from this platform */}
          <article className="reveal stagger-2 card-lift-dark flex flex-col rounded-[28px] bg-[#111218] p-7 text-white sm:p-10 lg:col-span-7 border border-white/10 hover:border-white/30 cursor-default">
            <CatalisBadge variant="dark" className="self-start">
              {t.devValue.optionB.badge}
            </CatalisBadge>
            <h3 className="mt-6 font-serif text-[2.5rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              {t.devValue.optionB.titlePart1}{" "}
              <span className="italic text-white/70">{t.devValue.optionB.titleItalic}</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {t.devValue.optionB.desc}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.07] p-5 transition-transform duration-300 hover:scale-[1.02] hover:bg-white/[0.1]">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">{t.devValue.optionB.setupFeeLabel}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">
                  {formatMoney(Math.min(...fees))} – {formatMoney(Math.max(...fees))}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {t.devValue.optionB.setupFeeSub}
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.07] p-5 transition-transform duration-300 hover:scale-[1.02] hover:bg-white/[0.1]">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">{t.devValue.optionB.timelineLabel}</p>
                <p className="mt-2 text-2xl font-semibold text-[#7FD4A8] tabular-nums">
                  {Math.min(...launch)} to {Math.max(...launch)} {t.common.weeks}
                </p>
                <p className="mt-1 text-xs text-white/60">{t.devValue.optionB.timelineSub}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xs font-medium tracking-[0.14em] text-white/60 uppercase">
                {t.devValue.optionB.inclusionsHeader}
              </p>
              <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2 sm:text-sm">
                {t.catalog.setupIncludes.map((item) => (
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
              <p className="text-xs text-white/60">{t.catalog.licence}</p>
              <ButtonLink href="/pricing" variant="white" className="h-11 shrink-0 px-6 text-sm">
                {t.devValue.optionB.cta}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
