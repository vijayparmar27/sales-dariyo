import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer select-none active:scale-[0.98]";

const VARIANTS = {
  primary:
    "bg-accent text-accent-ink hover:brightness-105 shadow-[0_2px_10px_rgba(201,243,107,0.3)] border border-[#b8e855]",
  secondary:
    "border border-line bg-card text-ink hover:bg-sunken hover:border-ink/20 shadow-xs",
  dark:
    "bg-white text-[#17172B] hover:bg-white/90 shadow-sm border border-white/20",
  "outline-dark":
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-xs",
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

export function CatalisBadge({
  children,
  icon,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "lime" | "lavender" | "neutral" | "dark";
  className?: string;
}) {
  const variantStyles = {
    lime: "bg-accent/25 text-[#222B0F] border border-accent/40 dark:text-[#C9F36B] dark:border-accent/30",
    lavender: "bg-lavender text-lavender-ink border border-[#D7D2FF] dark:border-white/15",
    neutral: "bg-sunken text-muted border border-line",
    dark: "bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-accent dark:bg-accent"
        />
      )}
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  badgeVariant = "lime",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  badgeVariant?: "lime" | "lavender" | "neutral" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center flex flex-col items-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <CatalisBadge variant={badgeVariant} className="mb-4">
          {eyebrow}
        </CatalisBadge>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl text-ink leading-[1.15]">
        {title}
      </h2>
      {children ? (
        <p className="mt-5 text-base sm:text-lg text-pretty text-muted leading-relaxed font-normal">
          {children}
        </p>
      ) : null}
    </div>
  );
}

export function AmbientGlow({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl opacity-50",
        className,
      )}
    />
  );
}
