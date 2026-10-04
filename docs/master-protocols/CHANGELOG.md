# CHANGELOG — BioLab Interactive Guide

## [1.1.0] — 2026-08-21

### Added
- Canonical Drive auditidan o‘tgan hero-vizuallar bilan katalogning barcha `BIO-001`–`BIO-100` qurilmalari qorong‘i laboratoriya `cover` hero profiliga o‘tkazildi.
- `BIO-041.webp` canonical `BioLab_hero_assets_batch_13.zip` ichidan topildi, integrity va visual/model auditdan PASS oldi hamda deploy-safe registryga ulandi.
- Recovery manifest va yagona `BioLab_Hero_Assets_Recovery.tar.gz` arxivi 100 ta qabul qilingan hero asset checksumlari bilan o‘rnida yangilandi.

### Changed
- Katalogning boshlang‘ich hero yuklanishida dublikat JavaScript warmup olib tashlandi; filtrlangan natijalarning dastlabki to‘rtta rasmi faqat browser bo‘sh vaqtida prefetch qilinadi.
- Hero continuation, regeneration va tashqi image-only handoff hujjatlari 100/100 yakuniy holatga moslashtirildi; ortiqcha hero rasm yaratish navbati bekor qilindi.
- Bosh sahifa va katalog yagona **precision-biotech** vizual tizimiga o‘tkazildi: sovuq teal laboratoriya sahnasi, kalibrlangan grid, kuchaytirilgan LAB-01 o‘quv raili, aniq modul ajratgichlari hamda ierarxik tipografiya qo‘llandi; o‘quv ma’lumotlari o‘zgartirilmadi.
- Gorizontal 3D karusel yangi vizual tilga bog‘landi: sahifa navbatlari, previous/next, pause/continue boshqaruvlari, karta chuqurligi va responsive sahna birlashtirildi; vertikal karusel ishlatilmaydi.
- `prefers-reduced-motion` hamda foydalanuvchining “Kamroq animatsiya” tanlovi tugma, modal, drawer, katalog va karusel transitionlarini o‘chiradigan qilib kuchaytirildi.

### Corrected
- “Qurilmani o‘rganish” detail oynasida eski PWA keshidan keladigan modul-versiya nomuvofiqligi bartaraf etildi: yangi service worker aktivlashganda sahifa o‘zini yangilaydi, script/style fayllari onlayn holatda tarmoqdan birinchi olinadi, cache versiyasi yangilandi.
- Agar brauzerning juda eski offline keshi o‘quv ma’lumotlari bloklarini yuklay olmasa, detail oynasi foydalanuvchiga “Yangilash va qayta ochish” amali bilan faqat BioLab offline keshini tozalab, ma’lumotlarni tiklash imkonini beradi.
- Production bundleda `learningDataBlock1`–`4` fayllarini bitta chunkga majburan birlashtirgan qoida olib tashlandi; har bir o‘quv blok endi alohida dynamic module sifatida yuklanadi.
- Birinchi service worker o‘rnatilishida ortiqcha sahifa refreshining oldi olindi; auto-refresh endi faqat avvaldan controller mavjud bo‘lgan yangilanish holatida ishlaydi.
- DeviceViewer E2E testi har asinxron detail blokida 16 bo‘lim navigationi tayyor bo‘lishini kutadi; production smoke-testda offline round-trip ixtiyoriy ajratildi, local regressiyada esa saqlanib qoldi.
- “O‘rganish” bosilganda detail modalning tashqi overlay va ichki viewer scroll konteynerlari paintdan oldin yuqoriga qaytariladi; shu sabab avvalgi pastdagi bo‘limda ochilib qolmaydi.
- DeviceViewer regressiyasi modalni qasddan pastga scroll qilib, keyingi qurilma ochilganda desktop va mobil holatda `scrollTop = 0` ekanini tekshiradi.
- Planshet `768px` viewportida LAB-01 qadamlarining zichlashib qolishi bartaraf etildi: rail `8×2` gridga o‘tadi, 16 raqamning tartibi hamda kamida `24px` qadam maydoni browser regressiyada tekshiriladi.
- iPhone Safari’da detail oynaning avvalgi “Xarid” bo‘limidan ochilib qolishi bartaraf etildi: mobilga bitta scroll konteyner qoldirildi, yangi qurilma ochilganda reset paintdan oldin, keyingi frame’da va iOS renderi barqarorlashgach takrorlanadi.
- DeviceViewer endi o‘quv va xarid bloklarini mustaqil yuklaydi; xarid ma’lumotidagi alohida muammo o‘quv dosyesi va 16 bo‘lim ochilishini to‘sib qo‘ymaydi. 100 ta BIO detail uchun dinamik ma’lumotlar unit test bilan qamrab olindi.
- Purchase-loader recovery dalili alohida unit regression orqali tekshirildi: purchase promise rad etilganda `resolveDeviceContent` 16-bo‘limli learning dosyesini saqlaydi. Production smoke-test ataylab nosozlik kiritmaydi va faqat real learning/purchase success-path yuklanishini tasdiqlaydi.
- 2026-08-22 tarixiy hosting auditida avvalgi Vercel ulanishi vaqtincha ajratilgan deb qayd etilgan; bu holat keyinchalik yangi `biolab` Vercel projecti bilan almashtirildi.
- 2026-10-04 holatiga ko‘ra `uzme/BioLab` `main` branchi Vercel `biolab` projectiga ulangan, `https://biolab-interactive-guide.vercel.app/` production aliasi `200` qaytaradi va deployment `READY`.

## [1.0.1] — 2026-08-20

### Corrected
- BioLabning canonical Google Drive rooti metadata va inventar orqali `Biotexnologiya` (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) sifatida tasdiqlandi. Alohida `Second Brain` rooti BioLab release oqimidan chiqarildi.

## [1.0.0] — 2026-08-17

### Verified
- Canonical repository is confirmed as `uzme/BioLab`, and the canonical BioLab Google Drive root folder is confirmed as `Biotexnologiya` (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`).
- `useTransition` race conditions in catalog search, filter clearing, category selection, and empty-state handling were successfully stabilized with Playwright assertion synchronization.
- TypeScript checks, production builds, catalog controls, DeviceViewer, 16-section learning dossiers, carousel/pagination, and mobile menu regression tests passed successfully.
- PWA offline shell, service worker, loading/ripple animations, bookmarks sidebar, and original horizontal Pure CSS 3D carousel geometry were verified.
- AI Project GitHub + Google Drive Continuity Master Protocol and restoration mapping documentation suite were successfully aligned.
- Sanitised release targets `uzme/BioLab` main branch and the `Biotexnologiya` BioLab root on Google Drive. Secrets, tokens, API keys, passwords, PATs, `node_modules`, `dist`, and logs remain excluded.

## [1.0.0] — 2026-08-16

### Added
- 100 biotechnology devices catalog with 10 specialized categories and pagination.
- Original Pure CSS 3D animated carousel.
- 16-section learning dossiers for every equipment item.
- Browser `localStorage` bookmarks and right-side bookmarks sidebar.
- PWA offline support with manifest, service worker, and online/offline status indicator.
- Reproducibility documentation suite and automated release checks.
