import { useNavigate } from 'react-router-dom'

import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BusFront,
  Check,
  CircleHelp,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PersonStanding,
  Bike,
  ShieldCheck,
  Shield,
  Tag,
  User,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type LoginRole = "passenger" | "driver" | "admin";

export interface LoginPayload {
  role: LoginRole;
  email: string;
  password: string;
  remember: boolean;
}

interface RoleTab {
  id: LoginRole;
  label: string;
  hint: string;
  modeLabel: string;
  icon: LucideIcon;
  iconColor: string; // clase de color del ícono
}

interface LoginScreenProps {
  onSubmit?: (payload: LoginPayload) => void;
  onBack?: () => void;
  onHelp?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Datos                                                                     */
/* -------------------------------------------------------------------------- */

const ROLE_TABS: RoleTab[] = [
  {
    id: "passenger",
    label: "Pasajero",
    hint: "Viajes y Envíos",
    modeLabel: "Modo Pasajero Conectado",
    icon: PersonStanding,
    iconColor: "text-[#10B981]",
  },
  {
    id: "driver",
    label: "Chofer",
    hint: "Radar Carreras",
    modeLabel: "Modo Chofer Conectado",
    icon: Bike,
    iconColor: "text-[#F59E0B]",
  },
  {
    id: "admin",
    label: "Admin",
    hint: "Operaciones",
    modeLabel: "Modo Admin Conectado",
    icon: Shield,
    iconColor: "text-[#06B6D4]",
  },
];

/* -------------------------------------------------------------------------- */
/*  Subcomponentes                                                            */
/* -------------------------------------------------------------------------- */

function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="relative flex items-center justify-between py-2">
      <button
        type="button"
        onClick={() => navigate('/SelectRol')}
        aria-label="Volver"
        className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <h1 className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm font-semibold text-[#E0E7FF]">
        <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
        Iniciar Sesión
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {console.log("ayuda")}
        }
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

function BrandBadge() {
  return (
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#252E42] ring-1 ring-white/5">
        <BusFront className="h-8 w-8 text-[#10B981]" strokeWidth={2} />
      </div>
      <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#F59E0B] text-[#111827] ring-2 ring-[#111827]">
        <Zap className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      </span>
    </div>
  );
}

function RoleSelector({
  value,
  onChange,
}: {
  value: LoginRole;
  onChange: (role: LoginRole) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Tipo de perfil"
      className="grid grid-cols-3 gap-1 rounded-2xl bg-[#0B1120] p-1.5"
    >
      {ROLE_TABS.map(({ id, label, hint, icon: Icon, iconColor }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(id)}
            className={[
              "flex flex-col items-center gap-1 rounded-xl px-2 py-3 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
              selected ? "bg-[#252E42]" : "hover:bg-[#1A2233]",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-8 w-8 items-center justify-center rounded-lg",
                selected ? "bg-[#10B981]/15" : "bg-[#1A2233]",
              ].join(" ")}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </span>
            <span className="text-xs font-bold text-white">{label}</span>
            <span className="text-[10px] leading-tight text-[#9CA3AF]">
              {hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  aside?: React.ReactNode;
  icon: LucideIcon;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}

function Field({ id, label, aside, icon: Icon, trailing, children }: FieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-[#E0E7FF]">
          {label}
        </label>
        {aside}
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[#1A2233] px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#10B981]">
        <Icon className="h-4 w-4 shrink-0 text-[#C7CEDB]" aria-hidden="true" />
        {children}
        {trailing}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function Login({
  onSubmit,
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const [role, setRole] = useState<LoginRole>("passenger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const currentTab = ROLE_TABS.find((t) => t.id === role) ?? ROLE_TABS[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({ role, email, password, remember });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full flex-col bg-[#111827] px-4 pb-10 pt-3 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <TopBar />

      {/* Bienvenida */}
      <section className="mt-6 flex flex-col items-center text-center">
        <BrandBadge />

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#1A2233] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#10B981]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
          Puerto Maldonado
          <span aria-hidden="true">•</span>
          Red activa
        </span>

        <h2 className="mt-4 text-xl font-extrabold text-[#E0E7FF]">
          Bienvenido a Tambopata Express
        </h2>
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#9CA3AF]">
          Ingresa con tu correo electrónico y contraseña para acceder como
          Pasajero, Chofer o Administrador en Madre de Dios.
        </p>
      </section>

      {/* Selector de perfil */}
      <div className="mt-8">
        <RoleSelector value={role} onChange={setRole} />
      </div>

      {/* Aviso de modo */}
      <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#1A2233] p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#252E42] text-[#10B981]">
          <Tag className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white">{currentTab.modeLabel}</p>
          <p className="text-xs text-[#C7CEDB]">
            Inicia sesión unificada con tu correo electrónico y contraseña
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <Field
          id="email"
          label="Correo Electrónico"
          icon={Mail}
          aside={
            <span className="text-[10px] font-bold text-[#10B981]">
              Todos los perfiles
            </span>
          }
        >
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-[#4B5563] focus:outline-none"
          />
        </Field>

        <Field
          id="password"
          label="Contraseña de Acceso"
          icon={Lock}
          aside={
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[10px] font-bold text-[#F59E0B] hover:text-[#FBBF24] focus-visible:underline focus-visible:outline-none"
            >
              ¿Olvidaste tu contraseña?
            </button>
          }
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={showPassword}
              className="text-[#C7CEDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-[#4B5563] focus:outline-none"
          />
        </Field>

        {/* Recordar + cifrado */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#C7CEDB]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded-md border border-[#4B5563] text-[#111827] transition-colors peer-checked:border-[#10B981] peer-checked:bg-[#10B981] peer-focus-visible:ring-2 peer-focus-visible:ring-[#10B981] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#111827]"
            >
              {remember && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
            Recordar en este dispositivo
          </label>

          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#9CA3AF]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            Cifrado TLS
          </span>
        </div>

        {/* CTA */}
        <button
          type="submit"
          formNoValidate
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3.5 text-sm font-bold text-[#111827] shadow-lg shadow-[#10B981]/25 transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
        >
          Iniciar Sesión
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      {/* Divisor */}
      <div className="mt-8 flex items-center gap-3" role="separator">
        <span className="h-px flex-1 bg-[#252E42]" />
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">
          O continúa de inmediato
        </span>
        <span className="h-px flex-1 bg-[#252E42]" />
      </div>

      {/* Registro */}
      <section className="mt-6 flex flex-col items-center rounded-xl bg-[#1A2233] px-4 py-5 text-center">
        <p className="text-xs font-bold text-white">
          ¿Aún no conduces ni viajas con nosotros?
        </p>
        <p className="mt-0.5 text-xs text-[#C7CEDB]">
          Crea tu cuenta de Pasajero o afíliate como Chofer
        </p>
        <button
          type="button"
          onClick={onRegister}
          className="mt-3 rounded-lg bg-[#252E42] px-4 py-2 text-xs font-bold text-[#10B981] transition-colors hover:bg-[#2F3A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          Registrarme
        </button>
      </section>
    </main>
  );
}

// export default function Login() {
//   return (
//     <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-[#111827] px-5 py-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
//       <section className="w-full max-w-md rounded-xl bg-[#1A2233] p-6 text-center">
//         <h1 className="text-xl font-bold">Iniciar sesión</h1>
//         <p className="mt-2 text-sm text-[#C7CEDB]">
//           Aquí podrás acceder a tu cuenta de Tambopata Express.
//         </p>
//         <Link
//           to="/"
//           className="mt-6 inline-block text-sm font-semibold text-[#06B6D4] hover:text-[#22D3EE]"
//         >
//           Volver a seleccionar perfil
//         </Link>
//       </section>
//     </main>
//   )
// }