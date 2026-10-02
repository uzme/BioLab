import { chromium } from "playwright";

const previewUrl = "http://127.0.0.1:3000/";
const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const cardCodes = async () => page.locator("article.equipment-card [data-equipment-code]").allTextContents();
const enterLab = async (targetPage) => {
  await targetPage.locator("[data-lab-entry-action]").click();
  await targetPage.locator("[data-hero-surface]").waitFor({ state: "visible" });
};

await page.goto(previewUrl, { waitUntil: "networkidle" });
await enterLab(page);
const carousel = page.locator("section.pure3d-carousel");
await carousel.waitFor();
assert(await carousel.getAttribute("data-carousel-axis") === "horizontal", "Karusel gorizontal o‘q sifatida belgilanmagan.");
assert(await carousel.locator("[data-carousel-scene]").count() === 1, "Karuselning gorizontal sahnasi topilmadi.");
assert(await carousel.locator(".a3d .card").count() === 12, "Birinchi gorizontal karusel to‘plamida 12 ta karta kutilgan.");
await page.getByRole("button", { name: "Keyingi carousel sahifasi" }).click();
await page.getByText("TO‘PLAM", { exact: true }).waitFor();
assert((await carousel.locator(".carousel-page").innerText()).includes("2"), "Karuselning keyingi gorizontal to‘plamiga o‘tish ishlamadi.");
const carouselMotionToggle = page.getByRole("button", { name: "Gorizontal aylanishni to‘xtatish" });
await carouselMotionToggle.click();
assert(await carousel.getAttribute("data-carousel-motion") === "paused", "Karusel aylanishi pause holatiga o‘tmadi.");
await page.getByRole("button", { name: "Gorizontal aylanishni davom ettirish" }).click();
assert(await carousel.getAttribute("data-carousel-motion") === "running", "Karusel aylanishi davom ettirilmadi.");
await page.locator("#catalog").scrollIntoViewIfNeeded();

const filterTrigger = page.getByRole("button", { name: "Kengaytirilgan katalog filtrlari" });
await filterTrigger.click();
await page.getByRole("heading", { name: "Katalog filtrlari" }).waitFor();
const drawerSearch = page.getByPlaceholder("Masalan, PCR yoki Bio-Rad");
await drawerSearch.fill("PCR");
assert((await page.locator("article.equipment-card").count()) > 0, "Filter drawer ichidagi qidiruv PCR natijasini bermadi.");
await page.getByRole("button", { name: "Filtrni qo‘llash" }).click();
await page.getByRole("button", { name: "Qidiruvni tozalash" }).click();
await page.waitForFunction(() => document.querySelectorAll("article.equipment-card").length === 100);
await page.getByRole("button", { name: "Sozlamalar va mualliflik huquqi" }).click();
await page.getByRole("heading", { name: "Sozlamalar va huquqiy ma’lumot" }).waitFor();
assert(await page.getByText("Qat’iy Mualliflik Huquqi va Intellektual Mulk Himoyasi").isVisible(), "Sozlamalar dialogidagi copyright/shaffoflik bloki topilmadi.");
assert(await page.getByText("Litsenziya va rasm manbasi shaffofligi").isVisible(), "Litsenziya va rasm manbasi bloki topilmadi.");
assert((await page.getByText("© 2026 Mengliyev Bahrom Husanovich", { exact: true }).count()) >= 2, "Copyright yili va muallifning to‘liq ismi ko‘rsatilmagan.");
assert((await page.getByText("Mengliyev Bahrom Husanovich", { exact: true }).count()) >= 2, "Muallifning to‘liq ismi Copyright oynasidagi qonuniy bloklarda ko‘rsatilmagan.");
assert(await page.getByText("CSV eksport").isVisible() && await page.getByText("PDF eksport").isVisible() && await page.getByText("JSON eksport").isVisible() && await page.getByText("JSON import").isVisible(), "Xatcho‘p CSV/PDF/JSON eksport-import boshqaruvlari topilmadi.");
const themeToggle = page.getByRole("button", { name: "Rang mavzusini qo‘lda almashtirish" }).last();
await themeToggle.click();
await page.waitForFunction(() => ["light", "dark"].includes(localStorage.getItem("biolab-theme-preference") ?? ""));
await themeToggle.click();
const motionToggle = page.getByRole("switch", { name: "Kamroq animatsiyani almashtirish" });
await motionToggle.click();
await page.waitForFunction(() => localStorage.getItem("biolab-reduced-motion") === "true");
assert(await page.locator("html").evaluate((html) => html.classList.contains("reduce-motion")), "Foydalanuvchi tanlagan kam-harakat klassi HTMLga qo‘llanmadi.");
const userReducedMotionDuration = await page.locator("section.pure3d-carousel .card-shell").first().evaluate((card) => getComputedStyle(card).transitionDuration);
assert(Number.parseFloat(userReducedMotionDuration) <= 0.00001, `Foydalanuvchi kam-harakat rejimida karusel transitioni o‘chmadi: ${userReducedMotionDuration}`);
await motionToggle.click();
const clearBookmarksButton = page.getByRole("button", { name: "Xatcho‘plarni tozalash" });
await clearBookmarksButton.click();
await page.getByText("Saralangan qurilmalar ro‘yxati allaqachon bo‘sh.").waitFor();
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "JSON eksport" }).click();
const download = await downloadPromise;
assert(download.suggestedFilename().endsWith(".json"), "Xatcho‘p eksporti JSON fayl yaratmadi.");

const bookmarkImportInput = page.locator('input[aria-label="Xatcho‘plar JSON faylini tanlash"]');
await bookmarkImportInput.setInputFiles("scripts/tests/fixtures/bookmarks-import.json");
const importSuccessMessage = "1 ta qurilma import qilindi, 1 ta noma’lum ID e’tiborsiz qoldirildi.";
await page.getByText(importSuccessMessage, { exact: true }).waitFor();
await page.getByText("1 ta xatcho‘p faol", { exact: true }).waitFor();
await page.waitForFunction(() => JSON.parse(localStorage.getItem("biolab-guide:bookmarks:v1") ?? "[]").includes("BIO-001"));
assert(await page.getByText(importSuccessMessage, { exact: true }).count() === 1, "Valid JSON import uchun dublikat success toast qoldi.");
assert(await page.getByText("1 ta xatcho‘p faol", { exact: true }).isVisible(), "Importdan keyin SettingsDialog xatcho‘p counti yangilanmadi.");

const csvDownloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "CSV eksport" }).click();
const csvDownload = await csvDownloadPromise;
assert(csvDownload.suggestedFilename().endsWith(".csv"), "Saralanganlar CSV fayli yaratilmagan.");

const pdfDownloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "PDF eksport" }).click();
const pdfDownload = await pdfDownloadPromise;
assert(pdfDownload.suggestedFilename().endsWith(".pdf"), "Saralanganlar PDF fayli yaratilmagan.");

await bookmarkImportInput.setInputFiles({ name: "invalid-bookmarks.json", mimeType: "application/json", buffer: Buffer.from("{invalid-json") });
await page.getByText("Xatcho‘plar faylini import qilib bo‘lmadi.").waitFor();
assert(await page.getByText("Xatcho‘plar faylini import qilib bo‘lmadi.").isVisible(), "Invalid JSON import xatoligi ko‘rsatilmagan.");

page.once("dialog", (dialog) => dialog.accept());
await page.getByRole("button", { name: "Xatcho‘plarni tozalash" }).click();
await page.getByText("Saralangan qurilmalar tozalandi.").waitFor();
await page.getByRole("button", { name: "Sozlamalarni yopish" }).click();

const priorityImages = page.locator("article.equipment-card img[loading='eager'][fetchpriority='high']");
assert(await priorityImages.count() === 3, "Birinchi uchta karta rasmi ustuvor yuklanishga belgilanmadi.");
await page.waitForFunction(() => {
  const image = document.querySelector("article.equipment-card img");
  return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0 && getComputedStyle(image).opacity === "1";
}, undefined, { timeout: 10_000 });
assert(await page.locator("article.equipment-card").first().getByText("Rasm yuklanmoqda").count() === 0, "Desktopda birinchi katalog rasmi yuklangandan keyin loading holati yopilmadi.");

let codes = await cardCodes();
assert(codes.length === 100, `Boshlang‘ich katalogda 100 ta karta kutilgan, ${codes.length} ta topildi.`);
assert(codes[0] === "BIO-001" && codes.at(-1) === "BIO-100", `Boshlang‘ich tartib noto‘g‘ri: ${codes[0]} … ${codes.at(-1)}.`);

const deviceSearch = page.getByPlaceholder("Qurilma yoki ishlab chiqaruvchini qidiring…");
await deviceSearch.fill("PCR");
assert((await page.locator("article.equipment-card").count()) > 0, "PCR qidiruvi natija bermadi.");
assert(await page.locator("article.equipment-card img[loading='eager'][fetchpriority='high']").count() === 3, "Filtrlangan natijalarda birinchi uchta hero rasmi ustuvor yuklanishga belgilanmadi.");
await page.getByRole("button", { name: "Qidiruvni tozalash" }).click();
await page.waitForFunction(() => document.querySelector('[placeholder="Qurilma yoki ishlab chiqaruvchini qidiring…"]')?.value === "");
assert(await deviceSearch.inputValue() === "", "Qurilma qidiruvi bekor qilinmadi.");

const modelSearch = page.getByPlaceholder("Model yoki seriyani qidiring…");
await modelSearch.fill("CFX96");
assert((await page.locator("article.equipment-card").count()) > 0, "Model qidiruvi natija bermadi.");
await page.getByRole("button", { name: "Model qidiruvini tozalash" }).click();
await page.waitForFunction(() => document.querySelector('[placeholder="Model yoki seriyani qidiring…"]')?.value === "");
assert(await modelSearch.inputValue() === "", "Model qidiruvi bekor qilinmadi.");

const categorySelect = page.getByLabel("Kategoriya bo‘yicha filtrlash");
await categorySelect.selectOption({ label: "Molekulyar biologiya" });
await page.waitForFunction(() => document.querySelectorAll("article.equipment-card").length === 16);
assert((await page.locator("article.equipment-card").count()) === 16, "Molekulyar biologiya filtri 16 ta kartani qaytarmadi.");
await page.getByRole("button", { name: "Kategoriya tanlovini tozalash" }).click();
await page.waitForFunction(() => document.querySelector('[aria-label="Kategoriya bo‘yicha filtrlash"]')?.value === "Barcha uskunalar");
assert(await categorySelect.inputValue() === "Barcha uskunalar", "Kategoriya filtri qayta tiklanmadi.");

await deviceSearch.fill("mavjud-emas-tekshiruv");
await page.getByText("Qurilma topilmadi").waitFor({ state: "visible" });
assert(await page.getByText("Qurilma topilmadi").isVisible(), "Natija yo‘q holati ko‘rsatilmagan.");
await page.getByRole("button", { name: "Barchasini tozalash" }).click();
await page.waitForFunction(() => {
  const device = document.querySelector('[placeholder="Qurilma yoki ishlab chiqaruvchini qidiring…"]')?.value;
  const model = document.querySelector('[placeholder="Model yoki seriyani qidiring…"]')?.value;
  const category = document.querySelector('[aria-label="Kategoriya bo‘yicha filtrlash"]')?.value;
  return device === "" && model === "" && category === "Barcha uskunalar";
});
assert(await deviceSearch.inputValue() === "" && await modelSearch.inputValue() === "" && await categorySelect.inputValue() === "Barcha uskunalar", "Umumiy tozalash barcha boshqaruvlarni qayta tiklamadi.");

codes = await cardCodes();
assert(codes.length === 100 && codes[0] === "BIO-001" && codes.at(-1) === "BIO-100", "Tozalashdan keyin BIO-001–BIO-100 tartibi tiklanmadi.");

const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });

const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await tabletPage.goto(previewUrl, { waitUntil: "domcontentloaded" });
await enterLab(tabletPage);
const tabletLearningPath = tabletPage.locator("[data-hero-learning-path]");
await tabletLearningPath.waitFor();
const tabletSopLayout = await tabletLearningPath.evaluate((path) => {
  const stages = [...path.querySelectorAll(".landing-map-stages > div")];
  const positions = stages.map((step) => {
    const rect = step.getBoundingClientRect();
    return { width: Math.round(rect.width) };
  });
  return {
    columns: stages.length,
    minimumWidth: Math.min(...positions.map((step) => step.width)),
    labels: [...path.querySelectorAll(".landing-map-stages span")].map((label) => label.textContent?.trim() ?? ""),
  };
});
assert(tabletSopLayout.columns === 4, `Planshetda hero o‘quv xaritasida 4 asosiy bosqich topilmadi: ${tabletSopLayout.columns} ustun.`);
assert(tabletSopLayout.minimumWidth >= 50, `Planshetda hero o‘quv xaritasi bosqichlari juda tor: ${tabletSopLayout.minimumWidth}px`);
assert(tabletSopLayout.labels.join("|") === "Asos|Prinsip|Amaliyot|Manbalar", "Planshetda hero bosqichlari to‘liq yoki tartibli ko‘rinmadi.");
await tabletPage.close();

await mobilePage.goto(previewUrl, { waitUntil: "domcontentloaded" });
await enterLab(mobilePage);
const mobileCarousel = mobilePage.locator("section.pure3d-carousel");
await mobileCarousel.waitFor();
assert(await mobileCarousel.getAttribute("data-carousel-axis") === "horizontal", "Mobil ekranda karusel gorizontal o‘qini yo‘qotdi.");
assert(await mobileCarousel.locator("[data-carousel-scene]").count() === 1, "Mobil karusel sahnasi topilmadi.");
await mobilePage.getByRole("button", { name: "Menyuni ochish" }).click();
await mobilePage.getByRole("button", { name: /Molekulyar biologiya/ }).click();
await mobilePage.waitForFunction(() => document.querySelector('[aria-label="Kategoriya bo‘yicha filtrlash"]')?.value === "Molekulyar biologiya");
await mobilePage.waitForFunction(() => document.querySelectorAll("article.equipment-card").length === 16);
assert(await mobilePage.locator("#catalog").evaluate((element) => element.getBoundingClientRect().top < window.innerHeight), "Mobil sidebar kategoriya tanlovi katalog bo‘limiga olib bormadi.");
assert(await mobilePage.getByRole("button", { name: "Menyuni ochish" }).isVisible(), "Mobil sidebar kategoriya tanlangach yopilmadi.");

await mobilePage.getByRole("button", { name: "Menyuni ochish" }).click();
await mobilePage.getByRole("button", { name: "Sozlamalar va mualliflik huquqi" }).click();
await mobilePage.getByRole("heading", { name: "Sozlamalar va huquqiy ma’lumot" }).waitFor();
await mobilePage.getByRole("button", { name: "Sozlamalarni yopish" }).click();
	await mobilePage.getByRole("button", { name: "Menyuni ochish" }).click();
	await mobilePage.keyboard.press("Escape");
await mobilePage.getByRole("button", { name: "Kengaytirilgan katalog filtrlari" }).click();
await mobilePage.getByRole("heading", { name: "Katalog filtrlari" }).waitFor();
await mobilePage.getByRole("button", { name: "Filtrni qo‘llash" }).click();
await mobilePage.locator("#catalog").scrollIntoViewIfNeeded();
await mobilePage.waitForFunction(() => {
  const image = document.querySelector("article.equipment-card img");
  return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0 && getComputedStyle(image).opacity === "1";
}, undefined, { timeout: 10_000 });
assert(await mobilePage.locator("article.equipment-card img[loading='eager'][fetchpriority='high']").count() === 3, "Mobil ekranda birinchi kartalar uchun rasm priority qoidasi yo‘q.");
assert(await mobilePage.locator("article.equipment-card").first().getByText("Rasm yuklanmoqda").count() === 0, "Mobil ekranda birinchi karta rasm yuklangandan keyin loading holati yopilmadi.");
await mobilePage.close();

const reducedMotionPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await reducedMotionPage.emulateMedia({ reducedMotion: "reduce" });
await reducedMotionPage.goto(previewUrl, { waitUntil: "domcontentloaded" });
await enterLab(reducedMotionPage);
await reducedMotionPage.locator("section.pure3d-carousel").waitFor();
const motionDurations = await reducedMotionPage.evaluate(() => {
  const selectors = [
    "button",
    ".module-header",
    ".pure3d-carousel .card-shell",
  ];
  return selectors.map((selector) => {
    const element = document.querySelector(selector);
    return element ? getComputedStyle(element).transitionDuration : "missing";
  });
});
assert(motionDurations.every((duration) => duration === "0s"), `Reduced-motion transitionlari o‘chmadi: ${motionDurations.join(", ")}`);
await reducedMotionPage.getByRole("button", { name: "PCR bilan boshlash" }).click();
await reducedMotionPage.locator("[data-device-modal]").waitFor();
const modalTransitionDuration = await reducedMotionPage.locator("[data-device-modal]").evaluate((modal) => getComputedStyle(modal).transitionDuration);
assert(modalTransitionDuration === "0s", "Reduced-motion rejimida detail modal transitioni o‘chmadi.");
await reducedMotionPage.close();

await browser.close();
console.log("Katalog tartibi, qidiruv/tozalash boshqaruvlari va mobil rasm yuklanishi muvaffaqiyatli tekshirildi.");
