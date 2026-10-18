import type { Metadata } from "next";

import { CatalisBadge } from "@/components/ui";
import {
  GROUPS,
  HOSTING_TIERS,
  HOURLY_RATE,
  MODULES,
  NOT_INCLUDED,
  PACKAGES,
  SUPPORT_PLANS,
  USAGE_FEES,
} from "@/data/catalog";
import { rupees } from "@/lib/format";
import { buildQuote } from "@/lib/quote";
import { mailHref, quoteText, requestOrigin, whatsappHref } from "@/lib/quote-message";
import {
  packageModules,
  parseSelection,
  pricingHref,
  type SearchParams,
} from "@/lib/selection";

import {
  Configurator,
  type ChoiceOption,
  type GroupOption,
  type PackageOption,
} from "./configurator";
import { QuoteSummary, QuoteTotals } from "./quote-summary";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pick the modules you need and see the one-time setup fee, the monthly support plan and the hosting estimate.",
};

/**
 * Rendered per request from the URL: the selection is in the query string, the
 * quote is computed here, and the configurator gets back only display strings
 * plus the finished summary.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const selection = parseSelection(await searchParams);
  const quote = buildQuote(selection);
  const shareUrl = `${await requestOrigin()}${pricingHref(selection)}`;
  const message = quoteText(quote, shareUrl);
  const issuedOn = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const groups: GroupOption[] = GROUPS.map((group) => ({
    id: group.id,
    name: group.name,
    blurb: group.blurb,
    modules: MODULES.filter((m) => m.group === group.id).map((m) => ({
      id: m.id,
      name: m.name,
      summary: m.summary,
      includes: [...m.includes],
      price: rupees(m.setupFee),
      required: m.required === true,
      note: m.note ?? null,
    })),
  })).filter((group) => group.modules.length > 0);

  // Each package card shows its own setup price, worked out by the same
  // function as the quote rather than kept as a second figure that could
  // disagree with it.
  const packages: PackageOption[] = PACKAGES.map((pkg) => {
    const moduleIds = packageModules(pkg.id) ?? [];
    return {
      id: pkg.id,
      name: pkg.name,
      blurb: pkg.blurb,
      price: rupees(buildQuote({ ...selection, moduleIds }).setup.subtotal),
      moduleIds,
    };
  });

  const plans: ChoiceOption[] = SUPPORT_PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.monthlyFee > 0 ? `${rupees(plan.monthlyFee)} a month` : "Pay as you go",
    detail:
      plan.monthlyFee > 0
        ? `${plan.hoursPerMonth} hours a month, then ${rupees(HOURLY_RATE)} an hour`
        : `${rupees(HOURLY_RATE)} an hour`,
    covers: [...plan.covers],
  }));

  const hosting: ChoiceOption[] = HOSTING_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    price: `about ${rupees(buildQuote({ ...selection, hostingId: tier.id }).hosting.total)} a month`,
    detail: tier.blurb,
    covers: [],
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-32 sm:px-6 lg:pb-12 print:p-0">
      <div className="max-w-3xl print:hidden">
        <CatalisBadge variant="blue" className="mb-4">
          Interactive Package Builder
        </CatalisBadge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-ink">
          Build Your Commerce Package
        </h1>
        <p className="mt-4 text-base sm:text-lg text-pretty text-muted leading-relaxed font-normal">
          Pick the modules your business needs. The one-time setup fee, monthly support plan, and launch timeline update automatically in real-time.
        </p>
      </div>

      <Configurator
        selection={selection}
        groups={groups}
        packages={packages}
        plans={plans}
        hosting={hosting}
        summary={
          <QuoteSummary
            quote={quote}
            shareUrl={shareUrl}
            whatsappHref={whatsappHref(message)}
            mailHref={mailHref(message)}
            issuedOn={issuedOn}
          />
        }
        totals={<QuoteTotals quote={quote} />}
      />

      <section className="mt-16 grid gap-6 md:grid-cols-2 print:hidden">
        <div className="rounded-3xl border border-line bg-card p-6">
          <h2 className="text-lg font-semibold">Fees that grow with your sales</h2>
          <p className="mt-1 text-sm text-muted">Paid by you to each service, not to us.</p>
          <ul className="mt-4 space-y-3 text-sm">
            {USAGE_FEES.map((fee) => (
              <li key={fee.name}>
                <span className="font-semibold">{fee.name}</span>
                <span className="block text-muted">{fee.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-card p-6">
          <h2 className="text-lg font-semibold">Not included</h2>
          <p className="mt-1 text-sm text-muted">
            Quoted separately, or arranged by you. Extra work is {rupees(HOURLY_RATE)} an hour,
            agreed before it starts.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
