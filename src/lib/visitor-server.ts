import "server-only";

import { headers } from "next/headers";
import { extractClientIp } from "./i18n/geo";
import type { ClientVisitorContext } from "./visitor-client";

export interface ServerVisitorTelemetry {
  ip: string;
  visitorId?: string;
  sessionId?: string;
  userAgent?: string;
  geo?: {
    country: string | null;
    region: string | null;
    regionCode: string | null;
    city: string | null;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    timezone: string | null;
    continent: string | null;
    isTor: boolean;
    source: string;
  };
  env?: ClientVisitorContext["env"];
  hints?: ClientVisitorContext["hints"];
  source?: {
    channel: string;
    name?: string | null;
    referrer?: string | null;
    utm?: ClientVisitorContext["utm"];
  };
}

/**
 * Resolves server-side request headers and merges them with
 * any telemetry reported by the client browser.
 */
export async function resolveServerVisitor(
  client?: Partial<ClientVisitorContext> | null
): Promise<ServerVisitorTelemetry> {
  const headerList = await headers();

  const ip = extractClientIp((name) => headerList.get(name));
  const userAgent = headerList.get("user-agent") || undefined;

  // Cloudflare & Vercel edge geolocation headers
  const country =
    headerList.get("x-visitor-country") ||
    headerList.get("cf-ipcountry") ||
    headerList.get("x-vercel-ip-country") ||
    headerList.get("cloudfront-viewer-country") ||
    null;

  const city = headerList.get("cf-ipcity") || null;
  const region = headerList.get("cf-region") || null;
  const regionCode = headerList.get("cf-region-code") || null;
  const postalCode = headerList.get("cf-postal-code") || null;
  const timezone = headerList.get("cf-timezone") || null;
  const continent = headerList.get("cf-ipcontinent") || null;

  const rawLat = headerList.get("cf-iplatitude");
  const rawLng = headerList.get("cf-iplongitude");
  const latitude = rawLat && Number.isFinite(Number(rawLat)) ? Number(rawLat) : null;
  const longitude = rawLng && Number.isFinite(Number(rawLng)) ? Number(rawLng) : null;

  const isTor = country === "T1";
  const hasGeo = Boolean(country || city || region || postalCode);

  const geo = {
    country,
    region,
    regionCode,
    city,
    postalCode,
    latitude,
    longitude,
    timezone,
    continent,
    isTor,
    source: hasGeo ? "CLOUDFLARE" : "NONE",
  };

  // Determine channel from referrer / utm
  const referrer = client?.referrer || headerList.get("referer") || undefined;
  const utm = client?.utm;

  let channel = "DIRECT";
  let sourceName: string | null = null;

  if (utm?.source) {
    sourceName = utm.source;
    channel = "PAID";
  } else if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      sourceName = host;
      if (host.includes("google.") || host.includes("bing.") || host.includes("yahoo.") || host.includes("duckduckgo.")) channel = "SEARCH";
      else if (host.includes("instagram.") || host.includes("facebook.") || host.includes("t.co") || host.includes("twitter.") || host.includes("x.com") || host.includes("linkedin.") || host.includes("whatsapp.")) channel = "SOCIAL";
      else channel = "REFERRAL";
    } catch {
      channel = "REFERRAL";
    }
  }

  return {
    ip,
    visitorId: client?.visitorId || undefined,
    sessionId: client?.sessionId || undefined,
    userAgent,
    geo,
    env: client?.env,
    hints: client?.hints,
    source: {
      channel,
      name: sourceName,
      referrer,
      utm,
    },
  };
}
