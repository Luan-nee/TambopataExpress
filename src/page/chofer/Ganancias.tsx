import { useState } from 'react';
import {
  Compass,
  User,
  Bike,
  ShieldAlert,
  Radio,
  Wallet,
  TrendingUp,
  Clock,
  Star,
  CloudRain,
  PieChart,
  Download,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EarningsDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('este_mes');

  const dailyEarnings = [
    { day: 'Lun', amount: 85, color: '#1e293b', isPeak: false },
    { day: 'Mar', amount: 120, color: '#1e293b', isPeak: false },
    { day: 'Mié', amount: 145, color: '#1e293b', isPeak: false },
    { day: 'Jue', amount: 160, color: '#06B6D4', isPeak: true },
    { day: 'Vie', amount: 190, color: '#10B981', isPeak: true },
    { day: 'Sáb', amount: 240, color: '#10B981', isPeak: true },
    { day: 'Dom', amount: 175, color: '#F59E0B', isPeak: true },
  ];

  const maxAmount = 260; // Max reference height

  const recentPayouts = [
    {
      id: 1,
      route: 'Plaza de Armas ⇄ Mercado Central',
      time: 'Hoy, 3:15 PM',
      method: 'Yape',
      amount: '+ S/ 7.00',
      icon: Bike,
    },
    {
      id: 2,
      route: 'Av. León Velarde ⇄ Muelle Fluvial',
      time: 'Hoy, 1:40 PM',
      method: 'Efectivo',
      amount: '+ S/ 12.00',
      icon: Bike,
    },
    {
      id: 3,
      route: 'El Triunfo ⇄ Almacén Jr. Puno (Flete)',
      time: 'Ayer, 6:00 PM',
      method: 'Plin',
      amount: '+ S/ 25.00',
      icon: Bike,
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Header Superior */}
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

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Título Mis Ganancias */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1e293b] border border-[#10B981]/30 flex items-center justify-center text-[#10B981] relative">
            <Wallet className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0b0f17]" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Mis Ganancias
          </h1>
        </div>

        {/* Filtros de Período */}
        <div className="bg-[#111827] p-1 rounded-2xl border border-[#1e293b] flex items-center justify-between text-xs font-bold">
          {['Hoy', 'Esta semana', 'Este mes', 'Histórico'].map((tab) => {
            const key = tab.toLowerCase().replace(' ', '_');
            const isActive = activeTab === key;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-2 text-center rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#1e293b] text-[#10B981] font-extrabold shadow-md'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Card Principal: Total Facturado */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 shadow-xl relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold tracking-wider text-[#94a3b8] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              TOTAL FACTURADO MAYO
            </span>
            <span className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +14.8% vs Abril
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#10B981]">S/</span>
              <span className="text-3xl font-black text-white tracking-tight">
                4,820.50
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#94a3b8]">Ganancia neta</p>
          </div>
        </div>

        {/* Rendimiento Operativo Grid */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-[#94a3b8] uppercase tracking-wider">
            Rendimiento Operativo
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Carreras Concretadas */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Bike className="w-5 h-5 text-[#10B981]" />
                <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                  +38 sem
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-white">642</p>
                <p className="text-[11px] font-semibold text-[#94a3b8]">
                  Carreras Concretadas
                </p>
              </div>
            </div>

            {/* Horas Conectado */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-1.5 py-0.5 rounded">
                  Activo
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-white">318 h</p>
                <p className="text-[11px] font-semibold text-[#94a3b8]">
                  Horas Conectado
                </p>
              </div>
            </div>

            {/* Ingreso por Viaje */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Wallet className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded">
                  Promedio
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-white">S/ 7.50</p>
                <p className="text-[11px] font-semibold text-[#94a3b8]">
                  Ingreso por Viaje
                </p>
              </div>
            </div>

            {/* Puntuación */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-[10px] font-bold text-[#94a3b8]">
                  Puntuación
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-black text-white">4.9</p>
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                </div>
                <p className="text-[11px] font-semibold text-[#94a3b8]">
                  Conductor Estrella
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingresos por Día (Diagrama de Barras Rediseñado y Corregido) */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Ingresos por Día</h3>
              <p className="text-[11px] font-medium text-[#94a3b8]">
                Picos de lluvia y alta demanda en fin de semana
              </p>
            </div>
            <div className="bg-[#1e293b] text-[#F59E0B] px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 border border-[#F59E0B]/20">
              <CloudRain className="w-3.5 h-3.5" />
              Modo Lluvia
            </div>
          </div>

          {/* Gráfico de Barras Ajustado */}
          <div className="pt-6 pb-2 px-1">
            <div className="flex items-end justify-between h-40 gap-2 border-b border-[#1e293b] pb-2">
              {dailyEarnings.map((item, idx) => {
                const heightPercent = Math.round((item.amount / maxAmount) * 100);

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group"
                  >
                    {/* Etiqueta de valor flotante */}
                    <span
                      className={`text-[10px] font-extrabold mb-1.5 transition-all ${
                        item.isPeak ? 'opacity-100 scale-100' : 'opacity-70'
                      }`}
                      style={{ color: item.isPeak ? item.color : '#94a3b8' }}
                    >
                      S/{item.amount}
                    </span>

                    {/* Barra */}
                    <div className="w-full max-w-[28px] bg-[#1e293b] rounded-t-lg relative flex items-end overflow-hidden h-full">
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 ease-out"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: item.color === '#1e293b' ? '#334155' : item.color,
                        }}
                      />
                    </div>

                    {/* Etiqueta del Día */}
                    <span
                      className={`text-[11px] font-bold mt-2 ${
                        item.isPeak ? 'text-white' : 'text-[#94a3b8]'
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Leyenda Footer */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Mejor día: <strong className="text-white">Sábado (S/ 240.00)</strong>
              </span>
              <span>Promedio: <strong className="text-white">S/ 154.20/día</strong></span>
            </div>
          </div>
        </div>

        {/* Canales de Pago Recibidos */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white">
              Canales de Pago Recibidos
            </h3>
            <PieChart className="w-4 h-4 text-[#06B6D4]" />
          </div>

          {/* Barra Proporcional */}
          <div className="h-3 w-full bg-[#1e293b] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#06B6D4]" style={{ width: '58%' }} />
            <div className="h-full bg-[#F59E0B]" style={{ width: '36%' }} />
            <div className="h-full bg-[#334155]" style={{ width: '6%' }} />
          </div>

          {/* Detalles por Método */}
          <div className="space-y-2 pt-1">
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                <div>
                  <p className="text-xs font-bold text-white">Yape / Plin Digital</p>
                  <p className="text-[10px] font-medium text-[#94a3b8]">58% de carreras</p>
                </div>
              </div>
              <p className="text-xs font-black text-[#06B6D4]">S/ 2,795.00</p>
            </div>

            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div>
                  <p className="text-xs font-bold text-white">Efectivo</p>
                  <p className="text-[10px] font-medium text-[#94a3b8]">36% de carreras</p>
                </div>
              </div>
              <p className="text-xs font-black text-[#F59E0B]">S/ 1,735.50</p>
            </div>
          </div>
        </div>

        {/* Historial de Cobros Recientes */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-[#94a3b8] uppercase tracking-wider">
              Historial de Cobros Recientes
            </h3>
            <button className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {recentPayouts.map((payout) => (
              <div
                key={payout.id}
                className="bg-[#111827] border border-[#1e293b] rounded-2xl p-3.5 flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] shrink-0">
                    <payout.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{payout.route}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8]">
                      {payout.time} •{' '}
                      <span className="text-[#10B981] font-bold">{payout.method}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black text-[#10B981]">{payout.amount}</p>
                  <p className="text-[10px] font-semibold text-[#94a3b8]">Completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Descargar Reporte */}
        <button className="w-full bg-[#1e293b] hover:bg-[#334155] border border-[#1e293b] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg">
          <Download className="w-4 h-4 text-[#10B981]" />
          Descargar reporte
        </button>
      </div>

      {/* Navegación Inferior (4 Íconos exactos a la referencia) */}
      <div className="bg-[#111827] border-t border-[#1e293b] py-2.5 px-4 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors">
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-bold">Radar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#10B981]">
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-extrabold">Ganancias</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171] hover:text-red-400 transition-colors"
          onClick={() => navigate('/chofer/sos')}
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}