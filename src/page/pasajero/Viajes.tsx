import { useMemo, useState } from "react";
import {
  ArrowRight,
  Asterisk,
  Bike,
  BusFront,
  CarFront,
  CircleAlert,
  Clock,
  MessageSquare,
  Star,
  User,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type PassengerTab = "trips" | "sos";

export type HistoryFilter = "all" | "completed" | "cancelled" | "thisMonth";

interface BaseTrip {
  id: string;
  /** Fecha y hora del viaje en formato ISO. */
  occurredAt: string;
}

export interface CompletedTrip extends BaseTrip {
  status: "completed";
  service: string;
  /** Monto cobrado en soles. */
  fare: number;
  pickup: string;
  destination: string;
  driver: {
    name: string;
    rating: number;
    plate: string;
    /** Métodos de pago: "Yape / Efectivo". */
    payment: string;
  };
}

export interface CancelledTrip extends BaseTrip {
  status: "cancelled";
  cancelledBy: "you" | "driver";
  reason: string;
}

export type Trip = CompletedTrip | CancelledTrip;

interface PassengerHistoryScreenProps {
  trips?: Trip[];
  /** Contadores de los filtros. Si omites alguno, se calcula a partir de `trips`. */
  counts?: Partial<Record<HistoryFilter, number>>;
  avatarUrl?: string;
  activeTab?: PassengerTab;
  onTabChange?: (tab: PassengerTab) => void;
  onRequestTransport?: () => void;
  onChat?: (tripId: string) => void;
}

/* -------------------------------------------------------------------------- */
/*  Datos de ejemplo (los del diseño)                                         */
/* -------------------------------------------------------------------------- */

function daysAgoAt(daysAgo: number, hours: number, minutes: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

const DEMO_TRIPS: Trip[] = [
  {
    id: "t1",
    status: "completed",
    occurredAt: daysAgoAt(0, 14, 40),
    service: "Mototaxi Torito Protegido",
    fare: 7,
    pickup: "Plaza de Armas de Puerto Maldonado",
    destination: "Mercado Modelo 3 de Mayo",
    driver: { name: "Carlos Mamani Q.", rating: 4.9, plate: "7821-4F", payment: "Yape / Efectivo" },
  },
  {
    id: "t2",
    status: "completed",
    occurredAt: daysAgoAt(1, 19, 15),
    service: "Mototaxi Torito Protegido",
    fare: 14.5,
    pickup: "Av. Tambopata c/ Jr. Tacna",
    destination: "Aeropuerto Int. Padre Aldamiz",
    driver: { name: "Jhony Huamán", rating: 4.9, plate: "9012-1M", payment: "Efectivo" },
  },
  {
    id: "t3",
    status: "cancelled",
    occurredAt: new Date(new Date().getFullYear(), 1, 24, 10, 20).toISOString(),
    cancelledBy: "you",
    reason: "Demora en asignación de chofer cercano bajo lluvia fuerte.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Utilidades                                                                */
/* -------------------------------------------------------------------------- */

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const FILTERS: { id: HistoryFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "completed", label: "Completados" },
  { id: "cancelled", label: "Cancelados" },
  { id: "thisMonth", label: "Este Mes" },
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const h = d.getHours();
  const time = `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  const diffDays = Math.round((startOfDay(new Date()) - startOfDay(d)) / 86_400_000);

  if (diffDays === 0) return `Hoy, ${time}`;
  if (diffDays === 1) return `Ayer, ${time}`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${time}`;
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

function matchesFilter(trip: Trip, filter: HistoryFilter) {
  switch (filter) {
    case "completed":
      return trip.status === "completed";
    case "cancelled":
      return trip.status === "cancelled";
    case "thisMonth":
      return isThisMonth(trip.occurredAt);
    default:
      return true;
  }
}

function initials(name: string) {
  return name
    .replace(/[.]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatSoles(amount: number) {
  return `S/ ${amount.toFixed(2)}`;
}

/* -------------------------------------------------------------------------- */
/*  Cabecera                                                                  */
/* -------------------------------------------------------------------------- */

function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2233]">
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M24 4C15.7 4 9 10.5 9 18.6 9 29 24 44 24 44s15-15 15-25.4C39 10.5 32.3 4 24 4Z"
          fill="#F8FAFC"
        />
        <path
          d="M15 22c3-6 9-8 17-5-4 0-6 2-7 4 3-1 6 0 8 2-6-1-10 0-18-1Z"
          fill="#F59E0B"
        />
        <circle cx="24" cy="19" r="2.2" fill="#111827" />
      </svg>
    </div>
  );
}

function Header({ avatarUrl }: { avatarUrl?: string }) {
  return (
    <header className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5">
        <Logo />
        <p className="leading-none">
          <span className="block text-lg font-bold text-[#10B981]">Tambopata</span>
          <span className="block text-[10px] font-bold uppercase tracking-wide text-[#E0E7FF]">
            Express
          </span>
        </p>
      </div>

      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#10B981] ring-2 ring-[#252E42]">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Tu perfil" className="h-full w-full object-cover" />
        ) : (
          <User className="h-5 w-5 text-[#111827]" aria-label="Tu perfil" />
        )}
      </span>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navegación inferior                                                       */
/* -------------------------------------------------------------------------- */

function BottomNav({
  active,
  onChange,
}: {
  active: PassengerTab;
  onChange?: (tab: PassengerTab) => void;
}) {
  const items = [
    {
      id: "trips" as const,
      label: "Viajes",
      icon: Bike,
      color: active === "trips" ? "text-[#10B981]" : "text-[#C7CEDB]",
      strokeWidth: 2,
    },
    {
      id: "sos" as const,
      label: "S.O.S",
      icon: Asterisk,
      color: "text-[#FCA5A5]",
      strokeWidth: 3,
    },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 border-t border-[#1A2233] bg-[#0B1120]"
    >
      <ul className="grid grid-cols-2">
        {items.map(({ id, label, icon: Icon, color, strokeWidth }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onChange?.(id)}
              aria-current={active === id ? "page" : undefined}
              className={`flex w-full flex-col items-center gap-1 py-3 text-[10px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#10B981] ${color}`}
            >
              <Icon className="h-5 w-5" strokeWidth={strokeWidth} aria-hidden="true" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tarjetas de viaje                                                         */
/* -------------------------------------------------------------------------- */

function WhenLabel({ iso, withIcon }: { iso: string; withIcon?: boolean }) {
  return (
    <time
      dateTime={iso}
      className={[
        "flex items-center gap-1.5 text-[11px] font-medium",
        withIcon ? "text-[#E0E7FF]" : "text-[#C7CEDB]",
      ].join(" ")}
    >
      {withIcon && <Clock className="h-3 w-3 text-[#10B981]" aria-hidden="true" />}
      {formatWhen(iso)}
    </time>
  );
}

function CompletedTripCard({
  trip,
  onChat,
}: {
  trip: CompletedTrip;
  onChat?: (tripId: string) => void;
}) {
  const { driver } = trip;

  return (
    <article className="rounded-2xl bg-[#1A2233] p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-md bg-[#10B981]/15 px-2 py-1 text-[11px] font-semibold text-[#10B981]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
          Completado
        </span>
        <WhenLabel iso={trip.occurredAt} withIcon />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <span className="flex items-center gap-1.5 rounded-md bg-[#F59E0B]/10 px-2 py-1 text-[11px] font-bold text-[#F59E0B]">
          <BusFront className="h-3.5 w-3.5" aria-hidden="true" />
          {trip.service}
        </span>
        <p className="text-xl font-bold text-white">{formatSoles(trip.fare)}</p>
      </div>

      {/* Ruta */}
      <div className="relative mt-3 pl-6">
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-[#374151]" aria-hidden="true" />

        <div className="relative">
          <span
            className="absolute -left-6 top-1.5 h-3 w-3 rounded-full bg-[#10B981]"
            aria-hidden="true"
          />
          <p className="text-[11px] text-[#C7CEDB]">Punto de Recojo</p>
          <p className="text-base font-medium text-white">{trip.pickup}</p>
        </div>

        <div className="relative mt-3">
          <span
            className="absolute -left-6 top-1.5 h-3 w-3 rounded-full bg-[#F59E0B]"
            aria-hidden="true"
          />
          <p className="text-[11px] text-[#C7CEDB]">Punto de Llegada</p>
          <p className="text-base font-medium text-white">{trip.destination}</p>
        </div>
      </div>

      {/* Chofer */}
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#141B2B] p-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#252E42] text-sm font-bold text-[#E0E7FF]"
          aria-hidden="true"
        >
          {initials(driver.name)}
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <span className="truncate">{driver.name}</span>
            <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-bold text-[#F59E0B]">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              {driver.rating.toFixed(1)}
            </span>
          </p>
          <p className="mt-0.5 truncate font-mono text-[11px] text-[#C7CEDB]">
            Placa: {driver.plate} • {driver.payment}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChat?.(trip.id)}
          aria-label={`Abrir chat con ${driver.name}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#252E42] text-[#C7CEDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function CancelledTripCard({ trip }: { trip: CancelledTrip }) {
  return (
    <article className="rounded-2xl bg-[#1A2233] p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-[#252E42] px-3 py-1 text-[11px] font-semibold text-[#C7CEDB]">
          {trip.cancelledBy === "you" ? "Cancelado por ti" : "Cancelado por el chofer"}
        </span>
        <WhenLabel iso={trip.occurredAt} />
      </div>

      <p className="mt-4 text-[11px] text-[#C7CEDB]">{formatSoles(0)} (Sin cobro)</p>

      <p className="mt-3 flex items-start gap-2 rounded-lg bg-[#141B2B] px-3 py-3 text-xs text-[#C7CEDB]">
        <CircleAlert className="mt-px h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
        <span>Motivo: {trip.reason}</span>
      </p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function PassengerHistoryScreen({
  trips = DEMO_TRIPS,
  counts,
  avatarUrl,
  activeTab = "trips",
  onTabChange,
  onRequestTransport,
  onChat,
}: PassengerHistoryScreenProps) {
  const [filter, setFilter] = useState<HistoryFilter>("all");

  const computedCounts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map(({ id }) => [id, trips.filter((t) => matchesFilter(t, id)).length]),
      ) as Record<HistoryFilter, number>,
    [trips],
  );

  const visibleTrips = useMemo(
    () => trips.filter((t) => matchesFilter(t, filter)),
    [trips, filter],
  );

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-[#111827] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <main className="flex-1 px-4 pb-6 pt-3">
        <Header avatarUrl={avatarUrl} />

        {/* CTA principal */}
        <section className="mt-4 rounded-2xl bg-[#1A2233] p-4">
          <button
            type="button"
            onClick={onRequestTransport}
            className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#34D399] to-[#10B981] px-5 py-5 text-[#111827] shadow-lg shadow-[#10B981]/30 transition-transform hover:brightness-105 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2233]"
          >
            <span className="flex items-center gap-3 text-base font-bold">
              <CarFront className="h-6 w-6" aria-hidden="true" />
              Solicitar Transporte
            </span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </section>

        {/* Historial */}
        <section aria-labelledby="history-title" className="mt-5">
          <h2
            id="history-title"
            className="flex items-center gap-2 text-base font-semibold text-[#E0E7FF]"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" aria-hidden="true" />
            Historial de viajes
          </h2>

          {/* Filtros */}
          <div
            role="group"
            aria-label="Filtrar viajes"
            className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map(({ id, label }) => {
              const selected = filter === id;
              const count = counts?.[id] ?? computedCounts[id];
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(id)}
                  className={[
                    "shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
                    selected
                      ? "bg-[#10B981] text-[#111827]"
                      : "bg-[#1A2233] text-[#C7CEDB] hover:bg-[#252E42]",
                  ].join(" ")}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          {/* Lista */}
          <div className="mt-4 flex flex-col gap-4">
            {visibleTrips.length === 0 ? (
              <p className="rounded-2xl bg-[#1A2233] px-4 py-8 text-center text-xs text-[#9CA3AF]">
                No hay viajes en esta categoría todavía.
              </p>
            ) : (
              visibleTrips.map((trip) =>
                trip.status === "completed" ? (
                  <CompletedTripCard key={trip.id} trip={trip} onChat={onChat} />
                ) : (
                  <CancelledTripCard key={trip.id} trip={trip} />
                ),
              )
            )}
          </div>
        </section>
      </main>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}