/**
 * Which modules, support plan and hosting tier a buyer has picked, and how
 * that choice travels in the pricing page's URL. The URL is the whole state:
 * a quote is shareable by copying the link, works without JavaScript (the
 * configurator is a plain GET form) and prints exactly what the buyer saw.
 *
 * No money here. This file is shared with the browser so the configurator can
 * tick boxes the moment they are clicked; every rupee is worked out on the
 * server in `quote.ts`.
 *
 * Relative imports with a `.ts` extension, so `scripts/verify-quote.ts` can
 * load this file in plain Node.
 */
import {
  DEFAULT_SELECTION,
  HOSTING_TIERS,
  MODULES,
  PACKAGES,
  SUPPORT_PLANS,
} from "../data/catalog.ts";

export interface Selection {
  /** Catalogue order, required modules always present. */
  moduleIds: string[];
  planId: string;
  hostingId: string;
}

export type SearchParams = Record<string, string | string[] | undefined>;

function all(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Known ids only, each once, in catalogue order, with every required module
 * added. The order matters: the quote lists modules in it, and a link that
 * names them differently must still print the same quote.
 */
export function normaliseModules(ids: Iterable<string>): string[] {
  const wanted = new Set(ids);
  return MODULES.filter((m) => m.required || wanted.has(m.id)).map((m) => m.id);
}

export function packageModules(packageId: string): string[] | undefined {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  return pkg ? normaliseModules(pkg.modules) : undefined;
}

/** The package whose modules are exactly these, if any. */
export function matchingPackage(moduleIds: readonly string[]): string | null {
  const key = normaliseModules(moduleIds).join(",");
  const match = PACKAGES.find((p) => normaliseModules(p.modules).join(",") === key);
  return match ? match.id : null;
}

/**
 * From the page's search params. `pkg` (a package button pressed without
 * JavaScript) wins over the module boxes sent with it. No `m` at all means a
 * first visit and gets the default package; the form always sends the
 * required module as `m`, so "nothing extra ticked" never reads as a first
 * visit.
 */
export function parseSelection(params: SearchParams): Selection {
  const pkg = first(params.pkg);
  const fromPackage = pkg === undefined ? undefined : packageModules(pkg);
  const listed = params.m === undefined ? undefined : all(params.m);
  const moduleIds =
    fromPackage ??
    (listed === undefined
      ? (packageModules(DEFAULT_SELECTION.packageId) ?? normaliseModules([]))
      : normaliseModules(listed));

  const plan = first(params.plan);
  const hosting = first(params.hosting);
  return {
    moduleIds,
    planId: SUPPORT_PLANS.some((p) => p.id === plan)
      ? (plan as string)
      : DEFAULT_SELECTION.planId,
    hostingId: HOSTING_TIERS.some((t) => t.id === hosting)
      ? (hosting as string)
      : DEFAULT_SELECTION.hostingId,
  };
}

/** The query string for a selection: what `parseSelection` reads back. */
export function toSearch(selection: Selection): string {
  const params = new URLSearchParams();
  for (const id of selection.moduleIds) params.append("m", id);
  params.set("plan", selection.planId);
  params.set("hosting", selection.hostingId);
  return params.toString();
}

export function pricingHref(selection: Selection): string {
  return `/pricing?${toSearch(selection)}`;
}
