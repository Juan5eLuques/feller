'use client'

import { motion } from 'framer-motion'
import { Award, Users, Shield, Star } from 'lucide-react'

const features = [
   {
      icon: Award,
      title: 'Experiencia',
      description: 'Más de 15 años en el mercado automotriz',
   },
   {
      icon: Users,
      title: 'Equipo Profesional',
      description: 'Personal capacitado y certificado',
   },
   {
      icon: Shield,
      title: 'Garantía Total',
      description: 'Todos nuestros vehículos con garantía extendida',
   },
   {
      icon: Star,
      title: 'Satisfacción',
      description: '98% de clientes satisfechos',
   },
]

export function AboutSection() {
   return (
      <section id="about" className="py-20 bg-feller-darkgray/50">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Left side - Content */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
               >
                  <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
                     ¿Por qué elegir <span className="text-feller-red">Feller</span>?
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                     En Feller Automotores nos dedicamos a ofrecer la mejor experiencia en venta de vehículos
                     y servicios automotrices. Nuestra pasión por los autos y compromiso con la excelencia
                     nos han convertido en la concesionaria de confianza para cientos de familias.
                  </p>
                  <p className="text-gray-400 text-lg mb-8">
                     Cada vehículo en nuestro inventario es cuidadosamente seleccionado y pasa por rigurosas
                     inspecciones para garantizar la mejor calidad. Además, nuestro servicio de lavado
                     profesional mantiene tu auto como nuevo.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-6">
                     {features.map((feature, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6, delay: index * 0.1 }}
                           viewport={{ once: true }}
                           className="flex items-start space-x-3"
                        >
                           <div className="w-10 h-10 bg-feller-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <feature.icon className="w-5 h-5 text-feller-red" />
                           </div>
                           <div>
                              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                              <p className="text-sm text-gray-400">{feature.description}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>

               {/* Right side - Image placeholder */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
               >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-feller-red/20 to-feller-darkred/20 flex items-center justify-center">
                     <div className="text-center">
                        <div className="text-6xl md:text-8xl font-bold text-feller-red/30 mb-4">15+</div>
                        <div className="text-xl text-gray-400">Años de Experiencia</div>
                     </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-feller-red/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-feller-darkred/10 rounded-full blur-2xl"></div>
               </motion.div>
            </div>
         </div>
      </section>
   )
}
