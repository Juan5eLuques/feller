'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Car,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import { turnosAPI, type Turno, type TurnoEstado, formatearFecha, formatearHora } from '@/lib/api'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

export default function TurnosPage() {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState(true)
  const [filterEstado, setFilterEstado] = useState<
    'todos' | TurnoEstado
  >('todos')
  const [selectedDate, setSelectedDate] = useState(new Date())

  const filteredTurnos = turnos.filter((turno) => {
    return filterEstado === 'todos' || turno.estado === filterEstado
  })

  const handleUpdateEstado = async (
    id: number,
    nuevoEstado: TurnoEstado
  ) => {
    if (nuevoEstado === 'Finalizado') {
      if (!confirm('¿Finalizar turno? Se enviará notificación por WhatsApp al cliente automáticamente')) {
        return
      }
    }

    try {
      const response = await turnosAPI.updateEstado(id, { estado: nuevoEstado })
      setTurnos(turnos.map((t) => (t.id === id ? response.data : t)))
      toast.success(`Turno actualizado a: ${nuevoEstado}`)
      
      if (nuevoEstado === 'Finalizado') {
        toast.success('WhatsApp enviado al cliente automáticamente')
      }
    } catch (error: any) {
      console.error('Error al actualizar turno:', error)
      toast.error(error.response?.data?.message || 'Error al actualizar turno')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de cancelar este turno?')) {
      try {
        await turnosAPI.cancel(id)
        setTurnos(turnos.filter((t) => t.id !== id))
        toast.success('Turno cancelado correctamente')
      } catch (error: any) {
        console.error('Error al cancelar turno:', error)
        toast.error(error.response?.data?.message || 'Error al cancelar turno')
      }
    }
  }

  const estadoStats = [
    {
      label: 'Pendientes',
      value: turnos.filter((t) => t.estado === 'Pendiente').length,
      color: 'bg-yellow-600',
      textColor: 'text-yellow-400',
      icon: AlertCircle,
    },
    {
      label: 'En Proceso',
      value: turnos.filter((t) => t.estado === 'EnProceso').length,
      color: 'bg-blue-600',
      textColor: 'text-blue-400',
      icon: Clock,
    },
    {
      label: 'Finalizados',
      value: turnos.filter((t) => t.estado === 'Finalizado').length,
      color: 'bg-green-600',
      textColor: 'text-green-400',
      icon: CheckCircle,
    },
    {
      label: 'Cancelados',
      value: turnos.filter((t) => t.estado === 'Cancelado').length,
      color: 'bg-red-600',
      textColor: 'text-red-400',
      icon: XCircle,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b71c1c]"></div>
      </div>
    )
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50'
      case 'EnProceso':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/50'
      case 'Finalizado':
        return 'bg-green-600/20 text-green-400 border-green-600/50'
      case 'Cancelado':
        return 'bg-red-600/20 text-red-400 border-red-600/50'
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/50'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gestión de Turnos
            </h1>
            <p className="text-gray-400">
              Administra los turnos del servicio de lavado
            </p>
          </div>
          <button
            onClick={() => toast.success('Abrir formulario de nuevo turno')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#b71c1c] text-white border border-[#b71c1c] hover:border-[#8b0000] rounded-lg hover:bg-[#8b0000] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Turno</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {estadoStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterEstado('todos')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterEstado === 'todos'
              ? 'bg-[#b71c1c] text-white'
              : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilterEstado('Pendiente')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterEstado === 'Pendiente'
              ? 'bg-yellow-600 text-white'
              : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-yellow-600'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilterEstado('EnProceso')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterEstado === 'EnProceso'
              ? 'bg-blue-600 text-white'
              : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-blue-600'
          }`}
        >
          En Proceso
        </button>
        <button
          onClick={() => setFilterEstado('Finalizado')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterEstado === 'Finalizado'
              ? 'bg-green-600 text-white'
              : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-green-600'
          }`}
        >
          Finalizados
        </button>
        <button
          onClick={() => setFilterEstado('Cancelado')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterEstado === 'Cancelado'
              ? 'bg-red-600 text-white'
              : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-red-600'
          }`}
        >
          Cancelados
        </button>
      </div>

      {/* Turnos List */}
      <div className="space-y-4">
        {filteredTurnos.map((turno, index) => (
          <motion.div
            key={turno.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#b71c1c]/50 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Main Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Cliente */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Cliente</p>
                    <p className="text-white font-medium">
                      {turno.nombreUsuario}
                    </p>
                  </div>
                </div>

                {/* Vehículo y Servicio */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-[#b71c1c]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Servicio</p>
                    <p className="text-white font-medium">{turno.tipoLavado}</p>
                  </div>
                </div>

                {/* Fecha */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-[#b71c1c]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Fecha</p>
                    <p className="text-white font-medium">
                      {new Date(turno.fecha).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatearHora(turno.hora)}
                    </p>
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <p className="text-xs text-gray-400 mb-2">Estado</p>
                  <select
                    value={turno.estado}
                    onChange={(e) =>
                      handleUpdateEstado(
                        turno.id,
                        e.target.value as TurnoEstado
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getEstadoColor(
                      turno.estado
                    )} bg-transparent cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="EnProceso">En Proceso</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 lg:border-l lg:border-[#2a2a2a] lg:pl-6">
                <button
                  onClick={() =>
                    toast.success(`Ver detalles del turno de ${turno.nombreUsuario}`)
                  }
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Ver detalles"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    toast.success(`Editar turno de ${turno.nombreUsuario}`)
                  }
                  className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(turno.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTurnos.length === 0 && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center">
          <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No se encontraron turnos</p>
        </div>
      )}
    </div>
  )
}
