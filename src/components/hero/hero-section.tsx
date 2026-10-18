"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

import { CoffeePouchSvg } from "@/components/demo/north-nourish-assets";
import { ButtonLink, buttonClass, CatalisBadge } from "@/components/ui";
import { site } from "@/config/site";
import { rupees } from "@/lib/format";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedPack, setSelectedPack] = useState<"250g" | "500g" | "1kg">("250g");
  const showcase = site.showcase.enabled ? site.showcase : null;

  const packPrices = {
    "250g": 680,
    "500g": 1250,
    "1kg": 2350,
  };

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
              Build Your Package
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <a href="#demo" className={buttonClass("white", "h-12 px-7 text-[15px]")}>
              Explore Live Demo
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
            {/* Centerpiece: Fictional Storefront Mockup (NORTH & NOURISH) */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white/95 backdrop-blur-md">
              {/* Browser chrome top bar */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex items-center gap-1.5 rounded-full bg-slate-50 px-3.5 py-1 text-[11px] font-mono text-[#1E3A2F] border border-slate-200">
                    <Lock className="size-3 text-emerald-600" />
                    <span>https://northandnourish.com/store</span>
                  </div>
                </div>
              </div>

              {/* Storefront Hero Preview Content */}
              <div className="p-6 sm:p-8 bg-[#FAF9F5]">
                <div className="grid gap-6 md:grid-cols-12 items-center">
                  {/* Left: Product Artwork */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
                    <div className="w-full max-w-[190px]">
                      <CoffeePouchSvg />
                    </div>
                    <div className="mt-2 text-[10px] font-semibold text-[#1E3A2F] uppercase tracking-wider">
                      Single-Origin Coorg Arabica · Batch #48
                    </div>
                  </div>

                  {/* Right: Buying Controls */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#1E3A2F] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          D2C Storefront
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                          <span className="text-muted text-[11px] font-normal">(142 verified reviews)</span>
                        </div>
                      </div>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#1E3A2F]">
                        Coorg Arabica Coffee Beans
                      </h3>
                      <p className="text-xs text-muted">
                        High-altitude estate grown reserve. Notes of wild honey, cocoa, and dried citrus.
                      </p>
                    </div>

                    {/* Interactive Pack Size Pills */}
                    <div>
                      <span className="block text-[11px] font-bold text-[#1E3A2F] mb-1.5 uppercase tracking-wide">
                        Pack Size Variant:
                      </span>
                      <div className="flex gap-2">
                        {(["250g", "500g", "1kg"] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSelectedPack(p)}
                            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedPack === p
                                ? "bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-xs"
                                : "bg-white text-[#1E3A2F] border-[#EAE5D9] hover:bg-[#FAF9F5]"
                            }`}
                          >
                            <span>{p}</span>
                            <span className="block text-[10px] font-extrabold mt-0.5">
                              {rupees(packPrices[p])}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Bag */}
                    <div className="border-t border-[#EAE5D9] pt-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-2xl font-extrabold text-[#1E3A2F] tabular-nums">
                          {rupees(packPrices[selectedPack])}
                        </span>
                        <span className="block text-[10px] text-emerald-700 font-semibold">
                          In Stock · Ready to Dispatch
                        </span>
                      </div>

                      <a
                        href="#demo"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] text-white px-5 py-2.5 text-xs font-bold hover:bg-[#13271F] shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingBag className="size-3.5" />
                        <span>Add to Bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Overlaid Floating Card 1: Admin Order Notification (Left) */}
            <div className="hidden lg:block absolute -bottom-6 -left-8 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md max-w-xs animate-float-gentle">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted mb-1">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="size-3" />
                  Order #NN-4921 Paid
                </span>
                <span className="text-muted">Razorpay UPI</span>
              </div>
              <p className="text-xs font-bold text-[#111218]">Single-Origin Coorg Arabica 500g × 2</p>
              <div className="mt-2 flex items-center justify-between text-[10px] border-t border-slate-100 pt-1.5 text-muted">
                <span>Delhivery AWB #DL948102</span>
                <span className="font-bold text-emerald-600">Dispatched ✓</span>
              </div>
            </div>

            {/* Overlaid Floating Card 2: Revenue & Stock Sync (Right) */}
            <div className="hidden lg:block absolute -top-6 -right-8 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md max-w-xs animate-float-reverse">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted mb-1">
                <span>Live Revenue Telemetry</span>
                <span className="text-[#0054F9] font-bold">+18.4%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#111218] tabular-nums">₹4,82,400</span>
                <span className="text-[10px] text-muted">This Month</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold border-t border-slate-100 pt-1.5">
                <Zap className="size-3 text-amber-500" />
                <span>100% Stock Sync (0 Overselling)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
