/**
 * IP and Country Geolocation Engine.
 *
 * Automatically resolves visitor country, currency, and language based on:
 * 1. Explicit user cookies or URL query parameters (highest priority)
 * 2. Reverse proxy edge headers (Cloudflare, Vercel, AWS CloudFront, Nginx)
 * 3. Client IP address classification
 * 4. Accept-Language header hints
 * 5. Safe, production-tested fallback defaults
 */

import { isCurrencyCode, type CurrencyCode } from "./currencies.ts";
import { DEFAULT_LANGUAGE, isLanguageCode, type LanguageCode } from "./languages.ts";

export interface GeoLocation {
  country: string;
  currency: CurrencyCode;
  lang: LanguageCode;
  ip: string;
  source: "override" | "cookie" | "edge-header" | "ip-range" | "accept-language" | "default";
}

/**
 * Eurozone ISO country codes.
 */
const EUROZONE_COUNTRIES = new Set([
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

/**
 * Spanish-speaking countries.
 */
const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PR", "PA", "UY",
]);

/**
 * French-speaking countries.
 */
const FRENCH_COUNTRIES = new Set([
  "FR", "MC", "SN", "CI", "CD", "ML", "CM", "MG", "BF", "NE", "LU",
]);

/**
 * German-speaking countries.
 */
const GERMAN_COUNTRIES = new Set([
  "DE", "AT", "CH", "LI",
]);

/**
 * Arabic-speaking countries.
 */
const ARABIC_COUNTRIES = new Set([
  "AE", "SA", "EG", "QA", "KW", "OM", "BH", "JO", "LB", "IQ", "MA", "DZ", "TN",
]);

/**
 * Gulf / Middle East currencies.
 */
const GULF_COUNTRIES = new Set([
  "AE", "SA", "QA", "KW", "OM", "BH",
]);

/**
 * Maps an ISO 2-letter country code to a default currency.
 */
export function currencyForCountry(country: string): CurrencyCode {
  const code = country.trim().toUpperCase();
  if (code === "IN") return "INR";
  if (EUROZONE_COUNTRIES.has(code)) return "EUR";
  if (code === "GB" || code === "UK") return "GBP";
  if (GULF_COUNTRIES.has(code)) return "AED";
  // Default international commerce currency
  return "USD";
}

/**
 * Maps an ISO 2-letter country code to a default display language.
 */
export function languageForCountry(country: string): LanguageCode {
  const code = country.trim().toUpperCase();
  if (SPANISH_COUNTRIES.has(code)) return "es";
  if (FRENCH_COUNTRIES.has(code)) return "fr";
  if (GERMAN_COUNTRIES.has(code)) return "de";
  if (ARABIC_COUNTRIES.has(code)) return "ar";
  // India and international default to English
  return "en";
}

/**
 * Parses the Accept-Language header to see if the user explicitly prefers
 * one of our supported regional languages (e.g. Gujarati or Hindi or Spanish).
 */
export function languageFromAcceptHeader(acceptHeader: string | null | undefined): LanguageCode | null {
  if (!acceptHeader) return null;
  const lower = acceptHeader.toLowerCase();
  if (lower.includes("gu")) return "gu";
  if (lower.includes("hi")) return "hi";
  if (lower.includes("es")) return "es";
  if (lower.includes("fr")) return "fr";
  if (lower.includes("de")) return "de";
  if (lower.includes("ar")) return "ar";
  if (lower.includes("en")) return "en";
  return null;
}

/**
 * Checks if an IP is a local/private network address.
 */
export function isPrivateIp(ip: string): boolean {
  const clean = ip.trim().replace(/^::ffff:/, "");
  if (clean === "127.0.0.1" || clean === "::1" || clean === "localhost") return true;
  if (/^10\./.test(clean)) return true;
  if (/^192\.168\./.test(clean)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clean)) return true;
  if (/^fc00:|^fe80:/i.test(clean)) return true;
  return false;
}

/**
 * Major public IPv4 prefix heuristic for fast local classification without external network dependency.
 */
export function countryFromIpHeuristic(ip: string): string | null {
  const clean = ip.trim().replace(/^::ffff:/, "");
  const firstOctet = parseInt(clean.split(".")[0] ?? "0", 10);
  if (isNaN(firstOctet) || firstOctet <= 0) return null;

  // Well known APNIC blocks heavily allocated to India (Reliance Jio, Airtel, ACT, BSNL)
  if ([49, 103, 106, 117, 122, 125, 139, 150, 157, 182, 183, 223].includes(firstOctet)) {
    return "IN";
  }

  // European RIPE blocks
  if ([62, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95].includes(firstOctet)) {
    return "DE"; // Default European proxy
  }

  // North American ARIN blocks
  if ([3, 4, 12, 13, 15, 16, 24, 34, 52, 54, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 104, 107, 108, 142, 144, 172, 173, 174, 198, 199, 204, 205, 206, 207, 208, 209].includes(firstOctet)) {
    return "US";
  }

  return null;
}

/**
 * Extracts client IP from standard headers.
 */
export function extractClientIp(headerGetter: (name: string) => string | null | undefined): string {
  const named = process.env.SITE_VISITOR_IP_HEADER?.trim().toLowerCase();
  if (named) {
    const val = headerGetter(named);
    if (val) return val.split(",")[0]?.trim() || "127.0.0.1";
  }

  const cfIp = headerGetter("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = headerGetter("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = headerGetter("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "127.0.0.1";

  return "127.0.0.1";
}

/**
 * Resolves geolocation, currency, and language for a request.
 */
export function resolveGeoLocation(params: {
  header: (name: string) => string | null | undefined;
  cookie: (name: string) => string | null | undefined;
  queryParam?: (name: string) => string | null | undefined;
}): GeoLocation {
  const { header, cookie, queryParam } = params;

  // 1. Explicit query param override (e.g. ?currency=USD&lang=es or ?country=US)
  const qCurrency = queryParam?.("currency");
  const qLang = queryParam?.("lang");
  const qCountry = queryParam?.("country");

  if (isCurrencyCode(qCurrency) || isLanguageCode(qLang) || qCountry) {
    const country = (qCountry || "IN").toUpperCase();
    const currency = isCurrencyCode(qCurrency) ? qCurrency : currencyForCountry(country);
    const lang = isLanguageCode(qLang) ? qLang : languageForCountry(country);
    return {
      country,
      currency,
      lang,
      ip: extractClientIp(header),
      source: "override",
    };
  }

  // 2. Cookie override
  const cCurrency = cookie("user-currency");
  const cLang = cookie("user-lang");
  const cCountry = cookie("user-country");

  if (isCurrencyCode(cCurrency) && isLanguageCode(cLang)) {
    return {
      country: (cCountry || (cCurrency === "INR" ? "IN" : "US")).toUpperCase(),
      currency: cCurrency,
      lang: cLang,
      ip: extractClientIp(header),
      source: "cookie",
    };
  }

  // 3. Reverse proxy edge headers (Cloudflare, Vercel, AWS CloudFront)
  const edgeCountry =
    header("cf-ipcountry")?.trim().toUpperCase() ||
    header("x-vercel-ip-country")?.trim().toUpperCase() ||
    header("cloudfront-viewer-country")?.trim().toUpperCase() ||
    header("x-country-code")?.trim().toUpperCase();

  if (edgeCountry && /^[A-Z]{2}$/.test(edgeCountry) && edgeCountry !== "XX" && edgeCountry !== "T1") {
    const country = edgeCountry;
    const currency = isCurrencyCode(cCurrency) ? cCurrency : currencyForCountry(country);
    const acceptLang = languageFromAcceptHeader(header("accept-language"));
    const lang = isLanguageCode(cLang)
      ? cLang
      : acceptLang && country === "IN"
      ? acceptLang
      : languageForCountry(country);

    return {
      country,
      currency,
      lang,
      ip: extractClientIp(header),
      source: "edge-header",
    };
  }

  // 4. IP address heuristic
  const ip = extractClientIp(header);
  if (!isPrivateIp(ip)) {
    const heurCountry = countryFromIpHeuristic(ip);
    if (heurCountry) {
      const currency = isCurrencyCode(cCurrency) ? cCurrency : currencyForCountry(heurCountry);
      const lang = isLanguageCode(cLang) ? cLang : languageForCountry(heurCountry);
      return {
        country: heurCountry,
        currency,
        lang,
        ip,
        source: "ip-range",
      };
    }
  }

  // 5. Accept-Language hint
  const acceptLang = languageFromAcceptHeader(header("accept-language"));
  const defaultCountry = (process.env.DEFAULT_COUNTRY || "IN").toUpperCase();
  const defaultCurr = isCurrencyCode(cCurrency) ? cCurrency : currencyForCountry(defaultCountry);
  const defaultL = isLanguageCode(cLang) ? cLang : acceptLang ?? DEFAULT_LANGUAGE;

  return {
    country: defaultCountry,
    currency: defaultCurr,
    lang: defaultL,
    ip,
    source: "default",
  };
}
