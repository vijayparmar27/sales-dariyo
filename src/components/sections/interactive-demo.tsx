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
import { useState } from "react";

import { CardamomJarSvg, CocoaTinSvg, CoffeePouchSvg } from "@/components/demo/north-nourish-assets";
import { DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { demoAddress } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  DEMO_BRAND,
  DEMO_PRODUCTS,
  DEMO_RECENT_ORDERS,
  type DemoProduct,
} from "@/data/demo-store";
import { rupees } from "@/lib/format";

type DemoTab = "storefront" | "admin" | "backend";

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("storefront");

  // Storefront Interactive State
  const [selectedProductId, setSelectedProductId] = useState<string>("coorg-arabica");
  const [selectedPackId, setSelectedPackId] = useState<string>("250g");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<{ productId: string; packId: string; qty: number }[]>([
    { productId: "coorg-arabica", packId: "250g", qty: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [pincode, setPincode] = useState("560001");
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Promo code & free shipping threshold
  const [promoInput, setPromoInput] = useState("FIRST10");
  const [appliedPromo, setAppliedPromo] = useState<string | null>("FIRST10");
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  // Admin Interactive State
  const [orders, setOrders] = useState(DEMO_RECENT_ORDERS);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  // Backend Interactive State
  const [backendStep, setBackendStep] = useState<number>(1);

  const fallbackProduct = DEMO_PRODUCTS[0]!;
  const selectedProduct: DemoProduct =
    DEMO_PRODUCTS.find((p) => p.id === selectedProductId) ?? fallbackProduct;
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
    setDispatchToast(`Order ${orderId} dispatched! Delhivery pickup scheduled.`);
    setTimeout(() => setDispatchToast(null), 4000);
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const prod = DEMO_PRODUCTS.find((p) => p.id === item.productId);
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
          eyebrow="Live demo"
          title={
            <>
              Experience the software{" "}
              <span className="italic text-muted">in action.</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          The shop, the admin panel and the backend, working as one. Shown here for North &amp;
          Nourish, a fictional brand, so you can picture your own.
        </SectionHeading>

        <SegmentedTabs
          label="Demo view"
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { value: "storefront", label: "Customer storefront", short: "Storefront", icon: Store },
            { value: "admin", label: "Admin console", short: "Admin", icon: LayoutDashboard },
            { value: "backend", label: "Commerce backend", short: "Backend", icon: Server },
          ]}
        />

        {/* =========================================================================
            TAB 01: CUSTOMER STOREFRONT (NORTH & NOURISH LUXURY D2C DEMO)
           ========================================================================= */}
        {activeTab === "storefront" && (
          <div className="rounded-[28px] border border-[#EAE5D9] bg-[#FAF9F5] p-3 shadow-[0_40px_90px_-50px_rgba(30,58,47,0.4)] sm:p-8">
            {/* Browser Frame Navigation Header */}
            <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-[#EAE5D9] bg-white p-3 shadow-xs sm:p-3.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="hidden size-3 shrink-0 rounded-full bg-rose-400 sm:block" />
                <span className="hidden size-3 shrink-0 rounded-full bg-amber-400 sm:block" />
                <span className="hidden size-3 shrink-0 rounded-full bg-emerald-400 sm:block" />
                <div className="flex min-w-0 items-center gap-2 rounded-full border border-[#EAE5D9] bg-[#FAF9F5] px-3 py-1 text-xs text-[#1E3A2F] sm:ml-3 sm:px-4">
                  <Lock className="size-3 shrink-0 text-emerald-600" />
                  <span className="truncate font-mono text-[11px] font-semibold">
                    {demoAddress()}
                  </span>
                </div>
              </div>

              {/* Fictional Brand Logo & Cart Button */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-wider text-[#1E3A2F] uppercase hidden md:inline">
                  {DEMO_BRAND.name} · {DEMO_BRAND.tagline}
                </span>

                <button
                  type="button"
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] text-white px-4 py-1.5 text-xs font-bold hover:bg-[#13271F] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="size-3.5" />
                  <span>Bag</span>
                  <span className="size-5 rounded-full bg-[#C87D4B] text-white text-[10px] flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Storefront Grid: Product Selector + Detailed Product Card */}
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Product Selector Carousel/List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] mb-3">
                  Sample Product Family
                </p>
                {DEMO_PRODUCTS.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setSelectedPackId(prod.packSizes[0]?.id ?? "250g");
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#1E3A2F] bg-white shadow-md ring-2 ring-[#1E3A2F]/20"
                          : "border-[#EAE5D9] bg-white/70 hover:bg-white hover:border-[#1E3A2F]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#C87D4B] uppercase tracking-wider">
                            {prod.categoryLabel}
                          </span>
                          <h4 className="text-sm font-bold text-[#1E3A2F]">{prod.name}</h4>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">{prod.tagline}</p>
                        </div>
                        <span className="text-xs font-extrabold text-[#1E3A2F] tabular-nums whitespace-nowrap">
                          from {rupees(prod.packSizes[0]?.price ?? 0)}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Brand Customization Banner Note */}
                <div className="rounded-2xl border border-[#EAE5D9] bg-[#EAE5D9]/40 p-4 text-xs text-[#1E3A2F]">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-[#C87D4B]" />
                    <span>Your brand, not a template</span>
                  </p>
                  <p className="mt-1 text-muted text-[11px] leading-relaxed">
                    Notice how this demo uses warm cream, forest green, and copper typography—demonstrating that your store does not look like a cookie-cutter template.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Product Card & Pack Selector (8 cols) */}
              <div className="lg:col-span-8 rounded-3xl border border-[#EAE5D9] bg-white p-6 sm:p-8 shadow-sm">
                <div className="grid gap-8 md:grid-cols-12 items-center">
                  {/* Left: Product Artwork Visual (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE5D9] relative group">
                    <div className="w-full max-w-[220px] transition-transform duration-500 group-hover:scale-105">
                      {selectedProduct.category === "coffee" && <CoffeePouchSvg />}
                      {selectedProduct.category === "spices" && <CardamomJarSvg />}
                      {(selectedProduct.category === "cocoa" || selectedProduct.category === "gift-boxes") && (
                        <CocoaTinSvg />
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[#1E3A2F] bg-white border border-[#EAE5D9] px-3 py-1 rounded-full shadow-2xs">
                      <span>Provenance: {selectedProduct.origin}</span>
                    </div>
                  </div>

                  {/* Right: Buying Details & Pack Size Selection (7 cols) */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          {selectedProduct.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span>{selectedProduct.rating}</span>
                          <span className="text-muted font-normal">
                            ({selectedProduct.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1E3A2F]">
                        {selectedProduct.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Tasting / Flavor Profile Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-md bg-[#FAF9F5] text-[#1E3A2F] border border-[#EAE5D9] px-2.5 py-1 text-[11px] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Pack Size Variants Selector (Load-bearing CPG Feature) */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#1E3A2F] mb-2">
                        <span>Select Packaging Size:</span>
                        <span className="text-[#C87D4B] font-semibold text-[11px]">
                          SKU: {selectedPack.sku}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {selectedProduct.packSizes.map((pack) => {
                          const isPackSelected = pack.id === selectedPackId;
                          return (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() => setSelectedPackId(pack.id)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                isPackSelected
                                  ? "border-[#1E3A2F] bg-[#1E3A2F] text-white shadow-sm"
                                  : "border-[#EAE5D9] bg-[#FAF9F5] text-[#1E3A2F] hover:bg-white"
                              }`}
                            >
                              <span className="text-xs font-bold">{pack.label}</span>
                              <span
                                className={`text-[11px] font-extrabold mt-1 tabular-nums ${
                                  isPackSelected ? "text-[#E29D62]" : "text-[#1E3A2F]"
                                }`}
                              >
                                {rupees(pack.price)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price, Quantity & Add to Cart Action */}
                    <div className="border-t border-[#EAE5D9] pt-5">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-extrabold text-[#1E3A2F] tabular-nums">
                          {rupees(selectedPack.price * quantity)}
                        </span>
                        {selectedPack.compareAtPrice ? (
                          <span className="text-xs text-muted line-through tabular-nums">
                            {rupees(selectedPack.compareAtPrice * quantity)}
                          </span>
                        ) : null}
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                          In Stock ({selectedPack.stock} units)
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Qty Selector */}
                        <div className="inline-flex items-center rounded-full border border-[#EAE5D9] bg-[#FAF9F5] p-1 text-xs">
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
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1E3A2F] px-4 py-3 text-sm font-bold whitespace-nowrap text-white shadow-md transition-all hover:bg-[#13271F] active:scale-98 sm:px-6"
                        >
                          <ShoppingBag className="size-4 shrink-0" />
                          <span>Add to Bag</span>
                          <span className="hidden sm:inline">· {rupees(selectedPack.price * quantity)}</span>
                        </button>
                      </div>

                      {/* Delhivery Pincode Checker Simulation */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#EAE5D9]/70 pt-3 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          <Truck className="size-3.5 text-emerald-600" />
                          <span>Delhivery Express Delivery:</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-16 rounded border border-[#EAE5D9] px-1.5 py-0.5 text-xs font-mono text-[#1E3A2F]"
                          />
                          <button
                            type="button"
                            onClick={() => setPincodeChecked(true)}
                            className="text-[11px] font-bold text-[#1E3A2F] hover:underline"
                          >
                            Check
                          </button>
                          {pincodeChecked && (
                            <span className="text-emerald-700 font-semibold text-[11px]">
                              ✓ 2–3 Days
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Embedded Mini Cart Slideout */}
                {cartOpen && (
                  <div className="mt-6 border-t border-[#EAE5D9] pt-6 bg-[#FAF9F5] p-5 rounded-2xl border animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="size-4 text-[#1E3A2F]" />
                        <h4 className="text-sm font-bold text-[#1E3A2F]">
                          Your Shopping Bag ({cartItemCount} items)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCartOpen(false)}
                        className="text-xs font-semibold text-muted hover:text-[#1E3A2F] cursor-pointer"
                      >
                        Hide Bag ✕
                      </button>
                    </div>

                    {/* Free Shipping Progress Indicator */}
                    <div className="rounded-xl border border-[#EAE5D9] bg-white p-3 mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[#1E3A2F] flex items-center gap-1.5">
                          <Truck className="size-3.5 text-emerald-600" />
                          {freeShippingDiff === 0 ? (
                            <span className="text-emerald-700 font-extrabold">🎉 Free Delhivery Express Unlocked!</span>
                          ) : (
                            <span>
                              Add <strong className="text-[#1E3A2F]">{rupees(freeShippingDiff)}</strong> for Free Express Delivery
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-[10px] text-muted">{freeShippingProgress}%</span>
                      </div>
                      <div className="w-full bg-[#EAE5D9] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="divide-y divide-[#EAE5D9] mb-4">
                      {cartItems.map((item, index) => {
                        const prod = DEMO_PRODUCTS.find((p) => p.id === item.productId);
                        const pack = prod?.packSizes.find((p) => p.id === item.packId);
                        return (
                          <div key={index} className="py-2.5 flex items-center justify-between text-xs">
                            <div>
                              <p className="font-bold text-[#1E3A2F]">{prod?.name}</p>
                              <p className="text-muted text-[11px]">
                                {pack?.label} · Qty {item.qty}
                              </p>
                            </div>
                            <span className="font-bold text-[#1E3A2F] tabular-nums">
                              {rupees((pack?.price ?? 0) * item.qty)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Promo Code Box */}
                    <div className="rounded-xl border border-[#EAE5D9] bg-white p-2.5 mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="size-3.5 text-[#C87D4B] shrink-0" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder="Coupon code (try FIRST10)"
                          className="flex-1 text-xs font-mono font-bold uppercase bg-transparent outline-none text-[#1E3A2F] placeholder:text-muted/60"
                        />
                        {appliedPromo ? (
                          <button
                            type="button"
                            onClick={() => setAppliedPromo(null)}
                            className="text-[11px] font-bold text-red-600 hover:underline px-2 cursor-pointer"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (promoInput.trim() === "FIRST10") {
                                setAppliedPromo("FIRST10");
                              }
                            }}
                            className="text-[11px] font-bold text-[#1E3A2F] hover:bg-[#FAF9F5] border border-[#EAE5D9] rounded-md px-2 py-0.5 cursor-pointer"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      {appliedPromo && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                          ✓ Coupon &quot;{appliedPromo}&quot; applied: 10% welcome discount.
                        </p>
                      )}
                    </div>

                    {/* Totals Breakdown */}
                    <div className="space-y-1.5 border-t border-[#EAE5D9] pt-3 text-xs">
                      <div className="flex items-center justify-between text-muted">
                        <span>Items Subtotal:</span>
                        <span className="tabular-nums font-semibold text-[#1E3A2F]">{rupees(cartTotal)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex items-center justify-between text-emerald-700 font-semibold">
                          <span>Coupon Discount (10%):</span>
                          <span className="tabular-nums font-bold">− {rupees(promoDiscount)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-muted">
                        <span>Delhivery Shipping:</span>
                        <span className="font-semibold text-emerald-700">
                          {freeShippingDiff === 0 ? "FREE" : "₹60 (Orders < ₹999)"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-[#1E3A2F] text-sm pt-2 border-t border-[#EAE5D9]/80">
                        <span>Final Total:</span>
                        <span className="font-extrabold tabular-nums text-base">
                          {rupees(netCartTotal + (freeShippingDiff === 0 ? 0 : 60))}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-[11px] text-muted">
                        <span>Razorpay UPI, RuPay &amp; COD Supported</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("admin");
                          setCartOpen(false);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0054F9] text-white px-4 py-2 text-xs font-bold hover:bg-[#0045D8] transition-colors cursor-pointer"
                      >
                        <span>Inspect in Operator Admin</span>
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
                    Operator Console · Connected to MongoDB Atlas &amp; Redis
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-ink mt-1">
                  Orders &amp; Warehouse Dispatch Center
                </h3>
              </div>

              {/* Status Counters */}
              <div className="flex items-center gap-3 text-xs">
                <div className="rounded-xl border border-line bg-sunken px-3 py-1.5 font-medium">
                  <span className="text-muted">Bangalore Stock:</span>{" "}
                  <strong className="text-ink">132 units</strong>
                </div>
                <div className="rounded-xl border border-line bg-sunken px-3 py-1.5 font-medium">
                  <span className="text-muted">Mumbai Port Stock:</span>{" "}
                  <strong className="text-ink">143 units</strong>
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            {dispatchToast && (
              <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center justify-between animate-fade-in">
                <span className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  {dispatchToast}
                </span>
                <span className="text-emerald-600 text-[11px]">Syncing to Delhivery API...</span>
              </div>
            )}

            {/* Active Orders Data Table */}
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-line bg-sunken/60 text-muted uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID &amp; Time</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Ordered Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Dispatch Action</th>
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
                          {rupees(order.total)}
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
                              <Check className="size-3.5" /> Booked
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleDispatchOrder(order.id)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#111218] text-white px-3 py-1.5 text-[11px] font-bold hover:bg-black transition-colors cursor-pointer"
                            >
                              <Truck className="size-3" />
                              <span>1-Click Delhivery</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Warehouse Stock Alert Bar */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-sunken/40 p-4">
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>Coorg Arabica 250g Pouch</span>
                  <span className="text-emerald-600 font-bold">Healthy Stock</span>
                </div>
                <p className="text-xl font-extrabold text-ink tabular-nums">84 units</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[80%]" />
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
                  <span>Kerala Cardamom 250g Pouch</span>
                  <span className="text-amber-700 font-bold">Reorder Alert</span>
                </div>
                <p className="text-xl font-extrabold text-amber-900 tabular-nums">18 units</p>
                <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[25%]" />
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-sunken/40 p-4">
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>Malabar Cocoa 200g Tin</span>
                  <span className="text-emerald-600 font-bold">Healthy Stock</span>
                </div>
                <p className="text-xl font-extrabold text-ink tabular-nums">45 units</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[60%]" />
                </div>
              </div>
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
                  Centralized Truth Authority · Node.js 16 + Express 5
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                  End-to-End Order Event Architecture
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-white/80">Socket.IO Live Telemetry</span>
              </div>
            </div>

            {/* Architecture Steps Selector */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { step: 1, label: "01. Cart Reservation", sub: "Redis TTL Lock" },
                { step: 2, label: "02. Payment Webhook", sub: "Razorpay HMAC" },
                { step: 3, label: "03. Status State Machine", sub: "Single Authority" },
                { step: 4, label: "04. Courier Manifest", sub: "Delhivery AWB" },
                { step: 5, label: "05. Live Sync", sub: "Socket.IO Broadcast" },
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
                      <span>STEP 1: Atomic Inventory Lock in Redis</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">TTL: 900 seconds</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            1,
                            `await redis.set("stock_lock:coorg-arabica:250g", JSON.stringify({ orderId: "ORD-9281", qty: 2, expiresAt: Date.now() + 900000 }), "EX", 900);`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 1 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// When shopper initiates checkout on storefront:"}</span>
                      {"\n"}
                      <span className="text-sky-300 font-bold">await</span> redis.<span className="text-yellow-200">set</span>(
                      {"\n"}  <span className="text-emerald-300">&quot;stock_lock:coorg-arabica:250g&quot;</span>,
                      {"\n"}  JSON.<span className="text-yellow-200">stringify</span>({"{"} orderId: <span className="text-emerald-300">&quot;ORD-9281&quot;</span>, qty: <span className="text-amber-300">2</span>, expiresAt: Date.<span className="text-yellow-200">now</span>() + <span className="text-amber-300">900000</span> {"}"}),
                      {"\n"}  <span className="text-emerald-300">&quot;EX&quot;</span>,
                      {"\n"}  <span className="text-amber-300">900</span> <span className="text-slate-400 italic">{"// Auto-expires if unpaid"}</span>
                      {"\n"});
                      {"\n"}
                      <span className="text-slate-400 italic">{"// Prevents flash-sale race conditions and dual-order overselling."}</span>
                    </code>
                  </pre>
                </div>
              )}

              {backendStep === 2 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between text-emerald-400 mb-4 gap-2 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-2 font-bold">
                      <ShieldCheck className="size-4" />
                      <span>STEP 2: Razorpay Payment Signature Verification</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">HMAC-SHA256</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            2,
                            `const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex");\nif (expectedSignature === req.headers["x-razorpay-signature"]) {\n  await orderService.transitionOrder("ORD-9281", "CONFIRMED");\n}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 2 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>Copy</span>
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
                      {"\n"}  .<span className="text-yellow-200">createHmac</span>(<span className="text-emerald-300">&quot;sha256&quot;</span>, process.env.RAZORPAY_WEBHOOK_SECRET)
                      {"\n"}  .<span className="text-yellow-200">update</span>(rawBody)
                      {"\n"}  .<span className="text-yellow-200">digest</span>(<span className="text-emerald-300">&quot;hex&quot;</span>);
                      {"\n\n"}
                      <span className="text-sky-300 font-bold">if</span> (expectedSignature === req.headers[<span className="text-emerald-300">&quot;x-razorpay-signature&quot;</span>]) {"{"}
                      {"\n"}  <span className="text-sky-300 font-bold">await</span> orderService.<span className="text-yellow-200">transitionOrder</span>(<span className="text-emerald-300">&quot;ORD-9281&quot;</span>, <span className="text-emerald-300">&quot;CONFIRMED&quot;</span>);
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
                      <span>STEP 3: Strict Status State Machine</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">order.constant.ts</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            3,
                            `ORDER_STATUS_TRANSITIONS = {\n  PLACED: ["CONFIRMED", "CANCELLED"],\n  CONFIRMED: ["PACKED", "CANCELLED"],\n  PACKED: ["DISPATCHED"],\n  DISPATCHED: ["DELIVERED", "RTO_INITIATED"],\n  DELIVERED: ["RETURN_REQUESTED"]\n};`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 3 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>Copy</span>
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
                      {"\n"}  <span className="text-sky-300">PLACED</span>: [<span className="text-emerald-300">&quot;CONFIRMED&quot;</span>, <span className="text-emerald-300">&quot;CANCELLED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">CONFIRMED</span>: [<span className="text-emerald-300">&quot;PACKED&quot;</span>, <span className="text-emerald-300">&quot;CANCELLED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">PACKED</span>: [<span className="text-emerald-300">&quot;DISPATCHED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">DISPATCHED</span>: [<span className="text-emerald-300">&quot;DELIVERED&quot;</span>, <span className="text-emerald-300">&quot;RTO_INITIATED&quot;</span>],
                      {"\n"}  <span className="text-sky-300">DELIVERED</span>: [<span className="text-emerald-300">&quot;RETURN_REQUESTED&quot;</span>]
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
                      <span>STEP 4: Native Delhivery Carrier Booking</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">POST /cmu/push/json</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            4,
                            `const waybillResponse = await delhiveryClient.createShipment({\n  waybill: "DL9482103982",\n  pickup_location: "Bangalore_Central_Hub",\n  consignee: "Devika Narayanan",\n  pincode: 560001,\n  weight: 600,\n  payment_mode: "Pre-paid"\n});`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 4 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// Courier manifest generated with volumetric weight:"}</span>
                      {"\n"}
                      <span className="text-sky-300 font-bold">const</span> waybillResponse = <span className="text-sky-300 font-bold">await</span> delhiveryClient.<span className="text-yellow-200">createShipment</span>({"{"}
                      {"\n"}  waybill: <span className="text-emerald-300">&quot;DL9482103982&quot;</span>,
                      {"\n"}  pickup_location: <span className="text-emerald-300">&quot;Bangalore_Central_Hub&quot;</span>,
                      {"\n"}  consignee: <span className="text-emerald-300">&quot;Devika Narayanan&quot;</span>,
                      {"\n"}  pincode: <span className="text-amber-300">560001</span>,
                      {"\n"}  weight: <span className="text-amber-300">600</span>, <span className="text-slate-400 italic">{"// Grams"}</span>
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
                      <span>STEP 5: Real-time Socket.IO Broadcast</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[11px]">Redis Pub/Sub Adapter</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            5,
                            `realtime.emitToStaff("order:status_change", {\n  orderId: "ORD-9281",\n  newStatus: "DISPATCHED",\n  awb: "DL9482103982",\n  timestamp: new Date().toISOString()\n});`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                      >
                        {copiedStep === 5 ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-white/70" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed text-xs">
                    <code className="text-slate-300">
                      <span className="text-slate-400 italic">{"// Instant push event to operator panels and live customer tracker:"}</span>
                      {"\n"}
                      realtime.<span className="text-yellow-200">emitToStaff</span>(<span className="text-emerald-300">&quot;order:status_change&quot;</span>, {"{"}
                      {"\n"}  orderId: <span className="text-emerald-300">&quot;ORD-9281&quot;</span>,
                      {"\n"}  newStatus: <span className="text-emerald-300">&quot;DISPATCHED&quot;</span>,
                      {"\n"}  awb: <span className="text-emerald-300">&quot;DL9482103982&quot;</span>,
                      {"\n"}  timestamp: <span className="text-sky-300 font-bold">new</span> <span className="text-yellow-200">Date</span>().<span className="text-yellow-200">toISOString</span>()
                      {"\n"}{"}"}); <span className="text-slate-400 italic">{"// No manual browser page reloads required."}</span>
                    </code>
                  </pre>
                </div>
              )}
            </div>

            {/* Architecture Explanatory Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>All backend code written in strict TypeScript with zero GMV tracking.</span>
              <span className="text-emerald-400 font-semibold">Self-Hosted Cloud Ready</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
