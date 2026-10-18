import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/ui";
import { HOSTING_TIERS, HOURLY_RATE, LICENCE, PACKAGES } from "@/data/catalog";
import { rupees, weeks } from "@/lib/format";
import { buildQuote } from "@/lib/quote";

export function FaqSection() {
  const fastest = PACKAGES[0];
  const slowest = PACKAGES.at(-1);

  const launchTier = HOSTING_TIERS.find((t) => t.id === "launch") ?? HOSTING_TIERS[0];
  const launchHostingCost = launchTier
    ? buildQuote({ moduleIds: [], planId: "none", hostingId: launchTier.id }).hosting.total
    : 2880;

  const faqs = [
    {
      question: "Who owns the source code and intellectual property?",
      answer: (
        <>
          <p>{LICENCE}</p>
          <p className="mt-2">
            Your servers, domain name, customer records, and database are provisioned directly in your company&apos;s name from day one. You are never trapped in a closed proprietary vendor ecosystem.
          </p>
        </>
      ),
    },
    {
      question: "Is cloud hosting included in the one-time setup fee?",
      answer: (
        <p>
          No. To guarantee that you retain complete ownership of your data, cloud infrastructure (servers, database, and storage) is billed directly to your own accounts by each provider (AWS, DigitalOcean, MongoDB Atlas, Cloudflare). On the {launchTier?.name} tier estimate, this typically costs about {rupees(launchHostingCost)} a month.
        </p>
      ),
    },
    {
      question: "Can you build custom features or integrations we need?",
      answer: (
        <p>
          Yes. Additional engineering work outside the standard module catalog is billed at {rupees(HOURLY_RATE)} per hour, scoped and quoted in writing before development begins, or drawn from your monthly support plan hours.
        </p>
      ),
    },
    {
      question: "What brand assets and credentials do we need to provide?",
      answer: (
        <p>
          Your brand guidelines (logo files, color codes, typography), product specifications with weights and photography, and business accounts with Razorpay, Delhivery, and Firebase. We provide step-by-step guidance on opening and verifying each merchant integration.
        </p>
      ),
    },
    {
      question: "How long does the setup process take from kickoff to launch?",
      answer: (
        <p>
          Setup typically takes about 3 weeks ({weeks(3)}) for the {fastest?.name} package and about 8 to 10 weeks ({weeks(10)}) for the {slowest?.name} suite containing custom 3D animation and multilingual SEO, starting from kickoff and asset handover.
        </p>
      ),
    },
    {
      question: "Does the platform suit products other than food and beverages?",
      answer: (
        <p>
          Yes. The engine is purpose-built for any packaged consumer goods sold by unit, weight, or pack size in retail and wholesale—such as specialty coffee, tea, spices, gourmet pantry goods, wellness products, and regional foods. Contact us with your catalog and we will confirm fit immediately.
        </p>
      ),
    },
    {
      question: "Are there any hidden transaction fees or commissions on our sales?",
      answer: (
        <p>
          None from us. We charge zero platform commission or GMV percentage cuts on your revenue. You only pay standard third-party processing rates (e.g. ~2% for Razorpay online payments) and actual carrier freight to Delhivery.
        </p>
      ),
    },
    {
      question: "What happens after the 30-day post-launch warranty period?",
      answer: (
        <p>
          After your included 30 days of free post-launch support, you can subscribe to one of our predictable monthly maintenance plans (starting from ₹7,500/month for security updates, bug fixes, and uptime monitoring) or opt for pay-as-you-go hourly support.
        </p>
      ),
    },
  ];

  return (
    <section id="faqs" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Everything You Need to Know"
          title={
            <>
              Frequently Asked{" "}
              <span className="italic font-serif font-normal text-muted">
                Questions.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          Clear answers about licensing, cloud infrastructure, customization, and commercial terms.
        </SectionHeading>

        {/* Accordion List */}
        <div className="divide-y divide-line/80 border-y border-line/80">
          {faqs.map((faq, idx) => (
            <details
              key={faq.question}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-base sm:text-lg text-ink hover:text-muted transition-colors focus-visible:outline-2 focus-visible:outline-ring rounded-lg">
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted/60">0{idx + 1}</span>
                  <span>{faq.question}</span>
                </span>
                <span className="size-8 rounded-full bg-sunken flex items-center justify-center shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 group-hover:bg-[#0054F9] group-hover:text-white">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <div className="mt-4 pl-8 text-sm sm:text-base text-muted leading-relaxed font-normal">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
