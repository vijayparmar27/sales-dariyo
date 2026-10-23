/**
 * Multi-Language Translations Index.
 *
 * Provides complete localized text for all 7 supported languages:
 * - English (en)
 * - Hindi (hi)
 * - Gujarati (gu)
 * - Spanish (es)
 * - French (fr)
 * - German (de)
 * - Arabic (ar)
 */

import type { LanguageCode } from "../languages";
import type { TranslationDictionary } from "./types";
import { en } from "./en";
import { hi } from "./hi";
import { gu } from "./gu";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { ar } from "./ar";

export type { TranslationDictionary };

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en,
  hi,
  gu,
  es,
  fr,
  de,
  ar,
};

/**
 * Returns the translation dictionary for a given language code, falling back to English.
 *
 * @param lang - Target language code
 * @returns Localized translation dictionary
 */
export function getTranslations(lang: LanguageCode = "en"): TranslationDictionary {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}
