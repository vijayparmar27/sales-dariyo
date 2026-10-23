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
import { getServerI18n } from "@/lib/i18n/server";

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

export async function CustomizableModules() {
  const { formatMoney, t } = await getServerI18n();
  const addOns = MODULES.filter((m) => !m.required);

  return (
    <section id="modules" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.customModules.eyebrow}
          title={
            <>
              {t.customModules.titlePart1}{" "}
              <span className="italic text-muted">{t.customModules.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.customModules.subtitle}
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {addOns.map((module) => {
            const Icon = MODULE_ICONS[module.id] || Sparkles;
            const locM = t.catalog.modules[module.id];
            const name = locM?.name || module.name;
            const summary = locM?.summary || module.summary;
            const includes = locM?.includes || module.includes;

            return (
              <article
                key={module.id}
                className="reveal group flex flex-col rounded-[28px] bg-sunken p-6 transition-colors hover:bg-[#ECEFF4]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink tabular-nums">{formatMoney(module.setupFee)}</span>
                </div>

                <h3 className="mt-6 font-serif text-[1.75rem] leading-[1.05] tracking-[-0.01em] text-ink">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>

                <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-muted">
                  {includes.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/pricing?m=${module.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-brand-blue hover:underline"
                >
                  {t.customModules.quoteThis}
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/pricing" variant="secondary" className="h-11 px-6 text-sm">
            {t.customModules.configureAll}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
