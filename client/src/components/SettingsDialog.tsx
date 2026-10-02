import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Check, Contrast, Database, ExternalLink, FileText, MonitorSmartphone, Moon, Palette, ShieldCheck, Sun, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { localeOptions, useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookmarkedCount: number;
  onClearBookmarks: () => void;
  onExportBookmarks: () => void;
  onExportBookmarksCsv: () => void;
  onExportBookmarksPdf: () => Promise<void> | void;
  onShareBookmarksPdf: () => Promise<void> | void;
  onImportBookmarks: (file: File) => Promise<unknown>;
};

function ActionButton({ children, onClick, disabled = false, ariaLabel }: { children: ReactNode; onClick: () => void; disabled?: boolean; ariaLabel?: string }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-label={ariaLabel} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-3 py-2 text-xs font-bold text-[#0d7774] transition hover:bg-[#e5f3ed] disabled:cursor-not-allowed disabled:opacity-45">{children}</button>;
}

export default function SettingsDialog({ open, onOpenChange, bookmarkedCount, onClearBookmarks, onExportBookmarks, onExportBookmarksCsv, onExportBookmarksPdf, onShareBookmarksPdf, onImportBookmarks }: SettingsDialogProps) {
  const { theme, themePreference, toggleTheme, useSystemTheme, contrastMode, toggleContrastMode, displayMode, toggleOledMode } = useTheme();
  const { locale, setLocale, text } = useLanguage();
  const copy = getLocaleCopy(locale);
  const settings = copy.settings;
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && localStorage.getItem("biolab-reduced-motion") === "true");
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reducedMotion);
    localStorage.setItem("biolab-reduced-motion", String(reducedMotion));
  }, [reducedMotion]);

  if (!open) return null;

  const clearBookmarks = () => {
    if (bookmarkedCount === 0) return void toast.info(settings.bookmarkEmpty);
    if (!window.confirm(settings.bookmarkClearConfirm)) return;
    onClearBookmarks();
    toast.success(settings.bookmarkCleared);
  };

  const importBookmarks = async (file: File) => {
    try {
      const result = await onImportBookmarks(file) as { addedCount?: number; ignoredCount?: number };
      const added = result.addedCount ?? 0;
      const ignored = result.ignoredCount ?? 0;
      toast.success(`${added} ${settings.importSuccess}${ignored ? `, ${ignored} ${settings.unknownIgnored}` : ""}.`);
    } catch {
      toast.error(settings.importError);
    }
  };

  const preference = (label: string, icon: ReactNode, active: boolean, onClick: () => void, ariaLabel: string) => <button type="button" onClick={onClick} aria-label={ariaLabel} aria-pressed={active} className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition ${active ? "border-[#0d7774] bg-[#dff4ed] text-[#075f5c]" : "border-[#b8d8ce] bg-white text-[#0d7774] hover:bg-[#e5f3ed]"}`}>{icon}{label}</button>;

  return createPortal(
    <div data-settings-dialog className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-[#173d42]/70 px-3 py-[calc(env(safe-area-inset-top)+0.75rem)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur-[2px] sm:p-6" onClick={() => onOpenChange(false)}>
      <div className="my-auto flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem)] w-full max-w-3xl min-h-0 flex-col overflow-hidden rounded-[28px] border border-[#cfe4db] bg-[#f7fbfa] shadow-[0_30px_90px_rgba(20,68,64,0.28)]" role="dialog" aria-modal="true" aria-labelledby="biolab-settings-title" onClick={(event) => event.stopPropagation()}>
        <header className="shrink-0 border-b border-[#d7e7e1] bg-white/95 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span data-settings-brand className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#c7973b]/55 bg-black shadow-[0_8px_20px_rgba(137,92,18,0.26)]"><img src="/biolab-logo.webp" alt="BioLab" className="h-full w-full object-contain" /></span>
              <div className="min-w-0"><div className="tech-label text-[#0d7774]">BIO.LAB // CONTROL CENTER</div><h2 id="biolab-settings-title" className="display mt-1 text-xl font-bold tracking-[-0.035em] text-[#173d42] sm:text-2xl">{settings.title}</h2><p className="mt-1 text-xs leading-5 text-[#68857f]">{settings.description}</p></div>
            </div>
            <button type="button" onClick={() => onOpenChange(false)} aria-label={settings.close} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#edf7f4] text-[#0d7774] transition hover:bg-[#dceee7]"><X size={18} /></button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-7 sm:py-6">
          <section className="mb-4 rounded-2xl border border-[#cfe4db] bg-white p-5" aria-label={text.language}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{text.language}</div><div className="mt-1 text-xs text-[#68857f]">{text.languageDescription}</div></div><select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="w-full rounded-xl border border-[#b8d8ce] bg-[#f7fbfa] px-3 py-2 text-sm font-bold text-[#0d7774] outline-none focus:ring-2 focus:ring-[#0d7774]/30 sm:w-auto" aria-label={text.language}>{localeOptions.map((option) => <option key={option.value} value={option.value}>{option.nativeLabel}</option>)}</select></div>
          </section>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-2xl border border-[#cfe4db] bg-white p-5">
              <div className="flex items-center gap-2 text-[#0d7774]"><Palette size={17} /><h3 className="font-bold text-[#173d42]">{settings.appearance}</h3></div>
              <div className="mt-4 rounded-xl border border-[#dcebe5] bg-[#f7fbfa] p-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{settings.theme}</div><div className="mt-1 text-xs text-[#68857f]">{settings.themeDescription}</div></div><div className="flex flex-wrap gap-1.5">{preference(settings.system, <MonitorSmartphone size={15} />, themePreference === "system", () => useSystemTheme?.(), settings.themeSwitch)}{preference(theme === "dark" ? settings.dark : settings.light, theme === "dark" ? <Moon size={15} /> : <Sun size={15} />, themePreference !== "system", () => toggleTheme?.(), settings.themeSwitch)}</div></div></div>
              <div data-settings-contrast className="mt-3 flex flex-col gap-3 rounded-xl border border-[#dcebe5] bg-[#f7fbfa] p-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{settings.contrast}</div><div className="mt-1 text-xs text-[#68857f]">{settings.contrastDescription}</div></div><ActionButton onClick={() => toggleContrastMode?.()} ariaLabel={settings.contrastSwitch}><Contrast size={15} /> {contrastMode === "high" ? settings.active : settings.standard}</ActionButton></div>
              <div data-settings-oled className="mt-3 flex flex-col gap-3 rounded-xl border border-[#dcebe5] bg-[#f7fbfa] p-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{settings.oled}</div><div className="mt-1 text-xs text-[#68857f]">{settings.oledDescription}</div></div><ActionButton onClick={() => toggleOledMode?.()} disabled={theme !== "dark"} ariaLabel={settings.oledSwitch}><Moon size={15} /> {displayMode === "oled" ? settings.active : settings.off}</ActionButton></div>
              <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#dcebe5] bg-[#f7fbfa] p-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{settings.reducedMotion}</div><div className="mt-1 text-xs text-[#68857f]">{settings.reducedMotionDescription}</div></div><button type="button" role="switch" aria-checked={reducedMotion} onClick={() => setReducedMotion((value) => !value)} aria-label={settings.reducedMotionSwitch} className={`relative h-7 w-12 shrink-0 self-end rounded-full transition sm:self-auto ${reducedMotion ? "bg-[#0d7774]" : "bg-[#b9d3ca]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${reducedMotion ? "translate-x-6" : "translate-x-1"}`} />{reducedMotion && <Check size={12} className="absolute left-2 top-2 text-white" />}</button></div>
            </section>

            <section className="rounded-2xl border border-[#cfe4db] bg-white p-5">
              <div className="flex items-center gap-2 text-[#0d7774]"><Database size={17} /><h3 className="font-bold text-[#173d42]">{settings.localData}</h3></div><p className="mt-3 text-xs leading-5 text-[#68857f]">{settings.localDataDescription}</p>
              <div className="mt-4 rounded-xl border border-[#dcebe5] bg-[#f7fbfa] p-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold text-[#173d42]">{settings.savedDevices}</div><div className="mt-1 text-xs text-[#68857f]">{bookmarkedCount} {settings.savedCount}</div></div><ActionButton onClick={clearBookmarks} ariaLabel={settings.clearBookmarksAria}><Trash2 size={14} /> {settings.clear}</ActionButton></div><div className="mt-3 flex flex-wrap gap-2"><ActionButton onClick={onExportBookmarksCsv} disabled={bookmarkedCount === 0}>{settings.csvExport}</ActionButton><ActionButton onClick={() => { void onExportBookmarksPdf(); }} disabled={bookmarkedCount === 0}>{settings.pdfExport}</ActionButton><ActionButton onClick={() => { void onShareBookmarksPdf(); }} disabled={bookmarkedCount === 0}>{settings.sharePdf}</ActionButton><ActionButton onClick={onExportBookmarks}>{settings.jsonExport}</ActionButton><ActionButton onClick={() => importInputRef.current?.click()}>{settings.jsonImport}</ActionButton><input ref={importInputRef} type="file" accept="application/json,.json" className="hidden" aria-label={settings.jsonImportInputLabel} onChange={(event) => { const file = event.target.files?.[0]; if (file) void importBookmarks(file); event.target.value = ""; }} /></div></div>
            </section>
          </div>

          <section className="mt-4 rounded-2xl border border-[#b6dcd1] bg-[#eef7f4] p-5" aria-label={settings.copyrightAria}><div className="flex items-start gap-3"><ShieldCheck size={22} className="mt-0.5 shrink-0 text-[#0e6f67]" /><div><h3 className="text-base font-bold text-[#0e7774]">{settings.copyrightTitle}</h3><p className="mt-2 text-sm leading-6 text-[#245b53]">{settings.copyrightBody}</p><div className="mt-3 rounded-xl border border-[#a2d3c2] bg-white/80 p-3.5 text-xs leading-5 text-[#1b4b45]"><strong>{settings.legalNoticeLabel}</strong> {settings.legalNoticeBody}</div></div></div><div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="rounded-xl border border-[#b9d9cf] bg-white/80 p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.authorOwner}</div><div className="mt-1 text-sm font-bold text-[#173d42]">Mengliyev Bahrom Husanovich</div></div><div className="rounded-xl border border-[#b9d9cf] bg-white/80 p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.legalProtection}</div><div className="mt-1 text-sm font-bold text-[#173d42]">{settings.strictEnforcement}</div></div><div className="rounded-xl border border-[#b9d9cf] bg-white/80 p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.repository}</div><div className="mt-1 break-all text-sm font-bold text-[#173d42]">uzme/biolab-interactive-guide</div></div></div></section>

          <section className="mt-4 rounded-2xl border border-[#cfe4db] bg-white p-5"><div className="flex items-start gap-3"><FileText size={19} className="mt-0.5 shrink-0 text-[#0d7774]" /><div><h3 className="font-bold text-[#173d42]">{settings.licenseTitle}</h3><p className="mt-2 text-sm leading-6 text-[#68857f]">{settings.licenseBody}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-[#d8e7e3] bg-[#f7fbfa] p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.codeInterface}</div><div className="mt-1 text-sm font-bold text-[#173d42]">{settings.projectLicense}</div></div><div className="rounded-xl border border-[#d8e7e3] bg-[#f7fbfa] p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.imageSource}</div><div className="mt-1 text-sm font-bold text-[#173d42]">{settings.shownInDossier}</div></div><div className="rounded-xl border border-[#d8e7e3] bg-[#f7fbfa] p-3"><div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{settings.copyright}</div><div className="mt-1 text-sm font-bold text-[#173d42]">{settings.copyrightOwner}</div></div></div></section>

          <section className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[#d8e7e3] bg-white p-5"><div className="flex items-center gap-2 text-[#0d7774]"><BookOpen size={17} /><h3 className="font-bold text-[#173d42]">{settings.learningLimit}</h3></div><p className="mt-2 text-xs leading-5 text-[#68857f]">{settings.learningLimitBody}</p><a href="https://github.com/uzme/biolab-interactive-guide" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0d7774] hover:underline">{settings.projectSource} <ExternalLink size={13} /></a></div><div className="rounded-2xl border border-[#d8e7e3] bg-white p-5"><div className="flex items-center gap-2 text-[#0d7774]"><FileText size={17} /><h3 className="font-bold text-[#173d42]">{settings.version}</h3></div><p className="mt-2 text-xs leading-5 text-[#68857f]">{settings.versionBody}</p><div className="mt-3 inline-flex rounded-full border border-[#cfe4db] bg-[#edf7f4] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d7774]">{copy.common.productionReady}</div></div></section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
