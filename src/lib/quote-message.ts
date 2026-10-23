/**
 * The quote as words a buyer sends: the WhatsApp message and the email body.
 * Built on the server from the computed quote, so the figures in a buyer's
 * message are the ones the page showed, to the rupee.
 */
import "server-only";

import { headers } from "next/headers";

import { site } from "@/config/site";
import { formatCurrency, weeks } from "@/lib/format";
import type { Quote } from "@/lib/quote";

export function quoteText(quote: Quote, link: string): string {
  const gst = quote.gstPercent !== null;
  const curr = quote.currency;
  const setup = gst
    ? `${formatCurrency(quote.setup.subtotal, curr)} + GST ${formatCurrency(quote.setup.gst, curr)} = ${formatCurrency(quote.setup.total, curr)}`
    : formatCurrency(quote.setup.total, curr);
  const support =
    quote.support.fee > 0
      ? `${quote.support.name} plan, ${formatCurrency(quote.support.fee, curr)} a month${gst ? " + GST" : ""}`
      : "No plan, pay by the hour";

  // One module a line: a name can hold a comma ("Second courier, cheapest
  // wins"), so a comma-separated list reads as more modules than were picked.
  return [
    `Hi ${site.name}, I'd like to discuss this quote for the ${site.product}.`,
    "",
    "Modules:",
    ...quote.modules.map((m) => `- ${m.name}`),
    "",
    `One-time setup: ${setup}`,
    `Support: ${support}`,
    `Hosting, paid to providers: about ${formatCurrency(quote.hosting.total, curr)} a month`,
    `Launch: about ${weeks(quote.launchWeeks)} after kick-off`,
    "",
    link,
  ].join("\n");
}

/**
 * The send buttons go to the contact details set in the admin panel
 * (`getContactChannels`, which falls back to `site.whatsapp` / `site.email`).
 */
export function whatsappHref(text: string, whatsapp: string): string | null {
  const digits = whatsapp.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : null;
}

export function mailHref(text: string, email: string): string | null {
  if (!email) return null;
  const subject = encodeURIComponent(`Quote for the ${site.product}`);
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(text)}`;
}

/**
 * The origin for the link inside a sent quote: `site.url` when it is set,
 * otherwise the request's own Host, so the link is also right on localhost and
 * on a preview deployment before the domain is configured.
 *
 * Neither forwarded header is read. Next fills in `x-forwarded-proto` itself
 * (as "http" behind a TLS proxy that does not send it), which made every link
 * http://, and `x-forwarded-host` is whatever the client put there. Anything
 * that is not a local address is assumed to be served over https.
 */
export async function requestOrigin(): Promise<string> {
  if (site.url) return site.url.replace(/\/+$/, "");
  const host = (await headers()).get("host") ?? "localhost:3200";
  const local = /^(localhost|127\.|10\.|192\.168\.|\[::1\])/.test(host) || host.endsWith(".local");
  return `${local ? "http" : "https"}://${host}`;
}
