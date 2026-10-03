# Keyingi Handoff ZIP uchun ko‘rsatma

Ushbu faylni keyingi chatga ham yuboring. Keyingi chat shu loyihadan yangi handoff ZIP tayyorlasa, quyidagi tartibni saqlashi kerak.

## 1. Avval loyihani tekshirish

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm run build
pnpm run test
```

Agar tekshiruv yoki test xato bersa, ZIP tayyorlashdan oldin xatoni tuzatish va tekshiruvlarni qayta bajarish kerak.

## 2. Source-only ZIP yaratish

`node_modules`, `.git`, vaqtinchalik cache va loglarni qo‘shmang. Source-only handoff kichikroq bo‘ladi va source kodni qayta tiklash uchun yetarli.

```bash
rm -rf /tmp/biolab-handoff-source
mkdir -p /tmp/biolab-handoff-source/BioLab

tar --exclude='./node_modules' \
    --exclude='./dist' \
    --exclude='./.git' \
    --exclude='./.manus-logs' \
    --exclude='./.vite' \
    -cf - . | tar -xf - -C /tmp/biolab-handoff-source/BioLab

cd /tmp/biolab-handoff-source
zip -qr /home/ubuntu/BioLab_Complete_Handoff_<YYYY-MM-DD>.zip BioLab
zip -T /home/ubuntu/BioLab_Complete_Handoff_<YYYY-MM-DD>.zip
```

## 3. Dist bilan FULL ZIP yaratish

Agar foydalanuvchi tayyor production buildni ham so‘rasa, avval `pnpm run build` bajaring va `dist` papkasini ZIP ichida qoldiring.

```bash
rm -rf /tmp/biolab-handoff-full
mkdir -p /tmp/biolab-handoff-full/BioLab

tar --exclude='./node_modules' \
    --exclude='./.git' \
    --exclude='./.manus-logs' \
    --exclude='./.vite' \
    -cf - . | tar -xf - -C /tmp/biolab-handoff-full/BioLab

cd /tmp/biolab-handoff-full
zip -qr /home/ubuntu/BioLab_Complete_Handoff_<YYYY-MM-DD>_FULL.zip BioLab
zip -T /home/ubuntu/BioLab_Complete_Handoff_<YYYY-MM-DD>_FULL.zip
```

## 4. ZIP ichidagi majburiy fayllar

Har ikki ZIP’da quyidagilar bo‘lishi shart:

- `client/src/lib/generated/uz.json`
- `client/src/lib/generated/en.json`
- `client/src/lib/generated/ru.json`
- `client/src/lib/generated/tr.json`
- `client/src/lib/equipmentData.ts`
- `client/src/lib/learningData.ts`
- `client/src/index.css`
- `client/src/components/BookmarksSidebar.tsx`
- `client/src/components/ui/sheet.tsx`
- `HANDOFF_README.md`
- `HANDOFF_NEXT_ZIP_INSTRUCTIONS.md`

FULL ZIP’da qo‘shimcha ravishda quyidagilar bo‘lishi shart:

- `dist/index.js`
- `dist/public/index.html`
- `dist/public/assets/`

## 5. Ma’lumotlarni yo‘qotmaslik qoidalari

- Eski ZIP’ni o‘chirmang; yangi versiyani yangi nom bilan yarating.
- 4 ta locale JSON faylini o‘zboshimchalik bilan qayta yozmang.
- `equipmentData.ts` va `learningData.ts` fayllaridagi qurilma ma’lumotlarini o‘zgartirmang, agar foydalanuvchi buni alohida so‘ramagan bo‘lsa.
- ZIP yaratishdan oldin fayllar soni, hajmi va `zip -T` natijasini tekshiring.
- Handoff README’da commit, test natijasi, ZIP turi (source-only yoki FULL) va chiqarib tashlangan papkalarni yozing.

## 6. Keyingi chatga beriladigan tayyor prompt

> Ushbu BioLab handoff ZIP’ni to‘liq tikla. Ma’lumotlar, 100 ta qurilma, 4 ta locale JSON, 16 bo‘limli learning kontenti, dizayn va funksiyalarni o‘zgartirma. Avval ZIP ichidagi `HANDOFF_README.md` va `HANDOFF_NEXT_ZIP_INSTRUCTIONS.md` fayllarini o‘qi. Dependencylarni o‘rnat, check/build/test bajargin. Yangi handoff tayyorlasang eski ZIP’ni o‘chirma, yangi sana bilan alohida source-only va kerak bo‘lsa `_FULL` ZIP yarat. ZIP ichida barcha 4 locale JSON, qurilma ma’lumotlari, dizayn fayllari va ushbu ko‘rsatma fayli bo‘lsin. FULL ZIP so‘ralsa `dist` papkasini ham qo‘sh.
