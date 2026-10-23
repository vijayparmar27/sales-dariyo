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
import type { TranslationDictionary } from "@/lib/i18n/translations/types";

export function quoteText(quote: Quote, link: string, t?: TranslationDictionary): string {
  const gst = quote.gstPercent !== null;
  const curr = quote.currency;
  const setup = gst
    ? `${formatCurrency(quote.setup.subtotal, curr)} + GST ${formatCurrency(quote.setup.gst, curr)} = ${formatCurrency(quote.setup.total, curr)}`
    : formatCurrency(quote.setup.total, curr);

  const locPlanName = t?.catalog?.supportPlans?.[quote.support.name?.toLowerCase()]?.name || quote.support.name;
  const support =
    quote.support.fee > 0
      ? `${locPlanName} ${t ? t.common.month : "plan"}, ${formatCurrency(quote.support.fee, curr)} ${t ? `/${t.common.month}` : "a month"}${gst ? " + GST" : ""}`
      : (t?.quoteMessage?.noPlanLabel || "No plan, pay by the hour");

  const greeting = t?.quoteMessage?.greeting
    ? t.quoteMessage.greeting.replace("{name}", site.name).replace("{product}", site.product)
    : `Hi ${site.name}, I'd like to discuss this quote for the ${site.product}.`;

  const modulesHeader = t?.quoteMessage?.modulesHeader || "Modules:";
  const setupLabel = t?.quoteMessage?.setupLabel || "One-time setup:";
  const supportLabel = t?.quoteMessage?.supportLabel || "Support:";
  const hostingLabel = t?.quoteMessage?.hostingLabel || "Hosting, paid to providers:";
  const launchLabel = t?.quoteMessage?.launchLabel || "Launch:";

  const modulesLines = quote.modules.map((m) => {
    const locName = t?.catalog?.modules?.[m.id]?.name || m.name;
    return `- ${locName}`;
  });

  return [
    greeting,
    "",
    modulesHeader,
    ...modulesLines,
    "",
    `${setupLabel} ${setup}`,
    `${supportLabel} ${support}`,
    `${hostingLabel} ~${formatCurrency(quote.hosting.total, curr)} ${t ? `/${t.common.month}` : "a month"}`,
    `${launchLabel} ~${weeks(quote.launchWeeks)}`,
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
