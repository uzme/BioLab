# BioLab Hero Asset Recovery Layout

## Maqsad

`BioLab_Hero_Assets_Recovery.tar.gz` arxivi barcha 100 ta yakuniy hero-vizualning yagona canonical byte-level nusxasidir. Arxiv mavjud Google Drive fayli o‘rnida yangilanadi; yangi root papka yoki duplicate recovery arxivi yaratilmaydi.

## Batch nomlash qoidasi

Har bir qurilma alohida ketma-ket batchga joylanadi. Papka nomi quyidagi qat’iy shaklda bo‘ladi:

```text
BATCHES/Batch-NNN__BIO-NNN__qurilma-nomi/BIO-NNN.webp
```

Masalan, birinchi va oxirgi batchlar quyidagicha:

| Batch | Qurilma | Arxiv ichidagi manzil |
|---|---|---|
| 001 | BIO-001 — PCR (Polimeraz zanjir reaksiyasi) mashina | `BATCHES/Batch-001__BIO-001__pcr-polimeraz-zanjir-reaksiyasi-mashina/BIO-001.webp` |
| 041 | BIO-041 — Stericup Quick Release tizimi | `BATCHES/Batch-041__BIO-041__stericup-quick-release-filtratsiya-tizimi/BIO-041.webp` |
| 100 | BIO-100 — Biofilm o‘rganish reaktori | `BATCHES/Batch-100__BIO-100__biofilm-o-rganish-reaktori/BIO-100.webp` |

## Arxiv ichidagi nazorat fayllari

| Fayl | Vazifasi |
|---|---|
| `BATCH_INDEX.md` | Batch raqami, BIO ID, qurilma nomi, modeli, ichki manzili va checksumlar jadvali |
| `hero-asset-recovery-manifest.json` | 100 assetning URL, hajm, SHA-256, batch raqami va recovery path metadata’si |

## Tiklash va tekshirish

Arxivni qayta tuzish uchun `scripts/utils/build_ordered_hero_recovery_archive.mjs`, barcha 100 rasm va checksumni tekshirish uchun `scripts/utils/verify_ordered_hero_recovery_archive.mjs` ishlatiladi. Verifikatsiya faqat quyidagi holatda PASS hisoblanadi: `100` batch, `100` WebP, `BATCH_INDEX.md`, manifest va barcha SHA-256 qiymatlari mos bo‘lsa.

## Canonical manzil

| Resurs | Qiymat |
|---|---|
| Drive root | `Biotexnologiya` — `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV` |
| Recovery arxiv nomi | `BioLab_Hero_Assets_Recovery.tar.gz` |
| Recovery arxiv ID | `1s6Uhum2PxA1RWzVP1VDHAj12-AhZdT08` |
| Tekshirilgan versiya | `2026-08-21T10:05:02.918Z`; `32,579,873` bayt; SHA-256 `65ecd99d527d681d9e9952e1b352e3a8e193768b8445445b69d3cf65c607f914` |
| Bevosita Drive mirror | `Biotexnologiya/BioLab_Hero_Assets_By_Batch` — ID `1i3CwBud6QOyWMlEyitXSFm4vD_5jd9ar` |
| Mirror qamrovi | 100 batch papka, 100 ta tekshirilgan WebP, `BATCH_INDEX.md`, checksum manifest |

> Arxivning file IDsi o‘zgarmaydi: yangi versiya shu faylning o‘rniga yoziladi. Bu qoida rasmlar tarqalib ketishi yoki duplicate paydo bo‘lishining oldini oladi.
