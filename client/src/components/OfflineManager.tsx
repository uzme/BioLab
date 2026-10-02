import { Download, RefreshCw, Trash2, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { equipmentImages } from "@/lib/equipmentImages";
import { useOfflinePack } from "@/hooks/useOfflinePack";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";

const OFFLINE_ASSETS = [
  "/biolab-logo.webp",
  "/biolab-main-hero.webp",
  "/biolab-live-lab-agent-scene.webp",
  ...Object.values(equipmentImages).map((image) => image.url),
];

export default function OfflineManager({ compact = false }: { compact?: boolean }) {
  const { locale } = useLanguage();
  const copy = getLocaleCopy(locale).offline;
  const { isOnline, isSupported, status, progress, downloadPack, clearPack } = useOfflinePack();
  const isReady = status === "tayyor";
  const isDownloading = status === "yuklanmoqda";
  const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  const handleDownload = async () => {
    if (!isOnline) {
      toast.error(copy.needsConnection);
      return;
    }
    const sent = await downloadPack(OFFLINE_ASSETS);
    if (!sent) toast.error(copy.startFailed);
  };

  const handleClear = async () => {
    await clearPack();
    toast.success(copy.cleared);
  };

  const handleReturnOnline = () => {
    if (!isOnline) {
      toast.error(`${copy.returnOnline}: ${copy.offlineAvailable}`);
      return;
    }

    void navigator.serviceWorker?.getRegistration()
      .then((registration) => registration?.update())
      .catch(() => undefined);
    window.location.replace("/?direct=1&online=1");
  };

  if (!isSupported) {
    return (
      <span className="hidden items-center gap-2 rounded-full border border-[#ead8b7] bg-[#fffaf0] px-3 py-1.5 text-xs font-semibold text-[#8b6b3f] sm:inline-flex" title={copy.needsHttps}>
        <WifiOff size={14} /> {copy.offlineHttps}
      </span>
    );
  }

  return (
    <div className={compact ? "contents" : "flex items-center gap-1.5"}>
      <span
        data-offline-status={isOnline ? "online" : "offline"}
        className={compact
          ? `header-connection ${isOnline ? "is-online" : "is-offline"}`
          : `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold ${isOnline ? "border-[#cbded4] bg-white text-[#597b75]" : "border-[#f1c9c2] bg-[#fff6f4] text-[#a24f42]"}`}
        title={isOnline ? copy.onlineAvailable : copy.offlineAvailable}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-[#16a085]" : "bg-[#d86657]"}`} />
        <span className={compact ? "sr-only" : "hidden sm:inline"}>{isOnline ? copy.online : copy.offline}</span>
      </span>
      <Button
        variant="ghost"
        size="sm"
        data-header-action={compact ? "offline" : undefined}
        className={compact
          ? `header-action header-offline-action ${isReady ? "is-ready" : ""}`
          : `rounded-full border px-3 text-xs font-semibold ${isReady ? "border-[#b8dfd1] bg-[#f1fbf7] text-[#0d7773]" : "border-[#cbded4] bg-white text-[#597b75]"}`}
        onClick={isReady ? handleReturnOnline : handleDownload}
        loading={isDownloading}
        loadingLabel={`${copy.loading}: ${percent}%`}
        title={isReady ? copy.returnOnline : copy.download}
        aria-label={isDownloading ? `${copy.loading}: ${percent}%` : isReady ? copy.returnOnline : copy.download}
      >
        {!isDownloading && (isReady ? <RefreshCw size={14} /> : <Download size={14} />)}
        <span className={compact ? "sr-only" : "hidden sm:inline"}>{isReady ? copy.returnLabel : copy.downloadLabel}</span>
      </Button>
      {isReady && (
        <Button variant="ghost" size="icon" className={compact ? "header-action header-clear-action" : "h-8 w-8 text-[#78938d]"} onClick={handleClear} title={copy.clear} aria-label={copy.clear}>
          <Trash2 size={14} />
        </Button>
      )}
      {progress.failed > 0 && <span className="sr-only">{progress.failed} ta fayl yuklanmadi</span>}
    </div>
  );
}
