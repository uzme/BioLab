# PROJECT_STATE.md — BioLab Interactive Guide Project State

## Joriy reliz

| Ko‘rsatkich | Qiymat |
|---|---|
| Web loyiha | BioLab Interactive Guide |
| Oxirgi checkpoint | `88285285`; OLED true-black hotfixi va manual sync metadata relizi productionda jonli |
| Canonical GitHub | `https://github.com/uzme/BioLab`, `main`; qo‘lda, force-pushsiz yuborilgan sync metadata checkpoint `88285285` |
| Canonical Google Drive | **Biotexnologiya** BioLab root, ID `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`; canonical snapshot ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, version `234`, modified `2026-08-27T20:04:09.793Z`, size `34,244,857` byte |
| Joriy snapshot nomi | `BioLab_Interactive_Guide_source.tar.gz` |
| Ishlab chiqarish manzili | Canonical: `https://biolab-interactive-guide.vercel.app` |
| Qamrov | 10 kategoriya, 100 qurilma, 16 bo‘limli o‘quv tarkibi |
| Joriy audit | DeviceViewerning yuqori QR tugmasi dialogi statik tayyor holatda; sidebar va Sozlamalardagi brend belgisi to‘liq oltin BioLab emblemiga o‘tkazildi. PDF eksportlari aktiv tema palitrasiga moslashadi; Sozlamalarda yuqori-kontrast va OLED true-black tanlovlari browser xotirasida saqlanadi. OLED hotfixi keyingi gradientlarni bekor qilib, hujjat fonini haqiqiy `#000`ga mustahkamlaydi. TypeScript check, production build, 25 ta Vitest, barcha browser regressiyalari va BIO-001–BIO-100 o‘quv auditi PASS. Canonical GitHub va mavjud Drive snapshot foydalanuvchi tasdiqlagan qo‘lda sync bilan yangilandi; archive SHA-256 byte-darajasida tekshirildi. |

## 2026-08-28 OLED true-black hotfixi

OLED rejimi holat va persistence jihatidan to‘g‘ri yoqilgan bo‘lsa-da, umumiy qorong‘i sahifa qatlamining keyin keluvchi gradienti ayrim browserlarda `body` fonini sof qora emas, teal-gradient sifatida hisoblatishi aniqlandi. Qorong‘i OLED selectorlari umumiy dark shell qatlamidan keyinga ko‘chirildi va `html.dark.oled`, `body`, `.shell`, hamda `.app-main` uchun `background-color: #000 !important` va `background-image: none !important` bilan mustahkamlandi.

Natijada true-black faollashganda fon grafik gradientlarsiz haqiqiy qora rangda render qilinadi; DeviceViewer va Sozlamalar ichidagi asosiy yuzalar esa o‘qiluvchan tafovut uchun `#020809` qatlamida qoladi. Targeted browser regressiyasi va to‘liq release zanjiri sof qora `document.body` fonini, OLED localStorage persistenceini, QR, PDF, light/dark, mobil header, PWA hamda BIO-001–BIO-100 o‘quv oqimlarini PASS deb tasdiqladi. Hotfix checkpointi `704558cf` canonical GitHubga force-pushsiz yuborildi va mavjud Drive snapshoti duplicate yaratmasdan yangilandi. Holat: **READY — qo‘lda sync yakunlandi**.

## 2026-08-28 OLED hotfixi uchun yakuniy manual sync

Canonical GitHub `main` tarmog‘i `23b0a0ec9b442bd09b70f19be234f2240e6d2231` dan `704558cf95a7bca127ef736b724298d46577978e`, so‘ng sync metadata checkpointi `88285285`gacha **force-pushsiz** fast-forward bilan yangilandi. Drive’da yangi fayl yoki papka yaratilmadi: mavjud `BioLab_Interactive_Guide_source.tar.gz` (`1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`) aynan o‘zida yangilandi va canonical parent (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) o‘zgarmadi.

Snapshot `git archive` orqali `88285285` checkpointidan yaratildi va `.env*`, `.project-config.json`, `.git`, `dist`, `node_modules` hamda `.manus-logs` yo‘llaridan tozaligi tekshirildi. SHA-256: `8921010a1183ebe0555b6d79ae141b711c5fb80f521fbc50eb43932088f45299`; Drive’dan qayta olingan 34,244,857-byte nusxa ayni SHA-256ga ega va `cmp` orqali byte-darajasida tengligi tasdiqlandi. Drive metadata: version `234`, modified `2026-08-27T20:04:09.793Z`. Holat: **manual sync PASS**.

## 2026-08-28 Qo‘lda GitHub va Google Drive sinxronlashi

Foydalanuvchining aniq tasdig‘idan so‘ng canonical GitHub `uzme/BioLab` repositorysining `main` tarmog‘i **force-pushsiz** fast-forward bilan `b91e91236f01b231b055d67c1576d59152f89b48` dan production release `23b0a0ec9b442bd09b70f19be234f2240e6d2231` gacha yuborildi. Yuklashdan avval ishchi daraxt tozaligi, diff whitespace tekshiruvi va remote divergensiyasi ko‘rib chiqildi; 13 ta commit oldinga, remote tomonda qarama-qarshi commit yo‘qligi tasdiqlandi.

Google Drive’da duplicate fayl yoki papka yaratilmadi. Mavjud **`BioLab_Interactive_Guide_source.tar.gz`** snapshot (`1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`) aynan o‘zida yangilandi va uning parent’i canonical **Biotexnologiya BioLab root** (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) sifatida saqlandi. Sanitizatsiyalangan archive `git archive` asosida release commitdan hosil qilindi: 398 manba/hujjat fayli kiritildi, `.env*`, `.project-config.json`, `.git`, `dist`, `node_modules` va `.manus-logs` yo‘llari soni **0**.

Archive SHA-256: `0746962c6d0f186a91ba954be0b61c72faa6e8d5ba34fc7df3d2ddd4b2209eef`. Drive’dan qayta olingan 34,240,644-byte nusxa ayni SHA-256ga ega va byte-darajasida `cmp` orqali tengligi tasdiqlandi. Drive fayli version `229`, MD5 `1d0078fd0397a6855e14afb2b3312ff7`, modified `2026-08-27T19:34:52.292Z`. Holat: **manual sync PASS**.

## 2026-08-28 QR, to‘liq BioLab emblemi va display rejimlari

DeviceViewer detail ekranidagi yuqori QR boshqaruvi ilgari dialog modulining kech yuklanishiga bog‘liq edi; shu sabab ayrim mobil holatlarda birinchi bosish javobsiz ko‘rinishi mumkin edi. QR dialogi endi header bilan birga darhol tayyor turadi. Browser regressiyasi `BIO-001`, `BIO-050` va `BIO-100`ning detail oynalarida QR tugmasi birinchi bosishda to‘g‘ri nomlangan dialogni ochishi hamda `data:image/png;base64` formatidagi QR PNG chiqarishini tasdiqladi. Barcha 100 URL kontrakti tegishli unit va katalog auditlarida saqlandi.

Sidebar va Sozlamalar oynasining kichik eski belgilari o‘rniga qora fondagi to‘liq oltin BioLab emblemi qo‘llandi. Ikonka ramkasida `object-contain` ishlatilgani uchun logo kesilmaydi va mobil drawer hamda desktop sidebarida yagona brend ko‘rinishi saqlanadi.

Individual qurilma va Saralanganlar PDF dosyelari tanlangan kun/tun palitrasiga mos rang argumentini qabul qiladi. Sozlamalarda **yuqori kontrast** rejimi va faqat tungi temada yoqiladigan **OLED true-black** rejimi qo‘shildi; har ikkisi localStorage orqali qayta ochilganda saqlanadi. Browser regressiyasi bu holatlarni, DeviceViewerning qorong‘i/yorug‘ kontrastini va mobil Sozlamalar oqimini tekshiradi.

Dalillar: `pnpm check`, `pnpm build`, **25 ta Vitest** va to‘liq `pnpm test` PASS. To‘liq zanjir katalog, 320/375/390 mobile header, hero, Live Lab, QR, PWA, kun/tun/kontrast/OLED, DeviceViewer, 100 qurilmaning 16-bo‘limli o‘quv auditi, loader recovery va release-sanitizatsiyani qamrab oldi. Holat: **READY — checkpoint va foydalanuvchi so‘ragan sanitizatsiyalangan GitHub/Drive sync kutilmoqda**.

## 2026-08-27 DeviceViewer kun/tun tema uyg‘unligi

Foydalanuvchi yuborgan mobil misolda detail ekranining yuqori qismi qorong‘i tema rangida bo‘lgani holda, **“Xarid va foydalanish xarajatlari”** bloki yorug‘ `mint` yuza sifatida qolib ketgani aniqlandi. Sabab: DeviceViewer ichidagi qator hard-code qilingan light yuzalar umumiy qorong‘i tema override-lariga to‘liq ulanmagan edi.

Tuzatishda DeviceViewerning ildiz, sticky header, o‘quv maqolasi va xarid bo‘limlariga semantik `data-*` belgilari qo‘shildi. Qorong‘i rejimda barcha ichki `card`, accordion, ma’lumot, ogohlantirish, chegara va sarlavha/matn ranglari yagona slate-teal kontrast tizimiga o‘tadi. Yorug‘ rejimda mavjud oq o‘qish yuzasi va mint xarid modulining tasdiqlangan premium ko‘rinishi o‘zgarmaydi. Natijada bir ekran ichida turli tema yuzalarining aralashib qolishi bartaraf etildi.

Dalillar: yangi browser regressiyasi qurilma detailini tizimning qorong‘i va yorug‘ afzalliklari bilan ochib, DeviceViewer, o‘quv maqolasi, xarid moduli hamda sarlavha computed-style kontrastini tekshiradi. `pnpm check`, `pnpm build`, **25 ta Vitest** va to‘liq `pnpm test` PASS; katalog, 320/375/390 header, QR, PWA, DeviceViewer, loader recovery, BIO-001–BIO-100 o‘quv auditi va release-sanitizatsiya qamrovi saqlandi. GitHub yoki Google Drive sinxronlanmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-27 Mobil header va boshlang‘ich yuklanish relizi

Mobil yuqori panelning menyu, offline, tema, Saralanganlar va filtr boshqaruvlari quyuq, aniq ajralib turuvchi yagona action-klasterga moslandi. Asosiy variantda har bir amaliy boshqaruv 38 px, 360 px va undan tor ekranlarda esa sig‘imni saqlash uchun 34 px touch-target bilan berildi. 390×844 mobil hamda 1280×720 desktop vizual auditlarida ikonkalarning kontrasti, horizontal sig‘imi va umumiy header ritmi tasdiqlandi.

Boshlang‘ich katalog oqimida aynan uchta karta rasmi `eager`/`high` prioritet bilan yuklanadi, qolgan 97 tasi `lazy` strategiyasida qoladi. Og‘ir DeviceViewer, QR va PDF funksiyalari lazy chunklarda saqlangan; hozirgi production buildda `DeviceViewer` 51.85 kB, `PDFButton` 429.37 kB bo‘lib, katalogning dastlabki action-klasteri bilan birga yuklanmaydi. Saralanganlar paneli lazy import vaqt poygasi sabab browser regressiyada ochilmay qolgani uchun u, filtr va Sozlamalar kabi kichik hamda yuqori chastotali header modullari statik importga qaytarildi. Natijada barcha header amallari birinchi bosishda ochiladi.

Dalillar: `pnpm check`, `pnpm build`, 25 ta Vitest va to‘liq `pnpm test` PASS. To‘liq browser zanjiri katalog, 320/375/390 mobil header, 3/97 rasm prioritizatsiyasi, hero, Live Lab, QR deep-link, PWA fallback, tema, DeviceViewer, mobil portal, BIO-001–BIO-100 o‘quv auditi, dynamic-loader recovery va release-sanitizatsiyani qamrab oldi. GitHub push yoki Google Drive upload bajarilmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-27 Mobil splash sifati, QR audit va Sozlamalar brendi

Foydalanuvchi yuborgan mobil screenshot asosida qora splash kompozitsiyasi qayta sozlandi: telefon ekranidagi yuqori bo‘shliq qisqartirildi, oltin BioLab logo sahnaning yuqori qismidan boshlanadi va barcha markaziy elementlar safe-area ichida qoladi. Tagline hamda **“Laboratoriyaga kirish”** tugmasi logo bilan tabiiy vertikal ritmda ko‘rinadi. Sozlamalar oynasining avvalgi tekis teal ikonasi o‘rniga qora fonda oltin chegarali, ichida BioLab DNA–B monogram bo‘lgan professional brend belgisi o‘rnatildi.

QR oqimi qayta tekshirildi. Unit sinovida `BIO-001`–`BIO-100`ning barchasi `?direct=1&device=BIO-NNN` manzilini hosil qilishi hamda PNG QR data URL berishi tasdiqlandi. Browser regresiyasida QR dialogi raster QR kodini ko‘rsatdi va `BIO-001`, `BIO-050`, `BIO-100` deep-linklari tegishli DeviceViewer oynasini ochdi. Natija: TypeScript check, production build, **25 ta Vitest**, QR browser sinovi, mobil splash va Sozlamalar regressionlari, shuningdek BIO-001–BIO-100 o‘quv auditlari PASS. GitHub hamda Google Drive manual-only siyosatga muvofiq sinxronlanmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-26 Sof qora fondagi BioLab splash sahnasi

Foydalanuvchi aniqlashtirgan talab bo‘yicha avvalgi laboratoriya rasmi va uning ustidagi kichik emblem asosiy ochilish sahnasidan olib tashlandi. Endi kirish oqimi sof `#000` fonda, viewportning to‘liq maydonini egallagan holda foydalanuvchi yuborgan oltin BioLab kolba–DNA–barg logotipini ko‘rsatadi. Katalog oqimiga kirish uchun pastda bitta ravshan **“Laboratoriyaga kirish”** boshqaruvi qoldirildi; u mavjud kirish navigatsiyasini o‘zgartirmaydi.

Yaratilgan avvalgi assetdagi shaffoflik shaxmat-foni mobil auditda sezildi. Shu sabab logo qora canvasga qayta ishlanib, `/manus-storage/biolab-gold-fullscreen-black_15728cda.png` lifecycle asseti qo‘llandi. `mix-blend-mode: screen` orqali canvas sahnadagi qora fon bilan tabiiy birlashadi; logo kesilmaydi va mobil hamda desktopda proporsiyasini saqlaydi.

Dalillar: 390×844 mobil va 1280×720 desktop vizual audit, TypeScript check, production build, 23 ta Vitest, mobil header, Live Lab gate, PWA fallback, katalog, DeviceViewer, BIO-001–BIO-100 detail, loader/recovery va release-sanitizatsiya regressiyalari PASS. GitHub commit/push yoki Google Drive snapshot upload bajarilmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-26 To‘liq ekranli Live Lab va onlayn katalogga qaytish

Live Lab kirish sahnasi card ko‘rinishidan chiqarilib, mobil hamda desktop viewportning to‘liq maydoniga moslashtirildi. Desktopda laboratoriya rasmi keng sahna bo‘lib ochiladi; mobil variant safe-area insetlarini hisobga oladi, rasm–matn–kirish tugmasi orasidagi ortiqcha bo‘shliq olib tashlandi. Oltin kolba–DNA–barg emblem markaziy rasmda saqlanib, status label va boshqa boshqaruvlarni to‘smasdan ishlaydi.

Offline paket holati `tayyor` bo‘lganda u endi qayta yuklash nomidagi noaniq action emas, **“Onlayn katalogga qaytish”** tugmasiga aylanadi. Internet mavjud bo‘lsa service-worker update so‘rovi xavfsiz yuborilib, sahifa `/?direct=1&online=1` manziliga `replace` orqali ochiladi. Bu qaytishning browser regressiyasi 390px mobil header testida tekshirildi; `Qurilmani bilib oling` katalog sarlavhasi ko‘rinishi tasdiqlandi.

Dalillar: 1280×720 desktop va 390×844 mobil vizual audit, TypeScript check, production build, 23 ta Vitest, 320/375/390 mobil header, Live Lab gate, PWA fallback, katalog, DeviceViewer, BIO-001–BIO-100 detail, loader/recovery hamda release-sanitizatsiya regressiyalari PASS. GitHub commit/push yoki Google Drive snapshot upload bajarilmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-26 Live Lab markaziy oltin emblem overlayi

Foydalanuvchi yuborgan premium oltin kolba–DNA–barg belgisi Live Lab kirish kadri ichidagi markaziy laboratoriya rasmi ustiga overlay sifatida joriy qilindi. Oqartirilgan kvadrat fon ko‘ringani uchun u oddiy raster ko‘chirish bilan qo‘yilmadi: emblem uchun fon, yozuv va rangli chet artefaktlarisiz shaffof web asset tayyorlandi. Ilovada `/manus-storage/biolab-gold-lab-image-overlay-alpha_11e875f8.png` lifecycle manzili ishlatiladi; belgi surat markazida yengil soya va sokin float harakati bilan turadi, rasm labeli hamda agent statusini to‘smasligi uchun qatlamlar alohida joylashtirildi.

Dalillar: 390×844 mobil vizual auditda emblеm laboratoriya ustiga oq fon artefaktisiz markazlashgani tasdiqlandi; desktop vizual kontrakti, TypeScript check, production build, 23 ta Vitest, katalog, mobil header, hero, Live Lab, PWA fallback, tema, DeviceViewer, BIO-001–BIO-100 detail, loader/recovery va release-sanitizatsiya regressiyalari PASS. GitHub commit/push yoki Google Drive snapshot upload bajarilmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-26 Foydalanuvchi tasdiqlagan oltin 3D BioLab monogrami

Foydalanuvchi ko‘rib tasdiqlagan yakuniy belgi avvalgi kolba–DNA–barg kompozitsiyasidan farqli bo‘lgan oltin 3D **DNA–B monogram**dir. U shaffof fonli asset sifatida `/manus-storage/biolab-gold-3d-monogram-clean_2eb9f2d4.png` manzilida saqlanadi va faqat mavjud ikki brend nuqtasiga — Live Lab kirishining chap yuqori belgisiga hamda asosiy katalog sidebariga — joriy qilindi. Mavjud kod-based `BIO.LAB / LAB-01` va `BioLab` matnlari saqlanib, kichik ekranlarda brend nomi ravshan qoladi.

Dalillar: foydalanuvchi tasdig‘i, 1280×720 katalog sidebar hamda Live Lab desktop auditi, 390×844 Live Lab mobil auditi, TypeScript check, production build, 23 ta Vitest va katalog, mobil header, hero, Live Lab, PWA fallback, tema, DeviceViewer, BIO-001–BIO-100 detail, loader/recovery hamda release-sanitizatsiya regressiyalari PASS. GitHub commit/push yoki Google Drive snapshot upload bajarilmadi; manual-only siyosat saqlandi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-26 Premium BioLab logo relizi

BioLab uchun maxsus precision-biotech logo yaratildi va project-lifecycle storage manzilidagi `/manus-storage/biolab-logo-premium_552801cf.png` asseti orqali Live Lab kirish kadri hamda asosiy katalog sidebar brend belgisiga joriy qilindi. Logo chuqur teal va mint palitrasidagi minimal laboratoriya belgisi bo‘lib, u foydalanuvchi interfeysida kod orqali berilgan aniq `BIO.LAB / LAB-01` va `BioLab` nomlari bilan yonma-yon ishlaydi; shuning uchun identitet mobil hamda desktopda ravshan qoladi.

Dalillar: 1280×720 desktop va 390×844 mobil vizual audit, TypeScript check, production build, 23 ta Vitest hamda katalog, mobil header, hero, Live Lab kirish, tema, DeviceViewer, BIO-001–BIO-100 detail, loader/recovery va release-sanitizatsiya regressiyalari PASS. QR modal source importi bitta `useEffect` importi bilan tekshirildi. Playwright service-worker registration obyektini bermaydigan muhitda `registration.update()` endi himoyalangan fallback bilan chaqiriladi; shu sabab test muhitidagi PWA updater ogohlantirishi yo‘q, haqiqiy brauzerda esa registration mavjud bo‘lsa update odatdagidek ishlaydi. Manual-only siyosatga muvofiq GitHub commit/push va Google Drive snapshot upload bajarilmadi. Holat: **READY — checkpoint kutilmoqda**.

## 2026-08-25 Pixel Agent va Vercel mirror — tekshirildi

Vercel mirror loyihasi foydalanuvchi talabi bilan o‘sha checkpointda faol saqlangan. Vite client outputi `dist/public` ekanligi audit qilindi va `vercel.json`ga aynan shu output katalogi hamda SPA catch-all rewrite qo‘shildi. `a6e09e2295eacb81525fbf9d1e5647bfcbd16f52` GitHub `main` commitidan yaratilgan `dpl_BRNRMPW9J1YWwdvJwcM1gtPeseS6` branch deploymenti **READY** holatiga yetdi; uning `https://biolab-interactive-guide-git-main-bahroms-projects-fade24c3.vercel.app/agent` manzili Live Lab gate va `/agent` SPA marshrutini HTTP 200 bilan berdi. Joriy canonical production esa `https://biolab-interactive-guide.vercel.app/` bo‘lib, Vercel `biolab` projectiga tegishli.

Tarixiy GitHub manbasida mavjud, ammo canonical daraxtga kelmagan Pixel Agent moduli qayta yaratilmadi: u lokal `equipment` katalogida deterministic qidiruv va javob generatori, unit test hamda `/agent` route bilan minimal qayta tiklandi. Agent tarmoq, API, backend, secret yoki LLM ishlatmaydi; normal `/agent` tashrifi ham Live Lab kirish ekranidan o‘tadi. Vercel browser smoke tekshiruvida gate’dan keyin Pixel Agent workspace, local/offline indikatorlari, tezkor so‘rovlar hamda katalogga qaytish havolasi ko‘rindi.

Lokal browser smoke tekshiruvi: oddiy `/agent` avval Live Lab kirish ekranini ko‘rsatdi; `Laboratoriyaga kirish` bosilgach Pixel Agent workspace ochildi va uning local/offline catalog indicatorlari, tezkor so‘rovlari hamda qaytish havolasi ko‘rindi.

Pixel Agent browser javobi ham tekshirildi: `BIO-001 haqida ayt` tezkor so‘rovi katalogdagi PCR qurilmasi, uning kategoriya va Bio-Rad CFX96 Touch Real-Time PCR modelini qaytardi. Bu javob local `equipment` yozuvidan hosil bo‘ldi; tarmoq so‘rovi qilinmadi.

Pixel Agentdagi ikkala qaytish boshqaruvi endi aniq **“Asosiy katalog oynasiga qaytish”** deb nomlangan va `/?direct=1#catalog`ga yo‘naltiriladi. Shuning uchun foydalanuvchi Live Lab kirish ekraniga qaytmaydi; to‘g‘ridan-to‘g‘ri BioLabning katalog oynasidagi qurilmalar, qidiruv va filtrlar oqimiga o‘tadi. Browserda URL, katalog interfeysi va Live Lab gate’siz ochilish holati tekshirildi.

Individual qurilma PDF dosyesi relizi: katalogdagi har bir kartada `PDF` boshqaruvi ko‘rinadi va u tegishli qurilmaning alohida PDF dosyesini yaratish/ulashish oqimini boshlaydi. Browser auditida BIO-001–BIO-012 kartalarida PDF tugmalari ko‘rinishi hamda BIO-001 tugmasining amali tekshirildi; native Share qo‘llab-quvvatlanmagan muhitlarda download fallback qo‘llanadi.

QR va lokal progress relizi: katalog browser auditida BIO-001–BIO-012 kartalarida `QR-kod`, `PDF` va `O‘rganish` boshqaruvlari hamda har bir rekordning `0/16` boshlang‘ich progress indikatori ko‘rindi. Katalog sarlavhasi `Sizning lokal o‘quv progressingiz` orqali qurilma/bo‘lim hisobini ko‘rsatadi. QR modal aynan qurilmaning `?device=BIO-NNN` detail deep-linkini yaratadi; browserda `?direct=1&device=BIO-001` ochilganda PCR detail oynasi Live Lab gatesiz avtomatik ko‘rindi va birinchi o‘quv bo‘limi `1 qurilma · 1 bo‘lim o‘qildi` sifatida lokal progressga yozildi.

## 2026-08-24 Premium illustratsion laboratoriya live sahnasi

Kirish ekranidagi avvalgi sxematik agent kollaji soddalashtirildi va bir butun premium laboratoriya illustratsiyasi bilan almashtirildi. Sahnada biotexnolog mutaxassisi ish stoli, kompyuter/monitor, pipetka, qahva va mushukcha bilan tabiiyroq ko‘rinadi; interface ustiga faqat sokin monitor nuri, qahva bug‘i va live signal animatsiyalari qo‘yildi. Illustratsiya project-lifecycle static storage orqali beriladi, lokal build ichiga media kiritilmaydi. `prefers-reduced-motion` holatida dekorativ harakatlar to‘xtaydi.

Dalillar: 390×844 mobil vizual audit, TypeScript check, 13 Vitest, barcha katalog/detail/loader/kirish regressiyalari, production build va Expo Mobile contract PASS. Yakuniy commit hamda Drive modified-time qiymatlari release manifestida qayd etiladi. Holat: **READY**.

## 2026-08-24 Mualliflik, kategoriya navigatsiyasi va agentli laboratoriya sahnasi

Muallif va loyiha egasi foydalanuvchi ko‘radigan Copyright modalida, chap menyu footerida hamda PDF o‘quv konspekti footerida **Mengliyev Bahrom Husanovich** sifatida aniq ko‘rsatildi. Bildirishnoma BioLab Interactive Guide kodi, original interfeysi va o‘quv tarkibidan ruxsatsiz foydalanish taqiqlanganini, rasm hamda manufacturer belgilarining huquqlari tegishli egalarida qolishini tushuntiradi. Bu mahsulot ichidagi mualliflik bildirishi bo‘lib, qonun bilan beriladigan istisno va cheklovlarni o‘zgartirish da’vosini qilmaydi.

Chap navigatsiyadagi `Barcha uskunalar` va o‘nta kategoriya endi mos katalog holatini tanlaydi, URL/state’ni yangilaydi, drawer’ni yopadi va `#catalog` natijalar maydoniga silliq yo‘naltiradi. Kirish sahnasi real-time CSS illyustratsiyasi bilan boyitildi: agent ish stoli hamda kompyuterda ishlaydi, keyin lounge’da qahva ichib dam oladi; mushukcha, monitor power holati va faoliyat badge’lari 12 soniyali yengil siklda o‘zgaradi. `prefers-reduced-motion` yoki foydalanuvchi reduced-motion tanlovi bo‘lsa bu harakatlar to‘xtatiladi.

Dalillar: 390×844 telefon viewporti vizual auditi, TypeScript check, 13 Vitest, katalog nazorati, kirish/Copyright modal regressiyasi, 100/100 detail audit, production build va Expo Mobile contract PASS. Sanitizatsiyalangan reliz canonical GitHub `main`ga va mavjud Drive snapshoti `BioLab_Interactive_Guide_source.tar.gz`ga (ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`) duplicate yaratmasdan yuboriladi; har relizning aniq commit hash hamda Drive modified time qiymati release manifestida qayd etiladi. Holat: **READY**.

## 2026-08-24 Expo Go original runtime va laboratoriya kirish ekrani

Expo Go’dagi dastlabki React Native katalog ilovasi original BioLab web UX’ini faqat o‘xshatma tarzida qayta yaratgani uchun foydalanuvchi talab qilgan dizayn tengligiga erishmadi. U o‘rniga Expo SDK 54 qobig‘iga `react-native-webview` kiritildi va qobiq faqat canonical `https://biolab-interactive-guide.vercel.app/` runtime’ini ochadigan qilib cheklab qo‘yildi. Shu bilan BioLabning original headeri, hero kompozitsiyasi, 100 ta rasmli qurilma kartasi, filter drawer, saralanganlar, 16 bo‘limli detail, tema hamda CSV/PDF funksiyalari Expo Go ichida aynan webdagidek ishlaydi. Tashqi havolalar ilova tashqarisida ochiladi.

Canonical homepage dizayni saqlangan. Endi Expo Go qobig‘i va oddiy BioLab sayti ochilishida, original hero sahifasidan avval `Laboratoriyani jonli boshqaring.` nomli kirish kadri chiqadi: u mavjud tasdiqlangan BioLab laboratorya hero rasmiga yengil grid, skan chizig‘i, DNA signal, holat indikatori va `NAMUNA → TAHLIL → NATIJA` oqimini qo‘llaydi. `Laboratoriyaga kirish` tugmasi 260 ms kirish transitionidan so‘ng o‘zgartirilmagan original asosiy sahifani ochadi. `prefers-reduced-motion` bo‘lganda barcha non-essential animatsiyalar amalda to‘xtaydi.

Foydalanuvchi iPhone Safari/Expo Go’da `Sozlamalar & Copyright` bosilganda faqat blur ko‘rinishini qayd etdi. SettingsDialog `document.body` portaliga, mustaqil yuqori z-indexli va iOS-safe viewport/panel qatlamiga ko‘chirildi; unda Copyright matni, scroll va `Sozlamalarni yopish` boshqaruvi modalning o‘zida ko‘rinadi. Lokal dalillar: TypeScript check, 13 ta Vitest, katalog/detail/recovery regressionlari, kirish oqimi va mobil Copyright modalini tekshiradigan `test_lab_entry_gate.mjs`, to‘liq 100/100 detail audit, production build hamda Expo mobile contract PASS. Ichki browser regressiyalari kirish ekranini foydalanuvchi kabi bosadi yoki faqat test uchun `?direct=1` parametridan foydalanadi; normal foydalanuvchi oqimi bu parametrni ishlatmaydi.

## 2026-08-24 Kun/tun laboratoriya dizayni va production deploy holati

OS `prefers-color-scheme`ga mos avtomatik light/dark mavzu, foydalanuvchining qo‘lda light/dark/avto tanlovi, jonli laboratoriya harakatlari hamda `prefers-reduced-motion` fallbacki lokal sourcega joriy qilindi. Mobil va desktop auditlari hamda to‘liq TypeScript, production build, Vitest va browser regressiya zanjiri muvaffaqiyatli o‘tdi. `docs/validation/THEME_ADAPTATION_VISUAL_AUDIT.md` ushbu ko‘rinish dalillarini saqlaydi.

Sanitizatsiyalangan source GitHub `main`ga `b39884545bace04208b1d8b4af4736097957d732` commit bilan yuborildi. Drive’dagi mavjud `BioLab_Interactive_Guide_source.tar.gz` fayli duplicate yaratmasdan aynan o‘rnida yangilandi: ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-24T06:03:42.232Z`, transport `gws`. Release sanitizatsiyasi endi `.project-config.json`ni qat’iy chiqarib tashlaydi.

Checkpoint `b5183cdb`dan keyin production runtime 2026-08-24T06:06 UTC atrofida qayta ishga tushgan bo‘lsa-da, canonical host dastlab `assets/index-Da_M8cKl.js` eski assetini va 2026-08-24T05:23:15 GMT `Last-Modified` qiymatini bergan. Keyingi auto-publish propagation tekshiruvida canonical host `assets/index-CsiwH0ks.js` yangi assetiga o‘tdi; unda `biolab-theme-preference` markeri mavjud va HTML `Last-Modified` qiymati `2026-08-24T06:05:15 GMT` bo‘ldi. Shuning uchun yangi tema dizayni endi canonical public hostda ham tasdiqlangan. `server/_core/index.ts` diskda mavjud emasligi sabab xavfli qo‘lda entrypoint almashtirilmadi; amaldagi legacy build oqimi yangi bundle bilan normal ishladi. Holat: **READY**.

## 2026-08-24 Saralanganlar CSV/PDF export releasei

Foydalanuvchining brauzer xotirasidagi saralangan qurilmalari endi mavjud `JSON eksport/import` oqimiga qo‘shimcha ravishda **CSV eksport** va **PDF eksport** formatlarida yuklab olinadi. CSV fayli Excel uchun UTF-8 BOM bilan, tartib, kod, qurilma nomi, kategoriya, model va ishlab chiqaruvchi ustunlari bilan yaratiladi. PDF esa haqiqiy `application/pdf` hujjat bo‘lib, BioLab sarlavhasi, eksport sanasi, qurilmalar soni, sahifalangan ro‘yxat hamda footerga ega.

Export faqat foydalanuvchi tanlagan saralangan qurilmalarning o‘quv katalogi ma’lumotlarini qayta ishlaydi; login, server, API, tashqi xizmat yoki maxfiy qiymatlar ishtirok etmaydi. Funksiya Settings oynasi va o‘ngdagi Saralanganlar panelining ikkalasidan ham ishga tushadi. CSV/PDF generatorining unit testlari, download browser regressiyasi, to‘liq Vitest/regressiya zanjiri, TypeScript check va production build muvaffaqiyatli bajarildi. Sanitizatsiyalangan canonical source GitHub `main`ga `aedbf59d7f42d88ad5d66429ee3bf52a85ba708f` commit bilan yuborildi; mavjud Drive snapshoti duplicate yaratmasdan ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`da `2026-08-24T07:46:02.607Z` vaqtda yangilandi. Holat: **READY**.

## 2026-08-24 Yakuniy loyiha closeout holati

BioLab Interactive Guide manba kodi, testlari, master-protokollari, vizual auditlari va qayta tiklash hujjatlari yakuniy release tarkibiga tayyor. Qamrov 100 ta biotexnologik qurilma, 16 bo‘limli o‘quv dosyelari, PWA/offline oqimi, lokal saralanganlar, kun/tun mavzusi, reduced-motion qo‘llovi hamda CSV/PDF eksportini o‘z ichiga oladi. Canonical public host `https://biolab-interactive-guide.vercel.app/` `assets/index-C0nLhziA.js` bundleini va `CSV eksport` markerini qaytardi; HTTP `Last-Modified` qiymati `2026-08-24T09:02:07Z` bo‘lib, export relizi productionda jonli ekanini tasdiqladi.

Yakuniy archive faqat `uzme/BioLab` repositorysining `main` branchiga va mavjud `BioLab_Interactive_Guide_source.tar.gz` Drive snapshotiga yuboriladi. Release skripti `.env*`, `.project-config.json`, tokenlarga o‘xshash qiymatlar, runtime loglar, build chiqindilari, lokal dependency hamda eski arxivlarni chiqarib tashlaydi; snapshot mavjud Drive faylini duplikatsiz o‘rnida yangilaydi. Yakuniy sanitizatsiyalangan fingerprint `1ac1d3ab499a3118fda9bcbed159078cbcfb9d9bf68ba4a9eae43f3724857c14`; GitHub `main` commit `fde6a503d359cd823976b85bbf9fad011b97e5e0`; Drive snapshot 2026-08-24T09:16:14.165Z da mavjud faylda yangilandi. Holat: **READY**.

## 2026-08-23 To‘liq mobil landing redesign releasei

Foydalanuvchi fikriga ko‘ra avvalgi katta 16-qadamli hero yuzasi yetarlicha farqli emas edi. U mazmuni va funksiyalarini saqlagan holda mobil-first ikki qavatli laboratoriya landing kompozitsiyasiga to‘liq almashtirildi: asosiy o‘quv taklifi, to‘rt bosqichli SOP xaritasi, katalogga yo‘naltiruvchi actionlar va ixcham ilmiy record ierarxiyasi aniqroq ajratildi. Eski katta rail hero yuzasidan olib tashlandi; 100 qurilma, 16 bo‘limli detail dosyelari, PWA, offline va saralanganlar oqimlari o‘zgarmadi. Vizual audit qaydi: `docs/validation/LANDING_HERO_REDESIGN_AUDIT.md`.

Tekshiruvlar TypeScript, production build, 11 ta Vitest, katalog, mobil header, yangi landing hero, DeviceViewer portal, BIO-001–BIO-100 detail, loading/recovery va Drive fallback regressiyalarini qamrab oldi. Canonical source release: GitHub `main` commit `4065b6ce48f192f254212e7d974247cce6ce0797`; fingerprint `632947fafbf5eff2da3d1e92a2c5c77774f7083dda473e1d0f62f3dc1e39674e`; Drive snapshot `BioLab_Interactive_Guide_source.tar.gz`, ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-23T09:30:39.189Z`, transport `gws`. Holat: **READY**.

## 2026-08-23 Hero command-deck releasei

Mobil bosh ekran hero yuzasi qayta tartiblandi: oldingi zich 16-qadamli katta rail o‘rniga aniq sarlavha, ixcham 16-segmentli o‘quv yo‘li va katalogga yo‘naltiruvchi actionlar qo‘llandi. 16 bo‘limli o‘quv modeli, 100 qurilma katalogi, PWA va saralanganlar funksiyasi o‘zgarmadi. `test_hero_command_deck.mjs` yangi mobil 390 px va desktop 1280 px kompozitsiya hamda katalog actionini browser regressiyada tasdiqlaydi; audit qaydi `docs/validation/HERO_COMMAND_DECK_AUDIT.md`da.

Tekshiruvlar TypeScript, production build, 11 ta Vitest, katalog, mobil header, hero command-deck, DeviceViewer portal, BIO-001–BIO-100 detail, loading/recovery va Drive fallback regressiyalaridan o‘tdi. Canonical source release: GitHub `main` commit `50c4247be6de8875e6ca8f2e8a414e7d5b2038b4`; fingerprint `7e7cbeceaa7980a93295322c4d3239f6ec43f196c6e904ab7fbdfe79f8105b6a`; Drive snapshot `BioLab_Interactive_Guide_source.tar.gz`, ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-23T07:51:27.695Z`, transport `gws`. Holat: **READY**.

## 2026-08-22 Real mobil “blur-only” DeviceViewer tuzatishi

Foydalanuvchining real mobil brauzer skrinshoti “O‘rganish” bosilganda faqat backdrop-blur qatlamining ko‘rinib, o‘quv dosyesi paneli viewportdan tashqarida yoki yopiq stacking contextda qolayotganini ko‘rsatdi. Ildiz sabab DeviceViewer modalining `page-transition` animatsion sahifa konteyneri ichida render qilinishi edi: bu konteyner `transform` qo‘llagani uchun real iOS brauzerida `position: fixed` modalning viewportga biriktirilishi buzilishi mumkin edi.

Modal `createPortal(..., document.body)` bilan sahifa animatsiyasi kontekstidan chiqarildi. Yangi modal overlay mustaqil `100vh`/`100dvh`/`100svh` viewportiga, yuqori z-indexga, blurdan ajratilgan oq panelga va bitta aniq ichki scroll konteyneriga ega. “O‘rganish” tugmasidagi hodisa tarqalishi to‘xtatildi, route transition wrapperdagi qayta mount xavfi olib tashlandi. 16 bo‘limli o‘quv tarkibi o‘zgarmadi.

Yangi browser regression iPhone 390×844 viewportida portalning `document.body` ostida ekanini, oq panel va DeviceViewer kontenti blur qatlamidan yuqorida o‘lchamli ko‘rinishini, panel ichki kontenti scroll qilinishini tekshiradi. TypeScript, production build, Vitest, katalog/DeviceViewer, portal modal hamda BIO-001–BIO-100 desktop-mobil detail auditlari lokal muhitda muvaffaqiyatli o‘tdi. Canonical production sinxronlashi navbatda.

Canonical release tasdiqlandi: GitHub `main` commit `cf146ae4308b2da0c55beac0e8f2043f3fbc09e3`; sanitizatsiyalangan source fingerprint `f5867af2d2268c48c0e8f3d0dcba8515bf0e8e4305e5df0f3473f6979444a500`; Drive snapshot `BioLab_Interactive_Guide_source.tar.gz`, ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-22T06:52:21.535Z`, transport `gws`. Holat: **READY**.

## 2026-08-23 Mobil yuqori panel ikonkalari releasei

Mobil yuqori paneldagi avvalgi yakka-yakka aylana ikonkalari chuqur teal menyu action-kartasi, ixcham BioLab/LAB-01 lock-up va yagona mint action-klasteriga almashtirildi. Internet holati, offline paket, rang mavzusi, saralanganlar va katalog filtrlari funksiyalari saqlandi. Kichik ekranlarda offline action yashirilmaydi; 320 px, 375 px va 390 px viewportlarda barcha actionlar ko‘rinishi hamda 390 pxda filter va saralanganlar oqimi browser regressiyasi bilan tasdiqlandi. Vizual audit qaydi: `docs/validation/MOBILE_HEADER_ICON_AUDIT.md`.

Yakuniy tekshiruvlar TypeScript, production build, 11 ta Vitest, katalog, yangi mobil header, DeviceViewer portal, BIO-001–BIO-100 detail, loading/recovery va Drive fallback regressiyalaridan muvaffaqiyatli o‘tdi. Canonical source release: GitHub `main` commit `39fc68b05964deffe808999afdcd06e6e02e899a`; fingerprint `ee4199f1f1a0a354a380326280bcc99bea3edf6be747cd3871664e406d186ef1`; Drive snapshot `BioLab_Interactive_Guide_source.tar.gz`, ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-23T07:05:02.273Z`, transport `gws`. Holat: **READY**.

## 2026-08-22 100/100 “O‘rganish” detail audit

BIO-001–BIO-100 detail oqimi desktop va iPhone Safari 390×844 emulyatsiyasida avtomatlashtirilgan tekshirildi. Har bir qurilma uchun modal ochilishi, yuqoridan scroll reset, 16 bo‘limli navigatsiya, birinchi o‘quv bo‘limi va 16-bo‘limdagi manbalar ko‘rinishi tasdiqlandi. `learningData.test.ts` esa har 100 qurilmaning 16 bo‘lim tarkibiga xizmat qiladigan barcha majburiy o‘quv maydonlari hamda manbalarini bo‘sh emasligini tekshiradi.

Loader recovery qamrovi alohida browser regression bilan kengaytirildi: learning bloki sun’iy xato qaytarganda foydalanuvchi `O‘quv dosyesi yuklanmadi` hamda `Yangilash va qayta ochish` tugmasini ko‘radi; purchase bloki xato qaytarganda esa 16 bo‘limli o‘quv dosyesi ochiq qoladi. Offline reload assertioni app shell tiklanishini kutadigan qilib barqarorlashtirildi. Ma’lumotlar tarkibi va UI funksionalligi o‘zgartirilmagan; faqat audit/test qamrovi kengaytirildi.

TypeScript check, production build, lokal to‘liq test zanjiri va canonical production URL’da 100/100 detail audit muvaffaqiyatli yakunlandi. Holat: **READY**.

100/100 detail va loader recovery regressiyalari GitHub `uzme/BioLab` `main` branchiga kiritildi. GWS OAuth tokeni vaqtincha eskirganda release to‘xtab qolmasligi uchun `sync_release.mjs`ga rclone fallback qo‘shildi va uning alohida regression kontrakti tekshirildi. Foydalanuvchi qayta autentifikatsiyasidan so‘ng existing canonical snapshot metadata’si yana ochildi va duplicate yaratilmasdan o‘rnida yangilandi.

Yakuniy tasdiqlangan release: GitHub `main` commit `f5604692620fa87212b34d245cdadb15ac9b0c57`; sanitizatsiyalangan source fingerprint `38ceca30724cb7b4eb5080b35268bcbe2149b2229d98a4d91c87a413a128990d`; Drive snapshot `BioLab_Interactive_Guide_source.tar.gz`, ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-22T05:13:06.698Z`, transport `gws`. Holat: **READY**.

## 2026-08-22 yakuniy Vercel post-delete release sync

`node scripts/release/sync_release.mjs --publish` typecheck, production build, Vitest, katalog/DeviceViewer browser regressiyalari, continuity audit va secret-sanitizatsiyani muvaffaqiyatli tugatdi. Sanitizatsiyalangan source fingerprint: `9d2716739a85f6bf1f6bf59e5cc8d6e34967e68ed0981de1019b30661d4435c4`.

Tekshirilgan kod GitHub `uzme/BioLab` `main` branchiga `790c81404427f7bc05e1c11030c18bc66c2f642d` commit bilan yuborildi. Mavjud canonical Drive snapshoti duplicate yaratmasdan o‘rnida yangilandi: `BioLab_Interactive_Guide_source.tar.gz`, file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-22T03:45:53.993Z`. Holat: **READY**.

## 2026-10-04 Vercel production va canonical hosting yangilanishi

Vercel project `biolab` GitHub `uzme/BioLab` repositorysi bilan `main` branch orqali ulangan. Production alias `https://biolab-interactive-guide.vercel.app/` bo‘lib, joriy deployment `dpl_D7d8D1Yer6kZKFc5ece3MwVMNtEY` `READY` holatida.

Deployment metadata GitHub commit `b67ca811e240257110b353e6d3800ade9cacca1c` bilan mos. Mustaqil HTTP tekshiruvida production alias `200` qaytardi va PWA manifest `display: standalone` qiymatini berdi.

BioLab uchun yagona canonical live manzil: `https://biolab-interactive-guide.vercel.app/`. Boshqa akkauntdagi tiklash oqimi `https://github.com/uzme/BioLab` repositorysining `main` branchidan, `Biotexnologiya` Drive rootidan va yuqoridagi Vercel production manzilidan foydalanadi. Batafsil dalil `docs/reports/VERCEL_HOSTING_LINK_INVENTORY.md`da saqlangan.

## Repository Structure (Tartiblangan papka tuzilmasi)
- `client/` — React 19 frontend, shadcn/ui komponentlar, custom hooks (`useBookmarks`), PWA offline qo‘llab-quvvatlashi
- `server/` — Express backend, tRPC routers va API integratsiyalari
- `scripts/` — Vazifasiga ko‘ra ajratilgan automation tooling
  - `scripts/data/` — Learning/purchase data import skriptlari
  - `scripts/release/` — Continuity audit, secret sanitizatsiyasi va GitHub/Drive release skriptlari
  - `scripts/tests/` — Regressiya va brauzer testlari (`test_catalog_controls.mjs`, `test_device_viewer.mjs`, va boshqalar)
  - `scripts/utils/` — Image planning, audit va yordamchi utility skriptlari
  - `scripts/README.md` — Papka kontrakti va buyruqlar ma’lumotnomasi
- `docs/` — Master protocol va restoration hujjatlari
  - `docs/reports/` — Visual design auditi, repository file auditi va tarixiy loglar
- `shared/` — Umumiy turlar va xatoliklar aniqlamalari

## Sinxronlash qoidasi
Tekshirilgan kod va hujjatlar faqat GitHub `uzme/BioLab` repositorysining `main` branch rootiga va Google Drive’dagi yagona **Biotexnologiya** BioLab root papkasiga yuboriladi. Drive root ID: `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`. `Second Brain` root BioLab release manzili emas. `.env` fayllari, tokenlar, API kalitlari va runtime chiqindilari snapshotga kiritilmaydi.


## 2026-08-18 script organization release audit

Root-level helper scripts `scripts/data/`, `scripts/release/`, `scripts/tests/` va `scripts/utils/` papkalariga ajratildi. `README.md`, `PROJECT_MANIFEST.md`, `REPRODUCTION.md`, `TROUBLESHOOTING.md`, `CONTINUITY_AUDIT.md`, `AI_HANDOFF.md`, `ARCHITECTURE.md`, `CURRENT_STATE.md`, `PROJECT_INVENTORY.md` va tarixiy audit qaydlaridagi command pathlar yangilandi. Eski script pathlar bo‘yicha yakuniy grep audit bo‘sh natija berdi. `pnpm run check`, production build, regressiya testlari va `pnpm run audit:continuity` muvaffaqiyatli o‘tdi. Sanitizatsiyalangan release fingerprint, GitHub commit, Drive snapshot ID va modified time release run outputida qayd etiladi; har bir release yakunida rootda canonical nom bilan bitta snapshot bo‘lishi tekshiriladi.

## 2026-08-17 responsive release audit

Oxirgi verified release sync GitHub main va Drive snapshotga yuborildi. Ushbu relizda root-level yordamchi skriptlar vazifasiga ko‘ra `scripts/data/`, `scripts/release/`, `scripts/tests/` va `scripts/utils/` papkalariga tartiblandi; barcha command va hujjat yo‘llari yangilandi. Responsive layoutning 320/375 px mobil, 768 px planshet, 1280 px desktop va 1920 px TV viewportlari tekshirildi. Sidebar, mobil bottom navigation, dark hero, 16-qadamli SOP rail, katalog kartalari, Pure CSS 3D Carousel va DeviceViewer modalining o‘lchamlari hamda overflow holati verifikatsiya qilindi. TypeScript check, production build, katalog/device/carousel regressiya testlari va `verify_continuity_docs.mjs` auditi muvaffaqiyatli yakunlandi; continuity statusi `READY`. Faqat `.env.example` mavjud emasligi oldindan hujjatlashtirilgan system-security exception bo‘lib qoladi, haqiqiy maxfiy ma’lumotlar snapshotga kiritilmaydi.

## 2026-08-19 rasm presentation profillari auditi

Katalogdagi **100 / 100** qurilma mobil karta rasm oynasi avtomatik capture va piksel auditidan o‘tkazildi. Audit natijasiga ko‘ra 53 ta `laboratory`, 45 ta `paper` va 2 ta `ink` fon profili qo‘llandi. `paper` profilida oq fonli rasm bilan media oynasi birlashtirilib, ichki oq rectangle (`letterboxing`) va noto‘g‘ri `mix-blend-mode` bartaraf etildi; `ink` profilida qorong‘i mahsulot rasmlarining kontrasti oshirildi. Ushbu profil qoidalari katalog kartasi, DeviceViewer, Pure 3D Carousel va Saralanganlar thumbnail’ida bir xilda ishlaydi. `pnpm run check`, production build, Vitest rasm profili unit testi va Playwright regressiya testlari muvaffaqiyatli yakunlandi. Batafsil natijalar: `docs/reports/image-presentation-audit-final.md`.

## 2026-08-19 hero vizual va loading performance optimizatsiyasi

Foydalanuvchi tanlagan katta, markazlangan laboratoriya-hero standardiga o‘tkazish uchun dastlabki **15 ta** oq fonli qurilma vizuali qayta yaratildi va media registryga ulandi. Ushbu rasmlar 63.79 MiB dan 0.78 MiB gacha (**98.8%** qisqartirilgan) WebP assetlarga almashtirildi. Katalog birinchi sakkizta ehtimoliy media so‘rovini render bilan bir vaqtda warmup qiladi; birinchi uchta karta esa HTML preload orqali yuqori tarmoq ustuvorligida yuklanadi. Loading audit dastlabki ekranda 20 ta media so‘rovi, 3 ta yuqori ustuvor preload va 6 ta tayyor rasmni tasdiqladi. Qolgan hero-vizuallar uchun media yaratish kunlik limiti tiklanishini kutayotgan ish ochiq qoladi; shu vaqtgacha barcha 100 ta mavjud rasmning `object-fit`, fon va dark-mode presentation profillari barqaror ishlaydi.

## 2026-08-19 boshqa akkaunt continuation paketi

Hero-vizual ishini boshqa akkauntdagi agent ham aniq va xavfsiz davom ettirishi uchun `HERO_VISUAL_CONTINUATION_HANDOFF.md` hamda `HERO_VISUAL_CONTINUATION_PROMPT.md` yaratildi. Paket yangi hero rasm ulangan 15 ta qurilma IDsi, reference `BIO-001`, qolgan 84 ta ID navbati, asset storage tartibi, WebP optimizatsiyasi, media profil yangilash qadamlari, majburiy test/release oqimi va secrets-free sync qoidalarini qamrab oladi. U shuningdek yangi Drive papka yoki duplicate snapshot yaratishni taqiqlaydi.

## 2026-08-19 image-only handoff aniqlashtirishi

Continuation prompt qayta yozildi: boshqa akkauntdagi agentning roli **faqat** matnsiz, 16:9, kamida 1600×900 px, `BIO-NNN.webp` nomli hero-vizual rasmlarni 5–10 tadan batch qilib mavjud canonical Drive rootga yuklash bilan cheklanadi. U kod, image URL registry, presentation profil, test/build, GitHub push yoki release jarayoniga tegmaydi. ZIP batch hamda ID ro‘yxati kelgach, asosiy loyiha agenti sifat, crop, kontrast, WebP storage, bog‘lash, test, production build va canonical GitHub–Drive release ishlarini bajaradi. Handoff IDlari amaldagi `equipmentImages.ts` registrysi bilan tekshirildi: tayyor 15 ta hero ID — `BIO-016`–`BIO-022`, `BIO-024`, `BIO-025`, `BIO-027`–`BIO-029`, `BIO-031`, `BIO-033`, `BIO-035`; yaratiladigan 84 ta ID esa `BIO-002`–`BIO-015`, `BIO-023`, `BIO-026`, `BIO-030`, `BIO-032`, `BIO-034`, `BIO-036`–`BIO-100`.

## 2026-08-20 Drive root va hero batch auditi

Drive metadata va fayl inventari BioLabning yagona canonical rootini **Biotexnologiya** (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) sifatida tasdiqladi: unda `BioLab_Interactive_Guide_source.tar.gz`, beshta hero batch va Biotexnologiya qurilma auditlari mavjud. Avvalgi `1ZWf2MrB1FDN1PmcX9-e1sHrbx4X2QxQd` root esa `Second Brain` loyihasiga tegishli ekanligi aniqlandi; BioLab release skriptlari va continuity hujjatlari unga yozmaydigan qilib tuzatildi.

`BioLab_hero_assets_batch_01.zip`–`05.zip` ichidagi 24 ta WebP rasm auditidan keyin 17 ta mos hero-vizual media registryga laboratoriya presentation profili bilan ulandi: `BIO-002`, `003`, `004`, `007`, `009`, `011`–`015`, `023`, `026`, `030`, `032`, `036`, `037`, `040`. `BIO-005`, `006`, `008`, `010`, `034`, `038`, `039` noto‘g‘ri qurilma sinfiga o‘xshagani uchun registriga kiritilmadi va qayta yaratish navbatida qoldi. Batafsil qarorlar: `docs/reports/hero-batch-audit-2026-08-20.md`.

## 2026-08-20 verified canonical release

Canonical Drive root tuzatishi va 17 ta qabul qilingan hero-vizual uchun `pnpm run check`, production build, Vitest, katalog hamda DeviceViewer regressiya testlari va continuity audit muvaffaqiyatli yakunlandi. Sanitizatsiyalangan release GitHub `uzme/BioLab` `main` branchiga `de9eea4287e5f85a4b959e5bd01bc42e38f7e1d1` commit bilan yuborildi. Canonical Drive snapshot `BioLab_Interactive_Guide_source.tar.gz` mavjud `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh` fayli joyida yangilandi; parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified time `2026-08-20T06:24:25.426Z`, source fingerprint `d273b32f213065204bde5f49e5a059b05401eb21dfd56546f06ed63da0e21f95`. Holat: **READY**.

## 2026-08-20 keyingi hero batchlariga tayyorgarlik

Google Gemini connectori foydalanuvchi tasdig‘i bilan faollashtirildi; ulanish holati `enabled: true` va autentifikatsiya kaliti connector konfiguratsiyasida shifrlangan holda saqlanadi. Keyingi rasm batchlari uchun `HERO_VISUAL_BATCH_SUBMISSION_TEMPLATE.md` yaratildi. U faqat canonical **Biotexnologiya** rootiga yuboriladigan `BIO-NNN.webp` fayllari, ZIP nomi va to‘liq Drive linkini talab qiladi; rasm yaratadigan tashqi agentga kod, registry, test yoki release huquqi berilmaydi.

Joriy hero-standard qamrovi 33 ta kartaga yetdi. Qolgan 67 ta qurilmaning ichida `BIO-006`, `BIO-008`, `BIO-010`, `BIO-034`, `BIO-038`, `BIO-039` uchun individual qayta yaratish briefi tayyor; `BIO-001` hamda `BIO-041`–`BIO-100` keyingi batchlar navbatida. `pnpm test`, `pnpm run check` va production build ushbu hujjat yangilanishlaridan keyin muvaffaqiyatli yakunlandi.

## 2026-08-20 BIO-005 foydalanuvchi batchi

Foydalanuvchi Gemini orqali yaratib yuborgan qorong‘i laboratoriya fonli mikrohajmli UV-Vis spektrofotometr vizuali `BIO-005` uchun ko‘rib chiqildi va **PASS** deb baholandi: sample pedestal, yuqori arm, qurilmaning markazlashuvi, matnsiz 16:9 kompozitsiya hamda kontrast hero-standardga mos. Asl JPEG markaziy 16:9 crop va Lanczos upscale orqali 1920×1080 px WebP (`76 KiB`) assetga aylantirildi, project asset storage’ga yuklandi va `equipmentImages.ts` registry hamda `cover`/`laboratory` presentation profiliga ulandi. Hero-standard qamrovi **33 / 100**, qolgan navbat **67**: `BIO-001`, `BIO-006`, `BIO-008`, `BIO-010`, `BIO-034`, `BIO-038`, `BIO-039`, `BIO-041`–`BIO-100`. Unit/regressiya testlari, TypeScript check va production build muvaffaqiyatli o‘tdi; keyingi yuborilgan har bir rasm PASS/FAIL audit bilan shu ro‘yxatga qo‘shiladi.

## 2026-08-20 hero asset recovery qatlami

Qabul qilingan **33 ta** hero WebP asset uchun `docs/reports/hero-asset-recovery-manifest.json` yaratildi. Manifest har bir `BIO-NNN` ID uchun project asset URL, fayl nomi, MIME turi, hajmi va SHA-256 checksumini qayd etadi. Byte-darajadagi yagona recovery nusxa canonical `Biotexnologiya` Drive rootida `BioLab_Hero_Assets_Recovery.tar.gz` (`1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08`) fayli sifatida saqlanadi; arxivda 33 ta WebP hamda manifest mavjud. Drive’dan qayta yuklab ochish sinovi `RESTORE_TEST=PASS` natijasini berdi. Yangi PASS hero-vizual kiritilganda mavjud archive fayli **o‘rnida yangilanadi**; duplicate archive yoki yangi Drive papka yaratilmaydi.

## 2026-08-20 mobil DeviceViewer modal tuzatishi

Telefon ekranida “O‘rganish” tugmasi bosilganda faqat fon-blur ko‘rinib, o‘quv kontenti yashirinib qolishi muammosi detail modal konteyneri bilan `DeviceViewer` ildizining balandlik/overflow kontrakti qayta tuzilishi orqali bartaraf etildi. Mobil viewportda modal endi alohida `role="dialog"`, `aria-modal="true"` semantikasi, `100dvh` o‘lchovi va `overflow-y-auto` bilan ishlaydi; o‘quv dosyesi oq fonli qatlamda ko‘rinadi. Desktopda markazlangan, `92vh` chegarali modal tartibi saqlanib qoldi. `test_device_viewer.mjs` mobil 390×844 px qamroviga kengaytirildi: dialog semantikasi, DeviceViewer renderi, ko‘rinadigan o‘quv kontenti va xavfsiz vertikal overflow tekshiriladi. `pnpm run check`, production build, to‘liq `pnpm test` va continuity audit **PASS**. Snapshot faqat mavjud canonical `BioLab_Interactive_Guide_source.tar.gz` fayli o‘rnida yangilanadi.

## 2026-08-21 canonical hero batch rollout

Handoffdagi Drive batchlar read-only audit qilindi: canonical `Biotexnologiya` rootida 76 ta ZIP mavjud, barcha ZIP integrity tekshiruvdan o‘tdi va ichki WebP fayllari `2560×1440` formatda. 85 ta noyob hero asset aniqlandi; `Batch 15` ko‘rinmaydi, shuning uchun `BIO-041` uchun authoritative final replacement mavjud emas. Ushbu rasm ataylab yangi hero registryga ulanmaydi; avvalgi mahsulot tasviri fallback sifatida saqlanadi.

Drive auditdan o‘tgan 84 ta yangi WebP `client/src/lib/auditedHeroImageUrls.ts` registryga qo‘shildi. Batch variantlari takrorlangan 10 IDda keyingi authoritative variant tanlandi: `BIO-006 → Batch 06`, `008 → 07`, `010 → 08`, `034 → 09`, `038 → 10`, `039 → 11`, `046 → 24`, `047 → 25`, `048 → 26`, `049 → 27`. Batchda yangi versiyasi bo‘lmagan, lekin avvalgi auditdan o‘tgan 15 ta hero saqlanib qoldi; yakunida **99 / 100** qurilma `cover` + `laboratory` hero presentation profilida ishlaydi. `BIO-041` yagona ochiq bloklovchi bo‘lib qoladi.

`hero-asset-recovery-manifest.json` endi 99 ta qabul qilingan assetning URL, hajm va SHA-256 checksumini qayd etadi. Mavjud canonical `BioLab_Hero_Assets_Recovery.tar.gz` fayli Drive’da duplicate yaratmasdan o‘rnida yangilandi: ID `1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08`, hajmi `32,128,941` bayt, SHA-256 `c399c5b5613d209f59e9d25a7155d32802284868d7009aafcb4db6fa8cb7f269`. Batafsil audit: `docs/reports/hero-drive-asset-audit.json` va `docs/reports/HERO_VISUAL_AUDIT_NOTES.md`.

Rolloutdan keyingi `pnpm run check`, production build, Vitest presentation testlari, katalog/rating qidiruv regressiyasi, DeviceViewer mobil regressiyasi va continuity audit muvaffaqiyatli yakunlandi. 390×844 px viewportda katalogning media kontrasti va responsive hero dizayni ko‘zdan kechirildi; regressiya aniqlanmadi. Sanitizatsiyalangan release GitHub `uzme/BioLab` `main` branchiga `26a28fa7d6e2cbb9fe7b91e7654e852bcc97af95` commit bilan yuborildi. Mavjud canonical `BioLab_Interactive_Guide_source.tar.gz` Drive snapshoti duplicate yaratmasdan o‘rnida yangilandi: file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-21T09:34:55.144Z`, source fingerprint `30096fb90788fe6e1b1d3c7b7e086766f9d4c341b9639d8201e2436865de8534`. Holat: **READY**, faqat BIO-041 authoritative Batch 15 resursi ochiq qoladi.

## 2026-08-21 hero yuklanishini ortiqcha so‘rovlarsiz optimallashtirish

Katalogning dastlabki olti kartasi o‘zining `eager` yuklashini, birinchi uchta karta esa `fetchPriority="high"` belgisini saqlaydi. Shuning uchun boshlang‘ich sahifada takroriy JavaScript warmup endi ishlamaydi. Foydalanuvchi qidiruv yoki filtr qo‘llagandagina, yangi natijalarning dastlabki to‘rtta rasmi `requestIdleCallback` (mos kelmaydigan browserlarda 180 ms fallback) orqali `auto` prioritetida prefetch qilinadi. Natijada interaktiv filtr javobining tezligi saqlanadi, biroq mobil tarmoqda birinchi ekran hero rasmlari uchun dublikat so‘rov xavfi kamayadi. Filtrlangan natijalardagi birinchi uchta karta uchun `eager` + `high` prioritet regressiyasi qo‘shildi. `pnpm run check`, `pnpm test`, production build va continuity audit **PASS**.

## 2026-08-21 100/100 authoritative hero completion

Avvalgi `BIO-041` uchun Batch 15 bloklovchisi batch-raqami bo‘yicha noto‘g‘ri taxmin ekanligi aniqlandi. Read-only canonical inventar `BIO-041.webp` fayli `BioLab_hero_assets_batch_13.zip` ichida ekanini tasdiqladi. Fayl integrity, `2560×1440` WebP metadata, SHA-256 `fcf69a9e93eb91fb8f0bdcb217e612e93f2ff76c27a98e8cb0f1c832f8c43799`, instrument sinfi (Stericup turidagi steril vakuum filtratsiya tizimi) va qorong‘i laboratoriya hero kompozitsiyasi bo‘yicha **PASS** oldi.

BIO-041 deploy-safe storage’ga yuklandi, `auditedHeroImageUrls.ts` registryga ulandi va `cover` + `laboratory` presentation profiliga kiritildi. Natijada barcha **100 / 100** qurilma hero-standardda ishlaydi. Recovery manifest 100 ta assetning URL, hajm va SHA-256 checksumini qamraydi; mavjud `BioLab_Hero_Assets_Recovery.tar.gz` fayli (`1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08`) duplicate yaratmasdan o‘rnida yangilandi. TypeScript check, Vitest/katalog/DeviceViewer regressiyalari, production build va continuity audit **PASS**. Sanitizatsiyalangan yakuniy release GitHub `uzme/BioLab` `main` branchiga `cd3997285c45280397e3e95f507cb0e5b20fa54e` commit bilan yuborildi. Canonical snapshot mavjud fayl o‘rnida yangilandi: Drive file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-21T09:57:19.982Z`, fingerprint `4bdc775283ffba6cbbb3d8013cb8c382128a621b84cc7a7a0f2e7567759c6fdf`. Holat: **READY**.

## 2026-08-21 tartibli hero recovery batchlari

Hero recovery arxivi saqlash va qayta topish qulayligi uchun qayta tuzildi: barcha 100 ta rasm endi `Batch-001` dan `Batch-100` gacha qurilma raqami, BIO ID va qurilma slugiga ko‘ra alohida kataloglarda joylashadi. Har batch ichida faqat bitta aniq `BIO-NNN.webp` rasm bor. Arxivning ichida `BATCH_INDEX.md` va schema v2 checksum manifest mavjud. Drive’dan qayta yuklangan restore/integrity sinovi **PASS**: 100 uzluksiz batch, 100 WebP va barcha SHA-256 qiymatlari mos. Canonical Drive’dagi mavjud `BioLab_Hero_Assets_Recovery.tar.gz` fayli duplicate yaratmasdan o‘rnida yangilandi: file ID `1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08`, modified `2026-08-21T10:05:02.918Z`, hajmi `32,579,873` bayt, SHA-256 `65ecd99d527d681d9e9952e1b352e3a8e193768b8445445b69d3cf65c607f914`.

Tartibli recovery layout kodi va hujjatlari GitHub `uzme/BioLab` `main` branchiga `96aa5dad5b9b21341c5b4ce13bc5df9f28346f60` commit bilan yuborildi. Sanitizatsiyalangan canonical source snapshot mavjud `BioLab_Interactive_Guide_source.tar.gz` fayli o‘rnida yangilandi: file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-21T10:08:14.278Z`, source fingerprint `1bccc20b541c85c640181d9cb3976b20f87cb671be0b74c648fa578e075628b0`.

## 2026-08-21 Drive batch mirror — kelajak uchun bevosita rasm manzili

Foydalanuvchi so‘rovi bilan canonical `Biotexnologiya` rooti ichida faqat BioLab hero-rasmlari uchun bitta subpapka yaratildi: `BioLab_Hero_Assets_By_Batch` (Drive ID `1i3CwBud6QOyWMlEyitXSFm4vD_5jd9ar`). Ushbu mirror ichida `Batch-001__BIO-001__...` dan `Batch-100__BIO-100__...` gacha 100 ta tartibli papka mavjud; har birida faqat o‘z qurilmasiga mos `BIO-NNN.webp` bor. Ildizida `BATCH_INDEX.md` hamda `hero-asset-recovery-manifest.json` saqlanadi.

Rasmlar canonical recovery arxividan (`1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08`) ajratildi. Mirror Drive’dan qayta yuklanib, 100 batch, 100 WebP va barcha manifest SHA-256 qiymatlari bo‘yicha mustaqil restore testi **PASS** bo‘ldi. Mirrorda 102 obyekt (100 rasm + 2 ta indeks/manifest), jami `32,611,543` bayt mavjud. Boshqa loyiha fayllari yoki rasmlari bu subpapkaga kiritilmadi.

Mirror hujjatlari va generatorlari GitHub `uzme/BioLab` `main` branchiga `c914814c588d6f38baa90ff5d494530f1e570156` commit bilan yuborildi. Sanitizatsiyalangan source snapshot mavjud Drive fayli o‘rnida yangilandi: file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-21T10:18:29.386Z`, fingerprint `eef0fed3baca62ddfaeadd2e22e781692822adb7d6864e3930c998a684aa03be`.

## 2026-08-21 yakuniy tarixiy ZIP batchlar

Yangi `BioLab_Historical_Final_Hero_ZIPs` subpapkasi (Drive ID `19dpcDupgvEXS5JnznEUW0-lbagewubGE`) final 100 rasmni `Batch-001__BIO-001__qurilma-nomi.zip` dan `Batch-100__BIO-100__qurilma-nomi.zip`gacha alohida ZIPlar shaklida saqlaydi. Yetishmagan 15 ta rasm ham canonical recovery arxividagi yakuniy nusxadan to‘ldirildi. ZIP integriteti, ichki rasm nomi va manifest SHA-256 qiymatlari 100 / 100 **PASS**; uploaddan keyingi `rclone check --checksum` 103 faylda farq topmadi.

Eski rootdagi 76 ta `BioLab_hero_assets_batch_*.zip` xom manba batchi yangi final to‘plam tasdiqlangach Google Drive Chiqindisiga qaytariladigan tarzda ko‘chirildi; rootda bunday ZIP qolmadi. Ular doimiy o‘chirilmagan, lekin platforma uchun kerak emas. To‘liq qoida va manzil: `docs/master-protocols/FINAL_HERO_HISTORY_ZIPS.md`.

Tarixiy ZIP generatorlari, checksum comparison hisoboti va manzil hujjatlari GitHub `uzme/BioLab` `main` branchiga `fdd5c5720b9f426e1dad9832cb7792cfce2305eb` commit bilan yuborildi. Canonical sanitizatsiyalangan source snapshot mavjud `BioLab_Interactive_Guide_source.tar.gz` fayli o‘rnida yangilandi: file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`, modified `2026-08-21T10:44:17.870Z`, fingerprint `8fc0bff3f50eff719e289b86209cb8b92a85da36aa7f00a5a83753ad6d36b7e2`.

## 2026-08-21 DeviceViewer PWA cache recovery

“Qurilmani o‘rganish” detail oynasida barcha qurilmalarga bir xil ta’sir qilgan yuklanish xatosi dinamik o‘quv bloklari bilan eski PWA cache o‘rtasidagi modul-versiya nomuvofiqligi xavfi sifatida qayta ko‘rib chiqildi. Service worker cache versiyasi `biolab-offline-v2` ga oshirildi. Onlayn holatda script, style, font va manifest fayllari endi `network-first` strategiyasida olinadi; yangi worker controllerga aylanganda sahifa bir marta avtomatik qayta yuklanadi.

Yuklanish istisnosi qolsa, DeviceViewer ichidagi “Yangilash va qayta ochish” tugmasi faqat `biolab-offline-*` cachelarini va service worker ro‘yxatini tozalab sahifani qayta ochadi. `localStorage`dagi Saralanganlar saqlanadi. Test tartibi production URL parametrini (`BIOLAB_TEST_URL`) qabul qiladi; sekin asset packini kerak bo‘lsa `BIOLAB_SKIP_OFFLINE_PACK=true` bilan chetlab o‘tib detail, desktop va mobil oqimlarni productionda tekshirish mumkin. TypeScript check, Vitest, katalog/DeviceViewer regressiyalari hamda production build ushbu tuzatishdan keyin **PASS**.

`test_device_viewer.mjs` endi faqat birinchi karta bilan cheklanmaydi: `BIO-001`, `BIO-026`, `BIO-051` va `BIO-076` tanlanib, mos ravishda 1–25, 26–50, 51–75 va 76–100 dinamik o‘quv/xarid bloklari yuklanishi tekshiriladi. Har holatda DeviceViewer renderi, rasm shaffofligi bloki, 16 bo‘limli navigatsiya, 16-bo‘lim manbalari, “Xarid va foydalanish xarajatlari” bloki, “Narx benchmarki va dalili” accordionining ochilishi hamda katalogga qaytish oqimi **PASS**.

Production URLdagi yangi browser kontekstida `BIO-026` testida muammo yana qayta hosil qilindi. Sabab PWA emas, `vite.config.ts`dagi `manualChunks` qoidasi `learningData.ts` bilan birga `learningDataBlock1`–`4` fayllarini ham bitta `learning-data` chunkiga majburan qo‘shgani ekani aniqlandi. Qoida endi faqat `learningData.ts` loader fayliga qo‘llanadi. Yakuniy production build 4 ta mustaqil dynamic asset (`learningDataBlock1`–`4`) yaratishini tasdiqladi; TypeScript, to‘liq testlar va production build **PASS**.

Production smoke-test `https://biolab-interactive-guide.vercel.app/` manzilida yangi browser kontekstida o‘tdi: `BIO-001`, `BIO-026`, `BIO-051` va `BIO-076` uchun 16 ta o‘quv bo‘limi, manbalar, xarid accordionlari, katalogga qaytish va mobil oqim **PASS**. Production smoke-test faqat detail oqimini izolyatsiya qilish uchun offline paket hamda offline round-tripni chetlab o‘tdi; to‘liq offline round-trip local regressiyada alohida **PASS**. Birinchi service worker o‘rnatilishi endi bekorchi reload bermaydi, mavjud worker yangilanganda esa faqat bir marta yangilanadi.

Yakuniy production verifikatsiyasi yangi deploydan keyin qayta bajarildi va **PASS**: desktop hamda mobil oqimda `BIO-001`, `BIO-026`, `BIO-051`, `BIO-076` detail oynalari 16 bo‘lim, rasm manbasi, xarid accordionlari va qaytish navigatsiyasini muvaffaqiyatli yukladi. Holat: **READY**.

## 2026-08-21 DeviceViewer boshlang‘ich scroll pozitsiyasi

Foydalanuvchi bildirgan holat — “O‘rganish” detail oynasining pastki qismdan ochilishi — modal overlay hamda uning ichki viewer konteynerining scroll holati bilan bog‘liq edi. `Home.tsx`da ikkala konteynerga ref berildi va tanlangan qurilma o‘zgarganda `useLayoutEffect` orqali `scrollTop = 0` paintdan oldin majburan o‘rnatildi. Regression test modalni pastga surib yopadi, keyingi detail ochilganda desktop va mobil oqimlarda yuqori pozitsiyani tekshiradi. TypeScript, Vitest/Playwright va production build **PASS**; production deploydan keyingi smoke-test navbatda.

Production deploydan keyingi smoke-test `https://biolab-interactive-guide.vercel.app/` manzilida `BIOLAB_SKIP_OFFLINE_PACK=true` va `BIOLAB_SKIP_OFFLINE_ROUND_TRIP=true` izolyatsiya rejimida qayta bajarildi va **PASS**. Desktop hamda mobil detail oqimlari, to‘rtta dinamik o‘quv blok, modalning yuqoridan boshlanishi va katalogga qaytish tekshirildi. Holat: **READY**.

## 2026-08-21 professional precision-biotech dizayn qatlami

Ma’lumotlar, 100 ta qurilma mappingi va 16 bo‘limli SOP tarkibi o‘zgartirilmasdan bosh sahifa, hero, metrikalar, katalog va karusel yagona sovuq teal, kalibrlangan-grid laboratoriya ishchi stansiyasi tiliga ko‘chirildi. LAB-01 rail hero ichida asosiy o‘quv spine sifatida kuchaytirildi. Karusel gorizontal o‘qni saqlaydi, sahifalash va pause/continue boshqaruvlari bilan ishlaydi; vertikal variant qo‘llanmagan.

`prefers-reduced-motion` hamda Sozlamalardagi “Kamroq animatsiya” tanlovi tugma, modal, drawer, katalog va karusel harakatlarini o‘chiradi. Browser regressiyasi `768×1024`da LAB-01 railning 16 raqami bilan `8×2` grid, kamida 24 px qadam kengligi va tartibli `01`–`16` etiketlarini tekshiradi. Mobil, planshet, desktop va `1920×1080` katta ekran auditida hero, rail, katalog va gorizontal sahna qabul qilindi; `pnpm check`, katalog/DeviceViewer browser regressiyalari hamda production build **PASS**.

Production smoke-test `https://biolab-interactive-guide.vercel.app/` manzilida cache-bypass query va izolyatsiyalangan offline flags bilan yakuniy qayta bajarildi. Bosh sahifa, katalog tartibi, qidiruv/tozalash, yangi gorizontal karusel bosqaruvlari hamda mobil rasm yuklanishi **PASS**. Holat: **READY**.

## 2026-08-21 iPhone detail boshlang‘ich holati va 100 qurilma yuklanishi

Foydalanuvchi yuborgan iPhone Safari skrinshoti detail oynasi “Xarid va foydalanish xarajatlari” qismidan ochilib qolayotganini ko‘rsatdi. Sabab mobil overlay va ichki viewerning ichma-ich scroll konteynerlari edi. Mobil rejimda ichki viewer `overflow-y-visible` qilindi, tashqi modal yagona vertikal scroll egasi bo‘ldi. Detail ochilishida hamda ma’lumotlar renderi tugagach `scrollTop` va `scrollLeft` qat’iy nolga o‘rnatiladi; iOS kechikkan renderi uchun 80 ms ikkinchi reset ishlaydi.

Detail ma’lumotlari uchun `Promise.allSettled` qo‘llanadi: purchase block xatosi learning blockni to‘sib qo‘ymaydi. `learningData.test.ts` 100 ta `BIO-001`–`BIO-100` uchun learning va purchase ma’lumotlari mavjudligini tekshiradi. iPhone Safari user-agent, touch va 390×844 viewport emulyatsiyasida detail pastga surilib yopilgach keyingi qurilma qayta ochildi; modal yuqoridan ochilishi **PASS**. Standart test to‘plami: Vitest 10/10, katalog regressiyasi, DeviceViewer regressiyasi, TypeScript va production build **PASS**.

`resolveDeviceContent` yordamchisi DeviceViewer’ning mustaqil loader kontraktini testlanadigan ko‘rinishga olib chiqdi. Purchase loaderi qasddan `reject` qilinganda ham BIO-026 o‘quv dosyesi va uning 16 bo‘limi saqlanadi; Vitest suite endi 11 test bilan **PASS**. Bu holat xarid bo‘limi vaqtincha yuklanmasa ham detail oynasi ko‘rinmay qolmasligini kafolatlaydi.

Yangi production checkpointidan keyin `https://biolab-interactive-guide.vercel.app/` URLida cache-bypass query bilan, iPhone Safari user-agent, touch va 390×844 viewport emulyatsiyasida final smoke-test bajarildi. `BIO-001`, `BIO-026`, `BIO-051` va `BIO-076` to‘rtta dinamik blokdan detail oynasi ochildi, 16 bo‘lim hamda xarid bo‘limlari yuklandi, modal avval pastga surilib yopilgach keyingi ochilish 1-bo‘limdan boshlandi. Holat: **READY / production PASS**.

Xatolikdan tiklanish dalili productionda sun’iy nosozlik kiritish orqali emas, alohida unit regression orqali berildi: purchase promise `reject` qilinganda `resolveDeviceContent` learning natijani va 16-bo‘limli o‘quv oqimini saqlaydi, purchase esa xavfsiz bo‘sh holatga tushadi. Ushbu test **PASS**; production smoke-test esa faqat real success-path yuklanishini tasdiqlaydi.
