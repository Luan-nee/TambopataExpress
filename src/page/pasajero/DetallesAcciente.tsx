import { useState } from 'react';
import {
  Compass,
  User,
  MapPin,
  Clock,
  Navigation,
  Activity,
  Users,
  Shield,
  FileText,
  Camera,
  ZoomIn,
  Bike,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IncidentDetail() {
  const navigate = useNavigate();
  const [evidence] = useState([
    {
      id: 1,
      title: 'Daño lateral',
      subtitle: 'Carrocería',
      url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Posición final',
      subtitle: 'En calzada',
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'SOAT y Placa',
      subtitle: 'Validación',
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop'
    }
  ]);

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
            onClick={() => navigate("/pasajero/sos")}
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
        {/* Banner Superior: Placa e Info del Registro */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#94a3b8] tracking-wide">
              PLACA: <span className="text-white">#VIAJE-8492</span>
            </span>
          </div>

          <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center text-[#10B981] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">14 Mayo 2025, 04:42 PM</p>
              <p className="text-[10px] font-medium text-[#94a3b8]">Registrado hace 2 minutos</p>
            </div>
          </div>
        </div>

        {/* Georreferencia del Siniestro */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span>Georreferencia del Siniestro</span>
            </div>
            <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded-full">
              GPS ±4m
            </span>
          </div>

          {/* Mapa con Punto de Impacto */}
          <div className="relative h-44 rounded-xl overflow-hidden border border-[#1e293b] bg-[#1e293b]">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
              alt="Georreferencia Mapa"
              className="w-full h-full object-cover opacity-80 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent pointer-events-none" />

            {/* Pin de Punto de Impacto */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#ef4444]/30 animate-ping absolute" />
                <div className="w-7 h-7 rounded-full bg-[#ef4444] border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <span className="text-[10px] font-black">!</span>
                </div>
              </div>
              <span className="bg-[#0b0f17] text-white text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border border-[#1e293b] shadow-md">
                Punto de Impacto
              </span>
            </div>
          </div>

          {/* Dirección y Coordenadas */}
          <div className="space-y-2 pt-1">
            <div>
              <p className="text-xs font-extrabold text-white">Av. León Velarde con Jr. Billinghurst</p>
              <p className="text-[10px] text-[#94a3b8]">A 120m del Mercado Modelo de Puerto Maldonado</p>
            </div>

            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-lg p-2 flex items-center justify-between text-[10px] font-medium text-[#94a3b8]">
              <span>Lat: <strong className="text-white">-12.593321</strong></span>
              <span>Long: <strong className="text-white">-69.189412</strong></span>
            </div>

            <button className="w-full bg-[#1e293b] hover:bg-[#334155] text-[#10B981] font-bold text-xs py-2.5 rounded-xl border border-[#1e293b] flex items-center justify-center gap-2 transition-colors">
              <Navigation className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Abrir Maps</span>
            </button>
          </div>
        </div>

        {/* Despacho de Auxilio y Triage */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <Activity className="w-4 h-4 text-[#F59E0B]" />
              <span>Despacho de Auxilio y Triage</span>
            </div>
            <span className="text-[10px] font-extrabold text-[#10B981]">2 Unidades</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3">
              <span className="text-[9px] font-extrabold text-[#94a3b8] uppercase tracking-wider">
                LESIONADOS
              </span>
              <p className="text-2xl font-black text-[#F59E0B] mt-1">2</p>
            </div>
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3">
              <span className="text-[9px] font-extrabold text-[#94a3b8] uppercase tracking-wider">
                FALLECIDOS
              </span>
              <p className="text-2xl font-black text-[#10B981] mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Involucrados en el Incidente */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <Users className="w-4 h-4 text-[#06B6D4]" />
            <span>Involucrados en el Incidente</span>
          </div>

          <div className="space-y-2">
            {/* Conductor */}
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">Pedro Mamani S.</p>
                    <p className="text-[10px] font-extrabold text-[#10B981]">Conductor</p>
                  </div>
                </div>
                <span className="bg-[#10B981]/20 text-[#10B981] text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-[#10B981]/30">
                  Bajaj Torito
                </span>
              </div>

              <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-2 text-xs">
                <span className="text-[#94a3b8]">Vehículo: </span>
                <span className="font-extrabold text-white">7821-4F</span>
              </div>
            </div>

            {/* Pasajero */}
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Lucía Morales T.</p>
                  <p className="text-[10px] font-extrabold text-[#94a3b8]">Pasajero</p>
                </div>
              </div>

              <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-2 flex items-center gap-2 text-xs">
                <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-[#94a3b8]">Contacto SOS: </span>
                <span className="font-medium text-white">Hermana (982-***-***)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Declaración del Siniestro */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <FileText className="w-4 h-4 text-[#F59E0B]" />
            <span>Declaración del Siniestro</span>
          </div>

          <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3">
            <p className="text-xs text-[#cbd5e1] leading-relaxed italic">
              “Impacto lateral en intersección sin semáforo por ingreso a velocidad inadecuada de moto lineal sobre calzada húmeda. El motocarro volcó parcialmente hacia la acera derecha.”
            </p>
          </div>
        </div>

        {/* Evidencias Registradas */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <Camera className="w-4 h-4 text-[#06B6D4]" />
              <span>Evidencias Registradas</span>
            </div>
            <span className="text-[10px] font-extrabold text-[#06B6D4]">3 Archivos Forenses</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {evidence.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden border border-[#1e293b] bg-[#0b0f17]">
                <div className="h-20 relative">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="p-1.5">
                  <p className="text-[10px] font-bold text-white truncate">{item.title}</p>
                  <p className="text-[9px] text-[#94a3b8] truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de Navegación Inferior */}
      <div className="bg-[#111827] border-t border-[#1e293b] p-3 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981]">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171]">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}