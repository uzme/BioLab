/* BioLab style: Swiss-scientific catalogue card, focused on a 16-section Uzbek learning curriculum. */
/*
  BioLab design reminder: Modern Precision Biotech — compact laboratory data bands,
  category-specific scientific glyphs, deep teal structure, and mint only for active learning signals.
*/
import { useState } from "react";
import { ArrowUpRight, Beaker, BookOpenCheck, CheckCircle2, CircleDollarSign, Cpu, FileDown, FlaskConical, Gauge, Grid2X2, Heart, ImageOff, LoaderCircle, Microscope, QrCode, Settings2, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Equipment } from "@/lib/equipmentData";
import { equipmentImages } from "@/lib/equipmentImages";
import { getImageBackgroundProfile, getImagePresentation } from "@/lib/equipmentImagePresentation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";

const cardIcons: Record<string, typeof FlaskConical> = {
  "Molekulyar biologiya": Cpu,
  "Mikroskopiya": Microscope,
  "Hujayra kulturalari": Beaker,
  "Mikrobiologiya": FlaskConical,
  "Analitika": Gauge,
  "Sentrifugatsiya": Settings2,
  "Bioreaktorlar": Beaker,
  "Sovutish va saqlash": Snowflake,
  "Namuna tayyorlash": Grid2X2,
  "Avtomatlashtirish": Cpu,
};

const categoryTone: Record<string, { icon: string; signal: string }> = {
  "Molekulyar biologiya": { icon: "border-[#bcdfe0] bg-[#e7f5f5] text-[#087a73]", signal: "bg-[#0c7773]" },
  "Mikroskopiya": { icon: "border-[#cbd8e9] bg-[#eef3f9] text-[#4b6893]", signal: "bg-[#4b6893]" },
  "Hujayra kulturalari": { icon: "border-[#c8dfc7] bg-[#edf7ed] text-[#3d7b52]", signal: "bg-[#3d7b52]" },
  "Mikrobiologiya": { icon: "border-[#d9d5bb] bg-[#f8f6e8] text-[#847b31]", signal: "bg-[#847b31]" },
  "Analitika": { icon: "border-[#d1cee8] bg-[#f1f0fa] text-[#665a9b]", signal: "bg-[#665a9b]" },
  "Sentrifugatsiya": { icon: "border-[#c7d7e3] bg-[#eef5f8] text-[#46758a]", signal: "bg-[#46758a]" },
  "Bioreaktorlar": { icon: "border-[#c7e2dc] bg-[#eaf7f3] text-[#347b69]", signal: "bg-[#347b69]" },
  "Sovutish va saqlash": { icon: "border-[#c9d9ec] bg-[#edf4fb] text-[#4d78a8]", signal: "bg-[#4d78a8]" },
  "Namuna tayyorlash": { icon: "border-[#e1d0b8] bg-[#fbf4e9] text-[#9b6834]", signal: "bg-[#9b6834]" },
  "Avtomatlashtirish": { icon: "border-[#cbd3da] bg-[#f0f3f5] text-[#536b78]", signal: "bg-[#536b78]" },
};

export default function EquipmentCard({ device, index, onOpen, onSharePdf, onShowQr, completedSectionCount, isBookmarked, onToggleBookmark }: { device: Equipment; index: number; onOpen: (device: Equipment) => void; onSharePdf: (device: Equipment) => void; onShowQr: (device: Equipment) => void; completedSectionCount: number; isBookmarked: boolean; onToggleBookmark: (deviceId: string) => void }) {
  const { locale } = useLanguage();
  const copy = getLocaleCopy(locale);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = cardIcons[device.category] || FlaskConical;
  const price = device.newPrice;
  const tone = categoryTone[device.category] || categoryTone["Molekulyar biologiya"];
  const imageKey = `BIO-${String(device.number).padStart(3, "0")}`;
  const image = equipmentImages[imageKey];
  const imagePresentation = getImagePresentation(imageKey);
  const imageBackgroundProfile = getImageBackgroundProfile(imageKey);
  const imageLabel = image?.sourceType === "official" ? copy.device.officialCaption : copy.device.aiCaption;
  const recordCode = `SOP-${String(device.number).padStart(3, "0")}`;
  const isInitialViewportImage = index < 3;
  // Faqat boshlang‘ich viewportdagi uchta karta ustuvor yuklanadi. Qolgan 97 ta
  // qurilma rasmi brauzer viewportiga yaqinlashgandagina tarmoqdan olinadi.
  const shouldEagerLoad = isInitialViewportImage;

  const imageSurface = imageBackgroundProfile === "paper"
    ? "bg-[#f8fbfa] dark:bg-[#eaf2ee]"
    : imageBackgroundProfile === "ink"
      ? "bg-[#0a2728] dark:bg-[#061b1c]"
      : "bg-[#d6e7e2] dark:bg-[#102e2e]";
  const imageClass = imagePresentation.fit === "cover"
    ? "object-cover"
    : imageBackgroundProfile === "paper"
      ? "object-contain p-0 brightness-[1.02] contrast-[1.02]"
      : imageBackgroundProfile === "ink"
        ? "object-contain p-2 brightness-110 contrast-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] sm:p-2"
        : "object-contain p-4 contrast-110 mix-blend-multiply drop-shadow-[0_10px_15px_rgba(21,66,68,0.22)] [-webkit-mask-image:radial-gradient(ellipse_92%_105%_at_center,black_52%,transparent_100%)] [mask-image:radial-gradient(ellipse_92%_105%_at_center,black_52%,transparent_100%)] sm:p-3";

  return <article className="equipment-card group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#ccdcd8] bg-[#ffffff] shadow-[0_7px_18px_rgba(23,61,66,0.025)]" style={{ animationDelay: `${Math.min(index, 7) * 35}ms` }}>
    <div className={`absolute inset-x-0 top-0 h-1 ${tone.signal}`} />
    <figure data-image-profile={imageBackgroundProfile} aria-busy={Boolean(image && !imageLoaded && !imageFailed)} className={`relative grid h-52 place-items-center overflow-hidden border-b border-[#d9e9e5] ${imageSurface} sm:h-48`}>
      {image ? <>
        {imagePresentation.fit === "contain" && imageBackgroundProfile === "laboratory" && <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,249,247,0.82),rgba(204,225,219,0.72)_65%,rgba(180,209,201,0.72))]" />}
        {!imageLoaded && !imageFailed && <div aria-hidden="true" className={`absolute inset-0 z-20 grid place-items-center ${imageSurface}`}>
          <div className="flex flex-col items-center gap-2 text-[#42716a]"><LoaderCircle size={22} className="animate-spin text-[#0d9488]" /><span className="text-[10px] font-bold uppercase tracking-[0.14em]">{copy.home.imageLoading}</span></div>
        </div>}
        {imageFailed ? <div className="absolute inset-0 z-20 grid place-items-center bg-[#e5f1ee] p-5 text-center text-[#52726d]"><div><ImageOff className="mx-auto mb-2 text-[#0d9488]" size={24} /><p className="text-[10px] font-bold uppercase tracking-[0.12em]">{copy.home.imageUnavailable}</p><p className="mt-1 text-[10px]">{copy.home.retryImage}</p></div></div> : <img src={image.url} alt={image.alt} loading={shouldEagerLoad ? "eager" : "lazy"} fetchPriority={isInitialViewportImage ? "high" : "auto"} decoding="async" onLoad={() => setImageLoaded(true)} onError={() => setImageFailed(true)} className={`absolute inset-0 z-10 h-full w-full transition-[opacity,transform] duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"} group-hover:scale-[1.02] ${imageClass}`} style={{ objectPosition: imagePresentation.position }} />}
      </> : <div className={`grid h-20 w-20 place-items-center rounded-2xl border soft-grid ${tone.icon}`}><Icon size={30} /></div>}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t ${imageBackgroundProfile === "paper" ? "from-[#f8fbfa]/75" : imageBackgroundProfile === "ink" ? "from-[#0a2728]/75" : "from-white/75"} to-transparent`} />
      <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] shadow-sm backdrop-blur ${tone.icon.split(" ").filter((className) => className.startsWith("text-")).join(" ")}`}><Icon size={12} />{imageLabel}</span>
      <span data-equipment-code className="absolute right-3 top-3 rounded-full border border-[#b7d4cc] bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#355b57] shadow-sm backdrop-blur">{imageKey}</span>
      <button type="button" onClick={() => onToggleBookmark(device.id)} aria-pressed={isBookmarked} aria-label={isBookmarked ? `${device.name} saralanganlardan olib tashlash` : `${device.name} saralanganlarga saqlash`} className={`absolute right-3 bottom-3 z-30 grid h-9 w-9 place-items-center rounded-full border shadow-sm backdrop-blur transition ${isBookmarked ? "border-[#0d7774] bg-[#0d7774] text-white" : "border-white/80 bg-white/90 text-[#0d7774] hover:border-[#0d7774] hover:bg-[#e3f2e9]"}`}>
        <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
      </button>
    </figure>
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-[#b9d5cd] bg-[#f0f8f5] px-2.5 py-2">
        <span className="tech-label text-[#0b6663]">{copy.home.protocolRecord}</span>
        <span className="rounded border border-[#b3d9cc] bg-white px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0b6663]">{recordCode}</span>
      </div>
      <div className="relative eyebrow mb-1.5 text-[#0d9488] font-bold">{device.category}</div>
      <h3 className="relative display min-h-[52px] text-[1.25rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#173d42]">{device.name}</h3>
      <div className="mt-1 flex items-center gap-2 rounded-md bg-[#edf7f4] px-2 py-1 text-[11px] font-bold text-[#0c7773]">
        <span className="text-[#5b7c77]">{copy.home.modelLabel}:</span>
        <span className="truncate">{device.model} ({device.brands || copy.home.officialBrand})</span>
      </div>
      <div className="relative mt-3 overflow-hidden rounded-xl border border-[#b9d5cd] bg-[#f5faf8] text-[10px] font-bold uppercase tracking-[0.09em]">
        <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-[#d6e6e0] px-3 py-2.5"><span className="flex min-w-0 items-center gap-1.5 truncate text-[#355e58]"><span className="shrink-0 rounded bg-[#dcefe8] px-1 py-0.5 text-[8px] text-[#39746a]">MODEL</span><span className="truncate">{device.model}</span></span><span className="rounded-sm bg-[#0b5358] px-1.5 py-0.5 text-white">{copy.home.sixteenSteps}</span></div>
        <div className="flex items-center justify-between gap-2 px-3 py-2"><span className="flex min-w-0 items-center gap-1.5 truncate text-[#5f817c]"><BookOpenCheck size={12} className="shrink-0 text-[#0d9488]" /><span className="truncate">{device.brands || copy.home.manual}</span></span><span className="shrink-0 rounded border border-[#bce4d8] bg-[#e7f5ef] px-1.5 py-0.5 text-[#087a73]">{recordCode}</span></div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-bold text-[#547871]" aria-label={`${device.name} ${copy.home.learningProgress}: ${completedSectionCount} / 16`}>
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className={completedSectionCount ? "text-[#0d9488]" : "text-[#9ab7b0]"} />{copy.home.learningProgress}</span>
        <span className="rounded-full border border-[#c3dfd5] bg-white px-2 py-0.5 text-[#087a73]">{completedSectionCount} / 16</span>
      </div>
      <p className="relative mt-3 min-h-[54px] text-sm leading-6 text-[#6f8984]">{device.description}</p>
      <div className="relative mt-auto flex items-center justify-between gap-2 border-t border-[#d7e5df] pt-4"><span className="min-w-0 truncate text-xs font-semibold text-[#466c67]"><CircleDollarSign size={13} className="mr-1 inline text-[#0d9488]" />{price}</span><div className="flex shrink-0 items-center gap-1.5"><Button size="sm" variant="outline" className="h-8 border-[#94bcb1] bg-transparent px-2 text-[#0d7774] hover:bg-[#e3f2e9]" onClick={(event) => { event.stopPropagation(); onShowQr(device); }} title={`${device.name} ${copy.device.openQr}`} aria-label={`${device.name} ${copy.device.openQr}`}><QrCode size={15} /><span className="sr-only">{copy.device.qrLabel}</span></Button><Button size="sm" variant="outline" className="h-8 border-[#94bcb1] bg-transparent px-2 text-[#0d7774] hover:bg-[#e3f2e9]" onClick={(event) => { event.stopPropagation(); onSharePdf(device); }} title={`${device.name} ${copy.device.sharePdf}`} aria-label={`${device.name} ${copy.device.sharePdf}`}><FileDown size={15} /><span className="sr-only sm:not-sr-only sm:ml-1">{copy.device.sharePdf}</span></Button><Button size="sm" variant="outline" className="h-8 border-[#94bcb1] bg-transparent text-[#0d7774] hover:bg-[#e3f2e9]" onClick={(event) => { event.stopPropagation(); onOpen(device); }}>{copy.home.learn} <ArrowUpRight size={15} /></Button></div></div>
    </div>
  </article>;
}
