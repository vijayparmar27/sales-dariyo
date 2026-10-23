/**
 * Supported display languages for the sales site.
 *
 * English is the default international language. Hindi and Gujarati serve
 * businesses across India and Dariyo's home region (Gujarat). Spanish, French,
 * German, and Arabic serve international clients and foreign enterprise buyers.
 */

export type LanguageCode = "en" | "hi" | "gu" | "es" | "fr" | "de" | "ar";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🌐",
    dir: "ltr",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    dir: "ltr",
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    dir: "ltr",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    dir: "ltr",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    dir: "ltr",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇦🇪",
    dir: "rtl",
  },
};

export const LANGUAGE_LIST: readonly LanguageInfo[] = Object.values(SUPPORTED_LANGUAGES);

/**
 * Checks whether a given string is a supported language code.
 */
export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(SUPPORTED_LANGUAGES, value);
}

