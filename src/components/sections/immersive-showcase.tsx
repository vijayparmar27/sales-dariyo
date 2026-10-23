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
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();
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
          eyebrow={t.immersiveShowcase.eyebrow}
          title={
            <>
              {t.immersiveShowcase.titlePart1}{" "}
              <span className="italic text-muted">{t.immersiveShowcase.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          {t.immersiveShowcase.subtitle}
        </SectionHeading>

        <SegmentedTabs
          label={t.immersiveShowcase.eyebrow}
          value={activeFeature}
          onChange={setActiveFeature}
          options={[
            { value: "viewer", label: t.immersiveShowcase.tabs.viewer, short: t.immersiveShowcase.tabs.viewerShort, icon: Move3d },
            { value: "studio", label: t.immersiveShowcase.tabs.studio, short: t.immersiveShowcase.tabs.studioShort, icon: Box },
            { value: "mobile", label: t.immersiveShowcase.tabs.mobile, short: t.immersiveShowcase.tabs.mobileShort, icon: Smartphone },
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
                                  : t.immersiveShowcase.hotspots.valve,
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
                                  : t.immersiveShowcase.hotspots.barrier,
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
                          {t.immersiveShowcase.hotspots.dismiss}
                        </button>
                      </div>
                    )}

                    {/* Turn the drawing */}
                    <div className="mt-8 w-full max-w-md space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="size-3.5 text-[#0054F9]" />
                          <span>{t.immersiveShowcase.turnPack}</span>
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
                        aria-label={t.immersiveShowcase.turnPack}
                      />
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {[
                          { deg: 0, label: t.immersiveShowcase.angles.front },
                          { deg: 90, label: t.immersiveShowcase.angles.side },
                          { deg: 180, label: t.immersiveShowcase.angles.back },
                          { deg: 270, label: t.immersiveShowcase.angles.otherSide },
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
                  <span>{viewerProduct.model3d ? t.immersiveShowcase.modelStatusStill : t.immersiveShowcase.modelStatusLive}</span>
                </div>
              </div>

              {/* Right: what it is, and which product */}
              <div className="space-y-6 lg:col-span-5">
                <div>
                  <CatalisBadge>{t.immersiveShowcase.moduleBadge}</CatalisBadge>
                  <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                    {t.immersiveShowcase.viewerTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {DEMO_STORE.brand.live
                      ? t.immersiveShowcase.viewerDescLive
                      : t.immersiveShowcase.viewerDescGeneric}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold tracking-wider text-muted uppercase">{t.immersiveShowcase.productLabel}</p>
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
                      {t.immersiveShowcase.spinLiveModel} {DEMO_STORE.brand.name}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  ) : (
                    <p>
                      {t.immersiveShowcase.viewerTryIt}
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
                  <CatalisBadge>{t.immersiveShowcase.adminBadge}</CatalisBadge>
                  <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                    {t.immersiveShowcase.studioTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t.immersiveShowcase.studioDesc}
                  </p>
                </div>

                {/* Packaging Finish & Material Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {t.immersiveShowcase.finishLabel}:
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
                      {t.immersiveShowcase.finishes.kraft}
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
                      {t.immersiveShowcase.finishes.midnight}
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
                      {t.immersiveShowcase.finishes.bronze}
                    </button>
                  </div>
                </div>

                {/* Packaging Template Format Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {t.immersiveShowcase.partLabel}:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "tray", label: t.immersiveShowcase.parts.tray },
                      { id: "lid", label: t.immersiveShowcase.parts.lid },
                      { id: "sleeve", label: t.immersiveShowcase.parts.sleeve },
                    ].map((tPart) => (
                      <button
                        key={tPart.id}
                        type="button"
                        onClick={() => setDieLineSize(tPart.id)}
                        className={`p-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          dieLineSize === tPart.id
                            ? "border-[#0054F9] bg-[#0054F9]/10 text-[#0054F9]"
                            : "border-line bg-sunken text-muted hover:text-ink"
                        }`}
                      >
                        {tPart.label}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-ink/90">
                  {t.immersiveShowcase.studioBullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <ButtonLink href="/pricing?m=studio" variant="secondary" className="px-5 py-2 text-xs font-bold">
                    {t.immersiveShowcase.viewStudioModule}
                    <ArrowRight aria-hidden className="size-3.5" />
                  </ButtonLink>
                </div>
              </div>

              {/* Right: Interactive 3D Studio Canvas */}
              <div className="lg:col-span-6 rounded-2xl border border-line bg-sunken/40 p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-muted border-b border-line pb-3">
                  <span className="font-bold text-ink">{t.immersiveShowcase.studioPreview}</span>
                  <span className="font-mono text-[10px] text-muted">
                    {t.immersiveShowcase.partIndicator}: {dieLineSize.toUpperCase()}
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
                    {t.immersiveShowcase.sleeveArtworkDetails}
                  </span>

                  {exportComplete && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white p-4 animate-fade-in">
                      <FileCheck className="size-8 text-emerald-400 mb-1" />
                      <span className="text-xs font-bold text-emerald-400">{t.immersiveShowcase.sleeveExported}</span>
                      <span className="text-[10px] text-white/70">{t.immersiveShowcase.sleeveExportDetails}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Sparkles className="size-3.5 text-[#0054F9]" />
                    <span>{t.immersiveShowcase.guideDrawn}</span>
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
                        <span>{t.immersiveShowcase.exporting}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="size-3" />
                        <span>{t.immersiveShowcase.tryExport}</span>
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
                <CatalisBadge>{t.immersiveShowcase.phoneBadge}</CatalisBadge>
                <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] text-ink">
                  {t.immersiveShowcase.mobileTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t.immersiveShowcase.mobileDesc}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-ink/90">
                  {t.immersiveShowcase.mobileBullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
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
