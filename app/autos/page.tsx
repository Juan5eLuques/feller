'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Fuel, Gauge, Calendar } from 'lucide-react'
import { mockAutos } from '@/lib/mockData'
import { Auto } from '@/lib/api'

export default function AutosPage() {
  const [autos, setAutos] = useState<Auto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('todos')

  useEffect(() => {
    // Por ahora usamos mock data, luego conectaremos con la API
    setAutos(mockAutos)
  }, [])

  const filteredAutos = autos.filter((auto) => {
    const matchesSearch =
      auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auto.modelo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'todos' ||
      (selectedFilter === 'disponible' && auto.estado === 'disponible') ||
      (selectedFilter === 'nafta' && auto.combustible === 'Nafta') ||
      (selectedFilter === 'electrico' && auto.combustible === 'Eléctrico')

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-feller-black pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Catálogo de <span className="text-feller-red">Autos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de vehículos premium
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-feller-darkgray border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('todos')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${selectedFilter === 'todos'
                  ? 'bg-feller-red text-white'
                  : 'bg-feller-darkgray text-gray-400 border border-feller-red/20 hover:border-feller-red/50'
                }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter('disponible')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${selectedFilter === 'disponible'
                  ? 'bg-feller-red text-white'
                  : 'bg-feller-darkgray text-gray-400 border border-feller-red/20 hover:border-feller-red/50'
                }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setSelectedFilter('nafta')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${selectedFilter === 'nafta'
                  ? 'bg-feller-red text-white'
                  : 'bg-feller-darkgray text-gray-400 border border-feller-red/20 hover:border-feller-red/50'
                }`}
            >
              Nafta
            </button>
            <button
              onClick={() => setSelectedFilter('electrico')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${selectedFilter === 'electrico'
                  ? 'bg-feller-red text-white'
                  : 'bg-feller-darkgray text-gray-400 border border-feller-red/20 hover:border-feller-red/50'
                }`}
            >
              Eléctrico
            </button>
          </div>
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAutos.map((auto, index) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-feller-darkgray border border-feller-red/20 rounded-lg overflow-hidden hover:border-feller-red/50 transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-feller-red/20 to-feller-darkred/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20">🚗</span>
                </div>
                {auto.estado === 'disponible' && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                    Disponible
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {auto.marca} {auto.modelo}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{auto.color} - {auto.año}</p>

                {/* Specs */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Gauge className="w-4 h-4 mr-2 text-feller-red" />
                    {auto.kilometraje.toLocaleString()} km
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Fuel className="w-4 h-4 mr-2 text-feller-red" />
                    {auto.combustible} - {auto.transmision}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Precio</p>
                    <p className="text-2xl font-bold text-feller-red">
                      ${auto.precio.toLocaleString()}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-feller-red text-white rounded-lg hover:bg-feller-darkred transition-colors"
                  >
                    Ver más
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredAutos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No se encontraron autos con los filtros seleccionados</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
