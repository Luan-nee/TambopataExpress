import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  AlertTriangle,
  Bike,
  User,
  MapPin,
  Map,
  ArrowRight,
  Droplet,
  ShieldAlert
} from 'lucide-react';

export default function ReportsApp() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = [
    { name: 'Todos', count: 8 },
    { name: 'En Atención', count: 3 },
    { name: 'Vía Bloqueada', count: 2 },
    { name: 'Resueltos', count: 3 },
  ];

  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Header de App */}
      <div className="bg-[#0b0f17] sticky top-0 z-30 p-4 border-b border-[#1e293b]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        {/* 2. Banner Principal REPORTAR */}
        <button
          type="button"
          onClick={() => navigate('/pasajero/reportar-accidente')}
          className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#b91c1c] p-4 text-left text-white shadow-xl flex items-center justify-between cursor-pointer hover:opacity-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center shrink-0 border border-white/10">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <span className="text-lg font-black tracking-wide">REPORTAR</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 shadow-inner">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </button>

        {/* 3. Filtros y Título ÚLTIMOS REPORTES */}
        <div className="space-y-3">
          <div className="border-b border-white/20 pb-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Últimos reportes
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
            {filters.map((f) => {
              const isActive = activeFilter === f.name;
              return (
                <button
                  key={f.name}
                  onClick={() => setActiveFilter(f.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#10B981] text-[#0b0f17] shadow-md shadow-[#10B981]/20'
                      : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:border-[#06B6D4]/50'
                  }`}
                >
                  {f.name} ({f.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Lista de Reportes */}
        <div className="space-y-4">
          {/* Tarjeta de Reporte 1 */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#dc2626]/20 text-[#f87171] text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse"></span>
                Hace 8 min
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-white leading-snug">
                Colisión Motocarro vs. Camión de Carga
              </h3>
              <p className="text-xs text-[#94a3b8] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                Av. León Velarde con Jr. Billinghurst
              </p>
            </div>

            {/* Cuadro de Alerta Interno */}
            <div className="bg-[#0b0f17]/60 border border-[#1e293b] rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#cbd5e1]">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Tráfico detenido en carril derecho</span>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              <button className="col-span-3 bg-[#1e293b]/80 border border-[#334155]/60 hover:bg-[#1e293b] text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                <Map className="w-3.5 h-3.5 text-[#06B6D4]" />
                Ver en Mapa
              </button>
              <button 
                onClick={() => navigate('/pasajero/detalles-accidente')}
              className="col-span-2 bg-[#991b1b] hover:bg-[#b91c1c] text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-md shadow-[#991b1b]/30">
                Ver más detalles
              </button>
            </div>
          </div>

          {/* Tarjeta de Reporte 2 */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#dc2626]/20 text-[#f87171] text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse"></span>
                Hace 24 min
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-white leading-snug">
                Despiste de Moto Lineal por Pista Mojada
              </h3>
              <p className="text-xs text-[#94a3b8] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                Carretera Pastora km 2.4 (Sector El Triunfo)
              </p>
            </div>

            {/* Cuadro de Alerta Interno */}
            <div className="bg-[#0b0f17]/60 border border-[#1e293b] rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#cbd5e1]">
              <Droplet className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Restos de combustible en calzada. Riesgo de patinaje.</span>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              <button className="col-span-3 bg-[#1e293b]/80 border border-[#334155]/60 hover:bg-[#1e293b] text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                <Map className="w-3.5 h-3.5 text-[#06B6D4]" />
                Ver en Mapa
              </button>
              <button 
                onClick={() => navigate('/pasajero/detalles-accidente')}
              className="col-span-2 bg-[#991b1b] hover:bg-[#b91c1c] text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-md shadow-[#991b1b]/30">
                Ver más detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Barra de Navegación Inferior */}
      <div className="bg-[#111827] border-t border-[#1e293b] p-3 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981]">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171]">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}