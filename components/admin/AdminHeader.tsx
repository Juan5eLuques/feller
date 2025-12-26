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
      <motion.button
        onClick={onMenuClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden p-2.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-feller-red/50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-feller-red/20 mr-2"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

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
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-feller-red/50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-feller-red/20"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-linear-to-br from-feller-red to-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-lg"
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-72 sm:w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden backdrop-blur-sm"
                >
                  <div className="p-4 border-b border-zinc-800 bg-linear-to-r from-zinc-900 to-zinc-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-base">Notificaciones</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-feller-red text-white text-xs font-bold rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        whileHover={{ x: 4 }}
                        className={`p-4 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-all duration-200 ${
                          notif.unread ? 'bg-feller-red/5 border-l-2 border-l-feller-red' : ''
                        }`}
                      >
                        <p className="text-white text-sm mb-1 font-medium">
                          {notif.message}
                        </p>
                        <p className="text-zinc-500 text-xs">{notif.time}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-zinc-800 text-center bg-zinc-900/50">
                    <button className="text-feller-red text-sm hover:text-white bg-feller-red/10 hover:bg-feller-red border border-feller-red/30 hover:border-feller-red px-4 py-2 rounded-lg font-semibold transition-all duration-200">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <motion.button
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 lg:space-x-3 p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-feller-red/50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-feller-red/20"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-linear-to-br from-feller-red via-red-600 to-feller-darkred rounded-full flex items-center justify-center ring-2 ring-zinc-800 hover:ring-feller-red/30 transition-all">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-white text-sm font-semibold">
                {user?.nombre || 'Admin'}
              </p>
              <p className="text-zinc-400 text-xs capitalize font-medium">{user?.rol}</p>
            </div>
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden backdrop-blur-sm"
                >
                  <div className="p-2">
                    <motion.button
                      onClick={() => {
                        router.push('/perfil')
                        setShowUserMenu(false)
                      }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-zinc-700 rounded-lg transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Mi Perfil</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        router.push('/admin/configuracion')
                        setShowUserMenu(false)
                      }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-zinc-700 rounded-lg transition-all duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Configuración</span>
                    </motion.button>
                  </div>
                  <div className="border-t border-zinc-800 p-2">
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/30 rounded-lg transition-all duration-200 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Cerrar Sesión</span>
                    </motion.button>
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
