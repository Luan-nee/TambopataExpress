import { Link } from 'react-router-dom'

export default function VehicleForm() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-[#111827] px-5 py-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
      <section className="w-full max-w-md rounded-xl bg-[#1A2233] p-6">
        <h1 className="text-xl font-bold">Datos del vehículo</h1>
        <p className="mt-2 text-sm text-[#C7CEDB]">
          Completa la información de tu vehículo para finalizar el registro.
        </p>
        <Link
          to="/registro/chofer/identidad"
          className="mt-6 block text-center text-sm font-semibold text-[#06B6D4]"
        >
          Volver a identidad
        </Link>
      </section>
    </main>
  )
}