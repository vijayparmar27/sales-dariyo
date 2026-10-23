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

import type { LanguageCode } from "../languages.ts";
import type { TranslationDictionary } from "./types.ts";
import { en } from "./en.ts";
import { hi } from "./hi.ts";
import { gu } from "./gu.ts";
import { es } from "./es.ts";
import { fr } from "./fr.ts";
import { de } from "./de.ts";
import { ar } from "./ar.ts";

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
