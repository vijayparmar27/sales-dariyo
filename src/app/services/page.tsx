import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Globe,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Zap,
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
import { rupees } from "@/lib/format";
import { getContactChannels } from "@/lib/site-api";

import { ServiceInquiryModal } from "./service-inquiry-modal";

export const metadata: Metadata = {
  title: "Software Engineering & Dedicated Developer Staffing",
  description:
    "Hire dedicated developers in Node.js, React.js, FastAPI, React Native, and Next.js, or build custom web and mobile applications with end-to-end delivery.",
};

const SERVICE_ICONS = {
  Globe: Globe,
  Smartphone: Smartphone,
  Users: Users,
  Cpu: Cpu,
  Server: Server,
};

export default async function ServicesPage() {
  const channels = await getContactChannels();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-16 print:p-0">
      {/* Hero Header */}
      <div className="max-w-4xl print:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <CatalisBadge variant="blue">
            Software Engineering & Staffing
          </CatalisBadge>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1 text-xs font-medium text-ink shadow-2xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dedicated Engineers Ready for Deployment</span>
          </span>
        </div>

        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl">
          Custom Web & Mobile Apps. <br />
          <span className="italic text-brand-blue">Dedicated Senior Developers.</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg max-w-3xl">
          Separate from our turnkey Dariyo store clone, we provide professional software engineering,
          bespoke web & mobile application building, and dedicated developer staffing.
          Specialized in <strong>Node.js, React.js, FastAPI, React Native, and Next.js 16</strong>.
        </p>

        {/* 4 Value Highlights */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">💻 Dedicated Talent</span>
            <span className="mt-0.5 block text-muted">Vetted senior engineers working in your timezone</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">📱 Mobile & Web</span>
            <span className="mt-0.5 block text-muted">React Native iOS/Android & Next.js 16 portals</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">⚡ Modern Stack</span>
            <span className="mt-0.5 block text-muted">Node.js, React, FastAPI, Python, TypeScript</span>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3.5 shadow-xs">
            <span className="block font-semibold text-ink">🛡️ 100% Ownership</span>
            <span className="mt-0.5 block text-muted">Clean code in your private GitHub with no lock-in</span>
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
                <span>Hire Developers / Request Quote</span>
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
              <span>Chat on WhatsApp</span>
            </a>
          ) : null}

          {channels.phone ? (
            <a
              href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
              className={buttonClass("secondary", "px-4 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <Phone className="size-4 text-muted" />
              <span>Call {channels.phone}</span>
            </a>
          ) : null}

          <Link
            href="/pricing"
            className="text-xs font-semibold text-muted hover:text-ink px-3 py-2 inline-flex items-center gap-1 transition-colors ml-auto sm:ml-0"
          >
            <span>Need the Dariyo commerce clone instead? View Clone Pricing</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Section 1: The 4 Core Service Offerings */}
      <section className="mt-16 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              What We Build & Deliver
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            End-to-end software development services executed by senior developers.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SERVICE_CATEGORIES.map((service) => {
            const IconComponent = SERVICE_ICONS[service.iconName] || Globe;
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
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{service.summary}</p>

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
                    {service.deliverables.map((d) => (
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
                    defaultService={service.title}
                    trigger={
                      <button
                        type="button"
                        className="text-xs font-semibold text-brand-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Discuss this service</span>
                        <ArrowRight className="size-3" />
                      </button>
                    }
                  />
                  <span className="text-[11px] font-mono text-muted">Milestone or Staffing</span>
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
              <CatalisBadge variant="blue">Staff Augmentation</CatalisBadge>
              <span className="text-xs font-semibold text-muted font-mono uppercase tracking-wider">
                Flexible Monthly Retainer
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              Hire Dedicated Developers
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            Senior engineers embedded directly into your team. Daily standups, direct Slack access, and full code ownership.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAFFING_ROLES.map((role) => (
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
                    {rupees(role.hourlyRate)}/hr
                  </span>
                </div>

                <h3 className="font-semibold text-ink text-base">{role.title}</h3>
                <p className="mt-0.5 text-xs font-mono text-muted">{role.stack}</p>

                <p className="mt-3 text-xs text-muted leading-relaxed">
                  {role.description}
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
                    <span className="text-[10px] text-muted block uppercase tracking-wider">Full-Time (160h)</span>
                    <span className="font-serif text-lg font-semibold text-ink">
                      {rupees(role.monthlyFullTimeRate)}
                    </span>
                    <span className="text-[10px] text-muted"> / mo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted block uppercase tracking-wider">Part-Time (80h)</span>
                    <span className="text-sm font-medium text-ink">
                      {rupees(role.monthlyPartTimeRate)}
                    </span>
                    <span className="text-[10px] text-muted"> / mo</span>
                  </div>
                </div>

                <ServiceInquiryModal
                  channels={channels}
                  defaultService="Hire Dedicated Developers"
                  defaultStack={role.title}
                  trigger={
                    <button
                      type="button"
                      className="w-full rounded-xl bg-ink text-white hover:bg-black py-2.5 text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      Hire {role.title.replace("Developer", "").replace("Engineer", "").trim()} Developer
                    </button>
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* 3 Flexible Engagement Models */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="font-serif text-2xl text-ink mb-6">How Our Developer Engagement Works</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => (
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
                <h4 className="font-semibold text-ink text-base">{model.title}</h4>
                <p className="mt-1 text-xs font-medium text-brand-blue">{model.commitment}</p>
                <p className="mt-2 text-xs text-muted leading-relaxed">{model.summary}</p>

                <ul className="mt-4 space-y-1.5 text-xs text-muted border-t border-line/60 pt-3">
                  {model.inclusions.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Fixed-Scope Project Packages */}
      <section className="mt-20 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-line gap-2">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              Turnkey Project Delivery
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              Fixed-Scope Website & Mobile Packages
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            Prefer a fixed-price deliverable instead of hourly staffing? We deliver complete milestones on guaranteed timelines.
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
                    {pkg.indicativeFee ? "Indicative Package Fee" : "Pricing Model"}
                  </span>
                  <span className="font-serif text-2xl font-bold text-ink">
                    {pkg.indicativeFee ? rupees(pkg.indicativeFee) : (pkg.pricingLabel || "Custom Quote")}
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
                      Choose {pkg.name}
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
              <CatalisBadge variant="blue">Our Technology Stacks</CatalisBadge>
              <span className="text-xs font-semibold text-muted font-mono uppercase tracking-wider">
                TypeScript & Python Specialization
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
              Mastery in Modern Frameworks
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm">
            We write clean, production-grade code that any engineering team can easily adopt, scale, and maintain.
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
            Engineering Standard
          </CatalisBadge>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] text-ink">
            Why Companies Hire Our Engineers
          </h2>
          <p className="mt-3 text-sm text-muted">
            We are not a brokerage agency. We are active practitioners who design, build, and maintain production systems at scale.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">🚀 Fast Onboarding</span>
            <p className="text-muted leading-relaxed">
              Skip 2-3 months of recruiting. Dedicated developers can begin sprint work within 3 to 5 business days.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">💬 Direct Collaboration</span>
            <p className="text-muted leading-relaxed">
              No account managers in the middle. Your team communicates directly with developers on Slack and GitHub.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">🛡️ Full Code Ownership</span>
            <p className="text-muted leading-relaxed">
              Every line of code and intellectual property belongs strictly to you with zero proprietary licensing lock-ins.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border border-line shadow-2xs">
            <span className="font-semibold text-ink text-sm block mb-1">📈 Monthly Flexibility</span>
            <p className="text-muted leading-relaxed">
              Scale your team up or down on a flexible 30-day notice with zero termination fees or long-term lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Final Conversion Banner */}
      <section className="mt-12 rounded-[28px] border border-line bg-card p-8 sm:p-12 text-center print:hidden shadow-xs">
        <CatalisBadge variant="blue" className="mb-4">
          Ready to Start?
        </CatalisBadge>
        <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] text-ink max-w-2xl mx-auto">
          Let’s discuss your next project or dedicated developer hire
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          Tell us about your requirements and we will assemble the right engineering talent or fixed-scope roadmap for your goals.
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
                <span>Request Custom Quote & Staffing</span>
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
              <span>Chat on WhatsApp</span>
            </a>
          ) : null}

          {channels.email ? (
            <a
              href={`mailto:${channels.email}?subject=${encodeURIComponent("Software Engineering & Developer Staffing Inquiry")}`}
              className={buttonClass("secondary", "px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2")}
            >
              <Mail className="size-4 text-muted" />
              <span>Email Us</span>
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}

