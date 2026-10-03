import { type ChangeEvent, useRef } from "react";
import { ArrowUpRight, BookOpen, Download, FileSpreadsheet, FileText, Heart, ImageOff, Share2, Trash2, Upload } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import type { Equipment } from "@/lib/equipmentData";
import { equipmentImages } from "@/lib/equipmentImages";
import { getImageBackgroundProfile, getImagePresentation } from "@/lib/equipmentImagePresentation";
import type { BookmarkImportResult } from "@/hooks/useBookmarks";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";

type BookmarksSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  devices: Equipment[];
  onSelectDevice: (device: Equipment) => void;
  onToggleBookmark: (deviceId: string) => void;
  onClearBookmarks: () => void;
  onExportBookmarks: () => void;
  onExportBookmarksCsv: () => void;
  onExportBookmarksPdf: () => Promise<void> | void;
  onShareBookmarksPdf: () => Promise<void> | void;
  onImportBookmarks: (file: File) => Promise<BookmarkImportResult>;
};

export default function BookmarksSidebar({
  open,
  onOpenChange,
  devices,
  onSelectDevice,
  onToggleBookmark,
  onClearBookmarks,
  onExportBookmarks,
  onExportBookmarksCsv,
  onExportBookmarksPdf,
  onShareBookmarksPdf,
  onImportBookmarks,
}: BookmarksSidebarProps) {
  const { locale } = useLanguage();
  const copy = getLocaleCopy(locale);
  const settings = copy.settings;
  const bookmarks = copy.bookmarks;
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      await onImportBookmarks(file);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : settings.importError;
      toast.error(message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        data-bookmarks-sidebar
        className="w-full max-w-md border-[#cfe1da] bg-[#f7fbfa] p-0 text-[#173d42] sm:max-w-lg"
      >
        <SheetHeader className="border-b border-[#d7e7e1] bg-white/90 px-5 py-5 pr-14 sm:px-6 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0d7774] text-white shadow-[0_8px_18px_rgba(13,119,116,0.2)]">
                <Heart size={20} fill="currentColor" />
              </span>
              <div>
                <div className="tech-label text-[#0d7774]">{bookmarks.kicker}</div>
                <SheetTitle className="display mt-1 text-xl font-bold tracking-[-0.035em] text-[#173d42]">
                  {bookmarks.title}
                </SheetTitle>
                <SheetDescription className="mt-1 text-xs leading-5 text-[#68857f]">
                  {bookmarks.description}
                </SheetDescription>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-[#d4e6df] bg-[#edf7f4] px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="metric-number text-2xl font-bold text-[#0b6663]">{devices.length}</div>
                <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#6f8c86]">{bookmarks.savedRecord}</div>
              </div>
              {devices.length > 0 && (
                <button
                  type="button"
                  onClick={onClearBookmarks}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#c5ddd3] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed]"
                >
                  <Trash2 size={13} /> {bookmarks.clearAll}
                </button>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onExportBookmarksCsv}
                disabled={devices.length === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <FileSpreadsheet size={13} /> {settings.csvExport}
              </button>
              <button
                type="button"
                onClick={() => { void onExportBookmarksPdf(); }}
                disabled={devices.length === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <FileText size={13} /> {settings.pdfExport}
              </button>
              <button
                type="button"
                onClick={() => { void onShareBookmarksPdf(); }}
                disabled={devices.length === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Share2 size={13} /> {settings.sharePdf}
              </button>
              <button
                type="button"
                onClick={onExportBookmarks}
                disabled={devices.length === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Download size={13} /> {settings.jsonExport}
              </button>
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed]"
              >
                <Upload size={13} /> {settings.jsonImport}
              </button>
              <input ref={importInputRef} type="file" accept="application/json,.json" aria-label={bookmarks.importInputLabel} className="sr-only" onChange={handleImportChange} />
            </div>
            <p className="mt-2 text-[10px] leading-4 text-[#6f8c86]">{bookmarks.note}</p>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {devices.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#bcd9ce] bg-white/70 px-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e5f2ed] text-[#0d7774]">
                <Heart size={25} />
              </span>
              <h3 className="display mt-5 text-xl font-bold text-[#173d42]">{bookmarks.emptyTitle}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#68857f]">
                {bookmarks.emptyDescription}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c9e0d6] bg-[#f1f9f5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0d7774]">
                <BookOpen size={13} /> {bookmarks.startCatalog}
              </div>
            </div>
          ) : (
            <div className="space-y-3" role="list" aria-label={bookmarks.listLabel}>
              {devices.map((device) => {
                const image = equipmentImages[device.id];
                const presentation = getImagePresentation(device.id);
                const imageBackgroundProfile = getImageBackgroundProfile(device.id);
                return (
                  <article
                    key={device.id}
                    role="listitem"
                    className="group rounded-2xl border border-[#d4e5df] bg-white p-3 shadow-[0_8px_20px_rgba(23,61,66,0.04)] transition hover:border-[#96c8b9] hover:shadow-[0_12px_26px_rgba(23,61,66,0.08)]"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenChange(false);
                          onSelectDevice(device);
                        }}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0d7774] focus-visible:ring-offset-2"
                        aria-label={`${device.name} ${bookmarks.openDetails}`}
                      >
                        <span data-image-profile={imageBackgroundProfile} className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#dbeae5] ${imageBackgroundProfile === "paper" ? "bg-[#f8fbfa] dark:bg-[#edf4ef]" : imageBackgroundProfile === "ink" ? "bg-[#0a2728] dark:bg-[#061b1c]" : "bg-[#eef7f3] dark:bg-[#102e2e]"}`}>
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.alt}
                              className={`h-full w-full ${presentation.fit === "cover" ? "object-cover" : imageBackgroundProfile === "paper" ? "object-contain p-0" : imageBackgroundProfile === "ink" ? "object-contain p-1 brightness-110 contrast-110" : "object-contain p-1.5 mix-blend-multiply"}`}
                              style={{ objectPosition: presentation.position }}
                              loading="lazy"
                            />
                          ) : (
                            <ImageOff size={20} className="text-[#6a9188]" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{device.id}</span>
                            <ArrowUpRight size={13} className="shrink-0 text-[#80a99e] transition group-hover:text-[#0d7774]" />
                          </span>
                          <span className="mt-1 block truncate text-sm font-bold text-[#173d42]">{device.name}</span>
                          <span className="mt-1 block truncate text-xs text-[#6c8982]">{device.model} · {device.category}</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(device.id)}
                        aria-label={`${device.name} ${bookmarks.remove}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#a9d2c3] bg-[#e8f5ef] text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#0d7774] hover:text-white"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
