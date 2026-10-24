import { Check, CheckCircle2, Clock, Globe, MessageCircle, Shield, Sparkles, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalisBadge, buttonClass } from "@/components/ui";
import { ROLE_LANDING_PAGES } from "@/data/seo-landing-data";
import { STAFFING_ROLES } from "@/data/services-catalog";
import { getServerI18n } from "@/lib/i18n/server";
import {
  DEVELOPER_HIRING_HOW_TO,
  buildFaqJsonLd,
  buildHowToJsonLd,
  getCanonicalUrl,
  getLanguageAlternates,
  serializeJsonLd,
} from "@/lib/seo";
import { getContactChannels } from "@/lib/site-api";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { InternalLinksCluster } from "@/components/seo/internal-links-cluster";
import { ServiceInquiryModal } from "../service-inquiry-modal";

import type { LanguageCode } from "@/lib/i18n/languages";
import { getRoleLocalizedMetadata } from "@/lib/seo-landing-multilingual";

interface PageProps {
  params: Promise<{ role: string }>;
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ROLE_LANDING_PAGES).map((role) => ({ role }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const pageData = ROLE_LANDING_PAGES[role];
  if (!pageData) return { title: "Role not found" };

  const resolved = searchParams ? await searchParams : {};
  const lang = (resolved?.lang || "en") as LanguageCode;
  const localized = getRoleLocalizedMetadata(role, lang);
  const alternates = getLanguageAlternates(`/services/${role}`);
  const canonicalUrl = getCanonicalUrl(`/services/${role}`, lang);

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

export default async function RoleLandingPage({ params, searchParams }: PageProps) {
  const { role } = await params;
  const pageData = ROLE_LANDING_PAGES[role];
  if (!pageData) notFound();

  const fallbackRole = STAFFING_ROLES[0]!;
  const staffingRole = STAFFING_ROLES.find((r) => r.id === pageData.roleId) ?? fallbackRole;
  const queryParams = searchParams ? await searchParams : undefined;
  const [channels, { formatMoney }] = await Promise.all([
    getContactChannels(),
    getServerI18n(queryParams),
  ]);

  const lang = (queryParams?.lang || "en") as LanguageCode;
  const localized = getRoleLocalizedMetadata(role, lang);
  const isEnglish = lang === "en";
  const titleParts = localized.title.split(" | ");
  const heroH1 = isEnglish ? pageData.h1 : titleParts[0];
  const heroItalic = isEnglish ? pageData.h1Italic : (titleParts[1] ?? "");
  const heroSubtitle = isEnglish ? pageData.subtitle : localized.description;

  const faqJsonLd = serializeJsonLd(buildFaqJsonLd(pageData.faqs));
  const howToJsonLd = serializeJsonLd(buildHowToJsonLd({ ...DEVELOPER_HIRING_HOW_TO, inLanguage: lang }));

  const roleServiceJsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://solutions.dariyo.in/services/${role}#service`,
    name: pageData.h1,
    description: pageData.metaDescription,
    serviceType: "Dedicated Developer Staffing",
    provider: {
      "@type": "Organization",
      "@id": "https://solutions.dariyo.in/#organization",
      name: "Dariyo",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${pageData.h1} Hiring Plans`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Full-Time Dedicated (160 hrs/mo)",
          price: staffingRole.monthlyFullTimeRate,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Part-Time Dedicated (80 hrs/mo)",
          price: staffingRole.monthlyPartTimeRate,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  });

  const breadcrumbs = [
    { name: "Services", path: "/services" },
    { name: pageData.badge, path: `/services/${role}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-16 print:p-0">
      <Breadcrumbs items={breadcrumbs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: roleServiceJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToJsonLd }}
      />

      {/* Hero Header */}
      <div className="max-w-4xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CatalisBadge variant="blue">{pageData.badge}</CatalisBadge>
          <span className="text-xs text-muted font-medium bg-sunken rounded-full px-3 py-1">
            Kickoff in 24–48 Hours
          </span>
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/60 rounded-full px-3 py-1">
            1-Week Risk-Free Trial
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl tracking-[-0.03em] text-ink leading-[1.05]">
          {heroH1}{" "}
          <span className="italic text-muted font-normal block sm:inline">
            {heroItalic}
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          {heroSubtitle}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ServiceInquiryModal
            channels={channels}
            trigger={
              <button
                type="button"
                className={buttonClass("primary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
              >
                <Sparkles className="size-4 text-brand-blue" />
                <span>Interview This Role</span>
              </button>
            }
          />

          {channels.whatsapp && (
            <a
              href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi Dariyo Team, I would like to interview and hire a dedicated ${pageData.h1} for our team.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary", "px-5 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>
          )}
        </div>
      </div>

      {/* Trust & Guarantee Highlights Bar */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <Clock className="size-5 text-brand-blue shrink-0" />
          <div>
            <div className="text-xs text-muted">Rapid Kickoff</div>
            <div className="text-sm font-semibold text-ink">24–48 Hours</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="size-5 text-emerald-600 shrink-0" />
          <div>
            <div className="text-xs text-muted">Satisfaction</div>
            <div className="text-sm font-semibold text-ink">1-Week Trial</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="size-5 text-brand-blue shrink-0" />
          <div>
            <div className="text-xs text-muted">Timezone Overlap</div>
            <div className="text-sm font-semibold text-ink">4+ Hours Daily</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="size-5 text-emerald-600 shrink-0" />
          <div>
            <div className="text-xs text-muted">Code Ownership</div>
            <div className="text-sm font-semibold text-ink">100% Private IP</div>
          </div>
        </div>
      </div>

      {/* Technical Skills & Capabilities Matrix */}
      <section className="mt-14 sm:mt-20">
        <div className="mb-6">
          <CatalisBadge variant="blue">Core Specializations</CatalisBadge>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl tracking-tight text-ink">
            Technical Stack &amp; Verified Skills
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Every candidate is rigorously vetted through production coding challenges, architecture design tests, and real-time communication reviews.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pageData.skillsList.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card p-3.5 text-sm font-medium text-ink shadow-xs"
            >
              <Check className="size-4 text-emerald-600 shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture Focus & Outcomes */}
      <section className="mt-14 sm:mt-20 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="size-5 text-brand-blue" />
            <h3 className="text-lg font-semibold text-ink">What You Gain</h3>
          </div>
          <ul className="space-y-3.5">
            {pageData.keyOutcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                <CheckCircle2 className="size-4 text-brand-blue shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-ink">Architecture Focus</h3>
          </div>
          <div className="space-y-4">
            {pageData.technicalFocus.map((group) => (
              <div key={group.category} className="border-t border-line/60 pt-3.5 first:border-0 first:pt-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.points.map((pt) => (
                    <li key={pt} className="text-sm text-ink/90 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-blue" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Staffing Rates */}
      <section className="mt-14 sm:mt-20 rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <CatalisBadge variant="blue">Transparent Rate Card</CatalisBadge>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-ink">
              Engagement &amp; Pricing Models
            </h2>
            <p className="mt-1 text-sm text-muted">
              Zero recruiting markups, no hidden onboarding fees, and flexible monthly scaling.
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted">Starting from</span>
            <span className="text-2xl font-semibold text-ink">
              {formatMoney(staffingRole.hourlyRate)}
            </span>
            <span className="text-xs text-muted">/hour</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-blue/30 bg-surface p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  Full-Time Dedicated (160 hrs/mo)
                </span>
                <span className="rounded bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 text-[11px] font-medium text-brand-blue">
                  Most Popular
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-ink">
                {formatMoney(staffingRole.monthlyFullTimeRate)}
                <span className="text-xs font-normal text-muted ml-1.5">/month</span>
              </div>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                40 hours/week embedded directly in your team&apos;s Slack, Jira, and GitHub with daily standups.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-line/60">
              <ServiceInquiryModal
                channels={channels}
                trigger={
                  <button
                    type="button"
                    className={buttonClass("primary", "w-full py-2.5 text-xs font-semibold text-center")}
                  >
                    Select Full-Time Plan
                  </button>
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Part-Time Dedicated (80 hrs/mo)
                </span>
                <span className="rounded bg-sunken px-2 py-0.5 text-[11px] font-medium text-muted">
                  Flexible
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-ink">
                {formatMoney(staffingRole.monthlyPartTimeRate)}
                <span className="text-xs font-normal text-muted ml-1.5">/month</span>
              </div>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                20 hours/week dedicated support for ongoing feature delivery, bug squashing, and maintenance.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-line/60">
              <ServiceInquiryModal
                channels={channels}
                trigger={
                  <button
                    type="button"
                    className={buttonClass("secondary", "w-full py-2.5 text-xs font-semibold text-center")}
                  >
                    Select Part-Time Plan
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Visible FAQ Accordion matching FAQPage Schema */}
      <FaqAccordion
        id="role-faqs"
        eyebrow="Hiring & Engagement FAQs"
        title="Common Questions About Hiring"
        titleItalic={pageData.h1}
        subtitle="Transparent answers on trial periods, IP ownership, time tracking, and communication."
        faqs={pageData.faqs}
        className="mt-16 sm:mt-24 border-t border-line/60 pt-16"
      />

      {/* Semantic Topic Cluster & Cross-Link Hub */}
      <InternalLinksCluster className="mt-16 sm:mt-24" />
    </div>
  );
}
