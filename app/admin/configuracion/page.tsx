'use client'

import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react'

export default function ConfiguracionPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-gray-400">
          Ajustes del sistema y preferencias
        </p>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Módulo en Desarrollo
          </h2>
          <p className="text-gray-400 mb-6">
            El panel de configuración estará disponible próximamente. Aquí
            podrás personalizar el sistema según tus necesidades.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <User className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Perfil
              </h3>
              <p className="text-gray-500 text-xs">
                Datos personales y cuenta
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <Bell className="w-6 h-6 text-yellow-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Notificaciones
              </h3>
              <p className="text-gray-500 text-xs">Preferencias de alertas</p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <Shield className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Seguridad
              </h3>
              <p className="text-gray-500 text-xs">Contraseña y privacidad</p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
              <Palette className="w-6 h-6 text-[#b71c1c] mb-2" />
              <h3 className="text-white font-semibold mb-1 text-sm">
                Apariencia
              </h3>
              <p className="text-gray-500 text-xs">Tema y personalización</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
