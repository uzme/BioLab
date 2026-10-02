import translations from "./generated/catalogTranslations.json";
import type { Locale } from "@/contexts/LanguageContext";
import type { Equipment } from "@/lib/equipmentData";
import type { LearningContent, PurchaseContent } from "@/lib/learningData";

type TranslationRecord = {
  id: string;
  en: { equipment: Partial<Equipment>; learning: Partial<LearningContent> | null; purchase: Partial<PurchaseContent> | null };
  ru: { equipment: Partial<Equipment>; learning: Partial<LearningContent> | null; purchase: Partial<PurchaseContent> | null };
  tr: { equipment: Partial<Equipment>; learning: Partial<LearningContent> | null; purchase: Partial<PurchaseContent> | null };
};

const translationMap = new Map((translations as TranslationRecord[]).map((record) => [record.id, record]));

export function localizeEquipment(device: Equipment, locale: Locale): Equipment {
  if (locale === "uz") return device;
  const record = translationMap.get(device.id)?.[locale];
  return record ? { ...device, ...record.equipment, id: device.id, number: device.number, model: device.model, models: device.models, brands: device.brands, slug: device.slug } : device;
}

export function localizeLearning(learning: LearningContent | undefined, deviceId: string, locale: Locale): LearningContent | undefined {
  if (!learning || locale === "uz") return learning;
  const translated = translationMap.get(deviceId)?.[locale].learning;
  return translated ? { ...learning, ...translated, number: learning.number, sourceKind: "learning" } : learning;
}

export function localizePurchase(purchase: PurchaseContent | undefined, deviceId: string, locale: Locale): PurchaseContent | undefined {
  if (!purchase || locale === "uz") return purchase;
  const translated = translationMap.get(deviceId)?.[locale].purchase;
  return translated ? { ...purchase, ...translated, number: purchase.number, sourceKind: "purchase" } : purchase;
}

export function getTranslationCoverage() {
  return translationMap.size;
}
