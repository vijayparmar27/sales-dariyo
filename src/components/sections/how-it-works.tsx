import { Check, ClipboardList, Rocket, Server, Sliders } from "lucide-react";

import { SectionHeading } from "@/components/ui";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Package & Modules",
      icon: Sliders,
      body: "Pick your package (Starter, Growth, or Complete) and select optional modules using our live pricing calculator. Receive an itemized proposal with transparent milestones.",
      deliverable: "Custom proposal & timeline agreement",
    },
    {
      step: "02",
      title: "Project Kickoff & Brand Assets",
      icon: ClipboardList,
      body: "We align on your schedule and gather your brand assets: logo files, color palette, packaging photography, product catalog specifications, and SKU weights.",
      deliverable: "Signed roadmap & asset handbook",
    },
    {
      step: "03",
      title: "Cloud Setup & Integrations",
      icon: Server,
      body: "We provision dedicated cloud infrastructure in your company name, connect Razorpay payment gateways, configure Delhivery logistics webhooks, and import your initial catalog.",
      deliverable: "Fully configured staging environment",
    },
    {
      step: "04",
      title: "Launch & 30-Day Warranty",
      icon: Rocket,
      body: "Your store goes live on your custom domain. We conduct hands-on training for your operations team and provide 30 days of included bug fixes and launch warranty before monthly support.",
      deliverable: "Live store & admin handover",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Implementation Roadmap"
          title={
            <>
              From Kickoff to First Sale in{" "}
              <span className="italic font-serif font-normal text-muted">
                Four Predictable Steps.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          No endless enterprise consulting loops or surprise budget overruns. A disciplined, transparent deployment process engineered to get your brand selling quickly.
        </SectionHeading>

        {/* 4-Step Process Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col justify-between rounded-3xl border border-line bg-card p-6 sm:p-7 shadow-xs hover:border-ink/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-[#0054F9] text-white font-bold text-xs shadow-xs">
                    {item.step}
                  </span>
                  <div className="size-8 rounded-xl bg-sunken flex items-center justify-center text-muted">
                    <item.icon className="size-4" />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                  {item.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/80 text-[11px] font-semibold text-ink flex items-center gap-1.5">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span className="text-muted">Result: <strong className="text-ink">{item.deliverable}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
