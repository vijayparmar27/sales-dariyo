import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const VARIANTS = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "border border-line bg-card text-ink hover:bg-sunken",
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

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {children ? <p className="mt-4 text-lg text-pretty text-muted">{children}</p> : null}
    </div>
  );
}
