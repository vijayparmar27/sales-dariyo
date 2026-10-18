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

import { ButtonLink, CatalisBadge, DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ProductVisual } from "@/components/demo/product-visual";
import { DEMO_STORE, findDemoProduct } from "@/data/demo-store";
import { rupees } from "@/lib/format";

type SimulatorChannel = "retail" | "wholesale";

export function RetailWholesaleComparison() {
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
          eyebrow="Retail and wholesale"
          title={
            <>
              Sell to shoppers and trade buyers.{" "}
              <span className="italic text-muted">One shared stock.</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          No second website and no costly B2B plug-in: shoppers and wholesale buyers order from
          the same catalogue, the same stock and the same admin panel.
        </SectionHeading>

        <SegmentedTabs
          label="Order type"
          value={activeChannel}
          onChange={setActiveChannel}
          options={[
            { value: "retail", label: "A retail order", short: "Retail order", icon: ShoppingBag },
            { value: "wholesale", label: "A wholesale deal", short: "Wholesale deal", icon: Boxes },
          ]}
        />

        {/* Live Simulator Interactive Canvas */}
        <div className={cn(DEMO_FRAME, "mb-6 p-5 sm:p-10")}>
          {activeChannel === "retail" ? (
            /* Retail Simulator View */
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <CatalisBadge>Retail checkout</CatalisBadge>

                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-[2.75rem]">
                  A quick checkout for everyday shoppers
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Someone buying a few packs wants to pay in seconds. The storefront gives them UPI
                  apps, cards and cash on delivery, coupon codes, and a pincode check before they order.
                </p>

                {/* Micro Inclusions */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Razorpay UPI &amp; Cards</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Pincode check, live tracking</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Installs like an app</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">GST invoice on every order</span>
                  </div>
                </div>
              </div>

              {/* Retail Mockup Phone Card (6 cols) */}
              <div className="lg:col-span-6 rounded-2xl border border-line bg-(--demo-surface) p-5 sm:p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-(--demo-line) pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-4 text-(--demo-ink)" />
                    <span className="font-bold text-xs text-(--demo-ink)">Cart Total &amp; Payment Intent</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Delhivery Express ✓
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
                      <span className="font-bold tabular-nums">{rupees(line.total)}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Pill */}
                <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-200 p-2.5 text-xs text-emerald-900 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5 text-emerald-700" />
                    <span className="font-semibold">Promo Code: FIRST10 (10% Off)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCouponApplied(!couponApplied)}
                    className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    {couponApplied ? "Remove" : "Apply"}
                  </button>
                </div>

                {/* Cost Breakdown */}
                <div className="border-t border-(--demo-line) pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-(--demo-ink)">{rupees(retailBase)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promotional Discount</span>
                      <span className="tabular-nums font-semibold">- {rupees(retailDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Delhivery Express Shipping</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-(--demo-ink) border-t border-(--demo-line) pt-2">
                    <span>Amount Payable</span>
                    <span className="tabular-nums">{rupees(retailTotal)}</span>
                  </div>
                </div>

                {/* 1-Click UPI Payment Button */}
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-(--demo-ink) text-white py-3 text-xs font-bold hover:bg-(--demo-ink-hover) shadow-sm transition-all"
                  >
                    <span>Instant UPI Checkout · {rupees(retailTotal)}</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                  <p className="text-center text-[10px] text-muted mt-2">
                    Google Pay, PhonePe, Paytm &amp; COD Supported
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Wholesale Simulator View */
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <CatalisBadge>Wholesale module</CatalisBadge>

                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-[2.75rem]">
                  Bulk prices and proper quotes
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Distributors, cafés and grocery chains buy by the case. Business accounts carry a
                  checked GSTIN and optional credit terms; quotes, stock holds and Delhivery B2B
                  freight with e-way bill details are handled in the same admin panel.
                </p>

                {/* Volume Tier Selector */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Pick a quantity · example rates
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {tiers.map((tier) => (
                      <button
                        key={tier.minKg}
                        type="button"
                        onClick={() => setWholesaleQty(tier.minKg)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          wholesaleQty === tier.minKg
                            ? "border-[#0054F9] bg-[#EBF3FF] text-[#0054F9] ring-2 ring-[#0054F9]/20"
                            : "border-line bg-card hover:bg-sunken text-muted"
                        }`}
                      >
                        <span className="block font-bold text-xs text-ink">{tier.minKg} kg</span>
                        <span className="block text-[11px] font-bold text-[#0054F9] mt-0.5">{rupees(tier.ratePerKg)}/kg</span>
                        <span className="block text-[10px] text-emerald-700 font-semibold">{tier.saving}% below retail</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wholesale Formal Quotation Card (6 cols) */}
              <div className="lg:col-span-6 rounded-2xl border-2 border-[#0054F9] bg-card p-5 sm:p-6 shadow-md ring-4 ring-[#0054F9]/10">
                <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-muted">QUOTATION #WH-8492</span>
                    <h4 className="text-sm font-bold text-ink">B2B Commercial Deal Term</h4>
                  </div>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold">
                    GSTIN {DEMO_STORE.tradeBuyer.gstin} ✓
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-ink mb-4">
                  <div className="flex items-center justify-between bg-sunken/60 p-2.5 rounded-xl border border-line">
                    <div>
                      <span className="font-bold">{wholesale.product}, {wholesaleQty} kg</span>
                      <span className="block text-[11px] text-muted">Tier {(activeTier?.index ?? 0) + 1} rate, {discount}% below retail</span>
                    </div>
                    <span className="font-bold tabular-nums">{rupees(wholesaleSubtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between bg-sunken/60 p-2.5 rounded-xl border border-line">
                    <div>
                      <span className="font-bold">Delhivery B2B Freight Logistics</span>
                      <span className="block text-[11px] text-muted">Multi-box heavy cargo + E-Way Bill</span>
                    </div>
                    <span className="font-semibold text-emerald-700">INCLUDED</span>
                  </div>
                </div>

                {/* Staged Payment Terms */}
                <div className="rounded-xl border border-line bg-sunken/40 p-3 mb-4 text-xs">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-muted block mb-1.5">
                    Staged Commercial Payment Terms:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="bg-card p-1.5 rounded-lg border border-line">
                      <span className="text-muted block text-[10px]">On Contract (50%)</span>
                      <span className="font-bold tabular-nums">{rupees(Math.round(wholesaleTotal * 0.5))}</span>
                    </div>
                    <div className="bg-card p-1.5 rounded-lg border border-line">
                      <span className="text-muted block text-[10px]">At Dispatch (40%)</span>
                      <span className="font-bold tabular-nums">{rupees(Math.round(wholesaleTotal * 0.4))}</span>
                    </div>
                    <div className="bg-card p-1.5 rounded-lg border border-line">
                      <span className="text-muted block text-[10px]">Net 30 Days (10%)</span>
                      <span className="font-bold tabular-nums">{rupees(Math.round(wholesaleTotal * 0.1))}</span>
                    </div>
                  </div>
                </div>

                {/* Total with GST */}
                <div className="border-t border-line pt-3 flex items-center justify-between text-base">
                  <div>
                    <span className="font-bold text-ink">Total Deal Value</span>
                    <span className="block text-[10px] text-muted">+{DEMO_STORE.gstPercent}% GST ({rupees(wholesaleGst)})</span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#0054F9] tabular-nums">
                    {rupees(wholesaleTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Unified Ledger Bridge Callout (12 cols) */}
        <div className="reveal flex flex-col items-start justify-between gap-6 rounded-[28px] bg-sunken p-6 sm:p-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-[#111218] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="size-6 text-[#0054F9]" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-ink">
                Why the shop never sells what a trade buyer was promised
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
                When a wholesale buyer books {wholesaleQty}kg, that stock is held for the deal straight
                away, and the shop sells only what is left.
              </p>
            </div>
          </div>

          <ButtonLink href="/pricing?m=wholesale" variant="primary" className="shrink-0 whitespace-nowrap px-6 py-2.5">
            Add the wholesale module
            <ArrowRight aria-hidden className="size-3.5" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
