"use client";

import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui";
import { site } from "@/config/site";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-[#111218] text-white shrink-0 ${className ?? "size-9"}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="size-5"
      >
        <path
          d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4ZM16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24V8Z"
          fill="white"
        />
        <circle cx="16" cy="16" r="3.5" fill="#0054F9" />
      </svg>
    </div>
  );
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showcase = site.showcase.enabled ? site.showcase : null;

  return (
    <header className="sticky top-0 z-50 w-full print:hidden">
      <div className="mx-auto flex justify-center px-2 sm:px-4">
        {/* Catalis-style Top Floating White Tab Bar */}
        <div className="relative flex h-16 sm:h-18 max-w-5xl w-full items-center justify-between gap-4 rounded-b-2xl sm:rounded-b-3xl bg-white px-4 sm:px-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-x border-slate-100/80 transition-all">
          {/* Catalis Inverted Concave Corner SVGs on Left & Right */}
          <div aria-hidden="true" className="hidden sm:block absolute top-0 -left-6 size-6 pointer-events-none">
            <Image src="/images/corner-left.svg" alt="" width={24} height={24} className="size-6 block" />
          </div>
          <div aria-hidden="true" className="hidden sm:block absolute top-0 -right-6 size-6 pointer-events-none">
            <Image src="/images/corner-right.svg" alt="" width={24} height={24} className="size-6 block" />
          </div>

          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <BrandMark className="size-9 shadow-xs transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-[#111218] text-sm sm:text-base">
                {site.name}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">
                {site.product}
              </span>
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 md:flex"
          >
            <Link
              href="/#features"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[#111218] hover:bg-slate-50"
            >
              Features
            </Link>
            <Link
              href="/#apps"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[#111218] hover:bg-slate-50"
            >
              3 Applications
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[#111218] hover:bg-slate-50"
            >
              How It Works
            </Link>
            <Link
              href="/#technology"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[#111218] hover:bg-slate-50"
            >
              Technology
            </Link>
            <Link
              href="/#pricing"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[#111218] hover:bg-slate-50"
            >
              Pricing
            </Link>
          </nav>

          {/* Right: CTA & Live Store Indicator */}
          <div className="flex items-center gap-3">
            {showcase ? (
              <a
                href={showcase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-muted transition-all hover:border-[#111218]/30 hover:text-[#111218] shadow-2xs"
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
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold"
            >
              Build Your Package
              <ArrowRight aria-hidden className="size-3.5" />
            </ButtonLink>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-[#111218] transition-colors hover:bg-slate-50 md:hidden focus-visible:outline-2 focus-visible:outline-ring"
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
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen ? (
        <div className="mx-auto max-w-5xl px-2 sm:px-4 pt-2 md:hidden">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#111218] hover:bg-slate-50"
              >
                Features
              </Link>
              <Link
                href="/#apps"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#111218] hover:bg-slate-50"
              >
                3 Connected Applications
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#111218] hover:bg-slate-50"
              >
                How It Works
              </Link>
              <Link
                href="/#technology"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#111218] hover:bg-slate-50"
              >
                Technology
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#111218] hover:bg-slate-50"
              >
                Pricing &amp; Packages
              </Link>

              {showcase ? (
                <a
                  href={showcase.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-[#111218]"
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
                  className="w-full justify-center text-sm py-3 font-bold"
                >
                  Build Your Package
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
