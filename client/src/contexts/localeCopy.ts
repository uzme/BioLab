import type { Locale } from "./LanguageContext";

export type LocaleCopy = {
  home: {
    visualSystem: string;
    visualFiles: string;
    visualWorkflow: string;
    heroKicker: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroDescription: string;
    viewCatalog: string;
    startWithPcr: string;
    benefits: [string, string, string];
    learningMap: string;
    learningStages: [string, string, string, string];
    catalogSize: string;
    equipment: string;
    tenCategories: string;
    learningFormat: string;
    sections: string;
    deepSequential: string;
    language: string;
    nativeLanguage: string;
    professionalSimple: string;
    selectedCarousel: string;
    carouselTitle: string;
    carouselDescription: string;
    searchFilter: string;
    searchDescription: string;
    selected: string;
    clearAll: string;
    searchDevice: string;
    searchModel: string;
    categoryFilter: string;
    allCategories: string;
    cancelSearch: string;
    cancelModel: string;
    cancelCategory: string;
    catalogProtocol: string;
    protocolDescription: string;
    deviceCode: string;
    scienceModule: string;
    learningStep: string;
    recordsFound: string;
    activeFiltersApplied: string;
    clearFilters: string;
  };
  device: {
    allEquipment: string;
    learningCenter: string;
    openQr: string;
    sharePdf: string;
    loading: string;
    sectionTitles: string[];
    sectionSubtitles: string[];
    purchaseTitles: [string, string, string];
    imageOfficial: string;
    imageAi: string;
    imageTransparency: string;
    sourceStatus: string;
    source: string;
    rights: string;
    openSource: string;
    checkTerms: string;
  };
};

const uz: LocaleCopy = {
  home: {
    visualSystem: "O‘QUV TIZIMI", visualFiles: "QURILMA DOSYELARI", visualWorkflow: "MODEL → WORKFLOW → NATIJA",
    heroKicker: "O‘ZBEKCHA BIOTEXNOLOGIYA KATALOGI", heroTitle: "Qurilmani bilib oling.", heroTitleAccent: "Keyin aniq ishlating.", heroDescription: "Modeldan natija talqiniga qadar — laboratoriyadagi har bir qurilma uchun ketma-ket, amaliy va ishonchli o‘quv yo‘li.", viewCatalog: "Katalogni ko‘rish", startWithPcr: "PCR bilan boshlash", benefits: ["100 qurilma", "Real workflow", "Natija talqini"], learningMap: "16 bo‘limli o‘quv xaritasi", learningStages: ["Asos", "Prinsip", "Amaliyot", "Manbalar"], catalogSize: "Katalog hajmi", equipment: "qurilma", tenCategories: "10 ta asosiy kategoriya bo‘yicha", learningFormat: "O‘quv formati", sections: "bo‘lim", deepSequential: "Chuqur va ketma-ket o‘quv dasturi", language: "Til", nativeLanguage: "o‘zbekcha", professionalSimple: "Kasbiy, sodda va tushunarli", selectedCarousel: "TANLANGAN USKUNALAR CAROUSELI", carouselTitle: "Asosiy qurilmalar va tezkor tanlov", carouselDescription: "Rasmdan tashqari nomi va modeli bilan tez tanishib o‘rganishni boshlang.", searchFilter: "QIDIRUV VA FILTR", searchDescription: "Qurilma nomi, ishlab chiqaruvchi yoki aniq model bo‘yicha izlang.", selected: "Saralanganlar", clearAll: "Barchasini tozalash", searchDevice: "Qurilma yoki ishlab chiqaruvchini qidiring…", searchModel: "Model: masalan, CFX96 yoki TSX", categoryFilter: "Kategoriya bo‘yicha filtr", allCategories: "Barcha kategoriyalar", cancelSearch: "Qurilma qidiruvini bekor qilish", cancelModel: "Model qidiruvini bekor qilish", cancelCategory: "Kategoriya filtrini bekor qilish", catalogProtocol: "KATALOG PROTOKOLI", protocolDescription: "Model, ishlab chiqaruvchi, 16 bo‘limli SOP va o‘quv manbasi har bir kartada tizimlashtiriladi.", deviceCode: "Qurilma kodi", scienceModule: "Fan moduli", learningStep: "O‘quv qadami", recordsFound: "ta qurilma topildi", activeFiltersApplied: " — faol filtrlar qo‘llanilgan", clearFilters: "Barcha filtrlarni tozalash"
  },
  device: {
    allEquipment: "Barcha uskunalar", learningCenter: "16 bo‘limli o‘quv markazi", openQr: "Qurilma QR-kodini ochish", sharePdf: "Qurilma PDF dosyesini ulashish", loading: "Yuklanmoqda…", sectionTitles: ["Qurilmaning o‘zbekcha nomi", "Original nomi, manufacturer va model", "Qurilma nima?", "Qurilma nima qiladi?", "Ishlash prinsipi", "Nimalarni o‘rganish mumkin?", "Qurilmaning asosiy qismlari", "Namuna tayyorlash", "Qanday ishlatiladi — bosqichma-bosqich", "Natijani o‘qish va talqin qilish", "Eng ko‘p uchraydigan xatolar", "Xavfsizlik", "Tozalash va kundalik xizmat", "Kalibratsiya va troubleshooting", "O‘rganish uchun amaliy mashqlar", "Ishonchli o‘quv manbalari"], sectionSubtitles: ["Kanonik atama", "Manual qidiruvi uchun", "Aniq, sodda ta’rif", "Vazifa va natija", "Namuna → jarayon → natija", "Biologik va analitik savollar", "Har bir qismning vazifasi", "Sifat va ehtiyot choralari", "Tasdiqlangan workflow", "Raw data, QC va xulosa", "Oldini olish va tekshirish", "SOP, PPE va cheklovlar", "Ishdan keyingi tartib", "Muammoni xavfsiz hal qilish", "Boshlang‘ichdan yuqori darajagacha", "Manual, guide va training"], purchaseTitles: ["Narx benchmarki va dalili", "Xarid, import va yetkazib berish", "Servis, sarf materiallari va TCO"], imageOfficial: "Rasmiy mahsulot rasmi", imageAi: "AI vizuali", imageTransparency: "Rasm shaffofligi", sourceStatus: "Manba va foydalanish holati", source: "Rasm manbasi", rights: "Litsenziya va qayta foydalanish", openSource: "Model/ishlab chiqaruvchi manbasini ochish", checkTerms: "Manba sayti va foydalanish shartlarini tekshirish"
  }
};

const en: LocaleCopy = {
  home: { visualSystem: "LEARNING SYSTEM", visualFiles: "EQUIPMENT DOSSIERS", visualWorkflow: "MODEL → WORKFLOW → RESULT", heroKicker: "BIOTECHNOLOGY EQUIPMENT CATALOG", heroTitle: "Understand the instrument.", heroTitleAccent: "Then use it precisely.", heroDescription: "From model selection to result interpretation — a structured, practical learning path for every laboratory instrument.", viewCatalog: "View catalog", startWithPcr: "Start with PCR", benefits: ["100 instruments", "Real workflow", "Result interpretation"], learningMap: "16-section learning map", learningStages: ["Foundation", "Principle", "Practice", "Sources"], catalogSize: "Catalog size", equipment: "instruments", tenCategories: "Across 10 core categories", learningFormat: "Learning format", sections: "sections", deepSequential: "A deep, sequential curriculum", language: "Language", nativeLanguage: "English", professionalSimple: "Professional, clear and accessible", selectedCarousel: "FEATURED EQUIPMENT CAROUSEL", carouselTitle: "Core instruments and quick selection", carouselDescription: "Learn the essentials quickly with each instrument’s name and model in view.", searchFilter: "SEARCH AND FILTER", searchDescription: "Search by equipment name, manufacturer or exact model.", selected: "Bookmarked", clearAll: "Clear all", searchDevice: "Search by equipment or manufacturer…", searchModel: "Model: e.g. CFX96 or TSX", categoryFilter: "Filter by category", allCategories: "All categories", cancelSearch: "Cancel equipment search", cancelModel: "Cancel model search", cancelCategory: "Clear category filter", catalogProtocol: "CATALOG PROTOCOL", protocolDescription: "Model, manufacturer, 16-section SOP and learning sources are organized in every card.", deviceCode: "Equipment code", scienceModule: "Science module", learningStep: "Learning step", recordsFound: "instruments found", activeFiltersApplied: " — active filters applied", clearFilters: "Clear all filters" },
  device: { allEquipment: "All equipment", learningCenter: "16-section learning center", openQr: "Open equipment QR code", sharePdf: "Share equipment PDF dossier", loading: "Loading…", sectionTitles: ["Canonical equipment name", "Original name, manufacturer and model", "What is the equipment?", "What does it do?", "Operating principle", "What can you learn?", "Main equipment parts", "Sample preparation", "How to use it — step by step", "Reading and interpreting results", "Common mistakes", "Safety", "Cleaning and routine maintenance", "Calibration and troubleshooting", "Practical learning exercises", "Trusted learning sources"], sectionSubtitles: ["Canonical term", "For manual searches", "Clear, simple definition", "Purpose and result", "Sample → process → result", "Biological and analytical questions", "The role of each part", "Quality and precautions", "Validated workflow", "Raw data, QC and conclusion", "Prevention and verification", "SOP, PPE and limitations", "Post-use procedure", "Safe problem solving", "Beginner to advanced", "Manuals, guides and training"], purchaseTitles: ["Price benchmark and evidence", "Purchase, import and delivery", "Service, consumables and TCO"], imageOfficial: "Official product image", imageAi: "AI visual", imageTransparency: "Image transparency", sourceStatus: "Source and usage status", source: "Image source", rights: "Licensing and reuse", openSource: "Open model/manufacturer source", checkTerms: "Check source site and usage terms" }
};

const ru: LocaleCopy = {
  home: { ...en.home, visualSystem: "УЧЕБНАЯ СИСТЕМА", visualFiles: "ДОСЬЕ ОБОРУДОВАНИЯ", visualWorkflow: "МОДЕЛЬ → ПРОЦЕСС → РЕЗУЛЬТАТ", heroKicker: "КАТАЛОГ БИОТЕХНОЛОГИЧЕСКОГО ОБОРУДОВАНИЯ", heroTitle: "Разберитесь в приборе.", heroTitleAccent: "Затем работайте точно.", viewCatalog: "Открыть каталог", startWithPcr: "Начать с ПЦР", language: "Язык", nativeLanguage: "русский", selected: "Сохранённые", clearAll: "Очистить всё", searchDevice: "Поиск по прибору или производителю…", searchModel: "Модель: например, CFX96 или TSX", categoryFilter: "Фильтр по категории", allCategories: "Все категории", catalogProtocol: "ПРОТОКОЛ КАТАЛОГА", deviceCode: "Код прибора", scienceModule: "Научный модуль", learningStep: "Учебный шаг", recordsFound: "приборов найдено", clearFilters: "Очистить все фильтры" }, device: { ...en.device, allEquipment: "Все установки", learningCenter: "Учебный центр из 16 разделов", openQr: "Открыть QR-код прибора", sharePdf: "Поделиться PDF-досье прибора", loading: "Загрузка…", sectionTitles: ["Каноническое название прибора", "Оригинальное название, производитель и модель", "Что это за прибор?", "Что он делает?", "Принцип работы", "Что можно изучить?", "Основные части прибора", "Подготовка образца", "Как использовать — пошагово", "Чтение и интерпретация результатов", "Распространённые ошибки", "Безопасность", "Очистка и регулярное обслуживание", "Калибровка и устранение неисправностей", "Практические упражнения", "Надёжные учебные источники"] }
};

const tr: LocaleCopy = {
  home: { ...en.home, visualSystem: "ÖĞRENME SİSTEMİ", visualFiles: "CİHAZ DOSYALARI", visualWorkflow: "MODEL → İŞ AKIŞI → SONUÇ", heroKicker: "BİYOTEKNOLOJİ CİHAZ KATALOĞU", heroTitle: "Cihazı anlayın.", heroTitleAccent: "Sonra doğru kullanın.", heroDescription: "Model seçiminden sonuç yorumlamaya kadar her laboratuvar cihazı için yapılandırılmış ve uygulamalı bir öğrenme yolu.", viewCatalog: "Kataloğu görüntüle", startWithPcr: "PCR ile başla", benefits: ["100 cihaz", "Gerçek iş akışı", "Sonuç yorumlama"], learningMap: "16 bölümlü öğrenme haritası", learningStages: ["Temel", "İlke", "Uygulama", "Kaynaklar"], catalogSize: "Katalog kapsamı", equipment: "cihaz", tenCategories: "10 temel kategori", learningFormat: "Öğrenme formatı", sections: "bölüm", deepSequential: "Derin ve sıralı öğrenme programı", language: "Dil", nativeLanguage: "Türkçe", professionalSimple: "Profesyonel, açık ve anlaşılır", selectedCarousel: "ÖNE ÇIKAN CİHAZLAR", carouselTitle: "Temel cihazlar ve hızlı seçim", carouselDescription: "Her cihazın adı ve modeliyle temel bilgileri hızlıca öğrenin.", searchFilter: "ARAMA VE FİLTRE", searchDescription: "Cihaz adı, üretici veya tam modele göre arayın.", selected: "Yer işaretlileri", clearAll: "Tümünü temizle", searchDevice: "Cihaz veya üretici ara…", searchModel: "Model: ör. CFX96 veya TSX", categoryFilter: "Kategoriye göre filtrele", allCategories: "Tüm kategoriler", cancelSearch: "Cihaz aramasını iptal et", cancelModel: "Model aramasını iptal et", cancelCategory: "Kategori filtresini temizle", catalogProtocol: "KATALOG PROTOKOLÜ", protocolDescription: "Model, üretici, 16 bölümlü SOP ve öğrenme kaynakları her kartta düzenlenir.", deviceCode: "Cihaz kodu", scienceModule: "Bilim modülü", learningStep: "Öğrenme adımı", recordsFound: "cihaz bulundu", activeFiltersApplied: " — etkin filtreler uygulandı", clearFilters: "Tüm filtreleri temizle" }, device: { ...en.device, allEquipment: "Tüm cihazlar", learningCenter: "16 bölümlü öğrenme merkezi", openQr: "Cihaz QR kodunu aç", sharePdf: "Cihaz PDF dosyasını paylaş", loading: "Yükleniyor…", sectionTitles: ["Cihazın kanonik adı", "Özgün ad, üretici ve model", "Bu cihaz nedir?", "Ne işe yarar?", "Çalışma ilkesi", "Neler öğrenilebilir?", "Cihazın ana parçaları", "Numune hazırlama", "Nasıl kullanılır — adım adım", "Sonuçları okuma ve yorumlama", "Yaygın hatalar", "Güvenlik", "Temizlik ve rutin bakım", "Kalibrasyon ve sorun giderme", "Uygulamalı öğrenme egzersizleri", "Güvenilir öğrenme kaynakları"] }
};

export const localeCopy: Record<Locale, LocaleCopy> = { uz, en, ru, tr };
export function getLocaleCopy(locale: Locale): LocaleCopy { return localeCopy[locale]; }
