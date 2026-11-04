import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import SelectRol, { type UserRole } from './page/login/SelectRol'
import Login from './page/login/Login'
import DriverIdentityForm from './page/login/chofer/FormIdentidad'
import VehicleForm from './page/login/chofer/FormVehiculo'
import PassengerIdentityForm from './page/login/pasajero/FormIdentidad'
import DriverRadarScreen from './page/chofer/Solicitudes'
import NegotiationScreen from './page/chofer/Negociacion'
import AcceptedRequestScreen from './page/chofer/SolicitudAceptada'
import PassengerHistoryScreen from './page/pasajero/Viajes'
import Dashboard from './page/admin/Resumen'
import PassengerApp from './page/pasajero/FormSolicitarTransporte'
import NegotiationChatApp from './page/pasajero/Negociacion'
import TransportStatusAndHistoryApp from './page/pasajero/SolicitudAceptada'
import RealTimeTransportTrackingApp from './page/pasajero/DetallesChofer'
import DriverProfileApp from './page/pasajero/DatosChofer'
import ReportsApp from './page/pasajero/Sos'
import IncidentReportForm from './page/pasajero/FormReportarAccidente'
import IncidentDetail from './page/pasajero/DetallesAcciente'
import TripHistory from './page/chofer/Viajes'
import EarningsDashboard from './page/chofer/Ganancias'
import ReportsAppChofer from './page/chofer/Sos'
import IncidentReportFormChofer from './page/chofer/FormReportarAccidente'
import IncidentDetailChofer from './page/chofer/DetallesAcciente'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login 
            onRegister={() => navigate('/SelectRol')}
            onSubmit={(payload) => {
              // admin, chofer y pasajero
              if (payload.role === 'admin') {
                navigate('/admin/resumen')
              } else if (payload.role === 'driver') {
                navigate('/chofer/solicitudes')
              } else if (payload.role === 'passenger') {
                navigate('/pasajero/viajes')
              }
            }}
          />
        }
      />
      <Route path="/login" element={
        <Login 
          onRegister={() => navigate('/SelectRol')}
        />} 
      />
      <Route
        path="/SelectRol"
        element={
          <SelectRol
            onContinue={(role: UserRole) =>
              navigate(
                role === 'passenger'
                  ? '/registro/pasajero/identidad'
                  : '/registro/chofer/identidad',
              )
            }
            onLogin={() => navigate('/login')}
          />
        }
      />
      <Route path="/chofer/sos" element={<ReportsAppChofer />} />
      <Route path="/chofer/reportar-accidente" element={<IncidentReportFormChofer />} />
      <Route path="/chofer/detalles-accidente" element={<IncidentDetailChofer />} />

      <Route path="/chofer/ganancias" element={<EarningsDashboard />} />
      <Route path="/chofer/viajes" element={<TripHistory />} />
      <Route path="/pasajero/detalles-accidente" element={<IncidentDetail />} />
      <Route path="/pasajero/reportar-accidente" element={<IncidentReportForm />} />
      <Route path="/pasajero/sos" element={<ReportsApp />} />
      <Route path="/pasajero/datos-chofer" element={<DriverProfileApp />} />
      <Route
        path="/pasajero/detalles-chofer"
        element={<RealTimeTransportTrackingApp />}
      />
      <Route
        path="/pasajero/solicitud-aceptada"
        element={<TransportStatusAndHistoryApp />}
      />
      <Route
        path="/pasajero/negociacion"
        element={<NegotiationChatApp />}
      />
      <Route
        path="/registro/pasajero/identidad"
        element={<PassengerIdentityForm 
          onBack={() => {
            navigate('/SelectRol')
          }}
        />}
      />
      <Route
        path="/registro/chofer/identidad"
        element={<DriverIdentityForm 
          onBack={() => {
            navigate('/SelectRol')
          }}
        />}
      />
      <Route
        path="/admin/resumen"
        element={<Dashboard />}
      />
      <Route path="/registro/chofer/vehiculo" element={<VehicleForm 
        onSubmit={() => {
          navigate('/chofer/solicitudes')
        }}
        onBack={() => {
          navigate('/registro/chofer/identidad')
        }}
      />} />
      <Route path="/registro/pasajero/solicitar-transporte" element={<PassengerApp />} />
      <Route path="/chofer/solicitudes" element={<DriverRadarScreen 
        onTabChange={(tab) => {
          if (tab === 'trips') {
            navigate('/chofer/viajes')
          }
        }}
        onNegotiate={() => {
          navigate('/chofer/negociacion')
        }}
      />} />
      <Route
        path="/chofer/negociacion"
        element={<NegotiationScreen 
          onBack={() => navigate('/chofer/solicitudes')}
          onCancel={() => navigate('/chofer/solicitudes')}
          onAccept={() => navigate('/chofer/solicitud-aceptada')}
        />}
      />
      <Route
        path="/chofer/solicitud-aceptada"
        element={<AcceptedRequestScreen 
          onArrived={() => navigate('/chofer/solicitudes')}
        />}
      />
      <Route
        path="/pasajero/viajes"
        element={<PassengerHistoryScreen 
          onTabChange={(tab) => {
            if (tab === 'sos') {
              navigate('/pasajero/sos')
            }
          }}
          onRequestTransport={() => navigate('/registro/pasajero/solicitar-transporte')}
        />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
