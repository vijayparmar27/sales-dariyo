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
import { formatPrice } from "@/lib/i18n/currencies";
import { getServerI18n } from "@/lib/i18n/server";

/** The storefront card's cart line: the demo store's first product, two of its biggest pack. */
const CART_EXAMPLE = (() => {
  const product = DEMO_STORE.products[0];
  const pack = product?.packSizes.at(-1);
  return product && pack ? { product, pack } : null;
})();

interface AppCard {
  name: string;
  icon: LucideIcon;
  blurb: string;
  points: { title: string; body: string }[];
  mock: { label: string; status: string; title: string; detail: string; icon: LucideIcon; value?: string };
}

/**
 * Three connected apps showcase section.
 */
export async function ThreeApps() {
  const { t, currency } = await getServerI18n();

  const apps: AppCard[] = [
    {
      name: t.threeApps.storefront.name,
      icon: Store,
      blurb: t.threeApps.storefront.blurb,
      points: t.threeApps.storefront.points,
      mock: {
        label: t.threeApps.storefront.mockLabel,
        status: t.threeApps.storefront.mockStatus,
        title: CART_EXAMPLE?.product.name ?? "Your product",
        detail: CART_EXAMPLE ? `${CART_EXAMPLE.pack.label} · Qty 2` : "Qty 2",
        icon: Check,
        value: CART_EXAMPLE ? formatPrice(CART_EXAMPLE.pack.price * 2, currency) : undefined,
      },
    },
    {
      name: t.threeApps.adminPanel.name,
      icon: LayoutDashboard,
      blurb: t.threeApps.adminPanel.blurb,
      points: t.threeApps.adminPanel.points,
      mock: {
        label: t.threeApps.adminPanel.mockLabel,
        status: t.threeApps.adminPanel.mockStatus,
        title: t.threeApps.adminPanel.mockTitle,
        detail: t.threeApps.adminPanel.mockDetail,
        icon: Truck,
      },
    },
    {
      name: t.threeApps.backend.name,
      icon: Server,
      blurb: t.threeApps.backend.blurb,
      points: t.threeApps.backend.points,
      mock: {
        label: t.threeApps.backend.mockLabel,
        status: t.threeApps.backend.mockStatus,
        title: t.threeApps.backend.mockTitle,
        detail: t.threeApps.backend.mockDetail,
        icon: Radio,
      },
    },
  ];

  return (
    <section id="apps" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.threeApps.eyebrow}
          title={
            <>
              {t.threeApps.titlePart1}{" "}
              <span className="italic text-muted">{t.threeApps.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.threeApps.subtitle}
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-3">
          {apps.map((app, index) => (
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
