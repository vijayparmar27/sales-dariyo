"use client";

import {
  ArrowRight,
  ArrowUpRight,
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

import { ProductVisual } from "@/components/demo/product-visual";
import { ButtonLink, CatalisBadge, DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { DEMO_STORE, findDemoProduct } from "@/data/demo-store";
import { cn } from "@/lib/cn";

type PackagingFinish = "kraft" | "midnight" | "bronze";

/** Products the 3D viewer can show: a real 3D render, or the drawn artwork. */
const VIEWER_PRODUCTS = DEMO_STORE.products.filter((p) => p.model3d || p.art).slice(0, 3);

/** The phone gallery: the first product with real photos, else the drawn packs. */
const GALLERY_PRODUCT = DEMO_STORE.products.find((p) => p.gallery?.length);
const GALLERY_SLIDES = GALLERY_PRODUCT?.gallery?.length
  ? GALLERY_PRODUCT.gallery.map((image) => ({ product: GALLERY_PRODUCT, image, caption: image.alt }))
  : DEMO_STORE.products.map((product) => ({ product, image: undefined, caption: product.name }));

/** The studio preview shows the real pack when there is a 3D render of one. */
const STUDIO_PRODUCT = DEMO_STORE.products.find((p) => p.model3d);

export function ImmersiveShowcase() {
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);
  const [viewerProductId, setViewerProductId] = useState<string>(VIEWER_PRODUCTS[0]?.id ?? "");
  const viewerProduct = findDemoProduct(viewerProductId);
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

        {/* Feature 1: the 3D viewer */}
        {activeFeature === "viewer" && (
          <div className={cn(DEMO_FRAME, "p-5 sm:p-10")}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              {/* Left: the stage */}
              <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-linear-to-b from-sunken via-card to-sunken p-8 lg:col-span-7">
                {viewerProduct.model3d ? (
                  // A real product: a still of its 3D model. The spinnable model
                  // itself lives on the product's page in the live store.
                  <div className="w-full max-w-sm animate-float-gentle">
                    <ProductVisual
                      product={viewerProduct}
                      image={viewerProduct.model3d}
                      sizes="(min-width: 1024px) 384px, 80vw"
                      className="drop-shadow-xl"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="perspective-1000 preserve-3d relative w-full max-w-60 transition-transform duration-300 ease-out"
                      style={{ transform: getRotationTransform() }}
                    >
                      <ProductVisual product={viewerProduct} sizes="240px" />

                      {/* Hotspots, on the drawn coffee pouch only */}
                      {viewerProduct.art === "coffee" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveHotspot(
                                activeHotspot === "valve"
                                  ? null
                                  : "One-way aroma valve: lets roasted CO2 out and keeps air from staling the beans.",
                              )
                            }
                            className="absolute top-[28%] left-[48%] flex size-5 -translate-x-1/2 animate-pulse cursor-pointer items-center justify-center rounded-full bg-[#0054F9] text-[10px] font-bold text-white shadow-lg ring-4 ring-[#0054F9]/20 transition-transform hover:scale-125"
                            title="Inspect the aroma valve"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveHotspot(
                                activeHotspot === "barrier"
                                  ? null
                                  : "Foil barrier: keeps light and moisture out of the pouch.",
                              )
                            }
                            className="absolute right-[20%] bottom-[30%] flex size-5 animate-pulse cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-lg ring-4 ring-emerald-600/20 transition-transform hover:scale-125"
                            title="Inspect the foil barrier"
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>

                    {activeHotspot && (
                      <div className="mt-4 max-w-sm animate-fade-in rounded-xl border border-line bg-card/95 p-3 text-center text-xs shadow-lg backdrop-blur-md">
                        <p className="font-semibold text-ink">{activeHotspot}</p>
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(null)}
                          className="mt-1 cursor-pointer text-[10px] font-bold text-muted underline hover:text-ink"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}

                    {/* Turn the drawing */}
                    <div className="mt-8 w-full max-w-md space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="size-3.5 text-[#0054F9]" />
                          <span>Turn the pack</span>
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
                        className="w-full cursor-pointer accent-[#0054F9]"
                        aria-label="Turn the pack"
                      />
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {[
                          { deg: 0, label: "Front" },
                          { deg: 90, label: "Side" },
                          { deg: 180, label: "Back" },
                          { deg: 270, label: "Other side" },
                        ].map((btn) => (
                          <button
                            key={btn.deg}
                            type="button"
                            onClick={() => handleAnglePreset(btn.deg)}
                            className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
                              rotationDegrees === btn.deg
                                ? "bg-[#0054F9] text-white shadow-xs"
                                : "border border-line bg-card text-muted hover:text-ink"
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-line/80 bg-card/80 px-2.5 py-1 text-[11px] font-semibold text-muted backdrop-blur-xs">
                  <RotateCw className="size-3 animate-spin text-[#0054F9]" />
                  <span>{viewerProduct.model3d ? "Still from the live 3D model" : "Live 3D model"}</span>
                </div>
              </div>

              {/* Right: what it is, and which product */}
              <div className="space-y-6 lg:col-span-5">
                <div>
                  <CatalisBadge>Add-on module</CatalisBadge>
                  <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                    Turn products in full 3D
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {DEMO_STORE.brand.live
                      ? `Every ${DEMO_STORE.brand.name} product page has a 3D model of the ${DEMO_STORE.packNoun}: shoppers drag to spin it and pinch to zoom before they buy. Built with React Three Fiber and Three.js.`
                      : "Shoppers look at your pack from every side before they order. Built with React Three Fiber and Three.js."}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold tracking-wider text-muted uppercase">Product</p>
                  <div className="grid grid-cols-3 gap-2">
                    {VIEWER_PRODUCTS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setViewerProductId(item.id);
                          setRotationDegrees(0);
                          setActiveHotspot(null);
                        }}
                        className={`cursor-pointer rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                          viewerProduct.id === item.id
                            ? "border-[#111218] bg-[#111218] text-white"
                            : "border-line bg-sunken text-muted hover:text-ink"
                        }`}
                      >
                        {item.name.replace(/ Dry Fish$/, "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 border-t border-line pt-4 text-xs text-muted">
                  {viewerProduct.url ? (
                    <a
                      href={viewerProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#111218] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
                    >
                      Spin the real model on {DEMO_STORE.brand.name}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  ) : (
                    <p>
                      <strong>Try it:</strong> drag the slider or tap the blue dots to look around the pack.
                    </p>
                  )}
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
                  {STUDIO_PRODUCT?.model3d ? (
                    <div className="mb-1 w-40 sm:w-48">
                      <ProductVisual
                        product={STUDIO_PRODUCT}
                        image={STUDIO_PRODUCT.model3d}
                        sizes="192px"
                        className="drop-shadow-2xl"
                      />
                    </div>
                  ) : (
                    <Box className="size-12 mb-2 text-white/90 animate-bounce" />
                  )}
                  <span className="text-sm font-mono font-bold tracking-wider">
                    {DEMO_STORE.brand.name.toUpperCase()} · {finish.toUpperCase()} SLEEVE
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

                  {/* The slide */}
                  {(() => {
                    const slide = GALLERY_SLIDES[mobileSlide % GALLERY_SLIDES.length];
                    if (!slide) return null;
                    const isVideo = /video/i.test(slide.caption);
                    return (
                      <div key={mobileSlide} className="animate-fade-in">
                        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-(--demo-surface)">
                          <ProductVisual
                            product={slide.product}
                            image={slide.image}
                            sizes="240px"
                            className={slide.image ? "size-full object-cover" : "w-28"}
                          />
                          {isVideo ? (
                            <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                              <span className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                <Play className="size-5 fill-(--demo-ink) text-(--demo-ink)" />
                              </span>
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 px-1 text-center text-[11px] font-semibold text-(--demo-ink)">
                          {slide.caption}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Dot Switcher Controls */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {GALLERY_SLIDES.map((_, slideIndex) => (
                      <button
                        key={slideIndex}
                        type="button"
                        onClick={() => setMobileSlide(slideIndex)}
                        className={`size-2.5 rounded-full transition-all cursor-pointer ${
                          mobileSlide === slideIndex ? "w-5 bg-(--demo-ink)" : "bg-slate-300 hover:bg-slate-400"
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
