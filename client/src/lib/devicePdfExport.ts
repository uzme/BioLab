import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import type { Equipment } from "@/lib/equipmentData";
import { loadLearningContent, loadPurchaseContent, resolveDeviceContent, type LearningContent, type PurchaseContent } from "@/lib/learningData";
import { getDeviceQrDataUrl } from "@/lib/deviceQr";
import { equipmentImages } from "@/lib/equipmentImages";
import type { Locale } from "@/contexts/LanguageContext";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 44;
const BODY_WIDTH = PAGE_WIDTH - MARGIN * 2;
const MONTHS = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
} as const;

export type DevicePdfShareResult = "shared" | "downloaded" | "cancelled";
export type PdfTheme = "light" | "dark";

function formatPdfDate(date: Date, locale: Locale) {
  const day = String(date.getDate()).padStart(2, "0");
  if (locale === "en") return `${MONTHS.en[date.getMonth()]} ${day}, ${date.getFullYear()}`;
  return `${day}-${MONTHS[locale][date.getMonth()]} ${date.getFullYear()}`;
}

type DossierSection = { number: number; title: string; content: string };
type PdfPalette = { page: ReturnType<typeof rgb>; surface: ReturnType<typeof rgb>; border: ReturnType<typeof rgb>; header: ReturnType<typeof rgb>; accent: ReturnType<typeof rgb>; accentSoft: ReturnType<typeof rgb>; heading: ReturnType<typeof rgb>; body: ReturnType<typeof rgb>; muted: ReturnType<typeof rgb>; divider: ReturnType<typeof rgb>; };

function getActivePdfTheme(): PdfTheme {
  return typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getPdfPalette(theme: PdfTheme): PdfPalette {
  return theme === "dark"
    ? { page: rgb(0.015, 0.035, 0.04), surface: rgb(0.045, 0.105, 0.11), border: rgb(0.17, 0.43, 0.4), header: rgb(0.01, 0.08, 0.085), accent: rgb(0.32, 0.9, 0.8), accentSoft: rgb(0.57, 0.92, 0.84), heading: rgb(0.91, 0.98, 0.95), body: rgb(0.76, 0.88, 0.84), muted: rgb(0.61, 0.77, 0.72), divider: rgb(0.2, 0.43, 0.4) }
    : { page: rgb(1, 1, 1), surface: rgb(0.94, 0.98, 0.97), border: rgb(0.71, 0.86, 0.81), header: rgb(0.025, 0.16, 0.16), accent: rgb(0.05, 0.57, 0.51), accentSoft: rgb(0.56, 0.92, 0.83), heading: rgb(0.04, 0.27, 0.27), body: rgb(0.22, 0.36, 0.34), muted: rgb(0.24, 0.42, 0.39), divider: rgb(0.82, 0.9, 0.87) };
}

export function toPdfText(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/[ʻʼ‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ");
}

async function embedHeroImage(pdf: PDFDocument, deviceId: string) {
  if (typeof document === "undefined" || typeof Image === "undefined") return undefined;
  const imageUrl = equipmentImages[deviceId]?.url;
  if (!imageUrl) return undefined;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return undefined;
    const sourceBlob = await response.blob();
    const objectUrl = URL.createObjectURL(sourceBlob);
    try {
      const image = new Image();
      image.decoding = "async";
      image.src = objectUrl;
      await image.decode();
      const maxWidth = 900;
      const width = Math.min(maxWidth, image.naturalWidth || maxWidth);
      const height = Math.max(1, Math.round(width * (image.naturalHeight || 9) / (image.naturalWidth || 16)));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return undefined;
      context.drawImage(image, 0, 0, width, height);
      const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!pngBlob) return undefined;
      return await pdf.embedPng(new Uint8Array(await pngBlob.arrayBuffer()));
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return undefined;
  }
}

function wrapText(value: string, font: PDFFont, size: number, maxWidth: number) {
  const words = toPdfText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      return;
    }
    lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function filenameToken(exportedAt: Date) {
  return exportedAt.toISOString().slice(0, 10);
}

export function getDevicePdfFilename(device: Equipment, exportedAt = new Date()) {
  return `BioLab_${device.id}_oquv_dosyesi_${filenameToken(exportedAt)}.pdf`;
}

function getSections(learning: LearningContent | undefined, device: Equipment, locale: Locale): DossierSection[] {
  const labels = locale === "en"
    ? ["Equipment name", "Original name, manufacturer and model", "What is the equipment?", "What does it do?", "Operating principle", "Learning outcomes", "Main parts", "Sample preparation", "Step-by-step workflow", "Reading and interpreting results", "Common mistakes", "Safety", "Cleaning and daily maintenance", "Calibration and troubleshooting", "Practical learning exercises", "Reliable learning sources"]
    : locale === "ru"
      ? ["Название установки", "Оригинальное название, производитель и модель", "Что это за установка?", "Что она делает?", "Принцип работы", "Результаты обучения", "Основные части", "Подготовка образца", "Пошаговый рабочий процесс", "Чтение и интерпретация результатов", "Типичные ошибки", "Безопасность", "Очистка и ежедневное обслуживание", "Калибровка и устранение неисправностей", "Практические упражнения", "Надёжные учебные источники"]
      : ["Qurilmaning o‘zbekcha nomi", "Original nomi, manufacturer va model", "Qurilma nima?", "Qurilma nima qiladi?", "Ishlash prinsipi", "Nimalarni o‘rganish mumkin?", "Qurilmaning asosiy qismlari", "Namuna tayyorlash", "Qanday ishlatiladi - bosqichma-bosqich", "Natijani o‘qish va talqin qilish", "Eng ko‘p uchraydigan xatolar", "Xavfsizlik", "Tozalash va kundalik xizmat", "Kalibratsiya va troubleshooting", "O‘rganish uchun amaliy mashqlar", "Ishonchli o‘quv manbalari"];
  const fallback = locale === "en" ? "Learning information is temporarily unavailable." : locale === "ru" ? "Учебная информация временно недоступна." : "O‘quv ma’lumoti vaqtincha yuklanmadi.";
  if (!learning) {
    return [{ number: 1, title: labels[0], content: device.description || device.purpose || fallback }];
  }

  return [
    { number: 1, title: labels[0], content: learning.title },
    { number: 2, title: labels[1], content: `${locale === "en" ? "Original name" : locale === "ru" ? "Оригинальное название" : "Original nomi"}: ${learning.originalName}\n${locale === "ru" ? "Производитель" : locale === "en" ? "Manufacturer" : "Manufacturer"}: ${learning.manufacturer}\n${locale === "ru" ? "Модель" : "Model"}: ${learning.model}` },
    { number: 3, title: labels[2], content: learning.whatIs },
    { number: 4, title: labels[3], content: learning.whatItDoes },
    { number: 5, title: labels[4], content: learning.principle },
    { number: 6, title: labels[5], content: learning.learningOutcomes },
    { number: 7, title: labels[6], content: learning.mainParts },
    { number: 8, title: labels[7], content: learning.samplePreparation },
    { number: 9, title: labels[8], content: learning.workflow },
    { number: 10, title: labels[9], content: learning.resultInterpretation },
    { number: 11, title: labels[10], content: learning.commonMistakes },
    { number: 12, title: labels[11], content: learning.safety },
    { number: 13, title: labels[12], content: learning.maintenance },
    { number: 14, title: labels[13], content: learning.calibrationTroubleshooting },
    { number: 15, title: labels[14], content: learning.practice },
    { number: 16, title: labels[15], content: learning.sources.map((source) => `${source.label}: ${source.note}${source.url ? ` (${source.url})` : ""}`).join("\n\n") || (locale === "en" ? "No source information provided." : locale === "ru" ? "Информация об источнике не указана." : "Manba ma’lumoti ko‘rsatilmagan.") },
  ];
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function drawHeader(page: PDFPage, bold: PDFFont, regular: PDFFont, device: Equipment, continuation: boolean, palette: PdfPalette, locale: Locale) {
  const copy = locale === "en" ? { dossier: "BIO.LAB / INDIVIDUAL LEARNING DOSSIER", continuation: "CONTINUED", sections: "16-SECTION SOP" } : locale === "ru" ? { dossier: "BIO.LAB / ИНДИВИДУАЛЬНОЕ УЧЕБНОЕ ДОСЬЕ", continuation: "ПРОДОЛЖЕНИЕ", sections: "SOP ИЗ 16 РАЗДЕЛОВ" } : { dossier: "BIO.LAB / INDIVIDUAL O‘QUV DOSYESI", continuation: "DAVOMI", sections: "16 BO‘LIMLI SOP" };
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 92, width: PAGE_WIDTH, height: 92, color: palette.header });
  page.drawText(toPdfText(copy.dossier), { x: MARGIN, y: PAGE_HEIGHT - 42, size: 8.5, font: bold, color: palette.accentSoft });
  page.drawText(toPdfText(`${device.id}  |  ${continuation ? copy.continuation : copy.sections}`), { x: MARGIN, y: PAGE_HEIGHT - 63, size: 8.2, font: regular, color: palette.accentSoft });
}

export async function buildDevicePdf(device: Equipment, learning: LearningContent | undefined, purchase: PurchaseContent | undefined, exportedAt = new Date(), theme: PdfTheme = getActivePdfTheme(), locale: Locale = "uz") {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`BioLab — ${device.name}`);
  pdf.setAuthor("BioLab Interactive Guide");
  pdf.setSubject(`${device.id} uchun 16 bo‘limli o‘quv dosyesi`);
  pdf.setCreationDate(exportedAt);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const palette = getPdfPalette(theme);
  const qrDataUrl = await getDeviceQrDataUrl(device.id);
  const qrBytes = await fetch(qrDataUrl).then((response) => response.arrayBuffer());
  const qrImage = await pdf.embedPng(qrBytes);
  const heroImage = await embedHeroImage(pdf, device.id);
  const pages: PDFPage[] = [];
  let page!: PDFPage;
  let cursorY = 0;

  const createPage = (continuation = false) => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pages.push(page);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: palette.page });
    drawHeader(page, bold, regular, device, continuation, palette, locale);
    cursorY = continuation ? PAGE_HEIGHT - 118 : PAGE_HEIGHT - 315;
  };

  createPage();
  page.drawRectangle({ x: MARGIN, y: PAGE_HEIGHT - 292, width: BODY_WIDTH, height: 166, color: palette.surface, borderColor: palette.border, borderWidth: 0.8 });
  if (heroImage) {
    const heroSize = heroImage.scaleToFit(126, 86);
    page.drawRectangle({ x: MARGIN + 16, y: PAGE_HEIGHT - 276, width: 132, height: 94, color: palette.page, borderColor: palette.border, borderWidth: 0.6 });
    page.drawImage(heroImage, { x: MARGIN + 19 + (126 - heroSize.width) / 2, y: PAGE_HEIGHT - 272 + (82 - heroSize.height) / 2, width: heroSize.width, height: heroSize.height });
  }
  const coverTextX = MARGIN + 158;
  page.drawText(toPdfText(learning?.title || device.name), { x: coverTextX, y: PAGE_HEIGHT - 161, size: 18, font: bold, color: palette.heading, maxWidth: BODY_WIDTH - 296, lineHeight: 22 });
  page.drawImage(qrImage, { x: PAGE_WIDTH - MARGIN - 104, y: PAGE_HEIGHT - 278, width: 90, height: 90 });
  page.drawText("Skan qiling: detail oynasi", { x: PAGE_WIDTH - MARGIN - 118, y: PAGE_HEIGHT - 284, size: 7.1, font: bold, color: palette.accent, maxWidth: 118 });
  const profileLines = [
    `${device.id}  |  ${device.category}`,
    `${locale === "ru" ? "Модель" : "Model"}: ${learning?.model || device.model}`,
    `${locale === "ru" ? "Производитель" : locale === "en" ? "Manufacturer" : "Manufacturer"}: ${learning?.manufacturer || device.brands || (locale === "en" ? "Not specified" : locale === "ru" ? "Не указан" : "Aniqlanmagan")}`,
    `${locale === "en" ? "Export date" : locale === "ru" ? "Дата экспорта" : "Eksport sanasi"}: ${formatPdfDate(exportedAt, locale)}`,
  ];
  profileLines.forEach((line, index) => page.drawText(toPdfText(line), { x: coverTextX, y: PAGE_HEIGHT - 222 - index * 15, size: 8.5, font: index === 0 ? bold : regular, color: index === 0 ? palette.accent : palette.muted, maxWidth: BODY_WIDTH - 296 }));

  const ensureSpace = (height: number) => {
    if (cursorY - height < MARGIN + 42) createPage(true);
  };

  const drawSection = (section: DossierSection) => {
    const title = `${String(section.number).padStart(2, "0")}. ${section.title}`;
    const titleLines = wrapText(title, bold, 11.5, BODY_WIDTH - 28);
    const bodyLines = section.content.split(/\n{2,}|\n/).flatMap((paragraph) => wrapText(paragraph, regular, 9.1, BODY_WIDTH - 28));
    ensureSpace(24 + titleLines.length * 14 + Math.min(bodyLines.length, 5) * 12 + 20);

    page.drawRectangle({ x: MARGIN, y: cursorY - 5, width: 4, height: 18, color: palette.accent });
    let textY = cursorY;
    titleLines.forEach((line) => {
      page.drawText(line, { x: MARGIN + 14, y: textY, size: 11.5, font: bold, color: palette.heading });
      textY -= 14;
    });
    cursorY = textY - 4;
    bodyLines.forEach((line) => {
      if (cursorY < MARGIN + 46) {
        createPage(true);
      }
      page.drawText(line, { x: MARGIN + 14, y: cursorY, size: 9.1, font: regular, color: palette.body });
      cursorY -= 12;
    });
    cursorY -= 16;
    if (cursorY > MARGIN + 42) page.drawLine({ start: { x: MARGIN + 14, y: cursorY + 6 }, end: { x: PAGE_WIDTH - MARGIN, y: cursorY + 6 }, thickness: 0.45, color: palette.divider });
  };

  getSections(learning, device, locale).forEach(drawSection);
  if (purchase) {
    const purchaseTitle = locale === "en" ? "Purchase and use context" : locale === "ru" ? "Контекст покупки и использования" : "Xarid va foydalanish konteksti";
    drawSection({ number: 17, title: purchaseTitle, content: `${locale === "en" ? "Price benchmark" : locale === "ru" ? "Ценовой ориентир" : "Narx benchmarki"}: ${purchase.price}\n${purchase.priceEvidence}\n\n${locale === "en" ? "Purchase and import" : locale === "ru" ? "Покупка и импорт" : "Xarid va import"}: ${purchase.whereToBuy}\n${purchase.availabilityUz}\n\n${locale === "en" ? "Service and TCO" : locale === "ru" ? "Сервис и TCO" : "Servis va TCO"}: ${purchase.service}\n${purchase.tco}` });
  }

  pages.forEach((pdfPage, index) => {
    pdfPage.drawLine({ start: { x: MARGIN, y: 31 }, end: { x: PAGE_WIDTH - MARGIN, y: 31 }, thickness: 0.6, color: palette.border });
    pdfPage.drawText("© 2026 Mengliyev Bahrom Husanovich  |  BioLab Interactive Guide", { x: MARGIN, y: 18, size: 7.4, font: regular, color: palette.muted });
    pdfPage.drawText(`${index + 1} / ${pages.length}`, { x: PAGE_WIDTH - MARGIN - 24, y: 18, size: 7.4, font: bold, color: palette.accent });
  });

  return new Blob([await pdf.save()], { type: "application/pdf" });
}

export async function shareDevicePdf(device: Equipment, exportedAt = new Date(), theme: PdfTheme = getActivePdfTheme(), locale: Locale = "uz"): Promise<DevicePdfShareResult> {
  const { learning, purchase } = await resolveDeviceContent(loadLearningContent(device.number), loadPurchaseContent(device.number));
  const filename = getDevicePdfFilename(device, exportedAt);
  const blob = await buildDevicePdf(device, learning, purchase, exportedAt, theme, locale);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof File !== "undefined") {
    const file = new File([blob], filename, { type: "application/pdf" });
    const shareData: ShareData = { files: [file], title: `BioLab — ${device.name}`, text: `${device.id} uchun BioLab o‘quv dosyesi` };
    const supportsFiles = typeof navigator.canShare !== "function" || navigator.canShare(shareData);
    if (supportsFiles) {
      try {
        await navigator.share(shareData);
        return "shared";
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return "cancelled";
      }
    }
  }

  triggerDownload(blob, filename);
  return "downloaded";
}
