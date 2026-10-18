/**
 * Every rupee on the site is worked out here, on the server, from the catalogue.
 * Pages pass the figures down already computed and formatted; the browser
 * never adds amounts up, so a total on screen cannot drift from the one in the
 * quote a buyer sends.
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
  modules: QuoteLine[];
  /** null when the seller does not charge GST. */
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

function gstOn(amount: number): number {
  return GST.enabled ? Math.round((amount * GST.percent) / 100) : 0;
}

/**
 * Splits a total by the payment stages. Each stage is rounded to the rupee and
 * the last one takes what is left, so the instalments always add up to the
 * total: three stages each rounded on their own can come to a rupee more or
 * less than the invoice they are paying.
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

export function buildQuote(selection: Selection): Quote {
  const picked = MODULES.filter((m) => selection.moduleIds.includes(m.id));
  const plan =
    SUPPORT_PLANS.find((p) => p.id === selection.planId) ?? SUPPORT_PLANS[0];
  const tier =
    HOSTING_TIERS.find((t) => t.id === selection.hostingId) ?? HOSTING_TIERS[0];
  if (!plan || !tier) {
    throw new Error("The catalogue needs at least one support plan and one hosting tier");
  }

  const subtotal = picked.reduce((sum, m) => sum + m.setupFee, 0);
  const setupGst = gstOn(subtotal);
  const setupTotal = subtotal + setupGst;
  const supportGst = gstOn(plan.monthlyFee);
  const setupDays = picked.reduce((sum, m) => sum + m.setupDays, 0);

  return {
    modules: picked.map((m) => ({ id: m.id, name: m.name, amount: m.setupFee })),
    gstPercent: GST.enabled ? GST.percent : null,
    setup: { subtotal, gst: setupGst, total: setupTotal },
    support: {
      planId: plan.id,
      name: plan.name,
      hoursPerMonth: plan.hoursPerMonth,
      fee: plan.monthlyFee,
      gst: supportGst,
      total: plan.monthlyFee + supportGst,
    },
    hosting: {
      tierId: tier.id,
      name: tier.name,
      items: tier.items,
      total: tier.items.reduce((sum, item) => sum + item.monthly, 0),
    },
    setupDays,
    launchWeeks: Math.ceil(setupDays / 5),
    payments: splitPayments(setupTotal),
  };
}
