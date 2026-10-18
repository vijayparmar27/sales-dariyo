import { ArrowRight, Check } from "lucide-react";

import { ButtonLink, SectionHeading } from "@/components/ui";
import { GST, SUPPORT_PLANS } from "@/data/catalog";
import { rupees } from "@/lib/format";

export function PackagesPricing() {
  const cheapestPaidPlan = Math.min(...SUPPORT_PLANS.filter((p) => p.monthlyFee > 0).map((p) => p.monthlyFee));

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter",
      price: 175000,
      launchTime: "15 working days (~3 weeks)",
      blurb: "For businesses ready to launch their branded online store.",
      badge: null,
      features: [
        "Branded online store (product catalog, pack sizes, cart & checkout)",
        "Razorpay payments (UPI intent, cards, net banking, and COD)",
        "Delhivery logistics with automated AWB & live order tracking",
        "Operator admin panel (orders, stock, warehouses & customers)",
        "Customer portal with Google, Mobile OTP or Email sign-in",
        "Automated GST tax invoices and credit notes",
        "Staff accounts with roles and permissions",
        "PWA support (installs on phones as an app)",
        "30 days of included bug fixes and launch warranty",
      ],
      cta: "Choose Starter",
      variant: "secondary" as const,
    },
    {
      id: "growth",
      name: "Growth",
      price: 310000,
      launchTime: "24 working days (~4–5 weeks)",
      blurb: "For brands ready to scale marketing, visual media, and traffic.",
      badge: "Most Popular",
      features: [
        "Everything included in the Starter package",
        "Coupons, discount codes, and store-subsidized delivery offers",
        "3D product model viewer (360° interactive turn) on product pages",
        "Product video gallery and pack-size swipeable media",
        "Recipes and product usage guides linked to buyable items",
        "Native sales dashboard and visitor tracking built into admin",
        "Google Analytics with Core Web Vitals performance telemetry",
        "30 days of included bug fixes and launch warranty",
      ],
      cta: "Choose Growth",
      variant: "primary" as const,
    },
    {
      id: "complete",
      name: "Complete",
      price: 710000,
      launchTime: "53 working days (~8–10 weeks)",
      blurb: "For businesses requiring the full retail, wholesale, and 3D suite.",
      badge: "Enterprise Suite",
      features: [
        "Everything included in the Growth package",
        "Wholesale & B2B trade portal with automated quote requests",
        "B2B stock holds, capacity planning & Delhivery freight logistics",
        "Custom 3D animated interactive home page with mobile edition",
        "3D packaging studio in admin (box, tray, sleeve design & export)",
        "SEO guide pages in 22 Indian languages with sitemaps",
        "Google Merchant XML automated product feed",
        "30 days of included bug fixes and launch warranty",
      ],
      cta: "Choose Complete",
      variant: "secondary" as const,
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Transparent Investment"
          title={
            <>
              Predictable Pricing.{" "}
              <span className="italic font-serif font-normal text-muted">
                Zero Revenue Cuts.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          One-time setup fee for your permanent software license and cloud deployment.
          No recurring software subscription, no revenue-share percentage on your sales.
        </SectionHeading>

        {/* 3 Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {pricingTiers.map((tier) => {
            const isPopular = tier.id === "growth";
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  isPopular
                    ? "border-2 border-[#0054F9] bg-card shadow-xl lg:-translate-y-2 ring-4 ring-[#0054F9]/15"
                    : "border border-line bg-card shadow-sm hover:border-ink/20"
                }`}
              >
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-ink">
                      {tier.name}
                    </h3>
                    {tier.badge ? (
                      <span className="rounded-full bg-[#0054F9] px-3 py-1 text-xs font-bold text-white shadow-xs">
                        {tier.badge}
                      </span>
                    ) : (
                      <span className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold text-muted">
                        One-Time Setup
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed min-h-[40px]">
                    {tier.blurb}
                  </p>

                  {/* Price */}
                  <div className="mt-6 border-y border-line/80 py-4">
                    <div className="flex items-baseline gap-1 text-ink">
                      <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                        {rupees(tier.price)}
                      </span>
                      <span className="text-xs font-medium text-muted">
                        {GST.enabled ? "+ 18% GST" : "one-time"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted font-medium">
                      Setup &amp; deployment · Ready in {tier.launchTime}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      Package Inclusions:
                    </p>
                    <ul className="mt-4 space-y-3 text-xs sm:text-sm text-ink/90">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-6 border-t border-line/80">
                  <ButtonLink
                    href={`/pricing?p=${tier.id}`}
                    variant={isPopular ? "blue" : "secondary"}
                    className="w-full justify-center py-3 text-sm font-bold"
                  >
                    {tier.cta}
                    <ArrowRight aria-hidden className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Subtext & Configurator Callout */}
        <div className="mt-12 rounded-3xl border border-line bg-sunken/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-base font-bold text-ink">
              Need to pick custom modules or calculate monthly support?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
              Optional support plans start at {rupees(cheapestPaidPlan)}/month or pay-by-the-hour ({rupees(1000)}/hr). Cloud hosting is billed directly to your own provider accounts from ~₹2,880/month.
            </p>
          </div>
          <ButtonLink href="/pricing" variant="secondary" className="whitespace-nowrap px-6 py-3 font-semibold">
            Open Interactive Price Builder
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
