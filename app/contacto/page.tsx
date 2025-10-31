'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
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
      // Simulación de envío (luego conectar con API real)
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
    <div className="min-h-screen bg-feller-black pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            <span className="text-feller-red">Contacto</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-feller-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-feller-red" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Dirección</h3>
                    <p className="text-gray-400">
                      Av. Principal 1234
                      <br />
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-feller-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-feller-red" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Teléfono</h3>
                    <p className="text-gray-400">+54 11 1234-5678</p>
                    <p className="text-gray-400">+54 11 8765-4321</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-feller-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-feller-red" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">info@fellerautomotores.com</p>
                    <p className="text-gray-400">ventas@fellerautomotores.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Horarios</h2>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-white font-medium">Lunes a Viernes:</span> 9:00 - 18:00
                </p>
                <p>
                  <span className="text-white font-medium">Sábados:</span> 9:00 - 13:00
                </p>
                <p>
                  <span className="text-white font-medium">Domingos:</span> Cerrado
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-feller-darkgray border border-feller-red/20 rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Envíanos un mensaje</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={6}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-feller-red text-white font-semibold rounded-lg hover:bg-feller-darkred transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isLoading ? 'Enviando...' : 'Enviar Mensaje'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
