import { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  ChevronRight,
  MessageSquare,
  Info,
  CheckCircle2,
  Clock,
  Bike,
  ShieldCheck,
  User,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Trip {
  id: string;
  status: 'completado' | 'cancelado';
  statusText: string;
  vehicleType: string;
  time: string;
  price: string;
  pickup: string;
  destination: string;
  driver?: {
    name: string;
    rating: string;
    plate: string;
    paymentMethods: string;
    initials: string;
  };
  cancellationReason?: string;
}

export default function TransportStatusAndHistoryApp() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'todos' | 'completados' | 'cancelados' | 'este_mes'>('todos');
  const [showTransportDetails, setShowTransportDetails] = useState<boolean>(false);

  const trips: Trip[] = [
    {
      id: '1',
      status: 'completado',
      statusText: 'Completado',
      vehicleType: 'Mototaxi Torito Protegido',
      time: 'Hoy, 2:40 PM',
      price: 'S/ 7.00',
      pickup: 'Plaza de Armas de Puerto Maldonado',
      destination: 'Mercado Modelo 3 de Mayo',
      driver: {
        name: 'Carlos Mamani Q.',
        rating: '4.9',
        plate: '7821-4F',
        paymentMethods: 'Yape / Efectivo',
        initials: 'CM'
      }
    },
    {
      id: '2',
      status: 'completado',
      statusText: 'Completado',
      vehicleType: 'Mototaxi Torito Protegido',
      time: 'Ayer, 7:15 PM',
      price: 'S/ 14.50',
      pickup: 'Av. Tambopata c/ Jr. Tacna',
      destination: 'Aeropuerto Int. Padre Aldamiz',
      driver: {
        name: 'Jhony Huamán',
        rating: '4.9',
        plate: '9012-1M',
        paymentMethods: 'Efectivo',
        initials: 'CM'
      }
    },
    {
      id: '3',
      status: 'cancelado',
      statusText: 'Cancelado por ti',
      vehicleType: '',
      time: '24 Feb, 10:20 AM',
      price: 'S/ 0.00 (Sin cobro)',
      pickup: '',
      destination: '',
      cancellationReason: 'Motivo: Demora en asignación de chofer cercano bajo lluvia fuerte.'
    }
  ];

  const filteredTrips = trips.filter((trip) => {
    if (activeTab === 'completados') return trip.status === 'completado';
    if (activeTab === 'cancelados') return trip.status === 'cancelado';
    return true; // 'todos' y 'este_mes'
  });

  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Header / Top Bar */}
      <div className="bg-[#0b0f17] sticky top-0 z-30 p-4 border-b border-[#1e293b]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-[#0b0f17] font-black">
            <Compass className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-[#10B981] leading-none">TAMBOPATA</span>
            <span className="text-[10px] font-bold text-white tracking-widest leading-none">EXPRESS</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-[#1e293b] border border-[#06B6D4]/30 flex items-center justify-center text-[#10B981] overflow-hidden">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* 2. Active Ride Banner Card */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
              ¡Tu transporte está en camino!
            </h2>
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                LLEGA EN
              </span>
              <div className="text-xl font-black text-[#10B981]">3 – 5 min</div>
            </div>

            {/* OTP Code Display */}
            <div className="bg-[#1f293d] border border-[#334155] px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="font-mono font-black text-xl text-[#10B981] tracking-widest">
                4 8 9 2
              </span>
            </div>
          </div>

          {/* Full-width Toggle Button */}
          <button
            onClick={() => {
              setShowTransportDetails(!showTransportDetails)
              navigate('/pasajero/detalles-chofer')
            }}
            className="w-full bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f17] font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-between transition-all shadow-md shadow-[#10B981]/15 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Ver detalles del transporte</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showTransportDetails ? 'rotate-90' : ''}`} />
          </button>

          {/* Collapsible Details */}
          {showTransportDetails && (
            <div className="pt-2 border-t border-[#1e293b] space-y-2 text-xs text-[#94a3b8] animate-fadeIn">
              <div className="flex justify-between">
                <span>Vehículo:</span>
                <span className="font-semibold text-white">Mototaxi Bajaj Torito</span>
              </div>
              <div className="flex justify-between">
                <span>Conductor:</span>
                <span className="font-semibold text-white">Jorge Quispe</span>
              </div>
              <div className="flex justify-between">
                <span>Placa:</span>
                <span className="font-mono font-bold text-[#F59E0B]">8931-4A</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Trip History Section */}
        <div className="space-y-3 pt-2">
          {/* Header with Green Dot */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <h3 className="font-bold text-base text-white">Historial de viajes</h3>
          </div>

          {/* Filter Chips/Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                activeTab === 'todos'
                  ? 'bg-[#10B981] text-[#0b0f17]'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
              }`}
            >
              Todos (48)
            </button>
            <button
              onClick={() => setActiveTab('completados')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                activeTab === 'completados'
                  ? 'bg-[#10B981] text-[#0b0f17]'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
              }`}
            >
              Completados (44)
            </button>
            <button
              onClick={() => setActiveTab('cancelados')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                activeTab === 'cancelados'
                  ? 'bg-[#10B981] text-[#0b0f17]'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
              }`}
            >
              Cancelados (3)
            </button>
            <button
              onClick={() => setActiveTab('este_mes')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                activeTab === 'este_mes'
                  ? 'bg-[#10B981] text-[#0b0f17]'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
              }`}
            >
              Este Mes (12)
            </button>
          </div>

          {/* Trip Cards List */}
          <div className="space-y-3 pt-1">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-md space-y-3"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {trip.status === 'completado' ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        {trip.statusText}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#1e293b] text-[#94a3b8] border border-[#334155] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {trip.statusText}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#94a3b8] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{trip.time}</span>
                  </div>
                </div>

                {/* Status or Route */}
                {trip.status === 'completado' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 px-2.5 py-1 rounded-lg text-xs font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{trip.vehicleType}</span>
                      </div>
                      <span className="text-xl font-black text-white">{trip.price}</span>
                    </div>

                    {/* Route Details with Connecting Line */}
                    <div className="space-y-2 relative pl-1 pt-1">
                      {/* Vertical Connecting Line */}
                      <div className="absolute left-[7px] top-[14px] bottom-[14px] w-[2px] bg-[#1e293b]"></div>

                      {/* Pickup */}
                      <div className="flex items-start gap-2.5 relative z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0 mt-1"></span>
                        <div>
                          <span className="text-[10px] text-[#94a3b8] font-semibold block leading-none">
                            Punto de Recojo
                          </span>
                          <span className="text-xs font-bold text-white mt-0.5 block">
                            {trip.pickup}
                          </span>
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="flex items-start gap-2.5 relative z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0 mt-1"></span>
                        <div>
                          <span className="text-[10px] text-[#94a3b8] font-semibold block leading-none">
                            Punto de Llegada
                          </span>
                          <span className="text-xs font-bold text-white mt-0.5 block">
                            {trip.destination}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Driver Sub-card */}
                    {trip.driver && (
                      <div className="bg-[#1e293b]/60 border border-[#334155]/50 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#0b0f17] border border-[#334155] flex items-center justify-center font-bold text-xs text-[#94a3b8]">
                            {trip.driver.initials}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{trip.driver.name}</span>
                              <div className="flex items-center text-[11px] font-bold text-[#F59E0B]">
                                <Star className="w-3 h-3 fill-current text-[#F59E0B] mr-0.5" />
                                <span>{trip.driver.rating}</span>
                              </div>
                            </div>
                            <span className="text-[11px] text-[#94a3b8] block">
                              Placa: <strong className="text-white font-medium">{trip.driver.plate}</strong> • {trip.driver.paymentMethods}
                            </span>
                          </div>
                        </div>

                        <button className="w-8 h-8 rounded-lg bg-[#111827] border border-[#334155] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[#10B981] transition-all">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  /* Cancelled Card Details */
                  <div className="space-y-3 pt-1">
                    <span className="text-xs text-[#94a3b8] font-medium block">
                      {trip.price}
                    </span>

                    <div className="bg-[#1e293b]/50 border border-[#334155]/40 rounded-xl p-3 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#94a3b8] font-medium leading-relaxed">
                        {trip.cancellationReason}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Navigation Bar */}
      <div className="bg-[#111827] border-t border-[#1e293b] p-3 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#10B981]">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button 
          onClick={() => navigate('/pasajero/sos')}
        className="flex flex-col items-center gap-1 text-[#f87171] hover:text-red-300">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}