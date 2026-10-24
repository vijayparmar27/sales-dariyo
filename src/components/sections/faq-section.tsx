import { Plus } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui";
import { HOSTING_TIERS, HOURLY_RATE, USAGE_FEES } from "@/data/catalog";
import { formatPrice } from "@/lib/i18n/currencies";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";
import { buildQuote } from "@/lib/quote";

/**
 * FAQ section with localized questions and answers, and multi-currency rates.
 */
export async function FaqSection() {
  const { t, currency } = await getServerI18n();
  const packages = packageFigures();
  const fastest = packages[0];
  const fullest = packages.at(-1);

  const launchTier = HOSTING_TIERS[0];
  const launchHostingCost = launchTier
    ? buildQuote({ moduleIds: [], planId: "none", hostingId: launchTier.id }, currency).hosting.total
    : null;

  const faqs = [
    {
      question: t.faq.items.sourceCode.q,
      answer: (
        <>
          <p>{t.faq.items.sourceCode.a1}</p>
          <p className="mt-3">{t.faq.items.sourceCode.a2}</p>
        </>
      ),
    },
    {
      question: t.faq.items.hosting.q,
      answer: (
        <p>
          {t.faq.items.hosting.a}
          {launchTier && launchHostingCost !== null
            ? ` (${t.pricing.hostingAbout} ~${formatPrice(launchHostingCost, currency)}/${t.common.month}).`
            : null}
        </p>
      ),
    },
    {
      question: t.faq.items.customFeatures.q,
      answer: (
        <p>
          {t.faq.items.customFeatures.a} ({formatPrice(HOURLY_RATE, currency)} {t.pricing.anHour}).
        </p>
      ),
    },
    {
      question: t.faq.items.requirements.q,
      answer: <p>{t.faq.items.requirements.a}</p>,
    },
    {
      question: t.faq.items.launchTime.q,
      answer: (
        <p>
          {t.faq.items.launchTime.a}
          {fastest && fullest
            ? ` (~${fastest.launchWeeks}-${fullest.launchWeeks} ${t.pricing.weeksEstimate}).`
            : null}
        </p>
      ),
    },
    {
      question: t.faq.items.ongoingCosts.q,
      answer: (
        <>
          <p>{t.faq.items.ongoingCosts.a}</p>
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
  ];

  return (
    <section id="faqs" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t.faq.eyebrow}
              title={
                <>
                  {t.faq.titlePart1}{" "}
                  <span className="italic text-muted">{t.faq.titleItalic}</span>
                </>
              }
            >
              {t.faq.subtitle}{" "}
              <Link href="/contact" className="font-semibold text-ink underline hover:text-brand-blue">
                {t.common.contactUs}
              </Link>
              .
            </SectionHeading>
          </div>
        </div>

        <div className="reveal divide-y divide-line border-y border-line lg:col-span-7">
          {faqs.map((faq) => (
            <details key={faq.question} className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium text-ink transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-ring sm:text-xl">
                <span className="transition-transform duration-200 group-hover:translate-x-1">{faq.question}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sunken text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-[#111218] group-open:text-white group-hover:scale-105">
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
