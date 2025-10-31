'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Car, Fuel, Gauge, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockAutos } from '@/lib/mockData'

export function CarsSection() {
   const [filter, setFilter] = useState('todos')

   const filteredAutos = mockAutos.filter((auto) => {
      if (filter === 'todos') return true
      if (filter === 'disponible') return auto.estado === 'disponible'
      if (filter === 'nafta') return auto.combustible === 'Nafta'
      if (filter === 'electrico') return auto.combustible === 'Eléctrico'
      return true
   })

   return (
      <section id="cars" className="py-16 sm:py-20 lg:py-24 bg-background">
         <div className="container mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center mb-8 sm:mb-12"
            >
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Nuestro <span className="text-accent">Catálogo</span>
               </h2>
               <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Vehículos premium cuidadosamente seleccionados
               </p>
            </motion.div>

            {/* Filters */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-10 px-4"
            >
               {['todos', 'disponible', 'nafta', 'electrico'].map((filterOption) => (
                  <Button
                     key={filterOption}
                     variant={filter === filterOption ? 'default' : 'outline'}
                     size="sm"
                     onClick={() => setFilter(filterOption)}
                     className={filter === filterOption ? 'bg-feller-red hover:bg-feller-darkred' : ''}
                  >
                     {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </Button>
               ))}
            </motion.div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
               {filteredAutos.slice(0, 6).map((auto, index) => (
                  <motion.div
                     key={auto.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ y: -5 }}
                     className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all group"
                  >
                     {/* Image */}
                     <div className="relative h-40 sm:h-48 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Car className="w-20 h-20 text-feller-red/30" />
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
                        <p className="text-gray-400 text-sm mb-4">
                           {auto.color} - {auto.año}
                        </p>

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
                           <Button size="sm" variant="outline" className="border-feller-red text-feller-red hover:bg-feller-red hover:text-white">
                              Ver más
                           </Button>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* View All Button */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true }}
               className="text-center mt-12"
            >
               <Button size="lg" variant="outline" className="border-feller-red text-feller-red hover:bg-feller-red hover:text-white">
                  Ver Todos los Autos
               </Button>
            </motion.div>
         </div>
      </section>
   )
}
