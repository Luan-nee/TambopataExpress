import {
  Compass,
  AlertTriangle,
  Bike,
  Star,
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Fingerprint,
  Calendar,
  Clock,
  Smile,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverProfileApp() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Header de App */}
      <div className="bg-[#0b0f17] sticky top-0 z-30 p-4 border-b border-[#1e293b]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/pasajero/solicitud-aceptada")}
            aria-label="Volver"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#94a3b8] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-[#0b0f17] font-black shadow-md shadow-[#10B981]/20">
            <Compass className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-[#10B981] leading-none">
              TAMBOPATA
            </span>
            <span className="text-[10px] font-bold text-white tracking-widest leading-none">
              EXPRESS
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-[#1e293b] border border-[#06B6D4]/40 flex items-center justify-center text-[#10B981] overflow-hidden">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* 2. Tarjeta Perfil del Conductor */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-start gap-3">
            {/* Avatar con Badge verificado */}
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Carlos Alberto Ramos Peña"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#10B981]"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#0b0f17] rounded-full p-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] fill-[#10B981] stroke-[#0b0f17]" />
              </div>
            </div>

            {/* Info Principal */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  ACTIVO • ONLINE
                </span>
                <span className="bg-[#F59E0B]/15 text-[#F59E0B] text-[10px] font-extrabold px-2 py-0.5 rounded-md font-mono">
                  ID #TX-4829
                </span>
              </div>

              <h2 className="text-base font-extrabold text-white leading-tight">
                Carlos Alberto Ramos Peña
              </h2>

              <p className="text-[11px] text-[#94a3b8] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                Conductor desde Marzo 2023
              </p>

              <div className="flex items-center gap-2 pt-0.5">
                <span className="bg-[#1e293b] text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                  4.92 <span className="text-[#94a3b8] font-normal text-[10px]">(1,280)</span>
                </span>

                <span className="bg-[#1e293b] text-[#10B981] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  1,420 <span className="text-white font-normal text-[10px]">viajes</span>
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas Clave */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1e293b] text-center">
            <div className="space-y-0.5">
              <div className="text-base font-black text-[#10B981]">99.4%</div>
              <div className="text-[10px] text-[#94a3b8] font-medium">Puntualidad</div>
            </div>
            <div className="space-y-0.5 border-x border-[#1e293b]">
              <div className="text-base font-black text-[#10B981]">0</div>
              <div className="text-[10px] text-[#94a3b8] font-medium">Incidentes</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-base font-black text-[#F59E0B]">98%</div>
              <div className="text-[10px] text-[#94a3b8] font-medium">Trato Cordial</div>
            </div>
          </div>
        </div>

        {/* 3. Verificación Oficial Tambopata */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white font-black text-sm">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <h3>Verificación Oficial Tambopata</h3>
            </div>
            <span className="text-[10px] font-black text-[#10B981] tracking-wider uppercase">
              100% VALIDADO
            </span>
          </div>

          {/* Tarjeta 1: Antecedentes */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">
                  Antecedentes Policiales y Judiciales
                </h4>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  Auditado por la PNP Región Madre de Dios y Poder Judicial. Sin antecedentes penales ni registros de agresión.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-0.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Limpio
            </span>
          </div>

          {/* Tarjeta 2: Licencia MTC */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">
                  Licencia MTC Categoría B-II-C
                </h4>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  N° <strong className="text-white font-mono">B-II-C 4829104</strong> • Apta para transporte público de pasajeros en motocarro y moto lineal. Expira Nov 2027.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-0.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Vigente
            </span>
          </div>

          {/* Tarjeta 3: Identidad Biométrica RENIEC */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">
                  Identidad Biométrica RENIEC
                </h4>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  DNI contrastado biométricamente en base Tambopata Express frente a suplantaciones.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-0.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cotejado
            </span>
          </div>
        </div>

        {/* 4. Vehículo Principal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-black text-sm">Vehículo Principal</h3>
            <span className="bg-[#10B981] text-[#0b0f17] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              ACTUALMENTE EN USO
            </span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
            {/* Imagen del vehículo con Overlays */}
            <div className="relative h-44 w-full">
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80"
                alt="Motocarro Bajaj"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent"></div>

              {/* Placa Badge */}
              <div className="absolute top-3 left-3 bg-[#0b0f17]/90 border border-[#1e293b] px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-black">
                <span className="text-[#94a3b8] text-[10px]">PLACA:</span>
                <span className="text-[#10B981] font-mono tracking-wider">4521-7B</span>
              </div>

              {/* Capacidad */}
              <div className="absolute bottom-3 right-3 bg-[#0b0f17]/90 border border-[#1e293b] px-3 py-1.5 rounded-xl text-right">
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] block font-bold">
                  Capacidad
                </span>
                <span className="text-xs font-extrabold text-[#10B981]">
                  3 Pasajeros
                </span>
              </div>

              {/* Título sobre la imagen */}
              <div className="absolute bottom-3 left-3 space-y-0.5">
                <span className="text-[10px] text-[#F59E0B] font-bold block">
                  Bajaj Torito RE 205cc • 2023
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  Azul Noche / Franja Esmeralda
                </h4>
              </div>
            </div>

            {/* Documentación del Vehículo */}
            <div className="p-3.5 space-y-3 bg-[#111827]">
              <div className="grid grid-cols-2 gap-2.5">
                {/* SOAT */}
                <div className="bg-[#1e293b]/60 border border-[#334155]/60 rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-[#94a3b8]">
                      SOAT La Positiva
                    </div>
                    <div className="text-[11px] font-extrabold text-[#10B981]">
                      Vigente Dic 2025
                    </div>
                  </div>
                </div>

                {/* Tarjeta Propiedad */}
                <div className="bg-[#1e293b]/60 border border-[#334155]/60 rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-[#94a3b8]">
                      Tarjeta Propiedad
                    </div>
                    <div className="text-[11px] font-extrabold text-white">
                      Titular Validado
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#94a3b8] font-mono pt-1">
                Serie Motor: <span className="text-white">BJ205-***892</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Métricas de Conducción */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-black text-sm">Métricas de Conducción</h3>
            <span className="text-[10px] text-[#94a3b8]">Últimos 6 meses</span>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 space-y-4 shadow-xl">
            {/* Barra 1: Llegada Puntual */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Llegada Puntual al Punto de Recojo</span>
                </div>
                <span className="font-extrabold text-[#10B981]">99.4%</span>
              </div>
              <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] rounded-full"
                  style={{ width: '99.4%' }}
                ></div>
              </div>
            </div>

            {/* Barra 2: Trato Cordial */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Smile className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Trato Cordial y Guía Local</span>
                </div>
                <span className="font-extrabold text-[#F59E0B]">98.1%</span>
              </div>
              <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] rounded-full"
                  style={{ width: '98.1%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Barra de Navegación Inferior */}
      <div className="bg-[#111827] border-t border-[#1e293b] p-3 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#10B981]">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171] hover:text-red-300">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}