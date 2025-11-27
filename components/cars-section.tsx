'use client'

import { useState, useEffect } from 'react'
import { motion} from 'framer-motion'
import { Car, Gauge, Fuel as FuelIcon, Bike, Sparkles, Zap, Droplet, Battery, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { destacadosAPI, formatearPrecio, formatearKilometraje } from '@/lib/api'
import type { VehiculoDestacado, Auto, Moto } from '@/lib/types/api.types'
import toast from 'react-hot-toast'

export function CarsSection() {
   const [destacados, setDestacados] = useState<VehiculoDestacado[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      fetchDestacados()
   }, [])

   const fetchDestacados = async () => {
      try {
         const response = await destacadosAPI.getAll()
         // Limitar a 6 vehículos destacados para la home
         setDestacados(response.data.slice(0, 6))
      } catch (error: any) {
         console.error('Error al cargar destacados:', error)
         toast.error('Error al cargar vehículos destacados')
      } finally {
         setLoading(false)
      }
   }

   const renderVehiculoCard = (item: VehiculoDestacado, index: number) => {
      const { tipo, vehiculo } = item
      const isAuto = tipo === 'Auto'
      const auto = isAuto ? (vehiculo as Auto) : null
      const moto = !isAuto ? (vehiculo as Moto) : null

      return (
         <motion.div
            key={`${tipo}-${vehiculo.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-feller-red/60 hover:shadow-xl hover:shadow-feller-red/10 transition-all duration-300 group"
         >
            {/* Image */}
            <div className="relative h-56 bg-zinc-900 overflow-hidden">
               {vehiculo.imagenes && vehiculo.imagenes.length > 0 ? (
                  <img 
                     src={vehiculo.imagenes[0].url} 
                     alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                     {isAuto ? (
                        <Car className="w-20 h-20 text-feller-red/30" />
                     ) : (
                        <Bike className="w-20 h-20 text-feller-red/30" />
                     )}
                  </div>
               )}
               
               {/* Badge de Estado y Tipo */}
               <div className="absolute top-3 left-3 flex gap-2">
                  {vehiculo.estado === '0km' && (
                     <span className="px-3 py-1.5 bg-linear-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg shadow-green-500/30 backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        0 KM
                     </span>
                  )}
                  <span className="px-3 py-1.5 bg-zinc-900/80 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-zinc-700 flex items-center gap-1.5">
                     {tipo === 'Auto' ? (
                        <>
                           <Car className="w-3.5 h-3.5" />
                           Auto
                        </>
                     ) : (
                        <>
                           <Bike className="w-3.5 h-3.5" />
                           Moto
                        </>
                     )}
                  </span>
               </div>
               
               <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-5">
               <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-feller-red transition-colors">
                     {vehiculo.marca} {vehiculo.modelo}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">{vehiculo.año}</p>
               </div>

               {/* Specs */}
               <div className="space-y-2.5 mb-5">
                  {isAuto && auto && auto.kilometraje !== null && (
                     <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                        <Gauge className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                        <span className="font-medium">{formatearKilometraje(auto.kilometraje)}</span>
                     </div>
                  )}
                  
                  {isAuto && auto && (
                     <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                        <FuelIcon className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                        <span className="font-medium">
                           {auto.tipoCombustible}
                           {auto.transmision && ` - ${auto.transmision}`}
                        </span>
                     </div>
                  )}

                  {!isAuto && moto && (
                     <div className="flex items-center text-sm text-gray-400 bg-zinc-800/30 rounded-lg px-3 py-2">
                        <Gauge className="w-4 h-4 mr-2 text-feller-red shrink-0" />
                        <span className="font-medium">{moto.cilindrada} cc</span>
                     </div>
                  )}
               </div>

               {/* Price */}
               <div className="flex items-end justify-between pt-4 border-t border-zinc-800">
                  <div>
                     <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Precio</p>
                     <p className="text-2xl font-black text-feller-red tracking-tight">
                        {formatearPrecio(vehiculo.precio)}
                     </p>
                  </div>
                  <Link href={isAuto ? `/autos` : `/motos`}>
                     <Button 
                        size="sm" 
                        className="px-5 py-2.5 bg-feller-red text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-feller-red/30 hover:shadow-feller-red/50"
                     >
                        Ver más
                     </Button>
                  </Link>
               </div>
            </div>
         </motion.div>
      )
   }

   if (loading) {
      return (
         <section id="cars" className="py-16 sm:py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
               <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feller-red mx-auto"></div>
                  <p className="text-gray-400 mt-4">Cargando vehículos destacados...</p>
               </div>
            </div>
         </section>
      )
   }

   return (
      <section id="cars" className="py-16 sm:py-20 lg:py-24 bg-background">
         <div className="container mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-3 tracking-tight">
                  Vehículos <span className="text-feller-red">Destacados</span>
               </h2>
               <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-feller-red to-transparent mx-auto mb-5"></div>
               <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
                  Vehículos premium cuidadosamente seleccionados para ti
               </p>
            </motion.div>

            {/* Cars Grid */}
            {destacados.length > 0 ? (
               <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                     {destacados.map((item, index) => renderVehiculoCard(item, index))}
                  </div>

                  {/* View All Button */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     viewport={{ once: true }}
                     className="text-center mt-12"
                  >
                     <Link href="/autos">
                        <Button 
                           size="lg" 
                           className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full font-semibold"
                        >
                           Ver todos
                        </Button>
                     </Link>
                  </motion.div>
               </>
            ) : (
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
            )}
         </div>
      </section>
   )
}
