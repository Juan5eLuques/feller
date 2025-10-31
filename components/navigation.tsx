"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Menu, X, Facebook, Instagram, Twitter, Mail, Phone, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
   const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                     onClick={() => scrollToSection("hero")}
                     className="flex items-center gap-2 sm:gap-3 group shrink-0"
                  >
                     <img src={'/LogoDark.png'} alt="logo feller" className="w-24 md:w-36" ></img >
                  </button>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
                     <button
                        onClick={() => scrollToSection("hero")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                     >
                        Inicio
                     </button>
                     <button
                        onClick={() => scrollToSection("cars")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                     >
                        Autos
                     </button>
                     <button
                        onClick={() => scrollToSection("wash")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                     >
                        Lavado
                     </button>
                     <button
                        onClick={() => scrollToSection("about")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                     >
                        Nosotros
                     </button>
                     <button
                        onClick={() => scrollToSection("contact")}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                     >
                        Contacto
                     </button>
                     <Button variant="outline" size="sm">
                        Login
                     </Button>
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
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 }}
                        >
                           Inicio
                        </motion.button>
                        <motion.button
                           onClick={() => scrollToSection("cars")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.15 }}
                        >
                           Autos
                        </motion.button>
                        <motion.button
                           onClick={() => scrollToSection("wash")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                        >
                           Lavado
                        </motion.button>
                        <motion.button
                           onClick={() => scrollToSection("about")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.25 }}
                        >
                           Nosotros
                        </motion.button>
                        <motion.button
                           onClick={() => scrollToSection("contact")}
                           className="text-2xl font-bold text-white hover:text-accent transition-colors text-left py-4 border-b border-border/50"
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
                        <Button className="w-full py-6 text-lg" size="lg">
                           Iniciar Sesión
                        </Button>
                     </motion.div>

                     {/* Contact Info */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 space-y-3"
                     >
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contacto</h3>
                        <a href="tel:+541112345678" className="flex items-center gap-3 text-white hover:text-accent transition-colors">
                           <Phone className="h-5 w-5" />
                           <span>+54 11 1234-5678</span>
                        </a>
                        <a href="mailto:info@fellerautomotores.com" className="flex items-center gap-3 text-white hover:text-accent transition-colors">
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
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                           >
                              <Facebook className="h-5 w-5" />
                           </a>
                           <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                           >
                              <Instagram className="h-5 w-5" />
                           </a>
                           <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
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
                        <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors">
                           <FileText className="h-4 w-4" />
                           <span>Términos y Condiciones</span>
                        </button>
                        <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors">
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