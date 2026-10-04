# BioLab — Keyingi chat uchun continuation handoff

> Ushbu hujjatni yangi chatga yuborgan agent loyihani qayta yozmasdan, mavjud source-of-truth holatidan davom etishi uchun yozilgan. Maxfiy kalitlar, tokenlar, parollar va service-role ma’lumotlar bu faylga kiritilmagan.

## 1. Source-of-truth platformalar

| Platforma | Nima uchun | Joriy manzil / identifikator |
|---|---|---|
| GitHub | Canonical source code va `main` branch | https://github.com/uzme/BioLab |
| GitHub branch | Ishlaydigan asosiy branch | `main` |
| Vercel production | Foydalanuvchi ochadigan doimiy sayt | https://biolab-interactive-guide.vercel.app/ |
| Vercel project | Production loyihasi | `biolab`, project ID `prj_V2sc4VlkUiqGkxShtqfYFgjrLh9L` |
| Google Drive root | Canonical handoff va backup joyi | [Biotexnologiya](https://drive.google.com/drive/folders/19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV) |
| Drive root ID | Faqat shu papkaga write qilish mumkin | `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV` |
| Drive handoff ZIP | Joriy source handoff arxivi | [BioLab_Handoff_2026-10-04_13-56.zip](https://drive.google.com/file/d/1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh/view?usp=drivesdk) |
| Drive file ID | ZIP’ni duplicate qilmasdan update-in-place qilish uchun | `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh` |

## 2. Yangi chat boshlanganda bajariladigan tartib

1. Avval GitHub `main` branchni clone qiling yoki mavjud workspace’ni tekshiring:

   ```bash
   gh repo clone uzme/BioLab /home/ubuntu/BioLab-current
   cd /home/ubuntu/BioLab-current
   git checkout main
   git status --short --branch
   git log -1 --oneline
   ```

2. Handoff ZIP kerak bo‘lsa, yuqoridagi Drive linkidan oling. ZIP ichidagi `HANDOFF_README.md`, ushbu `HANDOFF_NEXT_CHAT.md` va `docs/master-protocols/` hujjatlarini o‘qing.

3. Continuity auditini ishga tushiring:

   ```bash
   pnpm install --frozen-lockfile --ignore-scripts
   pnpm run check
   pnpm run audit:continuity
   ```

4. Production saytni tekshiring:

   ```bash
   curl -fsSI https://biolab-interactive-guide.vercel.app/
   curl -fsSL https://biolab-interactive-guide.vercel.app/manifest.webmanifest
   ```

5. Har qanday kod o‘zgarishidan oldin `todo.md` ga aniq `[ ]` band qo‘shing. O‘zgarishdan keyin `pnpm run check`, `pnpm run build`, tegishli testlar va `git diff --check` bajaring.

## 3. GitHub ma’lumotini qanday olish

- Web orqali: https://github.com/uzme/BioLab
- CLI orqali:

  ```bash
  gh api repos/uzme/BioLab/commits/main --jq '{sha:.sha,message:.commit.message}'
  gh api repos/uzme/BioLab/branches/main --jq '{name:.name,sha:.commit.sha}'
  ```

- Faqat `uzme/BioLab` repository va `main` branch canonical hisoblanadi. Eski `uzme/biolab-interactive-guide` nomidan source-of-truth sifatida foydalanmang.

## 4. Vercel ma’lumotini qanday olish

- Production: https://biolab-interactive-guide.vercel.app/
- Project ID: `prj_V2sc4VlkUiqGkxShtqfYFgjrLh9L`
- Vercel MCP orqali `list_deployments` toolidan foydalaning:
  - `projectId`: `prj_V2sc4VlkUiqGkxShtqfYFgjrLh9L`
  - `target`: `production`
  - `teamId`: Vercel konfiguratsiyasidan oling; token yoki secretni hujjatga yozmang.
- Yangi GitHub commitni deploy qilish kerak bo‘lsa, mavjud `biolab` projectiga deploy qiling. Yangi alohida Vercel project ochmang.
- Deployment yakunida `READY` holatini va production URL’ni tekshiring.

## 5. Google Drive ma’lumotini qanday olish

- Root papka: [Biotexnologiya](https://drive.google.com/drive/folders/19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV)
- Root ID: `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`
- Handoff file ID: `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`
- Read-only metadata:

  ```bash
  gws drive files get --params '{"fileId":"1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh","fields":"id,name,size,modifiedTime,md5Checksum,parents,mimeType,trashed,webViewLink"}' --format json
  ```

- Exact-name duplicate audit:

  ```bash
  gws drive files list --params '{"q":"'\''19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV'\'' in parents and name = '\''BioLab_Handoff_2026-10-04_13-56.zip'\'' and trashed = false","pageSize":20,"fields":"files(id,name,size,modifiedTime,md5Checksum,parents)"}' --format json
  ```

- Upload/update qoidasi: faqat mavjud handoff file ID’ni update-in-place qiling. Duplicate yaratmang. `Kodlar`, `PUBG`, `Skills` yoki boshqa Drive papkalariga tegmang.

## 6. Release oldidan majburiy qoidalar

- `.env`, token, API key, parol, PAT, service-role key, log, `node_modules`, `.git`, runtime cache va maxfiy fayllarni ZIP’ga qo‘shmang.
- 100 ta qurilma katalogi, 16 bo‘limli learning dossier, 4 til (`uz`, `en`, `ru`, `tr`), PDF export, PWA/offline rejim, Bookmarks va Pure CSS 3D carousel saqlansin.
- Dizaynni qayta yozmang; faqat tasdiqlangan bug fix va enhancementlarni kiriting.
- Release natijasida hisobotda GitHub commit, Vercel deployment, Drive file ID, ZIP checksum, testlar va READY/NOT READY holati yozilsin.

## 7. Keyingi chatga tayyor qisqa prompt

```text
BioLab loyihasini mavjud source-of-truth holatidan davom ettir.

GitHub: https://github.com/uzme/BioLab (main)
Vercel production: https://biolab-interactive-guide.vercel.app/
Google Drive root: Biotexnologiya
Drive root ID: 19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV
Handoff ZIP: https://drive.google.com/file/d/1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh/view?usp=drivesdk
Drive handoff file ID: 1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh

Avval GitHub main, Vercel production va Drive handoff metadata’sini audit qil. Kodni qayta yozma, original Modern Precision Biotech dizaynini, 100 qurilma katalogini, 16 learning sectionni, 4 tilni, PDF, PWA, Bookmarks va carouselni saqla. Har qanday o‘zgarishdan oldin todo.md ga band qo‘sh. Ish tugagach check, build, test, continuity audit va sanitizatsiya bajargin. Drive’da faqat mavjud handoff file ID’ni update-in-place qil; duplicate yaratma.
```
