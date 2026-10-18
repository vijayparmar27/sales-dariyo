"use client";

import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import Image from "next/image";
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
    // Subtle mouse tilt
    setTilt({
      x: -(y / (rect.height / 2)) * 4,
      y: (x / (rect.width / 2)) * 4,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="px-2 sm:px-4 lg:px-6 pt-2 pb-16">
      {/* Catalis Framed Sky Blue & Cloudscape Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-[#4B8CE4] shadow-2xl transition-all"
        style={{
          backgroundImage: "url('/images/hero-bg.avif')",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft Radial Ambient Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#3B7ED8]/30 via-transparent to-white/40 -z-10"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-20 flex flex-col items-center text-center">
          {/* Eyebrow Badge (Catalis frosted glass pill with white star) */}
          <CatalisBadge
            variant="glass-white"
            icon={<Sparkles className="size-3.5 text-white" />}
            className="mb-6 font-bold"
          >
            Ready-Built Commerce Engine · Retail &amp; Wholesale
          </CatalisBadge>

          {/* Main Headline: Pure White Expressive Typography with Italic Serif Accent */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance max-w-4xl">
            The Commerce Engine Behind Your Next{" "}
            <span className="italic font-serif font-normal text-white">
              Growth Story.
            </span>
          </h1>

          {/* Subtitle: High-contrast soft white */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl text-pretty leading-relaxed font-normal">
            Launch your own branded online store, wholesale portal, and admin platform with a ready-built commerce solution designed for businesses that want to grow.
          </p>

          {/* Catalis Dual Pill CTAs: Dark Black Pill & Pure White Pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <ButtonLink
              href="/pricing"
              variant="primary"
              className="px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Build Your Package
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>

            {showcase ? (
              <ExternalButton
                href={showcase.url}
                variant="white"
                className="px-6 py-3.5 text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-transform"
              >
                Explore Live Store ({showcase.name})
                <ExternalLink aria-hidden className="size-4 text-[#111218]/70" />
              </ExternalButton>
            ) : (
              <ButtonLink
                href="/#apps"
                variant="white"
                className="px-6 py-3.5 text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-transform"
              >
                See 3 Applications
                <ArrowRight aria-hidden className="size-4 text-[#111218]/70" />
              </ButtonLink>
            )}
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-white/90">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-white" />
              100% Code Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-white" />
              Zero GMV Commission
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-white" />
              Deploy in 2–4 Weeks
            </span>
          </div>

          {/* Catalis Floating Cloud Cards Composition */}
          <div
            className="mt-14 sm:mt-20 w-full max-w-5xl relative perspective-1000 select-none"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-end justify-center">
              {/* Card 1: Transactions (Left) */}
              <div className="hidden md:block md:col-span-3 rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white/70 backdrop-blur-md transition-all hover:scale-[1.02] animate-float-gentle">
                <Image
                  src="/images/hero-card-01.svg"
                  alt="Transactions analytics preview"
                  width={324}
                  height={318}
                  className="w-full h-auto block"
                />
              </div>

              {/* Card 2: Center Feature (Royal Blue Radial Gauge - #0054F9) */}
              <div className="col-span-1 md:col-span-6 relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white/85 backdrop-blur-md transition-all hover:scale-[1.02]">
                <Image
                  src="/images/hero-card-02.svg"
                  alt="Real-time operational dashboard with royal blue radial meter"
                  width={349}
                  height={328}
                  priority
                  className="w-full h-auto block"
                />

                {/* Overlaid E-Commerce Specialty Banner */}
                <div className="border-t border-slate-100 bg-white/95 px-5 py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#111218]">
                      Storefront · Admin · Backend
                    </span>
                  </div>
                  <span className="rounded-full bg-[#EBF3FF] text-[#0054F9] border border-[#CCE0FF] px-2.5 py-0.5 text-[11px] font-bold">
                    Retail &amp; Wholesale
                  </span>
                </div>
              </div>

              {/* Card 3: Expenses / Orders (Right) */}
              <div className="hidden md:block md:col-span-3 rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white/70 backdrop-blur-md transition-all hover:scale-[1.02] animate-float-reverse">
                <Image
                  src="/images/hero-card-03.svg"
                  alt="Orders and fulfillment chart preview"
                  width={350}
                  height={257}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Floating CPG Packaged Goods Badge (Pantry / Coffee / Spices) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#111218] shadow-lg backdrop-blur-md">
                <Store className="size-3.5 text-[#0054F9]" />
                <span>Packaged Goods · Spices · Coffee &amp; Tea · Gourmet Pantry</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#111218] shadow-lg backdrop-blur-md">
                <Truck className="size-3.5 text-emerald-600" />
                <span>Delhivery Logistics &amp; Razorpay UPI Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
