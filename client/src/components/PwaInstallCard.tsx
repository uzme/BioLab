import { useEffect, useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DISMISS_KEY = "biolab-pwa-install-card-dismissed-v1";

export default function PwaInstallCard() {
  const { text } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia?.("(display-mode: standalone)").matches || ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIos(ios);
    setVisible(!standalone && !dismissed);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  };

  return (
    <aside className="mb-6 overflow-hidden rounded-2xl border border-[#c9dfd6] bg-[#eaf7f2] shadow-[0_10px_26px_rgba(23,61,66,0.06)]" aria-label={text.installApp}>
      <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0d7774] text-white"><Download size={18} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-[#173d42]">{text.installApp}</h2>
              <p className="mt-1 text-xs leading-5 text-[#55766f]">{text.installAppDescription}</p>
            </div>
            <button type="button" onClick={dismiss} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#4d7770] transition hover:bg-white/70" aria-label={text.dismiss}><X size={16} /></button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {isIos ? <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#abd2c3] bg-white px-3 py-2 text-[11px] font-bold text-[#0d7774]"><ExternalLink size={13} /> {text.safariInstallHint}</span> : <a href="https://biolab-interactive-guide.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[#0d7774] bg-[#0d7774] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#075e5c]"><ExternalLink size={13} /> {text.installAppAction}</a>}
            <button type="button" onClick={dismiss} className="rounded-lg px-3 py-2 text-[11px] font-bold text-[#4d7770] hover:bg-white/60">{text.dismiss}</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
