'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactoPage() {
   const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
   })
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      try {
         // Simulación de envío
         await new Promise((resolve) => setTimeout(resolve, 1000))
         toast.success('¡Mensaje enviado correctamente! Te contactaremos pronto.')
         setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
      } catch (error) {
         toast.error('Error al enviar el mensaje. Intenta nuevamente.')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <section className="min-h-screen py-32 bg-black">
         <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center mb-16"
            >
               <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-3 tracking-tight">
                  <span className="text-feller-red">Contacto</span>
               </h2>
               <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-feller-red to-transparent mx-auto mb-5"></div>
               <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
                  ¿Tienes alguna pregunta? Estamos aquí para ayudarte
               </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Contact Info */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-8"
               >
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-feller-red/40 transition-all duration-300">
                     <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
                        Información de Contacto
                     </h3>

                     <div className="space-y-5">
                        <div className="flex items-start space-x-4 group">
                           <div className="w-11 h-11 bg-feller-red/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                              <MapPin className="w-5 h-5 text-feller-red" />
                           </div>
                           <div>
                              <h4 className="text-white font-semibold mb-1.5 text-sm">Dirección</h4>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                 Av. Principal 1234
                                 <br />
                                 Buenos Aires, Argentina
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start space-x-4 group">
                           <div className="w-11 h-11 bg-feller-red/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                              <Phone className="w-5 h-5 text-feller-red" />
                           </div>
                           <div>
                              <h4 className="text-white font-semibold mb-1.5 text-sm">Teléfono</h4>
                              <p className="text-gray-400 text-sm">+54 11 1234-5678</p>
                              <p className="text-gray-400 text-sm">+54 11 8765-4321</p>
                           </div>
                        </div>

                        <div className="flex items-start space-x-4 group">
                           <div className="w-11 h-11 bg-feller-red/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                              <Mail className="w-5 h-5 text-feller-red" />
                           </div>
                           <div>
                              <h4 className="text-white font-semibold mb-1.5 text-sm">Email</h4>
                              <p className="text-gray-400 text-sm">info@fellerautomotores.com</p>
                              <p className="text-gray-400 text-sm">ventas@fellerautomotores.com</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-feller-red/40 transition-all duration-300">
                     <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Horarios</h3>
                     <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800">
                           <span className="text-gray-400">Lunes a Viernes</span>
                           <span className="text-white font-semibold">9:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800">
                           <span className="text-gray-400">Sábados</span>
                           <span className="text-white font-semibold">9:00 - 13:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-gray-400">Domingos</span>
                           <span className="text-gray-500 font-semibold">Cerrado</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Contact Form */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-feller-red/40 transition-all duration-300"
               >
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Envíanos un mensaje</h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                     <div>
                        <label htmlFor="nombre" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                           Nombre Completo *
                        </label>
                        <input
                           type="text"
                           id="nombre"
                           required
                           value={formData.nombre}
                           onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                           className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-feller-red/60 transition-all"
                           placeholder="Juan Pérez"
                        />
                     </div>

                     <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                           Email *
                        </label>
                        <input
                           type="email"
                           id="email"
                           required
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-feller-red/60 transition-all"
                           placeholder="tu@email.com"
                        />
                     </div>

                     <div>
                        <label htmlFor="telefono" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                           Teléfono
                        </label>
                        <input
                           type="tel"
                           id="telefono"
                           value={formData.telefono}
                           onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                           className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-feller-red/60 transition-all"
                           placeholder="+54 11 1234-5678"
                        />
                     </div>

                     <div>
                        <label htmlFor="mensaje" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                           Mensaje *
                        </label>
                        <textarea
                           id="mensaje"
                           required
                           rows={6}
                           value={formData.mensaje}
                           onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                           className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-feller-red/60 transition-all resize-none"
                           placeholder="¿En qué podemos ayudarte?"
                        />
                     </div>

                     <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-feller-red hover:bg-red-600 py-3.5 rounded-xl font-bold shadow-lg shadow-feller-red/30 hover:shadow-feller-red/50 transition-all cursor-pointer"
                     >
                        <Send className="w-5 h-5 mr-2" />
                        {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                     </Button>
                  </form>
               </motion.div>
            </div>
         </div>
      </section>
   )
}
