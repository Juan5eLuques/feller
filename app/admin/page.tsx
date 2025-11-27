'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Car,
  Users,
  Calendar,
  Package,
  ArrowUpRight,
  Eye,
} from 'lucide-react'
import { dashboardAPI } from '@/lib/api'
import toast from 'react-hot-toast'

interface StatCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
  color: string
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Ventas del Mes',
      value: '$125,500',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Vehículos en Stock',
      value: '24',
      change: '-3',
      trend: 'down',
      icon: Car,
      color: 'from-[#b71c1c] to-[#8b0000]',
    },
    {
      title: 'Usuarios Activos',
      value: '342',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Turnos Pendientes',
      value: '12',
      change: '+5',
      trend: 'up',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
    },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getResumen()
        const data = response.data
        
        setStats([
          {
            title: 'Autos Publicados',
            value: data.autosPublicados.toString(),
            change: '+' + data.autosPublicados,
            trend: 'up',
            icon: Car,
            color: 'from-[#b71c1c] to-[#8b0000]',
          },
          {
            title: 'Usuarios Registrados',
            value: data.usuariosRegistrados.toString(),
            change: '+' + data.usuariosRegistrados,
            trend: 'up',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
          },
          {
            title: 'Turnos Pendientes',
            value: data.turnosPendientes.toString(),
            change: data.turnosPendientes.toString(),
            trend: data.turnosPendientes > 0 ? 'up' : 'down',
            icon: Calendar,
            color: 'from-orange-500 to-orange-600',
          },
          {
            title: 'Turnos del Día',
            value: data.turnosDelDia.toString(),
            change: '+' + data.turnosDelDia,
            trend: 'up',
            icon: Package,
            color: 'from-green-500 to-emerald-600',
          },
        ])
      } catch (error: any) {
        console.error('Error al cargar estadísticas:', error)
        toast.error(error.response?.data?.message || 'Error al cargar estadísticas')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const recentSales = [
    {
      id: 1,
      vehicle: 'Toyota Corolla 2023',
      buyer: 'Juan Pérez',
      amount: '$28,500',
      date: '2025-11-18',
      status: 'completada',
    },
    {
      id: 2,
      vehicle: 'Honda Civic 2022',
      buyer: 'María González',
      amount: '$32,000',
      date: '2025-11-17',
      status: 'completada',
    },
    {
      id: 3,
      vehicle: 'Ford Ranger 2023',
      buyer: 'Carlos Rodríguez',
      amount: '$45,000',
      date: '2025-11-16',
      status: 'pendiente',
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      client: 'Ana Martínez',
      service: 'Lavado Premium',
      time: 'Hoy 14:00',
      vehicle: 'BMW X5',
    },
    {
      id: 2,
      client: 'Roberto Silva',
      service: 'Lavado Express',
      time: 'Hoy 16:30',
      vehicle: 'Audi A4',
    },
    {
      id: 3,
      client: 'Laura Torres',
      service: 'Lavado Completo',
      time: 'Mañana 10:00',
      vehicle: 'Mercedes C200',
    },
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Bienvenido al panel de administración de Feller Automotores</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#b71c1c]/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Ventas Recientes</h2>
            <button className="text-[#b71c1c] hover:text-[#8b0000] border border-transparent hover:border-[#b71c1c]/30 px-2 py-1 rounded text-sm font-medium flex items-center transition-colors">
              Ver todas
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg hover:border-[#b71c1c]/30 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{sale.vehicle}</h3>
                  <p className="text-sm text-gray-400">{sale.buyer}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#b71c1c] font-semibold mb-1">{sale.amount}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      sale.status === 'completada'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}
                  >
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Próximos Turnos</h2>
            <button className="text-[#b71c1c] hover:text-[#8b0000] border border-transparent hover:border-[#b71c1c]/30 px-2 py-1 rounded text-sm font-medium flex items-center transition-colors">
              Ver calendario
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg hover:border-[#b71c1c]/30 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{appointment.client}</h3>
                  <p className="text-sm text-gray-400">
                    {appointment.service} • {appointment.vehicle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#b71c1c] font-medium">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <button className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#b71c1c] hover:bg-[#2a2a2a] transition-all text-left group">
          <Car className="w-8 h-8 text-[#b71c1c] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Agregar Vehículo</h3>
          <p className="text-sm text-gray-400">Publicar nuevo auto en stock</p>
        </button>

        <button className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#b71c1c] hover:bg-[#2a2a2a] transition-all text-left group">
          <Calendar className="w-8 h-8 text-[#b71c1c] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Crear Turno</h3>
          <p className="text-sm text-gray-400">Agendar nuevo servicio de lavado</p>
        </button>

        <button className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#b71c1c] hover:bg-[#2a2a2a] transition-all text-left group">
          <Package className="w-8 h-8 text-[#b71c1c] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Ver Inventario</h3>
          <p className="text-sm text-gray-400">Gestionar stock y disponibilidad</p>
        </button>
      </motion.div>
    </div>
  )
}
