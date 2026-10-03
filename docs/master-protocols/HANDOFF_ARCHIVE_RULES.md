# BioLab Handoff Archive Rules

**Maqsad:** BioLab loyihasining har bir yangi handoff ZIP’i boshqa AI yoki dasturchi tomonidan hech qanday eski chat xotirasisiz davom ettiriladigan, tekshirilgan va tartibli arxiv bo‘lishini ta’minlash.

Bu faylning o‘zi har bir keyingi handoff ZIP’ida `docs/master-protocols/HANDOFF_ARCHIVE_RULES.md` manzilida saqlanishi shart. Uni o‘chirish, nomini o‘zgartirish yoki duplicate nusxa yaratish mumkin emas.

## 1. Asosiy qoida

Handoff ZIP har doim **eng oxirgi tekshirilgan yagona source** asosida yaratiladi. Eski ZIP’larni yangi ZIP’ga qo‘shib yuborish, eski arxivlarni ichma-ich joylash, bir xil faylning eski va yangi nusxalarini saqlash taqiqlanadi.

Yangi arxiv yaratishdan oldin:

1. Eng oxirgi GitHub `main` commit aniqlanadi.
2. Local working tree GitHub bilan solishtiriladi.
3. Vercel’dagi production deployment shu commitga mosligi tekshiriladi.
4. Google Drive’dagi canonical snapshot ID aniqlanadi.
5. Supabase o‘zgargan-o‘zgarmagani qayd qilinadi.
6. Faqat shu tekshiruvdan o‘tgan source arxivga kiritiladi.

## 2. Canonical arxiv ichki tuzilmasi

Har bir ZIP ichida bitta loyiha root papkasi bo‘lishi kerak:

```text
BioLab/
├── HANDOFF_README.md
├── README.md
├── client/
├── server/
├── shared/
├── mobile/
├── scripts/
├── docs/
│   ├── master-protocols/
│   │   ├── HANDOFF_ARCHIVE_RULES.md
│   │   ├── AI_HANDOFF.md
│   │   ├── CURRENT_STATE.md
│   │   ├── PROJECT_STATE.md
│   │   ├── PROJECT_MANIFEST.md
│   │   ├── DATABASE.md
│   │   ├── SECRETS_REQUIRED.md
│   │   └── DRIVE_INDEX.md
│   └── reports/
├── dist/
│   ├── public/
│   └── index.js
├── git-history/
│   └── BioLab_git_history.bundle
└── archive-verification/
    ├── ARCHIVE_MANIFEST.json
    ├── SHA256SUMS.txt
    └── git-bundle-verify.txt
```

Agar loyihada yuqoridagi papkalardan biri mavjud bo‘lmasa, uni bo‘sh papka sifatida sun’iy yaratish shart emas. Mavjud bo‘lmagan qism `ARCHIVE_MANIFEST.json`da `not-present` deb qayd qilinadi.

## 3. Source kodga qo‘yiladigan talablar

Source qismi GitHub’dagi eng oxirgi tasdiqlangan commit bilan aynan bir xil bo‘lishi kerak. Quyidagilar source sifatida saqlanadi:

- React/TypeScript frontend;
- server va shared kodlar;
- mobile kodlari, agar mavjud bo‘lsa;
- `package.json`, `pnpm-lock.yaml` va konfiguratsiya fayllari;
- migration, schema va data fayllari;
- barcha testlar va release scriptlari;
- `docs/` ichidagi loyiha hujjatlari;
- barcha 100 ta qurilma ma’lumotlari va 4 locale JSON fayllari;
- source images va public assets;
- `HANDOFF_ARCHIVE_RULES.md`.

Har bir ma’lumotning faqat bitta source-of-truth nusxasi bo‘lishi kerak. Eski `generated`, vaqtinchalik import yoki backup fayllari yangi canonical JSON source bilan bir xil ma’lumotni takrorlasa, ularning vazifasi aniqlanadi: kerak bo‘lmasa chiqariladi, kerak bo‘lsa manifestda “compatibility/generated artifact” deb qayd qilinadi.

## 3.1. Dead code va unused fayllar

Handoff ZIP’iga ishlatilmaydigan yoki eskirgan kodlar kiritilmasligi kerak. Har bir release oldidan quyidagilar audit qilinadi:

- ishlatilmaydigan import va exportlar;
- hech qayerdan chaqirilmaydigan component, hook, utility va route’lar;
- eski translation, equipment, learning yoki purchase JSON fayllari;
- yangi source-of-truth bilan duplicate bo‘lgan generated data;
- ishlatilmaydigan CSS class, asset, icon va fontlar;
- eski PDF generator yoki endi chaqirilmaydigan export funksiyalari;
- unreachable branch, vaqtinchalik debug kod va `console.log` qoldiqlari;
- eski hash’li `dist` assetlari va boshqa build qoldiqlari;
- `.bak`, `.old`, `.tmp`, `backup`, `final-final` kabi vaqtinchalik nusxalar.

Dead code faqat isbotlangan foydalanilmaslik holatida o‘chiriladi. Dynamic import, route registry, reflection, test fixture, mobile build yoki migration uchun kerak bo‘lishi mumkin bo‘lgan fayl o‘zboshimchalik bilan o‘chirilmaydi. Bunday fayl `ARCHIVE_MANIFEST.json`da `intentionally-retained` sifatida qayd qilinadi.

Tozalashdan keyin majburiy tekshiruvlar bajariladi:

```bash
pnpm run check
pnpm run build
pnpm test
git diff --check
```

Dead-code cleanup alohida commit yoki manifest yozuvida ko‘rsatiladi. Unused faylni o‘chirish tarjima coverage, 100 ta qurilma, 16 section, PDF, QR, bookmark, PWA, mobile va route regression testlariga ta’sir qilmasligi kerak.

## 4. Production build

`dist/` faqat oxirgi commitdan qayta build qilingan va tekshirilgan bo‘lsa kiritiladi. Oldingi build, eski hash’li asset yoki boshqa commitga tegishli `dist` qoldirilmaydi.

Build yaratish:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm run build
pnpm test
```

Agar browser regression testlar mavjud bo‘lsa, local server ishga tushirilib ular ham bajariladi. Build yoki test PASS bo‘lmasa, arxiv “verified” deb belgilanmaydi.

## 5. Git tarixi

`.git/` katalogi handoff ZIP’iga qo‘shilmaydi. Uning o‘rniga GitHub’dagi mavjud to‘liq tarix portable bundle sifatida saqlanadi:

```bash
git fetch --unshallow origin 2>/dev/null || true
git bundle create git-history/BioLab_git_history.bundle --all
git bundle verify git-history/BioLab_git_history.bundle
```

Bundle shallow bo‘lmasligi tekshiriladi. `git rev-list --count --all` soni manifestga yoziladi. Agar GitHub tarixining faqat bir qismi mavjud bo‘lsa, bu yashirilmaydi va manifestda aniq qayd qilinadi.

## 6. Handoff hujjatlari

`HANDOFF_README.md` har bir release’da yangilanadi va quyidagilarni o‘z ichiga oladi:

- snapshot sanasi;
- release nomi va qisqa o‘zgarishlar;
- GitHub repository, branch va commit SHA;
- Vercel project, deployment ID, deployment commit va production URL;
- Google Drive canonical file ID, nomi va linki;
- Supabase o‘zgargan yoki o‘zgarmagan holati;
- test va build natijalari;
- arxivga kiritilgan va chiqarilgan narsalar;
- restore/run buyruqlari;
- known warnings va manual review talab qiladigan joylar.

`ARCHIVE_MANIFEST.json` mashina o‘qiy oladigan metadata bo‘lib, kamida quyidagi maydonlarga ega bo‘ladi:

```json
{
  "project": "BioLab",
  "snapshotDate": "YYYY-MM-DD",
  "git": {
    "repository": "https://github.com/uzme/BioLab",
    "branch": "main",
    "commit": "full-sha",
    "commitCount": 0,
    "workingTreeClean": true
  },
  "vercel": {
    "project": "biolab",
    "deploymentId": "",
    "deploymentCommit": "",
    "state": "READY",
    "productionUrl": ""
  },
  "drive": {
    "canonicalFileId": "",
    "canonicalFileName": "",
    "duplicateCreated": false
  },
  "supabase": {
    "changed": false
  },
  "validation": {
    "typecheck": "PASS",
    "build": "PASS",
    "tests": "PASS",
    "zipIntegrity": "PASS"
  }
}
```

## 7. Arxivga kiritilmaydigan narsalar

Quyidagilar xavfsizlik va qayta tiklash imkoniyati sababli kiritilmaydi:

- `.env`, `.env.*` va real secret qiymatlar;
- API key, token, password, PAT va service-role key;
- `node_modules/`;
- `.git/`;
- Manus runtime loglari va local cache;
- vaqtinchalik test outputlari;
- eski ZIP’lar va backup ZIP’lar;
- boshqa loyihalarga tegishli fayllar;
- bir xil faylning eski nusxalari;
- Supabase remote database dumpi, agar alohida tasdiqlanmagan bo‘lsa.

`SECRETS_REQUIRED.md` faqat kerakli variable nomlari va ularni qayerga kiritish yo‘lini ko‘rsatadi; real qiymatlarni saqlamaydi.

## 8. Duplicate va eski fayl nazorati

Har bir arxiv toza temporary staging papkadan yaratiladi. Oldingi staging papkasi va oldingi output ZIP avval o‘chiriladi. Shunda eski arxivdan tasodifiy fayl ko‘chib qolmaydi.

Tekshiruvlar:

```bash
find BioLab -type f | sort
unzip -Z1 BioLab_Complete_Handoff_YYYY-MM-DD_FULL.zip | sort
```

Quyidagilar bo‘lmasligi kerak:

- `old/`, `backup/`, `copy/`, `final-final/` kabi papkalar;
- bir xil basename’li eski va yangi generated data;
- bir nechta `.env`;
- `node_modules`;
- `.git`;
- boshqa commitga tegishli `dist`;
- ichki `.zip`, `.tar.gz` yoki eski handoff archive.

## 9. ZIP yaratish tartibi

1. GitHub’dan yoki toza verified working tree’dan source olinadi.
2. Eski staging papkasi o‘chiriladi.
3. `BioLab/` root papkasi yaratiladi.
4. Source fayllar bir marta ko‘chiriladi.
5. Oxirgi successful `dist/` kiritiladi.
6. Git history bundle yaratiladi va verify qilinadi.
7. Handoff hujjatlari va external state manifest yangilanadi.
8. SHA256 checksum yaratiladi.
9. ZIP faqat staging root papkasini qamrab olgan holda yaratiladi.
10. ZIP test qilinadi va faqat undan keyin release deb nomlanadi.

Tavsiya qilinadigan qisqa nom (`Asia/Tashkent`, UTC+05:00 vaqtida):

```text
BioLab_Handoff_YYYY-MM-DD_HH-mm.zip
```

Masalan:

```text
BioLab_Handoff_2026-10-04_02-00.zip
```

ZIP nomida loyiha nomi, arxiv turi, yaratilgan sana va vaqt bo‘lishi kifoya. `Complete`, `DesignApproved`, `FULL`, `Latest` kabi ortiqcha so‘zlar qo‘shilmaydi. Aniq commit, deployment va release tafsilotlari ZIP nomida emas, `HANDOFF_README.md` va `ARCHIVE_MANIFEST.json` ichida saqlanadi.

## 10. Yakuniy validation checklist

Arxiv yuborilishidan oldin quyidagilar hammasi bajarilgan bo‘lishi shart:

- GitHub commit SHA source bilan mos;
- working tree clean yoki o‘zgarishlar manifestda qayd qilingan;
- Vercel deployment `READY`;
- production URL HTTP 200 qaytaradi;
- Google Drive canonical file ID mavjud;
- yangi Drive duplicate yaratilmagan;
- Supabase holati qayd qilingan;
- 100 ta qurilma ID’si mavjud;
- 4 locale mavjud;
- translation/schema validation PASS;
- `pnpm run check` PASS;
- `pnpm run build` PASS;
- `pnpm test` PASS;
- browser regression PASS;
- Git bundle verify PASS;
- checksum yaratildi;
- `unzip -t` xatosiz;
- secret scan PASS;
- `node_modules`, `.git`, `.env` va eski arxivlar yo‘q;
- arxiv ichida qoida faylining o‘zi mavjud.

## 11. GitHub, Vercel va Drive sinxronlash qoidasi

GitHub — source kodning canonical joyi. Vercel — shu GitHub commitdan yaratilgan production deployment. Google Drive — verified handoff snapshot. Ular bir xil release commit bilan bog‘lanadi.

Drive’ga har safar yangi duplicate yaratish mumkin emas. Canonical file ID saqlanadi va verified yangi arxiv shu faylning content/name qiymatini update qiladi. Agar Drive file ID mavjud bo‘lmasa, avval foydalanuvchiga aytiladi; ruxsatsiz yangi folder yoki boshqa loyihaga upload qilinmaydi.

Vercel env qiymatlari, Supabase credentials va boshqa secretlar arxivga eksport qilinmaydi. Ular platformadagi secure environment’da qoladi.

## 12. Boshqa AI uchun restore tartibi

Boshqa AI yoki dasturchi ZIP’ni ochgach, avval `HANDOFF_README.md`, keyin `docs/master-protocols/HANDOFF_ARCHIVE_RULES.md`, `AI_HANDOFF.md`, `CURRENT_STATE.md` va `ARCHIVE_MANIFEST.json`ni o‘qishi shart.

Keyin:

```bash
cd BioLab
pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm run build
pnpm test
```

O‘zgarish kiritishdan oldin GitHub commit, Vercel deployment va Drive canonical snapshot bilan moslik tekshiriladi. Gemini yoki boshqa AI’dan kelgan patch avtomatik qabul qilinmaydi: avval audit, keyin test, keyin release sinxronlash bajariladi.

## 13. Qoidani o‘zgartirish

Bu qoida faylini o‘zgartirish faqat release jarayoni, archive layout yoki xavfsizlik talabi o‘zgarganda mumkin. O‘zgarish sababi `HANDOFF_README.md` va `CURRENT_STATE.md`da qayd qilinadi. Eski qoida nusxalarini ZIP ichida saqlash mumkin emas; faqat joriy canonical qoida fayli qoladi.
