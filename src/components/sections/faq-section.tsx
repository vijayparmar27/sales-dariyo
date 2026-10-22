import { Plus } from "lucide-react";

import { SectionHeading } from "@/components/ui";
import { HOSTING_TIERS, HOURLY_RATE, LICENCE, SUPPORT_PLANS, USAGE_FEES } from "@/data/catalog";
import { rupees, weeks } from "@/lib/format";
import { packageFigures } from "@/lib/packages";
import { buildQuote } from "@/lib/quote";

export function FaqSection() {
  const packages = packageFigures();
  const fastest = packages[0];
  const fullest = packages.at(-1);

  const launchTier = HOSTING_TIERS[0];
  const launchHostingCost = launchTier
    ? buildQuote({ moduleIds: [], planId: "none", hostingId: launchTier.id }).hosting.total
    : null;

  const firstPlan = SUPPORT_PLANS.filter((p) => p.monthlyFee > 0).sort((a, b) => a.monthlyFee - b.monthlyFee)[0];

  const faqs = [
    {
      question: "Who owns the source code?",
      answer: (
        <>
          <p>{LICENCE}</p>
          <p className="mt-3">
            Your servers, domain, customer records and database are in your company&apos;s name from
            day one, so you are never locked into a vendor.
          </p>
        </>
      ),
    },
    {
      question: "Is hosting included in the setup fee?",
      answer: (
        <p>
          No. Servers, database and storage are billed to your own accounts by each provider, so
          your data stays yours.
          {launchTier && launchHostingCost !== null
            ? ` On the ${launchTier.name} estimate that comes to about ${rupees(launchHostingCost)} a month.`
            : null}
        </p>
      ),
    },
    {
      question: "Can you build features we need that are not listed?",
      answer: (
        <p>
          Yes. Work outside the module list is {rupees(HOURLY_RATE)} an hour, scoped and quoted in
          writing before it starts, or taken from your monthly support hours.
        </p>
      ),
    },
    {
      question: "What do we need to provide?",
      answer: (
        <p>
          Your logo, colours and fonts, product details with weights and photos, and business
          accounts with Razorpay, Delhivery and Firebase. We walk you through opening and verifying
          each one.
        </p>
      ),
    },
    {
      question: "How long does setup take?",
      answer:
        fastest && fullest ? (
          <p>
            About {weeks(fastest.launchWeeks)} for the {fastest.name} package and about{" "}
            {weeks(fullest.launchWeeks)} for {fullest.name}, from kick-off once we have your
            assets. The price builder shows the plan for any set of modules.
          </p>
        ) : (
          <p>The price builder shows the plan for any set of modules.</p>
        ),
    },
    {
      question: "Does it suit products other than food?",
      answer: (
        <p>
          Yes. It is built for packaged goods sold by unit, weight or pack size, retail and
          wholesale: coffee, tea, spices, pantry goods, wellness products and regional foods. Send
          us your catalogue and we will tell you how well it fits.
        </p>
      ),
    },
    {
      question: "Are there fees or commissions on our sales?",
      answer: (
        <>
          <p>None from us. You pay only the providers&apos; own charges:</p>
          <ul className="mt-3 space-y-1.5">
            {USAGE_FEES.map((fee) => (
              <li key={fee.name}>
                <strong className="font-medium text-ink">{fee.name}:</strong> {fee.detail}.
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      question: "What happens after the 30 days of free fixes?",
      answer: (
        <p>
          You can take a monthly support plan
          {firstPlan
            ? `, from ${rupees(firstPlan.monthlyFee)} a month for ${firstPlan.covers.join(", ").toLowerCase()},`
            : ""}{" "}
          or pay {rupees(HOURLY_RATE)} an hour when you need help.
        </p>
      ),
    },
  ];

  return (
    <section id="faqs" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Questions, <span className="italic text-muted">answered.</span>
                </>
              }
            >
              Licensing, hosting, timelines and money. If yours is not here,{" "}
              <a href="/contact" className="font-semibold text-ink underline hover:text-brand-blue">
                ask us directly
              </a>
              .
            </SectionHeading>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-7">
          {faqs.map((faq) => (
            <details key={faq.question} className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium text-ink transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-ring sm:text-xl">
                <span>{faq.question}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sunken text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-[#111218] group-open:text-white">
                  <Plus aria-hidden className="size-4" />
                </span>
              </summary>
              <div className="-mt-1 pr-14 pb-6 text-base leading-relaxed text-muted">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
