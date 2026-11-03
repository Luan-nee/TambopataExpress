import { Link } from 'react-router-dom'

import { useEffect, useRef, useState } from "react";
import type {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bike,
  BusFront,
  CalendarCheck,
  CalendarDays,
  Car,
  Check,
  CircleCheck,
  CircleHelp,
  Contact,
  Eye,
  EyeOff,
  ImagePlus,
  LocateFixed,
  Lock,
  Mail,
  MessageSquareText,
  Siren,
  Smartphone,
  Timer,
  User,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

export type LicenseCategory = "B-IIc" | "B-IIb";

export interface RegisterPayload {
  phone: string;
  otp: string;
  dni: string;
  fullName: string;
  email: string;
  password: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  licenseNumber: string;
  licenseCategory: LicenseCategory;
  licenseExpiry: string; // ISO yyyy-mm-dd
  licenseFront: File | null;
  licenseBack: File | null;
}

interface RegisterScreenProps {
  /** Avance del registro, de 0 a 100. */
  progress?: number;
  onSubmit?: (payload: RegisterPayload) => void;
  onSendSms?: (phone: string) => void;
  onBack?: () => void;
  onHelp?: () => void;
  termsHref?: string;
  privacyHref?: string;
}

interface CategoryOption {
  id: LicenseCategory;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

/* -------------------------------------------------------------------------- */
/*  Datos y utilidades                                                        */
/* -------------------------------------------------------------------------- */

const CATEGORIES: CategoryOption[] = [
  {
    id: "B-IIc",
    title: "Categoría B-IIc",
    description: "Mototaxis y Motocarros con pasajeros",
    icon: BusFront,
    iconColor: "text-[#111827]",
  },
  {
    id: "B-IIb",
    title: "Categoría B-IIb",
    description: "Motos lineales (Reparto y Delivery)",
    icon: Bike,
    iconColor: "text-[#06B6D4]",
  },
];

const RELATIONSHIPS = ["Madre", "Padre", "Hermano/a", "Esposo/a", "Hijo/a", "Otro"];

const OTP_LENGTH = 4;
const RESEND_SECONDS = 60;

const INPUT_CLASS =
  "min-w-0 flex-1 bg-transparent text-sm font-medium text-white placeholder:text-[#4B5563] focus:outline-none";
const FIELD_BOX_CLASS =
  "flex items-center gap-3 rounded-xl bg-[#252E42] px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#10B981]";

function formatTimer(total: number) {
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExt(file: File) {
  const ext = file.name.split(".").pop()?.toUpperCase() ?? "IMG";
  return ext === "JPEG" ? "JPG" : ext;
}

function licenseStatus(iso: string): { label: string; valid: boolean } | null {
  if (!iso) return null;
  const expiry = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return null;
  const diff = expiry.getTime() - Date.now();
  if (diff <= 0) return { label: "Vencida", valid: false };
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  if (years < 1) return { label: "Vigente", valid: true };
  return { label: `Vigente (+${years} ${years === 1 ? "año" : "años"})`, valid: true };
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes de layout                                                  */
/* -------------------------------------------------------------------------- */

function Card({ children }: { children: ReactNode }) {
  return <section className="rounded-2xl bg-[#1A2233] p-4">{children}</section>;
}

function Field({
  id,
  label,
  icon: Icon,
  trailing,
  hint,
  children,
}: {
  id: string;
  label: ReactNode;
  icon?: LucideIcon;
  trailing?: ReactNode;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-[#C7CEDB]">
        {label}
      </label>
      <div className={FIELD_BOX_CLASS}>
        {Icon && <Icon className="h-4 w-4 shrink-0 text-[#06B6D4]" aria-hidden="true" />}
        {children}
        {trailing}
      </div>
      {hint && <p className="mt-2 text-xs text-[#9CA3AF]">{hint}</p>}
    </div>
  );
}

function TopBar({
  progress,
  onBack,
  onHelp,
}: {
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
          Registro celular
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

function SectionTitle({
  icon: Icon,
  iconColor = "text-[#10B981]",
  children,
  uppercase = true,
}: {
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  uppercase?: boolean;
}) {
  return (
    <h2
      className={[
        "flex items-center gap-2 text-sm font-bold text-[#E0E7FF]",
        uppercase ? "uppercase" : "",
      ].join(" ")}
    >
      <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/*  Subcomponentes de formulario                                              */
/* -------------------------------------------------------------------------- */

function OtpInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (index: number, digit: string) => {
    const next = [...value];
    next[index] = digit;
    onChange(next);
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!digits) return;
    e.preventDefault();
    onChange(Array.from({ length: OTP_LENGTH }, (_, i) => digits[i] ?? ""));
    refs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Dígito ${i + 1} del código`}
          className="h-14 w-full rounded-xl bg-[#252E42] text-center text-xl font-bold text-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
      ))}
    </div>
  );
}

function PhotoSlot({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <label className="relative flex cursor-pointer flex-col gap-2 rounded-xl bg-[#252E42] p-2 focus-within:ring-2 focus-within:ring-[#10B981]">
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#111827]">
        {preview ? (
          <img src={preview} alt={`Licencia - ${label}`} className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1 text-[#9CA3AF]">
            <ImagePlus className="h-6 w-6" aria-hidden="true" />
            <span className="text-[10px] font-semibold">Subir foto</span>
          </span>
        )}
        {file && (
          <CircleCheck
            className="absolute right-1.5 top-1.5 h-4 w-4 fill-[#10B981] text-[#111827]"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-1 text-[10px]">
        <span className="font-bold text-[#E0E7FF]">{label}</span>
        {file && (
          <span className="text-[#9CA3AF]">
            {fileExt(file)} • {formatBytes(file.size)}
          </span>
        )}
      </div>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pantalla principal                                                        */
/* -------------------------------------------------------------------------- */

export default function FormIdentidad({
  progress = 60,
  onSubmit,
  onSendSms,
  onBack,
  onHelp,
  termsHref = "#",
  privacyHref = "#",
}: RegisterScreenProps) {
  // Validación telefónica
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Identidad
  const [dni, setDni] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // SOS familiar
  const [emergencyName, setEmergencyName] = useState("");
  const [relationship, setRelationship] = useState(RELATIONSHIPS[0]);
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Licencia
  const [licenseNumber, setLicenseNumber] = useState("");
  const [category, setCategory] = useState<LicenseCategory>("B-IIc");
  const [expiry, setExpiry] = useState("");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [secondsLeft]);

  const dniVerified = /^\d{8}$/.test(dni);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const status = licenseStatus(expiry);

  const sendSms = () => {
    if (phone.length < 9) return;
    onSendSms?.(phone);
    setSecondsLeft(RESEND_SECONDS);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({
      phone,
      otp: otp.join(""),
      dni,
      fullName,
      email,
      password,
      emergencyName,
      emergencyRelationship: relationship,
      emergencyPhone,
      licenseNumber,
      licenseCategory: category,
      licenseExpiry: expiry,
      licenseFront: front,
      licenseBack: back,
    });
  };

  return (
    <main className="mx-auto min-h-screen w-full bg-[#111827] px-4 pb-10 pt-3 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <TopBar progress={progress} onBack={onBack} onHelp={onHelp} />

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        {/* ------------------------- Validación telefónica ------------------------- */}
        <Card>
          <SectionTitle icon={Smartphone}>Validación telefónica</SectionTitle>

          <div className="mt-4">
            <label htmlFor="phone" className="mb-2 block text-xs font-medium text-[#C7CEDB]">
              Número de Celular Móvil
            </label>
            <div className="flex gap-2">
              <span className="flex shrink-0 items-center gap-2 rounded-xl bg-[#252E42] px-4 text-sm font-bold text-white">
                <Smartphone className="h-4 w-4 text-[#06B6D4]" aria-hidden="true" />
                +51
              </span>
              <div className={`${FIELD_BOX_CLASS} flex-1 py-2.5`}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={9}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="982 411 902"
                  className={`${INPUT_CLASS} text-base`}
                />
                <button
                  type="button"
                  onClick={sendSms}
                  disabled={phone.length < 9 || secondsLeft > 0}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#10B981]/20 px-3 py-2 text-[10px] font-bold text-[#10B981] transition-colors hover:bg-[#10B981]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                  Enviar SMS
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#C7CEDB]">
                Código OTP recibido
              </span>
              {secondsLeft > 0 ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#F59E0B]">
                  <Timer className="h-3 w-3" aria-hidden="true" />
                  Reenviar en {formatTimer(secondsLeft)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={sendSms}
                  disabled={phone.length < 9}
                  className="text-[10px] font-bold text-[#F59E0B] hover:text-[#FBBF24] focus-visible:underline focus-visible:outline-none disabled:opacity-50"
                >
                  Reenviar código
                </button>
              )}
            </div>
            <OtpInput value={otp} onChange={setOtp} />
          </div>
        </Card>

        {/* ---------------------------- Identidad oficial --------------------------- */}
        <Card>
          <SectionTitle icon={Contact}>Identidad oficial</SectionTitle>

          <div className="mt-4 flex flex-col gap-4">
            <Field
              id="dni"
              label="DNI / Carné de Extranjería"
              trailing={
                dniVerified && (
                  <BadgeCheck
                    className="h-5 w-5 shrink-0 fill-[#10B981] text-[#252E42]"
                    aria-label="Documento verificado"
                  />
                )
              }
            >
              <input
                id="dni"
                inputMode="numeric"
                maxLength={12}
                required
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                placeholder="72418592"
                className={`${INPUT_CLASS} tracking-wide`}
              />
            </Field>

            <Field id="fullName" label="Nombres y Apellidos Completos">
              <input
                id="fullName"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="María Elena Torres Vargas"
                className={INPUT_CLASS}
              />
            </Field>

            <Field
              id="email"
              label="Correo Electrónico (Para facturación y notificaciones)"
              icon={Mail}
              trailing={
                emailValid && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Correo válido" />
                  </span>
                )
              }
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className={INPUT_CLASS}
              />
            </Field>

            <Field
              id="password"
              label="Contraseña de Acceso"
              icon={Lock}
              hint="Mínimo 8 caracteres, incluye letras y números"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                  className="text-[#C7CEDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
                title="Mínimo 8 caracteres, incluye letras y números"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={INPUT_CLASS}
              />
            </Field>
          </div>
        </Card>

        {/* ------------------------------ SOS familiar ------------------------------ */}
        <Card>
          <SectionTitle icon={Siren} iconColor="text-[#F59E0B]">
            SOS Familiar
          </SectionTitle>
          <p className="mt-2 text-xs leading-relaxed text-[#C7CEDB]">
            El aplicativo se comunicará inmediatamente con tu Familiar enviando
            información sobre tu situación en caso actives el botón SOS.
          </p>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label
                htmlFor="emergencyName"
                className="mb-2 block text-xs font-medium text-[#C7CEDB]"
              >
                Nombre del Contacto y Parentesco
              </label>
              <div className="flex gap-2">
                <div className={`${FIELD_BOX_CLASS} flex-1`}>
                  <UserCheck className="h-4 w-4 shrink-0 text-[#C7CEDB]" aria-hidden="true" />
                  <input
                    id="emergencyName"
                    required
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Rosa Torres"
                    className={INPUT_CLASS}
                  />
                </div>
                <select
                  aria-label="Parentesco"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="appearance-none rounded-xl bg-[#252E42] px-4 text-sm font-medium text-[#E0E7FF] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                >
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r} className="bg-[#252E42]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Field id="emergencyPhone" label="Celular del familiar" icon={LocateFixed}>
              <input
                id="emergencyPhone"
                type="tel"
                inputMode="numeric"
                maxLength={9}
                required
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="982 411 902"
                className={INPUT_CLASS}
              />
            </Field>
          </div>
        </Card>

        {/* --------------------------- Licencia de conducir -------------------------- */}
        <Card>
          <h2 className="flex items-center gap-3 text-base font-semibold text-[#E0E7FF]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#252E42] text-[#F59E0B]">
              <Car className="h-5 w-5" aria-hidden="true" />
            </span>
            Licencia de Conducir (MTC)
          </h2>

          <div className="mt-4 flex flex-col gap-4">
            <Field id="licenseNumber" label="Número de Licencia">
              <input
                id="licenseNumber"
                required
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                placeholder="B-89314421"
                className={`${INPUT_CLASS} text-base tracking-wide`}
              />
            </Field>

            {/* Categoría */}
            <div>
              <p id="category-label" className="mb-2 text-xs font-medium text-[#C7CEDB]">
                Categoría Autorizada MTC
              </p>
              <div role="radiogroup" aria-labelledby="category-label" className="flex flex-col gap-2">
                {CATEGORIES.map(({ id, title, description, icon: Icon, iconColor }) => {
                  const selected = category === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setCategory(id)}
                      className={[
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
                        selected
                          ? "bg-[#10B981]/15 ring-1 ring-[#10B981]/30"
                          : "bg-[#252E42]/60 hover:bg-[#252E42]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          selected ? "bg-[#10B981]" : "bg-[#252E42]",
                        ].join(" ")}
                      >
                        <Icon className={`h-5 w-5 ${selected ? "text-[#111827]" : iconColor}`} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={[
                            "block text-sm font-bold",
                            selected ? "text-[#10B981]" : "text-[#C7CEDB]",
                          ].join(" ")}
                        >
                          {title}
                        </span>
                        <span className="block truncate text-xs text-[#9CA3AF]">{description}</span>
                      </span>
                      {selected ? (
                        <CircleCheck
                          className="h-6 w-6 shrink-0 fill-[#10B981] text-[#111827]"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-5 w-5 shrink-0 rounded-full bg-[#252E42]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vencimiento */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label htmlFor="expiry" className="text-xs font-medium text-[#C7CEDB]">
                  Fecha de Vencimiento de Licencia DD/MM/YY
                </label>
                {status && (
                  <span
                    className={[
                      "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                      status.valid
                        ? "bg-[#10B981]/15 text-[#10B981]"
                        : "bg-[#F59E0B]/15 text-[#F59E0B]",
                    ].join(" ")}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        status.valid ? "bg-[#10B981]" : "bg-[#F59E0B]"
                      }`}
                      aria-hidden="true"
                    />
                    {status.label}
                  </span>
                )}
              </div>
              <div className={FIELD_BOX_CLASS}>
                <CalendarDays className="h-4 w-4 shrink-0 text-[#06B6D4]" aria-hidden="true" />
                <input
                  id="expiry"
                  type="date"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className={`${INPUT_CLASS} [color-scheme:dark]`}
                />
                <CalendarCheck className="h-5 w-5 shrink-0 text-[#C7CEDB]" aria-hidden="true" />
              </div>
            </div>

            {/* Fotos */}
            <div>
              <p className="mb-2 text-xs font-medium text-[#C7CEDB]">
                Fotos de Licencia (Físico o Digital)
              </p>
              <div className="grid grid-cols-2 gap-3">
                <PhotoSlot label="Anverso" file={front} onChange={setFront} />
                <PhotoSlot label="Reverso" file={back} onChange={setBack} />
              </div>
            </div>
          </div>
        </Card>

        {/* ------------------------------ Términos y CTA ----------------------------- */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#1A2233] p-3 text-xs leading-relaxed text-[#C7CEDB]">
          <input
            type="checkbox"
            required
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#4B5563] text-[#111827] transition-colors peer-checked:border-[#10B981] peer-checked:bg-[#10B981] peer-focus-visible:ring-2 peer-focus-visible:ring-[#10B981] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#1A2233]"
          >
            {accepted && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </span>
          <span>
            Acepto los{" "}
            <a href={termsHref} className="text-[#10B981] underline underline-offset-2">
              Términos de Servicio
            </a>{" "}
            y la{" "}
            <a href={privacyHref} className="text-[#10B981] underline underline-offset-2">
              Política de Privacidad
            </a>{" "}
            de Transporte Urbano y Fluvial de Puerto Maldonado.
          </span>
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3.5 text-sm font-bold text-[#111827] shadow-lg shadow-[#10B981]/25 transition-colors hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
        >
          Registrar Vehículo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </main>
  );
}

// export default function DriverIdentityForm() {
//   return (
//     <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-[#111827] px-5 py-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
//       <section className="w-full max-w-md rounded-xl bg-[#1A2233] p-6">
//         <h1 className="text-xl font-bold">Datos de identidad del chofer</h1>
//         <p className="mt-2 text-sm text-[#C7CEDB]">
//           Completa tus datos para continuar con el registro.
//         </p>
//         <Link
//           to="/registro/chofer/vehiculo"
//           className="mt-6 block rounded-xl bg-[#10B981] py-3 text-center text-sm font-bold text-[#111827]"
//         >
//           Continuar al vehículo
//         </Link>
//         <Link
//           to="/SelectRol"
//           className="mt-4 block text-center text-sm font-semibold text-[#06B6D4]"
//         >
//           Volver
//         </Link>
//       </section>
//     </main>
//   )
// }