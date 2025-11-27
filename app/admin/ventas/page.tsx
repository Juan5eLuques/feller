'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Eye,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Venta {
  id: string
  vehiculo: string
  comprador: string
  precio: number
  fecha: string
  metodoPago: string
  estado: 'completada' | 'pendiente' | 'cancelada'
  comision: number
}

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([
    {
      id: '1',
      vehiculo: 'Toyota Corolla 2023',
      comprador: 'Juan Pérez',
      precio: 28500,
      fecha: '2025-11-18',
      metodoPago: 'Transferencia',
      estado: 'completada',
      comision: 2850,
    },
    {
      id: '2',
      vehiculo: 'Honda Civic 2022',
      comprador: 'María González',
      precio: 32000,
      fecha: '2025-11-17',
      metodoPago: 'Efectivo',
      estado: 'completada',
      comision: 3200,
    },
    {
      id: '3',
      vehiculo: 'Ford Ranger 2023',
      comprador: 'Carlos Rodríguez',
      precio: 45000,
      fecha: '2025-11-16',
      metodoPago: 'Financiamiento',
      estado: 'pendiente',
      comision: 4500,
    },
    {
      id: '4',
      vehiculo: 'Chevrolet Cruze 2022',
      comprador: 'Ana Martínez',
      precio: 25000,
      fecha: '2025-11-15',
      metodoPago: 'Transferencia',
      estado: 'completada',
      comision: 2500,
    },
    {
      id: '5',
      vehiculo: 'Volkswagen Amarok 2023',
      comprador: 'Roberto Silva',
      precio: 52000,
      fecha: '2025-11-10',
      metodoPago: 'Efectivo',
      estado: 'completada',
      comision: 5200,
    },
  ])

  const [filterPeriod, setFilterPeriod] = useState<'semana' | 'mes' | 'año'>('mes')

  const totalVentas = ventas
    .filter((v) => v.estado === 'completada')
    .reduce((acc, v) => acc + v.precio, 0)

  const totalComisiones = ventas
    .filter((v) => v.estado === 'completada')
    .reduce((acc, v) => acc + v.comision, 0)

  const ventasCompletadas = ventas.filter((v) => v.estado === 'completada').length
  const ventasPendientes = ventas.filter((v) => v.estado === 'pendiente').length

  const statsData = [
    {
      label: 'Total Ventas',
      value: `$${totalVentas.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up' as const,
      color: 'text-green-400',
    },
    {
      label: 'Comisiones',
      value: `$${totalComisiones.toLocaleString()}`,
      change: '+8.3%',
      trend: 'up' as const,
      color: 'text-[#b71c1c]',
    },
    {
      label: 'Completadas',
      value: ventasCompletadas,
      change: '+4',
      trend: 'up' as const,
      color: 'text-blue-400',
    },
    {
      label: 'Pendientes',
      value: ventasPendientes,
      change: '2',
      trend: 'down' as const,
      color: 'text-yellow-400',
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'bg-green-600/20 text-green-400 border-green-600/50'
      case 'pendiente':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50'
      case 'cancelada':
        return 'bg-red-600/20 text-red-400 border-red-600/50'
      default:
        return 'bg-gray-600/20 text-gray-400'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gestión de Ventas
            </h1>
            <p className="text-gray-400">
              Historial y análisis de ventas realizadas
            </p>
          </div>
          <button
            onClick={() => toast.success('Descargando reporte...')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#b71c1c] text-white rounded-lg hover:bg-[#8b0000] transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Exportar Reporte</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <div
                  className={`flex items-center space-x-1 text-xs ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          <button
            onClick={() => setFilterPeriod('semana')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPeriod === 'semana'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Última Semana
          </button>
          <button
            onClick={() => setFilterPeriod('mes')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPeriod === 'mes'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Último Mes
          </button>
          <button
            onClick={() => setFilterPeriod('año')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterPeriod === 'año'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Último Año
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#0a0a0a]">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Vehículo
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Comprador
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Precio
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Comisión
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Método de Pago
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Fecha
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                  Estado
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium text-gray-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {ventas.map((venta, index) => (
                <motion.tr
                  key={venta.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[#0a0a0a] transition-colors"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="text-white font-medium text-sm">{venta.vehiculo}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="text-gray-300 text-sm">{venta.comprador}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="text-[#b71c1c] font-bold text-sm">
                      ${venta.precio.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="text-green-400 font-medium text-sm">
                      ${venta.comision.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="text-gray-400 text-sm">{venta.metodoPago}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(venta.fecha).toLocaleDateString('es-AR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(
                        venta.estado
                      )}`}
                    >
                      {venta.estado}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() =>
                          toast.success(`Ver detalles de venta: ${venta.vehiculo}`)
                        }
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-sm">Promedio por Venta</h3>
            <DollarSign className="w-5 h-5 text-[#b71c1c]" />
          </div>
          <p className="text-2xl font-bold text-white">
            ${Math.round(totalVentas / ventasCompletadas || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-sm">Tasa de Comisión</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-400">10%</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-sm">Venta más Alta</h3>
            <TrendingUp className="w-5 h-5 text-[#b71c1c]" />
          </div>
          <p className="text-2xl font-bold text-[#b71c1c]">
            ${Math.max(...ventas.map((v) => v.precio)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
