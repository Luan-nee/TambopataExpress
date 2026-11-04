import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowLeft,
  Bike,
  BusFront,
  Calendar,
  Camera,
  Car,
  CircleCheck,
  CircleHelp,
  Contact,
  FileText,
  Palette,
  ShieldPlus,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type VehicleType = "motocarro" | "moto";

export interface VehiclePayload {
  vehicleType: VehicleType;
  plate: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  vin: string;
  engineNumber: string;
  tivFront: File | null;
  tivBack: File | null;
  soatNumber: string;
  soatExpiry: string; // ISO yyyy-mm-dd
  insurer: string;
}

interface VehicleScreenProps {
  /** Texto bajo la barra superior, p. ej. "Perfil pasajero". */
  stepLabel?: string;
  /** Avance del registro, de 0 a 100. */
  progress?: number;
  onSubmit?: (payload: VehiclePayload) => void;
  onBack?: () => void;
  onHelp?: () => void;
}

interface VehicleOption {
  id: VehicleType;
  title: string;
  tag: string;
  tagColor: string;
  capacity: string;
  capacityIcon: LucideIcon;
  icon: LucideIcon;
  iconTile: string; // clases del recuadro del ícono cuando está seleccionado
}

/* -------------------------------------------------------------------------- */
/*  Datos y utilidades                                                        */
/* -------------------------------------------------------------------------- */

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "motocarro",
    title: "Motocarro Pasajeros",
    tag: "Bajaj Torito • Lluvia",
    tagColor: "text-[#F59E0B]",
    capacity: "Hasta 3 + maletas",
    capacityIcon: Users,
    icon: BusFront,
    iconTile: "bg-[#F59E0B]/20 text-[#F59E0B]",
  },
  {
    id: "moto",
    title: "Moto Lineal",
    tag: "Ágil Express",
    tagColor: "text-[#06B6D4]",
    capacity: "1 pasajero rápido",
    capacityIcon: User,
    icon: Bike,
    iconTile: "bg-[#06B6D4]/20 text-[#06B6D4]",
  },
];

const INSURERS = [
  "La Positiva Seguros",
  "Rímac Seguros",
  "Pacífico Seguros",
  "Mapfre Perú",
  "Interseguro",
  "Protecta Security",
];

const PLATE_REGEX = /^[A-Z0-9]{3,4}-[A-Z0-9]{2,3}$/;

const INPUT_CLASS =
  "min-w-0 flex-1 bg-transparent text-sm font-semibold text-white placeholder:text-[#4B5563] focus:outline-none";
const FIELD_BOX_CLASS =
  "flex items-center gap-2 rounded-xl bg-[#252E42] px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#10B981]";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExt(file: File) {
  const ext = file.name.split(".").pop()?.toUpperCase() ?? "IMG";
  return ext === "JPEG" ? "JPG" : ext;
}

function fileBaseName(file: File) {
  const i = file.name.lastIndexOf(".");
  return i > 0 ? file.name.slice(0, i) : file.name;
}

function isActive(iso: string): boolean | null {
  if (!iso) return null;
  const expiry = new Date(`${iso}T23:59:59`);
  if (Number.isNaN(expiry.getTime())) return null;
  return expiry.getTime() >= Date.now();
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes de layout                                                  */
/* -------------------------------------------------------------------------- */

function TopBar({
  label,
  progress,
  onBack,
  onHelp,
}: {
  label: string;
  progress: number;
  onBack?: () => void;
  onHelp?: () => void;
}) {
  const value = Math.min(100, Math.max(0, progress));
  return (
    <header className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A2233] text-[#F59E0B]">
          <BusFront className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="w-28 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
          {label}
        </p>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#252E42]"
        >
          <div
            className="h-full rounded-full bg-[#10B981] transition-all"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onHelp}
          aria-label="Ayuda"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#C7CEDB] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          <CircleHelp className="h-5 w-5" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981] text-[#111827]">
          <User className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}

function Field({
  id,
  label,
  trailing,
  children,
}: {
  id: string;
  label: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-medium text-[#C7CEDB]">
        {label}
      </label>
      <div className={FIELD_BOX_CLASS}>
        {children}
        {trailing}
      </div>
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  subtitle,
  badge,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-bold text-[#E0E7FF]">{title}</h2>
        <p className="text-[11px] text-[#9CA3AF]">{subtitle}</p>
      </div>
      {badge}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes de formulario                                              */
/* -------------------------------------------------------------------------- */

function VehicleTypeCard({
  option,
  selected,
  onSelect,
}: {
  option: VehicleOption;
  selected: boolean;
  onSelect: (id: VehicleType) => void;
}) {
  const { id, title, tag, tagColor, capacity, capacityIcon: CapIcon, icon: Icon, iconTile } =
    option;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={[
        "relative flex flex-col items-start gap-1 rounded-xl p-3 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
        selected
          ? "bg-[#252E42] ring-1 ring-[#10B981]/40"
          : "bg-[#1A2233] hover:bg-[#252E42]/70",
      ].join(" ")}
    >
      <span
        className={[
          "mb-2 flex h-11 w-11 items-center justify-center rounded-lg",
          selected ? iconTile : "bg-[#252E42] text-[#06B6D4]",
        ].join(" ")}
      >
        <Icon className="h-6 w-6" />
      </span>

      <span
        className={[
          "text-sm font-bold",
          selected ? "text-white" : "text-[#9CA3AF]",
        ].join(" ")}
      >
        {title}
      </span>
      <span className={`text-[11px] font-semibold ${tagColor}`}>{tag}</span>
      <span className="mt-1 flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
        <CapIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {capacity}
      </span>

      {selected && (
        <CircleCheck
          className="absolute right-3 top-3 h-6 w-6 fill-[#10B981] text-[#111827]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

function PlatePreview({ plate }: { plate: string }) {
  return (
    <div
      className="w-[88px] shrink-0 overflow-hidden rounded-md bg-white shadow-md"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between bg-[#2563EB] px-1.5 py-0.5">
        <span className="text-[7px] font-extrabold tracking-wider text-white">PERÚ</span>
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
      <p
        className={[
          "px-1 py-1.5 text-center text-sm font-extrabold tracking-tight",
          plate ? "text-[#111827]" : "text-[#9CA3AF]",
        ].join(" ")}
      >
        {plate || "0000-00"}
      </p>
    </div>
  );
}

function DocUpload({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="flex cursor-pointer flex-col gap-2 rounded-xl bg-[#252E42]/60 p-2.5 focus-within:ring-2 focus-within:ring-[#10B981]">
      <span className="text-[11px] font-bold text-[#E0E7FF]">{label}</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      <span className="relative flex h-20 flex-col items-center justify-center gap-0.5 rounded-lg bg-[#0B1120] px-2">
        {file ? (
          <>
            <span className="flex max-w-full items-center gap-1.5 text-xs text-[#E0E7FF]">
              <FileText className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
              <span className="truncate">{fileBaseName(file)}</span>
            </span>
            <span className="text-[10px] text-[#9CA3AF]">
              {fileExt(file)} • {formatBytes(file.size)}
            </span>
          </>
        ) : (
          <span className="text-[11px] font-semibold text-[#9CA3AF]">Subir foto</span>
        )}
        <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#252E42] text-[#C7CEDB]">
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </span>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function VehicleScreen({
  stepLabel = "Perfil pasajero",
  progress = 70,
  onSubmit,
  onBack,
  onHelp,
}: VehicleScreenProps) {
  const [vehicleType, setVehicleType] = useState<VehicleType>("motocarro");
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [tivFront, setTivFront] = useState<File | null>(null);
  const [tivBack, setTivBack] = useState<File | null>(null);
  const [soatNumber, setSoatNumber] = useState("");
  const [soatExpiry, setSoatExpiry] = useState("");
  const [insurer, setInsurer] = useState("");

  // Evita un valor "now" desfasado al hidratar en SSR.
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => forceTick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const plateValid = PLATE_REGEX.test(plate);
  const soatActive = isActive(soatExpiry);
  const maxYear = new Date().getFullYear() + 1;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({
      vehicleType,
      plate,
      brand,
      model,
      year,
      color,
      vin,
      engineNumber,
      tivFront,
      tivBack,
      soatNumber,
      soatExpiry,
      insurer,
    });
  };

  return (
    <main className="mx-auto min-h-screen w-full bg-[#111827] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <form onSubmit={handleSubmit} className="flex min-h-screen flex-col">
        <div className="flex-1 px-4 pb-6 pt-3">
          <TopBar label={stepLabel} progress={progress} onBack={onBack} onHelp={onHelp} />

          {/* ----------------------- Tipo de vehículo ----------------------- */}
          <section className="mt-4">
            <h2 id="vehicle-type" className="mb-3 text-sm font-bold text-[#E0E7FF]">
              Tipo de Vehículo de Pasajeros
            </h2>
            <div
              role="radiogroup"
              aria-labelledby="vehicle-type"
              className="grid grid-cols-2 gap-3"
            >
              {VEHICLE_OPTIONS.map((option) => (
                <VehicleTypeCard
                  key={option.id}
                  option={option}
                  selected={vehicleType === option.id}
                  onSelect={setVehicleType}
                />
              ))}
            </div>
          </section>

          {/* ------------------------------ Placa ------------------------------ */}
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-bold text-[#E0E7FF]">
              Placa de Rodaje Oficial
            </h2>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#252E42] bg-[#0B1120] p-2.5">
              <PlatePreview plate={plate} />
              <div className="min-w-0 flex-1">
                <input
                  aria-label="Placa de rodaje"
                  required
                  maxLength={8}
                  autoCapitalize="characters"
                  value={plate}
                  onChange={(e) =>
                    setPlate(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))
                  }
                  placeholder="8931-4A"
                  className="w-full rounded-xl bg-[#1A2233] px-4 py-3 text-xl font-bold tracking-widest text-white placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
                <p
                  className={[
                    "mt-2 flex items-center gap-1.5 text-xs",
                    plateValid ? "text-[#C7CEDB]" : "text-[#9CA3AF]",
                  ].join(" ")}
                >
                  {plateValid ? (
                    <>
                      <CircleCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                      Registrada en Puerto Maldonado
                    </>
                  ) : (
                    "Formato: 8931-4A"
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* ------------------------ Datos del vehículo ------------------------ */}
          <section className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4">
            <Field
              id="brand"
              label="Marca"
              trailing={<Car className="h-4 w-4 shrink-0 text-[#C7CEDB]" aria-hidden="true" />}
            >
              <input
                id="brand"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Bajaj"
                className={INPUT_CLASS}
              />
            </Field>

            <Field
              id="model"
              label="Modelo / Cilindrada"
              trailing={
                <SlidersHorizontal
                  className="h-4 w-4 shrink-0 text-[#C7CEDB]"
                  aria-hidden="true"
                />
              }
            >
              <input
                id="model"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Torito 205cc"
                className={INPUT_CLASS}
              />
            </Field>

            <Field
              id="year"
              label="Año de Fabricación"
              trailing={<Calendar className="h-4 w-4 shrink-0 text-[#C7CEDB]" aria-hidden="true" />}
            >
              <input
                id="year"
                type="number"
                inputMode="numeric"
                min={1990}
                max={maxYear}
                required
                value={year}
                onChange={(e) => setYear(e.target.value.slice(0, 4))}
                placeholder="2022"
                className={`${INPUT_CLASS} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </Field>

            <Field
              id="color"
              label="Color Predominante"
              trailing={<Palette className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />}
            >
              <input
                id="color"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Azul / Plateado"
                className={INPUT_CLASS}
              />
            </Field>

            <Field id="vin" label="N° Serie (VIN / Chasis)">
              <input
                id="vin"
                required
                maxLength={17}
                autoCapitalize="characters"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                placeholder="MD625AZ43P0029141"
                className={`${INPUT_CLASS} tracking-wide`}
              />
            </Field>

            <Field id="engine" label="Número de Motor">
              <input
                id="engine"
                required
                autoCapitalize="characters"
                value={engineNumber}
                onChange={(e) => setEngineNumber(e.target.value.toUpperCase())}
                placeholder="BZ150FMG-2849102"
                className={`${INPUT_CLASS} tracking-wide`}
              />
            </Field>
          </section>

          {/* --------------------- Tarjeta de propiedad (TIV) -------------------- */}
          <section className="mt-6 rounded-2xl bg-[#1A2233] p-4">
            <CardHeader
              icon={Contact}
              title="Tarjeta de Propiedad Vehicular"
              subtitle="Tarjeta de Identificación Vehicular (TIV)"
            />
            <p className="mt-3 text-xs leading-relaxed text-[#C7CEDB]">
              Sube una foto clara del anverso y reverso de la Tarjeta de
              Identificación Vehicular para contrastar con SUNARP.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <DocUpload label="Anverso" file={tivFront} onChange={setTivFront} />
              <DocUpload label="Reverso" file={tivBack} onChange={setTivBack} />
            </div>
          </section>

          {/* ------------------------------- SOAT -------------------------------- */}
          <section className="mt-4 rounded-2xl bg-[#1A2233] p-4">
            <CardHeader
              icon={ShieldPlus}
              title="Póliza SOAT Obligatoria"
              subtitle="Protección contra accidentes"
              badge={
                soatActive !== null && (
                  <span
                    className={[
                      "flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold",
                      soatActive
                        ? "bg-[#10B981]/15 text-[#10B981]"
                        : "bg-[#F59E0B]/15 text-[#F59E0B]",
                    ].join(" ")}
                  >
                    <CircleCheck className="h-3 w-3" aria-hidden="true" />
                    {soatActive ? "Activa" : "Vencida"}
                  </span>
                )
              }
            />

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
              <Field id="soatNumber" label="N° Certificado SOAT">
                <input
                  id="soatNumber"
                  required
                  value={soatNumber}
                  onChange={(e) => setSoatNumber(e.target.value.toUpperCase())}
                  placeholder="#8931-4A-2024"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field id="soatExpiry" label="Vencimiento">
                <input
                  id="soatExpiry"
                  type="date"
                  required
                  value={soatExpiry}
                  onChange={(e) => setSoatExpiry(e.target.value)}
                  className={[
                    INPUT_CLASS,
                    "[color-scheme:dark]",
                    soatActive === null
                      ? ""
                      : soatActive
                        ? "!text-[#10B981]"
                        : "!text-[#F59E0B]",
                  ].join(" ")}
                />
              </Field>

              <div className="col-span-2">
                <Field id="insurer" label="Compañía Aseguradora">
                  <input
                    id="insurer"
                    required
                    list="insurers"
                    value={insurer}
                    onChange={(e) => setInsurer(e.target.value)}
                    placeholder="La Positiva Seguros"
                    className={INPUT_CLASS}
                  />
                  <datalist id="insurers">
                    {INSURERS.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                </Field>
              </div>
            </div>
          </section>
        </div>

        {/* ------------------------------ Barra inferior ----------------------------- */}
        <footer className="sticky bottom-0 border-t border-[#252E42] bg-[#111827]/95 px-4 py-3 backdrop-blur">
          <button
            type="submit"
            formNoValidate
            className="w-full rounded-xl bg-[#10B981] py-3.5 text-sm font-bold text-[#111827] shadow-lg shadow-[#10B981]/25 transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
          >
            Finalizar
          </button>
        </footer>
      </form>
    </main>
  );
}

// export default function VehicleForm() {
//   return (
//     <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-[#111827] px-5 py-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
//       <section className="w-full max-w-md rounded-xl bg-[#1A2233] p-6">
//         <h1 className="text-xl font-bold">Datos del vehículo</h1>
//         <p className="mt-2 text-sm text-[#C7CEDB]">
//           Completa la información de tu vehículo para finalizar el registro.
//         </p>
//         <Link
//           to="/registro/chofer/identidad"
//           className="mt-6 block text-center text-sm font-semibold text-[#06B6D4]"
//         >
//           Volver a identidad
//         </Link>
//       </section>
//     </main>
//   )
// }