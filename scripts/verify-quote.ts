/**
 * The price list and the quote. Pure: no server, no network.
 *
 *   - the catalogue holds together: ids unique, packages name real modules,
 *     defaults exist, payment stages add up to 100%, fees are whole rupees
 *   - a URL reads back as the selection it was written from, in catalogue
 *     order, with the required module always in and unknown ids dropped
 *   - a first visit gets the default package; "nothing extra ticked" does not
 *   - a package pressed without JavaScript wins over the boxes sent with it
 *   - every subset of modules: the setup subtotal is the sum of its fees, GST
 *     is rounded once, and the instalments add up to the total exactly
 *
 * Prices themselves are not pinned, so editing the catalogue never fails this.
 *
 *   npm run verify:quote
 */
import {
  DEFAULT_SELECTION,
  GST,
  HOSTING_TIERS,
  MODULES,
  PACKAGES,
  PAYMENT_STAGES,
  SUPPORT_PLANS,
} from "../src/data/catalog.ts";
import { buildQuote, splitPayments } from "../src/lib/quote.ts";
import type { CurrencyCode } from "../src/lib/i18n/currencies.ts";
import { resolveGeoLocation } from "../src/lib/i18n/geo.ts";
import {
  matchingPackage,
  normaliseModules,
  packageModules,
  parseSelection,
  toSearch,
  type SearchParams,
  type Selection,
} from "../src/lib/selection.ts";

let passed = 0;
const failures: string[] = [];
const check = (name: string, ok: boolean, detail = "") => {
  if (ok) {
    passed += 1;
    console.log(`  ok    ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL  ${name} ${detail}`);
  }
};

/** The shape Next hands a page: a repeated key becomes an array. */
function paramsOf(query: string): SearchParams {
  const out: SearchParams = {};
  for (const [key, value] of new URLSearchParams(query)) {
    const prev = out[key];
    out[key] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [prev, value];
  }
  return out;
}

const same = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const required = MODULES.filter((m) => m.required).map((m) => m.id);
const catalogueOrder = MODULES.map((m) => m.id);

console.log("catalogue");
check("module ids are unique", new Set(catalogueOrder).size === catalogueOrder.length);
check("at least one required module", required.length > 0);
check(
  "every fee and day count is a whole, non-negative number",
  MODULES.every(
    (m) => Number.isInteger(m.setupFee) && m.setupFee >= 0 && Number.isInteger(m.setupDays) && m.setupDays >= 0,
  ) && SUPPORT_PLANS.every((p) => Number.isInteger(p.monthlyFee) && p.monthlyFee >= 0),
);
check(
  "every package names only real modules",
  PACKAGES.every((p) => p.modules.every((id) => catalogueOrder.includes(id))),
);
check(
  "no two packages hold the same modules",
  new Set(PACKAGES.map((p) => (packageModules(p.id) ?? []).join(","))).size === PACKAGES.length,
);
check(
  "defaults name a real package, plan and hosting tier",
  PACKAGES.some((p) => p.id === DEFAULT_SELECTION.packageId) &&
    SUPPORT_PLANS.some((p) => p.id === DEFAULT_SELECTION.planId) &&
    HOSTING_TIERS.some((t) => t.id === DEFAULT_SELECTION.hostingId),
);
check(
  "payment stages add up to 100%",
  PAYMENT_STAGES.reduce((sum, s) => sum + s.percent, 0) === 100,
  `got ${PAYMENT_STAGES.reduce((sum, s) => sum + s.percent, 0)}`,
);

console.log("selection");
const first = parseSelection({});
check(
  "a first visit gets the default package",
  same(first.moduleIds, packageModules(DEFAULT_SELECTION.packageId) ?? []) &&
    first.planId === DEFAULT_SELECTION.planId &&
    first.hostingId === DEFAULT_SELECTION.hostingId,
);
const bare = parseSelection(paramsOf(`m=${required[0]}&plan=none&hosting=launch`));
check("only the required module ticked stays that way", same(bare.moduleIds, required));
check(
  "unknown ids are dropped, duplicates collapse, order is the catalogue's",
  same(
    parseSelection(paramsOf("m=seo&m=nonsense&m=wholesale&m=seo")).moduleIds,
    normaliseModules(["wholesale", "seo"]),
  ) && same(normaliseModules(["wholesale", "seo"]), [...required, "wholesale", "seo"]),
);
check(
  "the required module is added when a link leaves it out",
  parseSelection(paramsOf("m=wholesale")).moduleIds.includes(required[0] ?? ""),
);
check(
  "an unknown plan or tier falls back to the default",
  (() => {
    const s = parseSelection(paramsOf("m=core&plan=gold&hosting=moon"));
    return s.planId === DEFAULT_SELECTION.planId && s.hostingId === DEFAULT_SELECTION.hostingId;
  })(),
);
check(
  "a package button wins over the boxes sent with it",
  same(
    parseSelection(paramsOf("pkg=complete&m=core")).moduleIds,
    packageModules("complete") ?? [],
  ),
);
check(
  "an unknown package is ignored",
  same(parseSelection(paramsOf("pkg=gold&m=core&m=offers")).moduleIds, normaliseModules(["offers"])),
);

// Every subset of the optional modules: 2^n selections, small enough to walk.
const optional = MODULES.filter((m) => !m.required).map((m) => m.id);
const subsets: string[][] = [];
for (let mask = 0; mask < 1 << optional.length; mask += 1) {
  subsets.push(optional.filter((_, i) => mask & (1 << i)));
}

let roundTrips = true;
let packageMatches = true;
for (const ids of subsets) {
  for (const plan of SUPPORT_PLANS) {
    const selection: Selection = {
      moduleIds: normaliseModules(ids),
      planId: plan.id,
      hostingId: HOSTING_TIERS[0]?.id ?? "",
    };
    const back = parseSelection(paramsOf(toSearch(selection)));
    if (!same(back.moduleIds, selection.moduleIds) || back.planId !== selection.planId) {
      roundTrips = false;
    }
  }
  const match = matchingPackage(normaliseModules(ids));
  const expected = PACKAGES.find((p) => same(packageModules(p.id) ?? [], normaliseModules(ids)));
  if ((expected?.id ?? null) !== match) packageMatches = false;
}
check(`every selection survives its own URL (${subsets.length} module sets)`, roundTrips);
check("a package is recognised exactly when its modules are ticked", packageMatches);

console.log("quote");
let sums = true;
let gstOk = true;
let instalments = true;
let weeksOk = true;
for (const ids of subsets) {
  const moduleIds = normaliseModules(ids);
  const q = buildQuote({ moduleIds, planId: DEFAULT_SELECTION.planId, hostingId: DEFAULT_SELECTION.hostingId });
  const picked = MODULES.filter((m) => moduleIds.includes(m.id));
  const fees = picked.reduce((s, m) => s + m.setupFee, 0);
  const days = picked.reduce((s, m) => s + m.setupDays, 0);
  if (q.setup.subtotal !== fees || q.modules.length !== picked.length) sums = false;
  const expectedGst = GST.enabled ? Math.round((fees * GST.percent) / 100) : 0;
  if (q.setup.gst !== expectedGst || q.setup.total !== fees + expectedGst) gstOk = false;
  if (q.payments.reduce((s, p) => s + p.amount, 0) !== q.setup.total) instalments = false;
  if (q.launchWeeks !== Math.ceil(days / 5) || q.setupDays !== days) weeksOk = false;
}
check("setup subtotal is the sum of the picked modules' fees", sums);
check("GST is rounded once, on the subtotal", gstOk);
check("instalments add up to the setup total, every time", instalments);
check("launch weeks are the setup days in weeks, rounded up", weeksOk);

check(
  "instalments add up for awkward totals too",
  [1, 2, 3, 7, 99, 100_001, 4_42_501, 9_99_999].every(
    (t) => splitPayments(t).reduce((s, p) => s + p.amount, 0) === t,
  ),
);

const none = buildQuote({ moduleIds: required, planId: "none", hostingId: DEFAULT_SELECTION.hostingId });
check("no plan costs nothing a month", none.support.fee === 0 && none.support.total === 0);
check(
  "hosting is the sum of its items and stays out of the setup total",
  HOSTING_TIERS.every((tier) => {
    const q = buildQuote({ moduleIds: required, planId: "none", hostingId: tier.id });
    return (
      q.hosting.total === tier.items.reduce((s, i) => s + i.monthly, 0) &&
      q.setup.subtotal === MODULES.filter((m) => m.required).reduce((s, m) => s + m.setupFee, 0)
    );
  }),
);

console.log("multi-currency quotes");
const foreignCurrencies: CurrencyCode[] = ["USD", "EUR", "GBP", "AED"];
for (const curr of foreignCurrencies) {
  let foreignSums = true;
  let foreignGstZero = true;
  let foreignInstalments = true;

  for (const ids of subsets.slice(0, 30)) {
    const moduleIds = normaliseModules(ids);
    const q = buildQuote({ moduleIds, planId: DEFAULT_SELECTION.planId, hostingId: DEFAULT_SELECTION.hostingId }, curr);
    const fees = q.modules.reduce((s, m) => s + m.amount, 0);

    if (q.setup.subtotal !== fees) foreignSums = false;
    if (q.gstPercent !== null || q.setup.gst !== 0 || q.setup.total !== fees) foreignGstZero = false;
    if (q.payments.reduce((s, p) => s + p.amount, 0) !== q.setup.total) foreignInstalments = false;
  }

  check(`${curr} setup subtotal equals sum of modules`, foreignSums);
  check(`${curr} export is GST-free (gst=0)`, foreignGstZero);
  check(`${curr} instalments add up to total exactly`, foreignInstalments);
}

console.log("ip geolocation & preferences");
const usVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "US" : undefined),
  cookie: () => undefined,
});
check("Cloudflare US visitor gets USD currency", usVisit.currency === "USD" && usVisit.country === "US");

const deVisit = resolveGeoLocation({
  header: (name) => (name === "x-vercel-ip-country" ? "DE" : undefined),
  cookie: () => undefined,
});
check("Vercel Germany visitor gets EUR and German", deVisit.currency === "EUR" && deVisit.lang === "de");

const gbVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "GB" : undefined),
  cookie: () => undefined,
});
check("UK visitor gets GBP currency", gbVisit.currency === "GBP");

const aeVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "AE" : undefined),
  cookie: () => undefined,
});
check("UAE visitor gets AED and Arabic", aeVisit.currency === "AED" && aeVisit.lang === "ar");

const inVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "IN" : undefined),
  cookie: () => undefined,
});
check("India visitor gets INR currency", inVisit.currency === "INR" && inVisit.country === "IN");

const overrideVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "IN" : undefined),
  cookie: () => undefined,
  queryParam: (name) => (name === "currency" ? "USD" : name === "lang" ? "es" : undefined),
});
check("Query param override wins over edge country", overrideVisit.currency === "USD" && overrideVisit.lang === "es");

const cookieVisit = resolveGeoLocation({
  header: (name) => (name === "cf-ipcountry" ? "US" : undefined),
  cookie: (name) => (name === "user-currency" ? "INR" : name === "user-lang" ? "gu" : undefined),
});
check("User cookie preference wins over edge country", cookieVisit.currency === "INR" && cookieVisit.lang === "gu");

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
