"use client";

import {
  BellSimple,
  CaretRight,
  Fire,
  GearSix,
  Heart,
  House,
  MoonStars,
  PaperPlaneTilt,
  Sparkle,
  Star,
  Sun,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState, type CSSProperties } from "react";

type QuickMessage = { label: string; detail: string; icon: "sun" | "moon" | "heart" | "spark" };
type SkyStar = { id: string; left: number; top: number; color: "pink" | "blue" };

const QUICK_MESSAGES: QuickMessage[] = [
  { label: "Bom dia", detail: "Um começo iluminado", icon: "sun" },
  { label: "Tô com você", detail: "Presença, mesmo de longe", icon: "heart" },
  { label: "Cheguei", detail: "Tudo bem por aqui", icon: "spark" },
  { label: "Boa noite", detail: "Um carinho antes de dormir", icon: "moon" },
  { label: "Um abraço", detail: "Aconchego em forma de luz", icon: "heart" },
  { label: "Saudades", detail: "Uma luz dizendo seu nome", icon: "spark" },
];

function MessageIcon({ kind }: { kind: QuickMessage["icon"] }) {
  const props = { size: 22, weight: "fill" as const };
  if (kind === "sun") return <Sun {...props} />;
  if (kind === "moon") return <MoonStars {...props} />;
  if (kind === "heart") return <Heart {...props} />;
  return <Sparkle {...props} />;
}

function randomStar(): SkyStar {
  return { id: crypto.randomUUID(), left: 10 + Math.random() * 80, top: 27 + Math.random() * 42, color: Math.random() > 0.5 ? "pink" : "blue" };
}

export default function HomePage() {
  const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [stars, setStars] = useState<SkyStar[]>([]);
  const [newStarId, setNewStarId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function sendMessage(message: QuickMessage) {
    if (pending) {
      setSheetOpen(false);
      setToast("Sua faísca continua guardada. Quando Leo responder, ela vira uma estrela.");
      return;
    }
    setPending(message.label);
    setSheetOpen(false);
    setToast(`${message.label} saiu como uma faísca para Leo`);
  }

  function simulateReply() {
    const star = randomStar();
    setPending(null);
    setStars((current) => [...current, star]);
    setNewStarId(star.id);
    setToast("A faísca encontrou resposta. Uma estrela nasceu no céu de vocês.");
    window.setTimeout(() => setNewStarId(null), 2600);
  }

  return (
    <main
      className={isNight ? "world-screen night" : "world-screen day"}
      style={{ "--sky-night": `url("${assetPath}/sky-night.png")`, "--sky-day": `url("${assetPath}/sky-day-clear.png")` } as CSSProperties}
    >
      <div className="sky-background" aria-hidden="true" />
      <div className="sky-scrim" aria-hidden="true" />

      <header className="topbar">
        <button className="chrome-button" aria-label="Abrir perfil" onClick={() => setToast("O perfil completo chega na próxima etapa do protótipo")}><UserCircle size={24} weight="duotone" /></button>
        <div className="brand"><Heart size={17} weight="fill" /><span>CallWa</span></div>
        <button className="chrome-button" aria-label="Notificações" onClick={() => setToast("Nenhuma novidade agora. O céu de vocês está tranquilo.")}><BellSimple size={22} /></button>
      </header>

      <section className="pair-status" aria-label="Status da conexão">
        <div className="pair-faces" aria-hidden="true"><span className="face ana">A</span><span className="face leo">L</span></div>
        <div><strong>Ana & Leo</strong><span><i /> 2 luminárias conectadas</span></div>
        <button className="time-toggle" onClick={() => setIsNight((value) => !value)} aria-label={`Mudar para céu de ${isNight ? "dia" : "noite"}`} aria-pressed={isNight}>
          {isNight ? <Sun size={20} weight="fill" /> : <MoonStars size={20} weight="fill" />}<span>{isNight ? "Dia" : "Noite"}</span>
        </button>
      </section>

      <section className="world-story" aria-label="Mundo compartilhado">
        <span className="eyebrow">ATO 1 · O CÉU</span>
        <h1>{stars.length === 0 ? "Um céu esperando vocês" : "O céu de vocês está acordando"}</h1>
        <p>{stars.length === 0 ? "A primeira troca completa vai deixar uma estrela aqui para sempre." : `${stars.length} ${stars.length === 1 ? "estrela guarda" : "estrelas guardam"} um pedaço da história de vocês.`}</p>
      </section>

      <div className="star-field" aria-label={`${stars.length} estrelas no céu`}>
        {stars.map((star) => <Star key={star.id} className={`sky-star ${star.color} ${newStarId === star.id ? "newborn" : ""}`} style={{ left: `${star.left}%`, top: `${star.top}%` }} size={newStarId === star.id ? 36 : 18} weight="fill" />)}
      </div>

      <p className="sky-hint">{isNight ? stars.length === 0 ? "Quando uma estrela nascer, ela ficará neste céu." : "As estrelas só aparecem quando a noite chega." : "Toque em Noite para enxergar as estrelas que vocês criaram."}</p>
      <button className="ritual-chip" onClick={() => setSheetOpen(true)}><Fire size={16} weight="fill" /><span>Um ritual suave para hoje</span><CaretRight size={16} /></button>

      {pending && <button className="pending-spark" onClick={simulateReply}><Sparkle size={24} weight="fill" /><span><strong>Uma faísca está viajando</strong><small>Leo recebeu “{pending}”</small><em>DEMONSTRAÇÃO · simular resposta</em></span><CaretRight size={18} /></button>}

      <button className="send-primary" onClick={() => pending ? setToast("A faísca está aguardando Leo com calma") : setSheetOpen(true)}><PaperPlaneTilt size={22} weight="fill" /> {pending ? "Faísca enviada · aguardando Leo" : "Enviar uma luz para Leo"}</button>

      <nav className="bottom-nav" aria-label="Navegação principal">
        <button className="active" aria-current="page"><House size={22} weight="fill" /><span>Mundo</span></button>
        <button onClick={() => setToast("A história completa chega com as próximas trocas.")}><UsersThree size={22} /><span>História</span></button>
        <button onClick={() => setToast("Configurações das luminárias chegam na próxima etapa.")}><GearSix size={22} /><span>Ajustes</span></button>
      </nav>

      {sheetOpen && <div className="sheet-backdrop" onMouseDown={() => setSheetOpen(false)}><section className="message-sheet" onMouseDown={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Escape") setSheetOpen(false); }} aria-modal="true" role="dialog" aria-label="Enviar uma luz"><div className="sheet-handle" /><div className="sheet-title"><div><span className="eyebrow">PARA LEO</span><h2>Que luz você quer enviar?</h2></div><button className="chrome-button" onClick={() => setSheetOpen(false)} aria-label="Fechar"><X size={22} /></button></div><div className="message-grid">{QUICK_MESSAGES.map((message) => <button key={message.label} onClick={() => sendMessage(message)} autoFocus={message.label === "Bom dia"}><span className="message-icon"><MessageIcon kind={message.icon} /></span><strong>{message.label}</strong><small>{message.detail}</small></button>)}</div></section></div>}

      <div className="live-region" role="status" aria-live="polite" aria-atomic="true">{toast}</div>
      {toast && <div className="toast" aria-hidden="true"><Sparkle size={19} weight="fill" /><span>{toast}</span></div>}
    </main>
  );
}
