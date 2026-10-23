"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  DEFAULT_CURRENCY,
  formatCurrency,
  formatLargeAmount,
  formatPrice,
  type CurrencyCode,
} from "./currencies";
import { DEFAULT_LANGUAGE, type LanguageCode } from "./languages";
import { getTranslations, type TranslationDictionary } from "./translations";

export interface I18nContextValue {
  lang: LanguageCode;
  currency: CurrencyCode;
  country: string;
  dir: "ltr" | "rtl";
  t: TranslationDictionary;
  setLang: (lang: LanguageCode) => void;
  setCurrency: (currency: CurrencyCode) => void;
  formatMoney: (amountInInr: number) => string;
  formatRaw: (amountInTargetCurrency: number) => string;
  formatLarge: (amountInInr: number) => string;
  isPending: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function I18nProvider({
  initialLang = DEFAULT_LANGUAGE,
  initialCurrency = DEFAULT_CURRENCY,
  initialCountry = "IN",
  children,
}: {
  initialLang?: LanguageCode;
  initialCurrency?: CurrencyCode;
  initialCountry?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lang, setLangState] = useState<LanguageCode>(initialLang);
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);
  const [country] = useState<string>(initialCountry);

  const t = getTranslations(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  function handleSetLang(newLang: LanguageCode) {
    setCookie("user-lang", newLang);
    setLangState(newLang);
    startTransition(() => {
      router.refresh();
    });
  }

  function handleSetCurrency(newCurrency: CurrencyCode) {
    setCookie("user-currency", newCurrency);
    setCurrencyState(newCurrency);
    startTransition(() => {
      router.refresh();
    });
  }

  const value: I18nContextValue = {
    lang,
    currency,
    country,
    dir,
    t,
    setLang: handleSetLang,
    setCurrency: handleSetCurrency,
    formatMoney: (amountInInr: number) => formatPrice(amountInInr, currency),
    formatRaw: (amountInTargetCurrency: number) => formatCurrency(amountInTargetCurrency, currency),
    formatLarge: (amountInInr: number) => formatLargeAmount(amountInInr, currency),
    isPending,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback when rendered outside provider (e.g. isolated test)
    const t = getTranslations(DEFAULT_LANGUAGE);
    return {
      lang: DEFAULT_LANGUAGE,
      currency: DEFAULT_CURRENCY,
      country: "IN",
      dir: "ltr",
      t,
      setLang: () => {},
      setCurrency: () => {},
      formatMoney: (amt: number) => formatPrice(amt, DEFAULT_CURRENCY),
      formatRaw: (amt: number) => formatCurrency(amt, DEFAULT_CURRENCY),
      formatLarge: (amt: number) => formatLargeAmount(amt, DEFAULT_CURRENCY),
      isPending: false,
    };
  }
  return context;
}

