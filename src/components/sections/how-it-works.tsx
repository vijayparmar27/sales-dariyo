import { Check, ClipboardList, Rocket, Server, Sliders } from "lucide-react";

import { SectionHeading } from "@/components/ui";
import { PACKAGES } from "@/data/catalog";

export function HowItWorks() {
  const packageNames = PACKAGES.map((p) => p.name).join(", ");

  // What each step delivers follows SETUP_INCLUDES in the catalogue: servers
  // in the buyer's name, their own accounts connected, products loaded,
  // training, and 30 days of free fixes.
  const steps = [
    {
      title: "Choose your package",
      icon: Sliders,
      body: `Pick a package (${packageNames}) or your own set of modules in the price builder, and get an itemised quote.`,
      result: "An itemised quote and timeline",
    },
    {
      title: "Kick-off and brand",
      icon: ClipboardList,
      body: "We agree the schedule and collect your logo, colours, product photos, catalogue and pack weights.",
      result: "A signed plan and your assets",
    },
    {
      title: "Set up and connect",
      icon: Server,
      body: "We set up servers in your company's name, connect your Razorpay, Delhivery and sign-in accounts, and load your products.",
      result: "A staging store, fully set up",
    },
    {
      title: "Launch and support",
      icon: Rocket,
      body: "Your store goes live on your domain. We train your team on the admin panel and fix anything that breaks for 30 days.",
      result: "A live store, handed over",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From kick-off to first sale{" "}
              <span className="italic text-muted">in four steps.</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          No endless consulting and no surprise invoices: a fixed scope, a clear plan and a store
          that goes live on a date you agreed.
        </SectionHeading>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="reveal flex flex-col rounded-[28px] bg-sunken p-7">
              <div className="flex items-start justify-between">
                <span className="font-serif text-6xl leading-none tracking-[-0.03em] text-brand-blue tabular-nums">
                  0{index + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-xs">
                  <step.icon aria-hidden className="size-5" />
                </span>
              </div>

              <h3 className="mt-8 font-serif text-[1.85rem] leading-none tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>

              <p className="mt-auto flex items-start gap-2 pt-6 text-xs">
                <Check aria-hidden className="mt-px size-3.5 shrink-0 text-emerald-600" />
                <span className="text-muted">
                  You get: <strong className="font-medium text-ink">{step.result}</strong>
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
