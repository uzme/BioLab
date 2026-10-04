# BioLab Interactive Guide — Continuity Audit

## Audit maqsadi

Ushbu audit BioLab Interactive Guide loyihasining yagona GitHub repositorysi, yagona Google Drive root papkasi, majburiy hujjatlari, source-of-truth kodlari, maxfiy ma’lumotlar siyosati va qayta tiklash oqimini tekshiradi. Audit loyihani qayta yozmaydi; ishlayotgan UI, original Pure CSS 3D carousel geometriyasi, 100 ta qurilma dosyesi va 16 bosqichli o‘quv mazmuni saqlanadi.

## Canonical manzillar

| Qatlam | Tekshirilgan manzil | Natija |
|---|---|---|
| GitHub source | `https://github.com/uzme/BioLab`, `main`, repository root | PASS |
| Google Drive archive | `Biotexnologiya` BioLab root, ID `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV` | PASS |
| Snapshot | `BioLab_Interactive_Guide_source.tar.gz`, mavjud faylni joyida yangilash | PASS |
| Cross-links | `GITHUB_INDEX.md`, `DRIVE_INDEX.md`, `RESTORATION_MAP.md` | PASS |
| Required documents | 20 ta continuity hujjati va LICENSE/CONTRIBUTING/SECURITY | PASS |
| Environment contract | `SECRETS_REQUIRED.md`; real credential qiymatlari mavjud emas | PASS |

## Verification natijalari

2026-08-17 dagi tekshiruvlarda `pnpm run check`, `pnpm build`, `pnpm test`, `scripts/tests/test_catalog_controls.mjs`, `scripts/tests/test_device_viewer.mjs` va `scripts/tests/test_carousel_pagination_browser.mjs` muvaffaqiyatli yakunlandi. `node scripts/release/verify_continuity_docs.mjs` barcha required document, canonical cross-link, state status va environment contract shartlarini `READY` deb qaytardi. `node scripts/release/sync_release.mjs --check` ham test, production build, browser regression, continuity audit va secret scan bosqichlarini muvaffaqiyatli bajarib, `CHECK READY` natijasini berdi.

## Sanitizatsiya va xavfsizlik

Release snapshot `.env` fayllari, tokenlar, API kalitlari, parollar, PATlar, service-role kalitlari, `node_modules`, `dist`, `.git`, loglar, runtime chiqindilari, vaqtinchalik kataloglar va arxivlarning o‘zini kiritmaydi. `scripts/release/sync_release.mjs` source fingerprint yaratishdan va publishdan oldin keng tarqalgan maxfiy qiymat formatlarini scan qiladi; topilma aniqlansa jarayon ataylab to‘xtaydi. Haqiqiy credential faqat managed secret environment orqali beriladi.

## Reproduktibilitet

Canonical GitHub repository rootidan clean clone qilingach, Node.js 22 yoki undan yangi versiya va pnpm yordamida `pnpm install --frozen-lockfile --ignore-scripts`, `pnpm run check`, `pnpm build` va `pnpm test` bajariladi. Database yoki OAuth qiymatlari repositoryga yozilmaydi va `SECRETS_REQUIRED.md` kontraktiga muvofiq tashqi secure environment orqali beriladi.

## Ochiq, ammo bloklamaydigan kuzatuvlar

Production bundle ichidagi learning dossier ma’lumotlari 500 kB dan katta intentional chunk sifatida qolmoqda. Buildda CSS gradient yo‘nalishi bo‘yicha mavjud warninglar bor. Dependency audit advisorylari alohida remediation bosqichi sifatida qayd etilgan. Ushbu kuzatuvlar typecheck, build, test, carousel geometriyasi yoki 100 ta qurilma source-of-truth funksiyasini bloklamaydi.

## Status qarori

Continuity auditning joriy holati: **READY**. Yakuniy publishdan keyin GitHub commit hash’i, Drive snapshot file ID si, modified time va source fingerprint `PROJECT_STATE.md`, `CURRENT_STATE.md`, `GITHUB_INDEX.md`, `DRIVE_INDEX.md` va ushbu hujjatda bir xil metadata sifatida qayd etiladi. Faqat canonical GitHub repository va `Biotexnologiya` BioLab root papkasi write destination hisoblanadi; `Second Brain` va boshqa Drive papkalari o‘zgartirilmaydi.

2026-08-20 verified release metadata: GitHub commit `de9eea4287e5f85a4b959e5bd01bc42e38f7e1d1`; Drive snapshot `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`; parent `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`; modified `2026-08-20T06:24:25.426Z`; source fingerprint `d273b32f213065204bde5f49e5a059b05401eb21dfd56546f06ed63da0e21f95`.
