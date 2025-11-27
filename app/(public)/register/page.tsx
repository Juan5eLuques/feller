'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsLoading(true)

    try {
      const registerResponse = await authAPI.register({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        password: formData.password,
      })

      const token = registerResponse.data.token
      localStorage.setItem('token', token)

      // Obtenemos los datos completos del usuario
      const userResponse = await authAPI.me()
      const usuario = userResponse.data

      login(usuario, token)
      toast.success('¡Cuenta creada exitosamente!')
      router.push('/perfil')
    } catch (error: any) {
      console.error('Error al crear cuenta:', error)
      localStorage.removeItem('token')
      toast.error(error.response?.data?.message || 'Error al crear la cuenta. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#b71c1c] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b71c1c] rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="container mx-auto max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-[#b71c1c]/20"
            >
              <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-2">
              Crear Cuenta
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Únete a Feller Automotores</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Nombre Completo
              </label>
              <div className="relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#b71c1c] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                <input
                  type="text"
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] focus:ring-2 focus:ring-[#b71c1c]/20 transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Correo Electrónico
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#b71c1c] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] focus:ring-2 focus:ring-[#b71c1c]/20 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Teléfono (opcional)
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#b71c1c] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] focus:ring-2 focus:ring-[#b71c1c]/20 transition-all"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#b71c1c] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] focus:ring-2 focus:ring-[#b71c1c]/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#b71c1c] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] focus:ring-2 focus:ring-[#b71c1c]/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#b71c1c] to-[#8b0000] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#b71c1c]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 text-sm sm:text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creando cuenta...
                </span>
              ) : (
                'Crear Cuenta'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-zinc-900/50 text-gray-400">¿Ya tienes cuenta?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link 
            href="/login"
            className="block w-full text-center py-3 sm:py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700 text-sm sm:text-base"
          >
            Iniciar sesión
          </Link>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4 sm:mt-6"
        >
          <Link 
            href="/" 
            className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
