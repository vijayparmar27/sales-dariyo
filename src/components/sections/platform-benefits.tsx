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
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui";

export function PlatformBenefits() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32 bg-sunken/30 border-y border-line/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Engineered For Modern Brands"
          title={
            <>
              Built to Help You Sell More, Manage Better, and{" "}
              <span className="italic font-serif font-normal text-muted">
                Scale Smarter.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          Engineered specifically for packaged food, specialty beverages, gourmet goods, and regional products sold in retail packs and wholesale cases.
        </SectionHeading>

        {/* Bento Grid: 2 Large Cards + 4 Supporting Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Card 1 (Large - 7 cols): Dual Retail & Wholesale Engine */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-line bg-card p-8 shadow-xs hover:border-ink/20 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#0054F9] text-white font-bold text-sm shadow-xs">
                  01
                </span>
                <span className="rounded-full bg-[#EBF3FF] text-[#0054F9] border border-[#CCE0FF] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Two Revenue Channels
                </span>
              </div>

              <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Dual Retail &amp; Wholesale Engine
              </h3>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Most platforms force brands to run two separate stores or pay for expensive enterprise tiers. Here, retail consumers purchase individual jars or pouches while verified trade buyers access bulk tiers, custom quotation workflows, and tax invoices—all backed by a unified inventory ledger.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-line bg-sunken/60 p-4">
                  <div className="flex items-center gap-2 font-bold text-sm text-ink">
                    <Users className="size-4 text-emerald-600" />
                    <span>D2C Retail Store</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Instant checkout, UPI intent, coupons, free delivery thresholds, and mobile PWA.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-sunken/60 p-4">
                  <div className="flex items-center gap-2 font-bold text-sm text-ink">
                    <Boxes className="size-4 text-[#0054F9]" />
                    <span>B2B Trade Portal</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Bulk case pricing, formal quote requests, stock reservations, and credit terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-xs text-muted font-medium">
              <span>Zero stock overselling between channels</span>
              <span className="text-emerald-600 font-bold">Synchronized in Real-Time</span>
            </div>
          </div>

          {/* Card 2 (5 cols): Multiple Product Variants & Pack Sizes */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-line bg-card p-8 shadow-xs hover:border-ink/20 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sunken text-ink font-bold text-sm border border-line">
                  02
                </span>
                <Scale className="size-5 text-muted" />
              </div>

              <h3 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-ink">
                Pack Sizes &amp; Variant Units
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                Purpose-built for consumer packaged goods. Seamlessly handle grams, kilograms, pouches, jars, multi-packs, or case lots with unique SKUs and automatic weight-based shipping calculation.
              </p>

              {/* Visual pack pill mockup */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-line bg-sunken/50 p-2.5 text-xs">
                  <span className="font-semibold text-ink">100g Glass Jar (Sample)</span>
                  <span className="font-bold text-ink">₹240</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border-2 border-[#0054F9] bg-[#EBF3FF]/60 p-2.5 text-xs">
                  <span className="font-bold text-ink">250g Vacuum Seal Pouch (Best Seller)</span>
                  <span className="font-bold text-[#0054F9]">₹520</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-line bg-sunken/50 p-2.5 text-xs">
                  <span className="font-semibold text-ink">1kg Pantry Pack (Save 15%)</span>
                  <span className="font-bold text-ink">₹1,750</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs text-muted">
              Auto-calculates volumetric parcel weight for Delhivery rates.
            </div>
          </div>

          {/* Card 3 (4 cols): Automated Delhivery Logistics */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-line bg-card p-8 shadow-xs hover:border-ink/20 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sunken text-ink font-bold text-sm">
                  03
                </span>
                <Truck className="size-5 text-emerald-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                Automated Logistics
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Native Delhivery carrier integration. Live pincode serviceability checks, automated AWB generation, courier pickup scheduling, and webhook-driven tracking updates.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-sunken/50 p-3.5 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Delhivery Surface &amp; Express</span>
                  <span className="text-emerald-600 font-bold">29,000+ Pincodes</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>Manifest generation</span>
                  <span>1-click batch print</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs text-muted">
              Automated SMS &amp; WhatsApp tracking alerts for customers.
            </div>
          </div>

          {/* Card 4 (4 cols): Indian Payments & COD Fraud Defense */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-line bg-card p-8 shadow-xs hover:border-ink/20 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sunken text-ink font-bold text-sm">
                  04
                </span>
                <CreditCard className="size-5 text-indigo-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                Payments &amp; COD Defense
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Instant UPI intent for Google Pay, PhonePe, and Paytm via Razorpay, plus Net Banking, cards, and verified Cash on Delivery with phone confirmation safeguards.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-sunken/50 p-3.5 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">UPI, Cards, NetBanking</span>
                  <span className="text-emerald-600 font-bold">Instant Hook</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>COD verification</span>
                  <span>Unpaid carts auto-expire</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs text-muted">
              Zero escrow delays—funds settle straight to your bank account.
            </div>
          </div>

          {/* Card 5 (4 cols): Full GST Invoices & Compliance */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-line bg-card p-8 shadow-xs hover:border-ink/20 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sunken text-ink font-bold text-sm">
                  05
                </span>
                <Receipt className="size-5 text-amber-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                GST Invoices &amp; Taxes
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Compliant GST invoicing generated automatically for every consumer order and wholesale trade deal. Supports HSN codes, state-wise CGST/SGST/IGST, and credit notes.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-sunken/50 p-3.5 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">Automated Tax Invoices</span>
                  <span className="text-[#0054F9] font-bold">PDF Export</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>B2B buyer GSTIN on file</span>
                  <span>Monthly sales report</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs text-muted">
              Ready-to-file reports formatted for your chartered accountant.
            </div>
          </div>

          {/* Card 6 (Large - 12 cols): Cloud Ownership & Source Code Freedom */}
          <div className="lg:col-span-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0F101A] to-[#171B26] p-8 sm:p-10 text-white shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white border border-white/15">
                  <ShieldCheck className="size-3.5 text-[#3B82F6]" />
                  <span>The Anti-SaaS Advantage</span>
                </div>
                <h3 className="mt-4 text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Deploy on Your Cloud. Own 100% of Your Code.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
                  Unlike closed SaaS platforms that charge steep monthly software rentals, take a cut of your GMV, and hold your customer data hostage, we license the entire production codebase to your brand and install it on your cloud servers.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-white/90">
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-[#3B82F6]" />
                    Permanent perpetual license
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-[#3B82F6]" />
                    Direct database &amp; server access
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-[#3B82F6]" />
                    No revenue share or commission
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0054F9] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#0045D8] shadow-md active:scale-95 transition-all"
                >
                  See Transparent Pricing
                  <ArrowRight className="size-4" />
                </Link>
                <p className="mt-2 text-xs text-white/60">
                  One-time setup fee · Zero monthly software rent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
