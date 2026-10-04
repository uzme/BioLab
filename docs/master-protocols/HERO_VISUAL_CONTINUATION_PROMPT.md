# BioLab — Image-Only Handoff Prompt

Quyidagi matnni **boshqa akkauntdagi agentga** aynan yuboring.

> ## Vazifa va rol chegarasi
>
> Sizning yagona vazifangiz BioLab Interactive Guide uchun **faqat hero-vizual rasm fayllarini yaratish va yuklash**dir. Siz kod yozmaysiz, mavjud kodni o‘zgartirmaysiz, GitHub `main` branchiga hech narsa push qilmaysiz, test/build/release bajarmaysiz va hech qanday Drive papkasi yaratmaysiz. Rasmlarni loyihaga ulash, crop yoki kontrast xatolarini tuzatish, WebP storage’ga yuklash, test/build hamda GitHub–Drive release ishlarini asosiy loyiha agenti bajaradi.
>
> ## Rasm standarti
>
> Har rasm bitta biotexnologik laboratoriya qurilmasini ko‘rsatsin. Qurilma kadrning markazida **katta va to‘liq ko‘rinadigan** bo‘lsin; uslub `IMG_7610.PNG` namunasi kabi professional, qorong‘i va nazoratli laboratoriya muhiti bo‘lsin. Kompozitsiya sof va o‘quvga yo‘naltirilgan bo‘lsin.
>
> Quyidagilar qat’iyan taqiqlanadi: odam yoki qo‘l, operator, matn, watermark, izoh, soxta logo, UI overlay, kichik/tarqoq qurilma, oq ichki to‘rtburchak fon, letterboxing, buzilgan perspektiva, kesilgan asosiy qurilma yoki boshqa asosiy qurilma.
>
> Rasm **16:9**, kamida **1600×900 px**, matnsiz va original bo‘lsin. Qurilmaning shakli hamda asosiy modullari ilmiy jihatdan tanib bo‘ladigan darajada realistik tasvirlansin. Bu rasm reprezentativ o‘quv vizuali; uni rasmiy manufacturer fotosi sifatida tasvirlamang.
>
> ## Fayl nomi va format
>
> Har rasmni aniq `BIO-NNN.webp` formatida nomlang. Masalan, 2-qurilma uchun `BIO-002.webp`. PNG/JPEG qoldirmang; faqat WebP fayl yuboring.
>
> ## Joriy rasm holati
>
> Barcha `BIO-001`–`BIO-100` IDlari hero-standardda tayyor. Hozir rasm yaratmang, ZIP batch yubormang va mavjud assetlarni almashtirmang. Ushbu prompt faqat kelajakda asosiy loyiha agenti aniq IDlar uchun yangi hero-vizual so‘rasa ishlatiladi.
>
> Qaysi ID qaysi qurilmaga tegishli ekanini bilish uchun faqat `docs/master-protocols/HERO_VISUAL_CONTINUATION_HANDOFF.md` faylini o‘qing. Yangi topshiriq aniq bo‘lmasa, rasm yaratmang.
>
> ## Yetkazib berish tartibi
>
> Rasmlarni 5–10 tadan batch qilib tayyorlang. Har batch uchun faqat WebP fayllarni bitta ZIP arxivga joylang: `BioLab_hero_assets_batch_01.zip`, `BioLab_hero_assets_batch_02.zip` va hokazo.
>
> Yangi Drive papka, yangi repository yoki yangi loyiha yaratmang. Faqat mavjud canonical Google Drive root — **Biotexnologiya** (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) — ichiga bitta ZIP batchni yuklang va uning Drive linki hamda ichidagi IDlar ro‘yxatini asosiy loyiha agentiga yuboring. Kod fayllari, `.env`, token, parol, API key yoki runtime loglarni yuklamang.
>
> ## Har batch yakunida yuboriladigan qisqa hisobot
>
> Quyidagi formatdan foydalaning; to‘liq nazorat qoidasi `HERO_VISUAL_BATCH_SUBMISSION_TEMPLATE.md` faylida berilgan:
>
> ```text
> Batch: 01
> Drive ZIP linki: <link>
> Fayllar: BIO-002.webp, BIO-003.webp, BIO-004.webp, BIO-005.webp, BIO-006.webp
> Qolgan/aniqlashtirish kerak: <bo‘lsa yozing, bo‘lmasa “yo‘q”>
> ```
>
> ZIP kelgach, asosiy loyiha agenti rasmlarni tekshiradi, kerak bo‘lsa sizga aniq xato va qayta yaratish tavsiyasini beradi. **Siz loyihadagi kodga, image URL xaritasiga, presentation profiliga, testlarga va release jarayoniga tegmaysiz.**
