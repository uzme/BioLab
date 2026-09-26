import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "uz" | "en" | "ru";

export const localeOptions: Array<{ value: Locale; label: string; nativeLabel: string }> = [
  { value: "uz", label: "O‘zbekcha", nativeLabel: "O‘zbekcha" },
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "ru", label: "Русский", nativeLabel: "Русский" },
];

const categoryLabels: Record<string, Record<Locale, string>> = {
  "Barcha uskunalar": { uz: "Barcha uskunalar", en: "All equipment", ru: "Все установки" },
  "Molekulyar biologiya": { uz: "Molekulyar biologiya", en: "Molecular biology", ru: "Молекулярная биология" },
  "Mikroskopiya": { uz: "Mikroskopiya", en: "Microscopy", ru: "Микроскопия" },
  "Hujayra kulturalari": { uz: "Hujayra kulturalari", en: "Cell culture", ru: "Культура клеток" },
  "Mikrobiologiya": { uz: "Mikrobiologiya", en: "Microbiology", ru: "Микробиология" },
  "Analitika": { uz: "Analitika", en: "Analytics", ru: "Аналитика" },
  "Sentrifugatsiya": { uz: "Sentrifugatsiya", en: "Centrifugation", ru: "Центрифугирование" },
  "Bioreaktorlar": { uz: "Bioreaktorlar", en: "Bioreactors", ru: "Биореакторы" },
  "Sovutish va saqlash": { uz: "Sovutish va saqlash", en: "Cooling and storage", ru: "Охлаждение и хранение" },
  "Namuna tayyorlash": { uz: "Namuna tayyorlash", en: "Sample preparation", ru: "Подготовка образцов" },
  "Avtomatlashtirish": { uz: "Avtomatlashtirish", en: "Automation", ru: "Автоматизация" },
};

export function getCategoryLabel(category: string, locale: Locale) {
  return categoryLabels[category]?.[locale] ?? category;
}

const LANGUAGE_STORAGE_KEY = "biolab-locale";

export const uiText = {
  uz: {
    language: "Til",
    languageDescription: "Interfeys va PDF tilini tanlang.",
    author: "Muallif: Mengliyev Bahrom",
    systemTagline: "O‘ZBEKCHA BIOTEXNOLOGIYA TIZIMI",
    allEquipment: "Barcha uskunalar",
    navigation: "Navigatsiya",
    searchPlaceholder: "Qurilma, model yoki vazifani qidiring…",
    modelFilter: "Model / brend bo‘yicha filtr",
    openSettings: "Sozlamalar",
    settings: "Sozlamalar va huquqiy ma’lumot",
    pixelAgent: "Pixel Agent",
    enterLab: "Laboratoriyaga kirish",
    loading: "Yuklanmoqda…",
    pdfPreparing: "PDF dosyesi tayyorlanmoqda…",
    pdfDownloaded: "PDF qurilmaga yuklab olindi.",
    pdfShare: "PDF ulashish",
    pdfDownload: "PDF eksport",
    scanDetail: "Skan qiling: detail oynasi",
    exportDate: "Eksport sanasi",
    dossier: "BIO.LAB / INDIVIDUAL O‘QUV DOSYESI",
    continuation: "DAVOMI",
    sixteenSections: "16 BO‘LIMLI SOP",
    originalName: "Original nomi",
    manufacturer: "Manufacturer",
    model: "Model",
    module: "Xarid va foydalanish xarajatlari",
    searchSuggestions: "Tezkor takliflar",
    activeFilters: "Faol filtrlar",
    clearFilter: "Filtrni olib tashlash",
    results: "natija",
    progress: "Sizning lokal o‘quv progressingiz",
    myLab: "Mening laboratoriyam",
    installApp: "BioLab’ni ilova sifatida o‘rnating",
    installAppDescription: "Safari menyusidan Share → Add to Home Screen → Open as Web App ni tanlang.",
    installAppAction: "O‘rnatish qadamlarini ko‘rish",
    safariInstallHint: "Safari Share menyusidan o‘rnating",
    dismiss: "Yopish",
  },
  en: {
    language: "Language",
    languageDescription: "Choose the interface and PDF language.",
    author: "Author: Mengliyev Bahrom",
    systemTagline: "UZBEK BIOTECHNOLOGY SYSTEM",
    allEquipment: "All equipment",
    navigation: "Navigation",
    searchPlaceholder: "Search by device, model or purpose…",
    modelFilter: "Filter by model / brand",
    openSettings: "Settings",
    settings: "Settings and legal information",
    pixelAgent: "Pixel Agent",
    enterLab: "Enter laboratory",
    loading: "Loading…",
    pdfPreparing: "Preparing PDF dossier…",
    pdfDownloaded: "PDF downloaded to the device.",
    pdfShare: "Share PDF",
    pdfDownload: "Export PDF",
    scanDetail: "Scan for the detail view",
    exportDate: "Export date",
    dossier: "BIO.LAB / INDIVIDUAL LEARNING DOSSIER",
    continuation: "CONTINUED",
    sixteenSections: "16-SECTION SOP",
    originalName: "Original name",
    manufacturer: "Manufacturer",
    model: "Model",
    module: "Purchase and operating costs",
    searchSuggestions: "Quick suggestions",
    activeFilters: "Active filters",
    clearFilter: "Remove filter",
    results: "results",
    progress: "Your local learning progress",
    myLab: "My laboratory",
    installApp: "Install BioLab as an app",
    installAppDescription: "In Safari, choose Share → Add to Home Screen → Open as Web App.",
    installAppAction: "View installation steps",
    safariInstallHint: "Install from Safari’s Share menu",
    dismiss: "Dismiss",
  },
  ru: {
    language: "Язык",
    languageDescription: "Выберите язык интерфейса и PDF.",
    author: "Автор: Менглиев Бахром",
    systemTagline: "УЗБЕКСКАЯ БИОТЕХНОЛОГИЧЕСКАЯ СИСТЕМА",
    allEquipment: "Все установки",
    navigation: "Навигация",
    searchPlaceholder: "Поиск по установке, модели или назначению…",
    modelFilter: "Фильтр по модели / бренду",
    openSettings: "Настройки",
    settings: "Настройки и правовая информация",
    pixelAgent: "Pixel Agent",
    enterLab: "Войти в лабораторию",
    loading: "Загрузка…",
    pdfPreparing: "Подготовка PDF-досье…",
    pdfDownloaded: "PDF сохранён на устройстве.",
    pdfShare: "Поделиться PDF",
    pdfDownload: "Экспорт PDF",
    scanDetail: "Сканируйте для открытия карточки",
    exportDate: "Дата экспорта",
    dossier: "BIO.LAB / ИНДИВИДУАЛЬНОЕ УЧЕБНОЕ ДОСЬЕ",
    continuation: "ПРОДОЛЖЕНИЕ",
    sixteenSections: "SOP ИЗ 16 РАЗДЕЛОВ",
    originalName: "Оригинальное название",
    manufacturer: "Производитель",
    model: "Модель",
    module: "Затраты на покупку и эксплуатацию",
    searchSuggestions: "Быстрые подсказки",
    activeFilters: "Активные фильтры",
    clearFilter: "Убрать фильтр",
    results: "результатов",
    progress: "Ваш локальный прогресс обучения",
    myLab: "Моя лаборатория",
    installApp: "Установите BioLab как приложение",
    installAppDescription: "В Safari выберите Share → Add to Home Screen → Open as Web App.",
    installAppAction: "Показать шаги установки",
    safariInstallHint: "Установите через меню Share в Safari",
    dismiss: "Закрыть",
  },
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
  return stored === "en" || stored === "ru" || stored === "uz" ? stored : "uz";
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
