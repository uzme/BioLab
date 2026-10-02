import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { Equipment } from "@/lib/equipmentData";
import type { Locale } from "@/contexts/LanguageContext";

const PDF_PAGE_WIDTH = 595.28;
const PDF_PAGE_HEIGHT = 841.89;
const PDF_MARGIN = 44;
export type PdfTheme = "light" | "dark";
type PdfPalette = { page: ReturnType<typeof rgb>; entryEven: ReturnType<typeof rgb>; entryOdd: ReturnType<typeof rgb>; border: ReturnType<typeof rgb>; header: ReturnType<typeof rgb>; accent: ReturnType<typeof rgb>; heading: ReturnType<typeof rgb>; body: ReturnType<typeof rgb>; muted: ReturnType<typeof rgb>; };

function getActivePdfTheme(): PdfTheme {
  return typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getPdfPalette(theme: PdfTheme): PdfPalette {
  return theme === "dark"
    ? { page: rgb(0.015, 0.035, 0.04), entryEven: rgb(0.045, 0.105, 0.11), entryOdd: rgb(0.035, 0.075, 0.08), border: rgb(0.17, 0.43, 0.4), header: rgb(0.01, 0.08, 0.085), accent: rgb(0.57, 0.91, 0.83), heading: rgb(0.91, 0.98, 0.95), body: rgb(0.76, 0.88, 0.84), muted: rgb(0.61, 0.77, 0.72) }
    : { page: rgb(1, 1, 1), entryEven: rgb(0.95, 0.98, 0.97), entryOdd: rgb(1, 1, 1), border: rgb(0.78, 0.88, 0.84), header: rgb(0.02, 0.16, 0.16), accent: rgb(0.57, 0.91, 0.83), heading: rgb(0.05, 0.24, 0.25), body: rgb(0.27, 0.44, 0.42), muted: rgb(0.33, 0.48, 0.45) };
}
const EXPORT_DATE_LOCALES: Record<Locale, string> = { uz: "uz-UZ", en: "en-US", ru: "ru-RU", tr: "tr-TR" };

function formatExportDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(EXPORT_DATE_LOCALES[locale], { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function exportDateToken(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getBookmarksPdfFilename(exportedAt = new Date()) {
  return `BioLab_saralanganlar_${exportDateToken(exportedAt)}.pdf`;
}

function quoteCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function toPdfText(value: string) {
  return value
    .replace(/[ʻʼ‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ");
}

function wrapPdfText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = toPdfText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !line) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
  }

  if (line) lines.push(line);
  return lines.length ? lines : [""];
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

function drawPdfHeader(page: PDFPage, bold: PDFFont, regular: PDFFont, deviceCount: number, exportedAt: Date, palette: PdfPalette, locale: Locale) {
  const copy = locale === "en" ? { eyebrow: "BIO.LAB / BOOKMARKS", title: "Bookmarked equipment", count: "equipment" } : locale === "ru" ? { eyebrow: "BIO.LAB / СОХРАНЁННЫЕ", title: "Сохранённые установки", count: "установок" } : locale === "tr" ? { eyebrow: "BIO.LAB / YER İŞARETLİLERİ", title: "İşaretli cihazlar", count: "cihaz" } : { eyebrow: "BIO.LAB / SARALANGANLAR", title: "Saralangan qurilmalar ro‘yxati", count: "ta qurilma" };
  page.drawRectangle({ x: 0, y: PDF_PAGE_HEIGHT - 116, width: PDF_PAGE_WIDTH, height: 116, color: palette.header });
  page.drawText(toPdfText(copy.eyebrow), { x: PDF_MARGIN, y: PDF_PAGE_HEIGHT - 48, size: 9, font: bold, color: palette.accent });
  page.drawText(toPdfText(copy.title), { x: PDF_MARGIN, y: PDF_PAGE_HEIGHT - 78, size: 19, font: bold, color: palette.heading });
  const subtitle = `${deviceCount} ${copy.count}  |  ${formatExportDate(exportedAt, locale)}`;
  page.drawText(toPdfText(subtitle), { x: PDF_MARGIN, y: PDF_PAGE_HEIGHT - 97, size: 8.5, font: regular, color: palette.body });
}

export function buildBookmarksCsv(devices: Equipment[], exportedAt = new Date(), locale: Locale = "uz") {
  const labels = locale === "en" ? ["BioLab Interactive Guide — Bookmarked equipment", "Export date", "No.", "Code", "Equipment name", "Category", "Model", "Manufacturer"] : locale === "ru" ? ["BioLab Interactive Guide — Сохранённые установки", "Дата экспорта", "№", "Код", "Название установки", "Категория", "Модель", "Производитель"] : ["BioLab Interactive Guide — Saralangan qurilmalar", "Eksport sanasi", "Tartib", "Kod", "Qurilma nomi", "Kategoriya", "Model", "Ishlab chiqaruvchi"];
  const rows = [
    [labels[0]],
    [`${labels[1]}: ${formatExportDate(exportedAt, locale)}`],
    [],
    labels.slice(2),
    ...devices.map((device, index) => [
      index + 1,
      device.id,
      device.name,
      device.category,
      device.model,
      device.brands,
    ]),
  ];

  return `\uFEFF${rows.map((row) => row.map(quoteCsv).join(",")).join("\r\n")}\r\n`;
}

export async function buildBookmarksPdf(devices: Equipment[], exportedAt = new Date(), theme: PdfTheme = getActivePdfTheme(), locale: Locale = "uz") {
  const pdf = await PDFDocument.create();
  pdf.setTitle("BioLab — Saralangan qurilmalar");
  pdf.setAuthor("BioLab Interactive Guide");
  pdf.setSubject("Foydalanuvchi saralangan qurilmalari");
  pdf.setCreationDate(exportedAt);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const palette = getPdfPalette(theme);
  const pages: PDFPage[] = [];
  const createPage = () => {
    const page = pdf.addPage([PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PDF_PAGE_WIDTH, height: PDF_PAGE_HEIGHT, color: palette.page });
    drawPdfHeader(page, bold, regular, devices.length, exportedAt, palette, locale);
    pages.push(page);
    return { page, cursorY: PDF_PAGE_HEIGHT - 144 };
  };

  let { page, cursorY } = createPage();
  const contentWidth = PDF_PAGE_WIDTH - PDF_MARGIN * 2;

  devices.forEach((device, index) => {
    const nameLines = wrapPdfText(`${index + 1}. ${device.id} — ${device.name}`, bold, 11, contentWidth - 28);
    const modelLines = wrapPdfText(`${device.category}  |  ${device.model}`, regular, 8.5, contentWidth - 28);
    const entryHeight = 18 + nameLines.length * 14 + modelLines.length * 11 + 14;

    if (cursorY - entryHeight < PDF_MARGIN + 25) {
      ({ page, cursorY } = createPage());
    }

    page.drawRectangle({
      x: PDF_MARGIN,
      y: cursorY - entryHeight,
      width: contentWidth,
      height: entryHeight,
      color: index % 2 === 0 ? palette.entryEven : palette.entryOdd,
      borderColor: palette.border,
      borderWidth: 0.6,
    });

    let textY = cursorY - 18;
    nameLines.forEach((line) => {
      page.drawText(line, { x: PDF_MARGIN + 14, y: textY, size: 11, font: bold, color: palette.heading });
      textY -= 14;
    });
    modelLines.forEach((line) => {
      page.drawText(line, { x: PDF_MARGIN + 14, y: textY, size: 8.5, font: regular, color: palette.body });
      textY -= 11;
    });
    cursorY -= entryHeight + 9;
  });

  pages.forEach((pdfPage, index) => {
    pdfPage.drawLine({ start: { x: PDF_MARGIN, y: 31 }, end: { x: PDF_PAGE_WIDTH - PDF_MARGIN, y: 31 }, thickness: 0.6, color: palette.border });
    pdfPage.drawText(`BioLab Interactive Guide  |  ${index + 1} / ${pages.length}`, { x: PDF_MARGIN, y: 18, size: 8, font: regular, color: palette.muted });
  });

  return new Blob([await pdf.save()], { type: "application/pdf" });
}

export function downloadBookmarksCsv(devices: Equipment[], locale: Locale = "uz") {
  triggerDownload(
    new Blob([buildBookmarksCsv(devices, new Date(), locale)], { type: "text/csv;charset=utf-8" }),
    `BioLab_saralanganlar_${exportDateToken()}.csv`,
  );
}

export async function downloadBookmarksPdf(devices: Equipment[], theme: PdfTheme = getActivePdfTheme(), locale: Locale = "uz") {
  triggerDownload(await buildBookmarksPdf(devices, new Date(), theme, locale), getBookmarksPdfFilename());
}

export type PdfShareResult = "shared" | "downloaded" | "cancelled";

export async function shareBookmarksPdf(devices: Equipment[], exportedAt = new Date(), theme: PdfTheme = getActivePdfTheme(), locale: Locale = "uz"): Promise<PdfShareResult> {
  const filename = getBookmarksPdfFilename(exportedAt);
  const pdfBlob = await buildBookmarksPdf(devices, exportedAt, theme, locale);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof File !== "undefined") {
    const file = new File([pdfBlob], filename, { type: "application/pdf" });
    const shareData: ShareData = {
      files: [file],
      title: "BioLab — Saralangan qurilmalar",
      text: `${devices.length} ta saralangan BioLab qurilmasi ro‘yxati`,
    };
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

  triggerDownload(pdfBlob, filename);
  return "downloaded";
}
