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
      <Route path="/chofer/solicitudes" element={<DriverRadarScreen 
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
        element={<AcceptedRequestScreen />}
      />
      <Route
        path="/pasajero/viajes"
        element={<PassengerHistoryScreen />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
