'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Calendar, Clock, LogOut, Mail, Phone } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { mockTurnos } from '@/lib/mockData'
import { Turno } from '@/lib/api'
import toast from 'react-hot-toast'

export default function PerfilPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [turnos, setTurnos] = useState<Turno[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Cargar turnos del usuario (mock data por ahora)
    const userTurnos = mockTurnos.filter((t) => t.clienteId === user?.id)
    setTurnos(userTurnos)
  }, [isAuthenticated, router, user])

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
    router.push('/')
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmado':
        return 'bg-green-600'
      case 'pendiente':
        return 'bg-yellow-600'
      case 'completado':
        return 'bg-blue-600'
      case 'cancelado':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-feller-black pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-montserrat font-bold text-white mb-2">
            Mi <span className="text-feller-red">Perfil</span>
          </h1>
          <p className="text-gray-400">Gestiona tu información y turnos</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información del Usuario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 bg-feller-darkgray border border-feller-red/20 rounded-lg p-6"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-feller-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-feller-red" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-1">{user.nombre}</h2>
              <span className="inline-block px-3 py-1 bg-feller-red/20 text-feller-red text-sm rounded-full">
                {user.rol === 'admin' ? 'Administrador' : 'Cliente'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-feller-red" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.telefono && (
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-feller-red" />
                  <span className="text-sm">{user.telefono}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 py-3 bg-feller-black border border-feller-red/50 text-white rounded-lg hover:bg-feller-red transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </motion.div>

          {/* Turnos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Mis Turnos</h2>

              {turnos.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No tienes turnos agendados</p>
                  <button
                    onClick={() => router.push('/lavado')}
                    className="px-6 py-2 bg-feller-red text-white rounded-lg hover:bg-feller-darkred transition-colors"
                  >
                    Reservar Turno
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {turnos.map((turno) => (
                    <motion.div
                      key={turno.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-feller-black border border-feller-red/20 rounded-lg p-4 hover:border-feller-red/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {turno.tipoServicio}
                          </h3>
                          <p className="text-sm text-gray-400">{turno.vehiculo}</p>
                        </div>
                        <span
                          className={`${getEstadoColor(
                            turno.estado
                          )} text-white text-xs font-semibold px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block`}
                        >
                          {turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4 text-feller-red" />
                          <span>{new Date(turno.fecha).toLocaleDateString('es-AR')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="w-4 h-4 text-feller-red" />
                          <span>{turno.hora}</span>
                        </div>
                      </div>

                      {turno.observaciones && (
                        <p className="mt-3 text-sm text-gray-400 italic">
                          Obs: {turno.observaciones}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
