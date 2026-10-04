# BioLab Interactive Guide — Master Continuation Prompt (Boshqa Account Uchun)

Quyidagi matnni boshqa accountdagi yangi chatga to‘g‘ridan-to‘g‘ri nusxalab yuboring:

```text
Men BioLab Interactive Guide loyihasining mavjud, ishlayotgan source-of-truth versiyasini tiklash va davom ettirishni xohlayman. Loyihani qayta yozmang, dizaynini almashtirmang va mavjud funksiyalarni olib tashlamang.

### SOURCE OF TRUTH

- GitHub repository: https://github.com/uzme/BioLab
- Branch: main
- Google Drive canonical root name: Biotexnologiya
- Google Drive canonical root ID: 19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV
- Current handoff archive name: BioLab_Handoff_2026-10-04_13-56.zip
- Current handoff archive file ID: 1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh
- Canonical production URL: https://biolab-interactive-guide.vercel.app/
- Vercel project: `biolab` (`prj_V2sc4VlkUiqGkxShtqfYFgjrLh9L`), GitHub `uzme/BioLab` bilan ulangan.
- Current production deployment: `dpl_D7d8D1Yer6kZKFc5ece3MwVMNtEY`, state `READY`, commit `b67ca811e240257110b353e6d3800ade9cacca1c`.

### QAT’IY SAQLANADIGAN FUNKSIYALAR

Quyidagilarni saqlang va regressiya bilan himoyalang:
- Modern Precision Biotech dizayni.
- Pure CSS 3D Carousel geometriyasi: .scene, .a3d, .card, perspective, rotateY, translateZ.
- 100 ta qurilma katalogi: BIO-001 – BIO-100.
- 16 bo‘limli o‘zbekcha o‘quv tarkibi.
- Bookmarks/saralanganlar funksiyasi va sidebar.
- Qidiruv, model qidiruvi, category filter va interaktiv filter tags.
- DeviceViewer modal va ichki navigatsiya.
- PDF/print eksport oqimi.
- PWA manifest, service worker va offline pack.
- Responsive mobile, tablet, desktop va TV layout.
- O‘zbek tilidagi UI va continuity hujjatlari.

### ISH BOSHLASHDAN OLDINGI MAJBURIY QADAMLAR

1. main branchni alohida audit working copy’ga clone qiling. Ishchi nusxani production source bilan aralashtirmang.
2. docs/master-protocols/ papkasidagi barcha hujjatlarni to‘liq o‘qing: README.md, AI_HANDOFF.md, PROJECT_STATE.md, CURRENT_STATE.md, PROJECT_MANIFEST.md, ARCHITECTURE.md, REPRODUCTION.md, DATABASE.md, DECISIONS.md, CHANGELOG.md, TROUBLESHOOTING.md, SECRETS_REQUIRED.md, todo.md.
3. git rev-parse HEAD va git ls-remote origin refs/heads/mainni solishtiring. Source commitni aniq qayd qiling.
4. Foydalanuvchi tasdig‘isiz kod, CSS, data, PWA yoki hosting konfiguratsiyasini o‘zgartirmang.
5. Har qanday o‘zgarishdan oldin todo.mdga aniq mazmunli [ ] band qo‘shing. Band qo‘shilmagan bo‘lsa, kodga tegmang.

### GOOGLE DRIVE PROTOKOLI

1. Google Workspace account faol va OAuth token yaroqli ekanini tekshiring. Token expired bo‘lsa, write amallarini boshlamang; qayta autentifikatsiya so‘rang.
2. Folder IDni faqat nom bilan taxmin qilmang. files.get orqali ID nomini va parentini tekshiring.
3. Faqat Biotexnologiya root ID 19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV ichida ishlang.
4. Kodlar, PUBG, Skills yoki boshqa Drive papkalariga tegmang.
5. Write’dan oldin exact query bilan `BioLab_Handoff_2026-10-04_13-56.zip` faylini sanang. Canonical root ichida faol exact-name fayl soni 1 ta bo‘lishi kerak.
6. Duplicate yaratmang. Mavjud file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`ni update-in-place qiling yoki foydalanuvchi tasdig‘i bilan yangi dated handoff yarating.
7. Write’dan keyin yana files.get va exact-name query bilan parent ID, file ID, modified time, size, checksum, trashed va duplicate countni tekshiring.
8. .env, token, API key, PAT, password, service-role key, log, node_modules, dist, .git va runtime fayllarni Drive’ga yubormang.

### VALIDATION GATE

Har bir muhim o‘zgarishdan so‘ng quyidagi tartibni to‘liq bajaring:

pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm build
pnpm test
node scripts/release/verify_continuity_docs.mjs
node scripts/release/sync_release.mjs --check

### GITHUB RELEASE PROTOKOLI

1. gh auth statusni tekshiring.
2. Sanitizatsiyalangan source’ni faqat `uzme/BioLab` repository `main` branchiga yuboring.
3. Pushdan keyin git ls-remote origin refs/heads/main bilan live commitni tasdiqlang.

### FINAL REPORT FORMAT

Yakuniy hisobotda READY yoki NOT READY holatini, bajarilgan testlarni, GitHub commitni, Drive file IDni va Vercel canonical production URL holatini aniq yozing.
```
