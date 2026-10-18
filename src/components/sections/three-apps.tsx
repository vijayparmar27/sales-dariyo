import {
  Check,
  LayoutDashboard,
  Radio,
  Server,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui";
import { DEMO_STORE } from "@/data/demo-store";
import { rupees } from "@/lib/format";

/** The storefront card's cart line: the demo store's first product, two of its biggest pack. */
const CART_EXAMPLE = (() => {
  const product = DEMO_STORE.products[0];
  const pack = product?.packSizes.at(-1);
  return product && pack ? { product, pack } : null;
})();

interface App {
  name: string;
  icon: LucideIcon;
  blurb: string;
  points: { title: string; body: string }[];
  mock: { label: string; status: string; title: string; detail: string; icon: LucideIcon; value?: string };
}

/*
 * Every point here was checked against the platform code (October 2026).
 * Two earlier claims were not true and are gone: stock "across multiple
 * physical warehouses" (there is one count per pack; warehouses are pickup
 * addresses) and "manifest prints" (labels print in batches; there is no
 * manifest sheet).
 */
const APPS: App[] = [
  {
    name: "Customer storefront",
    icon: Store,
    blurb: "A fast shop built with Next.js 16, React 19 and Tailwind CSS, in your brand.",
    points: [
      { title: "Pack sizes", body: "Grams, kilos, jars or pouches, each with its own price." },
      { title: "Indian checkout", body: "Razorpay UPI, cards, net banking and cash on delivery." },
      { title: "Customer accounts", body: "Google, phone code or email sign-in, live tracking, GST invoices." },
      { title: "Installs like an app", body: "Shoppers can add your store to their phone's home screen." },
    ],
    mock: {
      label: "Cart",
      status: "Delivers to 400053",
      title: CART_EXAMPLE?.product.name ?? "Your product",
      detail: CART_EXAMPLE ? `${CART_EXAMPLE.pack.label} · Qty 2` : "Qty 2",
      icon: Check,
      value: CART_EXAMPLE ? rupees(CART_EXAMPLE.pack.price * 2) : undefined,
    },
  },
  {
    name: "Admin panel",
    icon: LayoutDashboard,
    blurb: "Everything your team does each day: products, stock, orders, shipping and staff.",
    points: [
      { title: "Products and stock", body: "One stock count per pack, flagged when it runs low." },
      { title: "Shipping", body: "Compare courier rates, book Delhivery, schedule pickups, print labels." },
      { title: "Wholesale quotes", body: "With the wholesale module: trade enquiries, prices, bulk orders." },
      { title: "Tax and reports", body: "GST invoices, credit notes and monthly sales charts." },
    ],
    mock: {
      label: "Dispatch",
      status: "Ready to ship",
      title: "Delhivery pickup",
      detail: "Booked for today · 14 parcels",
      icon: Truck,
    },
  },
  {
    name: "Commerce backend",
    icon: Server,
    blurb: "The one source of truth for prices, stock, payments and shipping.",
    points: [
      { title: "One place for the maths", body: "Every price and total is worked out on the server." },
      { title: "A scheduler", body: "Cancels unpaid orders and releases the stock they held." },
      { title: "Signed webhooks", body: "Razorpay payments and Delhivery scans checked by HMAC." },
      { title: "Encrypted keys", body: "Payment and courier keys stored with AES-256-GCM." },
    ],
    mock: {
      label: "Live updates",
      status: "Socket.IO",
      title: "Order #NN-4921 dispatched",
      detail: "Shown to the customer and your team at once",
      icon: Radio,
    },
  },
];

export function ThreeApps() {
  return (
    <section id="apps" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Three connected apps"
          title={
            <>
              Everything your online business needs.{" "}
              <span className="italic text-muted">Working as one.</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          Plug-ins from different vendors break on updates and fall out of sync. Here the
          storefront, the admin panel and the backend are built together, as one system.
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-3">
          {APPS.map((app, index) => (
            <article key={app.name} className="reveal flex flex-col rounded-[28px] bg-sunken p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs">
                  <app.icon aria-hidden className="size-5" />
                </span>
                <span className="font-serif text-2xl text-muted/60 tabular-nums">0{index + 1}</span>
              </div>

              <h3 className="mt-8 font-serif text-[2.1rem] leading-none tracking-[-0.02em] text-ink">
                {app.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{app.blurb}</p>

              <ul className="mt-6 space-y-3.5 text-sm">
                {app.points.map((point) => (
                  <li key={point.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#111218] text-white">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    <span className="leading-snug text-muted">
                      <strong className="font-medium text-ink">{point.title}.</strong> {point.body}
                    </span>
                  </li>
                ))}
              </ul>

              {/* A small slice of the app, so each card shows the thing itself */}
              <div className="mt-auto pt-8">
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-18px_rgba(17,18,24,0.25)]">
                  <div className="mb-2.5 flex items-center justify-between text-[11px] font-medium text-muted">
                    <span>{app.mock.label}</span>
                    <span className="rounded-full bg-brand-blue-soft px-2 py-0.5 text-brand-blue">{app.mock.status}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{app.mock.title}</p>
                      <p className="truncate text-[11px] text-muted">{app.mock.detail}</p>
                    </div>
                    {app.mock.value ? (
                      <span className="font-semibold text-ink tabular-nums">{app.mock.value}</span>
                    ) : (
                      <app.mock.icon aria-hidden className="size-4 shrink-0 text-brand-blue" />
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
