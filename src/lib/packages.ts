/**
 * Each package's figures for the marketing pages, worked out by the same
 * function as a quote. The home page used to type its own copies (₹1,75,000,
 * "2 to 4 weeks", "8 to 10 weeks"), and they had already drifted from the
 * pricing page: Complete showed as 8 to 10 weeks there and 11 here.
 */
import "server-only";

import { DEFAULT_SELECTION, MODULES, PACKAGES, type PlatformModule } from "@/data/catalog";
import { buildQuote } from "@/lib/quote";
import { packageModules } from "@/lib/selection";

export interface PackageFigures {
  id: string;
  name: string;
  blurb: string;
  /** Setup fee before GST. */
  setupFee: number;
  setupDays: number;
  launchWeeks: number;
  /** The modules in this package, in catalogue order. */
  modules: PlatformModule[];
}

export function packageFigures(): PackageFigures[] {
  return PACKAGES.map((pkg) => {
    const moduleIds = packageModules(pkg.id) ?? [];
    const quote = buildQuote({
      moduleIds,
      planId: DEFAULT_SELECTION.planId,
      hostingId: DEFAULT_SELECTION.hostingId,
    });
    return {
      id: pkg.id,
      name: pkg.name,
      blurb: pkg.blurb,
      setupFee: quote.setup.subtotal,
      setupDays: quote.setupDays,
      launchWeeks: quote.launchWeeks,
      modules: MODULES.filter((m) => moduleIds.includes(m.id)),
    };
  });
}
