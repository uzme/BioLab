import type { Equipment } from "@/lib/equipmentData";
import type { Locale } from "@/contexts/LanguageContext";

export type PixelAgentSource = Pick<
  Equipment,
  "id" | "name" | "model" | "category" | "description" | "purpose" | "newPrice"
>;

export type PixelAgentReply = {
  text: string;
  sources: PixelAgentSource[];
};

const stopWords = new Set([
  "qaysi", "qanday", "qayerda", "uchun", "haqida", "aytib", "ber", "menga", "bilan",
  "nima", "bu", "shu", "top", "kerak", "mumkin", "mi", "men", "siz", "va", "yoki",
]);

function normalize(value: string) {
  return value
    .toLocaleLowerCase("uz-UZ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string) {
  return normalize(value)
    .split(/[\s-]+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function sourceFromDevice(device: Equipment): PixelAgentSource {
  return {
    id: device.id,
    name: device.name,
    model: device.model,
    category: device.category,
    description: device.description,
    purpose: device.purpose,
    newPrice: device.newPrice,
  };
}

export function searchCatalog(query: string, equipment: Equipment[], limit = 4): Equipment[] {
  const cleaned = normalize(query);
  const queryTokens = tokens(query);
  if (!cleaned) return [];

  return equipment
    .map((device) => {
      const fields = [
        device.id,
        device.name,
        device.model,
        device.models,
        device.brands,
        device.category,
        device.description,
        device.purpose,
      ].map(normalize);
      const searchable = fields.join(" ");
      let score = 0;

      if (normalize(device.id) === cleaned) score += 100;
      if (normalize(device.model).includes(cleaned)) score += 60;
      if (normalize(device.name).includes(cleaned)) score += 50;
      if (normalize(device.category).includes(cleaned)) score += 30;

      queryTokens.forEach((token) => {
        if (normalize(device.id).includes(token)) score += 32;
        if (normalize(device.name).includes(token)) score += 24;
        if (normalize(device.model).includes(token)) score += 22;
        if (searchable.includes(token)) score += 8;
      });

      return { device, score };
    })
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || first.device.number - second.device.number)
    .slice(0, limit)
    .map(({ device }) => device);
}

function hasAny(query: string, words: string[]) {
  const cleaned = normalize(query);
  return words.some((word) => cleaned.includes(normalize(word)));
}

export function buildAgentReply(query: string, equipment: Equipment[], locale: Locale = "uz"): PixelAgentReply {
  const copy = locale === "en"
    ? { empty: "Type a question — I can guide you through 100 BioLab devices, models, purposes, categories and starting prices.", hello: "Hello. I am the BioLab catalog Pixel Agent. Enter a device name, BIO code, model, category or laboratory purpose.", none: "No exact catalog record was found. Try a code such as BIO-001, a device name, model or purpose.", model: "Model", price: "Starting price range for a new device", brands: "Recommended manufacturers", purpose: "Main purpose", more: "more matching records found." }
    : locale === "ru"
      ? { empty: "Введите вопрос — я помогу по 100 установкам BioLab, моделям, назначению, категориям и начальным ценам.", hello: "Здравствуйте. Я Pixel Agent каталога BioLab. Введите название установки, код BIO, модель, категорию или назначение.", none: "Точная запись в каталоге не найдена. Попробуйте код BIO-001, название установки, модель или назначение.", model: "Модель", price: "Начальный диапазон цены новой установки", brands: "Рекомендуемые производители", purpose: "Основное назначение", more: "похожих записей найдено." }
      : locale === "tr"
        ? { empty: "Bir soru yazın — 100 BioLab cihazı, model, amaç, kategori ve başlangıç fiyatı konusunda yardımcı olabilirim.", hello: "Merhaba. Ben BioLab kataloğunun Pixel Agent'ıyım. Cihaz adı, BIO kodu, model, kategori veya laboratuvar amacını yazın.", none: "Katalogda tam bir kayıt bulunamadı. BIO-001 gibi bir kod, cihaz adı, model veya amaç deneyin.", model: "Model", price: "Yeni cihaz için başlangıç fiyat aralığı", brands: "Önerilen üreticiler", purpose: "Temel kullanım amacı", more: "benzer kayıt bulundu." }
        : { empty: "Savolingizni yozing — men 100 ta BioLab qurilmasi, model, maqsad, kategoriya va boshlang‘ich narx bo‘yicha tezkor katalog yo‘l-yo‘riq beraman.", hello: "Salom. Men BioLab katalogining Pixel Agentiman. Qurilma nomi, BIO kodi, model, kategoriya yoki laboratoriya vazifasini yozing.", none: "Bu so‘rov bo‘yicha katalogdan aniq rekord topilmadi. BIO-001 kabi kod, qurilma nomi, model yoki vazifa bilan qayta urinib ko‘ring.", model: "Modeli", price: "Yangi qurilma uchun ko‘rsatilgan boshlang‘ich diapazon", brands: "Tavsiya etilgan ishlab chiqaruvchilar", purpose: "Asosiy vazifasi", more: "ta yaqin rekord topildi." };
  const cleaned = normalize(query);
  if (!cleaned) {
    return { text: copy.empty, sources: [] };
  }

  if (hasAny(cleaned, ["salom", "assalom", "hello"])) {
    return {
      text: copy.hello,
      sources: [],
    };
  }

  const matches = searchCatalog(query, equipment);
  if (matches.length === 0) {
    return {
      text: copy.none,
      sources: [],
    };
  }

  const primary = matches[0];
  const detail = hasAny(cleaned, ["model", "rusum", "nomi"])
    ? `${copy.model}: ${primary.model}.`
    : hasAny(cleaned, ["narx", "qancha", "budjet"])
      ? `${copy.price}: ${primary.newPrice}.`
      : hasAny(cleaned, ["brend", "ishlab chiqaruvchi", "manufacturer"])
        ? `${copy.brands}: ${primary.brands}.`
        : hasAny(cleaned, ["maqsad", "vazifa", "nima qiladi", "ishlatiladi"])
          ? `${copy.purpose}: ${primary.purpose}.`
          : primary.description;
  const extra = matches.length > 1 ? ` ${matches.length - 1} ${copy.more}` : "";

  return {
    text: `${primary.id} — ${primary.name} (${primary.category}). ${detail}${extra}`,
    sources: matches.map(sourceFromDevice),
  };
}

export function getQuickPrompts(locale: Locale = "uz") {
  if (locale === "en") return ["Tell me about BIO-001", "Which centrifuge model?", "What is needed for DNA amplification?", "How much is ELISA?"];
  if (locale === "ru") return ["Расскажите о BIO-001", "Какая модель центрифуги?", "Что нужно для амплификации ДНК?", "Сколько стоит ELISA?"];
  if (locale === "tr") return ["BIO-001 hakkında bilgi ver", "Hangi santrifüj modeli?", "DNA amplifikasyonu için ne gerekir?", "ELISA fiyatı nedir?"];
  return ["BIO-001 haqida ayt", "Sentrifuga qaysi model?", "DNK amplifikatsiyasi uchun nima kerak?", "ELISA narxi qancha?"];
}
