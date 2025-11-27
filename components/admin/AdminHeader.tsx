'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
    router.push('/')
  }

  const notifications = [
    {
      id: 1,
      type: 'turno',
      message: 'Nuevo turno agendado para mañana',
      time: 'Hace 5 min',
      unread: true,
    },
    {
      id: 2,
      type: 'venta',
      message: 'Venta confirmada - Toyota Corolla 2023',
      time: 'Hace 1 hora',
      unread: true,
    },
    {
      id: 3,
      type: 'usuario',
      message: 'Nuevo usuario registrado',
      time: 'Hace 2 horas',
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="h-16 lg:h-20 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      {/* Menu Button - Mobile Only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors mr-2"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vehículos, usuarios, turnos..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-feller-red/60 focus:ring-1 focus:ring-feller-red/20 transition-colors"
          />
        </div>
      </div>

      {/* Mobile: Logo/Title */}
      <div className="flex-1 md:hidden">
        <h1 className="text-lg font-bold text-white">FELLER Admin</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 lg:space-x-4 lg:ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#b71c1c] rounded-full"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-12 w-72 sm:w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-zinc-800">
                    <h3 className="text-white font-semibold">Notificaciones</h3>
                    {unreadCount > 0 && (
                      <p className="text-sm text-zinc-400">
                        {unreadCount} sin leer
                      </p>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer transition-colors rounded-lg m-2 ${
                          notif.unread ? 'bg-feller-red/5 border-l-4 border-l-feller-red' : ''
                        }`}
                      >
                        <p className="text-white text-sm mb-1">
                          {notif.message}
                        </p>
                        <p className="text-zinc-500 text-xs">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-zinc-800 text-center">
                    <button className="text-feller-red text-sm hover:text-feller-red/80 border border-transparent hover:border-feller-red/30 px-3 py-1 rounded-lg font-medium transition-colors">
                      Ver todas
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 lg:space-x-3 p-2 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-feller-red to-feller-darkred rounded-full flex items-center justify-center">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-white text-sm font-medium">
                {user?.nombre || 'Admin'}
              </p>
              <p className="text-zinc-400 text-xs capitalize">{user?.rol}</p>
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-12 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-2">
                    <button
                      onClick={() => {
                        router.push('/perfil')
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-zinc-600 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Mi Perfil</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/admin/configuracion')
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-zinc-600 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Configuración</span>
                    </button>
                  </div>
                  <div className="border-t border-zinc-800 p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 border border-transparent hover:border-red-400/30 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Cerrar Sesión</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
