import { useState } from 'react';
import {
  MapPin,
  Navigation,
  Edit2,
  CheckCircle2,
  Star,
  Clock,
  X,
  Smartphone,
  CreditCard,
  DollarSign,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Offer {
  id: string;
  driverName: string;
  verified: boolean;
  rating: number;
  vehicle: string;
  plate: string;
  tripsCount: number;
  price: string;
  timeAgo: string;
  avatar: string;
}

export default function PassengerApp() {
  const navigate = useNavigate();
  const [transportType, setTransportType] = useState<'moto' | 'motocarro'>('motocarro');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'plin' | 'efectivo'>('yape');
  const [, setIsPublished] = useState<boolean>(true);
  const [acceptedOffer, setAcceptedOffer] = useState<Offer | null>(null);

  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 'off-1',
      driverName: 'Jorge Quispe',
      verified: true,
      rating: 4.9,
      vehicle: 'Motocarro Bajaj Azul',
      plate: '8931-4A',
      tripsCount: 320,
      price: 'S/ 7.00',
      timeAgo: 'Hace 2 min',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      id: 'off-2',
      driverName: 'Raúl Flores',
      verified: false,
      rating: 4.8,
      vehicle: 'Motocar Wanxin Rojo',
      plate: '4120-9B',
      tripsCount: 320,
      price: 'S/ 7.00',
      timeAgo: 'Hace 4 min',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120&h=120',
    },
  ]);

  const handleRejectOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleAcceptOffer = (offer: Offer) => {
    setAcceptedOffer(offer);
  };

  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Top Bar Header */}
      <div className="p-4 bg-[#0b0f17] sticky top-0 z-20 flex items-center justify-between border-b border-[#1e293b]/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center text-[#0b0f17] font-bold shadow-md shadow-[#10B981]/20">
            <MapPin className="w-4 h-4 fill-current text-[#0b0f17]" />
          </div>
          <div>
            <h1 className="font-black text-sm tracking-tight text-white leading-tight flex items-center gap-1">
              Tambopata
              <span className="text-[#10B981] font-semibold text-[10px] tracking-wider uppercase block">EXPRESS</span>
            </h1>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-[#10B981] p-0.5 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
            alt="Ana"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Welcome Header */}
        <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-2xl flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
              alt="Ana"
              className="w-12 h-12 rounded-full object-cover border border-[#10B981]"
            />
            <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#111827] absolute bottom-0 right-0"></span>
          </div>
          <h2 className="text-lg font-bold text-white">¡Hola, Ana!</h2>
        </div>

        {/* Transport Type Selection */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
            TIPO DE TRANSPORTE
          </span>
          <div className="grid grid-cols-2 gap-3">
            {/* Moto Lineal Option */}
            <div
              onClick={() => setTransportType('moto')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                transportType === 'moto'
                  ? 'bg-[#111827] border-[#10B981] shadow-lg shadow-[#10B981]/10'
                  : 'bg-[#111827]/60 border-[#1e293b] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">Moto Lineal</h3>
              <p className="text-[11px] text-[#94a3b8]">1 persona • Express</p>
            </div>

            {/* Motocarro Option */}
            <div
              onClick={() => setTransportType('motocarro')}
              className={`p-3.5 rounded-2xl border cursor-pointer relative transition-all ${
                transportType === 'motocarro'
                  ? 'bg-[#111827] border-[#10B981] shadow-lg shadow-[#10B981]/10'
                  : 'bg-[#111827]/60 border-[#1e293b] opacity-80 hover:opacity-100'
              }`}
            >
              {transportType === 'motocarro' && (
                <div className="absolute top-3 right-3 text-[#10B981]">
                  <CheckCircle2 className="w-5 h-5 fill-[#10B981] text-[#111827]" />
                </div>
              )}
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#10B981] text-sm">Motocarro</h3>
              <p className="text-[11px] text-[#94a3b8]">Hasta 3 pax + bultos</p>
            </div>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 space-y-3 relative">
          {/* Pickup Point */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-[#10B981] flex items-center justify-center p-1">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
              </div>
              <div>
                <span className="text-[10px] text-[#94a3b8] block">Punto de Recojo</span>
                <span className="text-xs font-bold text-white">
                  Jr. Billinghurst 412 (Plaza de Armas)
                </span>
              </div>
            </div>
            <button className="text-[#94a3b8] hover:text-white p-1">
              <Navigation className="w-4 h-4 text-[#06B6D4]" />
            </button>
          </div>

          {/* Connector Line */}
          <div className="ml-3 h-4 border-l-2 border-dashed border-[#1e293b]"></div>

          {/* Destination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              </div>
              <div>
                <span className="text-[10px] text-[#94a3b8] block">Destino</span>
                <span className="text-xs font-bold text-white">
                  Muelle Turístico Río Madre de Dios
                </span>
              </div>
            </div>
            <button className="text-[#94a3b8] hover:text-white p-1">
              <Edit2 className="w-4 h-4 text-[#94a3b8]" />
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 space-y-3">
          <span className="text-xs font-bold text-white block">Método de pago</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('yape')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'yape'
                  ? 'bg-[#06B6D4] text-[#0b0f17] shadow-md shadow-[#06B6D4]/20'
                  : 'bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Yape
            </button>

            <button
              onClick={() => setPaymentMethod('plin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'plin'
                  ? 'bg-[#06B6D4] text-[#0b0f17] shadow-md shadow-[#06B6D4]/20'
                  : 'bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Plin
            </button>

            <button
              onClick={() => setPaymentMethod('efectivo')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                paymentMethod === 'efectivo'
                  ? 'bg-[#06B6D4] text-[#0b0f17] shadow-md shadow-[#06B6D4]/20'
                  : 'bg-[#1e293b] text-[#cbd5e1] hover:bg-[#334155]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Efectivo
            </button>
          </div>
        </div>

        {/* Publish Action Button */}
        <button
          onClick={() => setIsPublished(true)}
          className="w-full py-3.5 bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f17] font-black tracking-wider text-sm uppercase rounded-2xl shadow-lg shadow-[#10B981]/25 transition-all active:scale-[0.98]"
        >
          PUBLICAR
        </button>

        {/* Real-time Bids / Offers Section */}
        <div className="space-y-3 pt-1">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping"></span>
              <h3 className="text-sm font-bold text-white">Ofertas en Tiempo Real</h3>
            </div>
            <span className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              2 Mototaxis cerca
            </span>
          </div>

          {/* Offer Cards List */}
          {offers.length === 0 ? (
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 text-center text-xs text-[#94a3b8]">
              Ningún conductor ofreció un precio inicial por el momento.
            </div>
          ) : (
            <div className="space-y-3">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 space-y-3 relative shadow-md hover:border-[#10B981]/40 transition-all"
                >
                  {/* Driver Header Information */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={offer.avatar}
                          alt={offer.driverName}
                          className="w-11 h-11 rounded-full object-cover border border-[#1e293b]"
                        />
                        <div className="bg-[#F59E0B] text-[#0b0f17] font-black text-[9px] px-1 rounded-full flex items-center gap-0.5 absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-current text-[#0b0f17]" />
                          {offer.rating}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-sm">{offer.driverName}</h4>
                          {offer.verified && (
                            <CheckCircle2 className="w-4 h-4 fill-[#10B981] text-[#111827]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#94a3b8] font-medium">
                          {offer.vehicle} • <span className="text-white font-mono">{offer.plate}</span>
                        </p>
                        <p className="text-[10px] text-[#64748b]">{offer.tripsCount} viajes realizados</p>
                      </div>
                    </div>

                    {/* Price & Time */}
                    <div className="text-right">
                      <div className="text-lg font-black text-[#10B981] tracking-tight">{offer.price}</div>
                      <div className="text-[10px] text-[#06B6D4] font-semibold flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#06B6D4]" />
                        {offer.timeAgo}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-12 gap-2 pt-1">
                    <button
                      onClick={() => handleRejectOffer(offer.id)}
                      className="col-span-3 py-2 bg-[#1e293b] hover:bg-[#334155] border border-[#1e293b] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
                    >
                      <X className="w-3.5 h-3.5 text-[#94a3b8]" />
                      Rechazar
                    </button>

                    <button 
                    onClick={() => navigate('/pasajero/negociacion')}
                    className="col-span-6 py-2 bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f17] text-xs font-extrabold rounded-xl transition-all shadow-md shadow-[#10B981]/20 active:scale-95">
                      Negociar
                    </button>

                    <button
                      onClick={() => handleAcceptOffer(offer)}
                      className="col-span-3 py-2 bg-[#1e293b] hover:bg-[#06B6D4]/20 border border-[#06B6D4]/40 text-white text-xs font-extrabold rounded-xl transition-all active:scale-95"
                    >
                      ACEPTAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-3 bg-[#111827] border-t border-[#1e293b] flex items-center justify-around z-20">
        <button className="flex flex-col items-center gap-1 text-[#10B981]">
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-red-400 hover:text-red-300">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>

      {/* Acceptance Modal Simulation */}
      {acceptedOffer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#10B981] rounded-2xl w-full max-w-xs p-5 space-y-3 text-center">
            <div className="w-12 h-12 bg-[#10B981]/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">¡Viaje Aceptado!</h3>
            <p className="text-xs text-[#94a3b8]">
              <strong className="text-white">{acceptedOffer.driverName}</strong> está en camino a tu punto de recojo en su <span className="text-[#10B981] font-semibold">{acceptedOffer.vehicle}</span>.
            </p>
            <button
              onClick={() => setAcceptedOffer(null)}
              className="w-full py-2 bg-[#10B981] text-[#0b0f17] font-bold text-xs rounded-xl"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}