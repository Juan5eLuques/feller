'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Gauge, Fuel as FuelIcon, X, ChevronLeft, ChevronRight, Calendar, Cog, DoorClosed, Car, Sparkles } from 'lucide-react'
import { Auto } from '@/lib/types/api.types'
import { autosAPI, formatearPrecio, formatearKilometraje } from '@/lib/api'
import toast from 'react-hot-toast'
import styles from './autos.module.css'

export default function AutosPage() {
  const [autos, setAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('todos')
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

    const matchesFilter =
      selectedFilter === 'todos' ||
      (selectedFilter === '0km' && auto.estado === '0km') ||
      (selectedFilter === 'Usado' && auto.estado === 'Usado') ||
      (selectedFilter === 'Nafta' && auto.tipoCombustible === 'Nafta') ||
      (selectedFilter === 'Eléctrico' && auto.tipoCombustible === 'Eléctrico')

    return matchesSearch && matchesFilter
  })

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

  if (loading) {
    return (
      <div className="min-h-screen bg-feller-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feller-red"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-feller-black pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-2 md:mb-3 tracking-tight">
            Catálogo de <span className="text-feller-red">Autos</span>
          </h1>
          <div className="w-16 md:w-20 h-0.5 bg-linear-to-r from-transparent via-feller-red to-transparent mx-auto mb-3 md:mb-4"></div>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light px-4">
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
          <div className="flex-1 relative group">
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Search className={`w-5 h-5 transition-all duration-300 ${
                searchFocused ? 'text-feller-red drop-shadow-[0_0_8px_rgba(183,28,28,0.6)]' : 'text-gray-500'
              }`} />
            </motion.div>
            <input
              type="text"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900/60 backdrop-blur-md border-2 border-zinc-800/60 rounded-2xl text-white text-base placeholder-gray-500 
                       focus:outline-none focus:border-feller-red/80 focus:bg-zinc-900/80 focus:shadow-[0_0_25px_rgba(183,28,28,0.15)] 
                       transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/70
                       relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(24,24,27,0.6) 0%, rgba(39,39,42,0.6) 100%)'
              }}
            />
            {/* Línea de animación en focus */}
            <div className={`${styles.searchInputLine} ${searchFocused ? styles.focused : ''}`}></div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('todos')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative ${
                selectedFilter === 'todos'
                  ? 'bg-feller-red/10 text-white border-feller-red shadow-[0_0_12px_rgba(183,28,28,0.3)] ring-1 ring-feller-red/20'
                  : 'bg-zinc-900/40 text-gray-400 border-zinc-700 hover:border-feller-red/50 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setSelectedFilter('0km')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative ${
                selectedFilter === '0km'
                  ? 'bg-feller-red/10 text-white border-feller-red shadow-[0_0_12px_rgba(183,28,28,0.3)] ring-1 ring-feller-red/20'
                  : 'bg-zinc-900/40 text-gray-400 border-zinc-700 hover:border-feller-red/50 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              0 KM
            </button>

            <button
              onClick={() => setSelectedFilter('Usado')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative ${
                selectedFilter === 'Usado'
                  ? 'bg-feller-red/10 text-white border-feller-red shadow-[0_0_12px_rgba(183,28,28,0.3)] ring-1 ring-feller-red/20'
                  : 'bg-zinc-900/40 text-gray-400 border-zinc-700 hover:border-feller-red/50 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Usados
            </button>

            <button
              onClick={() => setSelectedFilter('Nafta')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative ${
                selectedFilter === 'Nafta'
                  ? 'bg-feller-red/10 text-white border-feller-red shadow-[0_0_12px_rgba(183,28,28,0.3)] ring-1 ring-feller-red/20'
                  : 'bg-zinc-900/40 text-gray-400 border-zinc-700 hover:border-feller-red/50 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Nafta
            </button>

            <button
              onClick={() => setSelectedFilter('Eléctrico')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border relative ${
                selectedFilter === 'Eléctrico'
                  ? 'bg-feller-red/10 text-white border-feller-red shadow-[0_0_12px_rgba(183,28,28,0.3)] ring-1 ring-feller-red/20'
                  : 'bg-zinc-900/40 text-gray-400 border-zinc-700 hover:border-feller-red/50 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              Eléctrico
            </button>
          </div>
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAutos.map((auto, index) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => handleAutoClick(auto)}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-feller-red/60 hover:shadow-xl hover:shadow-feller-red/10 transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 bg-zinc-900 overflow-hidden">
                {auto.imagenes && auto.imagenes.length > 0 ? (
                  <img 
                    src={auto.imagenes[0].url} 
                    alt={`${auto.marca} ${auto.modelo}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-20 h-20 text-zinc-700 opacity-30" />
                  </div>
                )}
                {auto.estado === '0km' && (
                  <span className="absolute top-3 right-3 px-3 py-1.5 bg-linear-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/30 backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    0 KM
                  </span>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-feller-red transition-colors">
                    {auto.marca} {auto.modelo}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">{auto.año}</p>
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
                    <span className="font-medium">{auto.tipoCombustible}
                    {auto.transmision && ` - ${auto.transmision}`}</span>
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAutoClick(auto)
                    }}
                    className="px-5 py-2.5 bg-feller-red text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-feller-red/30 hover:shadow-feller-red/50"
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

        {/* Modal de Detalle */}
        <AnimatePresence>
          {selectedAuto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-black border border-[#2a2a2a] rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl"
                style={{ 
                  boxShadow: '0 0 50px rgba(183, 28, 28, 0.3)'
                }}
              >
                {/* Borde rojo sutil superior */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-feller-red to-transparent opacity-50"></div>
                
                {/* Header con botón cerrar fijo */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-[#2a2a2a] shrink-0">
                  <div className="flex-1">
                    <h2 className="text-3xl font-montserrat font-bold text-white tracking-tight">
                      {selectedAuto.marca} <span className="text-feller-red">{selectedAuto.modelo}</span>
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-xs text-gray-400 font-medium">
                        {selectedAuto.año}
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
                    className="p-2.5 bg-[#1a1a1a] hover:bg-feller-red/20 border border-[#2a2a2a] hover:border-feller-red rounded-xl text-white transition-all duration-300 group shrink-0"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Contenido scrolleable */}
                <div className="overflow-y-auto flex-1">
                  <div className="grid md:grid-cols-2 gap-6 p-8">
                  {/* Carrousel de Imágenes */}
                  <div className="relative">
                    <div 
                      onClick={() => selectedAuto.imagenes && selectedAuto.imagenes.length > 0 && setImageExpanded(true)}
                      className="relative h-96 bg-linear-to-br from-sidebar to-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] cursor-pointer group/image"
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
                        <span className="absolute top-4 left-4 px-4 py-2 bg-linear-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-xl tracking-wider shadow-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          0 KM
                        </span>
                      )}
                    </div>

                    {/* Miniaturas */}
                    {selectedAuto.imagenes && selectedAuto.imagenes.length > 1 && (
                      <div className="grid grid-cols-6 gap-2 mt-4">
                        {selectedAuto.imagenes.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative h-14 rounded-lg overflow-hidden border transition-all duration-300 ${
                              idx === currentImageIndex
                                ? 'border-feller-red ring-2 ring-feller-red/30 scale-105'
                                : 'border-[#2a2a2a] hover:border-feller-red/50 hover:scale-105'
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

                  {/* Detalles */}
                  <div className="flex flex-col">
                    {/* Precio */}
                    <div className="relative bg-[#1a1a1a] rounded-xl p-5 mb-5 border border-[#2a2a2a] overflow-hidden group hover:border-feller-red/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-linear-to-br from-feller-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-medium relative z-10">Precio</p>
                      <p className="text-5xl font-black text-feller-red relative z-10">
                        {formatearPrecio(selectedAuto.precio)}
                      </p>
                    </div>

                    {/* Especificaciones */}
                    <div className="mb-5">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-1 h-5 bg-feller-red rounded-full"></div>
                        Especificaciones
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-feller-red group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-gray-400 font-medium">Año</span>
                          </div>
                          <p className="text-white font-semibold">{selectedAuto.año}</p>
                        </div>

                        {selectedAuto.puertas && (
                          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group">
                            <div className="flex items-center gap-2 mb-2">
                              <DoorClosed className="w-4 h-4 text-feller-red group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-400 font-medium">Puertas</span>
                            </div>
                            <p className="text-white font-semibold">{selectedAuto.puertas}</p>
                          </div>
                        )}

                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group">
                          <div className="flex items-center gap-2 mb-2">
                            <FuelIcon className="w-4 h-4 text-feller-red group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-gray-400 font-medium">Combustible</span>
                          </div>
                          <p className="text-white font-semibold">{selectedAuto.tipoCombustible}</p>
                        </div>

                        {selectedAuto.transmision && (
                          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group">
                            <div className="flex items-center gap-2 mb-2">
                              <Cog className="w-4 h-4 text-feller-red group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-400 font-medium">Transmisión</span>
                            </div>
                            <p className="text-white font-semibold">{selectedAuto.transmision}</p>
                          </div>
                        )}

                        {selectedAuto.kilometraje !== null && (
                          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Gauge className="w-4 h-4 text-feller-red group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-gray-400 font-medium">Kilometraje</span>
                            </div>
                            <p className="text-white font-semibold">{formatearKilometraje(selectedAuto.kilometraje)}</p>
                          </div>
                        )}

                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:bg-[#1a1a1a] hover:border-feller-red/30 transition-all duration-300 group col-span-2">
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

                    {/* Descripción */}
                    {selectedAuto.descripcion && (
                      <div className="mb-6 bg-white/5 border border-white/10 rounded-xl p-5">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-5 bg-feller-red rounded-full"></div>
                          Descripción
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {selectedAuto.descripcion}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer con botones fijos */}
              <div className="border-t border-[#2a2a2a] px-8 py-5 shrink-0 bg-black">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-linear-to-r from-feller-red to-red-600 text-white rounded-xl hover:from-feller-red hover:to-feller-red transition-all duration-300 font-bold shadow-lg shadow-feller-red/30 border border-feller-red/50 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative z-10">Contactar</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl hover:bg-[#1a1a1a] hover:border-feller-red/50 transition-all duration-300 font-bold group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-feller-red/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span className="relative z-10">Agendar Prueba</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}

          {/* Modal de Imagen Expandida */}
          {selectedAuto && imageExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95"
              onClick={() => setImageExpanded(false)}
            >
              <button
                onClick={() => setImageExpanded(false)}
                className="absolute top-6 right-6 p-3 bg-black/60 hover:bg-feller-red/90 border border-white/20 hover:border-feller-red rounded-xl text-white transition-all duration-300 backdrop-blur-md z-10"
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
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-feller-red/90 border border-white/20 hover:border-feller-red rounded-xl text-white transition-all duration-300 backdrop-blur-md group"
                        >
                          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNextImage()
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-feller-red/90 border border-white/20 hover:border-feller-red rounded-xl text-white transition-all duration-300 backdrop-blur-md group"
                        >
                          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Indicadores */}
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
                                  ? 'bg-feller-red w-12'
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
    </div>
  )
}
