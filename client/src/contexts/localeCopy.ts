import type { Locale } from "./LanguageContext";
import enLocale from "@/lib/generated/en.json";
import ruLocale from "@/lib/generated/ru.json";
import trLocale from "@/lib/generated/tr.json";
import uzLocale from "@/lib/generated/uz.json";

export type LocaleCopy = typeof uzLocale.interface.copy;

export const localeCopy: Record<Locale, LocaleCopy> = {
  uz: uzLocale.interface.copy,
  en: enLocale.interface.copy as LocaleCopy,
  ru: ruLocale.interface.copy as LocaleCopy,
  tr: trLocale.interface.copy as LocaleCopy,
};

export function getLocaleCopy(locale: Locale): LocaleCopy {
  return localeCopy[locale];
}
