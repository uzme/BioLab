import { chromium } from "playwright";

const previewUrl = "http://127.0.0.1:3000/";
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => { window.__BIOLAB_EXPO_GO__ = true; });
await page.goto(previewUrl, { waitUntil: "networkidle" });

const gate = page.locator("[data-lab-entry]");
await gate.waitFor();
const gateBounds = await gate.boundingBox();
assert(Boolean(gateBounds) && gateBounds.width >= 389 && gateBounds.height >= 843, "Live Lab kirish sahnasi mobil viewportni to‘liq egallamadi.");
assert(await page.getByRole("heading", { name: /BioLab laboratoriya ochilish sahifasi/i }).isVisible(), "Expo Go kirish ekranida BioLab ochilish sarlavhasi ko‘rinmadi.");
assert(await page.locator("[data-lab-entry-action]").isVisible(), "Kirish ekranida laboratoriyaga kirish amali yo‘q.");
assert(await page.locator("[data-lab-entry-logo]").isVisible(), "Qora fondagi asosiy BioLab logosi ko‘rinmadi.");
const logoBounds = await page.locator("[data-lab-entry-logo]").boundingBox();
assert(Boolean(logoBounds) && logoBounds.height >= 300, "Asosiy BioLab logosi mobil sahnada yetarlicha katta emas.");
assert(Boolean(logoBounds) && logoBounds.y < 150, "Asosiy BioLab logosi mobil sahnada yuqoridan ortiqcha bo‘shliq bilan boshlangan.");
assert(await page.locator("[data-hero-surface]").count() === 0, "Original sahifa kirish ekranidan oldin ko‘rinib qoldi.");
await page.locator("[data-lab-entry-action]").click();
await page.locator("[data-hero-surface]").waitFor({ state: "visible" });
assert(await page.getByRole("heading", { name: /Qurilmani bilib oling/i }).isVisible(), "Kirish amali original BioLab asosiy sahifasiga o‘tmadi.");
await page.close();

const normalPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await normalPage.goto(previewUrl, { waitUntil: "networkidle" });
assert(await normalPage.locator("[data-lab-entry]").isVisible(), "Oddiy web tashrifida laboratoriya kirish ekrani ko‘rinmadi.");
const normalFrame = normalPage.locator("[data-lab-entry-frame]");
assert(await normalFrame.evaluate((frame) => Math.round(frame.getBoundingClientRect().width) === Math.round(window.innerWidth)), "Live Lab qobig‘i oddiy web tashrifida to‘liq ekranli emas.");
await normalPage.locator("[data-lab-entry-action]").click();
await normalPage.locator("[data-hero-surface]").waitFor({ state: "visible" });
assert(await normalPage.getByRole("heading", { name: /Qurilmani bilib oling/i }).isVisible(), "Oddiy web tashrifida kirish amali original asosiy sahifaga o‘tmadi.");
await normalPage.close();

const previewPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await previewPage.goto(`${previewUrl}?expo-preview=1`, { waitUntil: "networkidle" });
assert(await previewPage.locator("[data-lab-entry]").isVisible(), "Vizual audit preview query’da kirish ekrani ko‘rinmadi.");
await previewPage.close();
const settingsPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await settingsPage.goto(previewUrl, { waitUntil: "networkidle" });
await settingsPage.locator("[data-lab-entry-action]").click();
await settingsPage.locator("[data-hero-surface]").waitFor({ state: "visible" });
await settingsPage.getByRole("button", { name: /Menyuni ochish/i }).click();
await settingsPage.getByRole("button", { name: /Sozlamalar va mualliflik huquqi/i }).click();
const settingsDialog = settingsPage.getByRole("dialog", { name: /Sozlamalar va huquqiy ma’lumot/i });
await settingsDialog.waitFor({ state: "visible" });
assert(await settingsDialog.getByText(/Qat’iy Mualliflik Huquqi/i).isVisible(), "Mobil Copyright modalining kontenti ko‘rinmadi.");
assert(await settingsDialog.getByText("Mengliyev Bahrom Husanovich", { exact: true }).first().isVisible(), "Mobil Copyright modalida muallifning to‘liq ismi ko‘rinmadi.");
const settingsBrand = settingsDialog.locator("[data-settings-brand] img");
await settingsBrand.waitFor({ state: "visible" });
const settingsBrandSrc = await settingsBrand.getAttribute("src");
assert(settingsBrandSrc === "/biolab-logo.webp", "Sozlamalardagi to‘liq BioLab emblemi topilmadi.");
await settingsPage.getByRole("button", { name: /Sozlamalarni yopish/i }).click();
assert(await settingsDialog.count() === 0, "Mobil Copyright modali yopilmadi.");
await settingsPage.close();
await browser.close();
console.log("Sayt/Expo Go laboratoriya kirish oqimi va mobil Copyright modali muvaffaqiyatli tekshirildi.");
