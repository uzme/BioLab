import { readFile } from "node:fs/promises";

const locales = ["uz", "en", "ru", "tr"] as const;
const expectedIds = Array.from({ length: 100 }, (_, index) => `BIO-${String(index + 1).padStart(3, "0")}`);

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
  return typeof value;
}

const documents = Object.fromEntries(
  await Promise.all(locales.map(async (locale) => [locale, JSON.parse(await readFile(`client/src/lib/generated/${locale}.json`, "utf8"))] as const)),
) as Record<(typeof locales)[number], { devices: Array<Record<string, any>>; interface: Record<string, unknown> }>;

for (const locale of locales) {
  const document = documents[locale];
  if (document.devices.length !== 100) throw new Error(`${locale}: expected 100 devices`);
  if (document.devices.map((device) => device.id).join(",") !== expectedIds.join(",")) throw new Error(`${locale}: device IDs are incomplete or out of order`);
  for (const device of document.devices) {
    if (!device.equipment || !device.learning || !device.purchase) throw new Error(`${locale}/${device.id}: incomplete device record`);
  }
}

for (const key of ["uiText", "categories", "copy"]) {
  const reference = shape(documents.uz.interface[key]);
  for (const locale of locales.slice(1)) {
    if (JSON.stringify(shape(documents[locale].interface[key])) !== JSON.stringify(reference)) {
      throw new Error(`interface.${key}: ${locale} schema differs from uz`);
    }
  }
}

console.log(`Locale validation passed: ${locales.length} languages × ${expectedIds.length} complete devices.`);
