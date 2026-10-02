import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Bot, CheckCircle2, ChevronLeft, Database, LoaderCircle, Send, Sparkles, UserRound } from "lucide-react";
import { equipment } from "@/lib/equipmentData";
import { buildAgentReply, getQuickPrompts, type PixelAgentSource } from "@/lib/pixelAgent";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizeEquipment } from "@/lib/catalogLocalization";
import { getLocaleCopy } from "@/contexts/localeCopy";

export const CATALOG_WINDOW_URL = "/?direct=1#catalog";

type ChatMessage = {
  id: number;
  role: "agent" | "user";
  text: string;
  sources?: PixelAgentSource[];
};

export default function PixelAgent() {
  const { locale, text } = useLanguage();
  const copy = getLocaleCopy(locale);
  const agent = copy.agent;
  const localizedEquipment = useMemo(() => equipment.map((device) => localizeEquipment(device, locale)), [locale]);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, role: "agent", text: agent.welcome }]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);
  const quickPrompts = useMemo(() => getQuickPrompts(locale), [locale]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  const submitQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;
    setMessages((current) => [...current, { id: nextId.current++, role: "user", text: trimmed }]);
    setDraft("");
    setIsThinking(true);
    window.setTimeout(() => {
      const reply = buildAgentReply(trimmed, localizedEquipment, locale);
      setMessages((current) => [...current, { id: nextId.current++, role: "agent", text: reply.text, sources: reply.sources }]);
      setIsThinking(false);
    }, 180);
  };

  return (
    <div className="min-h-screen bg-[#031417] text-[#eaf8f0] selection:bg-[#67e2bf]/30">
      <div className="mx-auto min-h-screen max-w-[1180px] px-3 py-3 sm:px-6 sm:py-6 lg:px-10">
        <header className="flex items-center justify-between rounded-[22px] border border-[#2d716c]/50 bg-[#082b30]/90 px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-6">
          <a href={CATALOG_WINDOW_URL} className="flex items-center gap-3 text-[#d9f7e9] transition hover:text-[#7de0c2]" aria-label={agent.back}>
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#70dec1]/50 bg-[#0e6564] text-sm font-black shadow-[0_0_24px_rgba(82,220,185,0.2)]">BL</span>
            <span><span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-[#a5e8d6]">BIO.LAB / LAB-01</span><span className="block text-xs text-[#739c97]">{agent.assistant}</span></span>
          </a>
          <div className="flex items-center gap-2 rounded-full border border-[#4dbf9d]/35 bg-[#0a4244] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#9bead4]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#67e2bf] shadow-[0_0_12px_#67e2bf]" /> {agent.local} {agent.catalog}</div>
        </header>

        <main className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="relative overflow-hidden rounded-[30px] border border-[#2d7770]/60 bg-[#083337] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(125,224,194,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(125,224,194,.18) 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "linear-gradient(180deg, black 0%, transparent 62%)" }} />
            <div className="relative p-5 sm:p-8 lg:p-10">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7be1c3]"><Sparkles size={15} /> {agent.assistant}</div>
              <h1 className="max-w-2xl text-[2.8rem] font-bold leading-[0.94] tracking-[-0.065em] text-white sm:text-6xl">{agent.headline} <span className="text-[#6fe5c1]">{agent.headlineAccent}</span></h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#b7d9cf] sm:text-base">{agent.description}</p>
              <div className="mt-8 rounded-[24px] border border-[#4d9e90]/45 bg-[#041c20]/90 p-3 shadow-[0_16px_38px_rgba(0,0,0,0.2)] sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3 px-1"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8fe8d0]"><Bot size={15} /> {agent.chat}</div><span className="text-[10px] text-[#739c97]">{agent.offlineMode}</span></div>
                <div className="max-h-[430px] space-y-3 overflow-y-auto pr-1 sm:max-h-[480px]">
                  {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
                  {isThinking && <div className="flex items-center gap-2 text-xs text-[#8dd8c5]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#0f6561]"><Bot size={15} /></span><span className="rounded-2xl rounded-bl-sm border border-[#2d7770] bg-[#0a3338] px-3 py-2"><LoaderCircle size={14} className="mr-2 inline animate-spin" />{agent.analyzing}</span></div>}
                  <div ref={endRef} />
                </div>
                <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); submitQuestion(draft); }}>
                  <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={agent.ask} aria-label={agent.askAria} className="min-w-0 flex-1 rounded-2xl border border-[#397e77] bg-[#082a2f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#70958e] focus:border-[#73e5c5] focus:ring-2 focus:ring-[#73e5c5]/20" />
                  <button type="submit" disabled={!draft.trim() || isThinking} aria-label={copy.common.questionSend} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#70dfc1] text-[#06393b] transition hover:bg-[#a0f1db] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"><Send size={18} /></button>
                </form>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-[26px] border border-[#2d716c]/60 bg-[#082b30] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8fe8d0]"><Database size={15} /> {agent.quick}</div>
              <div className="space-y-2">{quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => submitQuestion(prompt)} className="group flex w-full items-center justify-between rounded-2xl border border-[#2f6865] bg-[#0a373b] px-3 py-3 text-left text-xs leading-5 text-[#c8eee2] transition hover:border-[#71ddc0] hover:bg-[#0d4547]"><span>{prompt}</span><ArrowUpRight size={15} className="shrink-0 text-[#6bd8bb] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>)}</div>
            </section>
            <section className="rounded-[26px] border border-[#2d716c]/60 bg-[#082b30] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-6"><div className="mb-4 flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8fe8d0]">{agent.status}</div><CheckCircle2 size={17} className="text-[#6fe5c1]" /></div><div className="space-y-3 text-xs text-[#a8cbc1]"><div className="flex justify-between border-b border-white/10 pb-2"><span>{agent.catalog}</span><span className="font-bold text-[#d9f7e9]">100 {copy.common.records}</span></div><div className="flex justify-between border-b border-white/10 pb-2"><span>{agent.flow}</span><span className="font-bold text-[#d9f7e9]">16 {copy.common.sections}</span></div><div className="flex justify-between"><span>{agent.source}</span><span className="font-bold text-[#6fe5c1]">{agent.local}</span></div></div></section>
            <a href={CATALOG_WINDOW_URL} className="flex items-center justify-center gap-2 rounded-2xl border border-[#4a8d82] bg-[#d7f5e7] px-4 py-3 text-sm font-bold text-[#07555a] transition hover:bg-white"><ChevronLeft size={17} /> {agent.back}</a>
          </aside>
        </main>
        <footer className="px-2 py-5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#5f8983]">BioLab Pixel Agent <span className="mx-2 text-[#70dfc1]">•</span> 100 × 16 {copy.common.records}</footer>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isAgent = message.role === "agent";
  return <div className={`flex gap-2 ${isAgent ? "items-start" : "items-end justify-end"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isAgent ? "bg-[#0f6561] text-[#a4efdb]" : "bg-[#6fe1bf] text-[#06383b]"}`}>{isAgent ? <Bot size={15} /> : <UserRound size={15} />}</span><div className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-6 ${isAgent ? "rounded-bl-sm border border-[#2d7770] bg-[#0a3338] text-[#c9eee2]" : "rounded-br-sm bg-[#6fe1bf] text-[#073b3e]"}`}><p>{message.text}</p>{message.sources && message.sources.length > 0 && <div className="mt-3 space-y-2 border-t border-white/10 pt-3">{message.sources.map((source) => <div key={source.id} className="rounded-xl border border-[#397e77] bg-[#062a2e] p-2.5 text-xs text-[#bfe6da]"><div className="flex items-center justify-between gap-2"><span className="font-bold text-[#77e2c3]">{source.id}</span><span className="text-[10px] text-[#789f98]">{source.category}</span></div><div className="mt-1 font-semibold text-white">{source.name}</div><div className="mt-1 text-[11px] text-[#a4c9bf]">{source.model}</div></div>)}</div>}</div></div>;
}
