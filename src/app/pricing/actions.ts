"use server";

import { getContactChannels, sendEnquiry } from "@/lib/site-api";
import type { ClientVisitorContext } from "@/lib/visitor-client";
import { resolveServerVisitor } from "@/lib/visitor-server";

export interface QuoteEnquiryInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services?: string[];
  requirements?: string;
  packageTitle?: string;
  setupTotal?: string;
  monthlyTotal?: string;
  launchWeeks?: string;
  selectedModules?: string[];
  quoteUrl: string;
  startedAt?: number;
  website?: string;
  visitor?: ClientVisitorContext;
}

const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

/**
 * Submits a customer's quote selection and requirements to the admin panel.
 * The payload captures the quote replay URL, selected services (web/mobile,
 * Node/FastAPI, dedicated developers), contact information, and visitor telemetry.
 */
export async function submitQuote(input: QuoteEnquiryInput): Promise<{ ok: boolean; message?: string }> {
  const name = input.name?.trim().slice(0, 120) || "";
  const email = input.email?.trim().toLowerCase().slice(0, 254) || "";
  const phone = input.phone?.trim().slice(0, 32) || "";
  const company = input.company?.trim().slice(0, 120) || "";
  const requirements = input.requirements?.trim().slice(0, 3000) || "";
  const quoteUrl = input.quoteUrl?.trim().slice(0, 500) || "";
  const services = (input.services || []).filter(Boolean).slice(0, 10);
  const selectedModules = (input.selectedModules || []).filter(Boolean).slice(0, 30);
  const website = input.website?.trim().slice(0, 200) || "";
  if (website) return { ok: true };

  if (!name) return { ok: false, message: "Please provide your name." };
  if (!email || !EMAIL.test(email)) return { ok: false, message: "Please provide a valid email address." };
  if (!phone || phone.replace(/\D/g, "").length < 6) return { ok: false, message: "Please provide a valid phone number." };

  const formattedMessage = [
    "--- CUSTOMER REQUIREMENTS & NOTES ---",
    requirements || "No additional custom requirements specified.",
    "",
    ...(services.length > 0
      ? ["--- SERVICES REQUESTED ---", ...services.map((s) => `• ${s}`), ""]
      : []),
    "--- QUOTE ESTIMATE ---",
    input.packageTitle ? `Package: ${input.packageTitle}` : null,
    input.setupTotal ? `Setup Fee: ${input.setupTotal}` : null,
    input.monthlyTotal ? `Maintenance: ${input.monthlyTotal}` : null,
    input.launchWeeks ? `Estimated Timeline: ${input.launchWeeks}` : null,
    selectedModules.length > 0 ? `Selected Modules: ${selectedModules.join(", ")}` : null,
    quoteUrl ? `Direct Quote URL: ${quoteUrl}` : null,
  ].filter(Boolean).join("\n");

  const topic = input.packageTitle ? `Quote: ${input.packageTitle}` : "Turnkey Clone Quote";

  // Resolve server IP and headers, merging with client telemetry
  const visitorTelemetry = await resolveServerVisitor(input.visitor);

  const payload: Record<string, unknown> = {
    name,
    email,
    phone,
    company,
    topic,
    page: "/pricing",
    message: formattedMessage,
    visitor: visitorTelemetry,
  };

  const result = await sendEnquiry(payload);
  if (result.ok) {
    return { ok: true, message: "Your quote has been submitted! We will contact you soon." };
  }

  const { email: directEmail } = await getContactChannels().catch(() => ({ email: "" }));
  const contactText = directEmail ? ` You can also email us directly at ${directEmail}.` : "";

  return {
    ok: false,
    message: result.message || `Could not submit your quote at this moment.${contactText}`,
  };
}

