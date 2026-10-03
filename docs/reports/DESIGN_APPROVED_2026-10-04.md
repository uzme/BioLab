# BioLab Design Preview

## Tanlangan yo‘nalish

**Design movement:** Scientific editorial dashboard — Swiss grid aniqligi, laboratoriya datasheet uslubi va yumshoq biotech ranglari.

**Maqsad:** BioLab katalogi va qurilma o‘qish tajribasini zamonaviy, tez skan qilinadigan va ishonchli ilmiy interfeysga aylantirish. Ushbu preview faqat presentation/UI qatlamini o‘zgartiradi; qurilma ma’lumotlari, locale JSON, learning loader, bookmark, PDF, QR va routing o‘zgarmaydi.

## Asosiy prinsiplar

1. **Signal-first hierarchy:** qurilma kodi, kategoriya, model va progress bir qarashda ko‘rinadi.
2. **Editorial spacing:** kamroq bezak, ko‘proq nafas oladigan layout va aniq tipografik ritm.
3. **Instrument-grade surfaces:** kartalar “dekorativ card” emas, texnik katalog yozuvi sifatida ko‘rinadi.
4. **Calm motion:** faqat action feedback, drawer/modal va filter transitionlarda qisqa animatsiya.

## Rang falsafasi

Deep ink/navy — ilmiy ishonch va kontrast uchun; living teal — BioLab’ning o‘ziga xos signal rangi; pale mint — faol holat va learning progress uchun; warm amber — instrument status va muhim metadata uchun.

## Layout paradigmasi

Desktop’da chapdagi compact rail va keng editorial canvas; mobil’da sticky utility header va stacked catalog. Hero vizual + qisqa ilmiy summary yonma-yon qoladi, lekin asosiy urg‘u katalog va qurilma datasheet’iga beriladi.

## Signature elements

- `BIO-001` va `SOP-001` kabi instrument code badges.
- Teal signal-line va amber status marker.
- Datasheet uslubidagi metadata bands.

## Typography

Mavjud DM Sans body va Plus Jakarta Sans display juftligi saqlanadi. Sarlavhalar tight editorial scale’da, metadata uppercase va tabular raqamlar bilan beriladi.

## Interaction

Mavjud barcha click, search, filter, bookmark, QR, PDF va device learning oqimlari saqlanadi. Faqat hover, focus, active va transition ko‘rinishlari qayta ishlanadi.

## Preview chegarasi

Bu nusxa asosiy `/home/ubuntu/biolab` loyihasiga commit qilinmaydi. Foydalanuvchi preview’ni ko‘rib tasdiqlagandan keyingina tanlangan UI o‘zgarishlari asosiy loyihaga ko‘chiriladi yoki yangi handoff ZIP yaratiladi.
