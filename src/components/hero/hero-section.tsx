"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { ProductVisual } from "@/components/demo/product-visual";
import { ButtonLink, buttonClass, CatalisBadge } from "@/components/ui";
import { demoAddress, site } from "@/config/site";
import { DEMO_STORE } from "@/data/demo-store";
import { useI18n } from "@/lib/i18n/context";

// The product the hero's storefront mock-up shows: the demo store's first.
const HERO_PRODUCT = DEMO_STORE.products[0];

export function HeroSection() {
  const { t, formatMoney } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedPackId, setSelectedPackId] = useState(HERO_PRODUCT?.packSizes.at(-1)?.id ?? "");
  const showcase = site.showcase.enabled ? site.showcase : null;
  const selectedPack =
    HERO_PRODUCT?.packSizes.find((pack) => pack.id === selectedPackId) ?? HERO_PRODUCT?.packSizes[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 3.5,
      y: (x / (rect.width / 2)) * 3.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    // pt-3 is load-bearing: the header's tab corners sit 12px down to meet
    // this card's top edge, so the tab reads as cut into the hero.
    <section className="px-3 pt-3">
      {/* Catalis Framed Sky Blue & Cloudscape Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // isolate: the tint layer below sits at -z-10, which without its own
        // stacking context drew behind this card's background and never showed.
        className="relative isolate overflow-hidden rounded-[28px] bg-[#4B8CE4] sm:rounded-[2.5rem]"
        style={{
          backgroundImage: "url('/images/hero-bg.avif')",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* A little deeper blue behind the headline, for the white type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#2F6CC4]/35 via-transparent to-white/30"
        />

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-28 pb-12 text-center sm:px-6 sm:pt-36 sm:pb-20 lg:px-8">
          <CatalisBadge variant="glass-white" className="mb-6">
            Ready-built commerce platform
          </CatalisBadge>

          <h1 className="max-w-5xl font-serif text-[3.4rem] leading-[0.95] font-normal tracking-[-0.03em] text-balance text-white sm:text-7xl lg:text-[6.5rem]">
            The commerce engine behind your next{" "}
            <span className="italic">growth story.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
            Launch a branded online store, run your operations from one admin panel, and sell
            retail and wholesale on a platform that already runs a real business.
          </p>

          <div className="mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <ButtonLink href="/pricing" variant="primary" className="h-12 px-7 text-[15px]">
              {t.hero.ctaQuote}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <a href="#demo" className={buttonClass("white", "h-12 px-7 text-[15px]")}>
              {t.hero.ctaDemo}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <CheckCircle2 aria-hidden className="size-4" />
              Full source code licence
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 aria-hidden className="size-4" />
              No commission on your sales
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 aria-hidden className="size-4" />
              Runs on servers in your name
            </li>
          </ul>

          {showcase ? (
            <a
              href={showcase.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Running live at {showcase.name}
              <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : null}

          {/* Multi-Layered E-Commerce Software Composition */}
          <div
            className="mt-12 sm:mt-18 w-full max-w-5xl relative perspective-1000 select-none text-left"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)",
            }}
          >
            {/* Centerpiece: the demo store's storefront, in its own colours */}
            <div className="relative z-10 overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl backdrop-blur-md">
              {/* Browser chrome top bar */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="size-2.5 shrink-0 rounded-full bg-rose-400" />
                  <span className="size-2.5 shrink-0 rounded-full bg-amber-400" />
                  <span className="size-2.5 shrink-0 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex min-w-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 font-mono text-[11px] text-(--demo-ink)">
                    <Lock className="size-3 shrink-0 text-emerald-600" />
                    <span className="truncate">{demoAddress()}</span>
                  </div>
                </div>
                <span className="hidden items-center gap-2 text-xs font-semibold text-(--demo-ink) sm:flex">
                  {DEMO_STORE.brand.mark ? (
                    <Image src={DEMO_STORE.brand.mark} alt="" className="size-5 object-contain" />
                  ) : null}
                  {DEMO_STORE.brand.name}
                </span>
              </div>

              {HERO_PRODUCT && selectedPack ? (
                <div className="bg-(--demo-surface) p-6 sm:p-8">
                  <div className="grid items-center gap-6 md:grid-cols-12">
                    {/* Left: the product's picture */}
                    <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-(--demo-line) bg-white p-4 shadow-xs md:col-span-5">
                      {/* Studio photos sit in a lot of white; a gentle zoom fills the card */}
                      <div className={HERO_PRODUCT.photo ? "w-full max-w-64 scale-125" : "w-full max-w-60"}>
                        <ProductVisual product={HERO_PRODUCT} sizes="(min-width: 768px) 320px, 75vw" preload />
                      </div>
                    </div>

                    {/* Right: buying controls */}
                    <div className="space-y-4 md:col-span-7">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-(--demo-ink) px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                            {DEMO_STORE.brand.live ? `Live on ${DEMO_STORE.brand.name}` : "D2C storefront"}
                          </span>
                          {HERO_PRODUCT.rating ? (
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              <span>{HERO_PRODUCT.rating.value}</span>
                              <span className="text-[11px] font-normal text-muted">({HERO_PRODUCT.rating.count} reviews)</span>
                            </div>
                          ) : null}
                        </div>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-(--demo-ink) sm:text-2xl">
                          {HERO_PRODUCT.name}
                        </h3>
                        <p className="text-xs text-muted">
                          {HERO_PRODUCT.tagline}. {HERO_PRODUCT.highlights.slice(0, 2).join(" · ")}.
                        </p>
                      </div>

                      {/* Pack size pills */}
                      <div>
                        <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-(--demo-ink) uppercase">
                          Pack size
                        </span>
                        <div className="flex gap-2">
                          {HERO_PRODUCT.packSizes.map((pack) => (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() => setSelectedPackId(pack.id)}
                              className={`flex-1 cursor-pointer rounded-xl border px-2 py-1.5 text-xs font-bold transition-all ${
                                selectedPack.id === pack.id
                                  ? "border-(--demo-ink) bg-(--demo-ink) text-white shadow-xs"
                                  : "border-(--demo-line) bg-white text-(--demo-ink) hover:bg-(--demo-surface)"
                              }`}
                            >
                              <span>{pack.label}</span>
                              <span className="mt-0.5 block text-[10px] font-extrabold">{formatMoney(pack.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price and add to bag */}
                      <div className="flex items-center justify-between gap-4 border-t border-(--demo-line) pt-3">
                        <div>
                          <span className="flex items-baseline gap-2">
                            <span className="text-2xl font-extrabold text-(--demo-ink) tabular-nums">
                              {formatMoney(selectedPack.price)}
                            </span>
                            {selectedPack.compareAtPrice ? (
                              <span className="text-xs text-muted line-through tabular-nums">
                                {formatMoney(selectedPack.compareAtPrice)}
                              </span>
                            ) : null}
                          </span>
                          <span className="block text-[10px] font-semibold text-emerald-700">Ready to dispatch</span>
                        </div>

                        <a
                          href="#demo"
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-(--demo-ink) px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-(--demo-ink-hover)"
                        >
                          <ShoppingBag className="size-3.5" />
                          <span>Add to Bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Floating card 1: an order arriving in the admin panel */}
            {HERO_PRODUCT && selectedPack ? (
              <div className="absolute -bottom-6 -left-8 z-20 hidden max-w-xs animate-float-gentle rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md lg:block">
                <div className="mb-1 flex items-center justify-between gap-6 text-[10px] font-bold text-muted">
                  <span className="flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle2 className="size-3" />
                    Order paid · UPI
                  </span>
                  <span className="font-medium">Sample order</span>
                </div>
                <p className="text-xs font-bold text-[#111218]">
                  {HERO_PRODUCT.name} {selectedPack.label.split(" ")[0]} × 2
                </p>
                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-1.5 text-[10px] text-muted">
                  <span>Delhivery pickup booked</span>
                  <span className="font-bold text-emerald-600">Packed ✓</span>
                </div>
              </div>
            ) : null}

            {/* Floating card 2: the pincode check at checkout */}
            <div className="absolute -top-6 -right-8 z-20 hidden max-w-xs animate-float-reverse rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md lg:block">
              <div className="mb-1 flex items-center justify-between gap-6 text-[10px] font-bold text-muted">
                <span>Delivery check</span>
                <span className="text-[#0054F9]">Delhivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 text-[#0054F9]" />
                <span className="text-lg font-extrabold text-[#111218] tabular-nums">400053</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-1.5 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="size-3" />
                <span>Delivers to this pincode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
