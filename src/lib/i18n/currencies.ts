/**
 * Supported currencies, exchange conversions, and formatting definitions.
 *
 * Base catalog figures in `catalog.ts` are stored in whole INR rupees.
 * When visitors connect from outside India, their local or preferred currency
 * is auto-selected based on their IP geolocation or explicit choice.
 *
 * All converted figures are rounded to clean integers, ensuring payment
 * instalment math (splitPayments) remains exact.
 */

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  /** Multiplier applied to INR whole amounts to produce foreign currency whole amounts */
  rate: number;
  locale: string;
  /** Whether GST applies (18% for domestic INR, null for foreign software export) */
  gstPercent: number | null;
  /** Formatting position for symbol */
  symbolPosition: "prefix" | "suffix";
}

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    rate: 1,
    locale: "en-IN",
    gstPercent: 18,
    symbolPosition: "prefix",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    rate: 0.012, // approx $1 = ₹83.33
    locale: "en-US",
    gstPercent: null,
    symbolPosition: "prefix",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    rate: 0.011, // approx €1 = ₹90.90
    locale: "de-DE",
    gstPercent: null,
    symbolPosition: "prefix",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    rate: 0.0094, // approx £1 = ₹106.38
    locale: "en-GB",
    gstPercent: null,
    symbolPosition: "prefix",
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    name: "UAE Dirham",
    flag: "🇦🇪",
    rate: 0.044, // approx 1 AED = ₹22.72
    locale: "en-AE",
    gstPercent: null,
    symbolPosition: "prefix",
  },
};

export const CURRENCY_LIST: readonly CurrencyInfo[] = Object.values(SUPPORTED_CURRENCIES);

/**
 * Checks whether a given string is a supported currency code.
 */
export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(SUPPORTED_CURRENCIES, value);
}

/**
 * Converts a base INR amount to the target currency, returning a whole number.
 */
export function convertFromInr(amountInInr: number, currency: CurrencyCode): number {
  if (currency === "INR" || amountInInr === 0) return amountInInr;
  const info = SUPPORTED_CURRENCIES[currency];
  if (!info) return amountInInr;
  return Math.round(amountInInr * info.rate);
}

const FORMATTERS: Partial<Record<CurrencyCode, Intl.NumberFormat>> = {};

function getFormatter(currency: CurrencyCode): Intl.NumberFormat {
  const cached = FORMATTERS[currency];
  if (cached) return cached;

  const info = SUPPORTED_CURRENCIES[currency] ?? SUPPORTED_CURRENCIES.INR;
  const formatter = new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: info.code,
    maximumFractionDigits: 0,
  });
  FORMATTERS[currency] = formatter;
  return formatter;
}

/**
 * Formats an amount already in the target currency (e.g. from a Quote computed in USD).
 */
export function formatCurrency(amountInTargetCurrency: number, currency: CurrencyCode = "INR"): string {
  const formatter = getFormatter(currency);
  return formatter.format(amountInTargetCurrency);
}

/**
 * Takes a base INR amount, converts it to the given currency, and formats it for display.
 */
export function formatPrice(amountInInr: number, currency: CurrencyCode = "INR"): string {
  const converted = convertFromInr(amountInInr, currency);
  return formatCurrency(converted, currency);
}

/**
 * Formats large amounts in human readable units:
 * e.g. for INR: ₹41.8 lakh; for USD: $50.2k.
 */
export function formatLargeAmount(amountInInr: number, currency: CurrencyCode = "INR"): string {
  const info = SUPPORTED_CURRENCIES[currency] ?? SUPPORTED_CURRENCIES.INR;
  if (currency === "INR") {
    const lakhs = (amountInInr / 100000).toFixed(1);
    return `₹${lakhs} lakh`;
  }
  const converted = convertFromInr(amountInInr, currency);
  if (converted >= 1000) {
    const k = (converted / 1000).toFixed(1);
    return `${info.symbol}${k}k`;
  }
  return formatCurrency(converted, currency);
}

