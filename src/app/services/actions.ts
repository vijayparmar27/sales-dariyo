"use server";

import { getContactChannels, sendEnquiry } from "@/lib/site-api";

export interface ServiceInquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  stack: string;
  model: string;
  notes?: string;
  startedAt?: number;
  website?: string;
}

const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

/**
 * Submits a client's software development or dedicated developer staffing
 * inquiry to the backend admin panel.
 */
export async function submitServiceInquiry(
  input: ServiceInquiryInput
): Promise<{ ok: boolean; message?: string }> {
  const name = input.name?.trim().slice(0, 120) || "";
  const email = input.email?.trim().toLowerCase().slice(0, 254) || "";
  const phone = input.phone?.trim().slice(0, 32) || "";
  const company = input.company?.trim().slice(0, 120) || "";
  const service = input.service?.trim().slice(0, 150) || "General Engineering";
  const stack = input.stack?.trim().slice(0, 150) || "Full-Stack";
  const model = input.model?.trim().slice(0, 150) || "Dedicated Monthly";
  const notes = input.notes?.trim().slice(0, 3000) || "";
  const website = input.website?.trim().slice(0, 200) || "";

  if (!name) return { ok: false, message: "Please provide your name." };
  if (!email || !EMAIL.test(email)) return { ok: false, message: "Please provide a valid email address." };

  const startedAt = Number(input.startedAt || 0);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 1_500;
  const isTrap = website !== "" || tooFast;

  const formattedMessage = [
    "--- SERVICE & STAFFING INQUIRY ---",
    `Service Requested: ${service}`,
    `Primary Tech Stack: ${stack}`,
    `Engagement Model: ${model}`,
    "",
    "--- CLIENT REQUIREMENTS & NOTES ---",
    notes || "No additional requirements specified.",
  ].join("\n");

  const topic = `Service Quote: ${service} (${stack})`;

  const payload: Record<string, string> = {
    name,
    email,
    phone,
    company,
    topic,
    page: "/services",
    message: formattedMessage,
    ...(isTrap ? (website ? { website } : { trap: "too-fast" }) : {}),
  };

  const result = await sendEnquiry(payload);
  if (result.ok) {
    return {
      ok: true,
      message: "Your inquiry has been submitted! Our engineering lead will contact you shortly.",
    };
  }

  const { email: directEmail } = await getContactChannels().catch(() => ({ email: "" }));
  const contactText = directEmail ? ` You can also email us directly at ${directEmail}.` : "";

  return {
    ok: false,
    message: result.message || `Could not submit your inquiry at this moment.${contactText}`,
  };
}

