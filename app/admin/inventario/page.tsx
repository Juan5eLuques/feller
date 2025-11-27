'use client'

import { motion } from 'framer-motion'
import { Package, AlertTriangle, TrendingDown } from 'lucide-react'

export default function InventarioPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Inventario</h1>
        <p className="text-gray-400">
          Gestión de stock y disponibilidad de vehículos
        </p>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Módulo en Desarrollo
          </h2>
          <p className="text-gray-400 mb-6">
            La funcionalidad de inventario estará disponible próximamente. Aquí
            podrás gestionar el stock completo, realizar auditorías y controlar
            la disponibilidad de vehículos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Control de Stock
              </h3>
              <p className="text-gray-500 text-xs">
                Monitoreo en tiempo real
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <Package className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Auditorías
              </h3>
              <p className="text-gray-500 text-xs">Historial de movimientos</p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <TrendingDown className="w-6 h-6 text-red-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Alertas
              </h3>
              <p className="text-gray-500 text-xs">Stock bajo y crítico</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
