"use client";

import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ShoppingBag,
  Tag,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { CardTilt3D } from "@/components/animation/card-tilt-3d";
import { ButtonLink, CatalisBadge, DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ProductVisual } from "@/components/demo/product-visual";
import { DEMO_STORE, findDemoProduct } from "@/data/demo-store";
import { formatPrice } from "@/lib/i18n/currencies";
import { useI18n } from "@/lib/i18n/context";

type SimulatorChannel = "retail" | "wholesale";

export function RetailWholesaleComparison() {
  const { t, currency } = useI18n();
  const [activeChannel, setActiveChannel] = useState<SimulatorChannel>("retail");
  const [wholesaleQty, setWholesaleQty] = useState<number>(DEMO_STORE.wholesale.tiers[1]?.minKg ?? 25); // kg
  const [couponApplied, setCouponApplied] = useState(true);

  // A simulation, not a quote: the basket and the tiers come from the demo
  // store (demo-store.ts), and the wholesale rates there are examples.
  const basket = DEMO_STORE.basket.map((line) => {
    const product = findDemoProduct(line.productId);
    const pack = product.packSizes.find((p) => p.id === line.packId) ?? product.packSizes[0];
    return { ...line, product, pack, total: (pack?.price ?? 0) * line.qty };
  });
  const retailBase = basket.reduce((sum, line) => sum + line.total, 0);
  const retailDiscount = couponApplied ? Math.round(retailBase * 0.1) : 0;
  const retailTotal = retailBase - retailDiscount;

  const { wholesale } = DEMO_STORE;
  const tiers = wholesale.tiers.map((tier, index) => ({
    ...tier,
    index,
    saving: Math.round((1 - tier.ratePerKg / wholesale.retailPerKg) * 100),
  }));
  const activeTier = [...tiers].reverse().find((tier) => wholesaleQty >= tier.minKg) ?? tiers[0];
  const rate = activeTier?.ratePerKg ?? 0;
  const discount = activeTier?.saving ?? 0;
  const wholesaleSubtotal = wholesaleQty * rate;
  const wholesaleGst = Math.round((wholesaleSubtotal * DEMO_STORE.gstPercent) / 100);
  const wholesaleTotal = wholesaleSubtotal + wholesaleGst;

  return (
    <section id="retail-wholesale" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.retailWholesale.eyebrow}
          title={
            <>
              {t.retailWholesale.titlePart1}{" "}
              <span className="italic text-muted">{t.retailWholesale.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          {t.retailWholesale.subtitle}
        </SectionHeading>

        <SegmentedTabs
          label={t.retailWholesale.eyebrow}
          value={activeChannel}
          onChange={setActiveChannel}
          options={[
            { value: "retail", label: t.retailWholesale.retailBadge, short: t.retailWholesale.retailBadge, icon: ShoppingBag },
            { value: "wholesale", label: t.retailWholesale.wholesaleBadge, short: t.retailWholesale.wholesaleBadge, icon: Boxes },
          ]}
        />

        {/* Live Simulator Interactive Canvas */}
        <div className={cn(DEMO_FRAME, "mb-6 p-5 sm:p-10")}>
          {activeChannel === "retail" ? (
            /* Retail Simulator View */
            <div key="retail" className="animate-tab-content grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <CatalisBadge>{t.retailWholesale.retailBadge}</CatalisBadge>

                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-[2.75rem]">
                  {t.retailWholesale.retailTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t.retailWholesale.retailDesc}
                </p>

                {/* Micro Inclusions */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  {t.retailWholesale.retailFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-ink">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retail Mockup Phone Card (6 cols) */}
              <CardTilt3D maxTilt={5} glare glareOpacity={0.2} borderGlow className="lg:col-span-6 rounded-2xl">
                <div className="h-full rounded-2xl border border-line bg-(--demo-surface) p-5 sm:p-6 shadow-inner preserve-3d">
                  <div className="flex items-center justify-between border-b border-(--demo-line) pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="size-4 text-(--demo-ink)" />
                      <span className="font-bold text-xs text-(--demo-ink)">{t.retailWholesale.cartTotalTitle}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {t.retailWholesale.expressLogistics} ✓
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-(--demo-ink) mb-4">
                    {basket.map((line) => (
                      <div
                        key={`${line.productId}-${line.packId}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-(--demo-line) bg-white p-2.5"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          {line.product.photo ? (
                            <span className="size-9 shrink-0 overflow-hidden rounded-lg border border-(--demo-line)">
                              <ProductVisual product={line.product} sizes="36px" className="size-full object-cover" />
                            </span>
                          ) : null}
                          <span className="truncate">
                            {line.product.name} ({line.pack?.label} × {line.qty})
                          </span>
                        </span>
                        <span className="font-bold tabular-nums">{formatPrice(line.total, currency)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Pill */}
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-200 p-2.5 text-xs text-emerald-900 mb-4">
                    <div className="flex items-center gap-2">
                      <Tag className="size-3.5 text-emerald-700" />
                      <span className="font-semibold">{t.retailWholesale.promoCodeLabel}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCouponApplied(!couponApplied)}
                      className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      {couponApplied ? t.retailWholesale.remove : t.retailWholesale.apply}
                    </button>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="border-t border-(--demo-line) pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-muted">
                      <span>{t.pricing.subtotal}</span>
                      <span className="tabular-nums font-medium text-(--demo-ink)">{formatPrice(retailBase, currency)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-700">
                        <span>{t.retailWholesale.discountLabel}</span>
                        <span className="tabular-nums font-semibold">- {formatPrice(retailDiscount, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted">
                      <span>{t.retailWholesale.shippingLabel}</span>
                      <span className="font-semibold text-emerald-700">{t.retailWholesale.free}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-(--demo-ink) border-t border-(--demo-line) pt-2">
                      <span>{t.pricing.setupTotal}</span>
                      <span className="tabular-nums">{formatPrice(retailTotal, currency)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      className="btn-shine w-full flex items-center justify-center gap-2 rounded-full bg-(--demo-ink) text-white py-3 text-xs font-bold hover:bg-(--demo-ink-hover) shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                    >
                      <span>{t.retailWholesale.instantCheckout} · {formatPrice(retailTotal, currency)}</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                    <p className="text-center text-[10px] text-muted mt-2">
                      {t.retailWholesale.paymentMethodsNote}
                    </p>
                  </div>
                </div>
              </CardTilt3D>
            </div>
          ) : (
            /* Wholesale Simulator View */
            <div key="wholesale" className="animate-tab-content grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <CatalisBadge>{t.retailWholesale.wholesaleBadge}</CatalisBadge>

                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-[2.75rem]">
                  {t.retailWholesale.wholesaleTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t.retailWholesale.wholesaleDesc}
                </p>

                {/* Volume Tier Selector */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    {t.retailWholesale.pickQtyLabel}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {tiers.map((tier) => (
                      <button
                        key={tier.minKg}
                        type="button"
                        onClick={() => setWholesaleQty(tier.minKg)}
                        className={cn(
                          "p-3 rounded-2xl border text-center transition-all duration-200 active:scale-95 cursor-pointer",
                          wholesaleQty === tier.minKg
                            ? "border-[#0054F9] bg-[#EBF3FF] text-[#0054F9] ring-2 ring-[#0054F9]/20 scale-[1.03] shadow-md shadow-[#0054F9]/10"
                            : "border-line bg-card hover:bg-sunken hover:border-line/80 text-muted"
                        )}
                      >
                        <span className="block font-bold text-xs text-ink">{tier.minKg} kg</span>
                        <span className="block text-[11px] font-bold text-[#0054F9] mt-0.5">{formatPrice(tier.ratePerKg, currency)}/kg</span>
                        <span className="block text-[10px] text-emerald-700 font-semibold">{tier.saving}% {t.retailWholesale.belowRetail}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  {t.retailWholesale.wholesaleFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-ink">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wholesale Formal Quotation Card (6 cols) */}
              <CardTilt3D maxTilt={5} glare glareOpacity={0.2} borderGlow className="lg:col-span-6 rounded-2xl">
                <div className="h-full rounded-2xl border-2 border-[#0054F9] bg-card p-5 sm:p-6 shadow-md ring-4 ring-[#0054F9]/10 preserve-3d">
                  <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-muted">{t.retailWholesale.quotationNumber}</span>
                      <h4 className="text-sm font-bold text-ink">{t.retailWholesale.dealTermTitle}</h4>
                    </div>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold">
                      GSTIN {DEMO_STORE.tradeBuyer.gstin} ✓
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-ink mb-4">
                    <div className="flex items-center justify-between bg-sunken/60 p-2.5 rounded-xl border border-line">
                      <div>
                        <span className="font-bold">{wholesale.product}, {wholesaleQty} kg</span>
                        <span className="block text-[11px] text-muted">Tier {(activeTier?.index ?? 0) + 1} rate, {discount}% {t.retailWholesale.belowRetail}</span>
                      </div>
                      <span className="font-bold tabular-nums">{formatPrice(wholesaleSubtotal, currency)}</span>
                    </div>

                    <div className="flex items-center justify-between bg-sunken/60 p-2.5 rounded-xl border border-line">
                      <div>
                        <span className="font-bold">{t.retailWholesale.freightTitle}</span>
                        <span className="block text-[11px] text-muted">{t.retailWholesale.freightSub}</span>
                      </div>
                      <span className="font-semibold text-emerald-700">{t.common.included.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Staged Payment Terms */}
                  <div className="rounded-xl border border-line bg-sunken/40 p-3 mb-4 text-xs">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-muted block mb-1.5">
                      {t.pricing.paymentSchedule}:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="bg-card p-1.5 rounded-lg border border-line">
                        <span className="text-muted block text-[10px]">{t.catalog.paymentStages[0]?.label ?? "On Contract"} (50%)</span>
                        <span className="font-bold tabular-nums">{formatPrice(Math.round(wholesaleTotal * 0.5), currency)}</span>
                      </div>
                      <div className="bg-card p-1.5 rounded-lg border border-line">
                        <span className="text-muted block text-[10px]">{t.catalog.paymentStages[1]?.label ?? "At Dispatch"} (40%)</span>
                        <span className="font-bold tabular-nums">{formatPrice(Math.round(wholesaleTotal * 0.4), currency)}</span>
                      </div>
                      <div className="bg-card p-1.5 rounded-lg border border-line">
                        <span className="text-muted block text-[10px]">{t.catalog.paymentStages[2]?.label ?? "Net 30 Days"} (10%)</span>
                        <span className="font-bold tabular-nums">{formatPrice(Math.round(wholesaleTotal * 0.1), currency)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total with GST */}
                  <div className="border-t border-line pt-3 flex items-center justify-between text-base">
                    <div>
                      <span className="font-bold text-ink">{t.retailWholesale.totalDealValue}</span>
                      <span className="block text-[10px] text-muted">+{DEMO_STORE.gstPercent}% {t.pricing.gstLabel} ({formatPrice(wholesaleGst, currency)})</span>
                    </div>
                    <span className="text-2xl font-extrabold text-[#0054F9] tabular-nums">
                      {formatPrice(wholesaleTotal, currency)}
                    </span>
                  </div>
                </div>
              </CardTilt3D>
            </div>
          )}
        </div>

        {/* Unified Ledger Bridge Callout (12 cols) */}
        <CardTilt3D maxTilt={3} glare glareOpacity={0.15} borderGlow className="reveal rounded-[28px]">
          <div className="card-lift flex flex-col items-start justify-between gap-6 rounded-[28px] bg-sunken p-6 sm:p-8 md:flex-row md:items-center preserve-3d">
            <div className="flex items-center gap-4" style={{ transform: "translateZ(14px)" }}>
              <div className="size-12 rounded-2xl bg-[#111218] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="size-6 text-[#0054F9]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-ink">
                  {t.platformBenefits.cards.trade.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
                  {t.platformBenefits.cards.trade.footnote}
                </p>
              </div>
            </div>

            <div style={{ transform: "translateZ(18px)" }}>
              <ButtonLink href="/pricing?m=wholesale" variant="primary" className="shrink-0 whitespace-nowrap px-6 py-2.5">
                {t.customModules.quoteThis}
                <ArrowRight aria-hidden className="size-3.5" />
              </ButtonLink>
            </div>
          </div>
        </CardTilt3D>
      </div>
    </section>
  );
}
