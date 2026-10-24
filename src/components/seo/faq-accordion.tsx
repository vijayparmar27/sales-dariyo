import { Plus } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  faqs: FaqItem[];
  className?: string;
  contactPrompt?: string;
  contactHref?: string;
}

/**
 * Accessible, semantic FAQ Accordion with native HTML details/summary elements.
 * Fully visible in the DOM to satisfy Google's FAQPage structured data visible-content guidelines.
 */
export function FaqAccordion({
  id = "faqs",
  eyebrow = "Frequently Asked Questions",
  title,
  titleItalic,
  subtitle,
  faqs,
  className = "py-16 sm:py-24",
  contactPrompt = "Have a question not listed here?",
  contactHref = "/contact",
}: FaqAccordionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={eyebrow}
              title={
                <>
                  {title}{" "}
                  {titleItalic && <span className="italic text-muted">{titleItalic}</span>}
                </>
              }
            >
              {subtitle && <span className="block mb-3">{subtitle}</span>}
              <span className="block text-muted text-sm">
                {contactPrompt}{" "}
                <Link
                  href={contactHref}
                  className="font-semibold text-ink underline hover:text-brand-blue"
                >
                  Contact our engineering team
                </Link>
                .
              </span>
            </SectionHeading>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-7">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium text-ink transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-ring sm:text-xl">
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {faq.question}
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sunken text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-[#111218] group-open:text-white group-hover:scale-105">
                  <Plus aria-hidden className="size-4" />
                </span>
              </summary>
              <div className="-mt-1 pr-14 pb-6 text-base leading-relaxed text-muted">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
