import {
  Check,
  LayoutDashboard,
  Server,
  Store,
  Truck,
  Zap,
} from "lucide-react";

import { SectionHeading } from "@/components/ui";

export function ThreeApps() {
  return (
    <section id="apps" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="One Unified Architecture"
          title={
            <>
              Everything Your Online Business Needs.{" "}
              <span className="italic font-serif font-normal text-muted">
                Working as One.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          Most brands struggle with fragmented SaaS plugins that break on updates and fall out of sync.
          Our platform integrates customer storefront, operations console, and cloud backend into a single cohesive engine.
        </SectionHeading>

        {/* 3 Connected Panels */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Panel 1: Customer Storefront */}
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-ink/20">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent-ink border border-accent/40">
                  <Store className="size-6" />
                </div>
                <span className="rounded-full bg-sunken px-3 py-1 text-xs font-semibold text-muted">
                  Application 01
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                Customer Storefront
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                A blazing-fast, conversion-optimized shopping experience built with Next.js 16, React 19, and Tailwind CSS.
              </p>

              {/* Storefront Feature Points */}
              <ul className="mt-6 space-y-3 text-sm text-ink/90">
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Pack size variants:</strong> Grams, kg, jars, or pouches with instant price adjustments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Indian payment checkout:</strong> Razorpay UPI intent, cards, net banking, and COD.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Customer portal:</strong> Google/Phone OTP sign-in, live order tracking, and GST invoices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Mobile PWA:</strong> Shoppers can install your store directly onto their phone home screen.</span>
                </li>
              </ul>
            </div>

            {/* Embedded Mini UI Mockup */}
            <div className="mt-8 rounded-2xl border border-line bg-sunken/60 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
                <span>Cart Summary</span>
                <span className="text-emerald-600 font-bold">Delhivery Pincode 560001 ✓</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-card p-2.5 border border-line text-xs">
                <div>
                  <p className="font-bold text-ink">Specialty Coffee Beans</p>
                  <p className="text-[11px] text-muted">500g Valve Pouch · Qty 2</p>
                </div>
                <p className="font-bold tabular-nums text-ink">₹1,780</p>
              </div>
            </div>
          </div>

          {/* Panel 2: Operator Admin Dashboard */}
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-ink/20">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-lavender flex items-center justify-center text-lavender-ink border border-[#D7D2FF]">
                  <LayoutDashboard className="size-6" />
                </div>
                <span className="rounded-full bg-sunken px-3 py-1 text-xs font-semibold text-muted">
                  Application 02
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                Admin Dashboard
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Full-featured operations management for your inventory, order fulfillment, team permissions, and sales reports.
              </p>

              {/* Admin Feature Points */}
              <ul className="mt-6 space-y-3 text-sm text-ink/90">
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Catalog &amp; inventory control:</strong> Manage stock across multiple physical warehouses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>1-Click courier booking:</strong> Direct Delhivery label generation, pickups, and manifest prints.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>B2B wholesale quotes:</strong> Review trade inquiries, set custom pricing, and approve bulk orders.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Tax &amp; accounting ready:</strong> Auto-generated GST tax invoices, credit notes, and sales reports.</span>
                </li>
              </ul>
            </div>

            {/* Embedded Mini UI Mockup */}
            <div className="mt-8 rounded-2xl border border-line bg-sunken/60 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
                <span>Fulfillment Dispatch</span>
                <span className="rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                  Ready to Ship
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-card p-2.5 border border-line text-xs">
                <div>
                  <p className="font-bold text-ink">Delhivery Courier Pickup</p>
                  <p className="text-[11px] text-muted">Scheduled Today · 14 parcels</p>
                </div>
                <Truck className="size-4 text-accent-ink" />
              </div>
            </div>
          </div>

          {/* Panel 3: Commerce Backend Infrastructure */}
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-ink/20">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-[#17172B] flex items-center justify-center text-accent border border-white/10">
                  <Server className="size-6" />
                </div>
                <span className="rounded-full bg-sunken px-3 py-1 text-xs font-semibold text-muted">
                  Application 03
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                Commerce Backend
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Rock-solid, single source of truth for pricing, inventory reservations, webhooks, and asynchronous workflows.
              </p>

              {/* Backend Feature Points */}
              <ul className="mt-6 space-y-3 text-sm text-ink/90">
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Single source of truth:</strong> Node.js &amp; Express 5 with zero stock overselling.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Automated scheduler:</strong> Cancels expired unpaid carts and restores stock reserves.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Signed webhooks:</strong> Razorpay payment and Delhivery scan events verified via HMAC SHA-256.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </span>
                  <span><strong>Bank-grade encryption:</strong> API keys and payment secrets stored AES-256-GCM encrypted.</span>
                </li>
              </ul>
            </div>

            {/* Embedded Mini UI Mockup */}
            <div className="mt-8 rounded-2xl border border-line bg-sunken/60 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
                <span>System Health &amp; Sync</span>
                <span className="text-accent-ink font-bold">Socket.IO Live</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-card p-2.5 border border-line text-xs">
                <div>
                  <p className="font-bold text-ink">Redis Cache &amp; MongoDB Atlas</p>
                  <p className="text-[11px] text-muted">99.98% uptime · 0 inconsistencies</p>
                </div>
                <Zap className="size-4 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
