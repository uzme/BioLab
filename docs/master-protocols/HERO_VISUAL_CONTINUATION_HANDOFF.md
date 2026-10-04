# BioLab Hero Visual Continuation Handoff

## 2026-08-21 authoritative joriy holat — avval o‘qing

Quyidagi eski 33/100 va 67 ta qolgan qamrov yozuvlari **tarixiy kontekst** bo‘lib, keyingi ishlar uchun manba emas. Canonical `Biotexnologiya` Drive rootidagi mavjud ZIP batchlar read-only auditdan o‘tkazildi: 76 ta ZIP integrity tekshiruvdan o‘tdi, 85 ta noyob `2560×1440` WebP aniqlandi va keyingi authoritative duplicate variantlar tanlandi. Batch 13 ichidagi `BIO-041.webp` ham integrity, model mosligi va visual standartdan **PASS** oldi. Auditdan o‘tgan 85 ta yangi WebP hamda avvalgi 15 ta qabul qilingan hero bilan katalogda **100 / 100** qurilma `cover` + `laboratory` profilida ishlaydi.

| Joriy holat | Qamrov | Amal |
|---|---:|---|
| Production hero-standard | Barcha 100 ta `BIO-` ID | Qo‘shimcha hero yaratish talab qilinmaydi; mavjud registry URL va WebP assetlarni almashtirmang. |
| BIO-041 authoritative manbasi | `BioLab_hero_assets_batch_13.zip` → `BIO-041.webp` | Stericup turidagi steril vakuum filtrlash tizimi, 2560×1440 WebP; integrity va visual audit PASS. |
| Ochiq rasm bloklovchisi | Yo‘q | Yangi rasm faqat kelajakda asosiy loyiha agenti aniq so‘raganda yaratiladi. |

`BIO-006`, `BIO-008`, `BIO-010`, `BIO-034`, `BIO-038` va `BIO-039` uchun avvalgi qayta yaratish navbati canonical batchlardagi keyingi authoritative variantlar bilan yopilgan. Duplicate tanlovi: `006 → Batch 06`, `008 → 07`, `010 → 08`, `034 → 09`, `038 → 10`, `039 → 11`, `046 → 24`, `047 → 25`, `048 → 26`, `049 → 27`.

> Hozirgi hero-vizual vazifasi yopilgan. Batch 15 bo‘yicha oldingi talab bekor qilindi: BIO-041 ning authoritative manbasi Batch 13 ichida tasdiqlandi.

## Tarixiy 2026-08-20 ish konteksti — operatsion manba emas

BioLab katalogida **100 ta qurilma** mavjud va ular to‘liq saqlanadi. Ushbu ishning maqsadi har bir qurilmaning katalog kartasida foydalanuvchi tasdiqlagan **laboratoriya-hero** ko‘rinishini berishdir: qurilma katta va markazda, 16:9 media oynasini estetik egallagan, laboratoriya muhiti bilan uyg‘un va qorong‘i rejimda ham aniq ko‘rinadigan bo‘lishi kerak.

Hozircha barcha 100 ta rasmning `object-fit`, fon va dark-mode kontrasti avtomatik audit qilingan. Avvalgi 15 ta va yangi batchdan qabul qilingan 17 ta qurilma laboratoriya-hero vizualiga o‘tkazilgan; ular yengil WebP asset sifatida productionga ulangan.

| Holat | Qurilma IDlari | Ko‘rsatish qoidasi |
|---|---|---|
| Avvalgi hero vizual ulangan | `BIO-016`–`BIO-022`, `BIO-024`, `BIO-025`, `BIO-027`–`BIO-029`, `BIO-031`, `BIO-033`, `BIO-035` | `cover`, laboratoriya foni, markazlangan hero framing |
| Foydalanuvchi tasdiqlagan avvalgi hero reference | `BIO-001` | `cover`, laboratoriya foni |
| 2026-08-20 batchidan qabul qilingan hero vizual | `BIO-002`, `BIO-003`, `BIO-004`, `BIO-007`, `BIO-009`, `BIO-011`–`BIO-015`, `BIO-023`, `BIO-026`, `BIO-030`, `BIO-032`, `BIO-036`, `BIO-037`, `BIO-040` | `cover`, qorong‘i teal laboratoriya foni, markazlangan hero framing |
| Qayta yaratilishi majburiy | `BIO-005`, `BIO-006`, `BIO-008`, `BIO-010`, `BIO-034`, `BIO-038`, `BIO-039` | Avvalgi rasm qurilma sinfiga mos emas; `HERO_VISUAL_REGENERATION_BRIEF.md` bo‘yicha yaratiladi |
| Hero-vizual yaratish navbatida | Qolgan 60 ta hero-standardga o‘tmagan qurilma | Qayta yaratish majburiy bo‘lgan yetti IDdan tashqari navbat |

> `BIO-001` avvaldan laboratoriya-hero standarti uchun qabul qilingan reference hisoblanadi. Hozir hero-standarddagi kartalar soni **33 ta**: reference `BIO-001`, avvalgi 15 ta va yangi qabul qilingan 17 ta asset. Hero-standardga o‘tishi kerak bo‘lgan qurilmalar soni **67 ta**, shundan 7 tasi qayta yaratish briefi bilan ajratilgan.

## Muhim fayllar

| Fayl | Vazifasi |
|---|---|
| `client/src/lib/equipmentImages.ts` | Har bir `BIO-` ID uchun asset URL, alt matn va manba turini saqlaydi |
| `client/src/lib/equipmentImagePresentation.ts` | `coverFrameIds`, `laboratoryHeroIds` va joylashuv qoidalarini boshqaradi |
| `client/src/lib/imagePresentationProfiles.ts` | Audit asosidagi `laboratory`, `paper`, `ink` media fon profillari |
| `client/src/components/EquipmentCard.tsx` | Katalog kartasidagi rasm renderi, preload va loading atributlari |
| `client/src/components/DeviceViewer.tsx` | Qurilma batafsil oynasidagi rasm renderi |
| `client/src/components/Pure3DCarousel.tsx` | Carousel rasm renderi |
| `client/src/pages/Home.tsx` | Birinchi ko‘rinadigan kartalar uchun image warmup strategiyasi |
| `scripts/data/optimize_hero_assets.py` | Tayyor hero JPG rasmlarini WebP’ga yengillashtiradi |
| `scripts/tests/audit_image_loading.mjs` | Rasm yuklanish prioriteti va so‘rovlarini o‘lchaydi |
| `scripts/tests/capture_mobile_card_renders.mjs` | Mobil kartalarning 100 ta render capture’ini yaratadi |
| `docs/reports/image-presentation-audit-final.md` | Avvalgi visual audit natijalari |
| `docs/reports/hero-batch-audit-2026-08-20.md` | 24 ta kelgan hero assetning PASS/FAIL qarori |
| `docs/master-protocols/HERO_VISUAL_REGENERATION_BRIEF.md` | Yetti noto‘g‘ri hero-vizual uchun individual qayta yaratish promptlari |
| `docs/master-protocols/HERO_VISUAL_BATCH_SUBMISSION_TEMPLATE.md` | Tashqi agent yuboradigan ZIP batch, fayl nomi va Drive linki uchun qat’iy topshirish shabloni |

## Tarixiy hero yaratish standarti

Har bir yangi rasm **original, matnsiz, 16:9, 1600×900 yoki undan katta** bo‘lsin. Qurilma media oynasining markazida, umumiy kadrning taxminan 60–80 foizini egallagan holda ko‘rinsin. Fon foydalanuvchi tasdiqlagan namuna kabi qorong‘i, zamonaviy teal/cyan biotexnologiya laboratoriyasi bo‘lsin. Odamlar, qo‘llar, logotiplar, watermark, alohida yozuv va soxta model belgilari bo‘lmasin. Qurilma haqiqiy laboratoriya instrumenti turiga mos, lekin uydirma manufacturer logotipisiz tasvirlansin.

AI tasvirining maqsadi **o‘quv uchun reprezentativ vizual** bo‘lib, uni rasmiy manufacturer mahsulot fotosi deb ko‘rsatish mumkin emas. `equipmentImages.ts` ichida bunday rasm uchun `sourceType: "ai-representative"` qoladi va alt matnda “laboratoriya-realistik o‘quv vizuali” ifodasi ishlatiladi.

## Har bir batch uchun bajariladigan tartib

1. Tashqi rasm yaratuvchi agent faqat `HERO_VISUAL_BATCH_SUBMISSION_TEMPLATE.md` bo‘yicha ZIP batch va Drive linkini yuboradi; u loyiha kodi yoki asset registrysiga tegmaydi.
2. Asosiy loyiha agenti avval navbatdagi beshta `BIO-` ID uchun `equipmentData.ts` dan qurilma turi va model mazmunini o‘qiydi.
2. Yuqoridagi standartga mos, **bir xil fon tili va kamera burchagi** bilan beshta original hero rasm yarating.
3. Rasm fayllarini `/home/ubuntu/webdev-static-assets/` ichida `biolab-equipment-XXX-hero.jpg` nomida saqlang. Assetlarni loyiha katalogi ichiga qo‘ymang.
4. `scripts/data/optimize_hero_assets.py` bilan WebP nusxasini yarating. Maqsad — ko‘rish sifati saqlangan holda har bir rasmni yengil assetga aylantirish.
5. `manus-upload-file --webdev` bilan WebP fayllarni yuklang va qaytgan storage URL’ni aynan o‘sha ko‘rinishda ishlating.
6. `equipmentImages.ts` ichida har bir ID URL’ini yangi WebP URL’ga almashtiring, alt matnni qurilma turiga moslashtiring va `sourceType: "ai-representative"` qiling.
7. `equipmentImagePresentation.ts` ichidagi `coverFrameIds` ro‘yxatiga yangi IDlarni qo‘shing. Bu rasmga `cover` va laboratoriya fon profilini avtomatik beradi.
8. Agar qurilma kadrda markazdan siljisa, faqat o‘sha ID uchun `tunedPositions` yozuvini qo‘shing; butun katalog uchun global crop qoidasini o‘zgartirmang.
9. Har batchdan keyin testlar va visual auditni bajaring. Sifatsiz yoki noto‘g‘ri instrument tasvirini ulamang.

## Tez yuklash qoidasi

Yaratilgan hero assetlar WebP formatida saqlanadi. Birinchi uchta karta `fetchPriority="high"` bilan, dastlabki olti karta `eager` bilan yuklanadi; qolgan kartalar `lazy` bo‘lib qoladi. Filtr yoki qidiruvdan keyin faqat dastlabki to‘rtta yangi natija browser bo‘sh vaqtida prefetch qilinadi. Barcha 100 ta rasmni birdaniga eager yuklamang — bu mobil tarmoqni sekinlashtiradi.

## Majburiy tekshiruvlar

Har bir muhim batch yoki release oldidan quyidagi buyruqlarni loyiha ildizida bajaring:

```bash
pnpm test
pnpm run check
pnpm run build
node scripts/tests/audit_image_loading.mjs
node scripts/tests/capture_mobile_card_renders.mjs
pnpm run audit:continuity
pnpm run release:check
```

Keyin mobil light/dark ko‘rinishda kamida yangi qo‘shilgan assetlardan birini va `BIO-001` reference kartasini vizual tekshiring. Faqat tekshiruvlar muvaffaqiyatli tugagach `pnpm run release:publish` bilan sanitizatsiyalangan snapshotni yuboring.

## Xavfsizlik va sinxronlash qoidalari

`.env`, token, API key, parol, browser loglari va runtime chiqindilarini hech qachon GitHub yoki Drive snapshotiga kiritmang. Release faqat mavjud master skript orqali amalga oshiriladi; u GitHub `uzme/BioLab` `main` branchiga va mavjud canonical Google Drive snapshotiga yuboradi. Yangi Drive root yoki duplicate papka yaratmang. `todo.md` hamda `docs/master-protocols/PROJECT_STATE.md` ga har bir muhim batchning qamrovi va sinov holatini yozib boring.
