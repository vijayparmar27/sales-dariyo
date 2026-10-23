import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { resolveGeoLocation } from "./lib/i18n/geo";

/**
 * Next.js 16 Proxy Convention.
 *
 * Runs before pages are rendered. Detects visitor IP, country, currency,
 * and language, sets request headers for Server Components, and persists
 * initial detected defaults in client cookies.
 */
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static assets, API routes, _next internal files, and favicons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Resolve GeoLocation from headers, cookies, and query params
  const geo = resolveGeoLocation({
    header: (name: string) => request.headers.get(name),
    cookie: (name: string) => request.cookies.get(name)?.value,
    queryParam: (name: string) => searchParams.get(name),
  });

  // Forward detected information to Server Components via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-visitor-ip", geo.ip);
  requestHeaders.set("x-visitor-country", geo.country);
  requestHeaders.set("x-visitor-currency", geo.currency);
  requestHeaders.set("x-visitor-lang", geo.lang);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // If cookies are missing or explicit query parameters were supplied, set them
  const hasCurrencyCookie = request.cookies.has("user-currency");
  const hasLangCookie = request.cookies.has("user-lang");
  const hasQueryOverride = searchParams.has("currency") || searchParams.has("lang") || searchParams.has("country");

  if (!hasCurrencyCookie || !hasLangCookie || hasQueryOverride) {
    const maxAge = 365 * 24 * 60 * 60;
    response.cookies.set("user-country", geo.country, { path: "/", maxAge, sameSite: "lax" });
    response.cookies.set("user-currency", geo.currency, { path: "/", maxAge, sameSite: "lax" });
    response.cookies.set("user-lang", geo.lang, { path: "/", maxAge, sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|logo|images|.*\\.).*)",
  ],
};

