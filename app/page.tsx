"use client";

import {
  BellSimple,
  CaretRight,
  CheckCircle,
  Fire,
  GearSix,
  Heart,
  House,
  LampPendant,
  MoonStars,
  PaperPlaneTilt,
  Sparkle,
  Star,
  Sun,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type QuickMessage = { label: string; detail: string; icon: "sun" | "moon" | "heart" | "spark" };

const QUICK_MESSAGES: QuickMessage[] = [
  { label: "Bom dia", detail: "Um começo iluminado", icon: "sun" },
  { label: "Tô com você", detail: "Presença, mesmo de longe", icon: "heart" },
  { label: "Cheguei", detail: "Tudo bem por aqui", icon: "spark" },
  { label: "Boa noite", detail: "Um carinho antes de dormir", icon: "moon" },
  { label: "Um abraço", detail: "Aconchego em forma de luz", icon: "heart" },
  { label: "Saudades", detail: "Uma luz dizendo seu nome", icon: "spark" },
];

const STAR_POSITIONS = [
  [11, 21], [20, 55], [31, 16], [43, 38], [58, 18], [68, 48], [78, 22], [88, 57], [15, 75], [52, 70], [73, 77], [92, 35],
];

function MessageIcon({ kind }: { kind: QuickMessage["icon"] }) {
  const props = { size: 22, weight: "fill" as const };
  if (kind === "sun") return <Sun {...props} />;
  if (kind === "moon") return <MoonStars {...props} />;
  if (kind === "heart") return <Heart {...props} />;
  return <Sparkle {...props} />;
}

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [exchanges, setExchanges] = useState(12);
  const [newStar, setNewStar] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [tab, setTab] = useState<"mundo" | "historia" | "ajustes">("mundo");
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour < 6 || hour >= 18);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const progress = Math.min(100, Math.round((exchanges / 15) * 100));
  const skyLabel = exchanges >= 15 ? "Céu estrelado" : "Céu despertando";
  const nextCount = Math.max(0, 15 - exchanges);
  const stars = useMemo(() => STAR_POSITIONS.slice(0, Math.min(STAR_POSITIONS.length, 7 + Math.floor(exchanges / 3))), [exchanges]);

  function sendMessage(message: QuickMessage) {
    if (pending) {
      setSheetOpen(false);
      setToast("Sua faísca continua guardada. Quando Leo responder, ela vira uma estrela.");
      return;
    }
    setPending(message.label);
    setSheetOpen(false);
    setToast(`${message.label} virou uma faísca no céu de vocês`);
  }

  function simulateReply() {
    setPending(null);
    setExchanges((value) => value + 1);
    setNewStar(true);
    setToast("A faísca encontrou resposta. Uma nova estrela nasceu!");
    window.setTimeout(() => setNewStar(false), 2600);
  }

  return (
    <main className={isNight ? "app-shell night" : "app-shell day"}>
      <header className="topbar">
        <button className="avatar" aria-label="Abrir perfil" onClick={() => setToast("O perfil completo chega na próxima etapa do protótipo")}><UserCircle size={26} weight="duotone" /></button>
        <div className="brand"><Heart size={18} weight="fill" /><span>CallWa</span></div>
        <button className="icon-button" aria-label="Notificações" onClick={() => setToast("Nenhuma novidade agora. O céu de vocês está tranquilo.")}><BellSimple size={23} /></button>
      </header>

      <section className="connection-row" aria-label="Status da conexão">
        <div className="pair-faces">
          <span className="face ana">A</span>
          <span className="face leo">L</span>
        </div>
        <div>
          <strong>Ana & Leo</strong>
          <span><i /> 2 luminárias conectadas</span>
        </div>
        <button className="time-toggle" onClick={() => setIsNight((value) => !value)} aria-label={`Mostrar céu de ${isNight ? "dia" : "noite"}`} aria-pressed={isNight}>
          {isNight ? <MoonStars size={20} weight="fill" /> : <Sun size={20} weight="fill" />}
        </button>
      </section>

      {tab === "mundo" && (
        <>
          <section className="world-card" aria-label="Céu compartilhado">
            <div className="sky-art" aria-hidden="true" />
            <div className="world-copy">
              <span className="eyebrow">ATO 1 · O CÉU</span>
              <h1>{skyLabel}</h1>
              <p>{isNight ? "As luzes que vocês trocam ficam aqui." : "Algumas estrelas já brilham até durante o dia."}</p>
            </div>

            <div className="celestial" aria-hidden="true">
              {isNight ? <MoonStars className="moon" size={94} weight="duotone" /> : <Sun className="sun" size={94} weight="duotone" />}
            </div>

            <div className="star-field" aria-label={`${stars.length} estrelas no céu`}>
              {stars.map(([left, top], index) => (
                <Star
                  key={`${left}-${top}`}
                  className={`sky-star ${index % 3 === 0 ? "blue" : "pink"}`}
                  style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 170}ms` }}
                  size={index % 4 === 0 ? 20 : 13}
                  weight="fill"
                />
              ))}
              {newStar && <Star className="sky-star newborn" style={{ left: "51%", top: "45%" }} size={38} weight="fill" />}
            </div>

            <div className="anchor anchor-ana"><Star size={15} weight="fill" /><span>Ana</span></div>
            <div className="anchor anchor-leo"><Star size={15} weight="fill" /><span>Leo</span></div>

            <div className={`lamp-preview ${newStar ? "celebrating" : ""}`}>
              <Image src="/callwa-pair.png" width={1774} height={887} alt="As luminárias de Ana e Leo acesas em rosa e azul" priority />
              <span><LampPendant size={13} weight="fill" /> mundo e luminárias em sintonia</span>
            </div>

            {pending && (
              <button className="pending-spark" onClick={simulateReply}>
                <Sparkle size={25} weight="fill" />
                <span><strong>Uma faísca está esperando</strong><small>Leo recebeu “{pending}”</small><em>CONTROLE DA DEMO · simular resposta</em></span>
                <CaretRight size={18} />
              </button>
            )}

            <div className="world-status">
              <div className="progress-meta"><span>{exchanges} trocas de luz</span><span>{progress}%</span></div>
              <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
              <p>{nextCount > 0 ? `${nextCount} trocas para o céu ganhar um novo brilho` : "Um novo pedaço do mundo está quase chegando"}</p>
            </div>
          </section>

          <section className="today-card">
            <div className="section-heading">
              <div><span className="eyebrow">HOJE</span><h2>Um pequeno ritual</h2></div>
              <span className="soft-chip"><Fire size={15} weight="fill" /> sem sequência obrigatória</span>
            </div>
            <button className="ritual-row" onClick={() => { setSheetOpen(true); setToast("Escolha uma mensagem para completar o ritual de hoje"); }}>
              <span className="ritual-icon"><MoonStars size={24} weight="fill" /></span>
              <span><strong>Desejar boa noite</strong><small>Quando fizer sentido para vocês</small></span>
              <CaretRight size={20} />
            </button>
          </section>

          <button className="send-primary" onClick={() => pending ? setToast("Sua faísca está aguardando Leo com calma") : setSheetOpen(true)}>
            <PaperPlaneTilt size={22} weight="fill" /> {pending ? "Faísca enviada · aguardando Leo" : "Enviar uma luz para Leo"}
          </button>
        </>
      )}

      {tab === "historia" && (
        <section className="empty-panel">
          <Star size={44} weight="duotone" />
          <span className="eyebrow">A HISTÓRIA DE VOCÊS</span>
          <h1>{exchanges} momentos já viraram luz</h1>
          <p>As trocas mais recentes aparecerão aqui como uma linha do tempo tranquila, sem placar.</p>
          <div className="history-item"><CheckCircle size={22} weight="fill" /><span><strong>Primeira estrela</strong><small>Nasceu há 8 dias</small></span></div>
          <div className="history-item"><Sparkle size={22} weight="fill" /><span><strong>O céu despertou</strong><small>Depois da terceira troca</small></span></div>
        </section>
      )}

      {tab === "ajustes" && (
        <section className="empty-panel">
          <LampPendant size={46} weight="duotone" />
          <span className="eyebrow">LUMINÁRIAS</span>
          <h1>As duas estão por perto</h1>
          <p>Eventos do mundo podem iluminar as luminárias sem som durante o horário tranquilo.</p>
          <button className="setting-row" onClick={() => setToast("Horário tranquilo: 22:30 até 07:00")}><span><strong>Horário tranquilo</strong><small>22:30 até 07:00</small></span><CaretRight size={20} /></button>
          <button className="setting-row" onClick={() => setToast("Cor da Ana: Rosa aurora")}><span><strong>Cor da Ana</strong><small>Rosa aurora</small></span><span className="color-dot pink-dot" /></button>
          <button className="setting-row" onClick={() => setToast("Cor do Leo: Azul céu")}><span><strong>Cor do Leo</strong><small>Azul céu</small></span><span className="color-dot blue-dot" /></button>
          <button className="setting-row" onClick={() => setToast("Reencontro simulado: as duas luminárias acenderam juntas")}><span><strong>Simular reencontro</strong><small>Prévia da volta após uma pausa</small></span><Sparkle size={20} /></button>
        </section>
      )}

      <nav className="bottom-nav" aria-label="Navegação principal">
        <button aria-current={tab === "mundo" ? "page" : undefined} className={tab === "mundo" ? "active" : ""} onClick={() => setTab("mundo")}><House size={22} weight={tab === "mundo" ? "fill" : "regular"} /><span>Mundo</span></button>
        <button aria-current={tab === "historia" ? "page" : undefined} className={tab === "historia" ? "active" : ""} onClick={() => setTab("historia")}><UsersThree size={22} weight={tab === "historia" ? "fill" : "regular"} /><span>História</span></button>
        <button aria-current={tab === "ajustes" ? "page" : undefined} className={tab === "ajustes" ? "active" : ""} onClick={() => setTab("ajustes")}><GearSix size={22} weight={tab === "ajustes" ? "fill" : "regular"} /><span>Ajustes</span></button>
      </nav>

      {sheetOpen && (
        <div className="sheet-backdrop" onMouseDown={() => setSheetOpen(false)}>
          <section className="message-sheet" onMouseDown={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Escape") setSheetOpen(false); }} aria-modal="true" role="dialog" aria-label="Enviar uma luz">
            <div className="sheet-handle" />
            <div className="sheet-title"><div><span className="eyebrow">PARA LEO</span><h2>Que luz você quer enviar?</h2></div><button className="icon-button" onClick={() => setSheetOpen(false)} aria-label="Fechar"><X size={22} /></button></div>
            <div className="message-grid">
              {QUICK_MESSAGES.map((message) => (
                <button key={message.label} onClick={() => sendMessage(message)} autoFocus={message.label === "Bom dia"}>
                  <span className="message-icon"><MessageIcon kind={message.icon} /></span>
                  <strong>{message.label}</strong>
                  <small>{message.detail}</small>
                </button>
              ))}
            </div>
            <button className="custom-message" onClick={() => setToast("A mensagem personalizada será ligada ao backend na próxima fase")}>Escrever uma mensagem personalizada <CaretRight size={18} /></button>
          </section>
        </div>
      )}

      <div className="live-region" role="status" aria-live="polite" aria-atomic="true">{toast}</div>
      {toast && <div className="toast" aria-hidden="true"><Sparkle size={19} weight="fill" /><span>{toast}</span></div>}
    </main>
  );
}
