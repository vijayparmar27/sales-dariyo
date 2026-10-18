import { CUSTOM_BUILD } from "@/data/catalog";
import { count } from "@/lib/format";

/*
 * Big serif figures with a short line beside each, as on the reference.
 * Every figure here can be checked: the build hours come from the catalogue,
 * the rest from what the licence and setup promise. (A "2.7 lakh lines of
 * TypeScript" figure used to sit here; it only held on a raw line count that
 * included seed data, so it went.)
 */
const STATS = [
  { value: "3", label: "Connected apps, built as one" },
  { value: count(CUSTOM_BUILD.hours), label: "Hours of engineering behind it" },
  { value: "0%", label: "Commission on your sales" },
  { value: "30", label: "Days of free fixes after launch" },
] as const;

export function ProofStats() {
  return (
    <section aria-label="The platform in numbers" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {STATS.map((stat) => (
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
