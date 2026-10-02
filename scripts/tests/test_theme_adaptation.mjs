import { chromium } from "playwright";

const previewUrl = "http://127.0.0.1:3000/?direct=1";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function inspectTheme(colorScheme, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme,
    reducedMotion,
  });
  const page = await context.newPage();
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  const state = await page.evaluate(() => {
    const hero = document.querySelector("[data-hero-surface]");
    const signal = document.querySelector(".landing-status-dot");
    return {
      dark: document.documentElement.classList.contains("dark"),
      preference: localStorage.getItem("biolab-theme-preference"),
      scanAnimation: hero ? getComputedStyle(hero, "::after").animationName : "missing",
      signalAnimation: signal ? getComputedStyle(signal).animationName : "missing",
    };
  });
  await context.close();
  return state;
}

async function inspectDeviceViewerTheme(colorScheme) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/?direct=1&device=BIO-001", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-device-learning]");
  const state = await page.evaluate(() => {
    const read = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return "missing";
      return getComputedStyle(element).backgroundColor;
    };
    const text = document.querySelector("[data-device-learning] h2");
    return {
      dark: document.documentElement.classList.contains("dark"),
      viewerBackground: read("[data-device-viewer]"),
      headerBackground: read("[data-device-header]"),
      learningBackground: read("[data-device-learning]"),
      purchaseBackground: read("[data-device-purchase]"),
      headingColor: text ? getComputedStyle(text).color : "missing",
    };
  });
  await context.close();
  return state;
}

async function inspectDisplayPreferences() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Menyuni ochish" }).click();
  const settingsTrigger = page.getByRole("button", { name: "Sozlamalar va mualliflik huquqi" });
  await settingsTrigger.waitFor({ state: "visible" });
  await settingsTrigger.click();
  const contrastButton = page.getByRole("button", { name: "Yuqori kontrast rejimini almashtirish" });
  await contrastButton.click();
  const highContrast = await page.evaluate(() => ({
    active: document.documentElement.classList.contains("high-contrast"),
    stored: localStorage.getItem("biolab-contrast-mode"),
  }));
  const themeButton = page.getByRole("button", { name: "Rang mavzusini qo‘lda almashtirish" }).last();
  await themeButton.click();
  const oledButton = page.getByRole("button", { name: "OLED true-black rejimini almashtirish" });
  assert(!(await oledButton.isDisabled()), "OLED true-black boshqaruvi tungi rejimda faollashmadi.");
  await oledButton.click();
  const oled = await page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    active: document.documentElement.classList.contains("oled"),
    stored: localStorage.getItem("biolab-display-mode"),
    viewerBackground: getComputedStyle(document.body).backgroundColor,
  }));
  await context.close();
  return { highContrast, oled };
}

const darkMotion = await inspectTheme("dark", "no-preference");
assert(darkMotion.dark, "Tizim tungi rejimida .dark class avtomatik qo‘llanmadi.");
assert(darkMotion.preference === "system", "Birinchi ochilishda tema tizim afzalligiga bog‘lanmadi.");
assert(darkMotion.scanAnimation !== "none" && darkMotion.scanAnimation !== "missing", "Jonli laboratoriya scan animatsiyasi ishga tushmadi.");
assert(darkMotion.signalAnimation !== "none" && darkMotion.signalAnimation !== "missing", "Jonli signal animatsiyasi ishga tushmadi.");

const lightReduced = await inspectTheme("light", "reduce");
assert(!lightReduced.dark, "Tizim yorug‘ rejimida .dark class noto‘g‘ri saqlanib qoldi.");
assert(lightReduced.scanAnimation === "none", "Reduced-motion rejimida scan animatsiyasi o‘chirilmadi.");
assert(lightReduced.signalAnimation === "none", "Reduced-motion rejimida signal animatsiyasi o‘chirilmadi.");

const darkDetail = await inspectDeviceViewerTheme("dark");
assert(darkDetail.dark, "DeviceViewer tizim tungi rejimida .dark class bilan ochilmadi.");
assert(darkDetail.viewerBackground !== "rgb(247, 251, 250)", "DeviceViewer asosiy yuzasi qorong‘i temaga o‘tmadi.");
assert(darkDetail.purchaseBackground !== "rgb(239, 248, 245)", "Xarid moduli qorong‘i temada yorug‘ yuzada qolib ketdi.");
assert(darkDetail.learningBackground !== "rgb(255, 255, 255)", "O‘quv maqolasi qorong‘i temada oq yuzada qolib ketdi.");
assert(darkDetail.headingColor !== "rgb(23, 61, 66)", "DeviceViewer sarlavhasi qorong‘i temaga mos kontrastga o‘tmadi.");

const lightDetail = await inspectDeviceViewerTheme("light");
assert(!lightDetail.dark, "DeviceViewer yorug‘ rejimda noto‘g‘ri qorong‘i class bilan qoldi.");
assert(lightDetail.purchaseBackground === "rgb(239, 248, 245)", "Yorug‘ rejimdagi xarid moduli tasdiqlangan och rang tizimini saqlamadi.");
assert(lightDetail.learningBackground === "rgb(255, 255, 255)", "Yorug‘ rejimdagi o‘quv maqolasi oq o‘qish yuzasini saqlamadi.");

const displayPreferences = await inspectDisplayPreferences();
assert(displayPreferences.highContrast.active && displayPreferences.highContrast.stored === "high", "Yuqori kontrast tanlovi brauzer xotirasida saqlanmadi.");
assert(displayPreferences.oled.dark && displayPreferences.oled.active && displayPreferences.oled.stored === "oled", "OLED true-black tanlovi faollashmadi yoki saqlanmadi.");
assert(displayPreferences.oled.viewerBackground === "rgb(0, 0, 0)", "OLED true-black rejimi sahifa fonini sof qora rangga o‘tkazmadi.");

await browser.close();
console.log("Kun/tun tema, DeviceViewer kontrasti, yuqori kontrast, OLED true-black va reduced-motion laboratoriya animatsiyalari muvaffaqiyatli tekshirildi.");
