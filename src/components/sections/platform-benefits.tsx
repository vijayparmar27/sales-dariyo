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
import { rupees } from "@/lib/format";

/** The pack-size card shows the demo store's first product, at its real prices. */
const PACK_EXAMPLE = DEMO_STORE.products[0];

/*
 * Checked against the platform code in October 2026. Earlier versions of
 * these cards promised SMS and WhatsApp tracking alerts, phone-confirmed cash
 * on delivery, PDF report exports and a 29,000-pincode figure; none of those
 * is in the platform, so none is claimed here.
 */

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

export function PlatformBenefits() {
  return (
    <section id="features" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Built to help you sell more, run lean and{" "}
              <span className="italic text-muted">grow steadily.</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          Made for packaged food, drinks, spices and regional products sold in retail packs and
          wholesale cases.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          <FeatureCard
            index={1}
            icon={Users}
            title="Retail and wholesale, in one store"
            footnote="One stock count for both, so neither channel sells what the other has promised."
            className="lg:col-span-7"
            detail={
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-20px_rgba(17,18,24,0.3)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Users aria-hidden className="size-4 text-brand-blue" />
                    Retail shop
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Quick checkout, UPI apps, coupons, free delivery over an amount you set, installs
                    like an app.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-20px_rgba(17,18,24,0.3)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Boxes aria-hidden className="size-4 text-brand-blue" />
                    Trade portal
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Case prices, quote requests, stock held for each deal, and credit terms for
                    business accounts.
                  </p>
                </div>
              </div>
            }
          >
            Most platforms make you run two stores or pay for an enterprise plan. Here shoppers buy
            single packs while approved trade buyers get bulk prices, quotes and GST invoices, from
            the same catalogue.
          </FeatureCard>

          <FeatureCard
            index={2}
            icon={Scale}
            title="Pack sizes and units"
            footnote="Parcel weight is added up from the pack weights for Delhivery's rates."
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
                        <span className="text-[11px] text-muted line-through">{rupees(pack.compareAtPrice)}</span>
                      ) : null}
                      <span className="font-semibold text-ink">{rupees(pack.price)}</span>
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl bg-white p-2.5 ring-2 ring-brand-blue">
                  <span className="font-medium text-ink">Wholesale, by the kg</span>
                  <span className="font-semibold text-brand-blue">On quote</span>
                </div>
              </div>
            }
          >
            Grams, kilos, pouches, jars or multi-packs: each pack has its own SKU, price, weight and
            stock.
          </FeatureCard>

          <FeatureCard
            index={3}
            icon={Truck}
            title="Delhivery shipping"
            footnote="Customers follow every order live in their account."
            className="lg:col-span-4"
            detail={<Chip title="Labels in batches" value="4×6 or A4" sub="Pickups booked from the admin panel" />}
          >
            A pincode check at checkout, shipments booked from the admin panel, and tracking that
            updates itself from Delhivery&apos;s scans.
          </FeatureCard>

          <FeatureCard
            index={4}
            icon={CreditCard}
            title="Payments and COD"
            footnote="Payments go to your own Razorpay account, not ours."
            className="lg:col-span-4"
            detail={<Chip title="UPI, cards, net banking" value="Razorpay" sub="Unpaid orders cancel themselves" />}
          >
            UPI apps through Razorpay, plus cards, net banking and cash on delivery, with limits per
            order and per account to keep COD sensible.
          </FeatureCard>

          <FeatureCard
            index={5}
            icon={Receipt}
            title="GST invoices"
            footnote="Business buyers' GSTINs are checked and kept on file."
            className="lg:col-span-4"
            detail={<Chip title="Invoice for every order" value="Print or PDF" sub="Credit notes for returns" />}
          >
            Every retail order and wholesale deal gets a GST invoice, with HSN codes and CGST, SGST
            or IGST worked out from the place of supply.
          </FeatureCard>

          {/* The licence, on the dark card */}
          <div className="reveal rounded-[28px] bg-[#111218] p-8 text-white sm:p-10 lg:col-span-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase">
                  <ShieldCheck aria-hidden className="size-3.5 text-[#7FB2FF]" />
                  Not another subscription
                </div>
                <h3 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                  Your servers. Your data.{" "}
                  <span className="italic text-white/70">Your own copy of the code.</span>
                </h3>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                  Rented platforms charge every month, take a cut of your sales and keep your
                  customer data. Here you get the full source code under a permanent licence, set up
                  on servers in your own name.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    Permanent licence for your business
                  </li>
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    Direct database and server access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check aria-hidden className="size-4 text-[#7FB2FF]" />
                    No commission on your sales
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start justify-center gap-2 lg:col-span-4 lg:items-end">
                <ButtonLink href="/pricing" variant="white" className="h-12 px-7 text-[15px]">
                  See transparent pricing
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <p className="text-xs text-white/60">One-time setup fee · no monthly licence fee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
