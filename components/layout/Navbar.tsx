'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          <button onClick={() => navigateToPage('/')} className="flex items-center gap-3 group">
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
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => navigateToPage('/autos')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Autos
            </button>
            <button
              onClick={() => navigateToPage('/lavado')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Lavado
            </button>
            <button
              onClick={() => navigateToPage('/contacto')}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Contacto
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigateToPage('/perfil')}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  {user?.nombre || 'Perfil'}
                </button>
                {user?.rol === 'admin' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToPage('/admin')}
                  >
                    Admin
                  </Button>
                )}
              </>
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
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => navigateToPage('/autos')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left"
              >
                Autos
              </button>
              <button
                onClick={() => navigateToPage('/lavado')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left"
              >
                Lavado
              </button>
              <button
                onClick={() => navigateToPage('/contacto')}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left"
              >
                Contacto
              </button>

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigateToPage('/perfil')}
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors text-left"
                  >
                    {user?.nombre || 'Perfil'}
                  </button>
                  {user?.rol === 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => navigateToPage('/admin')}
                    >
                      Admin
                    </Button>
                  )}
                </>
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
