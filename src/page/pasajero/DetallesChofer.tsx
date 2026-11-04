import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Compass,
  AlertTriangle,
  ChevronRight,
  Phone,
  Share2,
  Bike,
  Star,
  User,
  KeyRound,
  Banknote,
  MapPin
} from 'lucide-react';

export default function RealTimeTransportTrackingApp() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState<number>(84); // 1 min 24 seg
  const [showDriverDetails, setShowDriverDetails] = useState<boolean>(false);

  // Timer countdown simulation
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins} min. ${secs < 10 ? '0' : ''}${secs} seg.`;
  };

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

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* 2. Banner de estado */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-black text-white tracking-tight leading-snug">
              ¡Tu transporte está en camino!
            </h2>
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                LLEGADA EST.
              </span>
              <div className="text-xl font-black text-[#10B981]">3 – 5 min</div>
            </div>
            <div className="text-xs font-semibold text-[#94a3b8] bg-[#1e293b]/70 px-3 py-1.5 rounded-lg border border-[#334155]/50">
              ~850 metros
            </div>
          </div>
        </div>

        {/* 3. Tarjeta de datos del Vehículo */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block">
                VEHÍCULO
              </span>
              <h3 className="text-base font-extrabold text-white">Bajaj Torito 4T Max</h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                <strong className="text-[#F59E0B]">MARCA:</strong> Bajaj -{' '}
                <strong className="text-[#F59E0B]">MODELO:</strong> Torito 205cc
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block">
                PLACA
              </span>
              <div className="bg-[#0b0f17] border border-[#1e293b] text-white text-sm font-black px-3 py-1 rounded-lg mt-0.5 tracking-wider font-mono">
                7821 - 4F
              </div>
            </div>
          </div>

          {/* Bloque PIN & Tarifa Fija */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-[#1e293b]/60 border border-[#334155]/60 rounded-xl p-3 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#06B6D4]">
                <KeyRound className="w-3 h-3" />
                <span>PIN DE ABORDAJE</span>
              </div>
              <div className="text-2xl font-black text-[#10B981] font-mono tracking-widest pt-0.5">
                4892
              </div>
              <p className="text-[10px] text-[#94a3b8]">Díctalo al conductor</p>
            </div>

            <div className="bg-[#1e293b]/60 border border-[#334155]/60 rounded-xl p-3 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                <Banknote className="w-3 h-3" />
                <span>TARIFA FIJA</span>
              </div>
              <div className="text-2xl font-black text-white pt-0.5">S/ 7.00</div>
              <p className="text-[10px] text-[#06B6D4] font-semibold">Yape / Efectivo</p>
            </div>
          </div>

          {/* 4. Información del Conductor */}
          <div className="bg-[#0b0f17]/80 border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Pedro Mendoza Q."
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#10B981]"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-[#0b0f17] rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Pedro Mendoza Q.</h4>
                <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mt-0.5">
                  <span className="flex items-center font-bold text-[#F59E0B]">
                    <Star className="w-3.5 h-3.5 fill-current text-[#F59E0B] mr-0.5" />
                    4.9
                  </span>
                  <span>·</span>
                  <span>1,240 viajes</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/pasajero/datos-chofer')
                setShowDriverDetails(!showDriverDetails)
              }}
              className="bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f17] font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 transition-colors shadow-md shadow-[#10B981]/20"
            >
              <span>Ver más información</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Modal / Desplegable de información adicional del conductor */}
          {showDriverDetails && (
            <div className="bg-[#0b0f17] border border-[#06B6D4]/30 rounded-xl p-3 text-xs text-[#94a3b8] space-y-1.5 animate-fadeIn">
              <div className="flex justify-between">
                <span>Vehículo verificado:</span>
                <span className="text-[#10B981] font-bold">Sí (Conductor Oficial)</span>
              </div>
              <div className="flex justify-between">
                <span>Antecedentes:</span>
                <span className="text-white font-medium">Verificados PNP</span>
              </div>
            </div>
          )}

          {/* Acciones rápidas (Llamar y Compartir) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button className="bg-[#1e293b]/80 hover:bg-[#1e293b] border border-[#334155] rounded-xl py-2.5 flex flex-col items-center justify-center text-xs font-semibold text-white gap-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <span>Llamar</span>
            </button>

            <button className="bg-[#1e293b]/80 hover:bg-[#1e293b] border border-[#334155] rounded-xl py-2.5 flex flex-col items-center justify-center text-xs font-semibold text-white gap-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* 5. Ubicación (Ruta) */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block">
            UBICACIÓN
          </span>

          <div className="space-y-4 relative pl-1">
            {/* Línea conectora vertical */}
            <div className="absolute left-[9px] top-[18px] bottom-[18px] w-[2px] bg-[#1e293b]"></div>

            {/* Punto de Recojo */}
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-5 h-5 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">
                  PUNTO DE RECOJO
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  Jr. Billinghurst 412
                </span>
              </div>
            </div>

            {/* Destino */}
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-5 h-5 rounded-full bg-[#F59E0B]/20 border-2 border-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-[#F59E0B]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider block">
                  DESTINO
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  Muelle Turístico Río Madre de Dios
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Botones de Acción de Pie */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button className="bg-[#450a0a] hover:bg-[#7f1d1d] text-[#fca5a5] border border-[#7f1d1d] font-bold text-xs py-3 rounded-xl transition-colors shadow-md">
            Reportar
          </button>
          <button className="bg-[#1e293b] hover:bg-[#334155] text-slate-200 border border-[#334155] font-bold text-xs py-3 rounded-xl transition-colors shadow-md">
            Cancelar (primeros 2 min)
          </button>
        </div>

        {/* 7. Sección de Tiempo Restante */}
        <div className="text-center space-y-1.5 pt-2 pb-1">
          <button className="text-xs text-[#fca5a5]/90 hover:text-[#fca5a5] font-semibold underline underline-offset-4">
            Cancelar solicitud de viaje
          </button>
          <p className="text-[10px] text-[#94a3b8]">
            Cancelación 100% gratuita durante los primeros 2 min de asignación
          </p>
          <div className="text-sm font-extrabold text-white pt-1">
            Tiempo restante para cancelar:{' '}
            <span className="text-[#10B981] font-mono font-black">
              {formatTimer(secondsLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* 8. Barra de Navegación Inferior */}
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