/**
 * Automated test suite for multi-language and multi-currency on sales-site.
 * Runs inside standard sandboxed environment with zero external dependencies.
 */
import { TRANSLATIONS } from "../src/lib/i18n/translations/index.ts";
import {
  SUPPORTED_CURRENCIES,
  convertFromInr,
  formatPrice,
  type CurrencyCode,
} from "../src/lib/i18n/currencies.ts";
import { resolveGeoLocation, currencyForCountry, languageForCountry } from "../src/lib/i18n/geo.ts";

let passed = 0;
const failures: string[] = [];

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    passed++;
    console.log(`  ok    ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

function deepCheckStrings(obj: unknown, path: string, lang: string): boolean {
  if (typeof obj === "string") {
    if (obj.trim() === "") {
      failures.push(`Empty string at ${lang}:${path}`);
      return false;
    }
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.every((item, i) => deepCheckStrings(item, `${path}[${i}]`, lang));
  }
  if (obj && typeof obj === "object") {
    return Object.entries(obj).every(([k, v]) => deepCheckStrings(v, `${path}.${k}`, lang));
  }
  return true;
}

console.log("i18n dictionary completeness & validity");
const languages = Object.keys(TRANSLATIONS) as (keyof typeof TRANSLATIONS)[];
check("All 7 languages defined", languages.length === 7);
check("Supported languages are en, hi, gu, es, fr, de, ar", 
  ["en", "hi", "gu", "es", "fr", "de", "ar"].every((l) => languages.includes(l as (typeof languages)[number]))
);

for (const lang of languages) {
  const dict = TRANSLATIONS[lang];
  const valid = deepCheckStrings(dict, "", lang);
  check(`[${lang}] dictionary has no empty or undefined strings`, valid);

  // Check critical sections exist
  check(`[${lang}] has nav, hero, services, pricing, about, blog, contact, interactiveDemo`, Boolean(
    dict.nav &&
    dict.hero &&
    dict.services &&
    dict.pricing &&
    dict.about &&
    dict.blog &&
    dict.contact &&
    dict.interactiveDemo &&
    dict.retailWholesale &&
    dict.adminShowcase &&
    dict.immersiveShowcase &&
    dict.techStack &&
    dict.notFound
  ));
}

console.log("\nmulti-currency conversion & formatting");
const sampleAmounts = [100, 1000, 48250, 175000, 4180000];
const targetCurrencies: CurrencyCode[] = ["INR", "USD", "EUR", "GBP", "AED"];

for (const curr of targetCurrencies) {
  check(`Currency ${curr} is supported with symbol and rate`, Boolean(
    SUPPORTED_CURRENCIES[curr] && SUPPORTED_CURRENCIES[curr].symbol && SUPPORTED_CURRENCIES[curr].rate > 0
  ));

  for (const amt of sampleAmounts) {
    const formatted = formatPrice(amt, curr);
    const converted = convertFromInr(amt, curr);

    check(
      `formatPrice(${amt}, "${curr}") outputs formatted price (${formatted})`,
      typeof formatted === "string" && formatted.length > 0 && converted >= 0
    );
  }
}

console.log("\ncurrency-specific symbol checks");
check("INR formatting includes ₹", formatPrice(1000, "INR").includes("₹"));
check("USD formatting includes $", formatPrice(1000, "USD").includes("$"));
check("EUR formatting includes €", formatPrice(1000, "EUR").includes("€"));
check("GBP formatting includes £", formatPrice(1000, "GBP").includes("£"));
check("AED formatting includes AED", formatPrice(1000, "AED").includes("AED"));

console.log("\nIP geolocation & edge header routing");
check("India IP (IN) maps to INR", currencyForCountry("IN") === "INR");
check("India IP (IN) pre-defaults to English", languageForCountry("IN") === "en");
check("US IP (US) maps to USD", currencyForCountry("US") === "USD");
check("Great Britain IP (GB) maps to GBP", currencyForCountry("GB") === "GBP");
check("Germany IP (DE) maps to EUR and German", currencyForCountry("DE") === "EUR" && languageForCountry("DE") === "de");
check("France IP (FR) maps to EUR and French", currencyForCountry("FR") === "EUR" && languageForCountry("FR") === "fr");
check("Spain IP (ES) maps to EUR and Spanish", currencyForCountry("ES") === "EUR" && languageForCountry("ES") === "es");
check("UAE IP (AE) maps to AED and Arabic", currencyForCountry("AE") === "AED" && languageForCountry("AE") === "ar");
check("Saudi Arabia IP (SA) maps to AED and Arabic", currencyForCountry("SA") === "AED" && languageForCountry("SA") === "ar");

console.log("\nEdge header priority & resolution");
const cfVisitor = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "cf-ipcountry" ? "FR" : undefined),
  cookie: () => undefined,
});
check("Cloudflare visitor from France gets EUR and French", cfVisitor.currency === "EUR" && cfVisitor.lang === "fr");

const vercelVisitor = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "x-vercel-ip-country" ? "US" : undefined),
  cookie: () => undefined,
});
check("Vercel visitor from US gets USD and English", vercelVisitor.currency === "USD" && vercelVisitor.lang === "en");

const indiaEdgeVisitor = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "cf-ipcountry" ? "IN" : undefined),
  cookie: () => undefined,
});
check("India visitor via edge header pre-defaults to INR and English", indiaEdgeVisitor.currency === "INR" && indiaEdgeVisitor.lang === "en");

const indiaAcceptLangVisitor = resolveGeoLocation({
  header: (name) => {
    const n = name.toLowerCase();
    if (n === "cf-ipcountry") return "IN";
    if (n === "accept-language") return "gu-IN,gu;q=0.9,hi-IN,hi;q=0.8,en-US;q=0.7,en;q=0.6";
    return undefined;
  },
  cookie: () => undefined,
});
check("India visitor with Gujarati/Hindi accept-language still pre-defaults to English", indiaAcceptLangVisitor.currency === "INR" && indiaAcceptLangVisitor.lang === "en");

const indiaFallbackVisitor = resolveGeoLocation({
  header: (name) => {
    const n = name.toLowerCase();
    if (n === "accept-language") return "hi,gu;q=0.9,en;q=0.8";
    return undefined;
  },
  cookie: () => undefined,
});
check("India fallback visitor (local/unclassified) pre-defaults to English", indiaFallbackVisitor.currency === "INR" && indiaFallbackVisitor.lang === "en");

const userOverride = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "cf-ipcountry" ? "IN" : undefined),
  cookie: (name) => (name === "dariyo_curr" ? "USD" : name === "dariyo_lang" ? "de" : undefined),
});
check("Cookie preference takes precedence over IP country", userOverride.currency === "USD" && userOverride.lang === "de");

const indiaExplicitGujarati = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "cf-ipcountry" ? "IN" : undefined),
  cookie: (name) => (name === "user-lang" ? "gu" : undefined),
});
check("India visitor with user-lang cookie=gu receives Gujarati", indiaExplicitGujarati.currency === "INR" && indiaExplicitGujarati.lang === "gu");

const queryOverride = resolveGeoLocation({
  header: (name) => (name.toLowerCase() === "cf-ipcountry" ? "IN" : undefined),
  cookie: (name) => (name === "dariyo_curr" ? "USD" : undefined),
  queryParam: (name) => (name === "curr" ? "EUR" : name === "lang" ? "ar" : undefined),
});
check("URL Query param takes precedence over cookie and IP", queryOverride.currency === "EUR" && queryOverride.lang === "ar");

console.log(`\n===========================================`);
console.log(`Results: ${passed} passed, ${failures.length} failed`);
console.log(`===========================================`);

if (failures.length > 0) {
  process.exit(1);
}
