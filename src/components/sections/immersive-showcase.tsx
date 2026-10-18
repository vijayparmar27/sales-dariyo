"use client";

import {
  ArrowRight,
  Box,
  Check,
  FileCheck,
  Move3d,
  Play,
  RotateCw,
  Sliders,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { CardamomJarSvg, CocoaTinSvg, CoffeePouchSvg } from "@/components/demo/north-nourish-assets";
import { ButtonLink, CatalisBadge, DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { cn } from "@/lib/cn";

type MediaProduct = "coffee" | "cardamom" | "cocoa";
type PackagingFinish = "kraft" | "midnight" | "bronze";

export function ImmersiveShowcase() {
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);
  const [product, setProduct] = useState<MediaProduct>("coffee");
  const [activeFeature, setActiveFeature] = useState<"viewer" | "studio" | "mobile">("viewer");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Packaging Studio State
  const [finish, setFinish] = useState<PackagingFinish>("midnight");
  const [dieLineSize, setDieLineSize] = useState<string>("sleeve");
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Mobile Gallery Slide State
  const [mobileSlide, setMobileSlide] = useState<number>(0);

  const getRotationTransform = () => {
    return `rotateY(${rotationDegrees}deg) scale(1)`;
  };

  const handleAnglePreset = (deg: number) => {
    setRotationDegrees(deg);
  };

  const handleSimulateExport = () => {
    setExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 4000);
    }, 1200);
  };

  return (
    <section id="immersive" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="3D and media"
          title={
            <>
              Immersive 3D and rich media.{" "}
              <span className="italic text-muted">Made to sell.</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          Packaged goods sell on detail. Let shoppers turn the pack around, watch a short video
          and swipe through photos before they buy, with the packaging designed in your own admin.
        </SectionHeading>

        <SegmentedTabs
          label="Media feature"
          value={activeFeature}
          onChange={setActiveFeature}
          options={[
            { value: "viewer", label: "360° model viewer", short: "3D viewer", icon: Move3d },
            { value: "studio", label: "Packaging studio (admin)", short: "Studio", icon: Box },
            { value: "mobile", label: "Phone gallery and video", short: "Gallery", icon: Smartphone },
          ]}
        />

        {/* Feature 1: Interactive 360 Model Viewer */}
        {activeFeature === "viewer" && (
          <div className={cn(DEMO_FRAME, "p-5 sm:p-10")}>
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              {/* Left: 3D Stage Simulation with Angle Controls & Hotspots */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-sunken via-card to-sunken border border-line p-8 relative overflow-hidden min-h-[420px]">
                {/* 3D Canvas Stage */}
                <div
                  className="w-full max-w-[240px] perspective-1000 transition-transform duration-300 ease-out preserve-3d relative"
                  style={{ transform: getRotationTransform() }}
                >
                  {product === "coffee" && <CoffeePouchSvg />}
                  {product === "cardamom" && <CardamomJarSvg />}
                  {product === "cocoa" && <CocoaTinSvg />}

                  {/* Interactive Hotspot 1: Aroma Valve */}
                  {product === "coffee" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHotspot(
                          activeHotspot === "valve"
                            ? null
                            : "One-Way Aroma Degassing Valve: Lets roasted CO2 escape while preventing ambient oxygen from staling beans.",
                        )
                      }
                      className="absolute top-[28%] left-[48%] -translate-x-1/2 size-5 rounded-full bg-[#0054F9] text-white flex items-center justify-center text-[10px] font-bold shadow-lg animate-pulse hover:scale-125 transition-transform cursor-pointer ring-4 ring-[#0054F9]/20"
                      title="Inspect Degassing Valve"
                    >
                      +
                    </button>
                  )}

                  {/* Interactive Hotspot 2: Foil Barrier */}
                  {product === "coffee" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHotspot(
                          activeHotspot === "barrier"
                            ? null
                            : "Triple-Ply Metalized Barrier: Blocks 100% of UV sunlight and moisture ingress for a 9-month shelf life.",
                        )
                      }
                      className="absolute bottom-[30%] right-[20%] size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-lg animate-pulse hover:scale-125 transition-transform cursor-pointer ring-4 ring-emerald-600/20"
                      title="Inspect Multi-ply Barrier"
                    >
                      +
                    </button>
                  )}
                </div>

                {/* Hotspot Floating Tooltip */}
                {activeHotspot && (
                  <div className="mt-4 rounded-xl border border-line bg-card/95 backdrop-blur-md p-3 max-w-sm text-xs shadow-lg animate-fade-in text-center">
                    <p className="font-semibold text-ink">{activeHotspot}</p>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-[10px] text-muted hover:text-ink mt-1 font-bold underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Continuous 360 Slider & Preset Angle Buttons */}
                <div className="mt-8 w-full max-w-md space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="size-3.5 text-[#0054F9]" />
                      <span>Rotate Angle:</span>
                    </span>
                    <span className="font-mono font-bold text-ink">{rotationDegrees}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={5}
                    value={rotationDegrees}
                    onChange={(e) => setRotationDegrees(Number(e.target.value))}
                    className="w-full accent-[#0054F9] cursor-pointer"
                  />

                  {/* Quick Preset Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {[
                      { deg: 0, label: "Front (0°)" },
                      { deg: 45, label: "Angle (45°)" },
                      { deg: 90, label: "Side Seal (90°)" },
                      { deg: 180, label: "Rear Specs (180°)" },
                      { deg: 270, label: "Left View (270°)" },
                    ].map((btn) => (
                      <button
                        key={btn.deg}
                        type="button"
                        onClick={() => handleAnglePreset(btn.deg)}
                        className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                          rotationDegrees === btn.deg
                            ? "bg-[#0054F9] text-white shadow-xs"
                            : "bg-card border border-line text-muted hover:text-ink"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-muted bg-card/80 border border-line/80 px-2.5 py-1 rounded-full backdrop-blur-xs">
                  <RotateCw className="size-3 text-[#0054F9] animate-spin" />
                  <span>Live 3D model</span>
                </div>
              </div>

              {/* Right: Feature Description & Product Switcher */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <CatalisBadge>Add-on module</CatalisBadge>
                  <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                    Turn products in full 3D
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Shoppers look at your pack from every side before they order. Built with React
                    Three Fiber and Three.js, the same 3D stack the live store runs.
                  </p>
                </div>

                {/* Switch Sample Products */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Switch 3D Demo Model:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProduct("coffee");
                        setRotationDegrees(0);
                        setActiveHotspot(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        product === "coffee"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Coffee Pouch
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProduct("cardamom");
                        setRotationDegrees(0);
                        setActiveHotspot(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        product === "cardamom"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Cardamom Jar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProduct("cocoa");
                        setRotationDegrees(0);
                        setActiveHotspot(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        product === "cocoa"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Cocoa Tin
                    </button>
                  </div>
                </div>

                <div className="border-t border-line pt-4 text-xs text-muted space-y-1">
                  <p>
                    <strong>Try it:</strong> drag the slider or tap the blue dots to look around the pack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature 2: 3D Packaging Studio (Admin) */}
        {activeFeature === "studio" && (
          <div className={cn(DEMO_FRAME, "p-5 sm:p-10")}>
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <CatalisBadge>In the admin panel</CatalisBadge>
                  <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                    A 3D packaging studio
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Design the tray, lid and sleeve for your products on a live 3D pack. Try your
                    artwork, turn the model, and export what the printer and your product pages need.
                  </p>
                </div>

                {/* Packaging Finish & Material Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Try a sleeve colour:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFinish("kraft")}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        finish === "kraft"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Matte Kraft
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinish("midnight")}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        finish === "midnight"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Midnight Slate
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinish("bronze")}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        finish === "bronze"
                          ? "border-[#111218] bg-[#111218] text-white"
                          : "border-line bg-sunken text-muted hover:text-ink"
                      }`}
                    >
                      Metallic Bronze
                    </button>
                  </div>
                </div>

                {/* Packaging Template Format Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Part to design:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "tray", label: "Tray" },
                      { id: "lid", label: "Lid" },
                      { id: "sleeve", label: "Sleeve" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDieLineSize(t.id)}
                        className={`p-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          dieLineSize === t.id
                            ? "border-[#0054F9] bg-[#0054F9]/10 text-[#0054F9]"
                            : "border-line bg-sunken text-muted hover:text-ink"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-ink/90">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Your artwork wrapped live on the 3D pack</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Print-ready sleeve guide: SVG at 1:1, with 3 mm bleed, folds and crop marks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Turntable videos (MP4 or WebM), PNG stills and GLB 3D models</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <ButtonLink href="/pricing?m=studio" variant="secondary" className="px-5 py-2 text-xs font-bold">
                    View Studio Module in Price Builder
                    <ArrowRight aria-hidden className="size-3.5" />
                  </ButtonLink>
                </div>
              </div>

              {/* Right: Interactive 3D Studio Canvas */}
              <div className="lg:col-span-6 rounded-2xl border border-line bg-sunken/40 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-muted border-b border-line pb-3">
                  <span className="font-bold text-ink">Studio preview</span>
                  <span className="font-mono text-[10px] text-muted">
                    Part: {dieLineSize.toUpperCase()}
                  </span>
                </div>

                {/* Rendered Die-Cut Box Preview with Dynamic Finish */}
                <div
                  className={`aspect-video rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all duration-500 relative border ${
                    finish === "kraft"
                      ? "bg-gradient-to-br from-[#D4A373] to-[#BC6C25] text-white border-amber-900/30"
                      : finish === "bronze"
                        ? "bg-gradient-to-br from-[#CD7F32] via-[#8C4A16] to-[#5C2E0B] text-white border-amber-600/40"
                        : "bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white border-slate-700/60"
                  }`}
                >
                  <Box className="size-12 mb-2 text-white/90 animate-bounce" />
                  <span className="text-sm font-mono font-bold tracking-wider">
                    NORTH &amp; NOURISH · {finish.toUpperCase()} EDITION
                  </span>
                  <span className="text-[11px] text-white/70 mt-1 font-sans">
                    Sleeve artwork · 1:1 scale · 3 mm bleed
                  </span>

                  {exportComplete && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white p-4 animate-fade-in">
                      <FileCheck className="size-8 text-emerald-400 mb-1" />
                      <span className="text-xs font-bold text-emerald-400">Sleeve guide exported</span>
                      <span className="text-[10px] text-white/70">SVG · 1:1 mm · bleed, folds and crop marks</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Sparkles className="size-3.5 text-[#0054F9]" />
                    <span>Guide drawn to your pack&apos;s real size</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSimulateExport}
                    disabled={exporting}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#111218] text-white px-4 py-1.5 text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    {exporting ? (
                      <>
                        <RotateCw className="size-3 animate-spin" />
                        <span>Exporting…</span>
                      </>
                    ) : (
                      <>
                        <Zap className="size-3" />
                        <span>Try an export</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature 3: Mobile Touch & Video Gallery */}
        {activeFeature === "mobile" && (
          <div className={cn(DEMO_FRAME, "p-5 sm:p-10")}>
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <CatalisBadge>On phones</CatalisBadge>
                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                  Swipeable photos and video
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Most of your shoppers will be on a phone. Product pages let them swipe between
                  photos, short product videos and the 3D view, one thumb, no zooming about.
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-ink/90">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Short product videos in the same gallery as the photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Variant-specific media (switches images when pack size is picked)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Photos resized and compressed by Next.js for each screen</span>
                  </li>
                </ul>
              </div>

              {/* Right: Interactive Smartphone Carousel Frame */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-68 rounded-[2.5rem] border-4 border-slate-900 bg-white p-3 shadow-2xl">
                  {/* Phone Speaker Notch */}
                  <div className="mx-auto w-24 h-4 bg-slate-900 rounded-full mb-3" />

                  {/* Slide Content */}
                  <div className="rounded-2xl bg-[#FAF9F5] p-5 text-center border border-line min-h-[260px] flex flex-col items-center justify-center">
                    {mobileSlide === 0 && (
                      <div className="animate-fade-in space-y-2">
                        <CoffeePouchSvg className="w-28 mx-auto" />
                        <p className="font-bold text-xs text-[#1E3A2F]">Slide 1: Pack 360° Angle</p>
                        <p className="text-[10px] text-muted">Single-Origin Coorg Arabica 250g</p>
                      </div>
                    )}

                    {mobileSlide === 1 && (
                      <div className="animate-fade-in space-y-2">
                        <div className="size-28 mx-auto rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden group">
                          <Play className="size-8 text-white fill-white/80" />
                          <span className="text-[10px] font-mono mt-1 text-white/80">0:15 Roaster Video</span>
                        </div>
                        <p className="font-bold text-xs text-[#1E3A2F]">Slide 2: Drum Roasting Video</p>
                        <p className="text-[10px] text-muted">Plays in the gallery</p>
                      </div>
                    )}

                    {mobileSlide === 2 && (
                      <div className="animate-fade-in space-y-2">
                        <div className="size-28 mx-auto rounded-xl border border-line bg-card p-2 flex flex-col items-center justify-center">
                          <FileCheck className="size-8 text-emerald-600 mb-1" />
                          <span className="text-[10px] font-bold text-ink">Lot 2026-CO-04</span>
                          <span className="text-[9px] text-muted">100% Arabica Certified</span>
                        </div>
                        <p className="font-bold text-xs text-[#1E3A2F]">Slide 3: Harvest Certificate</p>
                        <p className="text-[10px] text-muted">Estate Altitude: 1,350m ASL</p>
                      </div>
                    )}
                  </div>

                  {/* Dot Switcher Controls */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {[0, 1, 2].map((slideIndex) => (
                      <button
                        key={slideIndex}
                        type="button"
                        onClick={() => setMobileSlide(slideIndex)}
                        className={`size-2.5 rounded-full transition-all cursor-pointer ${
                          mobileSlide === slideIndex ? "bg-[#1E3A2F] w-5" : "bg-slate-300 hover:bg-slate-400"
                        }`}
                        title={`Go to slide ${slideIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
