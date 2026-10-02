import enLocale from "./generated/en.json";
import ruLocale from "./generated/ru.json";
import trLocale from "./generated/tr.json";
import uzLocale from "./generated/uz.json";
import type { Locale } from "@/contexts/LanguageContext";
import type { Equipment } from "@/lib/equipmentData";
import type { LearningContent, PurchaseContent } from "@/lib/learningData";

type LocalizedDevice = {
  id: string;
  equipment: Equipment;
  learning: Omit<LearningContent, "number" | "sourceKind"> | null;
  purchase: Omit<PurchaseContent, "number" | "sourceKind"> | null;
};

type LocaleDocument = { devices: LocalizedDevice[] };

const localeDocuments: Record<Locale, LocaleDocument> = {
  uz: uzLocale as unknown as LocaleDocument,
  en: enLocale as unknown as LocaleDocument,
  ru: ruLocale as unknown as LocaleDocument,
  tr: trLocale as unknown as LocaleDocument,
};

const deviceMaps: Record<Locale, Map<string, LocalizedDevice>> = {
  uz: new Map(localeDocuments.uz.devices.map((device) => [device.id, device])),
  en: new Map(localeDocuments.en.devices.map((device) => [device.id, device])),
  ru: new Map(localeDocuments.ru.devices.map((device) => [device.id, device])),
  tr: new Map(localeDocuments.tr.devices.map((device) => [device.id, device])),
};

export function localizeEquipment(device: Equipment, locale: Locale): Equipment {
  return deviceMaps[locale].get(device.id)?.equipment ?? device;
}

export function localizeLearning(
  learning: LearningContent | undefined,
  deviceId: string,
  locale: Locale,
): LearningContent | undefined {
  if (!learning) return undefined;
  const translated = deviceMaps[locale].get(deviceId)?.learning;
  return translated
    ? { ...translated, number: learning.number, sourceKind: "learning" }
    : learning;
}

export function localizePurchase(
  purchase: PurchaseContent | undefined,
  deviceId: string,
  locale: Locale,
): PurchaseContent | undefined {
  if (!purchase) return undefined;
  const translated = deviceMaps[locale].get(deviceId)?.purchase;
  return translated
    ? { ...translated, number: purchase.number, sourceKind: "purchase" }
    : purchase;
}

export function getTranslationCoverage(locale: Locale = "uz") {
  return deviceMaps[locale].size;
}
