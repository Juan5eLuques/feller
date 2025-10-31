'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Check, Calendar, Clock, Car } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LavadoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    vehiculo: '',
    fecha: '',
    hora: '',
    tipoServicio: 'basico',
    observaciones: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const servicios = [
    {
      id: 'basico',
      nombre: 'Lavado Básico',
      precio: 2500,
      duracion: '30 min',
      incluye: ['Lavado exterior', 'Secado', 'Aspirado básico'],
    },
    {
      id: 'completo',
      nombre: 'Lavado Completo',
      precio: 4500,
      duracion: '60 min',
      incluye: ['Lavado exterior e interior', 'Aspirado completo', 'Limpieza de tapizados', 'Lavado de motor'],
    },
    {
      id: 'premium',
      nombre: 'Lavado Premium',
      precio: 7500,
      duracion: '90 min',
      incluye: ['Todo del lavado completo', 'Pulido y encerado', 'Tratamiento de cuero', 'Descontaminación de pintura'],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulación de creación de turno (luego conectar con API real)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success('¡Turno reservado exitosamente! Te contactaremos pronto.')

      // Resetear formulario
      setFormData({
        nombre: '',
        telefono: '',
        vehiculo: '',
        fecha: '',
        hora: '',
        tipoServicio: 'basico',
        observaciones: '',
      })
    } catch (error) {
      toast.error('Error al reservar el turno. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="w-20 h-20 bg-feller-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplet className="w-10 h-10 text-feller-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Servicio de <span className="text-feller-red">Lavado</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cuidamos tu vehículo con los mejores productos y el servicio más profesional
          </p>
        </motion.div>

        {/* Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setFormData({ ...formData, tipoServicio: servicio.id })}
              className={`bg-feller-darkgray border rounded-lg p-6 cursor-pointer transition-all ${formData.tipoServicio === servicio.id
                  ? 'border-feller-red scale-105 shadow-lg shadow-feller-red/20'
                  : 'border-feller-red/20 hover:border-feller-red/50'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{servicio.nombre}</h3>
                {formData.tipoServicio === servicio.id && (
                  <div className="w-6 h-6 bg-feller-red rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-feller-red mb-2">
                ${servicio.precio}
              </div>
              <div className="text-sm text-gray-400 mb-4">
                <Clock className="w-4 h-4 inline mr-1" />
                {servicio.duracion}
              </div>
              <ul className="space-y-2">
                {servicio.incluye.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start">
                    <Check className="w-4 h-4 text-feller-red mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Formulario de Reserva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-feller-darkgray border border-feller-red/20 rounded-lg p-8"
        >
          <h2 className="text-2xl font-montserrat font-bold text-white mb-6">
            Reserva tu Turno
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
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

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              {/* Vehículo */}
              <div>
                <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-300 mb-2">
                  Vehículo *
                </label>
                <input
                  type="text"
                  id="vehiculo"
                  required
                  value={formData.vehiculo}
                  onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                  placeholder="BMW Serie 3"
                />
              </div>

              {/* Fecha */}
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  id="fecha"
                  required
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors"
                />
              </div>

              {/* Hora */}
              <div className="md:col-span-2">
                <label htmlFor="hora" className="block text-sm font-medium text-gray-300 mb-2">
                  Horario Preferido *
                </label>
                <select
                  id="hora"
                  required
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white focus:outline-none focus:border-feller-red transition-colors"
                >
                  <option value="">Selecciona un horario</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-300 mb-2">
                Observaciones (opcional)
              </label>
              <textarea
                id="observaciones"
                rows={4}
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                className="w-full px-4 py-3 bg-feller-black border border-feller-red/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-feller-red transition-colors resize-none"
                placeholder="Algún detalle especial que debamos saber..."
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-feller-red text-white font-semibold rounded-lg hover:bg-feller-darkred transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>{isLoading ? 'Reservando...' : 'Reservar Turno'}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
