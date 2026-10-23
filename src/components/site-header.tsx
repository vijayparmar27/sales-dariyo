"use client";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  CodeXml,
  Layers,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  MousePointerClick,
  Phone,
  Rotate3d,
  Route,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/context";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import type { ContactChannels } from "@/lib/site-types";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/dariyo-logo-dark.png"
      alt={`${site.name} mark`}
      width={180}
      height={163}
      className={cn("shrink-0 object-contain", className ?? "size-9")}
    />
  );
}

export function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo/dariyo-full-logo-dark.png"
      alt={site.name}
      width={1200}
      height={200}
      priority={priority}
      className={cn("h-7 w-auto object-contain", className)}
    />
  );
}

const isCurrent = (pathname: string, page: string | null) =>
  page !== null && (pathname === page || pathname.startsWith(`${page}/`));

/**
 * The platform menu links, translated dynamically from active locale.
 */
function getPlatformLinks(t: ReturnType<typeof useI18n>["t"]): { href: string; label: string; blurb: string; icon: LucideIcon }[] {
  return [
    { href: "/#demo", label: t.nav.platformLinks.demo.label, blurb: t.nav.platformLinks.demo.blurb, icon: MousePointerClick },
    { href: "/#apps", label: t.nav.platformLinks.apps.label, blurb: t.nav.platformLinks.apps.blurb, icon: Layers },
    { href: "/#retail-wholesale", label: t.nav.platformLinks.retailWholesale.label, blurb: t.nav.platformLinks.retailWholesale.blurb, icon: Warehouse },
    { href: "/#admin-console", label: t.nav.platformLinks.adminConsole.label, blurb: t.nav.platformLinks.adminConsole.blurb, icon: LayoutDashboard },
    { href: "/#immersive", label: t.nav.platformLinks.immersive.label, blurb: t.nav.platformLinks.immersive.blurb, icon: Rotate3d },
    { href: "/#technology", label: t.nav.platformLinks.technology.label, blurb: t.nav.platformLinks.technology.blurb, icon: CodeXml },
    { href: "/#how-it-works", label: t.nav.platformLinks.howItWorks.label, blurb: t.nav.platformLinks.howItWorks.blurb, icon: Route },
    { href: "/#faqs", label: t.nav.platformLinks.faqs.label, blurb: t.nav.platformLinks.faqs.blurb, icon: CircleHelp },
  ];
}

const NAV_LINK =
  "rounded-full px-2.5 py-2 text-[14px] xl:text-[15px] font-medium whitespace-nowrap text-ink/65 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ring xl:px-3.5";

/*
 * Past the header's 12px of scroll travel (see <header>) the tab is pinned
 * and gets its shadow. Only the shadow depends on this: the position itself is
 * CSS. Read through useSyncExternalStore rather than a scroll effect that sets
 * state, so the first client render already agrees with the server (not
 * scrolled).
 */
const SCROLLED_AT = 12;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLLED_AT,
    () => false,
  );
}

/**
 * The concave fillet that joins the tab to the white strip above the hero, so
 * the tab reads as cut out of the page rather than floating on the card. White
 * fills the corner outside a quarter circle; the hero shows through inside it.
 */
function TabCorner({ side, className }: { side: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6 text-white", className)}>
      <path
        d={side === "left" ? "M24 24C24 10.7452 13.2548 0 0 0H24V24Z" : "M0 24C0 10.7452 10.7452 0 24 0H0V24Z"}
        fill="currentColor"
      />
    </svg>
  );
}

/** Label that slides up and is replaced by a copy of itself on hover. */
function SwapLabel({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function ShowcaseLink({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const { t } = useI18n();
  if (!site.showcase.enabled) return null;
  const { showcase } = site;
  return (
    <a
      href={showcase.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-2xl bg-sunken px-4 py-3 transition-colors hover:bg-[#EBF3FF] focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">
          {t.nav.seeLiveAt || "See it live"}: {showcase.name}
        </span>
        <span className="block truncate text-xs text-muted">{showcase.line}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
      />
    </a>
  );
}

function PlatformMenu() {
  const { t } = useI18n();
  const platformLinks = getPlatformLinks(t);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  // A short grace period, so moving the pointer from the button down across
  // the gap to the panel does not close it on the way.
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(NAV_LINK, "inline-flex items-center gap-1.5 cursor-pointer", open && "text-ink")}
      >
        {t.nav.platform}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "absolute top-full left-1/2 w-[36rem] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-3xl border border-line bg-white p-2 shadow-[0_24px_60px_-12px_rgba(17,18,24,0.18)]">
          <ul className="grid grid-cols-2 gap-1">
            {platformLinks.map(({ href, label, blurb, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-sunken focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{label}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted">{blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ShowcaseLink onNavigate={() => setOpen(false)} className="mt-1" />
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ channels }: { channels?: ContactChannels } = {}) {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const primaryLinks = [{ href: "/#features", label: t.nav.features, page: null }] as const;
  const secondaryLinks = [
    { href: "/services", label: t.nav.services, page: "/services" },
    { href: "/pricing", label: t.nav.pricing, page: "/pricing" },
    { href: "/blog", label: t.nav.blog, page: "/blog" },
    { href: "/about", label: t.nav.about, page: "/about" },
    { href: "/contact", label: t.nav.contact, page: "/contact" },
  ] as const;

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/*
        Sticky at -12px with no height of its own: for the first 12px of
        scroll the tab moves up with the page, so its corners stay on the hero
        card's top edge (inset 12px), and then it pins flush to the top. This
        used to be a fixed header that jumped up 12px with a transition once
        the page passed 12px, which left the corners floating below the hero's
        edge for that first stretch of scrolling. Sticky also tracks the scroll
        on the compositor, so a fast fling cannot pull the two apart.
      */}
      <header className="sticky -top-3 z-50 h-0 print:hidden">
        <div className="relative flex justify-center">
          {/*
            Width: the tab stops one hero corner radius plus one tab corner
            (24px) short of the hero card's edge, so the blue between them
            rounds into one smooth hump. Any wider and the two curves meet in a
            point. The card is inset 12px with a 24px radius, 40px from sm.
          */}
          <div className="relative w-[calc(100%-7.5rem)] sm:w-[calc(100%-9.5rem)] lg:w-auto">
            {/*
              The tab's shape lives in its own layer so the scrolled shadow can
              be a drop-shadow that follows the concave corners too, without
              also landing on the Platform panel inside the content layer.
            */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 transition-[filter] duration-300",
                scrolled && "drop-shadow-[0_10px_24px_rgba(17,18,24,0.10)]",
              )}
            >
              <div className="absolute inset-0 rounded-b-3xl bg-white" />
              <TabCorner side="left" className="absolute top-3 -left-6" />
              <TabCorner side="right" className="absolute top-3 -right-6" />
            </div>

            <div className="relative flex items-center justify-between gap-3 px-2 pt-5 pb-2">
              <Link
                href="/"
                className="group flex min-w-0 items-center gap-2.5 rounded-full pr-2 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <BrandLogo priority className="h-7 sm:h-8 transition-transform duration-300 group-hover:scale-105" />
                <span className="sr-only">{site.name}, {site.product}: home</span>
              </Link>

              <nav aria-label="Main" className="hidden items-center lg:mx-2 lg:flex xl:mx-8">
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={NAV_LINK}>
                    {link.label}
                  </Link>
                ))}
                <PlatformMenu />
                {secondaryLinks.map((link) => {
                  const current = isCurrent(pathname, link.page);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(NAV_LINK, current && "font-semibold text-ink")}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex shrink-0 items-center gap-2">
                <LocaleSwitcher />
                {channels?.phone ? (
                  <a
                    href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                    className="hidden h-11 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-xs font-semibold text-ink transition-colors hover:border-brand-blue/40 hover:text-brand-blue xl:inline-flex"
                    title={`Call ${channels.phone}`}
                  >
                    <Phone aria-hidden className="size-3.5 text-muted shrink-0" />
                    <span>{channels.phone}</span>
                  </a>
                ) : null}

                {channels?.whatsapp ? (
                  <a
                    href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to ask a question.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden h-11 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-xs font-semibold text-ink transition-colors hover:border-emerald-500/40 hover:text-emerald-700 sm:inline-flex"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle aria-hidden className="size-4 text-emerald-600" />
                    <span className="hidden xl:inline">WhatsApp</span>
                  </a>
                ) : null}

                <Link
                  href="/pricing"
                  className="group hidden h-11 items-center gap-2 rounded-full bg-[#111218] pr-4 pl-5 text-[15px] font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
                >
                  <SwapLabel>{t.nav.buildQuote}</SwapLabel>
                  <span className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight aria-hidden className="size-3.5" />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sunken focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
                </button>
              </div>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={cn(
              "absolute inset-x-4 top-full mt-2 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-white p-3 shadow-[0_24px_60px_-12px_rgba(17,18,24,0.25)] transition-[opacity,transform,visibility] duration-200 lg:hidden",
              mobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
            )}
          >
            <div className="mb-2 px-2 flex justify-between items-center pb-2 border-b border-line">
              <span className="text-xs font-semibold text-muted uppercase">
                {t.common.language} / {t.common.currency}
              </span>
              <LocaleSwitcher />
            </div>
            <nav aria-label="Main" className="flex flex-col">
              {[...primaryLinks, ...secondaryLinks].map((link) => {
                const current = isCurrent(pathname, link.page);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-sunken",
                      current && "bg-sunken",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <p className="mt-3 px-4 pb-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
                {t.nav.platform}
              </p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {getPlatformLinks(t).map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sunken"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
                        <Icon aria-hidden className="size-4.5" />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ShowcaseLink onNavigate={closeMobileMenu} className="mt-3" />

              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111218] text-[15px] font-semibold text-white transition-colors hover:bg-black sm:hidden"
              >
                {t.nav.buildQuote}
                <ArrowRight aria-hidden className="size-4" />
              </Link>

              {channels?.whatsapp || channels?.email || channels?.phone ? (
                <div className="mt-4 border-t border-line/60 pt-3">
                  <p className="px-4 pb-1.5 text-[11px] font-semibold tracking-wider text-muted uppercase">
                    {t.common.contactUs}
                  </p>
                  <div className="space-y-1">
                    {channels.whatsapp ? (
                      <a
                        href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to ask a question.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <MessageCircle aria-hidden className="size-4" />
                        </span>
                        <span>{t.nav.chatWhatsApp}</span>
                      </a>
                    ) : null}
                    {channels.email ? (
                      <a
                        href={`mailto:${channels.email}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sunken"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sunken text-muted">
                          <Mail aria-hidden className="size-4" />
                        </span>
                        <span className="truncate">{channels.email}</span>
                      </a>
                    ) : null}
                    {channels.phone ? (
                      <a
                        href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sunken"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sunken text-muted">
                          <Phone aria-hidden className="size-4" />
                        </span>
                        <span>{channels.phone}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </nav>
          </div>
        </div>
      </header>

      {/* Outside the header so it stacks under the tab and menu (z-40 below
          the header's z-50) while covering the rest of the page. */}
      <div
        aria-hidden="true"
        onClick={closeMobileMenu}
        className={cn(
          "fixed inset-0 z-40 bg-[#111218]/20 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden print:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
    </>
  );
}
