import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer select-none active:scale-[0.98]";

const VARIANTS = {
  primary:
    "bg-[#111218] text-white hover:bg-black hover:shadow-lg shadow-sm border border-transparent",
  blue:
    "bg-[#0054F9] text-white hover:bg-[#0045D8] hover:shadow-lg shadow-sm border border-transparent",
  white:
    "bg-white text-[#111218] hover:bg-white/95 hover:shadow-md shadow-sm border border-transparent",
  secondary:
    "border border-line bg-card text-ink hover:bg-sunken hover:border-ink/20 shadow-xs",
  dark:
    "bg-white text-[#111218] hover:bg-white/90 shadow-sm border border-white/20",
  "outline-dark":
    "border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-xs",
  ghost:
    "text-muted hover:text-ink hover:bg-sunken",
} as const;

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof VARIANTS }) {
  return <Link className={cn(BUTTON, VARIANTS[variant], className)} {...props} />;
}

export function ExternalButton({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof VARIANTS }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(BUTTON, VARIANTS[variant], className)}
      {...props}
    />
  );
}

export function buttonClass(variant: keyof typeof VARIANTS = "primary", className?: string) {
  return cn(BUTTON, VARIANTS[variant], className);
}

/** The filled five-point star the Catalis pills carry. */
export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-3.5", className)}>
      <path d="M12 2.6l2.9 6.17 6.75.8-4.99 4.62 1.32 6.67L12 17.53l-5.98 3.33 1.32-6.67L2.35 9.57l6.75-.8L12 2.6z" />
    </svg>
  );
}

const BADGE_STYLES = {
  // On white: a quiet grey pill, ink text, the star in brand blue.
  blue: { pill: "bg-[#F2F4F7] text-ink/80 border border-black/[0.05]", star: "text-brand-blue" },
  neutral: { pill: "bg-[#F2F4F7] text-ink/80 border border-black/[0.05]", star: "text-brand-blue" },
  // On the sky panels.
  "glass-white": { pill: "bg-white/20 text-white border border-white/25 backdrop-blur-md", star: "text-white" },
  white: { pill: "bg-white text-ink border border-white shadow-xs", star: "text-brand-blue" },
  // On the near-black cards.
  dark: { pill: "bg-white/10 text-white/90 border border-white/15", star: "text-[#7FB2FF]" },
} as const;

export type BadgeVariant = keyof typeof BADGE_STYLES;

export function CatalisBadge({
  children,
  icon,
  variant = "blue",
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const style = BADGE_STYLES[variant];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase",
        style.pill,
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : <StarIcon className={cn("shrink-0", style.star)} />}
      <span>{children}</span>
    </div>
  );
}

/**
 * Section heading in the display serif. Titles pass an italic accent as
 * `<span className="italic">`; on a sky panel pass `tone="light"`.
 */
export function SectionHeading({
  eyebrow,
  title,
  children,
  badgeVariant = "blue",
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  badgeVariant?: BadgeVariant;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal max-w-4xl",
        align === "center" ? "mx-auto flex flex-col items-center text-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <CatalisBadge variant={badgeVariant} className="mb-5">
          {eyebrow}
        </CatalisBadge>
      ) : null}
      <h2
        className={cn(
          "font-serif text-[2.75rem] leading-[1.02] font-normal tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.25rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            tone === "light" ? "text-white/85" : "text-muted",
          )}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

const SKY_TONES = {
  // The hero's sky as it is.
  sky: "",
  // Deeper blue at the top fading into the clouds, as on the reference's
  // pricing panel, so white cards and white text both read on it.
  deep: "before:absolute before:inset-0 before:bg-linear-to-b before:from-[#0A4FA3] before:via-[#1D6FC4]/80 before:to-transparent",
} as const;

/**
 * A rounded panel of sky and clouds, inset from the page edges like the hero.
 * Children sit above the tint layer.
 */
export function SkyPanel({
  children,
  tone = "sky",
  className,
  style,
}: {
  children: ReactNode;
  tone?: keyof typeof SKY_TONES;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[28px] bg-[#4B8CE4] bg-cover bg-bottom bg-no-repeat sm:rounded-[2.5rem]",
        "before:-z-10",
        SKY_TONES[tone],
        className,
      )}
      style={{ backgroundImage: "url('/images/hero-bg.avif')", ...style }}
    >
      {children}
    </div>
  );
}

export interface TabOption<T extends string> {
  value: T;
  label: string;
  /** Shown below `lg`, where the full label would not fit. */
  short?: string;
  icon?: LucideIcon;
}

const TAB_COLUMNS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

/**
 * The pill switcher the interactive sections share. A single row of pills
 * from `lg` up; below that a grid of icon-over-label buttons, because the row
 * used to run off both edges of a phone, cutting the first tab in half.
 */
export function SegmentedTabs<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly TabOption<T>[];
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex justify-center", className)}>
      <div
        role="group"
        aria-label={label}
        className={cn(
          "grid w-full max-w-xl gap-1 rounded-[22px] bg-sunken p-1.5 lg:flex lg:w-auto lg:max-w-none lg:rounded-full",
          TAB_COLUMNS[options.length] ?? "grid-cols-2",
        )}
      >
        {options.map(({ value: option, label: text, short, icon: Icon }) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-ring sm:text-[13px] lg:flex-row lg:gap-2 lg:rounded-full lg:px-5 lg:text-sm",
                active ? "bg-[#111218] text-white shadow-sm" : "text-muted hover:bg-white hover:text-ink",
              )}
            >
              {Icon ? <Icon aria-hidden className="size-4 shrink-0" /> : null}
              {short ? (
                <>
                  <span className="truncate lg:hidden">{short}</span>
                  <span className="hidden whitespace-nowrap lg:inline">{text}</span>
                </>
              ) : (
                <span className="truncate lg:whitespace-nowrap">{text}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Light grey card with no border: the reference's feature card. */
export const SOFT_CARD = "rounded-[28px] bg-sunken";

/**
 * The white frame around a demo or mock-up: a hairline border and a long, soft
 * shadow in place of the old heavy drop shadow.
 */
export const DEMO_FRAME =
  "rounded-[28px] border border-line bg-card shadow-[0_40px_90px_-50px_rgba(17,18,24,0.35)]";
