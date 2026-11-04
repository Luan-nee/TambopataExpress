import { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Lock,
  Banknote,
  CheckCheck,
  Compass,
  AlertTriangle,
  User,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'passenger' | 'driver';
  senderLabel?: string;
  type: 'offer_initial' | 'counter_offer' | 'offer_accepted' | 'text';
  price?: string;
  timestamp: string;
  isRead?: boolean;
}

export default function NegotiationChatApp() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'passenger',
      senderLabel: 'Carlos R. • Pasajero',
      type: 'offer_initial',
      price: 'S/ 7.00',
      timestamp: '10:42 AM',
    },
    {
      id: '2',
      sender: 'driver',
      type: 'offer_initial',
      price: 'S/ 6.00',
      timestamp: '10:43 AM',
      isRead: true,
    },
    {
      id: '3',
      sender: 'passenger',
      senderLabel: 'Carlos R. • Pasajero',
      type: 'offer_accepted',
      price: 'S/ 6.00',
      timestamp: '10:44 AM',
    },
  ]);

  const [inputOffer, setInputOffer] = useState<string>('');

  const handleSendOffer = () => {
    if (!inputOffer.trim()) return;

    const formattedPrice = inputOffer.startsWith('S/') ? inputOffer : `S/ ${inputOffer}`;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'passenger',
      senderLabel: 'Carlos R. • Pasajero',
      type: 'offer_initial',
      price: formattedPrice,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputOffer('');
  };

  const handleAcceptOffer = () => {
    const latestOffer = [...messages]
      .reverse()
      .find((message) => message.sender === 'driver' && message.price);

    if (!latestOffer) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'passenger',
        senderLabel: 'Carlos R. • Pasajero',
        type: 'offer_accepted',
        price: latestOffer.price,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
    navigate('/pasajero/solicitud-aceptada')
  };

  return (
    <div
      className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] flex flex-col justify-between mx-auto relative shadow-2xl border-x border-[#1e293b]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. Header / Barra Superior */}
      <div className="bg-[#0b0f17] sticky top-0 z-30 border-b border-[#1e293b]/60">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 

              onClick={() => navigate("/pasajero/viajes")}
              className="text-[#94a3b8] hover:text-white p-1 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#1e293b] border border-[#06B6D4]/30 flex items-center justify-center text-[#10B981]">
                <User className="w-5 h-5" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#0b0f17] absolute bottom-0 right-0"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-sm text-white leading-none">Jorge Quispe</h1>
                <div className="flex items-center gap-0.5 text-[#F59E0B] text-xs font-bold">
                  <Star className="w-3 h-3 fill-current text-[#F59E0B]" />
                  <span>4.9</span>
                </div>
              </div>
              <span className="text-[11px] text-[#10B981] font-medium leading-tight block mt-0.5">
                En línea
              </span>
            </div>
          </div>

          <button className="w-9 h-9 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 flex items-center justify-center hover:bg-[#10B981]/20 transition-all">
            <Phone className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Sub-barra de ruta */}
        <div className="px-4 py-2 bg-[#111827]/80 border-t border-[#1e293b]/40 flex items-center gap-2 text-xs font-semibold text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
          <span>Plaza de Armas → Mercado Modelo</span>
        </div>
      </div>

      {/* 2. Área de Chat / Negociación */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Banner de Cifrado */}
        <div className="flex justify-center">
          <div className="bg-[#111827] border border-[#1e293b] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-[10px] text-[#94a3b8] font-medium">
              Negociación cifrada y supervisada por Tambopata Express
            </span>
          </div>
        </div>

        {/* Lista de Mensajes */}
        <div className="space-y-4 pt-2">
          {messages.map((msg) => {
            const isPassenger = msg.sender === 'passenger';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isPassenger ? 'items-start' : 'items-end'}`}
              >
                {/* Sender Label for Passenger */}
                {msg.senderLabel && (
                  <span className="text-[11px] font-semibold text-[#94a3b8] mb-1 pl-1">
                    {msg.senderLabel}
                  </span>
                )}

                {/* Message Bubbles */}
                {msg.type === 'offer_initial' && (
                  <div
                    className={`p-3.5 rounded-2xl max-w-[220px] w-full border ${
                      isPassenger
                        ? 'bg-[#111827] border-[#1e293b]'
                        : 'bg-[#1e293b]/90 border-[#334155]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] text-[#94a3b8] font-medium block">
                          Oferta inicial
                        </span>
                        <span className="text-base font-black text-[#F59E0B] tracking-tight">
                          {msg.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-[#64748b]">{msg.timestamp}</span>
                      {!isPassenger && msg.isRead && (
                        <CheckCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
                      )}
                    </div>
                  </div>
                )}

                {msg.type === 'offer_accepted' && (
                  <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-2xl max-w-[240px] w-full space-y-1 shadow-lg">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F59E0B] block">
                      OFERTA ACEPTADA
                    </span>
                    <div className="text-3xl font-black text-[#10B981] tracking-tight leading-none pt-0.5">
                      {msg.price}
                    </div>
                    <div className="text-right pt-1">
                      <span className="text-[10px] text-[#64748b]">{msg.timestamp}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Acciones de la oferta */}
      <div className="flex gap-3 bg-[#0b0f17] px-3 pb-3">
        <button
          type="button"
          onClick={() => navigate('/registro/pasajero/solicitar-transporte')}
          className="flex-1 rounded-xl border border-[#F87171] py-3 text-xs font-black uppercase tracking-wider text-[#F87171] transition-colors hover:bg-[#F87171]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F87171]"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={handleAcceptOffer}
          className="flex-1 rounded-xl bg-[#10B981] py-3 text-xs font-black uppercase tracking-wider text-[#0b0f17] shadow-md shadow-[#10B981]/20 transition-colors hover:bg-[#0d9668] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
        >
          Aceptar
        </button>
      </div>

      {/* 3. Barra Inferior de Ofertar y Menú */}
      <div className="bg-[#0b0f17] border-t border-[#1e293b] sticky bottom-0 z-30">
        <div className="p-3 flex items-center gap-3">
          {/* Input Contenedor Monto */}
          <div className="flex-1 bg-[#111827] border border-[#1e293b] rounded-xl px-3 py-2 flex items-center gap-1.5 focus-within:border-[#10B981] transition-all">
            <span className="text-[#10B981] font-bold text-sm">S/</span>
            <input
              type="text"
              placeholder="0.00"
              value={inputOffer}
              onChange={(e) => setInputOffer(e.target.value)}
              className="bg-transparent text-white font-bold text-sm outline-none w-full placeholder-[#475569]"
            />
          </div>

          {/* Botón OFERTAR */}
          <button
            onClick={handleSendOffer}
            className="bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f17] font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-md shadow-[#10B981]/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            OFERTAR
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="p-3 bg-[#111827] border-t border-[#1e293b]/60 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-[#10B981]">
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold">Viajes</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-red-400 hover:text-red-300">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-[10px] font-bold">S.O.S</span>
          </button>
        </div>
      </div>
    </div>
  );
}