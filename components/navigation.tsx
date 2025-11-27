"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Menu, X, Facebook, Instagram, Twitter, Mail, Phone, FileText, Shield, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import toast from 'react-hot-toast'

export function Navigation() {
   const router = useRouter()
   const { user, isAuthenticated, logout } = useAuthStore()
   const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [showUserMenu, setShowUserMenu] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   // Prevent scroll when mobile menu is open
   useEffect(() => {
      if (isMobileMenuOpen) {
         document.body.style.overflow = "hidden"
         document.documentElement.style.overflowX = "hidden"
      } else {
         document.body.style.overflow = "unset"
         document.documentElement.style.overflowX = "unset"
      }
      return () => {
         document.body.style.overflow = "unset"
         document.documentElement.style.overflowX = "unset"
      }
   }, [isMobileMenuOpen])

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
         element.scrollIntoView({ behavior: "smooth" })
         setIsMobileMenuOpen(false)
      }
   }

   const handleLogout = () => {
      logout()
      localStorage.removeItem('token')
      setShowUserMenu(false)
      toast.success('Sesión cerrada correctamente')
      router.push('/')
   }

   return (
      <>
         <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
               ? "bg-black/95 backdrop-blur-md border-white/10"
               : "bg-black/50 backdrop-blur-sm border-transparent"
               }`}
         >
            <div className="container mx-auto px-4 sm:px-6">
               <div className="flex items-center justify-between h-16 sm:h-20">
                  {/* Logo */}
                  <button
                     onClick={() => router.push('/')}
                     className="flex items-center gap-2 sm:gap-3 group shrink-0 cursor-pointer"
                  >
                     <img src={'/LogoDark.png'} alt="logo feller" className="w-24 md:w-36" ></img >
                  </button>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
                     <button
                        onClick={() => scrollToSection("hero")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
                     >
                        Inicio
                     </button>
                     <button
                        onClick={() => router.push('/autos')}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
                     >
                        Autos
                     </button>
                     <button
                        onClick={() => router.push('/lavado')}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
                     >
                        Lavado
                     </button>
                     <button
                        onClick={() => scrollToSection("about")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
                     >
                        Nosotros
                     </button>
                     <button
                        onClick={() => router.push('/contacto')}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer"
                     >
                        Contacto
                     </button>
                     {isAuthenticated ? (
                        <div className="relative">
                           <button
                              onClick={() => setShowUserMenu(!showUserMenu)}
                              className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                           >
                              <div className="w-8 h-8 bg-linear-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                                 <User className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-white">
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
                                                router.push('/perfil')
                                                setShowUserMenu(false)
                                                setIsMobileMenuOpen(false)
                                             }}
                                             className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                                          >
                                             <User className="w-4 h-4" />
                                             <span className="text-sm">Mi Perfil</span>
                                          </button>
                                          {user?.rol === 'Admin' && (
                                             <button
                                                onClick={() => {
                                                   router.push('/admin')
                                                   setShowUserMenu(false)
                                                   setIsMobileMenuOpen(false)
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
                           onClick={() => {
                              setIsMobileMenuOpen(false)
                              router.push('/login')
                           }}
                        >
                           Login
                        </Button>
                     )}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0 w-10 h-10 flex items-center justify-center"
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     aria-label="Toggle menu"
                  >
                     <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                           <motion.div
                              key="close"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <X className="h-6 w-6" />
                           </motion.div>
                        ) : (
                           <motion.div
                              key="menu"
                              initial={{ rotate: 90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: -90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <Menu className="h-6 w-6" />
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </button>
               </div>
            </div>
         </nav>

         {/* Full Screen Mobile Menu */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  className="fixed inset-0 z-40 lg:hidden overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  {/* Backdrop */}
                  <motion.div
                     className="absolute inset-0 bg-black"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                  />

                  {/* Menu Content - Sin animación de slide para evitar overflow */}
                  <motion.div
                     className="relative h-full w-full flex flex-col pt-20 pb-6 px-6 overflow-y-auto"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                  >
                     {/* Main Navigation */}
                     <nav className="flex flex-col gap-1 mb-8">
                        <motion.button
                           onClick={() => scrollToSection("hero")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50 cursor-pointer"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 }}
                        >
                           Inicio
                        </motion.button>
                        <motion.button
                           onClick={() => {
                              setIsMobileMenuOpen(false)
                              router.push('/autos')
                           }}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50 cursor-pointer"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.15 }}
                        >
                           Autos
                        </motion.button>
                        <motion.button
                           onClick={() => {
                              setIsMobileMenuOpen(false)
                              router.push('/lavado')
                           }}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50 cursor-pointer"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                        >
                           Lavado
                        </motion.button>
                        <motion.button
                           onClick={() => scrollToSection("about")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50 cursor-pointer"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.25 }}
                        >
                           Nosotros
                        </motion.button>
                        <motion.button
                           onClick={() => {
                              setIsMobileMenuOpen(false)
                              router.push('/contacto')
                           }}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50 cursor-pointer"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                        >
                           Contacto
                        </motion.button>
                     </nav>

                     {/* CTA Button */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mb-8"
                     >
                        {isAuthenticated ? (
                           <div className="space-y-3 bg-white/5 rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                                 <div className="w-12 h-12 bg-linear-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                 </div>
                                 <div>
                                    <p className="text-white font-semibold">{user?.nombre}</p>
                                    <p className="text-sm text-gray-400 capitalize">{user?.rol}</p>
                                 </div>
                              </div>
                              <button
                                 className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                                 onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    router.push('/perfil')
                                 }}
                              >
                                 <User className="w-5 h-5" />
                                 <span>Mi Perfil</span>
                              </button>
                              {user?.rol === 'Admin' && (
                                 <button
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                                    onClick={() => {
                                       setIsMobileMenuOpen(false)
                                       router.push('/admin')
                                    }}
                                 >
                                    <Settings className="w-5 h-5" />
                                    <span>Panel Admin</span>
                                 </button>
                              )}
                              <button
                                 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-left"
                                 onClick={handleLogout}
                              >
                                 <LogOut className="w-5 h-5" />
                                 <span>Cerrar Sesión</span>
                              </button>
                           </div>
                        ) : (
                           <Button
                              className="w-full py-6 text-lg"
                              size="lg"
                              onClick={() => {
                                 setIsMobileMenuOpen(false)
                                 router.push('/login')
                              }}
                           >
                              Iniciar Sesión
                           </Button>
                        )}
                     </motion.div>

                     {/* Contact Info */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 space-y-3"
                     >
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contacto</h3>
                        <a href="tel:+541112345678" className="flex items-center gap-3 text-white hover:text-accent transition-colors cursor-pointer">
                           <Phone className="h-5 w-5" />
                           <span>+54 11 1234-5678</span>
                        </a>
                        <a href="mailto:info@fellerautomotores.com" className="flex items-center gap-3 text-white hover:text-accent transition-colors cursor-pointer">
                           <Mail className="h-5 w-5" />
                           <span>info@fellerautomotores.com</span>
                        </a>
                     </motion.div>

                     {/* Social Links */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="mb-8"
                     >
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                           <a
                              href="https://facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                           >
                              <Facebook className="h-5 w-5" />
                           </a>
                           <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                           >
                              <Instagram className="h-5 w-5" />
                           </a>
                           <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                           >
                              <Twitter className="h-5 w-5" />
                           </a>
                        </div>
                     </motion.div>

                     {/* Legal Links */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-auto pt-8 border-t border-border space-y-3"
                     >
                        <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer">
                           <FileText className="h-4 w-4" />
                           <span>Términos y Condiciones</span>
                        </button>
                        <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer">
                           <Shield className="h-4 w-4" />
                           <span>Política de Privacidad</span>
                        </button>
                     </motion.div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   )
}