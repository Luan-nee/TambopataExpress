import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import SelectRol, { type UserRole } from './page/login/SelectRol'
import Login from './page/login/Login'
import DriverIdentityForm from './page/login/chofer/FormIdentidad'
import VehicleForm from './page/login/chofer/FormVehiculo'
import PassengerIdentityForm from './page/login/pasajero/FormIdentidad'
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
        element={<PassengerIdentityForm />}
      />
      <Route
        path="/registro/chofer/identidad"
        element={<DriverIdentityForm />}
      />
      <Route path="/registro/chofer/vehiculo" element={<VehicleForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
