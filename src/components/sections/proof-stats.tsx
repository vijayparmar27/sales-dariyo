import { CUSTOM_BUILD } from "@/data/catalog";
import { count } from "@/lib/format";
import { getServerI18n } from "@/lib/i18n/server";

/**
 * ProofStats section displaying key verified metric statistics.
 */
export async function ProofStats() {
  const { t } = await getServerI18n();

  const stats = [
    { value: "3", label: t.proof.stats.apps },
    { value: count(CUSTOM_BUILD.hours), label: t.proof.stats.hours },
    { value: "0%", label: t.proof.stats.commission },
    { value: "30", label: t.proof.stats.fixes },
  ];

  return (
    <section aria-label={t.proof.ariaLabel} className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="reveal flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-serif text-6xl leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-7xl">
                {stat.value}
              </span>
              <span className="max-w-40 text-sm leading-snug text-muted">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
