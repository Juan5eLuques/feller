'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Gauge, Fuel as FuelIcon, X, ChevronLeft, ChevronRight, Calendar, Cog, DoorClosed, Car, Sparkles, Phone, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Auto } from '@/lib/types/api.types'
import { autosAPI, formatearPrecio, formatearKilometraje } from '@/lib/api'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function AutosPage() {
  const [autos, setAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [selectedModel, setSelectedModel] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [maxPrice, setMaxPrice] = useState<number>(100000000)
  const [maxKm, setMaxKm] = useState<number>(500000)
  const [showFilters, setShowFilters] = useState(true)
  const [expandedFilters, setExpandedFilters] = useState({
    marca: true,
    modelo: true,
    año: true
  })
  const [selectedAuto, setSelectedAuto] = useState<Auto | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageExpanded, setImageExpanded] = useState(false)

  useEffect(() => {
    fetchAutos()
  }, [])

  const fetchAutos = async () => {
    try {
      const response = await autosAPI.getAll()
      // Solo mostrar autos disponibles al público
      setAutos(response.data.filter(auto => auto.disponible))
    } catch (error: any) {
      console.error('Error al cargar autos:', error)
      toast.error('Error al cargar autos')
    } finally {
      setLoading(false)
    }
  }

  const filteredAutos = autos.filter((auto) => {
    const matchesSearch =
      auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === 'all' || auto.marca === selectedBrand
    const matchesModel = selectedModel === 'all' || auto.modelo === selectedModel
    const matchesYear = selectedYear === 'all' || auto.anio.toString() === selectedYear
    const matchesType = selectedType === 'all' || auto.estado === selectedType
    const matchesPrice = auto.precio <= maxPrice
    const matchesKm = auto.kilometraje === null || auto.kilometraje <= maxKm

    return matchesSearch && matchesBrand && matchesModel && matchesYear && matchesType && matchesPrice && matchesKm
  })

  const brands = ['all', ...Array.from(new Set(autos.map(a => a.marca)))]
  const models = ['all', ...Array.from(new Set(autos.filter(a => selectedBrand === 'all' || a.marca === selectedBrand).map(a => a.modelo)))]
  const years = ['all', ...Array.from(new Set(autos.map(a => a.anio.toString()))).sort((a, b) => b.localeCompare(a))]
  const types = ['all', '0km', 'Usado']

  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  const resetFilters = () => {
    setSelectedBrand('all')
    setSelectedModel('all')
    setSelectedYear('all')
    setSelectedType('all')
    setMaxPrice(100000000)
    setMaxKm(500000)
    setSearchTerm('')
  }

  const handleAutoClick = (auto: Auto) => {
    setSelectedAuto(auto)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setSelectedAuto(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'unset'
  }

  const handleNextImage = () => {
    if (selectedAuto && selectedAuto.imagenes) {
      setCurrentImageIndex((prev) => 
        prev === selectedAuto.imagenes.length - 1 ? 0 : prev + 1
      )
    }
  }

  const handlePrevImage = () => {
    if (selectedAuto && selectedAuto.imagenes) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedAuto.imagenes.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Main Content */}
      <section className="pt-24 pb-12 bg-black min-h-screen">
        <div className="mx-auto px-6 max-w-[2000px]">
          <div className="flex items-start gap-6">
            
            {/* Sidebar Sticky Container */}
            <AnimatePresence initial={false} mode="wait">
              {showFilters && (
                <motion.aside
                  key="sidebar"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 288, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="hidden lg:block shrink-0 sticky top-24 self-start"
                  style={{ width: showFilters ? '288px' : '0px' }}
                >
                  <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/30 rounded-3xl shadow-2xl h-fit max-h-[calc(100vh-7rem)] overflow-hidden">
                    <div className="overflow-y-auto custom-scrollbar p-6 max-h-[calc(100vh-7rem)]">
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

                    <div className="space-y-6">
                      {/* Marca Filter */}
                      <div className="space-y-3">
                        <button
                          onClick={() => toggleFilter('marca')}
                          className="flex items-center justify-between w-full text-left group"
                        >
                          <span className="text-sm font-semibold text-white uppercase tracking-wide">Marca</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-red-600 transition-all ${expandedFilters.marca ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFilters.marca && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <select
                              value={selectedBrand}
                              onChange={(e) => {
                                setSelectedBrand(e.target.value)
                                setSelectedModel('all')
                              }}
                              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                            >
                              <option value="all">Todas las marcas</option>
                              {brands.filter(b => b !== 'all').map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                        <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
                      </div>

                      {/* Modelo Filter */}
                      <div className="space-y-3">
                        <button
                          onClick={() => toggleFilter('modelo')}
                          className="flex items-center justify-between w-full text-left group"
                        >
                          <span className="text-sm font-semibold text-white uppercase tracking-wide">Modelo</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-red-600 transition-all ${expandedFilters.modelo ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedFilters.modelo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <select
                              value={selectedModel}
                              onChange={(e) => setSelectedModel(e.target.value)}
                              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={selectedBrand === 'all'}
                            >
                              <option value="all">Todos los modelos</option>
                              {models.filter(m => m !== 'all').map((model) => (
                                <option key={model} value={model}>{model}</option>
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
                            max="100000000"
                            step="1000000"
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
                            max="500000"
                            step="10000"
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
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 bg-zinc-950/30 backdrop-blur-sm border border-zinc-800/30 rounded-3xl shadow-2xl p-8">
              {/* Integrated Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/10 rounded-xl border border-red-600/20">
                      <Car className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      <span className="text-red-600">Autos</span> <span className="text-white">Disponibles</span>
                    </h1>
                  </div>
                  <p className="text-sm text-gray-400">
                    {loading ? (
                      <span>Cargando...</span>
                    ) : (
                      <span>
                        <span className="text-red-600 font-semibold">{filteredAutos.length}</span> {filteredAutos.length === 1 ? 'vehículo disponible' : 'vehículos disponibles'}
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

              {/* Autos Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                </div>
              ) : filteredAutos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                    <Car className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">No se encontraron autos</h3>
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
                  {filteredAutos.map((auto, index) => (
                    <motion.div
                      key={auto.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-feller-red/60 hover:shadow-xl hover:shadow-feller-red/10 transition-all duration-300 group cursor-pointer"
                      onClick={() => handleAutoClick(auto)}
                    >
                      {/* Image */}
                      <div className="relative h-56 bg-zinc-900 overflow-hidden">
                        {auto.imagenes && auto.imagenes.length > 0 ? (
                          <img 
                            src={auto.imagenes[0].url} 
                            alt={`${auto.marca} ${auto.modelo}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Car className="w-20 h-20 text-feller-red/30" />
                          </div>
                        )}
                        
                        {/* Badge de Estado */}
                        {auto.estado === '0km' && (
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
                            {auto.marca} {auto.modelo}
                          </h3>
                          <p className="text-gray-500 text-sm font-medium">{auto.anio}</p>
                        </div>

                        {/* Specs */}
                        <div className="space-y-2.5 mb-5">
                          {auto.kilometraje !== null && (
                            <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                              <Gauge className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                              <span className="font-medium">{formatearKilometraje(auto.kilometraje)}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                            <FuelIcon className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                            <span className="font-medium">
                              {auto.tipoCombustible}
                              {auto.transmision && ` - ${auto.transmision}`}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-end justify-between pt-4 border-t border-zinc-800">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Precio</p>
                            <p className="text-2xl font-black text-feller-red tracking-tight">
                              {formatearPrecio(auto.precio)}
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

      {/* Modal de Detalle */}
      <AnimatePresence>
          {selectedAuto && (
            <motion.div
              key="detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-zinc-900/95 border border-white/10 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-zinc-900/98 backdrop-blur-md border-b border-white/10">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {selectedAuto.marca} <span className="text-accent">{selectedAuto.modelo}</span>
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-medium">
                        {selectedAuto.anio}
                      </span>
                      <span className={`px-3 py-1 border rounded-full text-xs font-medium ${
                        selectedAuto.estado === '0km'
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      }`}>
                        {selectedAuto.estado}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCloseModal}
                    className="p-2.5 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent rounded-xl text-white transition-all duration-300 group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="relative">
                      <div 
                        onClick={() => selectedAuto.imagenes && selectedAuto.imagenes.length > 0 && setImageExpanded(true)}
                        className="relative h-96 bg-linear-to-br from-white/5 to-white/0 rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
                      >
                      {selectedAuto.imagenes && selectedAuto.imagenes.length > 0 ? (
                        <>
                          <motion.img
                            key={currentImageIndex}
                            src={selectedAuto.imagenes[currentImageIndex].url}
                            alt={`${selectedAuto.marca} ${selectedAuto.modelo}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Indicador de click para expandir */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300">
                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                              Click para expandir
                            </div>
                          </div>
                          
                          {selectedAuto.imagenes.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePrevImage()
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-feller-red/90 border border-white/20 hover:border-feller-red rounded-xl text-white transition-all duration-300 backdrop-blur-md group z-10"
                              >
                                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleNextImage()
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-feller-red/90 border border-white/20 hover:border-feller-red rounded-xl text-white transition-all duration-300 backdrop-blur-md group z-10"
                              >
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                              </button>

                              {/* Indicadores */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 z-10">
                                {selectedAuto.imagenes.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCurrentImageIndex(idx)
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                      idx === currentImageIndex
                                        ? 'bg-feller-red w-8'
                                        : 'bg-white/40 hover:bg-white/60 w-1.5'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Car className="w-32 h-32 text-zinc-700 opacity-30" />
                        </div>
                      )}
                      
                        {selectedAuto.estado === '0km' && (
                          <span className="absolute top-4 left-4 px-4 py-2 bg-green-500/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            0 KM
                          </span>
                        )}
                      </div>

                      {/* Thumbnails */}
                      {selectedAuto.imagenes && selectedAuto.imagenes.length > 1 && (
                        <div className="grid grid-cols-6 gap-2 mt-4">
                          {selectedAuto.imagenes.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`relative h-14 rounded-lg overflow-hidden border transition-all duration-300 ${
                                idx === currentImageIndex
                                  ? 'border-accent ring-2 ring-accent/30 scale-105'
                                  : 'border-white/10 hover:border-accent/50 hover:scale-105'
                              }`}
                            >
                              <img
                                src={img.url}
                                alt={`Miniatura ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                      {/* Price */}
                      <div className="relative bg-white/5 rounded-xl p-5 mb-6 border border-white/10 overflow-hidden group hover:border-accent/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-medium relative z-10">Precio</p>
                        <p className="text-5xl font-black text-accent relative z-10">
                          {formatearPrecio(selectedAuto.precio)}
                        </p>
                      </div>

                      {/* Specifications */}
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <div className="w-1 h-5 bg-accent rounded-full"></div>
                          Especificaciones
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-400 font-medium">Año</span>
                            </div>
                            <p className="text-white font-semibold">{selectedAuto.anio}</p>
                          </div>

                          {selectedAuto.puertas && (
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
                              <div className="flex items-center gap-2 mb-2">
                                <DoorClosed className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-400 font-medium">Puertas</span>
                              </div>
                              <p className="text-white font-semibold">{selectedAuto.puertas}</p>
                            </div>
                          )}

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
                            <div className="flex items-center gap-2 mb-2">
                              <FuelIcon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-400 font-medium">Combustible</span>
                            </div>
                            <p className="text-white font-semibold">{selectedAuto.tipoCombustible}</p>
                          </div>

                          {selectedAuto.transmision && (
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group">
                              <div className="flex items-center gap-2 mb-2">
                                <Cog className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-400 font-medium">Transmisión</span>
                              </div>
                              <p className="text-white font-semibold">{selectedAuto.transmision}</p>
                            </div>
                          )}

                          {selectedAuto.kilometraje !== null && (
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group col-span-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Gauge className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-xs text-gray-400 font-medium">Kilometraje</span>
                              </div>
                              <p className="text-white font-semibold">{formatearKilometraje(selectedAuto.kilometraje)}</p>
                            </div>
                          )}

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group col-span-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                selectedAuto.disponible ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                              }`}></div>
                              <span className="text-xs text-gray-400 font-medium">Disponibilidad</span>
                            </div>
                            <span className={`text-sm font-semibold ${
                              selectedAuto.disponible ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {selectedAuto.disponible ? 'Disponible' : 'No disponible'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                      {/* Description */}
                      {selectedAuto.descripcion && (
                        <div className="mb-6 bg-white/5 border border-white/10 rounded-xl p-5">
                          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <div className="w-1 h-5 bg-accent rounded-full"></div>
                            Descripción
                          </h3>
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {selectedAuto.descripcion}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button className="flex-1 bg-accent hover:bg-accent/90 text-white py-6">
                          Contactar
                        </Button>
                        <Button variant="outline" className="flex-1 py-6">
                          Agendar Prueba
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          </motion.div>
          )}

          {/* Modal de Imagen Expandida */}
          {selectedAuto && imageExpanded && (
            <motion.div
              key="expanded-image-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95"
              onClick={() => setImageExpanded(false)}
            >
              <button
                onClick={() => setImageExpanded(false)}
                className="absolute top-6 right-6 p-3 bg-black/60 hover:bg-accent/90 border border-white/20 hover:border-accent rounded-xl text-white transition-all duration-300 backdrop-blur-md z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full max-w-7xl h-[90vh]">
                {selectedAuto.imagenes && selectedAuto.imagenes.length > 0 && (
                  <>
                    <motion.img
                      key={currentImageIndex}
                      src={selectedAuto.imagenes[currentImageIndex].url}
                      alt={`${selectedAuto.marca} ${selectedAuto.modelo}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => e.stopPropagation()}
                    />

                    {selectedAuto.imagenes.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePrevImage()
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-accent/90 border border-white/20 hover:border-accent rounded-xl text-white transition-all duration-300 backdrop-blur-md"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNextImage()
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-accent/90 border border-white/20 hover:border-accent rounded-xl text-white transition-all duration-300 backdrop-blur-md"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/10">
                          {selectedAuto.imagenes.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation()
                                setCurrentImageIndex(idx)
                              }}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex
                                  ? 'bg-accent w-12'
                                  : 'bg-white/40 hover:bg-white/60 w-2'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  )
}
