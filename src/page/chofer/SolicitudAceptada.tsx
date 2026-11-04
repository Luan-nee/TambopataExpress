import type { ReactNode } from "react";
import {
  Asterisk,
  Banknote,
  Bike,
  BusFront,
  KeyRound,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  QrCode,
  Radar,
  ShieldCheck,
  Star,
  Store,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type PaymentMethod = "cash" | "yape";

/** Posición de un marcador sobre el mapa, en porcentaje (0–100). */
export interface MapPoint {
  x: number;
  y: number;
}

export interface MapPositions {
  you: MapPoint;
  pickup: MapPoint;
  destination: MapPoint;
}

export interface ActiveTrip {
  vehicle: { name: string; plate: string };
  passenger: {
    name: string;
    rating: number;
    verified: boolean;
    /** Texto bajo el nombre, p. ej. "2 maletas". */
    detail?: string;
    avatarUrl?: string;
  };
  /** Tarifa acordada en soles. */
  fare: number;
  payments: PaymentMethod[];
  pickup: {
    name: string;
    address: string;
    distanceMeters: number;
    etaMinutes: number;
  };
  destination: { name: string; detail: string };
  /** PIN que el chofer le pide al pasajero (4 dígitos). */
  pin: string;
}

interface ActiveTripScreenProps {
  trip?: ActiveTrip;
  /** Posiciones de los marcadores sobre el mapa (en %). */
  markers?: MapPositions;
  /**
   * Mapa real (Leaflet, Mapbox, Google Maps…). Si lo omites se muestra un
   * mapa esquemático de ejemplo. Los marcadores se dibujan encima.
   */
  map?: ReactNode;
  avatarUrl?: string;
  activeTab?: DriverTab;
  onTabChange?: (tab: DriverTab) => void;
  onCall?: () => void;
  onRecenter?: () => void;
  onArrived?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Datos de ejemplo (los del diseño)                                         */
/* -------------------------------------------------------------------------- */

const DEMO_TRIP: ActiveTrip = {
  vehicle: { name: "Motocar Honda CG 125", plate: "4521-7B" },
  passenger: {
    name: "Lucía M.",
    rating: 4.8,
    verified: true,
    detail: "2 maletas",
  },
  fare: 6,
  payments: ["cash", "yape"],
  pickup: {
    name: "Plaza de Armas de Puerto Maldonado",
    address: "Av. León Velarde con Jr. Billinghurst",
    distanceMeters: 350,
    etaMinutes: 2,
  },
  destination: {
    name: "Jr. Lambayeque / Mercado Central",
    detail: "Sector comercial de abastos",
  },
  pin: "4892",
};

const DEMO_MARKERS: MapPositions = {
  you: { x: 27, y: 63 },
  pickup: { x: 41, y: 44 },
  destination: { x: 43, y: 59 },
};

const PAYMENT_CHIPS: Record<
  PaymentMethod,
  { label: string; icon: LucideIcon; className: string }
> = {
  cash: {
    label: "Efectivo",
    icon: Banknote,
    className: "bg-[#F59E0B]/15 text-[#F59E0B] ring-[#F59E0B]/30",
  },
  yape: {
    label: "Yape",
    icon: QrCode,
    className: "bg-[#06B6D4]/15 text-[#22D3EE] ring-[#06B6D4]/30",
  },
};

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

export type DriverTab = "trips" | "radar" | "earnings" | "sos";

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
/*  Mapa                                                                      */
/* -------------------------------------------------------------------------- */

/** Mapa esquemático de ejemplo: sustitúyelo por tu proveedor de mapas. */
function PlaceholderMap() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="#2A3342" />
      {/* Cuadrícula de calles */}
      <g stroke="#3A4558" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
        {[10, 22, 34, 46, 58, 70, 82].map((p) => (
          <line key={`h${p}`} x1="0" y1={p} x2="100" y2={p + 6} />
        ))}
        {[8, 20, 32, 44, 56, 68, 80, 92].map((p) => (
          <line key={`v${p}`} x1={p} y1="0" x2={p - 6} y2="100" />
        ))}
      </g>
      {/* Río */}
      <path
        d="M0 38 C 20 30, 38 52, 58 44 S 88 30, 100 40 L100 56 C 88 46, 70 58, 56 58 S 18 46, 0 54 Z"
        fill="#3D5266"
      />
      {/* Zona verde */}
      <rect x="14" y="76" width="22" height="14" rx="2" fill="#2F4A44" />
    </svg>
  );
}

function MapMarker({
  point,
  label,
  icon: Icon,
  circleClass,
  labelClass,
}: {
  point: MapPoint;
  label: string;
  icon: LucideIcon;
  circleClass: string;
  labelClass: string;
}) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg ring-2 ring-[#111827]/60 ${circleClass}`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span
        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold shadow ${labelClass}`}
      >
        {label}
      </span>
    </div>
  );
}

function TripMap({
  trip,
  markers,
  map,
  onRecenter,
}: {
  trip: ActiveTrip;
  markers: MapPositions;
  map?: ReactNode;
  onRecenter?: () => void;
}) {
  return (
    <section
      aria-label="Mapa del viaje"
      className="relative h-80 w-full overflow-hidden bg-[#2A3342]"
    >
      {map ?? <PlaceholderMap />}

      {/* Ruta Tú → Recojo */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <line
          x1={markers.you.x}
          y1={markers.you.y}
          x2={markers.pickup.x}
          y2={markers.pickup.y}
          stroke="#10B981"
          strokeWidth="3"
          strokeDasharray="4 3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Marcadores */}
      <MapMarker
        point={markers.you}
        label="Tú"
        icon={BusFront}
        circleClass="bg-[#F59E0B] text-[#111827]"
        labelClass="bg-[#111827]/85 text-[#E0E7FF]"
      />
      <MapMarker
        point={markers.pickup}
        label={`Recojo (${trip.pickup.distanceMeters}m)`}
        icon={MapPin}
        circleClass="bg-[#10B981] text-[#111827]"
        labelClass="bg-[#064E3B]/90 text-[#6EE7B7]"
      />
      <MapMarker
        point={markers.destination}
        label="Destino"
        icon={Store}
        circleClass="bg-[#06B6D4] text-[#111827]"
        labelClass="bg-[#111827]/85 text-[#22D3EE]"
      />

      {/* Chip del vehículo */}
      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-[#111827]/90 px-2.5 py-1.5 shadow">
        <BusFront className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
        <p className="leading-tight">
          <span className="block text-[11px] font-bold text-white">{trip.vehicle.name}</span>
          <span className="block font-mono text-[11px] font-semibold text-[#F59E0B]">
            {trip.vehicle.plate}
          </span>
        </p>
      </div>

      {/* Recentrar */}
      <button
        type="button"
        onClick={onRecenter}
        aria-label="Centrar en mi ubicación"
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#252E42] text-[#E0E7FF] shadow-lg transition-colors hover:bg-[#2F3A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
      >
        <LocateFixed className="h-5 w-5" />
      </button>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes de la tarjeta                                              */
/* -------------------------------------------------------------------------- */

function PassengerRow({
  passenger,
  onCall,
}: {
  passenger: ActiveTrip["passenger"];
  onCall?: () => void;
}) {
  const initials = passenger.name
    .replace(/[.]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#252E42] text-sm font-bold text-[#E0E7FF]">
          {passenger.avatarUrl ? (
            <img
              src={passenger.avatarUrl}
              alt={passenger.name}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </span>
        {passenger.verified && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[#111827] ring-2 ring-[#1A2233]">
            <ShieldCheck className="h-3 w-3" aria-label="Pasajero verificado" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-base font-semibold text-white">
          {passenger.name}
          <span className="flex items-center gap-0.5 text-xs font-bold text-[#F59E0B]">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            {passenger.rating.toFixed(1)}
          </span>
        </p>
        <p className="truncate text-xs text-[#C7CEDB]">
          {passenger.verified ? "Pasajero verificado" : "Pasajero"}
          {passenger.detail ? ` • ${passenger.detail}` : ""}
        </p>
      </div>

      <button
        type="button"
        onClick={onCall}
        aria-label={`Llamar a ${passenger.name}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#252E42] text-[#10B981] transition-colors hover:bg-[#2F3A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
      >
        <Phone className="h-5 w-5" />
      </button>
    </div>
  );
}

function FareBox({ fare, payments }: { fare: number; payments: PaymentMethod[] }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#141B2B] px-4 py-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
          Tarifa acordada
        </p>
        <p className="mt-1 text-2xl font-extrabold text-[#10B981]">
          S/ {fare.toFixed(2)}{" "}
          <span className="text-xs font-medium text-[#C7CEDB]">fijo</span>
        </p>
      </div>

      <div className="text-right">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
          Método de cobro
        </p>
        <ul className="mt-1.5 flex justify-end gap-1.5">
          {payments.map((method) => {
            const { label, icon: Icon, className } = PAYMENT_CHIPS[method];
            return (
              <li
                key={method}
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ring-1 ${className}`}
              >
                <Icon className="h-3 w-3" aria-hidden="true" />
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function RouteTimeline({ trip }: { trip: ActiveTrip }) {
  const { pickup, destination } = trip;
  return (
    <div className="relative pl-6">
      {/* Línea vertical */}
      <span
        className="absolute left-[5px] top-2 bottom-2 w-px bg-[#374151]"
        aria-hidden="true"
      />

      <div className="relative">
        <span
          className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-[#10B981]"
          aria-hidden="true"
        />
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#10B981]">
            Punto de recojo
          </p>
          <p className="shrink-0 text-[11px] font-bold text-[#F59E0B]">
            {pickup.distanceMeters}m · {pickup.etaMinutes} min restantes
          </p>
        </div>
        <p className="mt-0.5 text-base font-semibold text-white">{pickup.name}</p>
        <p className="text-xs text-[#C7CEDB]">{pickup.address}</p>
      </div>

      <div className="relative mt-4">
        <span
          className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-[#06B6D4]"
          aria-hidden="true"
        />
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#22D3EE]">
          Destino final
        </p>
        <p className="mt-0.5 text-base font-semibold text-white">{destination.name}</p>
        <p className="text-xs text-[#C7CEDB]">{destination.detail}</p>
      </div>
    </div>
  );
}

function PinBox({ pin }: { pin: string }) {
  return (
    <div className="rounded-xl bg-[#252E42]/60 p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#E0E7FF]">
          <KeyRound className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
          PIN
        </span>
        <span className="text-[10px] text-[#C7CEDB]">Pídeselo al pasajero</span>
      </div>

      <ol
        className="mt-3 flex justify-center gap-2"
        aria-label={`PIN de verificación: ${pin.split("").join(" ")}`}
      >
        {pin.split("").map((digit, i) => (
          <li
            key={i}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B1120] text-lg font-bold text-[#10B981]"
          >
            {digit}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function ActiveTripScreen({
  trip = DEMO_TRIP,
  markers = DEMO_MARKERS,
  map,
  avatarUrl,
  activeTab = "radar",
  onTabChange,
  onCall,
  onRecenter,
  onArrived,
}: ActiveTripScreenProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-[#111827] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <div className="px-4 pb-2 pt-3">
        <Header avatarUrl={avatarUrl} />
      </div>

      <main className="flex-1">
        <TripMap trip={trip} markers={markers} map={map} onRecenter={onRecenter} />

        <section
          aria-label="Detalle del viaje"
          className="mx-4 mb-6 mt-4 flex flex-col gap-4 rounded-2xl bg-[#1A2233] p-4"
        >
          <PassengerRow passenger={trip.passenger} onCall={onCall} />
          <FareBox fare={trip.fare} payments={trip.payments} />
          <RouteTimeline trip={trip} />
          <PinBox pin={trip.pin} />

          <button
            type="button"
            onClick={onArrived}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3.5 text-sm font-bold text-[#111827] shadow-lg shadow-[#10B981]/25 transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2233]"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            He llegado al punto de recojo
          </button>
        </section>
      </main>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}