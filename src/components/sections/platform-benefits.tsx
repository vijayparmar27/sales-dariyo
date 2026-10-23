import {
  ArrowRight,
  Boxes,
  Check,
  CreditCard,
  Receipt,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { ButtonLink, SectionHeading } from "@/components/ui";
import { DEMO_STORE } from "@/data/demo-store";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/i18n/currencies";
import { getServerI18n } from "@/lib/i18n/server";

/** The pack-size card shows the demo store's first product, at its real prices. */
const PACK_EXAMPLE = DEMO_STORE.products[0];

function FeatureCard({
  index,
  icon: Icon,
  title,
  children,
  detail,
  footnote,
  className,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  detail?: ReactNode;
  footnote: string;
  className?: string;
}) {
  return (
    <article className={cn("reveal flex flex-col rounded-[28px] bg-sunken p-7 sm:p-8", className)}>
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="font-serif text-2xl text-muted/60 tabular-nums">0{index}</span>
      </div>
      <h3 className="mt-8 font-serif text-[2rem] leading-none tracking-[-0.02em] text-ink">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
      {detail ? <div className="mt-6">{detail}</div> : null}
      <p className="mt-auto pt-6 text-xs text-muted">
        <span className="block border-t border-line pt-4">{footnote}</span>
      </p>
    </article>
  );
}

function Chip({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white p-3.5 text-xs shadow-[0_12px_30px_-20px_rgba(17,18,24,0.3)]">
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-ink">{title}</span>
        <span className="font-medium text-brand-blue">{value}</span>
      </div>
      {sub ? <p className="mt-1 text-[11px] text-muted">{sub}</p> : null}
    </div>
  );
}

/**
 * PlatformBenefits showcase section with multi-currency and full localization.
 */
export async function PlatformBenefits() {
  const { t, currency } = await getServerI18n();

  return (
    <section id="features" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.platformBenefits.eyebrow}
          title={
            <>
              {t.platformBenefits.titlePart1}{" "}
              <span className="italic text-muted">{t.platformBenefits.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.platformBenefits.subtitle}
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          <FeatureCard
            index={1}
            icon={Users}
            title={t.platformBenefits.cards.trade.title}
            footnote={t.platformBenefits.cards.trade.footnote}
            className="lg:col-span-7"
            detail={
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-20px_rgba(17,18,24,0.3)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Users aria-hidden className="size-4 text-brand-blue" />
                    {t.retailWholesale.retailBadge}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {t.retailWholesale.retailDesc}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-20px_rgba(17,18,24,0.3)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Boxes aria-hidden className="size-4 text-brand-blue" />
                    {t.retailWholesale.wholesaleBadge}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {t.retailWholesale.wholesaleDesc}
                  </p>
                </div>
              </div>
            }
          >
            {t.platformBenefits.cards.trade.body}
          </FeatureCard>

          <FeatureCard
            index={2}
            icon={Scale}
            title={t.platformBenefits.cards.packSizes.title}
            footnote={t.platformBenefits.cards.packSizes.footnote}
            className="lg:col-span-5"
            detail={
              <div className="space-y-2 text-xs">
                {PACK_EXAMPLE ? (
                  <p className="pb-1 text-[11px] text-muted">
                    {PACK_EXAMPLE.name}
                    {DEMO_STORE.brand.live ? `, as sold on ${DEMO_STORE.brand.name}` : ""}
                  </p>
                ) : null}
                {PACK_EXAMPLE?.packSizes.map((pack) => (
                  <div key={pack.id} className="flex items-center justify-between rounded-xl bg-white p-2.5">
                    <span className="font-medium text-ink">{pack.label}</span>
                    <span className="flex items-baseline gap-1.5 tabular-nums">
                      {pack.compareAtPrice ? (
                        <span className="text-[11px] text-muted line-through">{formatPrice(pack.compareAtPrice, currency)}</span>
                      ) : null}
                      <span className="font-semibold text-ink">{formatPrice(pack.price, currency)}</span>
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl bg-white p-2.5 ring-2 ring-brand-blue">
                  <span className="font-medium text-ink">{t.retailWholesale.wholesaleBadge}</span>
                  <span className="font-semibold text-brand-blue">{t.common.select}</span>
                </div>
              </div>
            }
          >
            {t.platformBenefits.cards.packSizes.body}
          </FeatureCard>

          <FeatureCard
            index={3}
            icon={Truck}
            title={t.platformBenefits.cards.shipping.title}
            footnote={t.platformBenefits.cards.shipping.footnote}
            className="lg:col-span-4"
            detail={<Chip title="Logistics" value="Delhivery / Local" sub="Integrated pickups & tracking" />}
          >
            {t.platformBenefits.cards.shipping.body}
          </FeatureCard>

          <FeatureCard
            index={4}
            icon={CreditCard}
            title={t.platformBenefits.cards.checkout.title}
            footnote={t.platformBenefits.cards.checkout.footnote}
            className="lg:col-span-4"
            detail={<Chip title="Payments" value="Cards / UPI / COD" sub="Direct to your merchant account" />}
          >
            {t.platformBenefits.cards.checkout.body}
          </FeatureCard>

          <FeatureCard
            index={5}
            icon={Receipt}
            title={t.platformBenefits.cards.permissions.title}
            footnote={t.platformBenefits.cards.permissions.footnote}
            className="lg:col-span-4"
            detail={<Chip title="Operations" value="Role-Based" sub="Full audit logging & controls" />}
          >
            {t.platformBenefits.cards.permissions.body}
          </FeatureCard>

          {/* The licence, on the dark card */}
          <div className="reveal rounded-[28px] bg-[#111218] p-8 text-white sm:p-10 lg:col-span-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase">
                  <ShieldCheck aria-hidden className="size-3.5 text-[#7FB2FF]" />
                  {t.hero.badgeTurnkey}
                </div>
                <h3 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                  {t.hero.titlePart1}{" "}
                  <span className="italic text-white/70">{t.hero.titleItalic}</span>
                </h3>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {t.hero.subtitle}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    {t.hero.pillarBrand}: {t.hero.pillarBrandDesc}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    {t.hero.pillarTurnkey}: {t.hero.pillarTurnkeyDesc}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    {t.hero.pillarCommission}: {t.hero.pillarCommissionDesc}
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start justify-center gap-2 lg:col-span-4 lg:items-end">
                <ButtonLink href="/pricing" variant="white" className="h-12 px-7 text-[15px]">
                  {t.nav.pricing}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <p className="text-xs text-white/60">{t.hero.licenseText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
