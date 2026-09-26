/*
  BioLab design reminder: Modern Precision Biotech — cold laboratory canvas, deep teal authority,
  asymmetric left navigation, and a 16-section Uzbek learning curriculum for every instrument.
*/
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Beaker, BookOpen, Bot, ChevronRight, CircleHelp, FlaskConical, Grid2X2, Heart, LibraryBig, Menu, Microscope, Moon, Search, Settings2, SlidersHorizontal, Sparkles, Sun, X } from "lucide-react";
import Pure3DCarousel from "@/components/Pure3DCarousel";
import OfflineManager from "@/components/OfflineManager";
import PwaInstallCard from "@/components/PwaInstallCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { equipment, categories, type Equipment } from "@/lib/equipmentData";
import { equipmentImages } from "@/lib/equipmentImages";
import EquipmentCard from "@/components/EquipmentCard";
import BookmarksSidebar from "@/components/BookmarksSidebar";
import CatalogFilterSheet from "@/components/CatalogFilterSheet";
import DeviceQrDialog from "@/components/DeviceQrDialog";
import SettingsDialog from "@/components/SettingsDialog";
import { toast } from "sonner";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { useTheme } from "@/contexts/ThemeContext";
import { getCategoryLabel, useLanguage } from "@/contexts/LanguageContext";
import { localizeEquipment } from "@/lib/catalogLocalization";
import { DEVICE_QUERY_KEY } from "@/lib/deviceQr";

const DeviceViewer = lazy(() => import("@/components/DeviceViewer"));

const categoryIcons: Record<string, typeof FlaskConical> = {
  "Molekulyar biologiya": FlaskConical,
  "Mikroskopiya": Microscope,
  "Hujayra kulturalari": Beaker,
  "Mikrobiologiya": Sparkles,
  "Analitika": Grid2X2,
  "Sentrifugatsiya": Settings2,
  "Bioreaktorlar": FlaskConical,
  "Sovutish va saqlash": LibraryBig,
  "Namuna tayyorlash": BookOpen,
  "Avtomatlashtirish": Settings2,
};

function Sidebar({ activeCategory, onCategory, onMobileClose, onOpenSettings, drawer = false }: { activeCategory: string; onCategory: (category: string) => void; onMobileClose?: () => void; onOpenSettings?: () => void; drawer?: boolean }) {
  const { locale, text } = useLanguage();
  return <aside className={`sidebar ${drawer ? "mobile-drawer" : ""}`}>
      <div className="mb-10 flex items-center gap-3 px-2">
      <div className="brand-mark relative grid h-12 w-12 place-items-center overflow-hidden rounded-[15px] border border-[#e7b64a]/70 bg-black shadow-[0_10px_24px_rgba(129,83,9,0.24)]"><img src="/biolab-logo.webp" alt="BioLab laboratoriya emblemi" className="brand-mark-emblem h-full w-full object-contain object-center" /></div>
      <div className="sidebar-copy"><div className="display flex items-baseline gap-1 text-[22px] font-bold tracking-[-0.055em] text-[#173d42]">Bio<span className="text-[#0d9488]">Lab</span><span className="ml-1 text-[9px] tracking-normal text-[#86a39c]">/ LAB-01</span></div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5b7c77]">SOP o‘quv tizimi</div></div>
    </div>
    <div className="sidebar-copy mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#86a39c]">{text.navigation}</div>
    <nav className="space-y-1 overflow-y-auto scrollbar-thin">
      {categories.map((category) => {
        const Icon = category === "Barcha uskunalar" ? Grid2X2 : categoryIcons[category] || Beaker;
        const label = getCategoryLabel(category, locale);
        return <button key={category} onClick={() => { onCategory(category); onMobileClose?.(); }} className={`nav-link ${activeCategory === category ? "active" : ""}`} title={label}><Icon size={17} /><span className="nav-label text-left text-[13px]">{label}</span>{category !== "Barcha uskunalar" && <span className="nav-label ml-auto text-[11px] text-[#91a7a0]">{equipment.filter((item) => item.category === category).length}</span>}</button>;
      })}
    </nav>
    <a href="/agent" className="mt-5 flex items-center gap-2 rounded-2xl border border-[#b8d8ce] bg-[#eaf7f2] px-3 py-3 text-sm font-bold text-[#0b7772] transition hover:bg-white" aria-label={text.pixelAgent}><Bot size={16} /><span className="sidebar-copy">{text.pixelAgent}</span><ArrowUpRight size={14} className="ml-auto" /></a>
    <div className="sidebar-footer mt-auto px-2 pt-6">
      <button type="button" aria-label="Sozlamalar va Copyright" className="sidebar-copy w-full rounded-2xl border-0 bg-[#edf7f4] p-4 text-left cursor-pointer hover:bg-[#e2ede8] transition shadow-sm" onClick={() => { onOpenSettings?.(); onMobileClose?.(); }}>
        <div className="mb-2 flex items-center gap-2 text-[#0c7773]"><Settings2 size={15} /><span className="text-xs font-bold">{text.settings}</span></div>
        <p className="sidebar-footer-copy text-xs leading-5 text-[#537c76]">© 2026 Mengliyev Bahrom Husanovich</p>
        <p className="sidebar-footer-copy mt-1 text-[11px] leading-4 text-[#6b8c86]">Mualliflik huquqi, litsenziya va tizim holati.</p>
      </button>
    </div>
  </aside>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Barcha uskunalar");
  const [query, setQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<Equipment | null>(null);
  const [qrDevice, setQrDevice] = useState<Equipment | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isFilterPending, startFilterTransition] = useTransition();
  const deviceModalScrollRef = useRef<HTMLDivElement>(null);
  const deviceViewerScrollRef = useRef<HTMLDivElement>(null);
  const resetDeviceViewerScroll = useCallback(() => {
    [deviceModalScrollRef.current, deviceViewerScrollRef.current].forEach((container) => {
      if (!container) return;
      container.style.scrollBehavior = "auto";
      container.scrollTop = 0;
      container.scrollLeft = 0;
      container.scrollTo(0, 0);
    });
  }, []);
  const { theme, toggleTheme } = useTheme();
  const { locale, text } = useLanguage();
  const localizedEquipment = useMemo(() => equipment.map((device) => localizeEquipment(device, locale)), [locale]);
  const validDeviceIds = useMemo(() => new Set(equipment.map((device) => device.id)), []);
  const { markSectionRead, getCompletedSections, learnedDeviceCount, completedSectionCount } = useLearningProgress(validDeviceIds);
  const { bookmarkedIds, bookmarkedCount, isBookmarked, toggleBookmark, clearBookmarks, exportBookmarks, importBookmarks } = useBookmarks(validDeviceIds);
  const handleImportBookmarks = async (file: File) => importBookmarks(file);
  const bookmarkedDevices = useMemo(() => bookmarkedIds.map((id) => localizedEquipment.find((device) => device.id === id)).filter((device): device is Equipment => Boolean(device)), [bookmarkedIds, localizedEquipment]);
  const handleExportBookmarksCsv = async () => {
    if (!bookmarkedDevices.length) {
      toast.info("Eksport qilish uchun kamida bitta qurilmani saralang.");
      return;
    }
    const { downloadBookmarksCsv } = await import("@/lib/bookmarkExport");
    downloadBookmarksCsv(bookmarkedDevices, locale);
    toast.success(`${bookmarkedDevices.length} ta saralangan qurilma CSV fayliga eksport qilindi.`);
  };
  const handleExportBookmarksPdf = async () => {
    if (!bookmarkedDevices.length) {
      toast.info("Eksport qilish uchun kamida bitta qurilmani saralang.");
      return;
    }
    try {
      const { downloadBookmarksPdf } = await import("@/lib/bookmarkExport");
      await downloadBookmarksPdf(bookmarkedDevices, theme, locale);
      toast.success(`${bookmarkedDevices.length} ta saralangan qurilma PDF fayliga eksport qilindi.`);
    } catch {
      toast.error("PDF faylini yaratib bo‘lmadi. Iltimos, qayta urinib ko‘ring.");
    }
  };
  const handleShareBookmarksPdf = async () => {
    if (!bookmarkedDevices.length) {
      toast.info("Ulashish uchun kamida bitta qurilmani saralang.");
      return;
    }
    try {
      const { shareBookmarksPdf } = await import("@/lib/bookmarkExport");
      const result = await shareBookmarksPdf(bookmarkedDevices, new Date(), theme, locale);
      if (result === "shared") {
        toast.success(`${bookmarkedDevices.length} ta saralangan qurilma PDFi ulashish oynasiga tayyorlandi.`);
      } else if (result === "downloaded") {
        toast.info("Bu brauzer PDF fayl ulashishni qo‘llamaydi. PDF yuklab olindi.");
      } else {
        toast.info("PDFni ulashish bekor qilindi.");
      }
    } catch {
      toast.error("PDF faylini ulashishga tayyorlab bo‘lmadi. Iltimos, qayta urinib ko‘ring.");
    }
  };
  const handleShareDevicePdf = async (device: Equipment) => {
    try {
      toast.message(`${device.id} PDF dosyesi tayyorlanmoqda…`);
      const { shareDevicePdf } = await import("@/lib/devicePdfExport");
      const result = await shareDevicePdf(device, new Date(), theme, locale);
      if (result === "shared") toast.success(`${device.id} PDF dosyesi ulashish oynasiga tayyorlandi.`);
      else if (result === "downloaded") toast.info("Bu brauzer PDF-fayl ulashishni qo‘llamaydi. PDF qurilmaga yuklab olindi.");
      else toast.info("PDFni ulashish bekor qilindi.");
    } catch {
      toast.error(`${device.id} uchun PDF dosyesini yaratib bo‘lmadi. Iltimos, qayta urinib ko‘ring.`);
    }
  };

  useEffect(() => {
    const deviceId = new URLSearchParams(window.location.search).get(DEVICE_QUERY_KEY);
    const deepLinkedDevice = localizedEquipment.find((device) => device.id === deviceId);
    if (deepLinkedDevice) setSelectedDevice(deepLinkedDevice);
  }, [localizedEquipment]);

  const categoryCounts = useMemo(() => categories.slice(1).map((category) => ({ name: category, count: equipment.filter((item) => item.category === category).length })), []);
  const filtered = useMemo(() => localizedEquipment.filter((item) => {
    const matchesCategory = activeCategory === "Barcha uskunalar" || item.category === activeCategory;
    const matchesBookmark = !bookmarksOnly || bookmarkedIds.includes(item.id);
    const searchText = `${item.name} ${item.model} ${item.models} ${item.brands} ${item.category} ${item.description} ${item.purpose}`.toLowerCase();
    const modelText = `${item.model} ${item.models} ${item.brands}`.toLowerCase();
    return matchesCategory && matchesBookmark && searchText.includes(query.trim().toLowerCase()) && modelText.includes(modelQuery.trim().toLowerCase());
  }), [activeCategory, bookmarkedIds, bookmarksOnly, modelQuery, query, localizedEquipment]);
  const searchSuggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return localizedEquipment.slice(0, 6);
    return localizedEquipment.filter((item) => `${item.id} ${item.name} ${item.model} ${item.brands} ${item.category}`.toLowerCase().includes(needle)).slice(0, 6);
  }, [localizedEquipment, query]);
  const hasActiveFilters = activeCategory !== "Barcha uskunalar" || Boolean(query.trim()) || Boolean(modelQuery.trim()) || bookmarksOnly;
  const orderedFiltered = useMemo(() => [...filtered].sort((first, second) => Number(first.id.replace("BIO-", "")) - Number(second.id.replace("BIO-", ""))), [filtered]);
  const visibleCategoryGroups = useMemo(() => {
    if (!hasActiveFilters) return [{ category: "Barcha uskunalar", devices: orderedFiltered }];
    return categories.slice(1).map((category) => ({
      category,
      devices: orderedFiltered.filter((device) => device.category === category),
    })).filter((group) => group.devices.length > 0);
  }, [hasActiveFilters, orderedFiltered]);
  const nextImageUrls = useMemo(() => orderedFiltered.slice(0, 4)
    .map((device) => equipmentImages[`BIO-${String(device.number).padStart(3, "0")}`]?.url)
    .filter((url): url is string => Boolean(url)), [orderedFiltered]);

  useEffect(() => {
    // Dastlabki katalog kartalarining o‘zida eager/high prioritet bor. Qo‘shimcha
    // Image warmup faqat foydalanuvchi filter yoki qidiruv natijasini o‘zgartirganda
    // idle vaqtda ishlaydi — mobil tarmoqda bir xil rasm uchun takroriy so‘rov bermaydi.
    if (!hasActiveFilters || document.visibilityState !== "visible") return;

    const warmup = () => {
      nextImageUrls.forEach((url) => {
        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = "auto";
        image.src = url;
      });
    };

    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleHandle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(warmup, { timeout: 800 })
      : window.setTimeout(warmup, 180);

    return () => {
      if (typeof idleWindow.cancelIdleCallback === "function" && typeof idleWindow.requestIdleCallback === "function") {
        idleWindow.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
    };
  }, [hasActiveFilters, nextImageUrls]);

  useLayoutEffect(() => {
    if (!selectedDevice) return;
    resetDeviceViewerScroll();
    const animationFrame = window.requestAnimationFrame(resetDeviceViewerScroll);
    // iOS Safari asinxron rasm va modul renderidan keyin scroll holatini qayta tiklashi mumkin.
    // Qisqa ikkinchi reset faqat yangi detail ochilishida ishlaydi.
    const settleTimer = window.setTimeout(resetDeviceViewerScroll, 80);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
    };
  }, [resetDeviceViewerScroll, selectedDevice?.id]);

  useEffect(() => {
    if (!selectedDevice) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedDevice]);
  const scrollToCatalog = useCallback(() => {
    window.requestAnimationFrame(() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);
  const handleCategoryChange = (category: string, shouldScrollToCatalog = false) => startFilterTransition(() => {
    setActiveCategory(category);
    if (shouldScrollToCatalog) scrollToCatalog();
  });
  const handleQueryChange = (value: string) => startFilterTransition(() => setQuery(value));
  const handleModelQueryChange = (value: string) => startFilterTransition(() => setModelQuery(value));
  const handleBookmarksOnlyChange = (value: boolean) => startFilterTransition(() => setBookmarksOnly(value));
  const clearFilters = () => startFilterTransition(() => {
    setActiveCategory("Barcha uskunalar");
    setQuery("");
    setModelQuery("");
    setBookmarksOnly(false);
  });
  const activeFilterTags = useMemo(() => [
    query.trim() ? { key: "query", label: `Qidiruv: ${query.trim()}`, clear: () => handleQueryChange("") } : null,
    modelQuery.trim() ? { key: "model", label: `Model: ${modelQuery.trim()}`, clear: () => handleModelQueryChange("") } : null,
    activeCategory !== "Barcha uskunalar" ? { key: "category", label: getCategoryLabel(activeCategory, locale), clear: () => handleCategoryChange("Barcha uskunalar") } : null,
    bookmarksOnly ? { key: "bookmarks", label: "Saralanganlar", clear: () => handleBookmarksOnlyChange(false) } : null,
  ].filter((tag): tag is { key: string; label: string; clear: () => void } => Boolean(tag)), [activeCategory, bookmarksOnly, locale, modelQuery, query]);



  return <div className="shell">
    <Sheet open={mobileNav} onOpenChange={setMobileNav}>
      <SheetContent side="left" className="w-[min(86vw,320px)] min-w-0 overflow-hidden border-[#c8e2da] bg-[#f7fbfa] p-0 text-[#173d42] transition duration-250 sm:hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobil Navigatsiya</SheetTitle>
          <SheetDescription>Kategoriya va sozlamalar paneli</SheetDescription>
        </SheetHeader>
        <Sidebar drawer activeCategory={activeCategory} onCategory={(category) => handleCategoryChange(category, true)} onMobileClose={() => setMobileNav(false)} onOpenSettings={() => setSettingsOpen(true)} />
      </SheetContent>
    </Sheet>
    <div className="hidden sm:block"><Sidebar activeCategory={activeCategory} onCategory={(category) => handleCategoryChange(category, true)} onOpenSettings={() => setSettingsOpen(true)} /></div>
    <main className="app-main min-w-0 flex-1">
      <header className="app-header sticky top-0 z-30 border-b border-[#cce4dd] bg-[#f7fbfa]/95 px-3 py-3 backdrop-blur-xl sm:px-8 sm:py-3.5 lg:px-12 shadow-[0_4px_20px_rgba(23,61,66,0.04)]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileNav(true)}
              className="header-menu-action grid h-10 w-10 shrink-0 place-items-center sm:hidden"
              aria-label="Menyuni ochish"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <div className="hidden text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6d8b87] sm:block">BioLab // Katalog</div>
              <div className="hidden text-xs font-bold text-[#173d42] sm:block">100 Qurilma & 16 SOP · Muallif: Mengliyev Bahrom Husanovich</div>
              <div className="header-mobile-brand sm:hidden">
                <span className="header-mobile-brand-name">Bio<span>Lab</span></span>
                <span className="header-mobile-brand-meta">LAB-01 · 100 × 16 · M.B.H.</span>
              </div>
            </div>
          </div>
          <div className="header-action-cluster" data-mobile-header-actions>
            <OfflineManager compact />
            <button
              type="button"
              onClick={() => toggleTheme?.()}
              className="header-action"
              data-header-action="theme"
              aria-label={theme === "dark" ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"}
              title={theme === "dark" ? "Yorug‘ rejim" : "Qorong‘i rejim"}
            >
              {theme === "dark" ? <Sun size={16} className="text-[#f3c969]" /> : <Moon size={16} className="text-[#0d7774]" />}
              <span className="sr-only">{theme === "dark" ? "Yorug‘" : "Qorong‘i"}</span>
            </button>
            <button
              type="button"
              onClick={() => setBookmarksOpen(true)}
              className="header-action relative"
              data-header-action="bookmarks"
              aria-label="Saralanganlarni ochish"
            >
              <Heart size={16} fill={bookmarkedCount > 0 ? "currentColor" : "none"} className={bookmarkedCount > 0 ? "text-[#0d7774]" : "text-[#52716d]"} />
              {bookmarkedCount > 0 && <span className="header-action-count">{bookmarkedCount}</span>}
            </button>
            <button
              type="button"
              className="header-action"
              data-header-action="filters"
              aria-label="Kengaytirilgan katalog filtrlari"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} className="text-[#0d7774]" />
              <span className="sr-only">Filtrlar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="page-frame mx-auto max-w-[1500px] px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
        <PwaInstallCard />
        <section className="landing-hero" data-hero-surface>
          <div className="landing-hero-visual">
            <img src="/biolab-main-hero.webp" alt="Zamonaviy biotexnologiya laboratoriyasi" className="landing-hero-image" />
            <div className="landing-hero-image-shade" />
            <div className="landing-visual-top"><span>BIO.LAB / LAB-01</span><span>O‘QUV TIZIMI</span></div>
            <div className="landing-visual-core"><span className="landing-visual-index">01—100</span><span className="landing-visual-copy">QURILMA DOSYELARI</span><span className="landing-visual-line" /></div>
            <div className="landing-visual-bottom"><span className="landing-visual-signal" />MODEL → WORKFLOW → NATIJA</div>
          </div>
          <div className="landing-hero-panel">
            <div className="landing-hero-kicker"><span className="landing-status-dot" aria-hidden="true" />O‘ZBEKCHA BIOTEXNOLOGIYA KATALOGI</div>
            <h1 className="landing-hero-title display">Qurilmani bilib oling.<br /><span>Keyin aniq ishlating.</span></h1>
            <p className="landing-hero-copy">Modeldan natija talqiniga qadar — laboratoriyadagi har bir qurilma uchun ketma-ket, amaliy va ishonchli o‘quv yo‘li.</p>
            <div className="landing-hero-actions"><Button className="landing-primary-action" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Katalogni ko‘rish <ArrowUpRight size={17} /></Button><Button variant="outline" className="landing-secondary-action" onClick={() => setSelectedDevice(localizedEquipment[0])}>PCR bilan boshlash <ChevronRight size={17} /></Button></div>
            <div className="landing-benefits" aria-label="Platforma afzalliklari"><span><LibraryBig size={15} />100 qurilma</span><span><Settings2 size={15} />Real workflow</span><span><CircleHelp size={15} />Natija talqini</span></div>
            <div className="landing-learning-map" data-hero-learning-path aria-label="16 bo‘limli o‘quv xaritasi">
              <div className="landing-map-heading"><span>16 BO‘LIMLI SOP</span><b>4 asosiy bosqich</b></div>
              <div className="landing-map-stages" role="list"><div role="listitem"><b>01—04</b><span>Asos</span></div><div role="listitem"><b>05—08</b><span>Prinsip</span></div><div role="listitem"><b>09—12</b><span>Amaliyot</span></div><div role="listitem"><b>13—16</b><span>Manbalar</span></div></div>
            </div>
          </div>
        </section>

        <section className="metric-grid mt-8 grid gap-4 sm:grid-cols-3"><div className="metric-card rounded-2xl border border-[#d8e7e3] bg-[#ffffff] p-5"><div className="mb-4 flex items-center justify-between"><span className="eyebrow">Katalog hajmi</span><LibraryBig size={18} className="text-[#0d8a80]" /></div><div className="metric-number text-3xl font-bold text-[#173d42]">100 <span className="text-base font-medium text-[#76938d]">qurilma</span></div><div className="mt-2 text-xs text-[#74918b]">10 ta asosiy kategoriya bo‘yicha</div></div><div className="metric-card rounded-2xl border border-[#d8e7e3] bg-[#ffffff] p-5"><div className="mb-4 flex items-center justify-between"><span className="eyebrow">O‘quv formati</span><Sparkles size={18} className="text-[#0d8a80]" /></div><div className="metric-number text-3xl font-bold text-[#173d42]">16 <span className="text-base font-medium text-[#76938d]">bo‘lim</span></div><div className="mt-2 text-xs text-[#74918b]">Chuqur va ketma-ket o‘quv dasturi</div></div><div className="metric-card rounded-2xl border border-[#d8e7e3] bg-[#ffffff] p-5"><div className="mb-4 flex items-center justify-between"><span className="eyebrow">Til</span><BookOpen size={18} className="text-[#0d8a80]" /></div><div className="metric-number text-3xl font-bold text-[#173d42]">UZ <span className="text-base font-medium text-[#76938d]">o‘zbekcha</span></div><div className="mt-2 text-xs text-[#74918b]">Kasbiy, sodda va tushunarli</div></div></section>

        <section className="carousel-zone mt-12">
          {isFilterPending && <div className="filter-transition" role="status" aria-label="Filtr natijalari yangilanmoqda"><span /></div>}
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <div className="eyebrow mb-1 text-[#0d9488]">TANLANGAN USKUNALAR CAROUSELI</div>
              <h2 className="display text-2xl font-bold text-[#173d42] sm:text-3xl">Asosiy qurilmalar va tezkor tanlov</h2>
              <p className="mt-1 text-sm text-[#587872]">Rasmdan tashqari nomi va modeli bilan tez tanishib o‘rganishni boshlang.</p>
            </div>
            <div className="tech-label rounded-full border border-[#b8d8ce] bg-white px-3 py-1.5 text-[#0b7772]">12 TA ASOSIY REKORD</div>
          </div>
          <div className="px-2 py-4 sm:px-6">
            <Pure3DCarousel onSelectDevice={(device) => setSelectedDevice(device)} isBookmarked={isBookmarked} onToggleBookmark={toggleBookmark} />
          </div>
        </section>

        <section className="catalog-zone mt-12" id="catalog"><div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="eyebrow mb-2">Navigatsiya / SOP SPINE</div><h2 className="display text-3xl font-bold text-[#173d42] sm:text-4xl">Kategoriyalar</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#66847e]">Katalog 16 bosqichli o‘quv oqimi bo‘yicha modul-modul tuzilgan — kerakli qurilmani toping va keyin to‘liq dosyega o‘ting.</p></div><div className="tech-label rounded-full border border-[#cbded4] bg-[#ffffff] px-3 py-2 text-[#51736d]">100 TA ILMIY REKORD</div></div><div className="sop-spine mb-5" aria-label="16 bosqichli SOP o‘quv spine"><div className="sop-spine-track" aria-hidden="true" /><div className="sop-spine-step is-active"><span>01</span><small>Tushuncha</small></div><div className="sop-spine-step"><span>05</span><small>Prinsip</small></div><div className="sop-spine-step"><span>09</span><small>Workflow</small></div><div className="sop-spine-step"><span>16</span><small>Manual</small></div></div>
          <div className="rounded-2xl border border-[#c9ded7] bg-[#f7fbfa] p-3 shadow-[0_10px_24px_rgba(31,87,80,0.06)] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div><div className="tech-label text-[#0b6663]">QIDIRUV VA FILTR</div><p className="mt-1 text-xs text-[#66847e]">Qurilma nomi, manufacturer yoki aniq model bo‘yicha izlang.</p></div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                <button type="button" onClick={() => handleBookmarksOnlyChange(!bookmarksOnly)} aria-pressed={bookmarksOnly} className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition ${bookmarksOnly ? "border-[#0d7774] bg-[#0d7774] text-white" : "border-[#b7d9cd] bg-white text-[#0b7772] hover:border-[#0b7772]"}`}><Heart size={13} fill={bookmarksOnly ? "currentColor" : "none"} /> Saralanganlar <span className="rounded-full bg-black/10 px-1.5 py-0.5">{bookmarkedCount}</span></button>
                {hasActiveFilters && <button type="button" onClick={clearFilters} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#b7d9cd] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#0b7772] transition hover:border-[#0b7772]" aria-label="Barchasini tozalash"><X size={13} /> Barchasini tozalash</button>}
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[1.25fr_1fr_0.9fr]">
              <label className="relative block"><span className="sr-only">{text.searchPlaceholder}</span><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#67908a]" /><Input value={query} onFocus={() => setSuggestionsOpen(true)} onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 120)} onChange={(event) => { handleQueryChange(event.target.value); setSuggestionsOpen(true); }} placeholder={locale === "uz" ? "Qurilma yoki manufacturer qidiring..." : text.searchPlaceholder} className="h-11 rounded-xl border-[#cbded8] bg-white pl-9 pr-9 text-sm text-[#173d42] placeholder:text-[#94aaa5]" />{query && <button type="button" onClick={() => handleQueryChange("")} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#5d827c] transition hover:bg-[#e5f2ed] hover:text-[#0b7772]" aria-label="Qurilma qidiruvini bekor qilish"><X size={15} /></button>}{suggestionsOpen && searchSuggestions.length > 0 && <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-40 overflow-hidden rounded-2xl border border-[#c9ded7] bg-white p-1.5 shadow-[0_18px_40px_rgba(23,61,66,0.16)]" role="listbox" aria-label={text.searchSuggestions}>{searchSuggestions.map((suggestion) => <button key={suggestion.id} type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => { setQuery(suggestion.name); setSuggestionsOpen(false); }} className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#edf8f4]"><span className="min-w-0"><span className="block truncate text-xs font-bold text-[#173d42]">{suggestion.name}</span><span className="mt-0.5 block truncate text-[10px] font-semibold text-[#6d8b87]">{suggestion.id} · {suggestion.model}</span></span><span className="shrink-0 text-[10px] font-bold text-[#0d7774]">{getCategoryLabel(suggestion.category, locale)}</span></button>)}</div>}</label>
              <label className="relative block"><span className="sr-only">{text.modelFilter}</span><Settings2 size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#67908a]" /><Input value={modelQuery} onChange={(event) => handleModelQueryChange(event.target.value)} placeholder={locale === "uz" ? "Model: masalan, CFX96 yoki TSX" : text.modelFilter} className="h-11 rounded-xl border-[#cbded8] bg-white pl-9 pr-9 text-sm text-[#173d42] placeholder:text-[#94aaa5]" />{modelQuery && <button type="button" onClick={() => handleModelQueryChange("")} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#5d827c] transition hover:bg-[#e5f2ed] hover:text-[#0b7772]" aria-label="Model qidiruvini bekor qilish"><X size={15} /></button>}</label>
              <label className="relative block"><span className="sr-only">Kategoriya bo‘yicha filtr</span><select value={activeCategory} onChange={(event) => handleCategoryChange(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-[#cbded8] bg-white px-3 pr-16 text-sm font-semibold text-[#315b56] outline-none transition focus:border-[#0d7774] focus:ring-2 focus:ring-[#0d7774]/15" aria-label="Kategoriya bo‘yicha filtr">{categories.map((category) => <option key={category} value={category}>{category === "Barcha uskunalar" ? "Barcha kategoriyalar" : category}</option>)}</select>{activeCategory !== "Barcha uskunalar" && <button type="button" onClick={() => handleCategoryChange("Barcha uskunalar")} className="absolute right-8 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#5d827c] transition hover:bg-[#e5f2ed] hover:text-[#0b7772]" aria-label="Kategoriya filtrini bekor qilish"><X size={15} /></button>}<ChevronRight size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#67908a]" /></label>
            </div>
            {activeFilterTags.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-2" aria-label={text.activeFilters}><span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#66847e]">{text.activeFilters}</span>{activeFilterTags.map((tag) => <button key={tag.key} type="button" onClick={tag.clear} className="inline-flex items-center gap-1.5 rounded-full border border-[#b7d9cd] bg-white px-2.5 py-1 text-[10px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#edf8f4]" aria-label={`${text.clearFilter}: ${tag.label}`}>{tag.label}<X size={12} /></button>)}</div>}
          </div>
          <div className="mt-4 scrollbar-thin flex gap-2 overflow-x-auto pb-2">{categoryCounts.map((category) => <button key={category.name} onClick={() => handleCategoryChange(category.name)} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold transition ${activeCategory === category.name ? "border-[#0d7774] bg-[#0d7774] text-white" : "border-[#d8e7e3] bg-[#ffffff] text-[#5b7773] hover:border-[#84b6a8]"}`}>{category.name} <span className="ml-1 opacity-65">{category.count}</span></button>)}</div>
          <div className="mt-5 grid overflow-hidden rounded-2xl border border-[#1c5960] bg-[#123f46] text-[#d8f3e9] shadow-[0_14px_30px_rgba(18,63,70,0.12)] sm:grid-cols-[1.35fr_repeat(3,1fr)]"><div className="border-b border-white/10 px-4 py-3.5 sm:border-b-0 sm:border-r"><div className="tech-label text-[#9ce9d6]">KATALOG PROTOKOLI</div><p className="mt-1 text-xs leading-5 text-[#c8e4da]">Model, ishlab chiqaruvchi, 16 bo‘limli SOP va o‘quv manbasi har bir kartada tizimlashtiriladi.</p></div><div className="border-b border-white/10 px-4 py-3.5 sm:border-b-0 sm:border-r"><div className="metric-number text-2xl font-bold text-white">01–100</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#9ce9d6]">Qurilma kodi</div></div><div className="border-b border-white/10 px-4 py-3.5 sm:border-b-0 sm:border-r"><div className="metric-number text-2xl font-bold text-white">10</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#9ce9d6]">Fan moduli</div></div><div className="px-4 py-3.5"><div className="metric-number text-2xl font-bold text-white">16</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#9ce9d6]">O‘quv qadami</div></div></div>
        </section>

        <section className="mt-8" aria-live="polite"><div className="mb-4 flex items-center justify-between gap-3"><div><div className="eyebrow mb-1">LAB-01 / REKORD OQIMI</div><h2 className="display text-2xl font-bold text-[#173d42]">{activeCategory}</h2><p className="mt-1 text-sm text-[#78908c]">{filtered.length} ta qurilma topildi{hasActiveFilters ? " — faol filtrlar qo‘llanilgan" : ""}</p></div>{hasActiveFilters && <button onClick={clearFilters} className="text-xs font-bold text-[#0d7774] hover:underline">Barcha filtrlarni tozalash</button>}</div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c6e1d7] bg-[#edf8f4] px-4 py-3 text-sm text-[#386761]"><div><span className="font-bold">{text.progress}</span><div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-white/80"><div className="h-full rounded-full bg-[#0d9488] transition-all" style={{ width: `${Math.min(100, Math.round((completedSectionCount / Math.max(1, equipment.length * 16)) * 100))}%` }} /></div></div><div className="flex items-center gap-2"><span className="rounded-full border border-[#afd8c9] bg-white px-3 py-1 text-xs font-extrabold text-[#087a73]">{learnedDeviceCount} qurilma · {completedSectionCount} bo‘lim</span><button type="button" onClick={() => setBookmarksOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#0d7774] bg-[#0d7774] px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#075e5c]"><Heart size={13} /> {text.myLab}</button></div></div>
          {filtered.length > 0 ? <div className="space-y-9">{visibleCategoryGroups.map((group, groupIndex) => { const Icon = categoryIcons[group.category] || Beaker; return <section key={group.category} className="relative"><div className="module-header mb-4 flex items-end justify-between gap-4 border-y border-[#c9ddd6] bg-[#f1f8f5] px-4 py-3"><div className="flex min-w-0 items-center gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#b8d8ce] bg-white text-[#0b7772]"><Icon size={18} /></div><div><div className="tech-label text-[#0b7772]">MODUL {String(groupIndex + 1).padStart(2, "0")} / SOP KATALOGI</div><h3 className="display truncate text-xl font-bold tracking-[-0.035em] text-[#173d42]">{group.category}</h3></div></div><div className="hidden rounded-full border border-[#b8d8ce] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#537972] sm:block">{group.devices.length} rekord</div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{group.devices.map((device) => <EquipmentCard key={device.id} device={device} index={filtered.indexOf(device)} onOpen={setSelectedDevice} onSharePdf={handleShareDevicePdf} onShowQr={setQrDevice} completedSectionCount={getCompletedSections(device.id).length} isBookmarked={isBookmarked(device.id)} onToggleBookmark={toggleBookmark} />)}</div></section>; })}</div> : <div className="rounded-[22px] border border-dashed border-[#b9d8cd] bg-[#ffffff] px-6 py-16 text-center"><Search size={28} className="mx-auto mb-4 text-[#70a298]" /><h3 className="display text-2xl font-bold">Qurilma topilmadi</h3><p className="mt-2 text-sm text-[#78908c]">Qidiruv so‘zini yoki kategoriyani o‘zgartirib ko‘ring.</p></div>}
        </section>
        <footer className="mt-12 border-t border-[#c9ded7] py-7 text-center" data-copyright-footer>
          <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#0d7774]">Muallif va loyiha egasi</p>
          <p className="mt-2 text-base font-bold text-[#173d42]">Mengliyev Bahrom Husanovich</p>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#66847e]">© 2026 Mengliyev Bahrom Husanovich. BioLab Interactive Guide kodi, original interfeysi va o‘quv tarkibidan foydalanish huquqi muallifda saqlanadi. Uchinchi tomon qurilma brendlari va modellariga oid huquqlar tegishli egalariga tegishlidir.</p>
          <button type="button" onClick={() => setSettingsOpen(true)} className="mt-3 text-xs font-bold text-[#0d7774] underline-offset-4 transition hover:underline">Mualliflik va litsenziya ma’lumotini ochish</button>
        </footer>
      </div>
    </main>
    <BookmarksSidebar open={bookmarksOpen} onOpenChange={setBookmarksOpen} devices={bookmarkedDevices} onSelectDevice={setSelectedDevice} onToggleBookmark={toggleBookmark} onClearBookmarks={clearBookmarks} onExportBookmarks={exportBookmarks} onExportBookmarksCsv={handleExportBookmarksCsv} onExportBookmarksPdf={handleExportBookmarksPdf} onShareBookmarksPdf={handleShareBookmarksPdf} onImportBookmarks={handleImportBookmarks} />
    {selectedDevice && typeof document !== "undefined" && createPortal(
      <div data-device-modal role="dialog" aria-modal="true" aria-label={`${selectedDevice.name} o‘quv dosyesi`} className="fixed inset-0 z-[100] flex h-[100vh] h-[100dvh] min-h-[100svh] items-stretch justify-center overflow-hidden bg-[#173d42]/60 p-0 backdrop-blur-md sm:items-center sm:p-6" onClick={() => setSelectedDevice(null)}>
        <div data-device-modal-panel className="relative flex h-full min-h-0 w-full flex-col overflow-hidden border-[#d8e7e3] bg-[#f7fbfa] shadow-[0_30px_90px_rgba(20,68,64,0.3)] sm:h-auto sm:max-h-[92dvh] sm:max-w-6xl sm:rounded-[30px] sm:border" onClick={(event) => event.stopPropagation()}>
          <div ref={deviceModalScrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <div ref={deviceViewerScrollRef} className="min-h-full w-full">
              <Suspense fallback={<div className="p-6 text-sm font-semibold text-[#537c76]" role="status">{selectedDevice.id} · O‘quv dosyesi tayyorlanmoqda…</div>}><DeviceViewer key={selectedDevice.id} device={selectedDevice} onBack={() => setSelectedDevice(null)} onReady={resetDeviceViewerScroll} onSharePdf={handleShareDevicePdf} onShowQr={setQrDevice} completedSections={getCompletedSections(selectedDevice.id)} onSectionRead={markSectionRead} /></Suspense>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )}
    {filtersOpen && <CatalogFilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} query={query} modelQuery={modelQuery} activeCategory={activeCategory} categories={categories} bookmarksOnly={bookmarksOnly} resultCount={filtered.length} bookmarkedCount={bookmarkedCount} hasActiveFilters={hasActiveFilters} onQueryChange={handleQueryChange} onModelQueryChange={handleModelQueryChange} onCategoryChange={handleCategoryChange} onBookmarksOnlyChange={handleBookmarksOnlyChange} onClearFilters={clearFilters} />}
    {settingsOpen && <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} bookmarkedCount={bookmarkedCount} onClearBookmarks={clearBookmarks} onExportBookmarks={exportBookmarks} onExportBookmarksCsv={handleExportBookmarksCsv} onExportBookmarksPdf={handleExportBookmarksPdf} onShareBookmarksPdf={handleShareBookmarksPdf} onImportBookmarks={handleImportBookmarks} />}
    <DeviceQrDialog device={qrDevice} open={Boolean(qrDevice)} onOpenChange={(open) => { if (!open) setQrDevice(null); }} />
  </div>;
}
