import type { ReactNode } from "react";
import {
  Asterisk,
  Banknote,
  BedDouble,
  Bike,
  BusFront,
  CircleDot,
  Luggage,
  MapPin,
  PlaneLanding,
  Radar,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type DriverTab = "trips" | "radar" | "earnings" | "sos";

export type PlaceKind = "point" | "airport" | "pin" | "lodging";

export interface RidePlace {
  name: string;
  kind: PlaceKind;
}

export interface RideRequest {
  id: string;
  passengerName: string;
  rating: number;
  /** Texto bajo el nombre: "24 viajes completados", "Turista Nacional"… */
  subtitle: string;
  /** Aviso especial (equipaje, etc.). */
  note?: string;
  pickup: RidePlace;
  destination: RidePlace;
  /** Métodos de pago aceptados: "Yape / Efectivo". */
  payment: string;
}

export interface DriverVehicle {
  name: string;
  plate: string;
  active: boolean;
  capacity: string;
  soatExpiry: string;
}

interface DriverRadarScreenProps {
  vehicle?: DriverVehicle;
  earningsToday?: number;
  /** Variación porcentual contra ayer (puede ser negativa). */
  earningsDeltaPct?: number;
  tripsCompleted?: number;
  requests?: RideRequest[];
  avatarUrl?: string;
  activeTab?: DriverTab;
  onTabChange?: (tab: DriverTab) => void;
  onNegotiate?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onVehicleSettings?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Datos de ejemplo (los del diseño)                                         */
/* -------------------------------------------------------------------------- */

export const DEMO_VEHICLE: DriverVehicle = {
  name: "Motocar Honda CG 125",
  plate: "4521-7B",
  active: true,
  capacity: "3 pas. + bultos",
  soatExpiry: "Dic 2025",
};

export const DEMO_REQUESTS: RideRequest[] = [
  {
    id: "req-1",
    passengerName: "Lucía M.",
    rating: 4.8,
    subtitle: "24 viajes completados",
    pickup: { name: "Plaza de Armas de Puerto Maldonado", kind: "point" },
    destination: { name: "Jr. Lambayeque / Mercado Central", kind: "pin" },
    payment: "Yape / Efectivo",
  },
  {
    id: "req-2",
    passengerName: "Carlos R.",
    rating: 5.0,
    subtitle: "Turista Nacional",
    note: "Requiere Motocar: 2 maletas de bodega + mochila",
    pickup: { name: "Aeropuerto Padre Aldamiz (Salidas)", kind: "airport" },
    destination: { name: "Av. León Velarde - Hospedaje Tambopata", kind: "lodging" },
    payment: "Efectivo",
  },
];

/* -------------------------------------------------------------------------- */
/*  Utilidades                                                                */
/* -------------------------------------------------------------------------- */

const PLACE_ICONS: Record<PlaceKind, LucideIcon> = {
  point: CircleDot,
  airport: PlaneLanding,
  pin: MapPin,
  lodging: BedDouble,
};

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

function initials(name: string) {
  const letters = name
    .replace(/[.]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]);
  return letters.join("").toUpperCase();
}

function formatSoles(amount: number) {
  return `S/ ${amount.toFixed(2)}`;
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes                                                            */
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

function VehicleCard({
  vehicle,
  onSettings,
}: {
  vehicle: DriverVehicle;
  onSettings?: () => void;
}) {
  return (
    <section className="rounded-2xl bg-[#1A2233] p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#252E42] text-[#F59E0B]">
          <BusFront className="h-6 w-6" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-white">{vehicle.name}</h2>
            <span
              className={[
                "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                vehicle.active
                  ? "bg-[#10B981]/20 text-[#10B981]"
                  : "bg-[#F59E0B]/20 text-[#F59E0B]",
              ].join(" ")}
            >
              {vehicle.active ? "Activo" : "Inactivo"}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-[#C7CEDB]">Placa: {vehicle.plate}</p>
        </div>

        <button
          type="button"
          onClick={onSettings}
          aria-label="Ajustes del vehículo"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#252E42] text-[#C7CEDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#C7CEDB]">
        <p className="flex items-center gap-2 rounded-lg bg-[#141B2B] px-3 py-2.5">
          <Users className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
          <span className="truncate">
            Capacidad: <span className="font-semibold text-white">{vehicle.capacity}</span>
          </span>
        </p>
        <p className="flex items-center gap-2 rounded-lg bg-[#141B2B] px-3 py-2.5">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#10B981]" aria-hidden="true" />
          <span className="truncate">
            SOAT: <span className="font-semibold text-white">{vehicle.soatExpiry}</span>
          </span>
        </p>
      </div>
    </section>
  );
}

function StatCard({
  label,
  icon: Icon,
  iconColor,
  value,
  valueColor = "text-white",
  footer,
}: {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  value: string;
  valueColor?: string;
  footer: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#1A2233] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
      </div>
      <p className={`mt-2 text-xl font-bold ${valueColor}`}>{value}</p>
      <p className="mt-1 text-[10px] font-semibold text-[#9CA3AF]">{footer}</p>
    </div>
  );
}

function PlaceRow({
  label,
  place,
  iconColor,
}: {
  label: string;
  place: RidePlace;
  iconColor: string;
}) {
  const Icon = PLACE_ICONS[place.kind];
  return (
    <div className="flex items-start gap-3">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
          {label}
        </p>
        <p className="text-sm font-medium text-white">{place.name}</p>
      </div>
    </div>
  );
}

function RequestCard({
  request,
  onNegotiate,
  onReject,
}: {
  request: RideRequest;
  onNegotiate?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  const { id, passengerName, rating, subtitle, note, pickup, destination, payment } = request;

  return (
    <article className="rounded-2xl bg-[#1A2233] p-3.5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#252E42] text-xs font-bold text-[#E0E7FF]"
          aria-hidden="true"
        >
          {initials(passengerName)}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
            {passengerName}
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#F59E0B]">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              <span aria-label={`Calificación ${rating.toFixed(1)}`}>{rating.toFixed(1)}</span>
            </span>
          </p>
          <p className="text-[11px] text-[#9CA3AF]">{subtitle}</p>
        </div>
      </div>

      {note && (
        <p className="mt-3 flex items-center gap-2 rounded-md bg-[#F59E0B]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#FDE68A]">
          <Luggage className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
          {note}
        </p>
      )}

      <div className="mt-3 rounded-xl bg-[#141B2B] p-3">
        <PlaceRow label="Punto de recojo" place={pickup} iconColor="text-[#10B981]" />
        <span
          className="my-1.5 ml-[7px] block h-3 w-px bg-[#374151]"
          aria-hidden="true"
        />
        <PlaceRow label="Destino" place={destination} iconColor="text-[#F59E0B]" />
        <p className="mt-2 text-right text-[11px] font-semibold text-[#22D3EE]">{payment}</p>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1.4fr] gap-3">
        <button
          type="button"
          onClick={() => onReject?.(id)}
          className="rounded-xl bg-[#252E42] py-3 text-sm font-semibold text-[#FCA5A5] transition-colors hover:bg-[#2F3A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA5A5]"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => onNegotiate?.(id)}
          className="rounded-xl bg-[#10B981] py-3 text-sm font-bold text-[#111827] transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2233]"
        >
          Negociar
        </button>
      </div>
    </article>
  );
}

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

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function DriverRadarScreen({
  vehicle = DEMO_VEHICLE,
  earningsToday = 84.5,
  earningsDeltaPct = 18,
  tripsCompleted = 1115,
  requests = DEMO_REQUESTS,
  avatarUrl,
  activeTab = "radar",
  onTabChange,
  onNegotiate,
  onReject,
  onVehicleSettings,
}: DriverRadarScreenProps) {
  const trendUp = earningsDeltaPct >= 0;
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-[#111827] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <main className="flex-1 px-4 pb-6 pt-3">
        <Header avatarUrl={avatarUrl} />

        <div className="mt-4 flex flex-col gap-4">
          <VehicleCard vehicle={vehicle} onSettings={onVehicleSettings} />

          <section className="grid grid-cols-2 gap-3" aria-label="Resumen del día">
            <StatCard
              label="Hoy"
              icon={Banknote}
              iconColor="text-[#10B981]"
              value={formatSoles(earningsToday)}
              valueColor="text-[#10B981]"
              footer={
                <span
                  className={`flex items-center gap-1 ${trendUp ? "text-[#10B981]" : "text-[#F59E0B]"}`}
                >
                  <TrendIcon className="h-3 w-3" aria-hidden="true" />
                  {trendUp ? "+" : ""}
                  {earningsDeltaPct}% ayer
                </span>
              }
            />
            <StatCard
              label="Viajes"
              icon={Route}
              iconColor="text-[#06B6D4]"
              value={tripsCompleted.toLocaleString("es-PE")}
              footer="Completados"
            />
          </section>

          <section aria-labelledby="radar-title" className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2
                id="radar-title"
                className="flex items-center gap-2 text-base font-semibold text-[#E0E7FF]"
              >
                <span className="h-2 w-2 rounded-full bg-[#F59E0B]" aria-hidden="true" />
                Radar de Solicitudes
              </h2>
              <span className="rounded-full bg-[#252E42] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]">
                Disponibles ({requests.length})
              </span>
            </div>

            {requests.length === 0 ? (
              <p className="rounded-2xl bg-[#1A2233] px-4 py-8 text-center text-xs text-[#9CA3AF]">
                No hay solicitudes cerca por ahora. Te avisaremos cuando llegue una.
              </p>
            ) : (
              requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onNegotiate={onNegotiate}
                  onReject={onReject}
                />
              ))
            )}
          </section>
        </div>
      </main>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}