import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  Globe2,
  Layers,
  Sparkles,
  Tag,
  Video,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

import { ButtonLink, SectionHeading } from "@/components/ui";
import { MODULES } from "@/data/catalog";
import { rupees } from "@/lib/format";

const MODULE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  wholesale: Layers,
  offers: Tag,
  home3d: Sparkles,
  media3d: Video,
  studio: Box,
  seo: Globe2,
  content: BookOpen,
  analytics: BarChart3,
};

export function CustomizableModules() {
  const addOns = MODULES.filter((m) => !m.required);

  return (
    <section id="modules" className="scroll-mt-24 py-24 sm:py-32 bg-sunken/40 border-y border-line/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Modular Architecture"
          title={
            <>
              Extend Your Store.{" "}
              <span className="italic font-serif font-normal text-muted">
                Add Only What You Need.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          Every store starts with the rock-solid core foundation. Add wholesale, 3D product visualization, multilingual search pages, or analytics whenever your business is ready.
        </SectionHeading>

        {/* Modules Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {addOns.map((module) => {
            const Icon = MODULE_ICONS[module.id] || Sparkles;
            return (
              <div
                key={module.id}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-ink/20 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-2xl bg-sunken flex items-center justify-center text-ink group-hover:bg-accent group-hover:text-accent-ink transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-sm font-extrabold text-ink tabular-nums">
                      {rupees(module.setupFee)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-ink">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {module.summary}
                  </p>

                  {/* Micro points */}
                  <ul className="mt-4 space-y-1.5 border-t border-line/80 pt-3 text-[11px] text-muted">
                    {module.includes.slice(0, 2).map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11px] font-semibold text-muted group-hover:text-ink">
                  <span>+{module.setupDays} working days</span>
                  <Link
                    href={`/pricing?m=${module.id}`}
                    className="inline-flex items-center gap-1 text-ink group-hover:underline font-bold"
                  >
                    Select in Builder
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="mt-12 text-center">
          <ButtonLink href="/pricing" variant="primary" className="px-6 py-3 font-bold text-sm">
            Launch Interactive Module Configurator
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

