import React, { useState } from 'react';
import {
  LayoutDashboard,
  Radio,
  ShieldAlert,
  BadgeCheck,
  Wallet,
  Settings,
  RefreshCw,
  Eye,
  ChevronRight,
  AlertTriangle,
  Gavel,
  Phone,
  Ban,
  MapPin,
  Car,
  User,
  ArrowRight,
  Clock,
  type LucideIcon
} from 'lucide-react';

// Interfaces for structured data
interface Trip {
  id: string;
  type: string;
  passengerInitials: string;
  passengerName: string;
  driverName: string;
  driverPlate: string;
  driverVehicle: string;
  bidsCount?: number;
  origin: string;
  destination: string;
  price: string;
  paymentMethod: string;
  status: 'EN_CURSO' | 'NEGOCIANDO' | 'COMPLETADO' | 'CANCELADO';
}

interface ConductReport {
  id: string;
  title: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Resumen Operativo');
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Sample data matching the provided screenshot exact details
  const trips: Trip[] = [
    {
      id: '#VIA-8492',
      type: 'Motocarro',
      passengerInitials: 'LM',
      passengerName: 'Lucía Morales',
      driverName: 'Pedro Mamani',
      driverPlate: '7821-4F',
      driverVehicle: 'Torito',
      origin: 'Mercado Modelo',
      destination: 'Av. 26 de Diciembre',
      price: 'S/ 8.00',
      paymentMethod: 'Yape',
      status: 'EN_CURSO',
    },
    {
      id: '#VIA-8491',
      type: 'Moto Lineal',
      passengerInitials: 'JA',
      passengerName: 'Jorge Alarcón',
      driverName: 'Buscando Ofertas',
      driverPlate: '',
      driverVehicle: '',
      bidsCount: 3,
      origin: 'Aeropuerto PAD',
      destination: 'Hotel Cabaña Quinta',
      price: 'S/ 15.00',
      paymentMethod: 'Efectivo',
      status: 'NEGOCIANDO',
    },
    {
      id: '#VIA-8490',
      type: 'Motocarro',
      passengerInitials: 'CR',
      passengerName: 'Carla Rengifo',
      driverName: 'Raúl Huamán',
      driverPlate: '5519-2K',
      driverVehicle: 'Bajaj',
      origin: 'Puerto Fluvial Capitanía',
      destination: 'Plaza de Armas',
      price: 'S/ 6.50',
      paymentMethod: 'Plin',
      status: 'COMPLETADO',
    },
    {
      id: '#VIA-8489',
      type: 'Motocarro',
      passengerInitials: 'WS',
      passengerName: 'Wilson Salazar',
      driverName: 'César Tello',
      driverPlate: '9214-7A',
      driverVehicle: 'Torito',
      origin: 'Puente Continental',
      destination: 'Caserío El Triunfo',
      price: 'S/ 10.00',
      paymentMethod: 'Tambopata Pay',
      status: 'EN_CURSO',
    },
  ];

  const conductReports: ConductReport[] = [
    {
      id: '1',
      title: 'Cobro indebido fuera de tarifa pactada',
      details: 'Conductor: J. Delgado • Pasajero reportó sobreprecio S/ 5.00',
      severity: 'high',
    },
    {
      id: '2',
      title: 'Maniobra temeraria en Puente Continental',
      details: 'Conductor: F. Quispe • Velocidad excesiva reportada',
      severity: 'medium',
    },
    {
      id: '3',
      title: 'Cancelación de viaje sin justificación',
      details: 'Conductor: M. Paredes • Motocarro averiado',
      severity: 'low',
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filteredTrips = trips.filter((t) => {
    if (filterStatus === 'TODOS') return true;
    return t.status === filterStatus;
  });

  return (
    <div
      className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] flex font-sans antialiased selection:bg-[#10B981] selection:text-[#0b0f19]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111827] border-r border-[#1f293d] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-20">
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-[#1f293d]/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center text-[#0b0f19] font-bold text-xl shadow-lg shadow-[#10B981]/20">
              <MapPin className="w-5 h-5 fill-current text-[#0b0f19]" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white leading-tight flex items-center gap-1">
                Tambopata
                <span className="text-[#10B981] font-medium text-xs uppercase tracking-wider block">EXPRESS</span>
              </h1>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
              Centro de Control
            </div>

            <SidebarItem
              icon={LayoutDashboard}
              label="Resumen Operativo"
              active={activeMenu === 'Resumen Operativo'}
              onClick={() => setActiveMenu('Resumen Operativo')}
            />
            <SidebarItem
              icon={Radio}
              label="Monitoreo en Vivo"
              active={activeMenu === 'Monitoreo en Vivo'}
              onClick={() => setActiveMenu('Monitoreo en Vivo')}
              badge={<span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />}
            />
            <SidebarItem
              icon={ShieldAlert}
              label="Seguridad & SOS"
              active={activeMenu === 'Seguridad & SOS'}
              onClick={() => setActiveMenu('Seguridad & SOS')}
              badge={
                <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  3 SOS
                </span>
              }
            />
            <SidebarItem
              icon={BadgeCheck}
              label="Verificaciones"
              active={activeMenu === 'Verificaciones'}
              onClick={() => setActiveMenu('Verificaciones')}
              badge={
                <span className="bg-[#F59E0B] text-[#0b0f19] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  12
                </span>
              }
            />
            <SidebarItem
              icon={Wallet}
              label="Finanzas & Pagos"
              active={activeMenu === 'Finanzas & Pagos'}
              onClick={() => setActiveMenu('Finanzas & Pagos')}
            />
            <SidebarItem
              icon={Settings}
              label="Configuración"
              active={activeMenu === 'Configuración'}
              onClick={() => setActiveMenu('Configuración')}
            />
          </nav>
        </div>

        {/* Location Banner at Bottom Sidebar */}
        <div className="p-3 m-3 rounded-xl bg-[#1e293b]/50 border border-[#1f293d] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
              MADRE DE DIOS
            </span>
            <span className="bg-[#06B6D4]/20 text-[#06B6D4] text-[9px] font-bold px-1.5 py-0.5 rounded">
              Base Central
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            Puerto Maldonado, PE
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Header & Breadcrumbs */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="text-xs text-[#94a3b8] mb-1 font-medium flex items-center gap-1">
              <span>Panel Central</span>
              <ChevronRight className="w-3 h-3 text-[#64748b]" />
              <span className="text-[#10B981]">Operaciones Tambopata</span>
            </nav>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Centro de Monitoreo & Despacho Operativo
            </h2>
          </div>

          <button
            onClick={handleRefresh}
            className="self-start sm:self-auto px-4 py-2 bg-[#1e293b] hover:bg-[#334155] border border-[#1f293d] text-xs font-semibold text-white rounded-lg flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#10B981] ${refreshing ? 'animate-spin' : ''}`} />
            RECARGAR
          </button>
        </header>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Trips Card */}
          <div className="p-4 bg-[#111827] border border-[#1f293d] rounded-2xl flex justify-between items-start relative overflow-hidden group hover:border-[#10B981]/40 transition-all">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#94a3b8] uppercase">
                TRÁFICO EN RUTA
              </span>
              <h3 className="text-sm font-medium text-[#cbd5e1] mt-0.5">Viajes Activos</h3>
              <p className="text-3xl font-extrabold text-[#10B981] mt-2 tracking-tight">142</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              <Car className="w-5 h-5" />
            </div>
          </div>

          {/* Drivers Fleet Card */}
          <div className="p-4 bg-[#111827] border border-[#1f293d] rounded-2xl flex justify-between items-start relative overflow-hidden group hover:border-[#06B6D4]/40 transition-all">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#94a3b8] uppercase">
                CONDUCTORES
              </span>
              <h3 className="text-sm font-medium text-[#cbd5e1] mt-0.5">Flota</h3>
              <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">218</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* Accidents Card */}
          <div className="p-4 bg-[#111827] border border-red-500/30 rounded-2xl flex justify-between items-start relative overflow-hidden group hover:border-red-500/60 transition-all bg-gradient-to-br from-[#111827] via-[#111827] to-red-950/30">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
                  REPORTES
                </span>
              </div>
              <h3 className="text-sm font-medium text-[#cbd5e1] mt-0.5">Accidentes</h3>
              <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">2</p>
            </div>
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Revenue Card */}
          <div className="p-4 bg-[#111827] border border-[#1f293d] rounded-2xl flex justify-between items-start relative overflow-hidden group hover:border-[#F59E0B]/40 transition-all">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#94a3b8] uppercase">
                VOLUMEN TRANSACCIONAL
              </span>
              <h3 className="text-sm font-medium text-[#cbd5e1] mt-0.5">Recaudación del Día</h3>
              <p className="text-3xl font-extrabold text-[#F59E0B] mt-2 tracking-tight">
                S/ 4,892.50
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Section 1: Real-time Trips Table */}
        <section className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              <h3 className="text-base font-bold text-white">Últimos Viajes en Tiempo Real</h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Tabs */}
              <div className="flex bg-[#1e293b] p-1 rounded-xl border border-[#1f293d] text-xs font-semibold text-[#94a3b8]">
                {['TODOS', 'EN_CURSO', 'NEGOCIANDO', 'COMPLETADO'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filterStatus === status
                        ? 'bg-[#10B981] text-[#0b0f19] font-bold shadow'
                        : 'hover:text-white'
                    }`}
                  >
                    {status === 'TODOS' ? 'Todos los Estados' : status}
                  </button>
                ))}
              </div>

              <a
                href="#all-trips"
                className="text-xs font-semibold text-[#10B981] hover:underline flex items-center gap-1"
              >
                Ver todos (1,284)
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#cbd5e1] border-collapse">
              <thead>
                <tr className="border-b border-[#1f293d] text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                  <th className="py-3 px-3">CÓDIGO / SERVICIO</th>
                  <th className="py-3 px-3">PASAJERO</th>
                  <th className="py-3 px-3">CONDUCTOR & PLACA</th>
                  <th className="py-3 px-3">RUTA</th>
                  <th className="py-3 px-3">TARIFA</th>
                  <th className="py-3 px-3">ESTADO</th>
                  <th className="py-3 px-3 text-center">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f293d]/50">
                {filteredTrips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-[#1e293b]/40 transition-colors group"
                  >
                    {/* ID & Vehicle Type */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white text-xs">{trip.id}</div>
                      <div className="text-[11px] text-[#06B6D4] font-medium flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        {trip.type}
                      </div>
                    </td>

                    {/* Passenger */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1e293b] border border-[#1f293d] font-bold text-[10px] flex items-center justify-center text-[#10B981]">
                          {trip.passengerInitials}
                        </div>
                        <span className="font-semibold text-white">{trip.passengerName}</span>
                      </div>
                    </td>

                    {/* Driver & Plate */}
                    <td className="py-3.5 px-3">
                      {trip.bidsCount ? (
                        <div>
                          <span className="text-[#F59E0B] font-bold">{trip.driverName}</span>
                          <div className="text-[10px] text-[#94a3b8]">
                            {trip.bidsCount} pujas activas
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-white">{trip.driverName}</div>
                          <div className="text-[11px] text-[#94a3b8]">
                            <span className="font-mono">{trip.driverPlate}</span>{' '}
                            <span className="text-[#64748b]">({trip.driverVehicle})</span>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-3 max-w-xs">
                      <div className="font-medium text-white truncate">{trip.origin}</div>
                      <div className="text-[10px] text-[#94a3b8] flex items-center gap-1 truncate">
                        <span className="text-[#10B981]">↳</span> {trip.destination}
                      </div>
                    </td>

                    {/* Price & Payment */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#10B981]">{trip.price}</div>
                      <div className="text-[10px] text-[#94a3b8] font-medium">
                        {trip.paymentMethod}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <StatusBadge status={trip.status} />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className="p-1.5 rounded-lg bg-[#1e293b] hover:bg-[#10B981]/20 hover:text-[#10B981] text-[#94a3b8] transition-colors"
                        title="Ver detalles del viaje"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Bottom Grid (Accident Reports & Conduct Reports) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Reported Accidents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <h3 className="text-base font-bold text-white">Accidentes Reportados</h3>
            </div>

            {/* Accident Card 1 */}
            <div className="bg-[#111827] border border-red-500/30 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Jr. Lambayeque c/ Av. León Velarde
                </div>
                <span className="text-[10px] font-semibold text-[#94a3b8] bg-[#1e293b] px-2 py-0.5 rounded-md">
                  Hace 4 min
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#94a3b8] bg-[#0b0f19]/60 p-2.5 rounded-xl border border-[#1f293d]">
                <div>
                  Conductor:{' '}
                  <span className="text-white font-medium">Jorge Quispe</span>
                </div>
                <div>
                  Marca:{' '}
                  <span className="text-[#F59E0B] font-medium">Bajaj Torito</span>
                </div>
                <div>
                  Pasajero:{' '}
                  <span className="text-white font-medium">Lucía M.</span>
                </div>
                <div>
                  Placa: <span className="text-[#F59E0B] font-mono">8931-4A</span>
                </div>
              </div>

              <p className="text-xs text-[#cbd5e1] font-medium bg-[#1e293b]/40 p-2.5 rounded-xl border border-[#1f293d]/50">
                Tráfico detenido en carril derecho
              </p>

              <div className="flex justify-end">
                <button className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition-all active:scale-95">
                  Ver más detalles
                </button>
              </div>
            </div>

            {/* Incident Card 2 */}
            <div className="bg-[#111827] border border-[#F59E0B]/30 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#F59E0B] text-[#0b0f19] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    #RP-302
                  </span>
                  <span className="text-xs font-bold text-white">
                    Cobro Indebido & Desvío
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#94a3b8] bg-[#1e293b] px-2 py-0.5 rounded-md">
                  Hace 18 min
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Pasajera <strong className="text-white">María T.</strong> reportó alteración de la tarifa pactada e intento de retención de pertenencias en viaje{' '}
                <a href="#vj" className="text-[#06B6D4] font-mono hover:underline">
                  #VJ-7880
                </a>
                .
              </p>

              <div className="text-xs text-[#94a3b8]">
                Chofer: <strong className="text-white">Héctor B.</strong>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md">
                  Alerta PNP Tambopata emitida
                </span>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#1e293b] hover:bg-red-950/50 text-red-400 border border-red-500/20 font-semibold text-xs rounded-lg flex items-center gap-1 transition-all">
                    <Ban className="w-3.5 h-3.5" />
                    Suspender Conductor
                  </button>
                  <button className="px-3 py-1.5 bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 font-semibold text-xs rounded-lg flex items-center gap-1 transition-all">
                    <Phone className="w-3.5 h-3.5" />
                    Contactar Pasajera
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Conduct Reports */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-5 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Reportes de Conducta</h3>
                      <p className="text-[11px] text-[#94a3b8]">
                        Incidentes y quejas de usuarios hoy
                      </p>
                    </div>
                  </div>
                  <a
                    href="#historial"
                    className="text-xs font-semibold text-[#06B6D4] hover:underline"
                  >
                    Ver historial
                  </a>
                </div>

                {/* Conduct Items List */}
                <div className="space-y-2.5 mt-4">
                  {conductReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-3 bg-[#0b0f19] border border-[#1f293d] hover:border-[#06B6D4]/40 rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 ${
                            report.severity === 'high'
                              ? 'bg-red-500'
                              : report.severity === 'medium'
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#10B981]'
                          }`}
                        ></span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                            {report.title}
                          </div>
                          <div className="text-[11px] text-[#94a3b8] mt-0.5">
                            {report.details}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748b] group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution Footer */}
              <div className="pt-4 border-t border-[#1f293d] flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                  <span>
                    Tiempo medio de resolución:{' '}
                    <strong className="text-white">24 min</strong>
                  </span>
                </div>

                <button className="w-full sm:w-auto px-4 py-2 bg-[#1e293b] hover:bg-[#06B6D4] hover:text-[#0b0f19] text-white font-bold text-xs rounded-xl border border-[#1f293d] transition-all shadow-md active:scale-95">
                  Resolver Cola de Quejas
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1f293d] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#1f293d] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                  Detalle de Viaje
                </span>
                <h3 className="text-lg font-bold text-white">{selectedTrip.id}</h3>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-1 text-[#94a3b8] hover:text-white bg-[#1e293b] rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Pasajero:</span>
                <span className="font-semibold text-white">{selectedTrip.passengerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Conductor:</span>
                <span className="font-semibold text-white">{selectedTrip.driverName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Origen:</span>
                <span className="font-semibold text-white">{selectedTrip.origin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Destino:</span>
                <span className="font-semibold text-white">{selectedTrip.destination}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Tarifa:</span>
                <span className="font-bold text-[#10B981]">{selectedTrip.price}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f293d]/50">
                <span className="text-[#94a3b8]">Método de Pago:</span>
                <span className="font-semibold text-white">{selectedTrip.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#94a3b8]">Estado:</span>
                <StatusBadge status={selectedTrip.status} />
              </div>
            </div>

            <button
              onClick={() => setSelectedTrip(null)}
              className="w-full py-2 bg-[#10B981] hover:bg-[#0d9668] text-[#0b0f19] font-bold text-xs rounded-xl transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Sidebar Component
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
}

function SidebarItem({ icon: Icon, label, active, onClick, badge }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
        active
          ? 'bg-[#10B981] text-[#0b0f19] font-bold shadow-lg shadow-[#10B981]/20'
          : 'text-[#94a3b8] hover:bg-[#1e293b]/60 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${active ? 'text-[#0b0f19]' : 'text-[#64748b]'}`} />
        <span>{label}</span>
      </div>
      {badge}
    </button>
  );
}

// Helper Status Badge Component
function StatusBadge({ status }: { status: Trip['status'] }) {
  switch (status) {
    case 'EN_CURSO':
      return (
        <span className="bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 w-max">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
          EN_CURSO
        </span>
      );
    case 'NEGOCIANDO':
      return (
        <span className="bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 w-max">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
          NEGOCIANDO
        </span>
      );
    case 'COMPLETADO':
      return (
        <span className="bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 w-max">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
          COMPLETADO
        </span>
      );
    default:
      return (
        <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {status}
        </span>
      );
  }
}