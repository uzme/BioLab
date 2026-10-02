import { chromium } from "playwright";

const previewUrlObject = new URL(process.env.BIOLAB_TEST_URL || "http://127.0.0.1:3000/");
previewUrlObject.searchParams.set("direct", "1");
const previewUrl = previewUrlObject.toString();
const previewOrigin = previewUrlObject.origin;
const shouldDownloadOfflinePack = process.env.BIOLAB_SKIP_OFFLINE_PACK !== "true";
const shouldTestOfflineRoundTrip = process.env.BIOLAB_SKIP_OFFLINE_ROUNDTRIP !== "true";
const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const runtimeErrors = [];
  desktop.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  desktop.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
  });
  desktop.on("requestfailed", (request) => runtimeErrors.push(`requestfailed: ${request.url()} :: ${request.failure()?.errorText || "unknown"}`));
  const manifestResponse = await desktop.request.get(`${previewOrigin}/manifest.webmanifest`);
  await assert(manifestResponse.ok(), "PWA manifest.webmanifest topilmadi.");
  const manifest = await manifestResponse.json();
  await assert(manifest.lang === "uz" && manifest.display === "standalone", "PWA manifest o‘zbekcha standalone rejimida emas.");
  const serviceWorkerResponse = await desktop.request.get(`${previewOrigin}/sw.js`);
  await assert(serviceWorkerResponse.ok(), "PWA service worker fayli topilmadi.");

  await desktop.goto(previewUrl, { waitUntil: "domcontentloaded" });
  await desktop.evaluate(() => window.localStorage.clear());
  await desktop.reload({ waitUntil: "domcontentloaded" });
  await assert(await desktop.evaluate(async () => Boolean(await navigator.serviceWorker.ready)), "PWA service worker ro‘yxatdan o‘tmadi.");
  const offlineStatus = desktop.locator("[data-offline-status]");
  await assert(await offlineStatus.getAttribute("data-offline-status") === "online", "Onlayn status indikatori ko‘rinmadi.");
  const offlinePackButton = desktop.getByRole("button", { name: "Offline paketni yuklash" });
  await assert(await offlinePackButton.isVisible(), "Offline paket boshqaruvi ko‘rinmadi.");
  await assert(await desktop.locator(".page-transition").count() === 1, "Sahifa transition qatlami topilmadi.");
  await assert(await desktop.locator('[data-slot="button"]').count() > 0, "Global Button komponenti topilmadi.");
  if (shouldDownloadOfflinePack) {
    await offlinePackButton.click();
    await desktop.locator('[data-slot="button"][data-loading="true"]').waitFor({ state: "visible", timeout: 5000 });
    await assert(await desktop.locator('[data-slot="button"][data-loading="true"]').getAttribute("aria-busy") === "true", "Tugma loading holatida aria-busy=true bermadi.");
    await desktop.waitForFunction(() => !document.querySelector('[data-slot="button"][data-loading="true"]'), null, { timeout: 30000 });
  }
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionProgress = await desktop.evaluate(() => {
    const progress = document.querySelector(".loading-progress");
    if (!progress) return null;
    const pseudo = window.getComputedStyle(progress, "::after");
    return { animationName: pseudo.animationName, animationDuration: pseudo.animationDuration };
  });
  if (reducedMotionProgress) {
    await assert(reducedMotionProgress.animationDuration === "0.01ms" || reducedMotionProgress.animationName === "none", "Reduced-motion rejimi loading animatsiyasini qisqartirmadi.");
  }
  await desktop.emulateMedia({ reducedMotion: "no-preference" });

  if (shouldTestOfflineRoundTrip) {
    await desktop.context().setOffline(true);
    await desktop.reload({ waitUntil: "domcontentloaded" });
    const offlineCarouselScene = desktop.locator(".pure3d-carousel .scene");
    await offlineCarouselScene.waitFor({ state: "visible", timeout: 15_000 });
    await assert(await offlineCarouselScene.isVisible(), "Offline reloaddan keyin app shell carouseli tiklanmadi.");
    await desktop.evaluate(() => window.dispatchEvent(new Event("offline")));
    await desktop.waitForFunction(() => document.querySelector("[data-offline-status]")?.getAttribute("data-offline-status") === "offline");
    await desktop.context().setOffline(false);
    await desktop.evaluate(() => window.dispatchEvent(new Event("online")));
    await desktop.waitForFunction(() => document.querySelector("[data-offline-status]")?.getAttribute("data-offline-status") === "online");
    await desktop.reload({ waitUntil: "domcontentloaded" });
  }

  const carouselScene = desktop.locator(".pure3d-carousel .scene");
  await carouselScene.waitFor({ state: "visible" });
  await desktop.addStyleTag({ content: ".pure3d-carousel .a3d { animation-play-state: paused !important; }" });
  await assert(await desktop.locator(".pure3d-carousel .a3d").count() === 1, "Original .a3d 3D halqa konteyneri topilmadi.");
  await assert(await desktop.locator(".pure3d-carousel .card").count() === 12, "Carousel original .card tuzilmasida 12 ta qurilmani ko‘rsatmadi.");

  const carouselBookmark = desktop.locator('.pure3d-carousel .card').first().locator('[data-bookmark-button]');
  await carouselBookmark.dispatchEvent("click");
  await assert(await carouselBookmark.getAttribute("aria-pressed") === "true", "Carousel qurilmasi saralanganlarga saqlanmadi.");
  await desktop.reload({ waitUntil: "domcontentloaded" });
  const bookmarksSidebar = desktop.locator("[data-bookmarks-sidebar]");
  await desktop.getByRole("button", { name: "Saralanganlarni ochish" }).click();
  await assert(await bookmarksSidebar.isVisible(), "Saralanganlar o‘ng yon paneli ochilmadi.");
  await assert(await bookmarksSidebar.getByText("BIO-001").isVisible(), "Sidebar ichida saqlangan BIO-001 qurilmasi ko‘rinmadi.");
  await bookmarksSidebar.getByRole("button", { name: /taf silotlarini ochish|tafsilotlarini ochish/ }).click();
  await desktop.getByText("Molekulyar biologiya / BIO-001").waitFor({ state: "visible" });
  await desktop.getByRole("banner").getByRole("button", { name: "Barcha uskunalar" }).click();
  const catalogBookmark = desktop.locator("article.equipment-card").first().getByRole("button", { name: /saralanganlardan olib tashlash/ });
  await assert(await catalogBookmark.getAttribute("aria-pressed") === "true", "Saralangan qurilma brauzer xotirasidan qayta tiklanmadi.");
  await desktop.getByRole("button", { name: /^Saralanganlar 1$/ }).click();
  await desktop.waitForFunction(() => document.querySelectorAll("article.equipment-card").length === 1);
  await assert(await desktop.locator("article.equipment-card").count() === 1, "Saralanganlar filtri faqat saqlangan qurilmani ko‘rsatmadi.");
  await catalogBookmark.click();
  await assert(await desktop.getByText("Qurilma topilmadi").isVisible(), "Saralangan qurilma o‘chirilgandan keyin bo‘sh holat ko‘rsatilmagan.");
  await desktop.evaluate(() => window.localStorage.clear());
  await desktop.reload({ waitUntil: "domcontentloaded" });

  await desktop.getByRole("button", { name: "Sozlamalar va mualliflik huquqi" }).click();
  await assert(await desktop.getByRole("heading", { name: "Sozlamalar va huquqiy ma’lumot" }).isVisible(), "Sozlamalar paneli ochilmadi.");
  await desktop.getByRole("button", { name: "Sozlamalarni yopish" }).click();

  const learningBlockSmokeCases = [
    { cardIndex: 0, id: "BIO-001" },
    { cardIndex: 25, id: "BIO-026" },
    { cardIndex: 50, id: "BIO-051" },
    { cardIndex: 75, id: "BIO-076" },
  ];

  for (const { cardIndex, id } of learningBlockSmokeCases) {
    const card = desktop.locator("article.equipment-card").nth(cardIndex);
    await card.getByRole("button", { name: /O‘rganish/ }).click();
    await desktop.locator("[data-device-viewer]").waitFor({ state: "visible" });
    await desktop.getByRole("heading", { name: "Manba va foydalanish holati" }).waitFor({ state: "visible" });
    await assert(await desktop.getByRole("heading", { name: "Manba va foydalanish holati" }).isVisible(), `${id} rasm manbasi va foydalanish shaffofligi bloki ko‘rinmadi.`);
    const desktopScrollState = await desktop.locator("[data-device-modal]").evaluate((modal) => ({
      modalScrollTop: modal.scrollTop,
      viewerScrollTop: modal.firstElementChild?.scrollTop ?? -1,
    }));
    await assert(desktopScrollState.modalScrollTop <= 1 && desktopScrollState.viewerScrollTop <= 1, `${id} detail oynasi yuqoridan emas, avvalgi scroll holatidan ochildi.`);

    const learningNavigation = desktop.getByRole("navigation", { name: "16 bo‘limli o‘quv dasturi" });
    await desktop.waitForFunction(() => document.querySelectorAll('nav[aria-label="16 bo‘limli o‘quv dasturi"] button').length === 16, null, { timeout: 30_000 });
    await assert(await learningNavigation.getByRole("button").count() === 16, `${id} qurilmasida 16 ta o‘quv bo‘limi ko‘rsatilmagan. Runtime: ${runtimeErrors.join(" | ") || "xato qayd etilmadi"}`);
    await learningNavigation.getByRole("button", { name: /Ishonchli o‘quv manbalari/ }).click();
    await assert(await desktop.getByRole("heading", { name: "Ishonchli o‘quv manbalari" }).isVisible(), `${id} 16-bo‘limdagi manbalar ochilmadi.`);

    await desktop.getByRole("heading", { name: "Xarid va foydalanish xarajatlari" }).waitFor({ state: "visible" });
    const priceAccordion = desktop.getByRole("button", { name: "Narx benchmarki va dalili" });
    await priceAccordion.click();
    await desktop.getByText(/^Manba:/).waitFor({ state: "visible" });
    await desktop.locator("[data-device-modal]").evaluate((modal) => {
      modal.scrollTop = modal.scrollHeight;
      const viewer = modal.firstElementChild;
      if (viewer) viewer.scrollTop = viewer.scrollHeight;
    });

    await desktop.locator("header button:has-text('Barcha uskunalar')").click();
    await assert(await desktop.locator("article.equipment-card").count() === 100, `${id} qurilmasidan katalogga qaytishda 100 ta karta tiklanmadi.`);
  }

  const iphoneContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
  });
  const mobile = await iphoneContext.newPage();
  await mobile.goto(previewUrl, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "O‘rganish" }).first().click();
  const mobileModal = mobile.locator("[data-device-modal]");
  await mobileModal.waitFor({ state: "visible" });
  await mobile.locator("[data-device-viewer]").waitFor({ state: "visible" });
  await mobile.getByText("Molekulyar biologiya / BIO-001").waitFor({ state: "visible" });
  await assert(await mobileModal.getAttribute("role") === "dialog", "Mobil detail oynasi dialog semantikasini bermadi.");
  await assert(await mobileModal.getAttribute("aria-modal") === "true", "Mobil detail oynasi modal semantikasini bermadi.");
  const mobileModalMetrics = await mobileModal.evaluate((element) => {
    const viewer = element.querySelector("[data-device-viewer]");
    const panel = element.querySelector("[data-device-modal-panel]");
    const scrollContainer = panel?.firstElementChild;
    const viewerRect = viewer?.getBoundingClientRect();
    return {
      height: element.getBoundingClientRect().height,
      overlayOverflowY: window.getComputedStyle(element).overflowY,
      scrollOverflowY: scrollContainer ? window.getComputedStyle(scrollContainer).overflowY : "",
      viewportHeight: window.innerHeight,
      viewerHeight: viewerRect?.height ?? 0,
      viewerTop: viewerRect?.top ?? Number.POSITIVE_INFINITY,
      viewerBackground: viewer ? window.getComputedStyle(viewer).backgroundColor : "",
      modalScrollTop: scrollContainer?.scrollTop ?? -1,
      viewerScrollTop: scrollContainer?.scrollTop ?? -1,
    };
  });
  await assert(mobileModalMetrics.height >= mobileModalMetrics.viewportHeight - 2, "Mobil detail oynasi ekran qoplamini to‘liq egallamadi.");
  await assert(mobileModalMetrics.overlayOverflowY === "hidden" && mobileModalMetrics.scrollOverflowY === "auto", `Mobil detail oynasida alohida xavfsiz vertikal scroll konteyneri yo‘q (overlay: ${mobileModalMetrics.overlayOverflowY}; kontent: ${mobileModalMetrics.scrollOverflowY}).`);
  await assert(mobileModalMetrics.viewerHeight > 0 && mobileModalMetrics.viewerTop < mobileModalMetrics.viewportHeight, "Mobil detail kontenti fon-blur ostida ko‘rinmay qoldi.");
  await assert(mobileModalMetrics.viewerBackground === "rgb(247, 251, 250)", "Mobil detail kontenti kutilgan o‘quv fonida render bo‘lmadi.");
  await assert(mobileModalMetrics.modalScrollTop <= 1 && mobileModalMetrics.viewerScrollTop <= 1, "Mobil detail oynasi yuqoridan emas, avvalgi scroll holatidan ochildi.");
  await mobileModal.evaluate((element) => {
    const panel = element.querySelector("[data-device-modal-panel]");
    const scrollContainer = panel?.firstElementChild;
    scrollContainer?.scrollTo(0, scrollContainer.scrollHeight);
  });
  await mobile.getByRole("button", { name: "Barcha uskunalar" }).click();
  await mobileModal.waitFor({ state: "hidden" });
  await mobile.getByRole("button", { name: "O‘rganish" }).nth(1).click();
  await mobileModal.waitFor({ state: "visible" });
  await mobile.locator("[data-device-viewer]").waitFor({ state: "visible" });
  await mobile.waitForTimeout(150);
  const reopenedMobileScroll = await mobileModal.evaluate((element) => ({
    modalScrollTop: element.scrollTop,
    viewerScrollTop: element.firstElementChild?.scrollTop ?? -1,
  }));
  await assert(reopenedMobileScroll.modalScrollTop <= 1 && reopenedMobileScroll.viewerScrollTop <= 1, "iPhone Safari uslubidagi qayta ochilishda detail avvalgi Xarid bo‘limidan boshlandi.");
  await mobile.getByRole("button", { name: "Barcha uskunalar" }).click();
  await mobileModal.waitFor({ state: "hidden" });
  await mobile.getByRole("button", { name: "Menyuni ochish" }).click();
  await mobile.waitForTimeout(300);
  await mobile.keyboard.press("Escape");
  await mobile.waitForTimeout(300);

  await desktop.close();
  await mobile.close();
  await iphoneContext.close();
  console.log("Qurilma tafsiloti, rasm shaffofligi, 16-bo‘limli o‘quv oqimi va mobil menyu muvaffaqiyatli tekshirildi.");
} finally {
  await browser.close();
}
