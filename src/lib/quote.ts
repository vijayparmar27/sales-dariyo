/**
 * Every price figure on the site is worked out here, on the server, from the catalogue.
 * Pages pass the figures down already computed and formatted; the browser
 * never adds amounts up, so a total on screen cannot drift from the one in the
 * quote a buyer sends.
 *
 * Supports multi-currency: domestic Indian Rupee (INR) with 18% GST, as well as
 * international currencies (USD, EUR, GBP, AED) with zero-rated international export.
 *
 * `server-only` makes importing this file into a client component a build
 * error. The verify script loads it with `--conditions=react-server`, which is
 * how that package resolves to an empty module outside a bundler.
 */
import "server-only";

import {
  GST,
  HOSTING_TIERS,
  MODULES,
  PAYMENT_STAGES,
  SUPPORT_PLANS,
  type HostingItem,
} from "../data/catalog.ts";
import {
  convertFromInr,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
} from "./i18n/currencies.ts";
import type { Selection } from "./selection.ts";

export interface QuoteLine {
  id: string;
  name: string;
  amount: number;
}

export interface PaymentStage {
  label: string;
  percent: number;
  amount: number;
}

export interface Quote {
  currency: CurrencyCode;
  currencySymbol: string;
  modules: QuoteLine[];
  /** null when the seller does not charge GST or for international buyers. */
  gstPercent: number | null;
  setup: { subtotal: number; gst: number; total: number };
  support: {
    planId: string;
    name: string;
    hoursPerMonth: number;
    fee: number;
    gst: number;
    total: number;
  };
  hosting: { tierId: string; name: string; items: readonly HostingItem[]; total: number };
  /** Working days of setup, and the same in whole weeks, rounded up. */
  setupDays: number;
  launchWeeks: number;
  /** Instalments of the setup total (GST included); they add up to it exactly. */
  payments: PaymentStage[];
}

function gstOn(amount: number, currency: CurrencyCode): number {
  if (currency !== "INR") return 0;
  return GST.enabled ? Math.round((amount * GST.percent) / 100) : 0;
}

/**
 * Splits a total by the payment stages. Each stage is rounded to the whole currency
 * unit and the last one takes what is left, so the instalments always add up to the
 * total exactly.
 */
export function splitPayments(total: number): PaymentStage[] {
  let assigned = 0;
  return PAYMENT_STAGES.map((stage, index) => {
    const amount =
      index === PAYMENT_STAGES.length - 1
        ? total - assigned
        : Math.round((total * stage.percent) / 100);
    assigned += amount;
    return { label: stage.label, percent: stage.percent, amount };
  });
}

export function buildQuote(selection: Selection, currency: CurrencyCode = "INR"): Quote {
  const picked = MODULES.filter((m) => selection.moduleIds.includes(m.id));
  const plan =
    SUPPORT_PLANS.find((p) => p.id === selection.planId) ?? SUPPORT_PLANS[0];
  const tier =
    HOSTING_TIERS.find((t) => t.id === selection.hostingId) ?? HOSTING_TIERS[0];
  if (!plan || !tier) {
    throw new Error("The catalogue needs at least one support plan and one hosting tier");
  }

  const isDomestic = currency === "INR";
  const currencyInfo = SUPPORTED_CURRENCIES[currency] ?? SUPPORTED_CURRENCIES.INR;

  const modules: QuoteLine[] = picked.map((m) => {
    const amount = isDomestic ? m.setupFee : convertFromInr(m.setupFee, currency);
    return { id: m.id, name: m.name, amount };
  });

  const subtotal = modules.reduce((sum, m) => sum + m.amount, 0);
  const setupGst = gstOn(subtotal, currency);
  const setupTotal = subtotal + setupGst;

  const planFee = isDomestic ? plan.monthlyFee : convertFromInr(plan.monthlyFee, currency);
  const supportGst = gstOn(planFee, currency);

  const hostingItems: HostingItem[] = tier.items.map((item) => ({
    name: item.name,
    provider: item.provider,
    monthly: isDomestic ? item.monthly : convertFromInr(item.monthly, currency),
  }));

  const setupDays = picked.reduce((sum, m) => sum + m.setupDays, 0);

  return {
    currency,
    currencySymbol: currencyInfo.symbol,
    modules,
    gstPercent: isDomestic && GST.enabled ? GST.percent : null,
    setup: { subtotal, gst: setupGst, total: setupTotal },
    support: {
      planId: plan.id,
      name: plan.name,
      hoursPerMonth: plan.hoursPerMonth,
      fee: planFee,
      gst: supportGst,
      total: planFee + supportGst,
    },
    hosting: {
      tierId: tier.id,
      name: tier.name,
      items: hostingItems,
      total: hostingItems.reduce((sum, item) => sum + item.monthly, 0),
    },
    setupDays,
    launchWeeks: Math.ceil(setupDays / 5),
    payments: splitPayments(setupTotal),
  };
}
