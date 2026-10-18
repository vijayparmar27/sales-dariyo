import Link from "next/link";

import { ButtonLink } from "@/components/ui";
import { site } from "@/config/site";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <path
        d="M8 13.5 10 9h12l2 4.5M8 13.5h16M8 13.5c0 1.7 1.3 3 3 3s2.7-1.3 2.7-3c0 1.7 1.3 3 2.6 3 1.4 0 2.7-1.3 2.7-3 0 1.7 1.3 3 3 3s2-1.3 2-3M10 16.2V23h12v-6.8"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/85 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <BrandMark className="size-8" />
          <span className="leading-tight">
            {site.name}
            <span className="block text-xs font-normal text-muted">{site.product}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm sm:gap-2">
          <Link href="/#features" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:block">
            Features
          </Link>
          <Link href="/#technology" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:block">
            Technology
          </Link>
          <ButtonLink href="/pricing" className="px-4 py-2">
            Build your price
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
