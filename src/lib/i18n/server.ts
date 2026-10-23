import { cookies, headers } from "next/headers";

import { resolveGeoLocation, type GeoLocation } from "./geo";
import { formatCurrency, formatLargeAmount, formatPrice, type CurrencyCode } from "./currencies";
import { getTranslations, type TranslationDictionary } from "./translations";
import type { LanguageCode } from "./languages";

export interface ServerI18n {
  lang: LanguageCode;
  currency: CurrencyCode;
  country: string;
  dir: "ltr" | "rtl";
  t: TranslationDictionary;
  geo: GeoLocation;
  formatMoney: (amountInInr: number) => string;
  formatRaw: (amountInTargetCurrency: number) => string;
  formatLarge: (amountInInr: number) => string;
}

/**
 * Resolves current language, currency, country, and translations on the server.
 * Reads cookies, request headers (including Cloudflare/Vercel edge headers),
 * and optional query parameters.
 */
export async function getServerI18n(searchParams?: Record<string, string | string[] | undefined>): Promise<ServerI18n> {
  const headerList = await headers();
  const cookieStore = await cookies();

  const queryGetter = searchParams
    ? (name: string): string | undefined => {
        const val = searchParams[name];
        return Array.isArray(val) ? val[0] : val;
      }
    : undefined;

  const geo = resolveGeoLocation({
    header: (name: string) => headerList.get(name),
    cookie: (name: string) => cookieStore.get(name)?.value,
    queryParam: queryGetter,
  });

  const t = getTranslations(geo.lang);
  const dir = geo.lang === "ar" ? "rtl" : "ltr";

  return {
    lang: geo.lang,
    currency: geo.currency,
    country: geo.country,
    dir,
    t,
    geo,
    formatMoney: (amountInInr: number) => formatPrice(amountInInr, geo.currency),
    formatRaw: (amountInTargetCurrency: number) => formatCurrency(amountInTargetCurrency, geo.currency),
    formatLarge: (amountInInr: number) => formatLargeAmount(amountInInr, geo.currency),
  };
}

