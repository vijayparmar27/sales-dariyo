import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer select-none active:scale-[0.98]";

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

export function CatalisBadge({
  children,
  icon,
  variant = "blue",
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "blue" | "glass-white" | "neutral" | "dark";
  className?: string;
}) {
  const variantStyles = {
    blue: "bg-[#EBF3FF] text-[#0054F9] border border-[#CCE0FF]",
    "glass-white": "bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-xs",
    neutral: "bg-sunken text-muted border border-line",
    dark: "bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="size-3 shrink-0"
        >
          <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z" />
        </svg>
      )}
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  badgeVariant = "blue",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  badgeVariant?: "blue" | "glass-white" | "neutral" | "dark";
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
      <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl text-ink leading-[1.15]">
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
