'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Bike, Search, Loader2, Phone, SlidersHorizontal, ChevronDown, Sparkles, Gauge } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import toast from 'react-hot-toast'

interface Moto {
  id: number
  marca: string
  modelo: string
  año: number
  precio: number
  kilometraje: number
  cilindrada: string
  tipo: string
  estado: string
  imagenes?: string[]
  descripcion?: string
}

const formatearPrecio = (precio: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(precio)
}

const formatearKilometraje = (km: number) => {
  return `${km.toLocaleString('es-AR')} km`
}

export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [expandedFilters, setExpandedFilters] = useState({
    marca: true,
    tipo: true,
    año: false,
  })
  
  // Filters
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [maxPrice, setMaxPrice] = useState<number>(100000000)
  const [maxKm, setMaxKm] = useState<number>(500000)

  useEffect(() => {
    fetchMotos()
  }, [])

  const fetchMotos = async () => {
    try {
      setLoading(true)
      // TODO: Reemplazar con la llamada real a la API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/motos`)
      // const data = await response.json()
      // setMotos(data)
      
      // Datos de ejemplo mientras se conecta con el backend
      setMotos([])
    } catch (error) {
      console.error('Error al cargar motos:', error)
      toast.error('Error al cargar las motos')
    } finally {
      setLoading(false)
    }
  }

  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  const resetFilters = () => {
    setSelectedBrand('all')
    setSelectedType('all')
    setSelectedYear('all')
    setMaxPrice(100000000)
    setMaxKm(500000)
  }

  const filteredMotos = motos.filter((moto) => {
    const matchesBrand = selectedBrand === 'all' || moto.marca === selectedBrand
    const matchesType = selectedType === 'all' || moto.tipo === selectedType
    const matchesYear = selectedYear === 'all' || moto.año.toString() === selectedYear
    const matchesPrice = moto.precio <= maxPrice
    const matchesKm = moto.kilometraje <= maxKm
    
    return matchesBrand && matchesType && matchesYear && matchesPrice && matchesKm
  })

  const brands = ['all', ...Array.from(new Set(motos.map(m => m.marca)))]
  const types = ['all', ...Array.from(new Set(motos.map(m => m.tipo)))]
  const years = ['all', ...Array.from(new Set(motos.map(m => m.año.toString()))).sort().reverse()]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Main Content */}
      <section className="pt-24 pb-12 bg-black min-h-screen">
        <div className="mx-auto px-6 max-w-[2000px]">
          <div className="flex items-start gap-6">
            
            {showFilters && (
              <aside className="hidden lg:block shrink-0 w-72 sticky top-24 self-start">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/30 rounded-3xl shadow-2xl overflow-y-auto custom-scrollbar max-h-[calc(100vh-7rem)]"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                          <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                          Filtros
                        </h2>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="p-2 bg-zinc-800/50 hover:bg-red-600/10 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                    <div className="space-y-4">
                      {/* Marca Filter */}
                      <div className="border-b border-white/10 pb-4">
                        <button
                          onClick={() => toggleFilter('marca')}
                          className="flex items-center justify-between w-full text-left mb-3"
                        >
                          <span className="font-semibold text-white">MARCA</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.marca ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFilters.marca && (
                          <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                          >
                            <option value="all">Todas las marcas</option>
                            {brands.filter(b => b !== 'all').map((brand) => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </select>
                        )}
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Tipo Filter */}
                      <div className="space-y-3">
                        <button
                          onClick={() => toggleFilter('tipo')}
                          className="flex items-center justify-between w-full text-left group"
                        >
                          <span className="text-sm font-semibold text-white uppercase tracking-wide">Tipo</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-red-600 transition-all ${expandedFilters.tipo ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFilters.tipo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <select
                              value={selectedType}
                              onChange={(e) => setSelectedType(e.target.value)}
                              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                            >
                              <option value="all">Todos los tipos</option>
                              {types.filter(t => t !== 'all').map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Año Filter */}
                      <div className="space-y-3">
                        <button
                          onClick={() => toggleFilter('año')}
                          className="flex items-center justify-between w-full text-left group"
                        >
                          <span className="text-sm font-semibold text-white uppercase tracking-wide">Año</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-red-600 transition-all ${expandedFilters.año ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFilters.año && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <select
                              value={selectedYear}
                              onChange={(e) => setSelectedYear(e.target.value)}
                              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                            >
                              <option value="all">Todos los años</option>
                              {years.filter(y => y !== 'all').map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Price Slider */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white uppercase tracking-wide">
                          Precio máximo
                        </label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="50000000"
                            step="500000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-red-600/50"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">$0</span>
                            <span className="text-sm font-bold text-red-600">{formatearPrecio(maxPrice)}</span>
                          </div>
                        </div>
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Km Slider */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white uppercase tracking-wide">
                          Kilómetros máximos
                        </label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="200000"
                            step="5000"
                            value={maxKm}
                            onChange={(e) => setMaxKm(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-red-600/50"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">0 km</span>
                            <span className="text-sm font-bold text-red-600">{formatearKilometraje(maxKm)}</span>
                          </div>
                        </div>
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Reset Button */}
                      <Button
                        onClick={resetFilters}
                        variant="outline"
                        className="w-full bg-zinc-800/50 hover:bg-red-600/10 border-zinc-700 hover:border-red-600 text-white hover:text-red-600 transition-all mt-2"
                      >
                        Limpiar Filtros
                      </Button>
                    </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 bg-zinc-950/30 backdrop-blur-sm border border-zinc-800/30 rounded-3xl shadow-2xl p-8">
              {/* Integrated Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/10 rounded-xl border border-red-600/20">
                      <Bike className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      <span className="text-red-600">Motos</span> <span className="text-white">Disponibles</span>
                    </h1>
                  </div>
                  <p className="text-sm text-gray-400">
                    {loading ? (
                      <span>Cargando...</span>
                    ) : (
                      <span>
                        <span className="text-red-600 font-semibold">{filteredMotos.length}</span> {filteredMotos.length === 1 ? 'motocicleta disponible' : 'motocicletas disponibles'}
                      </span>
                    )}
                  </p>
                </div>
                
                {!showFilters && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-red-600 rounded-lg text-xs font-medium text-gray-400 hover:text-red-600 transition-all group"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Mostrar Filtros</span>
                  </motion.button>
                )}
              </div>

              {/* Motos Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                </div>
              ) : filteredMotos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                    <Bike className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">No se encontraron motos</h3>
                  <p className="text-gray-400 mb-8">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Limpiar Filtros
                  </Button>
                </motion.div>
              ) : (
                <div className={`grid gap-6 ${
                  showFilters 
                    ? 'md:grid-cols-2 xl:grid-cols-3' 
                    : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                }`}>
                  {filteredMotos.map((moto, index) => (
                    <motion.div
                      key={moto.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-feller-red/60 hover:shadow-xl hover:shadow-feller-red/10 transition-all duration-300 group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-56 bg-zinc-900 overflow-hidden">
                        {moto.imagenes && moto.imagenes.length > 0 ? (
                          <img 
                            src={moto.imagenes[0]}
                            alt={`${moto.marca} ${moto.modelo}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Bike className="w-20 h-20 text-feller-red/30" />
                          </div>
                        )}
                        
                        {/* Badge de Estado */}
                        {moto.estado === '0km' && (
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1.5 bg-linear-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/30 backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              0 KM
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-feller-red transition-colors">
                            {moto.marca} {moto.modelo}
                          </h3>
                          <p className="text-gray-500 text-sm font-medium">{moto.año}</p>
                        </div>

                        {/* Specs */}
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                            <Gauge className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                            <span className="font-medium">{moto.cilindrada} cc</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-end justify-between pt-4 border-t border-zinc-800">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Precio</p>
                            <p className="text-2xl font-black text-feller-red tracking-tight">
                              {formatearPrecio(moto.precio)}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            className="px-5 py-2.5 bg-feller-red text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-feller-red/30 hover:shadow-feller-red/50"
                          >
                            Ver más
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contáctanos y te ayudaremos a encontrar la moto perfecta para ti
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="w-5 h-5 mr-2" />
              Contactar Ahora
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
