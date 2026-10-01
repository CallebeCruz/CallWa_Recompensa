"use client";

import Image from "next/image";
import {
  BellSimple,
  CaretRight,
  GearSix,
  Heart,
  House,
  MoonStars,
  PaperPlaneTilt,
  Sparkle,
  Sun,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState, type CSSProperties } from "react";

type QuickMessage = { label: string; detail: string; icon: "sun" | "moon" | "heart" | "spark" };
type SkyStar = { id: string; left: number; top: number };

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
  return { id: crypto.randomUUID(), left: 12 + Math.random() * 76, top: 22 + Math.random() * 40 };
}

export default function HomePage() {
  const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [stars, setStars] = useState<SkyStar[]>([]);
  const [newStarId, setNewStarId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isNight, setIsNight] = useState(false);
  const [moonBrightness, setMoonBrightness] = useState(78);
  const [sunBrightness, setSunBrightness] = useState(78);

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

  function brightenMoon() {
    setMoonBrightness((current) => current >= 100 ? 55 : current + 15);
  }

  function brightenSun() {
    setSunBrightness((current) => current >= 100 ? 55 : current + 15);
  }

  return (
    <main
      className={isNight ? "world-screen night" : "world-screen day"}
      style={{ "--sky-night": `url("${assetPath}/sky-night-clear.png")`, "--sky-day": `url("${assetPath}/sky-day-clear-v2.png")`, "--cloud-drift": `url("${assetPath}/cloud-drift.png")` } as CSSProperties}
    >
      <div className="sky-background" aria-hidden="true" />
      <div className="sky-scrim" aria-hidden="true" />
      <div className="cloud-drift" aria-hidden="true"><i /><i /></div>
      {!isNight && (
        <button
          className="sun-element"
          onClick={brightenSun}
          aria-label={`Ajustar brilho do Sol, ${sunBrightness}%`}
          title="Toque para alterar o brilho"
          style={{ "--sun-brightness": sunBrightness / 100 } as CSSProperties}
        >
          <Image src={`${assetPath}/sun-disc.png`} alt="" width={220} height={220} priority />
        </button>
      )}
      {isNight && (
        <button
          className="moon-element"
          onClick={brightenMoon}
          aria-label={`Ajustar brilho da Lua, ${moonBrightness}%`}
          title="Toque para alterar o brilho"
          style={{ "--moon-brightness": moonBrightness / 100 } as CSSProperties}
        >
          <Image src={`${assetPath}/moon-crescent.png`} alt="" width={240} height={240} priority />
        </button>
      )}

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

      <div className="star-field" aria-label={`${stars.length} estrelas no céu`}>
        {stars.map((star) => (
          <span key={star.id} className={`natural-star ${newStarId === star.id ? "newborn" : ""}`} style={{ left: `${star.left}%`, top: `${star.top}%` }}>
            <Image src={`${assetPath}/star-light.png`} alt="" width={64} height={64} priority={newStarId === star.id} />
          </span>
        ))}
      </div>

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
