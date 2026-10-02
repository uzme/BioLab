import { Heart, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategoryLabel, useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type CatalogFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  modelQuery: string;
  activeCategory: string;
  categories: readonly string[];
  bookmarksOnly: boolean;
  resultCount: number;
  bookmarkedCount: number;
  hasActiveFilters: boolean;
  onQueryChange: (value: string) => void;
  onModelQueryChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onBookmarksOnlyChange: (value: boolean) => void;
  onClearFilters: () => void;
};

export default function CatalogFilterSheet({
  open,
  onOpenChange,
  query,
  modelQuery,
  activeCategory,
  categories,
  bookmarksOnly,
  resultCount,
  bookmarkedCount,
  hasActiveFilters,
  onQueryChange,
  onModelQueryChange,
  onCategoryChange,
  onBookmarksOnlyChange,
  onClearFilters,
}: CatalogFilterSheetProps) {
  const { locale } = useLanguage();
  const copy = getLocaleCopy(locale);
  const common = copy.common;
  const filters = copy.filters;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md border-[#cfe1da] bg-[#f7fbfa] p-0 text-[#173d42]">
        <SheetHeader className="border-b border-[#d7e7e1] bg-white/95 px-5 py-5 pr-14 sm:px-6 sm:py-6">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0d7774] text-white shadow-[0_8px_18px_rgba(13,119,116,0.2)]">
              <SlidersHorizontal size={20} />
            </span>
            <div>
              <div className="tech-label text-[#0d7774]">{filters.kicker}</div>
              <SheetTitle className="display mt-1 text-xl font-bold tracking-[-0.035em] text-[#173d42]">{filters.title}</SheetTitle>
              <SheetDescription className="mt-1 text-xs leading-5 text-[#68857f]">{filters.description}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-[#cfe4db] bg-[#edf7f4] p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="metric-number text-3xl font-bold text-[#0b6663]">{resultCount}</div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#66847e]">{filters.matchCount}</div>
              </div>
              {hasActiveFilters && (
                <button type="button" onClick={onClearFilters} className="inline-flex items-center gap-1.5 rounded-lg border border-[#b8d8ce] bg-white px-3 py-2 text-[11px] font-bold text-[#0d7774] transition hover:border-[#0d7774] hover:bg-[#e5f3ed]">
                  <RotateCcw size={13} /> {common.clear}
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52716d]">{filters.deviceLabel}</span>
              <span className="relative block">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#67908a]" />
                <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={common.searchDevicePlaceholder} className="h-11 rounded-xl border-[#cbded8] bg-white pl-9 pr-9 text-sm text-[#173d42] placeholder:text-[#94aaa5]" />
                {query && <button type="button" onClick={() => onQueryChange("")} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#5d827c] transition hover:bg-[#e5f2ed]" aria-label={common.clearSearch}><X size={15} /></button>}
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52716d]">{filters.modelLabel}</span>
              <span className="relative block">
                <SlidersHorizontal size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#67908a]" />
                <Input value={modelQuery} onChange={(event) => onModelQueryChange(event.target.value)} placeholder={common.searchModelPlaceholder} className="h-11 rounded-xl border-[#cbded8] bg-white pl-9 pr-9 text-sm text-[#173d42] placeholder:text-[#94aaa5]" />
                {modelQuery && <button type="button" onClick={() => onModelQueryChange("")} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#5d827c] transition hover:bg-[#e5f2ed]" aria-label={common.clearModelSearch}><X size={15} /></button>}
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52716d]">{filters.categoryLabel}</span>
              <select value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)} className="h-11 w-full rounded-xl border border-[#cbded8] bg-white px-3 text-sm font-semibold text-[#315b56] outline-none transition focus:border-[#0d7774] focus:ring-2 focus:ring-[#0d7774]/15">
                {categories.map((category) => <option key={category} value={category}>{category === "Barcha uskunalar" ? common.allCategories : getCategoryLabel(category, locale)}</option>)}
              </select>
            </label>

            <button type="button" onClick={() => onBookmarksOnlyChange(!bookmarksOnly)} aria-pressed={bookmarksOnly} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${bookmarksOnly ? "border-[#0d7774] bg-[#0d7774] text-white" : "border-[#cbded8] bg-white text-[#315b56] hover:border-[#0d7774] hover:bg-[#edf7f4]"}`}>
              <span className="flex items-center gap-2 text-sm font-bold"><Heart size={16} fill={bookmarksOnly ? "currentColor" : "none"} /> {common.onlyBookmarks}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${bookmarksOnly ? "bg-white/20 text-white" : "bg-[#edf7f4] text-[#0d7774]"}`}>{bookmarkedCount}</span>
            </button>
          </div>

          <div className="mt-auto pt-8">
            <button type="button" onClick={() => onOpenChange(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d7774] px-4 py-3 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(13,119,116,0.18)] transition hover:bg-[#075e5c]">
              {filters.apply} <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
