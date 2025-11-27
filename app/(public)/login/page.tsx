'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogIn, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const loginResponse = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })

      // El token viene en el response - guardarlo en localStorage inmediatamente
      const token = loginResponse.data.token
      localStorage.setItem('token', token)

      // Ahora obtenemos los datos completos del usuario (el interceptor usará el token)
      const userResponse = await authAPI.me()
      const usuario = userResponse.data

      login(usuario, token)
      toast.success('¡Sesión iniciada correctamente!')
      
      // Redirigir según el rol
      if (usuario.rol === 'Admin') {
        router.push('/admin')
      } else {
        router.push('/perfil')
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error)
      localStorage.removeItem('token')
      toast.error(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.')
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
              <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-2">
              Bienvenido
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Inicia sesión para continuar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                <input 
                  type="checkbox" 
                  className="mr-1.5 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-zinc-700 bg-zinc-900 text-[#b71c1c] focus:ring-[#b71c1c] focus:ring-offset-0 focus:ring-2" 
                />
                Recordarme
              </label>
              <Link 
                href="/recuperar" 
                className="text-[#b71c1c] hover:text-[#d32f2f] transition-colors font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
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
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-zinc-900/50 text-gray-400">¿Nuevo en Feller?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link 
            href="/register"
            className="block w-full text-center py-3 sm:py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700 text-sm sm:text-base"
          >
            Crear una cuenta
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
