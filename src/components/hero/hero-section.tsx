"use client";

import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Truck,
} from "lucide-react";
import { useRef, useState } from "react";

import { ButtonLink, CatalisBadge, ExternalButton } from "@/components/ui";
import { site } from "@/config/site";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const showcase = site.showcase.enabled ? site.showcase : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Controlled subtle tilt (-6deg to 6deg)
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-36 transition-colors">
      {/* Catalis-style subtle ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,243,107,0.18)_0%,rgba(232,230,255,0.25)_40%,transparent_75%)] blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* Left Column: Expressive Headline, Editorial Copy & Conversion CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <CatalisBadge variant="lime" className="mb-6">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="size-3.5" />
                <span>Ready-Built Commerce Engine · Retail &amp; Wholesale</span>
              </span>
            </CatalisBadge>

            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl xl:text-7xl leading-[1.08] text-balance">
              The Commerce Engine Behind Your Next{" "}
              <span className="italic font-normal text-muted underline decoration-accent decoration-wavy decoration-2 underline-offset-8">
                Growth Story.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed font-normal max-w-xl text-pretty">
              Launch your own branded online store, wholesale portal, and admin platform with a ready-built commerce solution designed for businesses that want to grow.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/pricing" variant="primary" className="px-6 py-3.5 text-sm sm:text-base font-bold">
                Build Your Package
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>

              {showcase ? (
                <ExternalButton
                  href={showcase.url}
                  variant="secondary"
                  className="px-5 py-3.5 text-sm sm:text-base font-semibold"
                >
                  Explore Live Store ({showcase.name})
                  <ExternalLink aria-hidden className="size-4 text-muted" />
                </ExternalButton>
              ) : (
                <ButtonLink href="/#apps" variant="secondary" className="px-5 py-3.5 text-sm sm:text-base font-semibold">
                  See Architecture
                  <ArrowRight aria-hidden className="size-4 text-muted" />
                </ButtonLink>
              )}
            </div>

            {/* Micro Trust Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-line/80 text-xs sm:text-sm font-medium text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>100% Code Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Zero GMV Commission</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Deploy in 2–4 Weeks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered, Dimensional UI Mockup Composition */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative perspective-1000 select-none py-6 lg:py-0"
          >
            <div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1)",
              }}
              className="relative preserve-3d w-full"
            >
              {/* Main Window: Branded Customer Storefront */}
              <div className="rounded-3xl border border-line bg-card shadow-2xl overflow-hidden transition-all">
                {/* Browser App Bar */}
                <div className="flex items-center justify-between border-b border-line bg-sunken/60 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-3 rounded-full bg-rose-400/80 inline-block" />
                    <span className="size-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="size-3 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[11px] font-medium text-muted">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>store.yourbrand.in</span>
                  </div>
                  <div className="text-[11px] font-semibold text-muted">Storefront</div>
                </div>

                {/* Mockup Storefront Body - Packaged Gourmet Goods */}
                <div className="p-5 sm:p-6 bg-card">
                  {/* Store Header & Category Bar */}
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-lg bg-ink flex items-center justify-center text-white text-[10px] font-bold">
                        YB
                      </div>
                      <span className="font-bold text-sm tracking-tight text-ink">YOUR BRAND</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-xs text-muted font-medium">
                      <span className="text-ink font-semibold">Coffee</span>
                      <span>Artisan Teas</span>
                      <span>Spices</span>
                      <span>Gourmet</span>
                    </div>
                    <div className="rounded-full bg-sunken px-2.5 py-1 text-xs font-semibold text-ink flex items-center gap-1">
                      <span>Cart</span>
                      <span className="size-4 rounded-full bg-accent text-accent-ink text-[10px] flex items-center justify-center font-bold">
                        2
                      </span>
                    </div>
                  </div>

                  {/* Featured Product Detail Card */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Product Mockup Visual */}
                    <div className="sm:col-span-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/60 p-4 border border-amber-200/50 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                      <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200">
                        Single Origin
                      </div>
                      {/* Stylized Packaged Goods Illustration */}
                      <div className="w-20 h-28 bg-gradient-to-b from-[#3a2012] to-[#24130a] rounded-lg shadow-lg relative flex flex-col items-center justify-between p-2 text-white border-t border-amber-500/40">
                        <div className="w-8 h-1 bg-amber-400/80 rounded-full" />
                        <div className="text-center">
                          <p className="text-[8px] tracking-widest uppercase font-mono text-amber-300">ESTATE</p>
                          <p className="text-[9px] font-bold tracking-tight">ARABICA</p>
                          <p className="text-[7px] text-white/70">MEDIUM ROAST</p>
                        </div>
                        <div className="text-[7px] font-mono text-amber-200">500g · POUCH</div>
                      </div>
                      <span className="mt-2 text-[10px] font-semibold text-amber-900">
                        Himalayan Single Origin
                      </span>
                    </div>

                    {/* Product Options & Details */}
                    <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
                          <span>★★★★★</span>
                          <span className="text-muted">(142 verified orders)</span>
                        </div>
                        <h4 className="font-bold text-base text-ink leading-tight mt-1">
                          Estate Peaberry Coffee Beans
                        </h4>
                        <p className="text-xs text-muted mt-0.5">
                          Whole bean, nitrogen-flushed valve pack for lasting freshness.
                        </p>
                      </div>

                      {/* Pack Size Selector */}
                      <div>
                        <p className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                          Select Pack Size
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <span className="rounded-lg border border-line bg-sunken px-2.5 py-1 text-xs text-muted">
                            250g
                          </span>
                          <span className="rounded-lg border-2 border-accent bg-accent/20 px-2.5 py-1 text-xs font-bold text-ink">
                            500g · ₹890
                          </span>
                          <span className="rounded-lg border border-line bg-sunken px-2.5 py-1 text-xs text-muted">
                            1kg
                          </span>
                        </div>
                      </div>

                      {/* Delivery & Checkout Snippet */}
                      <div className="pt-2 border-t border-line flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                          <Truck className="size-3.5" />
                          <span>Delhivery Express · 2 Days</span>
                        </div>
                        <button
                          type="button"
                          className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-ink shadow-xs"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Real-time Operator Admin Panel (Top-Right) */}
              <div className="hidden sm:block absolute -top-8 -right-4 sm:-right-8 w-72 rounded-2xl border border-line bg-card/95 p-4 shadow-xl backdrop-blur-md animate-float-gentle">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Admin Console
                  </span>
                  <span className="rounded-md bg-sunken px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                    Real-time
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-ink">
                    <span>#ORD-9412</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      ₹1,960 · UPI Paid
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
                    Organic Cardamom 250g &amp; Peaberry Coffee
                  </p>
                  <div className="pt-2 border-t border-line/80 flex items-center justify-between text-[11px]">
                    <span className="text-muted">Delhivery AWB</span>
                    <span className="font-mono font-medium text-ink">#94820129</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Wholesale & B2B Trade Portal (Bottom-Left) */}
              <div className="hidden sm:block absolute -bottom-8 -left-4 sm:-left-8 w-80 rounded-2xl border border-white/10 bg-[#12131F]/95 p-4 shadow-2xl backdrop-blur-md text-white animate-float-reverse">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                    <Layers className="size-3.5" />
                    B2B Wholesale Portal
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80">
                    Trade Order
                  </span>
                </div>
                <div className="mt-2.5 space-y-1 text-xs">
                  <p className="font-semibold text-white">Gourmet Roasters India Pvt Ltd</p>
                  <p className="text-[11px] text-white/70">
                    50x 1kg Valve Bags · Bulk Tariff Tier 2
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-white/60">GST Tax Invoice</span>
                    <span className="font-bold text-accent">₹38,500 + GST</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Uptime & API Latency Pill (Top-Left) */}
              <div className="absolute -top-3 left-6 rounded-full border border-line bg-card/90 px-3 py-1 shadow-md text-[11px] font-semibold text-ink flex items-center gap-1.5 backdrop-blur-xs">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>99.98% Uptime · &lt;80ms API Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
