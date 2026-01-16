'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Car, Gauge, Fuel as FuelIcon, Bike, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { destacadosAPI, formatearPrecio, formatearKilometraje } from '@/lib/api'
import type { VehiculoDestacado, Auto, Moto } from '@/lib/types/api.types'
import toast from 'react-hot-toast'

// Hook para detectar el tamaño de pantalla
function useWindowSize() {
   const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
   })

   useEffect(() => {
      function handleResize() {
         setWindowSize({ width: window.innerWidth })
      }
      
      window.addEventListener('resize', handleResize)
      handleResize()
      
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return windowSize
}

export function CarsSection() {
   const [destacados, setDestacados] = useState<VehiculoDestacado[]>([])
   const [loading, setLoading] = useState(true)
   const [currentIndex, setCurrentIndex] = useState(0)
   const { width } = useWindowSize()

   // Determinar cuántos items mostrar según el ancho
   const getItemsToShow = useCallback(() => {
      if (width >= 1280) return 3 // xl - 3 items más grandes
      if (width >= 1024) return 3 // lg
      if (width >= 640) return 2  // sm
      return 1 // mobile
   }, [width])

   const itemsToShow = getItemsToShow()
   const maxIndex = Math.max(0, destacados.length - itemsToShow)

   useEffect(() => {
      fetchDestacados()
   }, [])

   // Auto-play del carrusel
   useEffect(() => {
      if (destacados.length <= itemsToShow) return
      
      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, 5000)

      return () => clearInterval(interval)
   }, [destacados.length, itemsToShow, maxIndex])

   // Ajustar currentIndex si cambia el tamaño de pantalla
   useEffect(() => {
      if (currentIndex > maxIndex) {
         setCurrentIndex(maxIndex)
      }
   }, [maxIndex, currentIndex])

   const fetchDestacados = async () => {
      try {
         const response = await destacadosAPI.getAll()
         setDestacados(response.data.slice(0, 8))
      } catch (error: any) {
         console.error('Error al cargar destacados:', error)
         toast.error('Error al cargar vehículos destacados')
      } finally {
         setLoading(false)
      }
   }

   const nextSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
   }, [maxIndex])

   const prevSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
   }, [maxIndex])

   const renderVehiculoCard = (item: VehiculoDestacado, index: number) => {
      const { tipo, vehiculo } = item
      const isAuto = tipo === 'Auto'
      const auto = isAuto ? (vehiculo as Auto) : null
      const moto = !isAuto ? (vehiculo as Moto) : null

      return (
         <div
            key={`${tipo}-${vehiculo.id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 "
         >
            <Link href={isAuto ? `/autos` : `/motos`} className="block">
               <div className="bg-[zinc-950] border border-zinc-800 rounded-2xl overflow-hidden shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-feller-red/10 hover:border-feller-red/40 transition-all duration-300 group h-full">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 lg:h-56 xl:h-60 bg-zinc-900/50 overflow-hidden">
                     {vehiculo.imagenes && vehiculo.imagenes.length > 0 ? (
                        <img 
                           src={vehiculo.imagenes[0].url} 
                           alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                           {isAuto ? (
                              <Car className="w-16 h-16 text-feller-red/20" />
                           ) : (
                              <Bike className="w-16 h-16 text-feller-red/20" />
                           )}
                        </div>
                     )}
                     
                     {/* Badges */}
                     <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-zinc-900 text-white text-xs sm:text-sm font-bold rounded-full border border-zinc-700 flex items-center gap-1.5">
                           {isAuto ? <Car className="w-3.5 h-3.5" /> : <Bike className="w-3.5 h-3.5" />}
                           {isAuto ? 'Auto' : 'Moto'}
                        </span>
                     </div>
                     
                     {vehiculo.estado === '0km' && (
                        <div className="absolute top-3 right-3">
                           <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              0 KM
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 lg:p-6">
                     {/* Title */}
                     <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight line-clamp-1 group-hover:text-feller-red transition-colors">
                        {vehiculo.marca} {vehiculo.modelo}
                     </h3>
                     <p className="text-gray-500 text-sm mb-4">{vehiculo.anio}</p>

                     {/* Specs Pills */}
                     <div className="flex flex-wrap gap-2 mb-4">
                        {isAuto && auto && auto.kilometraje !== null && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs sm:text-sm text-gray-400">
                              <Gauge className="w-3.5 h-3.5 text-feller-red" />
                              {formatearKilometraje(auto.kilometraje)}
                           </span>
                        )}
                        {isAuto && auto && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs sm:text-sm text-gray-400">
                              <FuelIcon className="w-3.5 h-3.5 text-feller-red" />
                              {auto.tipoCombustible}
                           </span>
                        )}
                        {!isAuto && moto && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs sm:text-sm text-gray-400">
                              <Gauge className="w-3.5 h-3.5 text-feller-red" />
                              {moto.cilindrada} cc
                           </span>
                        )}
                     </div>

                     {/* Price */}
                     <div className="pt-4 border-t border-zinc-800">
                        <p className="text-xl sm:text-2xl lg:text-3xl font-black text-feller-red">
                           {formatearPrecio(vehiculo.precio)}
                        </p>
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      )
   }

   if (loading) {
      return (
         <section id="cars" className="py-12 sm:py-16 lg:py-20 bg-black relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-feller-red/30 to-transparent"></div>
            <div className="container mx-auto px-4 sm:px-6">
               <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feller-red mx-auto"></div>
                  <p className="text-gray-400 mt-4">Cargando vehículos destacados...</p>
               </div>
            </div>
         </section>
      )
   }

   if (destacados.length === 0) {
      return (
         <section id="cars" className="py-12 sm:py-16 lg:py-20 bg-black relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-feller-red/30 to-transparent"></div>
            <div className="container mx-auto px-4 sm:px-6">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
               >
                  <Car className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                     No hay vehículos destacados en este momento
                  </p>
               </motion.div>
            </div>
         </section>
      )
   }

   const canNavigate = destacados.length > itemsToShow

   return (
      <section id="cars" className="py-12 sm:py-16 lg:py-20 bg-black relative overflow-hidden">
         {/* Separador superior */}
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-feller-red/30 to-transparent"></div>
         
         <div className="container mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center mb-8 sm:mb-10"
            >
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-3 tracking-tight">
                  Vehículos <span className="text-feller-red">Destacados</span>
               </h2>
               <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-feller-red to-transparent mx-auto mb-4"></div>
               {/* <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                  Nuestra selección de vehículos premium
               </p> */}
            </motion.div>

            {/* Carousel Container */}
            <div className="relative">
               {/* Navigation Arrow Left - Mobile */}
               {canNavigate && (
                  <button
                     onClick={prevSlide}
                     className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-1 text-white/50 hover:text-white transition-colors sm:hidden"
                     aria-label="Anterior"
                  >
                     <ChevronLeft className="w-6 h-6" />
                  </button>
               )}
               
               {/* Navigation Arrow Left - Desktop */}
               {canNavigate && (
                  <button
                     onClick={prevSlide}
                     className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-zinc-900/90 hover:bg-feller-red border border-zinc-700 hover:border-feller-red rounded-full text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
                     aria-label="Anterior"
                  >
                     <ChevronLeft className="w-6 h-6" />
                  </button>
               )}

               {/* Carousel Track */}
               <div className="overflow-hidden mx-3 sm:mx-12 lg:mx-14">
                  <motion.div
                     className="flex -mx-2 sm:-mx-3"
                     animate={{
                        x: `-${currentIndex * (100 / itemsToShow)}%`
                     }}
                     transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                     }}
                  >
                     {destacados.map((item, index) => renderVehiculoCard(item, index))}
                  </motion.div>
               </div>

               {/* Navigation Arrow Right - Mobile */}
               {canNavigate && (
                  <button
                     onClick={nextSlide}
                     className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-1 text-white/50 hover:text-white transition-colors sm:hidden"
                     aria-label="Siguiente"
                  >
                     <ChevronRight className="w-6 h-6" />
                  </button>
               )}
               
               {/* Navigation Arrow Right - Desktop */}
               {canNavigate && (
                  <button
                     onClick={nextSlide}
                     className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-zinc-900/90 hover:bg-feller-red border border-zinc-700 hover:border-feller-red rounded-full text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
                     aria-label="Siguiente"
                  >
                     <ChevronRight className="w-6 h-6" />
                  </button>
               )}
            </div>

            {/* Indicators */}
            {canNavigate && (
               <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                     <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                           index === currentIndex
                              ? 'w-8 bg-feller-red'
                              : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                        }`}
                        aria-label={`Ir a página ${index + 1}`}
                     />
                  ))}
               </div>
            )}

            {/* Progress Bar */}
            {canNavigate && (
               <div className="mt-4 max-w-xs mx-auto">
                  <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div
                        className="h-full bg-gradient-to-r from-feller-red to-red-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        key={currentIndex}
                     />
                  </div>
               </div>
            )}

            {/* View All Button */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true }}
               className="text-center mt-8 sm:mt-10"
            >
               <Link href="/autos" className="inline-block">
                  <Button 
                     variant="outline"
                     size="lg" 
                     className="px-8 py-3 border-zinc-700 hover:border-feller-red hover:bg-feller-red/10 text-white font-semibold rounded-full transition-all"
                  >
                     Ver todos los vehículos
                  </Button>
               </Link>
            </motion.div>
         </div>
      </section>
   )
}
