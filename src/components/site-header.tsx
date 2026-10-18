"use client";

import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui";
import { site } from "@/config/site";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="36" height="36" rx="10" fill="#17172B" />
      {/* Sleek geometric commerce blocks */}
      <rect x="8" y="8" width="9" height="9" rx="2.5" fill="#C9F36B" />
      <rect x="19" y="8" width="9" height="9" rx="2.5" fill="#E8E6FF" />
      <rect x="8" y="19" width="9" height="9" rx="2.5" fill="#FFFFFF" fillOpacity="0.85" />
      <path
        d="M19 23.5C19 21.0147 21.0147 19 23.5 19H28V28H23.5C21.0147 28 19 25.9853 19 23.5Z"
        fill="#C9F36B"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showcase = site.showcase.enabled ? site.showcase : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line/80 bg-page/85 backdrop-blur-md transition-colors print:hidden">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <BrandMark className="size-9 shadow-xs transition-transform group-hover:scale-105" />
          <span className="flex flex-col leading-tight">
            <span className="font-bold tracking-tight text-ink sm:text-base">
              {site.name}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
              {site.product}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-line/80 bg-card/60 px-3 py-1.5 shadow-xs backdrop-blur-xs md:flex"
        >
          <Link
            href="/#features"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-ink hover:bg-sunken/80"
          >
            Features
          </Link>
          <Link
            href="/#apps"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-ink hover:bg-sunken/80"
          >
            3 Applications
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-ink hover:bg-sunken/80"
          >
            How It Works
          </Link>
          <Link
            href="/#technology"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-ink hover:bg-sunken/80"
          >
            Technology
          </Link>
          <Link
            href="/#pricing"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-ink hover:bg-sunken/80"
          >
            Pricing
          </Link>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-3">
          {showcase ? (
            <a
              href={showcase.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-muted transition-all hover:border-ink/30 hover:text-ink shadow-xs"
              title={`View ${showcase.name} live store demo`}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Live Store: {showcase.name}</span>
              <ExternalLink aria-hidden className="size-3 text-muted/70" />
            </a>
          ) : null}

          <ButtonLink
            href="/pricing"
            variant="primary"
            className="hidden sm:inline-flex px-4 py-2 text-xs"
          >
            Build Your Package
            <ArrowRight aria-hidden className="size-3.5" />
          </ButtonLink>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-line bg-card p-2.5 text-ink transition-colors hover:bg-sunken md:hidden focus-visible:outline-2 focus-visible:outline-ring"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen ? (
        <div className="border-b border-line bg-card px-4 pt-3 pb-6 md:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-sunken"
            >
              Features
            </Link>
            <Link
              href="/#apps"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-sunken"
            >
              3 Connected Applications
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-sunken"
            >
              How It Works
            </Link>
            <Link
              href="/#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-sunken"
            >
              Technology
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-sunken"
            >
              Pricing & Packages
            </Link>

            {showcase ? (
              <a
                href={showcase.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-line bg-sunken/60 px-3 py-2.5 text-sm font-semibold text-ink"
              >
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Live Store: {showcase.name}
                </span>
                <ExternalLink className="size-4 text-muted" />
              </a>
            ) : null}

            <div className="pt-2">
              <ButtonLink
                href="/pricing"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-center text-sm py-3"
              >
                Build Your Package
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
