/**
 * Display only: turns computed numbers into localized formatted currency and text.
 *
 * For Indian Rupees, Indian numbering grouping is preserved (₹1,75,000, ₹41.8 lakh).
 * For international currencies (USD, EUR, GBP, AED), international grouping
 * and symbols are used ($2,100, €1,925, £1,645, AED 7,700).
 */

import {
  convertFromInr,
  formatCurrency as baseFormatCurrency,
  formatLargeAmount as baseFormatLarge,
  formatPrice as baseFormatPrice,
  type CurrencyCode,
} from "./i18n/currencies";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const PLAIN = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

/**
 * Backward-compatible helper: formats whole rupees with Indian grouping.
 */
export function rupees(amount: number): string {
  return INR.format(amount);
}

/**
 * Formats an amount with the active or specified currency.
 * Automatically converts base INR amount to target currency.
 */
export function formatPrice(amountInInr: number, currency: CurrencyCode = "INR"): string {
  return baseFormatPrice(amountInInr, currency);
}

/**
 * Formats an amount already in the target currency.
 */
export function formatCurrency(amountInTargetCurrency: number, currency: CurrencyCode = "INR"): string {
  return baseFormatCurrency(amountInTargetCurrency, currency);
}

/**
 * ₹41.8 lakh for INR, or $50.2k for USD.
 */
export function lakh(amountInInr: number, currency: CurrencyCode = "INR"): string {
  return baseFormatLarge(amountInInr, currency);
}

export function count(value: number): string {
  return PLAIN.format(value);
}

export function weeks(value: number): string {
  return value === 1 ? "1 week" : `${value} weeks`;
}

export { convertFromInr };
