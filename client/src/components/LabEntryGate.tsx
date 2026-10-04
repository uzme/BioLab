import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type LabEntryGateProps = {
  onEnter: () => void;
};

export default function LabEntryGate({ onEnter }: LabEntryGateProps) {
  const [isEntering, setIsEntering] = useState(false);
  const { text } = useLanguage();
  const particles = Array.from({ length: 26 }, (_, index) => index);

  const enterLaboratory = () => {
    if (isEntering) return;
    setIsEntering(true);
    window.setTimeout(onEnter, 600);
  };

  return <main className={`lab-entry lab-entry-splash ${isEntering ? "is-entering" : ""}`} data-lab-entry aria-labelledby="lab-entry-title">
    <section className="lab-entry-frame lab-entry-splash-frame" data-lab-entry-frame>
      <div className="lab-entry-splash-halo" aria-hidden="true" />
      <div className="lab-entry-splash-particles" aria-hidden="true">
        {particles.map((particle) => <span key={particle} style={{ "--particle-index": particle, "--particle-x": `${4 + ((particle * 37) % 92)}%`, "--particle-y": `${7 + ((particle * 31) % 86)}%`, "--particle-size": `${2 + ((particle * 3) % 4)}px` } as CSSProperties} />)}
      </div>
      <h1 id="lab-entry-title" className="sr-only">BioLab laboratoriya ochilish sahifasi</h1>
      <div className="lab-entry-splash-brand" data-lab-entry-logo aria-label="BioLab. Muallif: Mengliyev Bahrom">
        <div className="lab-entry-splash-logo-wrap">
          <img className="lab-entry-splash-logo" src="/biolab-logo.webp" alt="BioLab laboratoriya logotipi" />
          <svg className="lab-entry-splash-dna" viewBox="0 0 120 180" aria-hidden="true">
            <path d="M32 8c58 22 58 52 0 82s-58 60 0 82M88 8c-58 22-58 52 0 82s58 60 0 82M37 24h46M27 48h66M27 72h66M37 96h46M27 120h66M27 144h66M37 168h46" />
          </svg>
          <span className="lab-entry-splash-bubbles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
        </div>
        <span className="lab-entry-splash-brand-name">BioLab</span>
        <span className="lab-entry-splash-brand-author">{text.author}</span>
      </div>
      <div className="lab-entry-splash-footer">
        <p>{text.systemTagline}</p>
        <button type="button" className="lab-entry-action lab-entry-splash-action" data-lab-entry-action onClick={enterLaboratory} disabled={isEntering}>
          <span>{isEntering ? text.loading : text.enterLab}</span><ArrowUpRight size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="lab-entry-splash-portal" aria-hidden="true" />
    </section>
  </main>;
}
