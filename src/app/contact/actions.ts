"use server";

import { headers } from "next/headers";

import { getContactChannels, getPage, sendEnquiry } from "@/lib/site-api";
import type { ContactField } from "@/lib/site-types";

import type { ContactState } from "./contact-state";

const FIELDS: readonly ContactField[] = ["name", "email", "phone", "company", "topic", "message"];
const LIMITS: Record<ContactField, number> = { name: 120, email: 254, phone: 32, company: 120, topic: 80, message: 5000 };
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

/**
 * Messages one visitor may send in `WINDOW_MS`. The API counts the whole form
 * — every message reaches it from this one server — so the per-visitor limit
 * is here, before it is spent. In memory: this site runs as one server, and a
 * restart forgetting a count costs nothing.
 */
const PER_VISITOR = 5;
const WINDOW_MS = 15 * 60 * 1000;
const sent = new Map<string, number[]>();

function allow(visitor: string): boolean {
  const now = Date.now();
  for (const [key, times] of sent) {
    const recent = times.filter((time) => now - time < WINDOW_MS);
    if (recent.length === 0) sent.delete(key);
    else sent.set(key, recent);
  }
  const times = sent.get(visitor) ?? [];
  if (times.length >= PER_VISITOR) return false;
  sent.set(visitor, [...times, now]);
  return true;
}

/**
 * The visitor's address, for the per-visitor count above. Only a header the
 * proxy in front of this site sets can be believed, and which one that is
 * depends on the host, so `SITE_VISITOR_IP_HEADER` names it —
 * `cf-connecting-ip` behind Cloudflare, `x-real-ip` behind an nginx that sets
 * it. Unset, the first `x-forwarded-for` entry, which Vercel writes itself;
 * on a host that passes on a visitor's own value it can be forged, and the
 * API's limit on the whole form is then what still holds.
 */
function visitorOf(list: Headers): string {
  const named = process.env.SITE_VISITOR_IP_HEADER?.trim().toLowerCase();
  const value = named ? list.get(named) : (list.get("x-forwarded-for") ?? list.get("x-real-ip"));
  return value?.split(",")[0]?.trim() || "unknown";
}

/**
 * The contact form's send. Checked here against the form as the panel set it
 * up (the API checks again), then posted to the API, which files it in the
 * panel's Enquiries inbox.
 *
 * Two quiet traps for scripts: a `website` field people never see, and a form
 * sent within a second and a half of the visitor starting on it. A message
 * either catches is still sent — the API files it under Spam, where it can be
 * found if a trap misjudged a person — and the sender sees the same thank-you.
 */
export async function sendMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const values: Partial<Record<ContactField, string>> = {};
  for (const field of FIELDS) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim().slice(0, LIMITS[field]) : "";
  }
  const attempt = Date.now();
  const started = String(formData.get("startedAt") ?? "");
  const startedAt = Number(started);
  const website = String(formData.get("website") ?? "").trim().slice(0, 200);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 1_500;
  const caught = website !== "" || tooFast;
  const refuse = (message: string, fields: Partial<Record<ContactField, string>> = {}): ContactState => ({
    status: "error",
    message,
    fields,
    values,
    attempt,
    startedAt: started,
  });

  if (caught) {
    // Counted like any other send, so a flood of them is throttled too.
    if (allow(visitorOf(await headers()))) {
      await sendEnquiry({ ...values, page: "/contact", ...(website ? { website } : { trap: "too-fast" }) });
    }
    return { status: "sent" };
  }

  const { form } = await getPage("contact");
  const fields: Partial<Record<ContactField, string>> = {};
  for (const field of FIELDS) {
    const settings = form.fields[field];
    const core = field === "name" || field === "email" || field === "message";
    // A topic menu with nothing in it is not shown, so it is not asked either.
    const asked = core || (settings.enabled && !(field === "topic" && form.topics.length === 0));
    if (!asked) {
      values[field] = "";
      continue;
    }
    if ((core || settings.required) && !values[field]) fields[field] = `${settings.label || "This"} is required.`;
  }
  if (values.email && !EMAIL.test(values.email)) fields.email = "Enter a valid email address.";
  if (values.phone && !/^[+()\d\s.-]{6,32}$/.test(values.phone)) fields.phone = "Enter a valid phone number.";
  if (Object.keys(fields).length > 0) return refuse("Check the fields marked below.", fields);

  const { email } = await getContactChannels();
  const directly = email ? ` You can also write to ${email}.` : "";

  if (!allow(visitorOf(await headers()))) {
    return refuse(`That is a lot of messages in a short while. Try again in a few minutes.${directly}`);
  }

  const timeline = typeof formData.get("timeline") === "string" ? String(formData.get("timeline")).trim().slice(0, 100) : "";
  const budget = typeof formData.get("budget") === "string" ? String(formData.get("budget")).trim().slice(0, 100) : "";

  let enrichedMessage = values.message || "";
  if (timeline || budget) {
    const meta: string[] = [];
    if (timeline) meta.push(`Estimated Timeline: ${timeline}`);
    if (budget) meta.push(`Estimated Budget: ${budget}`);
    enrichedMessage = `${enrichedMessage}\n\n--- PROJECT SCOPE ---\n${meta.join("\n")}`;
  }

  const referenceId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const result = await sendEnquiry({ ...values, message: enrichedMessage, page: "/contact" });
  if (result.ok) {
    return {
      status: "sent",
      referenceId,
      topic: values.topic || "General Inquiry",
      email: values.email,
      timeline,
      budget,
    };
  }
  if (result.status === 422 && result.fields) return refuse("Check the fields marked below.", result.fields);
  return refuse(
    result.status === 429
      ? `We are getting a lot of messages just now. Try again in a few minutes.${directly}`
      : `Your message could not be sent just now. Please try again.${directly}`,
  );
}
