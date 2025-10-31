'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Shield, Car, Calendar, Users, Plus, Edit, Trash2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { mockAutos, mockTurnos } from '@/lib/mockData'
import { Auto, Turno } from '@/lib/api'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'autos' | 'turnos' | 'usuarios'>('autos')
  const [autos, setAutos] = useState<Auto[]>([])
  const [turnos, setTurnos] = useState<Turno[]>([])

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') {
      toast.error('No tienes permisos para acceder a esta página')
      router.push('/')
      return
    }

    // Cargar datos mock
    setAutos(mockAutos)
    setTurnos(mockTurnos)
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.rol !== 'admin') {
    return null
  }

  const tabs = [
    { id: 'autos' as const, label: 'Autos', icon: Car },
    { id: 'turnos' as const, label: 'Turnos', icon: Calendar },
    { id: 'usuarios' as const, label: 'Usuarios', icon: Users },
  ]

  const handleDeleteAuto = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este auto?')) {
      setAutos(autos.filter((a) => a.id !== id))
      toast.success('Auto eliminado correctamente')
    }
  }

  const handleDeleteTurno = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este turno?')) {
      setTurnos(turnos.filter((t) => t.id !== id))
      toast.success('Turno eliminado correctamente')
    }
  }

  return (
    <div className="min-h-screen bg-feller-black pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-feller-red" />
            <h1 className="text-4xl font-montserrat font-bold text-white">
              Panel de <span className="text-feller-red">Administración</span>
            </h1>
          </div>
          <p className="text-gray-400">Gestiona autos, turnos y usuarios</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-2 mb-6 border-b border-feller-red/20"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${activeTab === tab.id
                  ? 'text-feller-red border-b-2 border-feller-red'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Autos Tab */}
          {activeTab === 'autos' && (
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Gestión de Autos</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-feller-red text-white rounded-lg hover:bg-feller-darkred transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Agregar Auto</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-feller-red/20 text-left">
                      <th className="pb-3 text-gray-400 font-medium">Marca/Modelo</th>
                      <th className="pb-3 text-gray-400 font-medium">Año</th>
                      <th className="pb-3 text-gray-400 font-medium">Precio</th>
                      <th className="pb-3 text-gray-400 font-medium">Estado</th>
                      <th className="pb-3 text-gray-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autos.map((auto) => (
                      <tr key={auto.id} className="border-b border-feller-red/10 hover:bg-feller-black/50">
                        <td className="py-4 text-white">
                          {auto.marca} {auto.modelo}
                        </td>
                        <td className="py-4 text-gray-400">{auto.año}</td>
                        <td className="py-4 text-feller-red font-semibold">
                          ${auto.precio.toLocaleString()}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${auto.estado === 'disponible'
                                ? 'bg-green-600/20 text-green-400'
                                : 'bg-gray-600/20 text-gray-400'
                              }`}
                          >
                            {auto.estado}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAuto(auto.id)}
                              className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Turnos Tab */}
          {activeTab === 'turnos' && (
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Gestión de Turnos</h2>

              <div className="space-y-4">
                {turnos.map((turno) => (
                  <div
                    key={turno.id}
                    className="bg-feller-black border border-feller-red/20 rounded-lg p-4 flex justify-between items-center hover:border-feller-red/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {turno.clienteNombre}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${turno.estado === 'confirmado'
                              ? 'bg-green-600/20 text-green-400'
                              : turno.estado === 'pendiente'
                                ? 'bg-yellow-600/20 text-yellow-400'
                                : turno.estado === 'completado'
                                  ? 'bg-blue-600/20 text-blue-400'
                                  : 'bg-red-600/20 text-red-400'
                            }`}
                        >
                          {turno.estado}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>
                          <span className="font-medium">Servicio:</span> {turno.tipoServicio}
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span>{' '}
                          {new Date(turno.fecha).toLocaleDateString('es-AR')}
                        </div>
                        <div>
                          <span className="font-medium">Hora:</span> {turno.hora}
                        </div>
                        <div>
                          <span className="font-medium">Vehículo:</span> {turno.vehiculo}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTurno(turno.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usuarios Tab */}
          {activeTab === 'usuarios' && (
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Gestión de Usuarios</h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Funcionalidad en desarrollo</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
