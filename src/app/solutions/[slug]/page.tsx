import { CheckCircle2, Cloud, Database, ExternalLink, Layers, Lock, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalisBadge, buttonClass } from "@/components/ui";
import { SOLUTION_LANDING_PAGES } from "@/data/seo-landing-data";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildSoftwareApplicationJsonLd, buildSoftwareSourceCodeJsonLd, getLanguageAlternates, serializeJsonLd } from "@/lib/seo";
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

  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([
      { name: "Solutions", path: "/pricing" },
      { name: pageData.h1, path: `/solutions/${slug}` },
    ]),
  );

  const softwareJsonLd = serializeJsonLd(buildSoftwareApplicationJsonLd());
  const sourceCodeJsonLd = serializeJsonLd(buildSoftwareSourceCodeJsonLd());
  const faqJsonLd = serializeJsonLd(buildFaqJsonLd(pageData.faqs));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-16 print:p-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
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

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/pricing" className="hover:text-ink transition-colors">
          Platform Solutions
        </Link>
        <span>/</span>
        <span className="text-ink font-medium">{pageData.badge}</span>
      </nav>

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
