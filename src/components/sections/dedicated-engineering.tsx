import { ArrowRight, ArrowUpRight, Clock, Code2, Globe, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

import { ButtonLink, SectionHeading } from "@/components/ui";
import { ROLE_LANDING_PAGES } from "@/data/seo-landing-data";
import { STAFFING_ROLES } from "@/data/services-catalog";
import { getServerI18n } from "@/lib/i18n/server";

interface DedicatedEngineeringProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function DedicatedEngineering({ searchParams }: DedicatedEngineeringProps) {
  const queryParams = searchParams ? await searchParams : undefined;
  const { formatMoney } = await getServerI18n(queryParams);
  const fallbackRole = STAFFING_ROLES[0]!;

  const guarantees = [
    {
      icon: Clock,
      title: "48-Hour Rapid Kickoff",
      desc: "Pre-vetted senior engineers ready to join your Slack, Jira, and GitHub repositories within 2 business days.",
    },
    {
      icon: Shield,
      title: "1-Week Risk-Free Trial",
      desc: "Evaluate commit velocity and code quality for 7 days. If the developer doesn't meet your standards, pay ₹0.",
    },
    {
      icon: Code2,
      title: "100% IP & Private Git Ownership",
      desc: "All source code, pull requests, and documentation are committed directly to your company's private Git repositories.",
    },
    {
      icon: Globe,
      title: "Guaranteed Timezone Overlap",
      desc: "Daily 4 to 5 hours of synchronous overlap across US (EST/PST), Europe (GMT/CET), and Asia-Pacific (IST).",
    },
  ];

  const roleList = Object.values(ROLE_LANDING_PAGES);

  return (
    <section id="engineering-services" className="scroll-mt-24 py-16 sm:py-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Talent Staffing & Custom Development"
          title={
            <>
              Need Custom Engineering?{" "}
              <span className="italic text-brand-blue">Hire Dedicated Senior Developers</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          Beyond our turnkey commerce codebase, we provide pre-vetted full-time and part-time software engineers to build custom integrations, optimize Core Web Vitals, and scale cloud infrastructure.
        </SectionHeading>

        {/* 4 Guarantees Bar */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-xs hover:border-brand-blue/30 transition-colors"
              >
                <div className="size-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-base text-ink mb-1.5">{g.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 8 Staffing Roles Grid */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-ink">
              Specialized Engineering Roles Available for Immediate Hire
            </h3>
            <p className="text-sm text-muted mt-1">
              Pre-vetted individual contributors and full tech pods available with guaranteed 48-hour onboarding.
            </p>
          </div>
          <ButtonLink variant="secondary" href="/services">
            <span>View Full Services Catalog</span>
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleList.map((role) => {
            const staffingRole = STAFFING_ROLES.find((r) => r.id === role.roleId) ?? fallbackRole;
            const roleHref = `/services/${role.slug}`;

            return (
              <div
                key={role.slug}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-6 shadow-xs hover:border-brand-blue/40 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-brand-blue bg-brand-blue/10 rounded-full px-2.5 py-0.5">
                      {role.badge}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      48h Kickoff
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-ink group-hover:text-brand-blue transition-colors leading-snug">
                    <Link href={roleHref}>{role.h1}</Link>
                  </h4>

                  <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                    {role.subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.skillsList.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md bg-sunken px-2 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-muted uppercase tracking-wider">Starting Rate</div>
                    <div className="text-sm font-bold text-ink">
                      {formatMoney(staffingRole.monthlyFullTimeRate)}
                      <span className="text-xs font-normal text-muted"> / mo</span>
                    </div>
                  </div>

                  <Link
                    href={roleHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Interview</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Value Proposition Footer Banner */}
        <div className="mt-14 rounded-3xl border border-brand-blue/20 bg-linear-to-r from-brand-blue/5 via-sky-500/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Turnkey Codebase + Dedicated Pods
            </span>
            <h4 className="font-serif text-2xl font-bold text-ink mt-1">
              Buy the Clone License Today, Scale with Our Engineers Tomorrow
            </h4>
            <p className="text-sm text-muted mt-2">
              Get the entire production commerce stack deployed in 48 hours, then retain our developers to build ERP connectors, custom checkout rules, and mobile apps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ButtonLink variant="primary" href="/pricing">
              <Sparkles className="size-4 text-brand-blue" />
              <span>Calculate Clone License Quote</span>
            </ButtonLink>
            <ButtonLink variant="secondary" href="/services">
              <span>Explore Hiring Plans</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
