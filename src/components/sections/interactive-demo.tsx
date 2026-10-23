"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  LayoutDashboard,
  Lock,
  Minus,
  Plus,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Tag,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ProductVisual } from "@/components/demo/product-visual";
import { DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { demoAddress } from "@/config/site";
import { cn } from "@/lib/cn";
import { DEMO_STORE, findDemoProduct } from "@/data/demo-store";
import { useI18n } from "@/lib/i18n/context";
import { formatPrice } from "@/lib/i18n/currencies";

type DemoTab = "storefront" | "admin" | "backend";

export function InteractiveDemo() {
  const { t, currency } = useI18n();
  const [activeTab, setActiveTab] = useState<DemoTab>("storefront");

  // Storefront Interactive State
  const firstProduct = findDemoProduct(DEMO_STORE.products[0]?.id ?? "");
  const [selectedProductId, setSelectedProductId] = useState<string>(firstProduct.id);
  const [selectedPackId, setSelectedPackId] = useState<string>(firstProduct.packSizes.at(-1)?.id ?? "");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<{ productId: string; packId: string; qty: number }[]>([
    { productId: firstProduct.id, packId: firstProduct.packSizes.at(-1)?.id ?? "", qty: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [pincode, setPincode] = useState("560001");
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Promo code & free shipping threshold
  const [promoInput, setPromoInput] = useState("FIRST10");
  const [appliedPromo, setAppliedPromo] = useState<string | null>("FIRST10");
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  // Admin Interactive State
  const [orders, setOrders] = useState(DEMO_STORE.orders);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  // Backend Interactive State
  const [backendStep, setBackendStep] = useState<number>(1);

  const selectedProduct = findDemoProduct(selectedProductId);
  // The backend snippets use the demo store's own SKU and sample order.
  const sampleSku = firstProduct.packSizes.at(-1)?.sku ?? "SKU";
  const sampleOrder = DEMO_STORE.orders[0];
  const sampleOrderId = sampleOrder?.id ?? "ORDER";
  const selectedPack =
    selectedProduct.packSizes.find((p) => p.id === selectedPackId) ??
    selectedProduct.packSizes[0]!;

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === selectedProductId && i.packId === selectedPackId,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === selectedProductId && i.packId === selectedPackId
            ? { ...i, qty: i.qty + quantity }
            : i,
        );
      }
      return [...prev, { productId: selectedProductId, packId: selectedPackId, qty: quantity }];
    });
    setCartOpen(true);
  };

  const handleDispatchOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              fulfillmentStatus: "DISPATCHED",
              awb: "DL-LIVE-" + Math.floor(100000 + Math.random() * 900000),
            }
          : o,
      ),
    );
    setDispatchToast(`${orderId}: ${t.interactiveDemo.admin.orderDispatchedToast}`);
    setTimeout(() => setDispatchToast(null), 4000);
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const prod = DEMO_STORE.products.find((p) => p.id === item.productId);
    const pack = prod?.packSizes.find((p) => p.id === item.packId);
    return acc + (pack?.price ?? 0) * item.qty;
  }, 0);

  const cartItemCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  // Load-bearing D2C retail promo & free shipping calculations
  const FREE_SHIPPING_THRESHOLD = 999;
  const promoDiscount = appliedPromo === "FIRST10" ? Math.round(cartTotal * 0.1) : 0;
  const netCartTotal = Math.max(0, cartTotal - promoDiscount);
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const freeShippingDiff = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const handleCopyCode = (step: number, code: string) => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2500);
    }
  };

  return (
    <section id="demo" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.interactiveDemo.eyebrow}
          title={
            <>
              {t.interactiveDemo.titlePart1}{" "}
              <span className="italic text-muted">{t.interactiveDemo.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          {t.interactiveDemo.subtitle}
        </SectionHeading>

        <SegmentedTabs
          label="Demo view"
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { value: "storefront", label: t.interactiveDemo.tabs.storefront, short: t.interactiveDemo.tabs.storefrontShort, icon: Store },
            { value: "admin", label: t.interactiveDemo.tabs.admin, short: t.interactiveDemo.tabs.adminShort, icon: LayoutDashboard },
            { value: "backend", label: t.interactiveDemo.tabs.backend, short: t.interactiveDemo.tabs.backendShort, icon: Server },
          ]}
        />

        {/* =========================================================================
            TAB 01: CUSTOMER STOREFRONT (the demo store, in its own colours)
           ========================================================================= */}
        {activeTab === "storefront" && (
          <div className="rounded-[28px] border border-(--demo-line) bg-(--demo-surface) p-3 shadow-[0_40px_90px_-50px_rgba(17,18,24,0.35)] sm:p-8">
            {/* Browser Frame Navigation Header */}
            <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-(--demo-line) bg-white p-3 shadow-xs sm:p-3.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="hidden size-3 shrink-0 rounded-full bg-rose-400 sm:block" />
                <span className="hidden size-3 shrink-0 rounded-full bg-amber-400 sm:block" />
                <span className="hidden size-3 shrink-0 rounded-full bg-emerald-400 sm:block" />
                <div className="flex min-w-0 items-center gap-2 rounded-full border border-(--demo-line) bg-(--demo-surface) px-3 py-1 text-xs text-(--demo-ink) sm:ml-3 sm:px-4">
                  <Lock className="size-3 shrink-0 text-emerald-600" />
                  <span className="truncate font-mono text-[11px] font-semibold">
                    {demoAddress()}
                  </span>
                </div>
              </div>

              {/* The store's brand and cart button */}
              <div className="flex items-center gap-4">
                <span className="hidden items-center gap-2 text-xs font-bold tracking-wider text-(--demo-ink) uppercase md:flex">
                  {DEMO_STORE.brand.mark ? (
                    <Image src={DEMO_STORE.brand.mark} alt="" className="size-5 object-contain" />
                  ) : null}
                  {DEMO_STORE.brand.name} · {DEMO_STORE.brand.tagline}
                </span>

                <button
                  type="button"
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative inline-flex items-center gap-2 rounded-full bg-(--demo-ink) text-white px-4 py-1.5 text-xs font-bold hover:bg-(--demo-ink-hover) transition-colors cursor-pointer"
                >
                  <ShoppingBag className="size-3.5" />
                  <span>{t.interactiveDemo.storefront.bag}</span>
                  <span className="size-5 rounded-full bg-(--demo-accent) text-white text-[10px] flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Storefront Grid: Product Selector + Detailed Product Card */}
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Product Selector Carousel/List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-(--demo-ink) mb-3">
                  {DEMO_STORE.brand.live ? t.interactiveDemo.storefront.fromCatalogue : t.interactiveDemo.storefront.sampleProducts}
                </p>
                {DEMO_STORE.products.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setSelectedPackId(prod.packSizes.at(-1)?.id ?? "");
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-(--demo-ink) bg-white shadow-md ring-2 ring-(--demo-ink)/20"
                          : "border-(--demo-line) bg-white/70 hover:bg-white hover:border-(--demo-ink)/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        {prod.photo ? (
                          <span className="size-14 shrink-0 overflow-hidden rounded-xl border border-(--demo-line) bg-white">
                            <ProductVisual product={prod} sizes="56px" className="size-full object-cover" />
                          </span>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-(--demo-accent) uppercase tracking-wider">
                            {prod.categoryLabel}
                          </span>
                          <h4 className="text-sm font-bold text-(--demo-ink)">{prod.name}</h4>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">{prod.tagline}</p>
                        </div>
                        <span className="text-xs font-extrabold text-(--demo-ink) tabular-nums whitespace-nowrap">
                          {t.interactiveDemo.storefront.fromPrice} {formatPrice(prod.packSizes[0]?.price ?? 0, currency)}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Brand Customization Banner Note */}
                <div className="rounded-2xl border border-(--demo-line) bg-(--demo-line)/40 p-4 text-xs text-(--demo-ink)">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-(--demo-accent)" />
                    <span>{t.interactiveDemo.storefront.brandNotTemplate}</span>
                  </p>
                  <p className="mt-1 text-muted text-[11px] leading-relaxed">
                    {DEMO_STORE.brand.live
                      ? `These are ${DEMO_STORE.brand.name}'s own products, photos and colours. Your store gets your brand in exactly the same way.`
                      : "This demo uses its brand's own colours and type, to show that your store will not look like a template."}
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Product Card & Pack Selector (8 cols) */}
              <div className="lg:col-span-8 rounded-3xl border border-(--demo-line) bg-white p-6 sm:p-8 shadow-sm">
                <div className="grid gap-8 md:grid-cols-12 items-center">
                  {/* Left: Product Artwork Visual (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-(--demo-surface) border border-(--demo-line) relative group">
                    <div className="w-full max-w-64 transition-transform duration-500 group-hover:scale-105">
                      <ProductVisual product={selectedProduct} sizes="(min-width: 1024px) 256px, 70vw" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-(--demo-ink) bg-white border border-(--demo-line) px-3 py-1 rounded-full shadow-2xs">
                      <span>{selectedProduct.provenance}</span>
                    </div>
                  </div>

                  {/* Right: Buying Details & Pack Size Selection (7 cols) */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-(--demo-ink)/10 text-(--demo-ink) px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          {selectedProduct.categoryLabel}
                        </span>
                        {selectedProduct.rating ? (
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span>{selectedProduct.rating.value}</span>
                            <span className="text-muted font-normal">
                              ({selectedProduct.rating.count} reviews)
                            </span>
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-(--demo-ink)">
                        {selectedProduct.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Tasting / Flavor Profile Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.highlights.map((note) => (
                        <span
                          key={note}
                          className="rounded-md bg-(--demo-surface) text-(--demo-ink) border border-(--demo-line) px-2.5 py-1 text-[11px] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Pack Size Variants Selector (Load-bearing CPG Feature) */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-(--demo-ink) mb-2">
                        <span>{t.interactiveDemo.storefront.packSizeLabel}</span>
                        <span className="text-(--demo-accent) font-semibold text-[11px]">
                          SKU: {selectedPack.sku}
                        </span>
                      </div>

                      <div className={cn("grid gap-2", selectedProduct.packSizes.length > 2 ? "grid-cols-3" : "grid-cols-2")}>
                        {selectedProduct.packSizes.map((pack) => {
                          const isPackSelected = pack.id === selectedPackId;
                          return (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() => setSelectedPackId(pack.id)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                isPackSelected
                                  ? "border-(--demo-ink) bg-(--demo-ink) text-white shadow-sm"
                                  : "border-(--demo-line) bg-(--demo-surface) text-(--demo-ink) hover:bg-white"
                              }`}
                            >
                              <span className="text-xs font-bold">{pack.label}</span>
                              <span
                                className={`text-[11px] font-extrabold mt-1 tabular-nums ${
                                  isPackSelected ? "text-white/80" : "text-(--demo-ink)"
                                }`}
                              >
                                {formatPrice(pack.price, currency)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price, Quantity & Add to Cart Action */}
                    <div className="border-t border-(--demo-line) pt-5">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-extrabold text-(--demo-ink) tabular-nums">
                          {formatPrice(selectedPack.price * quantity, currency)}
                        </span>
                        {selectedPack.compareAtPrice ? (
                          <span className="text-xs text-muted line-through tabular-nums">
                            {formatPrice(selectedPack.compareAtPrice * quantity, currency)}
                          </span>
                        ) : null}
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                          {t.interactiveDemo.storefront.inStock}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Qty Selector */}
                        <div className="inline-flex items-center rounded-full border border-(--demo-line) bg-(--demo-surface) p-1 text-xs">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="size-7 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center font-bold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="size-7 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        {/* Add to Bag CTA */}
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-(--demo-ink) px-4 py-3 text-sm font-bold whitespace-nowrap text-white shadow-md transition-all hover:bg-(--demo-ink-hover) active:scale-98 sm:px-6"
                        >
                          <ShoppingBag className="size-4 shrink-0" />
                          <span>{t.interactiveDemo.storefront.addToBag}</span>
                          <span className="hidden sm:inline">· {formatPrice(selectedPack.price * quantity, currency)}</span>
                        </button>
                      </div>

                      {/* Delhivery Pincode Checker Simulation */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-(--demo-line)/70 pt-3 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          <Truck className="size-3.5 text-emerald-600" />
                          <span>{t.interactiveDemo.storefront.expressDelivery}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-16 rounded border border-(--demo-line) px-1.5 py-0.5 text-xs font-mono text-(--demo-ink)"
                          />
                          <button
                            type="button"
                            onClick={() => setPincodeChecked(true)}
                            className="text-[11px] font-bold text-(--demo-ink) hover:underline"
                          >
                            {t.interactiveDemo.storefront.check}
                          </button>
                          {pincodeChecked && (
                            <span className="text-emerald-700 font-semibold text-[11px]">
                              {t.interactiveDemo.storefront.daysEstimate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Embedded Mini Cart Slideout */}
                {cartOpen && (
                  <div className="mt-6 border-t border-(--demo-line) pt-6 bg-(--demo-surface) p-5 rounded-2xl border animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="size-4 text-(--demo-ink)" />
                        <h4 className="text-sm font-bold text-(--demo-ink)">
                          {t.interactiveDemo.storefront.shoppingBagTitle} ({cartItemCount} {t.interactiveDemo.storefront.items})
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCartOpen(false)}
                        className="text-xs font-semibold text-muted hover:text-(--demo-ink) cursor-pointer"
                      >
                        {t.interactiveDemo.storefront.hideBag}
                      </button>
                    </div>

                    {/* Free Shipping Progress Indicator */}
                    <div className="rounded-xl border border-(--demo-line) bg-white p-3 mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-(--demo-ink) flex items-center gap-1.5">
                          <Truck className="size-3.5 text-emerald-600" />
                          {freeShippingDiff === 0 ? (
                            <span className="text-emerald-700 font-extrabold">{t.interactiveDemo.storefront.freeDeliveryUnlocked}</span>
                          ) : (
                            <span>
                              {t.interactiveDemo.storefront.addAmountForFree} <strong className="text-(--demo-ink)">{formatPrice(freeShippingDiff, currency)}</strong> {t.interactiveDemo.storefront.forFreeDelivery}
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-[10px] text-muted">{freeShippingProgress}%</span>
                      </div>
                      <div className="w-full bg-(--demo-line) rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="divide-y divide-(--demo-line) mb-4">
                      {cartItems.map((item, index) => {
                        const prod = DEMO_STORE.products.find((p) => p.id === item.productId);
                        const pack = prod?.packSizes.find((p) => p.id === item.packId);
                        return (
                          <div key={index} className="py-2.5 flex items-center justify-between text-xs">
                            <div>
                              <p className="font-bold text-(--demo-ink)">{prod?.name}</p>
                              <p className="text-muted text-[11px]">
                                {pack?.label} · Qty {item.qty}
                              </p>
                            </div>
                            <span className="font-bold text-(--demo-ink) tabular-nums">
                              {formatPrice((pack?.price ?? 0) * item.qty, currency)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Promo Code Box */}
                    <div className="rounded-xl border border-(--demo-line) bg-white p-2.5 mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="size-3.5 text-(--demo-accent) shrink-0" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder={t.interactiveDemo.storefront.couponPlaceholder}
                          className="flex-1 text-xs font-mono font-bold uppercase bg-transparent outline-none text-(--demo-ink) placeholder:text-muted/60"
                        />
                        {appliedPromo ? (
                          <button
                            type="button"
                            onClick={() => setAppliedPromo(null)}
                            className="text-[11px] font-bold text-red-600 hover:underline px-2 cursor-pointer"
                          >
                            {t.interactiveDemo.storefront.remove}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (promoInput.trim() === "FIRST10") {
                                setAppliedPromo("FIRST10");
                              }
                            }}
                            className="text-[11px] font-bold text-(--demo-ink) hover:bg-(--demo-surface) border border-(--demo-line) rounded-md px-2 py-0.5 cursor-pointer"
                          >
                            {t.interactiveDemo.storefront.apply}
                          </button>
                        )}
                      </div>
                      {appliedPromo && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                          ✓ {appliedPromo} {t.interactiveDemo.storefront.couponApplied}
                        </p>
                      )}
                    </div>

                    {/* Totals Breakdown */}
                    <div className="space-y-1.5 border-t border-(--demo-line) pt-3 text-xs">
                      <div className="flex items-center justify-between text-muted">
                        <span>{t.interactiveDemo.storefront.subtotal}</span>
                        <span className="tabular-nums font-semibold text-(--demo-ink)">{formatPrice(cartTotal, currency)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex items-center justify-between text-emerald-700 font-semibold">
                          <span>{t.interactiveDemo.storefront.couponDiscount}</span>
                          <span className="tabular-nums font-bold">− {formatPrice(promoDiscount, currency)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-muted">
                        <span>{t.interactiveDemo.storefront.shippingFee}</span>
                        <span className="font-semibold text-emerald-700">
                          {freeShippingDiff === 0 ? t.interactiveDemo.storefront.free : `${formatPrice(60, currency)} (${t.interactiveDemo.storefront.ordersUnder} ${formatPrice(999, currency)})`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-(--demo-ink) text-sm pt-2 border-t border-(--demo-line)/80">
                        <span>{t.interactiveDemo.storefront.finalTotal}</span>
                        <span className="font-extrabold tabular-nums text-base">
                          {formatPrice(netCartTotal + (freeShippingDiff === 0 ? 0 : 60), currency)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-[11px] text-muted">
                        <span>{t.interactiveDemo.storefront.paymentMethods}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("admin");
                          setCartOpen(false);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0054F9] text-white px-4 py-2 text-xs font-bold hover:bg-[#0045D8] transition-colors cursor-pointer"
                      >
                        <span>{t.interactiveDemo.storefront.inspectAdmin}</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 02: OPERATOR ADMIN DASHBOARD DEMO
           ========================================================================= */}
        {activeTab === "admin" && (
          <div className={cn(DEMO_FRAME, "p-3 sm:p-8")}>
            {/* Admin Header with Breadcrumbs & Telemetry */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">
                    {t.interactiveDemo.admin.operatorConsole}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-ink mt-1">
                  {t.interactiveDemo.admin.ordersAndDispatch}
                </h3>
              </div>

              {/* Status counters (one stock count per pack: the platform has no per-warehouse stock) */}
              <div className="flex items-center gap-3 text-xs">
                <div className="rounded-xl border border-line bg-sunken px-3 py-1.5 font-medium">
                  <span className="text-muted">{t.interactiveDemo.admin.toPack}:</span>{" "}
                  <strong className="text-ink">{orders.filter((o) => o.fulfillmentStatus === "CONFIRMED").length} {t.interactiveDemo.admin.ordersCount}</strong>
                </div>
                <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
                  {t.interactiveDemo.admin.sampleOrders}
                </span>
              </div>
            </div>

            {/* Notification Toast */}
            {dispatchToast && (
              <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center justify-between animate-fade-in">
                <span className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  {dispatchToast}
                </span>
                <span className="text-emerald-600 text-[11px]">{t.interactiveDemo.admin.syncingDelhivery}</span>
              </div>
            )}

            {/* Active Orders Data Table */}
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-line bg-sunken/60 text-muted uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.orderIdTime}</th>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.customer}</th>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.items}</th>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.total}</th>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.payment}</th>
                    <th className="py-3 px-4">{t.interactiveDemo.admin.table.status}</th>
                    <th className="py-3 px-4 text-right">{t.interactiveDemo.admin.table.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-medium text-ink">
                  {orders.map((order) => {
                    const isDispatched = order.fulfillmentStatus === "DISPATCHED";
                    return (
                      <tr key={order.id} className="hover:bg-sunken/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold">
                          <div>{order.id}</div>
                          <div className="text-[10px] text-muted font-sans font-normal">
                            {order.time}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold">{order.customer}</div>
                          <div className="text-[11px] text-muted">{order.location}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-[11px]">
                          {order.items}
                        </td>
                        <td className="py-3.5 px-4 font-bold tabular-nums">
                          {formatPrice(order.total, currency)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              isDispatched
                                ? "bg-emerald-100 text-emerald-800"
                                : order.fulfillmentStatus === "PACKED"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.fulfillmentStatus}
                          </span>
                          {order.awb ? (
                            <div className="text-[10px] font-mono text-muted mt-0.5">
                              AWB: {order.awb}
                            </div>
                          ) : null}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isDispatched ? (
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center justify-end gap-1">
                              <Check className="size-3.5" /> {t.interactiveDemo.admin.table.booked}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleDispatchOrder(order.id)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#111218] text-white px-3 py-1.5 text-[11px] font-bold hover:bg-black transition-colors cursor-pointer"
                            >
                              <Truck className="size-3" />
                              <span>{t.interactiveDemo.admin.table.oneClick}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stock per pack: sample counts, one count per pack */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {DEMO_STORE.products.slice(0, 3).map((product, index) => {
                const units = [84, 18, 45][index] ?? 40;
                const low = units <= 20;
                const pack = product.packSizes.at(-1);
                return (
                  <div
                    key={product.id}
                    className={cn("rounded-2xl border p-4", low ? "border-amber-200 bg-amber-50/50" : "border-line bg-sunken/40")}
                  >
                    <div className={cn("mb-1 flex items-center justify-between gap-2 text-xs", low ? "text-amber-800" : "text-muted")}>
                      <span className="truncate">
                        {product.name} {pack?.label}
                      </span>
                      <span className={cn("shrink-0 font-bold", low ? "text-amber-700" : "text-emerald-600")}>
                        {low ? t.adminShowcase.metrics.packRunningLow : t.adminShowcase.metrics.everyPackInStock}
                      </span>
                    </div>
                    <p className={cn("text-xl font-extrabold tabular-nums", low ? "text-amber-900" : "text-ink")}>{units} {t.interactiveDemo.admin.units}</p>
                    <div className={cn("mt-2 h-1.5 w-full overflow-hidden rounded-full", low ? "bg-amber-200" : "bg-slate-200")}>
                      <div className={cn("h-full", low ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, units)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 03: COMMERCE BACKEND & EVENT ARCHITECTURE DEMO
           ========================================================================= */}
        {activeTab === "backend" && (
          <div className="rounded-[28px] border border-white/10 bg-[#0F101A] p-5 text-white shadow-[0_40px_90px_-50px_rgba(17,18,24,0.6)] sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <p className="text-xs font-bold text-[#60A5FA] tracking-wide uppercase">
                  {t.interactiveDemo.backend.singleSource}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                  {t.interactiveDemo.backend.architectureTitle}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-white/80">{t.interactiveDemo.backend.telemetry}</span>
              </div>
            </div>

            {/* Architecture Steps Selector */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { step: 1, label: t.interactiveDemo.backend.step1, sub: t.interactiveDemo.backend.step1Sub },
                { step: 2, label: t.interactiveDemo.backend.step2, sub: t.interactiveDemo.backend.step2Sub },
                { step: 3, label: t.interactiveDemo.backend.step3, sub: t.interactiveDemo.backend.step3Sub },
                { step: 4, label: t.interactiveDemo.backend.step4, sub: t.interactiveDemo.backend.step4Sub },
                { step: 5, label: t.interactiveDemo.backend.step5, sub: t.interactiveDemo.backend.step5Sub },
              ].map((item) => (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setBackendStep(item.step)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    backendStep === item.step
                      ? "border-[#0054F9] bg-[#0054F9]/20 ring-2 ring-[#0054F9]/40"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="text-xs font-bold text-white">{item.label}</p>
                  <p className="text-[10px] text-white/60 font-mono mt-0.5">{item.sub}</p>
                </button>
              ))}
            </div>

            {/* Step Visualizer Card with Terminal Header & Copy Action */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#090A10] p-5 sm:p-6 font-mono text-xs shadow-inner">
              {backendStep === 1 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-[#60A5FA] mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <Lock className="size-4" />
                      <span>{t.interactiveDemo.backend.step1}: {t.interactiveDemo.backend.step1Sub}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">Held 30 min (configurable)</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            1,
                            `// At checkout: take the stock only if enough is free, in one atomic update.\nconst held = await ProductVariant.findOneAndUpdate(\n  { sku: "${sampleSku}", $expr: { $gte: [{ $subtract: ["$stock", "$reservedStock"] }, 2] } },\n  [{ $set: { reservedStock: { $add: ["$reservedStock", 2] } } }]\n);\nif (!held) throw AppError.conflict("Only a few left");\n\nawait StockReservation.create({ refId: "${sampleOrderId}", quantity: 2, status: "HELD", expiresAt: in30Minutes });\n// Unpaid? The scheduler releases the hold when it expires.`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 1 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.interactiveDemo.backend.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>{t.interactiveDemo.backend.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// At checkout: take the stock only if enough is free, in one atomic update."}</span>
                      {"\n"}
                      <span className="text-sky-300 font-bold">const</span> held = <span className="text-sky-300 font-bold">await</span> ProductVariant.<span className="text-yellow-200">findOneAndUpdate</span>(
                      {"\n"}  {"{"} sku: <span className="text-emerald-300">&quot;{sampleSku}&quot;</span>, $expr: {"{"} $gte: [{"{"} $subtract: [<span className="text-emerald-300">&quot;$stock&quot;</span>, <span className="text-emerald-300">&quot;$reservedStock&quot;</span>] {"}"}, <span className="text-amber-300">2</span>] {"}"} {"}"},
                      {"\n"}  [{"{"} $set: {"{"} reservedStock: {"{"} $add: [<span className="text-emerald-300">&quot;$reservedStock&quot;</span>, <span className="text-amber-300">2</span>] {"}"} {"}"} {"}"}]
                      {"\n"});
                      {"\n"}<span className="text-sky-300 font-bold">if</span> (!held) <span className="text-sky-300 font-bold">throw</span> AppError.<span className="text-yellow-200">conflict</span>(<span className="text-emerald-300">&quot;Only a few left&quot;</span>);
                      {"\n"}
                      {"\n"}<span className="text-sky-300 font-bold">await</span> StockReservation.<span className="text-yellow-200">create</span>({"{"} refId: <span className="text-emerald-300">&quot;{sampleOrderId}&quot;</span>, quantity: <span className="text-amber-300">2</span>, status: <span className="text-emerald-300">&quot;HELD&quot;</span>, expiresAt: in30Minutes {"}"});
                      {"\n"}
                      <span className="text-slate-400 italic">{"// Unpaid? The scheduler releases the hold when it expires, so nothing is oversold."}</span>
                    </code>
                  </pre>
                </div>
              )}

              {backendStep === 2 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-emerald-400 mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <ShieldCheck className="size-4" />
                      <span>{t.interactiveDemo.backend.step2}: {t.interactiveDemo.backend.step2Sub}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">HMAC-SHA256</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            2,
                            `// The secret is read from the encrypted integrations store, not an env var.\nconst expectedSignature = crypto.createHmac("sha256", razorpay.webhookSecret).update(rawBody).digest("hex");\nif (expectedSignature === req.headers["x-razorpay-signature"]) {\n  await orderService.transitionOrder("${sampleOrderId}", "CONFIRMED");\n}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 2 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.interactiveDemo.backend.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>{t.interactiveDemo.backend.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// Webhook endpoint verifies authentic gateway payload:"}</span>
                      {"\n"}
                      <span className="text-sky-300 font-bold">const</span> expectedSignature = crypto
                      {"\n"}  .<span className="text-yellow-200">createHmac</span>(<span className="text-emerald-300">&quot;sha256&quot;</span>, razorpay.webhookSecret) <span className="text-slate-400 italic">{"// from the encrypted integrations store"}</span>
                      {"\n"}  .<span className="text-yellow-200">update</span>(rawBody)
                      {"\n"}  .<span className="text-yellow-200">digest</span>(<span className="text-emerald-300">&quot;hex&quot;</span>);
                      {"\n\n"}
                      <span className="text-sky-300 font-bold">if</span> (expectedSignature === req.headers[<span className="text-emerald-300">&quot;x-razorpay-signature&quot;</span>]) {"{"}
                      {"\n"}  <span className="text-sky-300 font-bold">await</span> orderService.<span className="text-yellow-200">transitionOrder</span>(<span className="text-emerald-300">&quot;{sampleOrderId}&quot;</span>, <span className="text-emerald-300">&quot;CONFIRMED&quot;</span>);
                      {"\n"}{"}"}
                    </code>
                  </pre>
                </div>
              )}

              {backendStep === 3 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-amber-400 mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <Cpu className="size-4" />
                      <span>{t.interactiveDemo.backend.step3}: {t.interactiveDemo.backend.step3Sub}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">order.constant.ts</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            3,
                            `ORDER_STATUS_TRANSITIONS = {\n  PENDING_PAYMENT: ["CONFIRMED", "CANCELLED", "FAILED"],\n  CONFIRMED: ["PROCESSING", "PACKED", "CANCELLED"],\n  PACKED: ["SHIPPED", "CANCELLED"],\n  SHIPPED: ["OUT_FOR_DELIVERY", "DELIVERED", "RTO"],\n  DELIVERED: ["RETURN_REQUESTED"],\n  // …\n};`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 3 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.interactiveDemo.backend.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>{t.interactiveDemo.backend.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// State transitions are locked to backend constants:"}</span>
                      {"\n"}
                      <span className="text-purple-300 font-bold">ORDER_STATUS_TRANSITIONS</span> = {"{"}
                      {"\n"}  <span className="text-sky-300">PENDING_PAYMENT</span>: [<span className="text-emerald-300">&quot;CONFIRMED&quot;</span>, <span className="text-emerald-300">&quot;CANCELLED&quot;</span>, <span className="text-emerald-300">&quot;FAILED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">CONFIRMED</span>: [<span className="text-emerald-300">&quot;PROCESSING&quot;</span>, <span className="text-emerald-300">&quot;PACKED&quot;</span>, <span className="text-emerald-300">&quot;CANCELLED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">PACKED</span>: [<span className="text-emerald-300">&quot;SHIPPED&quot;</span>, <span className="text-emerald-300">&quot;CANCELLED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">SHIPPED</span>: [<span className="text-emerald-300">&quot;OUT_FOR_DELIVERY&quot;</span>, <span className="text-emerald-300">&quot;DELIVERED&quot;</span>, <span className="text-emerald-300">&quot;RTO&quot;</span>],
                      {"\n"}  <span className="text-sky-300">DELIVERED</span>: [<span className="text-emerald-300">&quot;RETURN_REQUESTED&quot;</span>],
                      {"\n"}  <span className="text-slate-400 italic">{"// …"}</span>
                      {"\n"}{"}"}; <span className="text-slate-400 italic">{"// Guarantees admin and storefront cannot invent invalid states."}</span>
                    </code>
                  </pre>
                </div>
              )}

              {backendStep === 4 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-indigo-400 mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <Truck className="size-4" />
                      <span>{t.interactiveDemo.backend.step4}: {t.interactiveDemo.backend.step4Sub}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">POST /cmu/push/json</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            4,
                            `const waybillResponse = await delhiveryClient.createShipment({\n  waybill: "DL9482103982",\n  pickup_location: "Main_Warehouse",\n  consignee: "${sampleOrder?.customer ?? "Customer"}",\n  pincode: 400053,\n  weight: 430,\n  payment_mode: "Pre-paid"\n});`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 4 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.interactiveDemo.backend.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>{t.interactiveDemo.backend.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// Book the shipment through Delhivery's create-order API:"}</span>
                      {"\n"}
                      <span className="text-sky-300 font-bold">const</span> waybillResponse = <span className="text-sky-300 font-bold">await</span> delhiveryClient.<span className="text-yellow-200">createShipment</span>({"{"}
                      {"\n"}  waybill: <span className="text-emerald-300">&quot;DL9482103982&quot;</span>,
                      {"\n"}  pickup_location: <span className="text-emerald-300">&quot;Main_Warehouse&quot;</span>,
                      {"\n"}  consignee: <span className="text-emerald-300">&quot;{sampleOrder?.customer ?? "Customer"}&quot;</span>,
                      {"\n"}  pincode: <span className="text-amber-300">400053</span>,
                      {"\n"}  weight: <span className="text-amber-300">430</span>, <span className="text-slate-400 italic">{"// Grams"}</span>
                      {"\n"}  payment_mode: <span className="text-emerald-300">&quot;Pre-paid&quot;</span>
                      {"\n"}{"}"});
                    </code>
                  </pre>
                </div>
              )}

              {backendStep === 5 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-[#60A5FA] mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <Zap className="size-4" />
                      <span>{t.interactiveDemo.backend.step5}: {t.interactiveDemo.backend.step5Sub}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">Redis Pub/Sub Adapter</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            5,
                            `// To the customer's order page and the staff panel at once:\nrealtime.emitOrderUpdate("${sampleOrderId}", { status: "SHIPPED" });\n// A thin payload: each screen re-reads the order over REST.`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 5 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.interactiveDemo.backend.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>{t.interactiveDemo.backend.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// To the customer's order page and the staff panel at once:"}</span>
                      {"\n"}
                      realtime.<span className="text-yellow-200">emitOrderUpdate</span>(<span className="text-emerald-300">&quot;{sampleOrderId}&quot;</span>, {"{"} status: <span className="text-emerald-300">&quot;SHIPPED&quot;</span> {"}"});
                      {"\n"}<span className="text-slate-400 italic">{"// A thin payload: each screen re-reads the order over REST, so nobody reloads the page."}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Architecture Explanatory Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>{t.interactiveDemo.backend.footer}</span>
              <span className="text-emerald-400 font-semibold">{t.interactiveDemo.backend.selfHosted}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
