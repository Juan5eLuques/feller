'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Menu, X, User, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navigateToPage = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    setShowUserMenu(false)
    toast.success('Sesión cerrada correctamente')
    router.push('/')
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => navigateToPage('/')} className="flex items-center gap-3 group cursor-pointer">
            <Car className="h-8 w-8 text-accent transition-transform group-hover:scale-110" strokeWidth={1.5} />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">FELLER</span>
              <span className="text-xs tracking-wider text-muted-foreground">AUTOMOTORES</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigateToPage('/')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => navigateToPage('/autos')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              Autos
            </button>
            <button
              onClick={() => navigateToPage('/lavado')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              Lavado
            </button>
            <button
              onClick={() => navigateToPage('/contacto')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              Contacto
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white hidden lg:block">
                    {user?.nombre || 'Usuario'}
                  </span>
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
                        className="absolute right-0 top-12 w-48 bg-[#1a1a1a] border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              navigateToPage('/perfil')
                              setShowUserMenu(false)
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">Mi Perfil</span>
                          </button>
                          {user?.rol === 'Admin' && (
                            <button
                              onClick={() => {
                                navigateToPage('/admin')
                                setShowUserMenu(false)
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                              <span className="text-sm">Panel Admin</span>
                            </button>
                          )}
                        </div>
                        <div className="border-t border-border p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToPage('/login')}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigateToPage('/')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => navigateToPage('/autos')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left cursor-pointer"
              >
                Autos
              </button>
              <button
                onClick={() => navigateToPage('/lavado')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left cursor-pointer"
              >
                Lavado
              </button>
              <button
                onClick={() => navigateToPage('/contacto')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left cursor-pointer"
              >
                Contacto
              </button>

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-border space-y-2">
                  <button
                    onClick={() => navigateToPage('/perfil')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left"
                  >
                    <User className="w-5 h-5" />
                    <div>
                      <p className="text-sm font-medium">Mi Perfil</p>
                      <p className="text-xs text-gray-500">{user?.nombre}</p>
                    </div>
                  </button>
                  {user?.rol === 'Admin' && (
                    <button
                      onClick={() => navigateToPage('/admin')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">Panel Admin</span>
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => navigateToPage('/login')}
                >
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
