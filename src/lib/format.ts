/**
 * Display only: these turn a figure the server already computed into words.
 * Indian grouping (₹1,75,000), because the buyers are Indian businesses and a
 * lakh written as 175,000 reads as a typo to them.
 */
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const PLAIN = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

export function rupees(amount: number): string {
  return INR.format(amount);
}

/** ₹41.8 lakh */
export function lakh(amount: number): string {
  return `₹${PLAIN.format(amount / 100000)} lakh`;
}

export function count(value: number): string {
  return PLAIN.format(value);
}

export function weeks(value: number): string {
  return value === 1 ? "1 week" : `${value} weeks`;
}
