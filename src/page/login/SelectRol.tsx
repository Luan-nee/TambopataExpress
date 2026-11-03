import { useState } from "react";
import {
  Bike,
  BusFront,
  ChevronRight,
  CircleCheck,
  Database,
  Satellite,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type UserRole = "passenger" | "driver";

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

interface WelcomeScreenProps {
  onContinue?: (role: UserRole) => void;
  onLogin?: () => void;
  version?: string;
}

/* -------------------------------------------------------------------------- */
/*  Datos                                                                     */
/* -------------------------------------------------------------------------- */

const ROLES: RoleOption[] = [
  {
    id: "passenger",
    title: "Quiero Viajar",
    subtitle: "Pasajero",
    description:
      "Pide mototaxis con tarifa justa negociable, comparte tu ruta en vivo y paga al instante con Yape, Plin o Efectivo.",
    icon: BusFront,
  },
  {
    id: "driver",
    title: "Quiero Conducir",
    subtitle: "Chofer / Mototaxista",
    description:
      "Gana más con comisión ultra baja, pagos directos a tu Yape sin retenciones y botón de auxilio SOS en ruta 24 horas.",
    icon: Bike,
  },
];

const TRUST_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Database, label: "Datos taximoto_db" },
  { icon: ShieldCheck, label: "Validación PNP / Reniec" },
  { icon: Satellite, label: "Monitoreo Satelital" },
];

/* -------------------------------------------------------------------------- */
/*  Subcomponentes                                                            */
/* -------------------------------------------------------------------------- */

function Logo() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2233] ring-1 ring-white/10">
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
        {/* Pin */}
        <path
          d="M24 4C15.7 4 9 10.5 9 18.6 9 29 24 44 24 44s15-15 15-25.4C39 10.5 32.3 4 24 4Z"
          fill="#F8FAFC"
        />
        {/* Trazo de la moto / ruta */}
        <path
          d="M15 22c3-6 9-8 17-5-4 0-6 2-7 4 3-1 6 0 8 2-6-1-10 0-18-1Z"
          fill="#F59E0B"
        />
        <circle cx="24" cy="19" r="2.2" fill="#111827" />
      </svg>
    </div>
  );
}

interface RoleCardProps {
  option: RoleOption;
  selected: boolean;
  onSelect: (id: UserRole) => void;
}

function RoleCard({ option, selected, onSelect }: RoleCardProps) {
  const { id, title, subtitle, description, icon: Icon } = option;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={[
        "relative w-full rounded-xl border p-4 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]",
        selected
          ? "border-[#10B981]/60 bg-[#1A2233]"
          : "border-transparent bg-[#1A2233]/70 hover:bg-[#1A2233]",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            selected
              ? "bg-[#10B981]/90 text-[#111827]"
              : "bg-[#252E42] text-[#F59E0B]",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1 pr-7">
          <p className="text-sm font-bold text-white">{title}</p>
          <p
            className={[
              "text-xs font-semibold",
              selected ? "text-[#10B981]" : "text-[#C7CEDB]",
            ].join(" ")}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF]">{description}</p>

      {selected && (
        <CircleCheck
          className="absolute right-4 top-4 h-6 w-6 fill-[#10B981] text-[#111827]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function SelectRol({
  onContinue,
  onLogin,
  version = "Madre de Dios Conectada • V.3.2.0",
}: WelcomeScreenProps) {
  const [role, setRole] = useState<UserRole>("passenger");

  return (
    <main className="mx-auto flex min-h-screen w-full flex-col bg-[#111827] px-5 py-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      {/* Cabecera */}
      <header className="flex flex-col items-center text-center">
        <Logo />

        <h1 className="mt-8 text-xs font-semibold tracking-wide text-[#E0E7FF]">
          TAMBOPATA <span className="text-[#F59E0B]">EXPRESS</span>
        </h1>

        <p className="mt-4 text-sm font-bold text-white">
          Muévete rápido y seguro por <span className="text-[#10B981]">la selva</span>
        </p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#C7CEDB]">
          La primera app de mototaxis y motos lineales con tarifa justa y
          seguridad satelital 24/7 en Tambopata.
        </p>
      </header>

      {/* Selección de perfil */}
      <section
        role="radiogroup"
        aria-label="Selecciona tu perfil"
        className="mt-8 flex flex-col gap-3"
      >
        {ROLES.map((option) => (
          <RoleCard
            key={option.id}
            option={option}
            selected={role === option.id}
            onSelect={setRole}
          />
        ))}
      </section>

      <p className="mt-8 text-center text-xs leading-relaxed text-[#9CA3AF]">
        ¿Prefieres cambiar de perfil luego? Podrás alternarlo desde tu cuenta en
        cualquier momento.
      </p>

      {/* CTA principal */}
      <button
        type="button"
        onClick={() => onContinue?.(role)}
        className="mt-5 w-full rounded-xl bg-[#10B981] py-3 text-sm font-bold text-[#111827] transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
      >
        Continuar
      </button>

      {/* Login */}
      <div className="mt-5 rounded-lg bg-[#1A2233]/50 py-3 text-center text-xs text-[#C7CEDB]">
        ¿Ya tienes una cuenta registrada?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="inline-flex items-center font-semibold text-[#06B6D4] hover:text-[#22D3EE] focus-visible:underline focus-visible:outline-none"
        >
          Iniciar Sesión
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Confianza / seguridad */}
      <footer className="mt-auto pt-8">
        <ul className="flex flex-col items-center gap-1.5">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <Icon className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-[10px] text-[#4B5563]">{version}</p>
      </footer>
    </main>
  );
}