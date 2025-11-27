'use client'

import { motion } from 'framer-motion'
import { Car, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
   const currentYear = new Date().getFullYear()

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
      }
   }

   return (
      <footer className="bg-zinc-900/50 backdrop-blur-sm border-t border-zinc-800">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {/* Logo and Description */}
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                     <div className="w-10 h-10 bg-feller-red/10 rounded-xl flex items-center justify-center">
                        <Car className="h-6 w-6 text-feller-red" />
                     </div>
                     <div className="flex flex-col items-start">
                        <span className="text-2xl font-montserrat font-bold text-white leading-none tracking-tight">
                           FELLER
                        </span>
                        <span className="text-xs text-gray-500 leading-none tracking-wider">AUTOMOTORES</span>
                     </div>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
                     Tu concesionaria de confianza. Venta de autos premium y servicio de lavado profesional.
                     La mejor experiencia automotriz en un solo lugar.
                  </p>
                  {/* Social Links */}
                  <div className="flex space-x-3">
                     <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center hover:bg-feller-red/20 border border-zinc-800 hover:border-feller-red/40 transition-all cursor-pointer"
                     >
                        <Facebook className="w-4 h-4 text-feller-red" />
                     </motion.a>
                     <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center hover:bg-feller-red/20 border border-zinc-800 hover:border-feller-red/40 transition-all cursor-pointer"
                     >
                        <Instagram className="w-4 h-4 text-feller-red" />
                     </motion.a>
                     <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center hover:bg-feller-red/20 border border-zinc-800 hover:border-feller-red/40 transition-all cursor-pointer"
                     >
                        <Twitter className="w-4 h-4 text-feller-red" />
                     </motion.a>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-tight">Enlaces Rápidos</h3>
                  <ul className="space-y-3">
                     <li>
                        <button
                           onClick={() => scrollToSection('hero')}
                           className="text-gray-400 hover:text-feller-red transition-colors text-sm hover:translate-x-1 inline-block cursor-pointer"
                        >
                           Inicio
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('cars')}
                           className="text-gray-400 hover:text-feller-red transition-colors text-sm hover:translate-x-1 inline-block cursor-pointer"
                        >
                           Catálogo de Autos
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('wash')}
                           className="text-gray-400 hover:text-feller-red transition-colors text-sm hover:translate-x-1 inline-block cursor-pointer"
                        >
                           Servicio de Lavado
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('about')}
                           className="text-gray-400 hover:text-feller-red transition-colors text-sm hover:translate-x-1 inline-block cursor-pointer"
                        >
                           Sobre Nosotros
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('contact')}
                           className="text-gray-400 hover:text-feller-red transition-colors text-sm hover:translate-x-1 inline-block cursor-pointer"
                        >
                           Contacto
                        </button>
                     </li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h3 className="text-white font-bold mb-4 text-sm tracking-tight">Contacto</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-zinc-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                           <MapPin className="w-4 h-4 text-feller-red" />
                        </div>
                        <span className="text-gray-400 text-sm leading-relaxed pt-1">
                           Av. Principal 1234<br />Buenos Aires, Argentina
                        </span>
                     </li>
                     <li className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-zinc-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                           <Phone className="w-4 h-4 text-feller-red" />
                        </div>
                        <span className="text-gray-400 text-sm pt-1">
                           +54 11 1234-5678
                        </span>
                     </li>
                     <li className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-zinc-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-feller-red/20 transition-colors">
                           <Mail className="w-4 h-4 text-feller-red" />
                        </div>
                        <span className="text-gray-400 text-sm pt-1">
                           info@fellerautomotores.com
                        </span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  © {currentYear} Feller Automotores. Todos los derechos reservados.
               </p>
               <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-gray-500 hover:text-feller-red transition-colors cursor-pointer">
                     Términos y Condiciones
                  </a>
                  <a href="#" className="text-gray-500 hover:text-feller-red transition-colors cursor-pointer">
                     Política de Privacidad
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}
