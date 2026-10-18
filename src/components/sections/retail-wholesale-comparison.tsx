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

import { ButtonLink, SectionHeading } from "@/components/ui";
import { rupees } from "@/lib/format";

type SimulatorChannel = "retail" | "wholesale";

export function RetailWholesaleComparison() {
  const [activeChannel, setActiveChannel] = useState<SimulatorChannel>("retail");
  const [wholesaleQty, setWholesaleQty] = useState<number>(25); // kg
  const [couponApplied, setCouponApplied] = useState(true);

  // Retail calculation
  const retailBase = 680 * 2 + 440; // 2 pouches + 1 jar = 1800
  const retailDiscount = couponApplied ? Math.round(retailBase * 0.1) : 0;
  const retailTotal = retailBase - retailDiscount;

  // Wholesale calculation
  const getWholesaleRate = (kg: number) => {
    if (kg >= 50) return { rate: 1450, discount: 38 };
    if (kg >= 25) return { rate: 1650, discount: 30 };
    return { rate: 1850, discount: 21 };
  };
  const { rate, discount } = getWholesaleRate(wholesaleQty);
  const wholesaleSubtotal = wholesaleQty * rate;
  const wholesaleGst = Math.round(wholesaleSubtotal * 0.05); // 5% GST on coffee
  const wholesaleTotal = wholesaleSubtotal + wholesaleGst;

  return (
    <section id="retail-wholesale" className="scroll-mt-24 py-24 sm:py-32 bg-sunken/40 border-y border-line/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dual Channel Architecture"
          title={
            <>
              Sell to Direct Consumers and Trade Buyers.{" "}
              <span className="italic font-serif font-normal text-muted">
                One Shared Ledger.
              </span>
            </>
          }
          align="center"
          className="mb-12"
        >
          Most commerce platforms force you into costly third-party B2B plugins or two completely separate websites.
          Our solution powers consumer D2C sales and wholesale bulk trade deals from one shared inventory catalog and administration panel.
        </SectionHeading>

        {/* Interactive Channel Simulator Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveChannel("retail")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeChannel === "retail"
                  ? "bg-[#111218] text-white shadow-sm"
                  : "text-muted hover:text-ink hover:bg-sunken"
              }`}
            >
              <ShoppingBag className="size-4 text-emerald-400" />
              <span>Simulate Retail Order (D2C)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveChannel("wholesale")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeChannel === "wholesale"
                  ? "bg-[#111218] text-white shadow-sm"
                  : "text-muted hover:text-ink hover:bg-sunken"
              }`}
            >
              <Boxes className="size-4 text-[#0054F9]" />
              <span>Simulate Wholesale Trade Deal (B2B)</span>
            </button>
          </div>
        </div>

        {/* Live Simulator Interactive Canvas */}
        <div className="mb-14 rounded-3xl border border-line bg-card p-6 sm:p-10 shadow-xl">
          {activeChannel === "retail" ? (
            /* Retail Simulator View */
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Retail Checkout Experience
                  </span>
                  <span className="text-xs text-muted">D2C Consumer Flow</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                  Instant Mobile Checkout for Everyday Shoppers
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Consumers buying 1–3 jars or pouches expect instant payment options with no tedious registrations.
                  Our storefront delivers instant UPI intent (Google Pay, PhonePe, Paytm), coupon redemptions, and automated Delhivery doorstep dispatch.
                </p>

                {/* Micro Inclusions */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Razorpay UPI &amp; Cards</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Delhivery Pincode Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Mobile PWA App Install</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-sunken/60 p-3 border border-line">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-ink">Auto GST Tax Invoices</span>
                  </div>
                </div>
              </div>

              {/* Retail Mockup Phone Card (6 cols) */}
              <div className="lg:col-span-6 rounded-2xl border border-line bg-[#FAF9F5] p-5 sm:p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-4 text-[#1E3A2F]" />
                    <span className="font-bold text-xs text-[#1E3A2F]">Cart Total &amp; Payment Intent</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Delhivery Express ✓
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-[#1E3A2F] mb-4">
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#EAE5D9]">
                    <span>Coorg Arabica Coffee (250g Pouch × 2)</span>
                    <span className="font-bold tabular-nums">₹1,360</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#EAE5D9]">
                    <span>Wild Kerala Cardamom (100g Glass Jar × 1)</span>
                    <span className="font-bold tabular-nums">₹440</span>
                  </div>
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
                <div className="border-t border-[#EAE5D9] pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-[#1E3A2F]">{rupees(retailBase)}</span>
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
                  <div className="flex justify-between text-base font-extrabold text-[#1E3A2F] border-t border-[#EAE5D9] pt-2">
                    <span>Amount Payable</span>
                    <span className="tabular-nums">{rupees(retailTotal)}</span>
                  </div>
                </div>

                {/* 1-Click UPI Payment Button */}
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1E3A2F] text-white py-3 text-xs font-bold hover:bg-[#13271F] shadow-sm transition-all"
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
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#EBF3FF] text-[#0054F9] border border-[#CCE0FF] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Wholesale B2B Engine
                  </span>
                  <span className="text-xs text-muted">Commercial Volume Contract</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                  Bulk Tier Pricing &amp; Formal Quotation Workflows
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Trade buyers (distributors, specialty cafes, grocery chains) buy in bulk quantities (25kg, 50kg, 100kg+).
                  Our wholesale module verifies corporate GSTINs, applies automatic volume tiers, manages stock reservations, and generates Delhivery B2B Freight e-way bills.
                </p>

                {/* Volume Tier Selector */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Simulate Bulk Order Quantity:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { qty: 10, label: "10 kg Lot", rate: "₹1,850/kg", discount: "21% Off" },
                      { qty: 25, label: "25 kg Sack", rate: "₹1,650/kg", discount: "30% Off" },
                      { qty: 50, label: "50 kg Pallet", rate: "₹1,450/kg", discount: "38% Off" },
                    ].map((tier) => (
                      <button
                        key={tier.qty}
                        type="button"
                        onClick={() => setWholesaleQty(tier.qty)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          wholesaleQty === tier.qty
                            ? "border-[#0054F9] bg-[#EBF3FF] text-[#0054F9] ring-2 ring-[#0054F9]/20"
                            : "border-line bg-card hover:bg-sunken text-muted"
                        }`}
                      >
                        <span className="block font-bold text-xs text-ink">{tier.label}</span>
                        <span className="block text-[11px] font-bold text-[#0054F9] mt-0.5">{tier.rate}</span>
                        <span className="block text-[10px] text-emerald-700 font-semibold">{tier.discount}</span>
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
                    GSTIN 27AABCA1234F1Z5 ✓
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-ink mb-4">
                  <div className="flex items-center justify-between bg-sunken/60 p-2.5 rounded-xl border border-line">
                    <div>
                      <span className="font-bold">Coorg Arabica Master Lot ({wholesaleQty}kg)</span>
                      <span className="block text-[11px] text-muted">Tier {wholesaleQty >= 50 ? "3" : wholesaleQty >= 25 ? "2" : "1"} Wholesale Rate ({discount}% Discount)</span>
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
                    <span className="block text-[10px] text-muted">+5% GST ({rupees(wholesaleGst)})</span>
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
        <div className="rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-[#111218] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="size-6 text-[#0054F9]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-ink">
                How the Unified Ledger Eliminates Channel Conflicts
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
                When a wholesale client books {wholesaleQty}kg of coffee, the platform instantly decrements that stock from your physical warehouse count in Redis and MongoDB.
                Your retail storefront will never oversell stock that was already committed to a trade contract.
              </p>
            </div>
          </div>

          <ButtonLink href="/pricing?m=wholesale" variant="secondary" className="whitespace-nowrap px-6 py-2.5 text-xs font-bold shrink-0">
            Configure Wholesale Module
            <ArrowRight aria-hidden className="size-3.5" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
