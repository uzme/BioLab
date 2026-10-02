import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import enLocale from "@/lib/generated/en.json";
import ruLocale from "@/lib/generated/ru.json";
import trLocale from "@/lib/generated/tr.json";
import uzLocale from "@/lib/generated/uz.json";

export type Locale = "uz" | "en" | "ru" | "tr";

type LocaleDocument = typeof uzLocale;
const localeDocuments: Record<Locale, LocaleDocument> = {
  uz: uzLocale,
  en: enLocale as LocaleDocument,
  ru: ruLocale as LocaleDocument,
  tr: trLocale as LocaleDocument,
};

export const localeOptions: Array<{ value: Locale; label: string; nativeLabel: string }> = [
  { value: "uz", label: "O‘zbekcha", nativeLabel: "O‘zbekcha" },
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "ru", label: "Русский", nativeLabel: "Русский" },
  { value: "tr", label: "Türkçe", nativeLabel: "Türkçe" },
];

const categoryLabels = Object.fromEntries(
  uzLocale.interface.categories.map((category) => [category.key, category.labels]),
) as Record<string, Record<Locale, string>>;

export function getCategoryLabel(category: string, locale: Locale) {
  return categoryLabels[category]?.[locale] ?? category;
}

const LANGUAGE_STORAGE_KEY = "biolab-locale";

export const uiText = {
  uz: localeDocuments.uz.interface.uiText,
  en: localeDocuments.en.interface.uiText,
  ru: localeDocuments.ru.interface.uiText,
  tr: localeDocuments.tr.interface.uiText,
} as const;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  text: typeof uiText[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "uz";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" || stored === "ru" || stored === "uz" || stored === "tr" ? stored : "uz";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);
  const setLocale = (nextLocale: Locale) => setLocaleState(nextLocale);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, text: uiText[locale] }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
