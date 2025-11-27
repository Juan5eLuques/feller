'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Calendar, Clock, LogOut, Mail, Phone, Package } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { TurnoDeUsuario } from '@/lib/types/api.types'
import { usuariosAPI, formatearFecha, formatearHora } from '@/lib/api'
import toast from 'react-hot-toast'

export default function PerfilPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [turnos, setTurnos] = useState<TurnoDeUsuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchUserTurnos()
  }, [isAuthenticated, router])

  const fetchUserTurnos = async () => {
    if (!user?.id) return

    try {
      const response = await usuariosAPI.getTurnos(user.id)
      setTurnos(response.data)
    } catch (error: any) {
      console.error('Error al cargar turnos:', error)
      toast.error('Error al cargar tus turnos')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
    router.push('/')
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-600'
      case 'EnProceso':
        return 'bg-blue-600'
      case 'Finalizado':
        return 'bg-green-600'
      case 'Cancelado':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'Pendiente'
      case 'EnProceso':
        return 'En Proceso'
      case 'Finalizado':
        return 'Finalizado'
      case 'Cancelado':
        return 'Cancelado'
      default:
        return estado
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
          <p className="text-gray-400">Gestiona tu información y revisa tus turnos</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-feller-red to-feller-darkred rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">{user.nombre}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.rol === 'Admin' 
                    ? 'bg-feller-red text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {user.rol}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3 text-feller-red" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.telefono && (
                  <div className="flex items-center text-gray-400">
                    <Phone className="w-5 h-5 mr-3 text-feller-red" />
                    <span className="text-sm">{user.telefono}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-5 h-5 mr-3 text-feller-red" />
                  <span className="text-sm">
                    Desde {formatearFecha(user.fechaRegistro)}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-feller-red text-white rounded-lg hover:bg-feller-darkred transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>

          {/* Turnos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-feller-red" />
                Mis Turnos
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-feller-red"></div>
                </div>
              ) : turnos.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No tienes turnos agendados</p>
                  <button
                    onClick={() => router.push('/lavado')}
                    className="mt-4 px-6 py-2 bg-feller-red text-white rounded-lg hover:bg-feller-darkred transition-colors"
                  >
                    Agendar Turno
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {turnos.map((turno) => (
                    <motion.div
                      key={turno.id}
                      whileHover={{ x: 5 }}
                      className="bg-black border border-feller-red/10 rounded-lg p-4 hover:border-feller-red/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {turno.tipoLavado}
                          </h3>
                          <div className="flex items-center text-sm text-gray-400 gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatearFecha(turno.fecha)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {turno.hora}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(turno.estado)}`}>
                          {getEstadoLabel(turno.estado)}
                        </span>
                      </div>
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
