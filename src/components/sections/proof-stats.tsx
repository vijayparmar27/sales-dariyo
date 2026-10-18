import { Cpu, Database, ShieldCheck, ShoppingCart } from "lucide-react";

import { CUSTOM_BUILD } from "@/data/catalog";
import { count } from "@/lib/format";

export function ProofStats() {
  const stats = [
    {
      value: "3",
      unit: "Apps",
      label: "One Unified Platform",
      detail: "Storefront, operator admin panel, and high-performance backend working in sync.",
      icon: ShoppingCart,
    },
    {
      value: "2.7",
      unit: "Lakh+",
      label: "Lines of TypeScript",
      detail: "End-to-end type safety across browser, server, and database models.",
      icon: Cpu,
    },
    {
      value: `${count(CUSTOM_BUILD.hours)}`,
      unit: "Hours",
      label: "Saved Engineering Time",
      detail: "Battle-tested architecture ready to deploy immediately in your cloud accounts.",
      icon: Database,
    },
    {
      value: "100%",
      unit: "Ownership",
      label: "Full Source Code License",
      detail: "No monthly SaaS license lock-in, no revenue share or GMV percentage cut.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="border-y border-line/80 bg-sunken/40 py-12 sm:py-16 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-3xl border border-line bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1 text-ink">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
                    {item.value}
                  </span>
                  <span className="text-sm font-bold text-muted uppercase">
                    {item.unit}
                  </span>
                </div>
                <div className="size-9 rounded-2xl bg-sunken flex items-center justify-center text-muted group-hover:bg-[#0054F9] group-hover:text-white transition-colors">
                  <item.icon className="size-4" />
                </div>
              </div>

              <h3 className="mt-4 text-sm font-bold tracking-tight text-ink">
                {item.label}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
