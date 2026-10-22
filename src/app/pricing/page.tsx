import type { Metadata } from "next";

import { CatalisBadge, buttonClass } from "@/components/ui";
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
import { getContactChannels } from "@/lib/site-api";
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
  const channels = await getContactChannels();
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
    // pt-28: the site header is fixed over the page, not in its flow.
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-12 print:p-0">
      <div className="max-w-3xl print:hidden">
        <CatalisBadge variant="blue" className="mb-5">
          Price builder
        </CatalisBadge>
        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
          Build your <span className="italic text-muted">commerce package.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          Pick the modules your business needs. The setup fee, the monthly plan and the launch date
          update as you choose.
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
            whatsappHref={whatsappHref(message, channels.whatsapp)}
            mailHref={mailHref(message, channels.email)}
            issuedOn={issuedOn}
          />
        }
        totals={<QuoteTotals quote={quote} />}
      />

      {/* Custom Services & Dedicated Developer Staffing */}
      <section className="mt-16 rounded-[28px] border border-line bg-sunken p-8 sm:p-10 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <CatalisBadge variant="blue" className="mb-3">
              Services & Staffing
            </CatalisBadge>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              Custom Web & Mobile Development · Dedicated Developers
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
              Looking for custom web or mobile applications built to your exact specifications, or dedicated engineers to augment your team?
              We provide full-lifecycle software engineering in <strong>Node.js, React.js, FastAPI, React Native, and Next.js</strong>,
              along with dedicated developer talent on flexible engagement models.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="/contact"
              className={buttonClass("primary", "px-6 py-3 text-sm font-semibold")}
            >
              Talk to Our Engineering Team
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 print:hidden">
        <div className="rounded-[28px] bg-sunken p-7 sm:p-8">
          <h2 className="font-serif text-3xl tracking-[-0.01em]">Fees that grow with your sales</h2>
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
        <div className="rounded-[28px] bg-sunken p-7 sm:p-8">
          <h2 className="font-serif text-3xl tracking-[-0.01em]">Not included</h2>
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
