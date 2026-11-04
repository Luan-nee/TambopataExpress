import { useState } from 'react';
import {
  Compass,
  User,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Shield,
  Activity,
  UserCheck,
  Ambulance,
  ShieldAlert,
  Camera,
  Upload,
  Send,
  Bike,
  Plus,
  Minus,
  X,
  Radio,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IncidentReportFormChofer() {
  const navigation = useNavigate();
  const [gravity, setGravity] = useState<'LEVE' | 'MODERADO' | 'GRAVE' | 'FATAL'>('MODERADO');
  const [hasInjured, setHasInjured] = useState(true);
  const [injuredCount, setInjuredCount] = useState(2);
  const [needsAmbulance, setNeedsAmbulance] = useState(true);
  const [needsPolice, setNeedsPolice] = useState(true);
  const [description, setDescription] = useState(
    'Ej: Motocarro fue impactado de costado por una moto lineal que ingresó a alta velocidad sin ceder el paso en el cruce mojado...'
  );

  const [images, setImages] = useState([
    {
      id: 1,
      tag: 'Daño',
      name: 'Impacto_lateral.jpg',
      url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      tag: 'Entorno',
      name: 'Cruce_Billinghurst.jpg',
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
    }
  ]);

  const removeImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

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

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* 2. Ubicación y Horario */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <MapPin className="w-4 h-4 text-[#F59E0B]" />
              <span>2. Ubicación y Horario</span>
            </div>
            <button className="text-[11px] font-bold text-[#10B981] hover:text-[#06B6D4] flex items-center gap-1 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refrescar GPS</span>
            </button>
          </div>

          {/* Mapa estático interactivo simulado */}
          <div className="relative h-36 rounded-xl overflow-hidden border border-[#1e293b] bg-[#1e293b]">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
              alt="Puerto Maldonado Map"
              className="w-full h-full object-cover opacity-70 contrast-125"
            />
            {/* Capa decorativa de mapa */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Marker central de GPS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#ef4444]/30 animate-ping absolute" />
                <div className="w-8 h-8 rounded-full bg-[#ef4444] border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>

            {/* Badges en mapa */}
            <div className="absolute bottom-2 left-2 bg-[#0b0f17]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#06B6D4] border border-[#1e293b]">
              Mercado Modelo Puerto Maldonado
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#94a3b8]">
              Dirección exacta o referencia vial
            </label>
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 text-xs text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#06B6D4] shrink-0" />
              <input
                type="text"
                defaultValue="Av. León Velarde con Jr. Billinghurst, frente a Inkafarma"
                className="bg-transparent text-white w-full outline-none text-xs font-medium"
              />
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#94a3b8]">Fecha del Siniestro</label>
              <input
                type="text"
                defaultValue="05/14/2025"
                className="w-full bg-[#0b0f17] border border-[#1e293b] rounded-xl p-2.5 text-xs text-white font-medium text-center outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#94a3b8]">Hora estimada</label>
              <input
                type="text"
                defaultValue="04:42 PM"
                className="w-full bg-[#0b0f17] border border-[#1e293b] rounded-xl p-2.5 text-xs text-white font-medium text-center outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Clasificación de Gravedad */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span>3. Clasificación de Gravedad</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* LEVE */}
            <div
              onClick={() => setGravity('LEVE')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gravity === 'LEVE'
                  ? 'bg-[#10B981]/10 border-[#10B981] shadow-lg shadow-[#10B981]/10'
                  : 'bg-[#0b0f17] border-[#1e293b] hover:border-[#10B981]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[9px] font-extrabold text-[#94a3b8]">S/ Heridos</span>
              </div>
              <p className="text-xs font-black text-white">LEVE</p>
              <p className="text-[10px] text-[#94a3b8] leading-tight mt-1">
                Roce o raspón menor, móvil operativo.
              </p>
            </div>

            {/* MODERADO */}
            <div
              onClick={() => setGravity('MODERADO')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gravity === 'MODERADO'
                  ? 'bg-[#F59E0B]/15 border-[#F59E0B] shadow-lg shadow-[#F59E0B]/20'
                  : 'bg-[#0b0f17] border-[#1e293b] hover:border-[#F59E0B]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="text-[9px] font-extrabold text-[#F59E0B]">Atención</span>
              </div>
              <p className="text-xs font-black text-white">MODERADO</p>
              <p className="text-[10px] text-[#cbd5e1] leading-tight mt-1">
                Golpes contusos, vehículo inoperativo.
              </p>
            </div>

            {/* GRAVE */}
            <div
              onClick={() => setGravity('GRAVE')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gravity === 'GRAVE'
                  ? 'bg-[#fb923c]/15 border-[#fb923c] shadow-lg shadow-[#fb923c]/20'
                  : 'bg-[#0b0f17] border-[#1e293b] hover:border-[#fb923c]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fb923c]" />
                <span className="text-[9px] font-extrabold text-[#fb923c]">Urgente</span>
              </div>
              <p className="text-xs font-black text-white">GRAVE</p>
              <p className="text-[10px] text-[#94a3b8] leading-tight mt-1">
                Fractura o sangrado, requiere ambulancia.
              </p>
            </div>

            {/* FATAL */}
            <div
              onClick={() => setGravity('FATAL')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gravity === 'FATAL'
                  ? 'bg-[#ef4444]/15 border-[#ef4444] shadow-lg shadow-[#ef4444]/20'
                  : 'bg-[#0b0f17] border-[#1e293b] hover:border-[#ef4444]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="text-[9px] font-extrabold text-[#f87171]">Crítico</span>
              </div>
              <p className="text-xs font-black text-white">FATAL</p>
              <p className="text-[10px] text-[#94a3b8] leading-tight mt-1">
                Riesgo vital inminente o deceso.
              </p>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1 pt-1">
            <label className="text-[11px] font-bold text-[#94a3b8]">
              Descripción de los hechos (colisión, vía, maniobra)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 text-xs text-[#cbd5e1] leading-relaxed outline-none focus:border-[#06B6D4] transition-colors resize-none"
            />
          </div>
        </div>

        {/* 4. Triage de Auxilio */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <Activity className="w-4 h-4 text-[#06B6D4]" />
            <span>4. Triage de Auxilio</span>
          </div>

          <div className="space-y-3">
            {/* Pregunta 1 */}
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#f87171]" />
                  <div>
                    <p className="text-xs font-extrabold text-white">¿Hay personas lesionadas?</p>
                    <p className="text-[10px] text-[#94a3b8]">Conductor, pasajeros o peatones</p>
                  </div>
                </div>

                <button
                  onClick={() => setHasInjured(!hasInjured)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                    hasInjured ? 'bg-[#10B981]' : 'bg-[#1e293b]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      hasInjured ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-contador de lesionados */}
              {hasInjured && (
                <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-2.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94a3b8]">
                    Cantidad estimada de lesionados:
                  </span>
                  <div className="flex items-center gap-3 bg-[#0b0f17] border border-[#1e293b] px-2 py-1 rounded-lg">
                    <button
                      onClick={() => setInjuredCount(Math.max(1, injuredCount - 1))}
                      className="w-5 h-5 rounded bg-[#1e293b] flex items-center justify-center text-white hover:bg-[#334155]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-[#10B981] px-1">
                      {injuredCount}
                    </span>
                    <button
                      onClick={() => setInjuredCount(injuredCount + 1)}
                      className="w-5 h-5 rounded bg-[#1e293b] flex items-center justify-center text-white hover:bg-[#334155]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pregunta 2 */}
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-[#06B6D4]" />
                <div>
                  <p className="text-xs font-extrabold text-white">¿Requiere ambulancia?</p>
                  <p className="text-[10px] text-[#94a3b8]">SAMU / Centro de Salud Tambopata</p>
                </div>
              </div>

              <button
                onClick={() => setNeedsAmbulance(!needsAmbulance)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  needsAmbulance ? 'bg-[#10B981]' : 'bg-[#1e293b]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    needsAmbulance ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Pregunta 3 */}
            <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#F59E0B]" />
                <div>
                  <p className="text-xs font-extrabold text-white">¿Requiere presencia policial?</p>
                  <p className="text-[10px] text-[#94a3b8]">Comisaría Central PNP / Tránsito</p>
                </div>
              </div>

              <button
                onClick={() => setNeedsPolice(!needsPolice)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  needsPolice ? 'bg-[#10B981]' : 'bg-[#1e293b]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    needsPolice ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Evidencias Visuales */}
        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm">
              <Camera className="w-4 h-4 text-[#10B981]" />
              <span>5. Evidencias Visuales</span>
            </div>
            <span className="text-[10px] font-extrabold text-[#94a3b8]">
              {images.length} adjuntos
            </span>
          </div>

          <p className="text-[11px] text-[#94a3b8]">
            Fotografías del impacto, placa de vehículos, cruce de calles y frenado en pista.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative h-28 rounded-xl overflow-hidden border border-[#1e293b] group"
              >
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <span className="absolute top-2 left-2 bg-[#0b0f17]/90 text-[#06B6D4] text-[9px] font-black px-2 py-0.5 rounded border border-[#1e293b]">
                  {img.tag}
                </span>

                <span className="absolute bottom-2 left-2 right-6 text-[9px] font-medium text-white truncate">
                  {img.name}
                </span>

                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Botones de Captura/Upload */}
          <div className="flex items-center gap-2 pt-2">
            <button className="flex-1 bg-[#0b0f17] border border-[#1e293b] hover:border-[#10B981]/50 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Camera className="w-4 h-4 text-[#10B981]" />
              <span>Tomar Foto con Cámara</span>
            </button>
            <button className="w-10 h-10 bg-[#0b0f17] border border-[#1e293b] hover:border-[#06B6D4]/50 text-[#06B6D4] rounded-xl flex items-center justify-center transition-colors">
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6. Botón Enviar Reporte */}
        <button 
          onClick={() => navigation('/chofer/sos')}
        className="w-full bg-[#10B981] hover:bg-[#059669] text-[#0b0f17] font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/25 transition-all active:scale-[0.98]">
          <Send className="w-5 h-5 fill-current" />
          <span className="tracking-wider text-sm">ENVIAR REPORTE</span>
        </button>
      </div>

      {/* 7. Barra de Navegación Inferior */}
      <div className="bg-[#111827] border-t border-[#1e293b] py-2.5 px-4 sticky bottom-0 z-30 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors">
          <Bike className="w-5 h-5" />
          <span className="text-[10px] font-bold">Viajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors">
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-bold">Radar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#94a3b8] hover:text-[#10B981] transition-colors"
          onClick={() => navigation('/chofer/ganancias')}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-extrabold">Ganancias</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f87171] hover:text-red-400 transition-colors"
          onClick={() => navigation('/chofer/sos')}
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">S.O.S</span>
        </button>
      </div>
    </div>
  );
}