import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Server,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CatalisBadge, buttonClass } from "@/components/ui";
import {
  ENGAGEMENT_MODELS,
  PROJECT_PACKAGES,
  SERVICE_CATEGORIES,
  STAFFING_ROLES,
  TECHNOLOGIES,
} from "@/data/services-catalog";
import { getServerI18n } from "@/lib/i18n/server";
import { getContactChannels } from "@/lib/site-api";

import type { LanguageCode } from "@/lib/i18n/languages";
import {
  buildFaqJsonLd,
  buildServicesJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import { getLocalizedMetadata } from "@/lib/seo-multilingual";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqAccordion } from "@/components/seo/faq-accordion";
import { InternalLinksCluster } from "@/components/seo/internal-links-cluster";

import { ServiceInquiryModal } from "./service-inquiry-modal";

const SERVICES_FAQS = [
  {
    question: "How quickly can a dedicated developer join our project?",
    answer:
      "Pre-vetted developers can be onboarded and active in your repository and communication channels within 24 to 48 hours. For custom pods or specialized tech stacks, matching and kickoff takes 3 to 5 business days.",
  },
  {
    question: "What technologies and frameworks do your engineers specialize in?",
    answer:
      "Our core engineering stack includes Node.js (TypeScript, Express, Fastify, NestJS), Python (FastAPI, Django, PyTorch), React.js & Next.js (App Router, Server Components, SSR), React Native (cross-platform iOS & Android), PostgreSQL, Redis, Docker, and AWS / Hetzner cloud DevOps.",
  },
  {
    question: "Do you offer a risk-free trial period for dedicated developers?",
    answer:
      "Yes. Every dedicated staffing placement comes with a 1-week risk-free trial period. If you feel the engineer's velocity or communication does not match your team's expectations, you can request a replacement immediately at no cost or cancel without obligation.",
  },
  {
    question: "Who owns the intellectual property (IP) and code written by your engineers?",
    answer:
      "You own 100% of all intellectual property, source code, documentation, and database schemas. All code is committed directly into your private GitHub/GitLab repositories under strict Mutual NDA protection.",
  },
  {
    question: "How do your developers handle time zone overlap?",
    answer:
      "Our engineering team accommodates client time zones across North America (EST/PST), Europe (GMT/CET), the Middle East (GST), and Asia-Pacific (IST/SGT) with guaranteed daily synchronous overlap for standups, planning, and pair programming.",
  },
  {
    question: "Can we scale our developer team up or down based on roadmap demands?",
    answer:
      "Absolutely. Our dedicated developer staffing and team pods operate on flexible monthly cycles with standard 14-day notice for adjustments, giving you agile scaling without full-time hiring overhead or severance liabilities.",
  },
];

interface ServicesPageProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: ServicesPageProps): Promise<Metadata> {
  const resolved = searchParams ? await searchParams : {};
  const lang = (resolved?.lang || "en") as LanguageCode;
  return getLocalizedMetadata("services", lang, "/services");
}

const SERVICE_ICONS = {
  Globe: Globe,
  Smartphone: Smartphone,
  Users: Users,
  Cpu: Cpu,
  Server: Server,
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const [channels, { formatMoney, t }] = await Promise.all([
    getContactChannels(),
    getServerI18n(params),
  ]);

  const servicesJsonLd = serializeJsonLd(buildServicesJsonLd());
  const faqJsonLd = serializeJsonLd(buildFaqJsonLd(SERVICES_FAQS));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-16 print:p-0">
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: servicesJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      {/* Hero Header */}
      <div className="max-w-4xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <CatalisBadge variant="blue">
            {t.services.badge}
          </CatalisBadge>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1 text-xs font-medium text-ink shadow-2xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.services.readyBadge}</span>
          </span>
        </div>

        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
          {t.services.title} <br />
          <span className="italic text-brand-blue">{t.services.titleItalic}</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg max-w-3xl">
          {t.services.subtitle}
        </p>

        {/* 4 Value Highlights */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">💻 {t.services.highlights.talent.title}</span>
            <span className="mt-0.5 block text-muted">{t.services.highlights.talent.desc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">📱 {t.services.highlights.mobileWeb.title}</span>
            <span className="mt-0.5 block text-muted">{t.services.highlights.mobileWeb.desc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">⚡ {t.services.highlights.modernStack.title}</span>
            <span className="mt-0.5 block text-muted">{t.services.highlights.modernStack.desc}</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🛡️ {t.services.highlights.ownership.title}</span>
            <span className="mt-0.5 block text-muted">{t.services.highlights.ownership.desc}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ServiceInquiryModal
            channels={channels}
            trigger={
              <button
                type="button"
                className={buttonClass("primary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
              >
                <Sparkles className="size-4 text-brand-blue" />
                <span>{t.services.ctaQuote}</span>
              </button>
            }
          />

          {channels.whatsapp ? (
            <a
              href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent("Hi Dariyo Engineering Team, I'm interested in custom software development and dedicated developers.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary", "px-5 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{t.services.ctaWhatsApp}</span>
            </a>
          ) : null}

          {channels.phone ? (
            <a
              href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
              className={buttonClass("secondary", "px-4 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <Phone className="size-4 text-muted" />
              <span>{t.services.ctaCall} {channels.phone}</span>
            </a>
          ) : null}

          <Link
            href="/pricing"
            className="text-xs font-semibold text-muted hover:text-ink px-3 py-2 inline-flex items-center gap-1 transition-colors ml-auto sm:ml-0"
          >
            <span>{t.services.ctaCommerce}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Section 1: The 4 Core Service Offerings */}
      <section className="mt-16 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              {t.services.coreCapabilities.eyebrow}
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.services.coreCapabilities.title}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.services.coreCapabilities.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SERVICE_CATEGORIES.map((service) => {
            const IconComponent = SERVICE_ICONS[service.iconName] || Globe;
            const cat = t.services.categories[service.id];
            const title = cat?.title || service.title;
            const eyebrow = cat?.eyebrow || service.eyebrow;
            const summary = cat?.summary || service.summary;
            const deliverables = cat?.deliverables || service.deliverables;
            return (
              <div
                key={service.id}
                className="rounded-[28px] border border-line bg-card p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-brand-blue/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                      <IconComponent className="size-6" />
                    </span>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted bg-sunken px-2.5 py-1 rounded-lg border border-line">
                      {eyebrow}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-ink">{title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{summary}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-sunken border border-line px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-2 text-xs text-muted border-t border-line/60 pt-5">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <ServiceInquiryModal
                    channels={channels}
                    defaultService={title}
                    trigger={
                      <button
                        type="button"
                        className="text-xs font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t.services.inquireNow}</span>
                        <ArrowRight className="size-3" />
                      </button>
                    }
                  />
                  <span className="text-[11px] font-mono text-muted">{t.services.staffing}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Dedicated Developer Staffing by Role */}
      <section id="developers" className="mt-20 rounded-[28px] border border-line bg-sunken p-8 sm:p-10 shadow-xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CatalisBadge variant="blue">{t.services.hireRoles.eyebrow}</CatalisBadge>
              <span className="text-xs font-semibold text-muted font-mono uppercase tracking-wider">
                {t.services.staffing}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.services.hireRoles.title}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.services.hireRoles.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAFFING_ROLES.map((role) => {
            const locRole = t.services.roles[role.id];
            const roleTitle = locRole?.title || role.title;
            const roleSummary = locRole?.summary || role.description;
            return (
              <div
                key={role.id}
                className="rounded-2xl bg-card border border-line p-5 flex flex-col justify-between shadow-2xs hover:border-brand-blue/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md">
                      {role.experienceLevel}
                    </span>
                    <span className="text-xs font-medium text-muted">
                      {formatMoney(role.hourlyRate)}{t.services.perHour}
                    </span>
                  </div>

                  <h3 className="font-semibold text-ink text-base">{roleTitle}</h3>
                  <p className="mt-0.5 text-xs font-mono text-muted">{role.stack}</p>

                  <p className="mt-3 text-xs text-muted leading-relaxed">
                    {roleSummary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-sunken border border-line px-1.5 py-0.5 text-[10px] text-ink/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-line/60 pt-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-muted block uppercase tracking-wider">{t.services.fullTimeRate}</span>
                      <span className="font-serif text-lg font-semibold text-ink">
                        {formatMoney(role.monthlyFullTimeRate)}
                      </span>
                      <span className="text-[10px] text-muted"> /{t.common.month}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-muted block uppercase tracking-wider">{t.services.partTimeRate}</span>
                      <span className="text-sm font-medium text-ink">
                        {formatMoney(role.monthlyPartTimeRate)}
                      </span>
                      <span className="text-[10px] text-muted"> /{t.common.month}</span>
                    </div>
                  </div>

                  <ServiceInquiryModal
                    channels={channels}
                    defaultService={t.services.hireRoles.title}
                    defaultStack={roleTitle}
                    trigger={
                      <button
                        type="button"
                        className="w-full rounded-xl bg-ink text-white hover:bg-black py-2.5 text-xs font-semibold transition-colors cursor-pointer text-center"
                      >
                        {t.services.hireRoles.cta}
                      </button>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Flexible Engagement Models */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="font-serif text-2xl text-ink mb-6">{t.services.models.title}</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => {
              const locModel = t.services.engagement[model.id];
              const modelTitle = locModel?.title || model.title;
              const modelSummary = locModel?.description || model.summary;
              return (
                <div
                  key={model.id}
                  className={`rounded-2xl p-5 border ${
                    model.highlighted
                      ? "bg-card border-brand-blue/40 shadow-xs"
                      : "bg-card/70 border-line"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue">
                      {model.badge}
                    </span>
                  </div>
                  <h4 className="font-semibold text-ink text-base">{modelTitle}</h4>
                  <p className="mt-1 text-xs font-medium text-brand-blue">{model.commitment}</p>
                  <p className="mt-2 text-xs text-muted leading-relaxed">{modelSummary}</p>

                  <ul className="mt-4 space-y-1.5 text-xs text-muted border-t border-line/60 pt-3">
                    {model.inclusions.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Fixed-Scope Project Packages */}
      <section className="mt-20 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              {t.pricing.deliveryRoadmap.eyebrow}
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.services.fixedProjects}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.services.models.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-[24px] p-6 border flex flex-col justify-between ${
                pkg.highlighted
                  ? "bg-card border-brand-blue/50 shadow-md ring-1 ring-brand-blue/30"
                  : "bg-card border-line shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue">
                    {pkg.tier}
                  </span>
                  <span className="text-[11px] font-medium text-muted inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{pkg.typicalTimeline}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-ink">{pkg.name}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{pkg.summary}</p>

                <div className="mt-4 pb-4 border-b border-line">
                  <span className="text-[10px] uppercase tracking-wider text-muted block">
                    {pkg.indicativeFee ? "Package Investment" : "Pricing Model"}
                  </span>
                  <span className="font-serif text-2xl font-bold text-ink">
                    {pkg.indicativeFee ? formatMoney(pkg.indicativeFee) : (pkg.pricingLabel || "Custom Quote")}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-muted">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5">
                      <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <ServiceInquiryModal
                  channels={channels}
                  defaultService={pkg.name}
                  defaultModel="Fixed-Scope Milestone Project"
                  trigger={
                    <button
                      type="button"
                      className={`w-full rounded-full py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                        pkg.highlighted
                          ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm"
                          : "bg-ink text-white hover:bg-black"
                      }`}
                    >
                      {t.common.select} {pkg.name}
                    </button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Technology Deep-Dive & Architecture */}
      <section className="mt-20 rounded-[28px] border border-line bg-card p-8 sm:p-10 shadow-xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CatalisBadge variant="blue">{t.services.techProficiency.eyebrow}</CatalisBadge>
              <span className="text-xs font-semibold text-muted font-mono uppercase tracking-wider">
                {t.pricing.techSection.badge}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              {t.services.techProficiency.title}
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            {t.services.techProficiency.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGIES.map((tech) => (
            <div key={tech.id} className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-card px-2 py-0.5 rounded-md border border-line">
                    {tech.badge}
                  </span>
                  <span className="text-xs font-semibold text-ink">{tech.name}</span>
                </div>

                <h3 className="font-semibold text-ink text-base">{tech.tagline}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{tech.description}</p>

                <ul className="mt-4 space-y-1.5 text-xs text-muted border-t border-line/60 pt-3">
                  {tech.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-1.5">
                      <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-line/60 pt-3">
                <span className="text-[10px] font-semibold text-ink block uppercase tracking-wider">Best Suited For:</span>
                <p className="text-xs text-muted mt-0.5">{tech.bestFor}</p>
              </div>
            </div>
          ))}

          {/* Cloud & DevOps Card */}
          <div className="rounded-2xl bg-sunken p-5 border border-line flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-card px-2 py-0.5 rounded-md border border-line">
                  DevOps & Cloud
                </span>
                <span className="text-xs font-semibold text-ink">Docker & Cloud</span>
              </div>

              <h3 className="font-semibold text-ink text-base">Production Deployments & CI/CD</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Containerized Docker applications deployed on AWS, DigitalOcean, Hetzner, or Vercel with automated GitHub Actions.
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-muted border-t border-line/60 pt-3">
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Docker multi-stage containerization</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cloudflare edge CDN, SSL & DDoS mitigation</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated test suites & linting CI/CD</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 border-t border-line/60 pt-3">
              <span className="text-[10px] font-semibold text-ink block uppercase tracking-wider">Best Suited For:</span>
              <p className="text-xs text-muted mt-0.5">Zero-downtime releases, scalable hosting, and private cloud data sovereignty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Work With Us */}
      <section className="mt-20 rounded-[28px] bg-sunken p-8 sm:p-10 border border-line print:hidden">
        <div className="max-w-2xl">
          <CatalisBadge variant="blue" className="mb-3">
            {t.services.badge}
          </CatalisBadge>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
            {t.services.highlights.talent.title} & {t.services.highlights.modernStack.title}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {t.about.storyBody}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">🚀 {t.services.highlights.talent.title}</span>
            <p className="text-muted leading-relaxed">
              {t.services.highlights.talent.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">📱 {t.services.highlights.mobileWeb.title}</span>
            <p className="text-muted leading-relaxed">
              {t.services.highlights.mobileWeb.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">⚡ {t.services.highlights.modernStack.title}</span>
            <p className="text-muted leading-relaxed">
              {t.services.highlights.modernStack.desc}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">🛡️ {t.services.highlights.ownership.title}</span>
            <p className="text-muted leading-relaxed">
              {t.services.highlights.ownership.desc}
            </p>
          </div>
        </div>
      </section>

      {/* On-Page Accessible FAQ Section matching FAQPage Schema */}
      <FaqAccordion
        id="services-faqs"
        eyebrow="Staffing & Engineering FAQs"
        title="Everything You Need to Know"
        titleItalic="About Hiring Dedicated Engineers"
        subtitle="Clear answers on vetting, trial periods, timezone overlap, NDA, and IP ownership."
        faqs={SERVICES_FAQS}
        className="mt-16 border-t border-line/60 pt-16 sm:mt-20 sm:pt-20"
      />

      {/* Final Conversion Banner */}
      <section className="mt-12 rounded-[28px] border border-line bg-card p-8 sm:p-12 text-center print:hidden shadow-xs">
        <CatalisBadge variant="blue" className="mb-4">
          {t.contact.badge}
        </CatalisBadge>
        <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] text-ink max-w-2xl mx-auto">
          {t.contact.title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          {t.contact.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ServiceInquiryModal
            channels={channels}
            trigger={
              <button
                type="button"
                className={buttonClass("primary", "px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
              >
                <Sparkles className="size-4 text-brand-blue" />
                <span>{t.services.ctaQuote}</span>
              </button>
            }
          />

          {channels.whatsapp ? (
            <a
              href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent("Hi Dariyo Engineering Team, I would like to discuss hiring dedicated developers and custom software development.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{t.services.ctaWhatsApp}</span>
            </a>
          ) : null}

          {channels.email ? (
            <a
              href={`mailto:${channels.email}?subject=${encodeURIComponent("Software Engineering & Developer Staffing Inquiry")}`}
              className={buttonClass("secondary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <Mail className="size-4 text-muted" />
              <span>{t.pricing.staffingBanner.ctaEmail}</span>
            </a>
          ) : null}
        </div>
      </section>

      {/* Semantic Topic Cluster & Cross-Link Hub */}
      <InternalLinksCluster className="mt-16 sm:mt-24" />
    </div>
  );
}

