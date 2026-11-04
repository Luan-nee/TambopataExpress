import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowLeft,
  Asterisk,
  Banknote,
  Bike,
  Check,
  CheckCheck,
  Lock,
  Phone,
  Star,
  User,
  type LucideIcon,
  Radar
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */
export type DriverTab = "trips" | "radar" | "earnings" | "sos";

export type MessageStatus = "sent" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  /** "me" = mensaje propio (derecha), "them" = de la otra persona (izquierda). */
  sender: "me" | "them";
  /** Nombre y rol sobre la burbuja de la otra persona: "Carlos R. • Pasajero". */
  senderLabel?: string;
  kind: "offer" | "accepted";
  amount: number;
  /** Etiqueta de la oferta. Por defecto "Oferta inicial". */
  label?: string;
  /** Hora ya formateada: "10:43 AM". */
  time: string;
  status?: MessageStatus;
}

export interface Counterpart {
  name: string;
  rating: number;
  online: boolean;
}

interface NegotiationScreenProps {
  counterpart?: Counterpart;
  route?: { from: string; to: string };
  messages?: ChatMessage[];
  activeTab?: DriverTab;
  onTabChange?: (tab: DriverTab) => void;
  onSendOffer?: (amount: number) => void;
  onBack?: () => void;
  onCall?: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Datos de ejemplo (los del diseño)                                         */
/* -------------------------------------------------------------------------- */

const DEMO_COUNTERPART: Counterpart = { name: "Lucía M.", rating: 4.9, online: true };

const DEMO_ROUTE = { from: "Plaza de Armas", to: "Mercado Modelo" };

const NAV_ITEMS: {
  id: DriverTab;
  label: string;
  icon: LucideIcon;
  activeColor: string;
  idleColor: string;
}[] = [
  { id: "trips", label: "Viajes", icon: Bike, activeColor: "text-[#10B981]", idleColor: "text-[#C7CEDB]" },
  { id: "radar", label: "Radar", icon: Radar, activeColor: "text-[#10B981]", idleColor: "text-[#C7CEDB]" },
  { id: "earnings", label: "Ganancias", icon: Banknote, activeColor: "text-[#10B981]", idleColor: "text-[#C7CEDB]" },
  { id: "sos", label: "S.O.S", icon: Asterisk, activeColor: "text-[#FCA5A5]", idleColor: "text-[#FCA5A5]" },
];

const DEMO_MESSAGES: ChatMessage[] = [
  { id: "m1", sender: "me", kind: "offer", amount: 7, time: "10:43 AM", status: "delivered" },
  {
    id: "m2",
    sender: "them",
    senderLabel: "Carlos R. • Pasajero",
    kind: "offer",
    amount: 6,
    time: "10:42 AM",
  },
  { id: "m3", sender: "me", kind: "offer", amount: 6.5, time: "10:43 AM", status: "delivered" },
  {
    id: "m4",
    sender: "them",
    senderLabel: "Carlos R. • Pasajero",
    kind: "accepted",
    amount: 6.5,
    time: "10:44 AM",
    status: "delivered",
  },
];

/* -------------------------------------------------------------------------- */
/*  Utilidades                                                                */
/* -------------------------------------------------------------------------- */

function formatSoles(amount: number) {
  return `S/ ${amount.toFixed(2)}`;
}

/** Deja solo dígitos y un punto decimal, con máximo 2 decimales. */
function sanitizeAmount(raw: string) {
  const cleaned = raw.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const [int, ...rest] = cleaned.split(".");
  if (rest.length === 0) return int;
  return `${int}.${rest.join("").slice(0, 2)}`;
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes                                                            */
/* -------------------------------------------------------------------------- */
function BottomNav({
  active,
  onChange,
}: {
  active: DriverTab;
  onChange?: (tab: DriverTab) => void;
}) {
  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 border-t border-[#1A2233] bg-[#0B1120]"
    >
      <ul className="grid grid-cols-4">
        {NAV_ITEMS.map(({ id, label, icon: Icon, activeColor, idleColor }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange?.(id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex w-full flex-col items-center gap-1 py-3 text-[10px] font-bold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#10B981]",
                  isActive ? activeColor : idleColor,
                ].join(" ")}
              >
                <Icon className="h-5 w-5" strokeWidth={id === "sos" ? 3 : 2} aria-hidden="true" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Receipt({ status }: { status?: MessageStatus }) {
  if (!status) return null;
  if (status === "sent") {
    return <Check className="h-3.5 w-3.5 text-[#9CA3AF]" aria-label="Enviado" />;
  }
  return (
    <CheckCheck
      className={`h-3.5 w-3.5 ${status === "read" ? "text-[#06B6D4]" : "text-[#9CA3AF]"}`}
      aria-label={status === "read" ? "Leído" : "Entregado"}
    />
  );
}

function MessageMeta({ time, status }: { time: string; status?: MessageStatus }) {
  return (
    <p className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-[#C7CEDB]">
      {time}
      <Receipt status={status} />
    </p>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const { sender, senderLabel, kind, amount, label = "Oferta inicial", time, status } = message;
  const mine = sender === "me";

  return (
    <div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
      {!mine && senderLabel && (
        <p className="mb-1 text-[10px] font-medium text-[#C7CEDB]">{senderLabel}</p>
      )}

      {kind === "offer" ? (
        <div
          className={[
            "max-w-[75%] bg-[#1A2233] p-2.5",
            mine ? "rounded-2xl rounded-tr-none" : "rounded-2xl rounded-tl-none",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 rounded-xl bg-[#252E42] px-3.5 py-2.5">
            <Banknote className="h-5 w-5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-medium text-[#E0E7FF]">{label}</p>
              <p className="text-lg font-bold leading-tight text-[#F59E0B]">
                {formatSoles(amount)}
              </p>
            </div>
          </div>
          <MessageMeta time={time} status={status} />
        </div>
      ) : (
        <div
          className={[
            "w-[78%] bg-[#252E42] px-4 py-3",
            mine ? "rounded-2xl rounded-tr-none" : "rounded-2xl rounded-tl-none",
          ].join(" ")}
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#F59E0B]">
            Oferta aceptada
          </p>
          <p className="mt-1 text-3xl font-extrabold text-[#10B981]">{formatSoles(amount)}</p>
          <MessageMeta time={time} status={status} />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function NegotiationScreen({
  counterpart = DEMO_COUNTERPART,
  route = DEMO_ROUTE,
  messages = DEMO_MESSAGES,
  activeTab = "radar",
  onTabChange,
  onSendOffer,
  onBack,
  onCall,
  onAccept,
  onCancel,
}: NegotiationScreenProps) {
  const [amount, setAmount] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  // Mantiene la conversación al final cuando llegan mensajes nuevos.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const numericAmount = Number.parseFloat(amount);
  const canSend = Number.isFinite(numericAmount) && numericAmount > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(sanitizeAmount(e.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;
    onSendOffer?.(Math.round(numericAmount * 100) / 100);
    setAmount("");
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full flex-col bg-[#111827] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      {/* ------------------------------- Cabecera ------------------------------- */}
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#252E42] text-[#10B981]">
              <User className="h-5 w-5" aria-hidden="true" />
            </span>
            {counterpart.online && (
              <span
                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#10B981] ring-2 ring-[#111827]"
                aria-hidden="true"
              />
            )}
          </div>

          <div>
            <h1 className="flex items-center gap-1.5 text-sm font-bold text-white">
              {counterpart.name}
              <span className="flex items-center gap-0.5 text-xs font-semibold text-[#F59E0B]">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                {counterpart.rating.toFixed(1)}
              </span>
            </h1>
            <p
              className={[
                "text-[11px] font-semibold",
                counterpart.online ? "text-[#F59E0B]" : "text-[#9CA3AF]",
              ].join(" ")}
            >
              {counterpart.online ? "En línea" : "Desconectado"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCall}
          aria-label={`Llamar a ${counterpart.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#10B981] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          <Phone className="h-5 w-5" />
        </button>
      </header>

      {/* --------------------------------- Ruta --------------------------------- */}
      <div className="px-4">
        <p className="flex items-center gap-2 rounded-xl bg-[#1A2233] px-3 py-2.5 text-xs font-medium text-[#E0E7FF]">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10B981]" aria-hidden="true" />
          <span className="truncate">
            {route.from} → {route.to}
          </span>
        </p>
      </div>

      {/* ------------------------------- Mensajes ------------------------------- */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversación de negociación"
        className="mt-3 flex-1 overflow-y-auto px-4 pb-4"
      >
        <p className="mx-auto mb-5 flex w-fit items-center gap-1.5 rounded-full bg-[#1A2233] px-3 py-1.5 text-[10px] font-semibold text-[#C7CEDB]">
          <Lock className="h-3 w-3 text-[#10B981]" aria-hidden="true" />
          Negociación cifrada y supervisada por Tambopata Express
        </p>

        <div className="flex flex-col gap-5">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
        <div ref={endRef} />
      </div>

      {/* ------------------------------- Compositor ------------------------------ */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-3 bg-[#1A2233] px-4 py-3"
      >
        <label className="flex w-36 items-center gap-1.5 rounded-lg bg-[#252E42] px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#10B981]">
          <span className="text-sm font-bold text-[#10B981]" aria-hidden="true">
            S/
          </span>
          <span className="sr-only">Monto de tu oferta en soles</span>
          <input
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={handleChange}
            placeholder="0.00"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white placeholder:text-[#4B5563] focus:outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={!canSend}
          className="rounded-lg bg-[#10B981] px-5 py-2.5 text-xs font-bold uppercase text-[#111827] transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2233] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ofertar
        </button>
      </form>

      <div className="flex gap-3 bg-[#1A2233] px-4 pb-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-[#F87171] py-2.5 text-xs font-bold uppercase text-[#F87171] transition-colors hover:bg-[#F87171]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F87171]"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="flex-1 rounded-lg bg-[#10B981] py-2.5 text-xs font-bold uppercase text-[#111827] transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          Aceptar
        </button>
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}