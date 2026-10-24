import { Check, ClipboardList, Rocket, Server, Sliders } from "lucide-react";

import { CardTilt3D } from "@/components/animation/card-tilt-3d";
import { SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getServerI18n } from "@/lib/i18n/server";

/**
 * HowItWorks section detailing the 4 onboarding and deployment steps.
 */
export async function HowItWorks() {
  const { t } = await getServerI18n();

  const steps = [
    {
      title: t.howItWorks.steps.step1.title,
      icon: Sliders,
      body: t.howItWorks.steps.step1.body,
      result: t.howItWorks.steps.step1.result,
    },
    {
      title: t.howItWorks.steps.step2.title,
      icon: ClipboardList,
      body: t.howItWorks.steps.step2.body,
      result: t.howItWorks.steps.step2.result,
    },
    {
      title: t.howItWorks.steps.step3.title,
      icon: Server,
      body: t.howItWorks.steps.step3.body,
      result: t.howItWorks.steps.step3.result,
    },
    {
      title: t.howItWorks.steps.step4.title,
      icon: Rocket,
      body: t.howItWorks.steps.step4.body,
      result: t.howItWorks.steps.step4.result,
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.howItWorks.eyebrow}
          title={
            <>
              {t.howItWorks.titlePart1}{" "}
              <span className="italic text-muted">{t.howItWorks.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.howItWorks.subtitle}
        </SectionHeading>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const staggers = ["stagger-1", "stagger-2", "stagger-3", "stagger-4"];
            return (
              <li key={step.title} className={cn("reveal", staggers[index])}>
                <CardTilt3D
                  maxTilt={9}
                  glare
                  glareOpacity={0.25}
                  className="card-lift group flex h-full flex-col rounded-[28px] bg-sunken p-7 border border-transparent hover:border-brand-blue/25 hover:shadow-xl cursor-default"
                >
                  <div className="flex items-start justify-between translate-z-30">
                    <span className="font-serif text-6xl leading-none tracking-[-0.03em] text-brand-blue tabular-nums transition-transform duration-300 group-hover:scale-105">
                      0{index + 1}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6">
                      <step.icon aria-hidden className="size-5" />
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-[1.85rem] leading-none tracking-[-0.01em] text-ink translate-z-20">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted translate-z-10">{step.body}</p>

                  <p className="mt-auto flex items-start gap-2 pt-6 text-xs translate-z-20">
                    <Check aria-hidden className="mt-px size-3.5 shrink-0 text-emerald-600 transition-transform duration-200 group-hover:scale-115" />
                    <span className="text-muted">
                      <strong className="font-medium text-ink">{step.result}</strong>
                    </span>
                  </p>
                </CardTilt3D>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
