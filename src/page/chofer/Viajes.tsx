import { useState } from 'react';
import {
  Compass,
  User,
  Clock,
  MessageSquare,
  Bike,
  ShieldAlert,
  Radio,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TripHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('todos');

  const trips = [
    {
      id: 1,
      status: 'Completado',
      statusColor: '#10B981',
      vehicleType: 'Mototaxi Torito Protegido',
      time: 'Hoy, 2:40 PM',
      price: 'S/ 7.00',
      pickup: 'Plaza de Armas de Puerto Maldonado',
      destination: 'Mercado Modelo 3 de Mayo',
      driverInitials: 'CM',
      driverName: 'Carlos Mamani Q.',
      driverRating: '4.9',
      paymentMethods: 'Yape / Efectivo',
    },
    {
      id: 2,
      status: 'Completado',
      statusColor: '#10B981',
      vehicleType: 'Mototaxi Torito Protegido',
      time: 'Ayer, 7:15 PM',
      price: 'S/ 14.50',
      pickup: 'Av. Tambopata c/ Jr. Tacna',
      destination: 'Aeropuerto Int. Padre Aldamiz',
      driverInitials: 'CM',
      driverName: 'Jhony Huamán',
      driverRating: '4.9',
      paymentMethods: 'Efectivo',
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
        {/* Título de sección */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          <h1 className="text-lg font-black text-white tracking-tight">
            Historial de viajes
          </h1>
        </div>

        {/* Pestañas de Filtro */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'todos'
                ? 'bg-[#10B981] text-[#0b0f17]'
                : 'bg-[#1e293b] text-[#94a3b8] hover:text-white'
            }`}
          >
            Todos (48)
          </button>
          <button
            onClick={() => setActiveTab('completados')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'completados'
                ? 'bg-[#10B981] text-[#0b0f17]'
                : 'bg-[#1e293b] text-[#94a3b8] hover:text-white'
            }`}
          >
            Completados (44)
          </button>
          <button
            onClick={() => setActiveTab('cancelados')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'cancelados'
                ? 'bg-[#10B981] text-[#0b0f17]'
                : 'bg-[#1e293b] text-[#94a3b8] hover:text-white'
            }`}
          >
            Cancelados (3)
          </button>
          <button
            onClick={() => setActiveTab('este_mes')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'este_mes'
                ? 'bg-[#10B981] text-[#0b0f17]'
                : 'bg-[#1e293b] text-[#94a3b8] hover:text-white'
            }`}
          >
            Este Mes (12)
          </button>
        </div>

        {/* Lista de Tarjetas de Viaje */}
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3.5"
            >
              {/* Badge Estado + Fecha/Hora + Tarifa */}
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-[#10B981]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    {trip.status}
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded-md text-[10px] font-bold">
                      <Bike className="w-3 h-3" />
                      {trip.vehicleType}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <div className="flex items-center justify-end gap-1 text-[10px] font-semibold text-[#94a3b8]">
                    <Clock className="w-3 h-3 text-[#10B981]" />
                    <span>{trip.time}</span>
                  </div>
                  <p className="text-xl font-black text-white tracking-tight">
                    {trip.price}
                  </p>
                </div>
              </div>

              {/* Ruta (Recojo -> Llegada) */}
              <div className="relative pl-6 space-y-3 pt-1">
                {/* Línea conectora */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#1e293b]" />

                {/* Punto Recojo */}
                <div className="relative space-y-0.5">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#111827]" />
                  <p className="text-[10px] font-extrabold text-[#94a3b8] tracking-wider uppercase">
                    Punto de Recojo
                  </p>
                  <p className="text-xs font-bold text-white">
                    {trip.pickup}
                  </p>
                </div>

                {/* Punto Llegada */}
                <div className="relative space-y-0.5">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#111827]" />
                  <p className="text-[10px] font-extrabold text-[#94a3b8] tracking-wider uppercase">
                    Punto de Llegada
                  </p>
                  <p className="text-xs font-bold text-white">
                    {trip.destination}
                  </p>
                </div>
              </div>

              {/* Conductor y Métodos de pago */}
              <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1e293b] border border-[#1e293b] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {trip.driverInitials}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">
                        {trip.driverName}
                      </span>
                      <span className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-0.5">
                        ★ {trip.driverRating}
                      </span>
                    </div>
                    <p className="text-[10px] font-medium text-[#94a3b8]">
                      {trip.paymentMethods}
                    </p>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full bg-[#1e293b] hover:bg-[#334155] text-[#cbd5e1] flex items-center justify-center transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegación Inferior (4 Íconos exactos a la referencia) */}
      <div className="bg-[#111827] border-t border-[#1e293b] py-2.5 px-4 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#10B981]">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-extrabold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors">
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-bold">Radar</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors"
          onClick={() => navigate('/chofer/ganancias')}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-bold">Ganancias</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171] hover:text-red-400 transition-colors">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}