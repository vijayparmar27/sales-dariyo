import { CheckCircle2, Cloud, Database, ExternalLink, Layers, Lock, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalisBadge, buttonClass } from "@/components/ui";
import { SOLUTION_LANDING_PAGES } from "@/data/seo-landing-data";
import { buildComparisonJsonLd, buildFaqJsonLd, buildSoftwareApplicationJsonLd, buildSoftwareSourceCodeJsonLd, getLanguageAlternates, serializeJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { InternalLinksCluster } from "@/components/seo/internal-links-cluster";

import type { LanguageCode } from "@/lib/i18n/languages";
import { getSolutionLocalizedMetadata } from "@/lib/seo-landing-multilingual";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SOLUTION_LANDING_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = SOLUTION_LANDING_PAGES[slug];
  if (!pageData) return { title: "Solution not found" };

  const resolved = searchParams ? await searchParams : {};
  const lang = (resolved?.lang || "en") as LanguageCode;
  const localized = getSolutionLocalizedMetadata(slug, lang);
  const alternates = getLanguageAlternates(`/solutions/${slug}`);
  const canonicalUrl = `https://solutions.dariyo.in/solutions/${slug}`;

  return {
    title: {
      absolute: localized.title,
    },
    description: localized.description,
    keywords: localized.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`,
      title: localized.title,
      description: localized.description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      site: "@dariyo_official",
      title: localized.title,
      description: localized.description,
    },
  };
}

export default async function SolutionLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = SOLUTION_LANDING_PAGES[slug];
  if (!pageData) notFound();

  const isComparison = slug === "compare-ecommerce-platforms";
  const softwareJsonLd = serializeJsonLd(buildSoftwareApplicationJsonLd());
  const sourceCodeJsonLd = serializeJsonLd(buildSoftwareSourceCodeJsonLd());
  const faqJsonLd = serializeJsonLd(buildFaqJsonLd(pageData.faqs));
  const comparisonJsonLd = isComparison ? serializeJsonLd(buildComparisonJsonLd()) : null;

  const breadcrumbs = [
    { name: "Platform Solutions", path: "/pricing" },
    { name: pageData.badge, path: `/solutions/${slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-16 print:p-0">
      <Breadcrumbs items={breadcrumbs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: softwareJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sourceCodeJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      {comparisonJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: comparisonJsonLd }}
        />
      ) : null}

      {/* Hero Header */}
      <div className="max-w-4xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CatalisBadge variant="blue">{pageData.badge}</CatalisBadge>
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/60 rounded-full px-3 py-1">
            0% Recurring GMV Cut
          </span>
          <span className="text-xs text-muted font-medium bg-sunken rounded-full px-3 py-1">
            Permanent Commercial License
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl tracking-[-0.03em] text-ink leading-[1.05]">
          {pageData.h1}{" "}
          <span className="italic text-muted font-normal block sm:inline">
            {pageData.h1Italic}
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          {pageData.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className={buttonClass("primary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
          >
            <Sparkles className="size-4 text-brand-blue" />
            <span>Calculate Setup Quote</span>
          </Link>

          <a
            href="https://dariyo.in"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("secondary", "px-5 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
          >
            <ExternalLink className="size-4 text-brand-blue" />
            <span>View Live Demo (Dariyo.in)</span>
          </a>
        </div>
      </div>

      {/* Value Pillars Bar */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <Lock className="size-5 text-brand-blue shrink-0" />
          <div>
            <div className="text-xs text-muted">Source Code</div>
            <div className="text-sm font-semibold text-ink">100% Unminified</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Cloud className="size-5 text-emerald-600 shrink-0" />
          <div>
            <div className="text-xs text-muted">Cloud Hosting</div>
            <div className="text-sm font-semibold text-ink">Your Own AWS / VPS</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Database className="size-5 text-brand-blue shrink-0" />
          <div>
            <div className="text-xs text-muted">Customer Data</div>
            <div className="text-sm font-semibold text-ink">Zero Lock-In</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="size-5 text-emerald-600 shrink-0" />
          <div>
            <div className="text-xs text-muted">Commissions</div>
            <div className="text-sm font-semibold text-ink">0% Forever</div>
          </div>
        </div>
      </div>

      {/* Comparison Table Section (High-Intent SEO Ranking Engine) */}
      {isComparison ? (
        <section className="mt-14 sm:mt-20">
          <div className="mb-6">
            <CatalisBadge variant="blue">Side-by-Side Evaluation</CatalisBadge>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl tracking-tight text-ink">
              3-Year Total Cost of Ownership (TCO) &amp; Architecture Matrix
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              Modeled for an ambitious commerce brand processing $1,000,000 annual GMV (~2,500 orders/month).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-xs">
            <table className="w-full text-left text-sm border-collapse min-w-[680px]">
              <caption className="sr-only">eCommerce Platform Comparison Matrix</caption>
              <thead>
                <tr className="border-b border-line bg-sunken/40">
                  <th scope="col" className="p-4 font-semibold text-ink w-1/4">Evaluation Metric</th>
                  <th scope="col" className="p-4 font-semibold text-brand-blue bg-brand-blue/5 border-x border-brand-blue/20 w-1/4">
                    <span className="flex items-center gap-1.5">
                      <span>Dariyo Clone</span>
                      <span className="text-[10px] bg-brand-blue text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Recommended</span>
                    </span>
                  </th>
                  <th scope="col" className="p-4 font-semibold text-muted w-1/4">Shopify Plus</th>
                  <th scope="col" className="p-4 font-semibold text-muted w-1/4">MedusaJS / Saleor</th>
                  <th scope="col" className="p-4 font-semibold text-muted w-1/4">In-House Build</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">Source Code Rights</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    100% Unminified TypeScript
                  </td>
                  <td className="p-4 text-muted">0% (Closed SaaS Lock-In)</td>
                  <td className="p-4 text-muted">Backend Only (Build UI DIY)</td>
                  <td className="p-4 text-muted">100% Custom Build</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">GMV Commission / Rev-Share</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    0% Commission (Keep 100%)
                  </td>
                  <td className="p-4 text-muted">0.5% – 2.0% GMV Cut</td>
                  <td className="p-4 text-muted">0% Engine Fee</td>
                  <td className="p-4 text-muted">0% Engine Fee</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">Turnkey B2B Wholesale</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    Included Out-of-the-Box
                  </td>
                  <td className="p-4 text-muted">$2,000/mo Plus or Paid Apps</td>
                  <td className="p-4 text-muted">Requires Custom Engineering</td>
                  <td className="p-4 text-muted">Requires Custom Engineering</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">Storefront &amp; Admin Tech</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    Next.js 16 + React 19 + Express
                  </td>
                  <td className="p-4 text-muted">Liquid Theme + Shopify Admin</td>
                  <td className="p-4 text-muted">Build Storefront &amp; Admin DIY</td>
                  <td className="p-4 text-muted">Build Everything from Scratch</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">3D Three.js Product Viewer</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    Pre-Integrated Canvas
                  </td>
                  <td className="p-4 text-muted">Expensive 3rd-Party Plugin</td>
                  <td className="p-4 text-muted">Not Included</td>
                  <td className="p-4 text-muted">Custom 3D Dev ($8k–$15k)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-medium text-ink">Time to Launch</th>
                  <td className="p-4 font-semibold text-emerald-600 bg-brand-blue/5 border-x border-brand-blue/20">
                    48 Hours (Turnkey Deploy)
                  </td>
                  <td className="p-4 text-muted">2 – 4 Weeks</td>
                  <td className="p-4 text-muted">4 – 6 Months</td>
                  <td className="p-4 text-muted">6 – 12 Months</td>
                </tr>
                <tr className="bg-sunken/20 font-semibold">
                  <th scope="row" className="p-4 text-ink">3-Year TCO ($1M Annual GMV)</th>
                  <td className="p-4 text-emerald-700 dark:text-emerald-300 bg-brand-blue/10 border-x border-brand-blue/20 text-base">
                    ~$3,180 Total
                  </td>
                  <td className="p-4 text-rose-600">~$99,000+</td>
                  <td className="p-4 text-amber-700">~$50,000+</td>
                  <td className="p-4 text-rose-600">~$110,000+</td>
                </tr>
                <tr className="bg-emerald-50 dark:bg-emerald-950/40">
                  <th scope="row" className="p-4 font-semibold text-emerald-800 dark:text-emerald-200">Your 3-Year Capital Savings</th>
                  <td className="p-4 font-bold text-emerald-800 dark:text-emerald-200 bg-brand-blue/15 border-x border-brand-blue/30 text-base">
                    Save $80,000+ to $105,000+
                  </td>
                  <td className="p-4 text-muted">—</td>
                  <td className="p-4 text-muted">—</td>
                  <td className="p-4 text-muted">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Core Architectural Features */}
      <section className="mt-14 sm:mt-20">
        <div className="mb-6">
          <CatalisBadge variant="blue">Solution Features</CatalisBadge>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl tracking-tight text-ink">
            Engineered for High-Conversion Commercial Scale
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Production-hardened commerce modules battle-tested under thousands of daily visitors and live payments.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {pageData.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-xs hover:border-brand-blue/40 transition-colors"
            >
              <h3 className="text-base font-semibold text-ink mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture Overview */}
      <section className="mt-14 sm:mt-20 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="size-5 text-brand-blue" />
          <h3 className="text-lg font-semibold text-ink">Technical Architecture Highlights</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {pageData.architecturePoints.map((pt) => (
            <div key={pt} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visible FAQ Accordion matching FAQPage Schema */}
      <FaqAccordion
        id="solution-faqs"
        eyebrow="Commercial & Technical FAQs"
        title="Frequently Asked Questions"
        titleItalic={`About ${pageData.badge}`}
        subtitle="Transparent answers on licensing rights, hosting requirements, and customization."
        faqs={pageData.faqs}
        className="mt-16 sm:mt-24 border-t border-line/60 pt-16"
      />

      {/* Semantic Topic Cluster & Cross-Link Hub */}
      <InternalLinksCluster className="mt-16 sm:mt-24" />
    </div>
  );
}
