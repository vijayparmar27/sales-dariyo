"use client";

/**
 * Client-side visitor telemetry collector for sales-site.
 * Captures visitor identity, environment, device client hints,
 * traffic source, and UTM parameters (matching dariyo-frontend).
 */

export interface ClientVisitorContext {
  visitorId: string;
  sessionId: string;
  env: {
    screen?: string;
    viewport?: string;
    dpr?: number;
    language?: string;
    languages?: string[];
    timezone?: string;
    connection?: string;
    network?: string;
    downlinkMbps?: number;
    saveData?: boolean;
    memoryGb?: number;
    cores?: number;
    touch?: boolean;
    colorScheme?: "dark" | "light";
  };
  hints?: {
    mobile?: boolean;
    platform?: string;
    platformVersion?: string;
    model?: string;
    brands?: string[];
  };
  referrer?: string;
  utm?: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    term: string | null;
    content: string | null;
  };
  path?: string;
}

const VISITOR_KEY = "dariyo.visitor";
const SESSION_KEY = "dariyo.visitSession";

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}

function getStoredVisitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing && existing.length >= 6 && existing.length <= 64) {
      return existing;
    }
    const created = newId();
    window.localStorage.setItem(VISITOR_KEY, created);
    return created;
  } catch {
    return newId();
  }
}

function getStoredSessionId(): string {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing && existing.length >= 6 && existing.length <= 64) {
      return existing;
    }
    const created = newId();
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return newId();
  }
}

interface NavigatorExtras extends Navigator {
  userAgentData?: {
    mobile?: boolean;
    platform?: string;
    brands?: { brand: string; version: string }[];
    getHighEntropyValues?: (hints: string[]) => Promise<{ model?: string; platformVersion?: string }>;
  };
  connection?: {
    effectiveType?: string;
    type?: string;
    downlink?: number;
    saveData?: boolean;
  };
  deviceMemory?: number;
}

/**
 * Gathers client telemetry synchronously from DOM/BOM,
 * and asynchronously enhances with high-entropy Client Hints if available.
 */
export async function getVisitorClientContext(): Promise<ClientVisitorContext> {
  if (typeof window === "undefined") {
    return {
      visitorId: "",
      sessionId: "",
      env: {},
    };
  }

  const visitorId = getStoredVisitorId();
  const sessionId = getStoredSessionId();
  const nav = navigator as NavigatorExtras;

  const env: ClientVisitorContext["env"] = {
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio || 1,
    language: nav.language,
    languages: nav.languages ? Array.from(nav.languages).slice(0, 5) : undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    touch: nav.maxTouchPoints > 0,
    colorScheme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  };

  if (nav.connection) {
    env.connection = nav.connection.effectiveType;
    env.network = nav.connection.type;
    env.downlinkMbps = nav.connection.downlink;
    env.saveData = nav.connection.saveData;
  }
  if (nav.deviceMemory) env.memoryGb = nav.deviceMemory;
  if (nav.hardwareConcurrency) env.cores = nav.hardwareConcurrency;

  let hints: ClientVisitorContext["hints"] = undefined;
  if (nav.userAgentData) {
    hints = {
      ...(typeof nav.userAgentData.mobile === "boolean" && { mobile: nav.userAgentData.mobile }),
      ...(nav.userAgentData.platform && { platform: nav.userAgentData.platform }),
      ...(nav.userAgentData.brands && {
        brands: nav.userAgentData.brands.map((b) => `${b.brand} ${b.version}`),
      }),
    };

    try {
      if (typeof nav.userAgentData.getHighEntropyValues === "function") {
        const high = await Promise.race([
          nav.userAgentData.getHighEntropyValues(["model", "platformVersion"]),
          new Promise<null>((r) => setTimeout(() => r(null), 350)),
        ]);
        if (high) {
          if (high.model) hints.model = high.model;
          if (high.platformVersion) hints.platformVersion = high.platformVersion;
        }
      }
    } catch {
      // Ignore client hints errors
    }
  }

  // Parse UTM parameters
  let utm: ClientVisitorContext["utm"] = undefined;
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const term = params.get("utm_term");
    const content = params.get("utm_content");

    if (source || medium || campaign || term || content) {
      utm = { source, medium, campaign, term, content };
    }
  } catch {
    // Ignore URL parse errors
  }

  return {
    visitorId,
    sessionId,
    env,
    ...(hints && { hints }),
    referrer: document.referrer || undefined,
    ...(utm && { utm }),
    path: window.location.pathname,
  };
}
