"use client";

import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  KeyRound,
  Package,
  Printer,
  Shield,
  TrendingUp,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { DEMO_FRAME, SectionHeading, SegmentedTabs } from "@/components/ui";
import { cn } from "@/lib/cn";
import { rupees } from "@/lib/format";

type AdminTab = "orders" | "inventory" | "wholesale" | "roles";
type OrderStatusFilter = "ALL" | "CONFIRMED" | "PACKED" | "DISPATCHED";

interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  city: string;
  pincode: string;
  items: { name: string; sku: string; pack: string; qty: number; price: number }[];
  carrier: string;
  awb: string;
  amount: number;
  subtotal: number;
  gstAmount: number;
  shipping: number;
  status: "CONFIRMED" | "PACKED" | "DISPATCHED";
  paymentMode: string;
  weightGrams: number;
  placedTime: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "#NN-4921",
    customer: "Aanya Mehra",
    phone: "+91 98450 12890",
    city: "Bengaluru, KA",
    pincode: "560038",
    items: [
      { name: "Single-Origin Coorg Arabica", sku: "NN-COF-250", pack: "250g Whole Bean", qty: 2, price: 680 },
      { name: "Wild Kerala Cardamom", sku: "NN-SP-100", pack: "100g Pods", qty: 1, price: 420 },
    ],
    carrier: "Delhivery Surface",
    awb: "DL9481029482",
    amount: 1780,
    subtotal: 1508,
    gstAmount: 272,
    shipping: 0,
    status: "DISPATCHED",
    paymentMode: "Pre-paid (Razorpay UPI)",
    weightGrams: 600,
    placedTime: "Today, 11:24 AM",
  },
  {
    id: "#NN-4920",
    customer: "Kavita Swaminathan",
    phone: "+91 94441 58291",
    city: "Chennai, TN",
    pincode: "600028",
    items: [
      { name: "Single-Origin Coorg Arabica", sku: "NN-COF-1000", pack: "1kg Whole Bean", qty: 1, price: 2150 },
      { name: "Single-Estate Malabar Cocoa", sku: "NN-COC-200", pack: "200g Tin", qty: 1, price: 440 },
    ],
    carrier: "Delhivery Express Air",
    awb: "DL9481029481",
    amount: 2590,
    subtotal: 2195,
    gstAmount: 395,
    shipping: 0,
    status: "PACKED",
    paymentMode: "Pre-paid (Net Banking)",
    weightGrams: 1200,
    placedTime: "Today, 12:45 PM",
  },
  {
    id: "#NN-4919",
    customer: "Tarun Kapoor",
    phone: "+91 98200 44912",
    city: "Mumbai, MH",
    pincode: "400050",
    items: [
      { name: "Single-Origin Coorg Arabica", sku: "NN-COF-250", pack: "250g French Press", qty: 1, price: 680 },
      { name: "Wild Kerala Cardamom", sku: "NN-SP-50", pack: "50g Pods", qty: 1, price: 210 },
    ],
    carrier: "Delhivery Surface",
    awb: "Not booked yet",
    amount: 890,
    subtotal: 754,
    gstAmount: 136,
    shipping: 0,
    status: "CONFIRMED",
    paymentMode: "Cash on Delivery (COD)",
    weightGrams: 300,
    placedTime: "Today, 01:10 PM",
  },
  {
    id: "#NN-4918",
    customer: "Rohan Singhania",
    phone: "+91 98110 93410",
    city: "New Delhi, DL",
    pincode: "110021",
    items: [
      { name: "The Reserve Providore Sampler Box", sku: "NN-SAM-01", pack: "Limited Edition", qty: 1, price: 3450 },
    ],
    carrier: "Delhivery Express Air",
    awb: "Not booked yet",
    amount: 3450,
    subtotal: 2924,
    gstAmount: 526,
    shipping: 0,
    status: "CONFIRMED",
    paymentMode: "Pre-paid (Razorpay Cards)",
    weightGrams: 1500,
    placedTime: "Today, 02:18 PM",
  },
];

export function AdminShowcase() {
  const [activeTab, setActiveTab] = useState<AdminTab>("orders");
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stock: one count per pack, shared by the shop and wholesale. (This tab
  // used to show stock split across two warehouses; the platform keeps one
  // count per pack, and its warehouses are pickup addresses for the courier.)
  const [stockQuantities, setStockQuantities] = useState({
    arabica250: 84,
    arabica1kg: 28,
    cardamom: 18,
    cocoa200: 45,
    sampler: 24,
  });

  // Wholesale deal interactive margin discount
  const [wholesaleDiscount, setWholesaleDiscount] = useState<number>(30); // 30% discount
  const [dealApproved, setDealApproved] = useState(false);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "ALL") return true;
    return o.status === statusFilter;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          if (o.status === "CONFIRMED") {
            const updated = {
              ...o,
              status: "PACKED" as const,
              awb: "DL" + Math.floor(9000000000 + Math.random() * 999999999),
            };
            if (selectedOrder?.id === orderId) setSelectedOrder(updated);
            showToast(`${orderId} marked PACKED. Delhivery AWB generated.`);
            return updated;
          }
          if (o.status === "PACKED") {
            const updated = { ...o, status: "DISPATCHED" as const };
            if (selectedOrder?.id === orderId) setSelectedOrder(updated);
            showToast(`${orderId} marked DISPATCHED! Handover to Delhivery rider.`);
            return updated;
          }
        }
        return o;
      }),
    );
  };

  const handleRestock = (key: keyof typeof stockQuantities, amount: number) => {
    setStockQuantities((prev) => ({
      ...prev,
      [key]: prev[key] + amount,
    }));
    showToast(`Stock updated: +${amount} units. The shop shows the new count straight away.`);
  };

  return (
    <section id="admin-console" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Admin panel"
          title={
            <>
              Designed for daily operations.{" "}
              <span className="italic text-muted">Fast and reliable.</span>
            </>
          }
          align="center"
          className="mb-12"
        >
          Your packing team, support staff and accountant work from one admin panel: orders and
          dispatch, stock, GST invoices and trade quotes, each person with only the access they need.
        </SectionHeading>

        {/* Global Feedback Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#111218] text-white px-4 py-3 shadow-2xl text-xs font-bold animate-fade-in border border-white/20">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <SegmentedTabs
          label="Admin panel area"
          value={activeTab}
          onChange={setActiveTab}
          className="mb-8"
          options={[
            { value: "orders", label: "Orders & dispatch", short: "Orders", icon: Truck },
            { value: "inventory", label: "Stock", short: "Stock", icon: Package },
            { value: "wholesale", label: "B2B quotations", short: "B2B quotes", icon: Boxes },
            { value: "roles", label: "Staff roles & security", short: "Staff roles", icon: KeyRound },
          ]}
        />

        {/* Dashboard Frame (Catalis style with slate border and soft shadow) */}
        <div className={cn(DEMO_FRAME, "p-3 sm:p-8")}>
          {/* Top Operational Metrics Strip with Dispatch Velocity Sparkline */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-line bg-sunken/40 p-4 relative overflow-hidden">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Today&apos;s Revenue</span>
              <p className="mt-1 text-2xl font-extrabold text-ink tabular-nums">₹48,250</p>
              <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="size-3" /> +14.2% vs yesterday
              </span>
              {/* Mini Sparkline Bars */}
              <div className="absolute right-3 bottom-3 flex items-end gap-1 opacity-70">
                <span className="w-1.5 h-3 bg-emerald-300 rounded-xs" />
                <span className="w-1.5 h-4 bg-emerald-400 rounded-xs" />
                <span className="w-1.5 h-2 bg-emerald-300 rounded-xs" />
                <span className="w-1.5 h-6 bg-emerald-500 rounded-xs" />
                <span className="w-1.5 h-5 bg-emerald-500 rounded-xs" />
                <span className="w-1.5 h-7 bg-emerald-600 rounded-xs" />
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-sunken/40 p-4">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Pending Dispatch</span>
              <p className="mt-1 text-2xl font-extrabold text-ink tabular-nums">
                {orders.filter((o) => o.status !== "DISPATCHED").length} Orders
              </p>
              <span className="text-muted text-xs flex items-center gap-1 mt-0.5">
                <Clock className="size-3 text-amber-600" /> Delhivery pickup 4:30 PM
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-sunken/40 p-4">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Stock Health</span>
              <p className="mt-1 text-2xl font-extrabold text-ink tabular-nums">98.4%</p>
              <span className="text-amber-700 text-xs font-semibold flex items-center gap-1 mt-0.5">
                <AlertTriangle className="size-3" />
                {stockQuantities.cardamom <= 20 ? "1 pack running low" : "Every pack in stock"}
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-sunken/40 p-4">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Active Trade Deals</span>
              <p className="mt-1 text-2xl font-extrabold text-[#0054F9] tabular-nums">₹1.85 Lakh</p>
              <span className="text-muted text-xs">3 wholesale inquiries open</span>
            </div>
          </div>

          {/* TAB 1: ORDERS & DISPATCH */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
                <div>
                  <h4 className="text-base font-bold text-ink">Fulfillment Operations Queue</h4>
                  <p className="text-xs text-muted">
                    Click any row to inspect Delhivery waybill, items, and packing slip.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {(["ALL", "CONFIRMED", "PACKED", "DISPATCHED"] as const).map((st) => {
                    const count = st === "ALL" ? orders.length : orders.filter((o) => o.status === st).length;
                    const isSelected = statusFilter === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#111218] text-white shadow-xs"
                            : "bg-sunken text-muted hover:text-ink hover:bg-line/60"
                        }`}
                      >
                        {st === "ALL" ? "All" : st.charAt(0) + st.slice(1).toLowerCase()} ({count})
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => showToast("Shipping labels ready to print, 4×6 or A4.")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunken ml-2 cursor-pointer"
                  >
                    <Printer className="size-3.5 text-muted" />
                    <span className="hidden sm:inline">Labels</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-left text-xs font-medium text-ink">
                  <thead className="border-b border-line bg-sunken/60 text-muted uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4">Carrier &amp; Waybill</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`hover:bg-sunken/40 transition-colors cursor-pointer ${
                          selectedOrder?.id === order.id ? "bg-[#0054F9]/5" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-ink">
                          <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-[#0054F9]" />
                            {order.id}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold">{order.customer}</td>
                        <td className="py-3 px-4 text-muted">{order.city}</td>
                        <td className="py-3 px-4 font-mono text-muted text-[11px]">
                          {order.carrier} · {order.awb}
                        </td>
                        <td className="py-3 px-4 font-bold tabular-nums">{rupees(order.amount)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              order.status === "DISPATCHED"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "PACKED"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0054F9] hover:underline"
                          >
                            <Eye className="size-3" />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Detail Inspector Drawer / Modal */}
              {selectedOrder && (
                <div className="rounded-2xl border-2 border-[#0054F9]/40 bg-sunken/40 p-5 mt-4 animate-fade-in relative">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-4 right-4 p-1 rounded-full text-muted hover:text-ink hover:bg-card cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>

                  <div className="grid gap-6 md:grid-cols-12">
                    {/* Left: Customer & Delivery Info */}
                    <div className="md:col-span-4 space-y-3 border-r border-line/80 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-extrabold text-ink">{selectedOrder.id}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            selectedOrder.status === "DISPATCHED"
                              ? "bg-emerald-100 text-emerald-800"
                              : selectedOrder.status === "PACKED"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-ink">{selectedOrder.customer}</p>
                        <p className="text-muted">{selectedOrder.phone}</p>
                        <p className="text-muted">{selectedOrder.city} · {selectedOrder.pincode}</p>
                        <p className="text-muted font-medium pt-1">Payment: {selectedOrder.paymentMode}</p>
                        <p className="text-muted text-[11px]">Placed: {selectedOrder.placedTime}</p>
                      </div>

                      {/* Barcode Mock */}
                      <div className="rounded-xl border border-line bg-card p-2 text-center">
                        <span className="text-[10px] uppercase font-bold text-muted block mb-1">
                          Delhivery Barcode
                        </span>
                        <div className="font-mono text-base tracking-[0.25em] font-black select-none text-ink py-1">
                          ||| | |||| | || | |||
                        </div>
                        <span className="font-mono text-[10px] text-muted block">{selectedOrder.awb}</span>
                      </div>
                    </div>

                    {/* Middle: Items & GST breakdown */}
                    <div className="md:col-span-5 space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-muted">
                        Items to pack
                      </h5>
                      <div className="divide-y divide-line/80 text-xs">
                        {selectedOrder.items.map((it, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-ink">{it.name}</p>
                              <p className="text-[11px] text-muted font-mono">{it.sku} · {it.pack}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold tabular-nums">Qty {it.qty}</span>
                              <span className="block text-[11px] text-muted tabular-nums">{rupees(it.price * it.qty)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-line pt-2 text-xs space-y-1">
                        <div className="flex justify-between text-muted">
                          <span>Taxable Value:</span>
                          <span className="tabular-nums">{rupees(selectedOrder.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                          <span>GST (CGST 9% + SGST 9%):</span>
                          <span className="tabular-nums">{rupees(selectedOrder.gstAmount)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-ink text-sm pt-1 border-t border-line/60">
                          <span>Total Collected:</span>
                          <span className="tabular-nums">{rupees(selectedOrder.amount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Operational Actions */}
                    <div className="md:col-span-3 flex flex-col justify-between space-y-3 bg-card p-4 rounded-xl border border-line">
                      <div>
                        <span className="text-xs font-bold text-ink block mb-1">Stage Progression</span>
                        <p className="text-[11px] text-muted leading-relaxed">
                          Each step can happen once, in order, so an order cannot be dispatched twice.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {selectedOrder.status !== "DISPATCHED" ? (
                          <button
                            type="button"
                            onClick={() => advanceOrderStatus(selectedOrder.id)}
                            className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0054F9] text-white py-2 text-xs font-bold hover:bg-[#0045D8] shadow-sm transition-all cursor-pointer"
                          >
                            <span>
                              {selectedOrder.status === "CONFIRMED"
                                ? "Pack & Generate AWB"
                                : "Dispatch to Carrier"}
                            </span>
                            <ArrowRight className="size-3" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                            <Check className="size-4 shrink-0" />
                            <span>Shipped with Delhivery</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => showToast(`GST Invoice printed for ${selectedOrder.id}`)}
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-card py-2 text-xs font-semibold text-ink hover:bg-sunken transition-colors cursor-pointer"
                        >
                          <FileText className="size-3.5 text-muted" />
                          <span>Print Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MULTI-WAREHOUSE INVENTORY */}
          {activeTab === "inventory" && (
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-3 border-b border-line pb-3 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-base font-semibold text-ink">Stock</h4>
                  <p className="text-xs text-muted">
                    One count per pack, shared by the shop and wholesale orders, so the two never oversell each other.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
                  <span className="font-medium text-ink">Ships from</span>
                  <span className="rounded-full border border-line bg-sunken px-2.5 py-1">Bengaluru warehouse</span>
                  <span className="rounded-full border border-line bg-sunken px-2.5 py-1">Mumbai warehouse</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {(
                  [
                    { key: "arabica250", name: "Single-Origin Coorg Arabica 250g", sku: "NN-COF-250", step: 25 },
                    { key: "arabica1kg", name: "Single-Origin Coorg Arabica 1kg", sku: "NN-COF-1000", step: 10 },
                    { key: "cardamom", name: "Wild Kerala Cardamom 100g Pouch", sku: "NN-CAR-100", step: 30, alertAt: 20 },
                    { key: "cocoa200", name: "Single-Estate Malabar Cocoa 200g Tin", sku: "NN-COC-200", step: 20 },
                    { key: "sampler", name: "The Reserve Providore Sampler Box", sku: "NN-SAM-01", step: 15 },
                  ] as const
                ).map((row) => {
                  const units = stockQuantities[row.key];
                  const low = "alertAt" in row && units <= row.alertAt;
                  return (
                    <div
                      key={row.key}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border p-3",
                        low ? "border-amber-200 bg-amber-50/80" : "border-line bg-card",
                      )}
                    >
                      <div className="min-w-0">
                        <span className={cn("block truncate font-semibold", low ? "text-amber-900" : "text-ink")}>
                          {row.name}
                        </span>
                        <span className={cn("block text-[11px]", low ? "font-medium text-amber-700" : "text-muted")}>
                          {low ? `Low stock: below its level of ${row.alertAt}` : `SKU ${row.sku}`}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className={cn("text-sm font-semibold tabular-nums", low ? "text-amber-900" : "text-ink")}>
                          {units} units
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRestock(row.key, row.step)}
                          className={cn(
                            "cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                            low
                              ? "bg-amber-600 text-white shadow-xs hover:bg-amber-700"
                              : "border border-line bg-sunken text-ink hover:bg-card",
                          )}
                        >
                          +{row.step} restock
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: B2B QUOTATIONS */}
          {activeTab === "wholesale" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
                <div>
                  <h4 className="text-base font-bold text-ink">B2B Wholesale Quotation Manager</h4>
                  <p className="text-xs text-muted">Review corporate requests, review buyer GSTIN, and adjust volume margins</p>
                </div>
                <span className="rounded-full bg-[#EBF3FF] text-[#0054F9] border border-[#CCE0FF] px-3 py-1 text-xs font-bold">
                  Wholesale Module Active
                </span>
              </div>

              <div className="rounded-2xl border border-line bg-card p-5 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <span className="font-bold text-sm text-ink">Artisan Cafe Roastery &amp; Bakery</span>
                    <span className="block text-muted text-[11px]">GSTIN: 27AABCA1234F1Z5 · Pune, MH</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-base text-ink tabular-nums">
                      Quoted: {rupees(Math.round(50 * 1200 * (1 - wholesaleDiscount / 100)))}
                    </span>
                    <span className="block text-emerald-700 font-semibold text-[11px]">
                      50% Advance Stage Received
                    </span>
                  </div>
                </div>

                {/* Interactive Margin & Volume Slider */}
                <div className="rounded-xl border border-line bg-sunken/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">Negotiated Volume Discount:</span>
                    <span className="font-extrabold text-[#0054F9] tabular-nums text-sm">
                      {wholesaleDiscount}% Off Retail Base
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={40}
                    step={1}
                    value={wholesaleDiscount}
                    onChange={(e) => {
                      setWholesaleDiscount(Number(e.target.value));
                      setDealApproved(false);
                    }}
                    className="w-full accent-[#0054F9] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted font-mono">
                    <span>15% (Standard Wholesale)</span>
                    <span>30% (Recommended for 50kg)</span>
                    <span>40% (Annual Distributor Cap)</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-muted text-[11px]">
                  <div><strong>Requested Item:</strong> Coorg Arabica 50kg Master Sack</div>
                  <div><strong>Quoted Unit Rate:</strong> {rupees(Math.round(1200 * (1 - wholesaleDiscount / 100)))}/kg</div>
                  <div><strong>Logistics:</strong> Delhivery B2B Freight (E-Way Bill Ready)</div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => {
                      setDealApproved(true);
                      showToast("Proforma Invoice & Staged Milestone schedule approved!");
                    }}
                    disabled={dealApproved}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      dealApproved
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-[#0054F9] text-white hover:bg-[#0045D8]"
                    }`}
                  >
                    {dealApproved ? (
                      <>
                        <Check className="size-3.5" />
                        <span>Quote Approved &amp; Locked</span>
                      </>
                    ) : (
                      <>
                        <Zap className="size-3.5" />
                        <span>Approve Quote &amp; Issue Proforma</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STAFF ROLES & ACCESS */}
          {activeTab === "roles" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div>
                  <h4 className="text-base font-bold text-ink">Granular Staff Roles &amp; Permissions</h4>
                  <p className="text-xs text-muted">Control exactly who can edit prices, view customer phone numbers, or issue refunds</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Shield className="size-3.5 text-emerald-600" />
                  <span>AES-256-GCM Session Tokens</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-line bg-sunken/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-ink">Super Administrator</span>
                    <span className="rounded-md bg-purple-100 text-purple-800 px-2 py-0.5 text-[10px] font-bold">Full</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Access to Razorpay &amp; Delhivery API credentials, staff role creation, database migrations, and financial reports.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-sunken/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-ink">Warehouse Dispatcher</span>
                    <span className="rounded-md bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">Fulfillment</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    View order items, print packing slips, generate Delhivery shipping labels, and mark shipments dispatched.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-sunken/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-ink">Finance &amp; CA Auditor</span>
                    <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">Read-Only</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Open GST invoices and credit notes and check payments, without being able to change anything.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
