import { useEffect, useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";
import type { Equipment } from "@/lib/equipmentData";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocaleCopy } from "@/contexts/localeCopy";
import { getDeviceDetailUrl, getDeviceQrDataUrl } from "@/lib/deviceQr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DeviceQrDialog({ device, open, onOpenChange }: { device: Equipment | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { locale } = useLanguage();
  const copy = getLocaleCopy(locale);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || !device) return;
    let active = true;
    setQrDataUrl("");
    void getDeviceQrDataUrl(device.id).then((value) => {
      if (active) setQrDataUrl(value);
    }).catch(() => {
      if (active) setQrDataUrl("");
    });
    return () => { active = false; };
  }, [device?.id, open]);

  const copyLink = async () => {
    if (!device || !navigator.clipboard) return;
    await navigator.clipboard.writeText(getDeviceDetailUrl(device.id));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent data-device-qr-dialog className="max-w-md border-[#b9ddd2] bg-[#f8fcfa] p-6 text-[#173d42] sm:p-7">
      <DialogHeader>
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d7774] text-white"><QrCode size={22} /></div>
        <DialogTitle className="display pr-7 text-2xl font-bold">{device?.id} {copy.qr.titleSuffix}</DialogTitle>
        <DialogDescription className="pr-5 leading-6 text-[#5e7d77]">{copy.qr.description}</DialogDescription>
      </DialogHeader>
      <div className="mx-auto mt-1 grid w-full max-w-[260px] place-items-center rounded-[28px] border border-[#c6e3d8] bg-white p-4 shadow-[0_16px_36px_rgba(11,91,85,0.10)]">
        {qrDataUrl ? <img src={qrDataUrl} alt={`${device?.name || copy.device.qrLabel} ${copy.qr.altSuffix}`} className="aspect-square w-full rounded-xl" /> : <div className="grid aspect-square w-full place-items-center rounded-xl bg-[#eef8f4] text-xs font-bold uppercase tracking-[0.13em] text-[#5f8980]">{copy.qr.loading}</div>}
      </div>
      <p className="rounded-xl border border-[#d3e8e0] bg-white px-3 py-2 text-center text-xs font-semibold leading-5 text-[#53726c]">{device?.name}</p>
      <Button type="button" variant="outline" className="w-full border-[#9fcfc1] text-[#087a73] hover:bg-[#e8f6f0]" onClick={() => void copyLink()} disabled={!device || !navigator.clipboard}>
        {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? copy.qr.copied : copy.qr.copy}
      </Button>
    </DialogContent>
  </Dialog>;
}
