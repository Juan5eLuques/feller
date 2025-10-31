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
      <footer className="bg-feller-darkgray border-t border-feller-red/20">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {/* Logo and Description */}
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                     <Car className="h-8 w-8 text-feller-red" />
                     <div className="flex flex-col items-start">
                        <span className="text-2xl font-montserrat font-bold text-white leading-none">
                           FELLER
                        </span>
                        <span className="text-xs text-gray-400 leading-none">AUTOMOTORES</span>
                     </div>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-md">
                     Tu concesionaria de confianza. Venta de autos premium y servicio de lavado profesional.
                     La mejor experiencia automotriz en un solo lugar.
                  </p>
                  {/* Social Links */}
                  <div className="flex space-x-4">
                     <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-feller-red/10 rounded-full flex items-center justify-center hover:bg-feller-red/20 transition-colors"
                     >
                        <Facebook className="w-5 h-5 text-feller-red" />
                     </motion.a>
                     <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-feller-red/10 rounded-full flex items-center justify-center hover:bg-feller-red/20 transition-colors"
                     >
                        <Instagram className="w-5 h-5 text-feller-red" />
                     </motion.a>
                     <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-feller-red/10 rounded-full flex items-center justify-center hover:bg-feller-red/20 transition-colors"
                     >
                        <Twitter className="w-5 h-5 text-feller-red" />
                     </motion.a>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
                  <ul className="space-y-2">
                     <li>
                        <button
                           onClick={() => scrollToSection('hero')}
                           className="text-gray-400 hover:text-feller-red transition-colors"
                        >
                           Inicio
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('cars')}
                           className="text-gray-400 hover:text-feller-red transition-colors"
                        >
                           Catálogo de Autos
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('wash')}
                           className="text-gray-400 hover:text-feller-red transition-colors"
                        >
                           Servicio de Lavado
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('about')}
                           className="text-gray-400 hover:text-feller-red transition-colors"
                        >
                           Sobre Nosotros
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => scrollToSection('contact')}
                           className="text-gray-400 hover:text-feller-red transition-colors"
                        >
                           Contacto
                        </button>
                     </li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h3 className="text-white font-semibold mb-4">Contacto</h3>
                  <ul className="space-y-3">
                     <li className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-feller-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-sm">
                           Av. Principal 1234<br />Buenos Aires, Argentina
                        </span>
                     </li>
                     <li className="flex items-start space-x-2">
                        <Phone className="w-5 h-5 text-feller-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-sm">
                           +54 11 1234-5678
                        </span>
                     </li>
                     <li className="flex items-start space-x-2">
                        <Mail className="w-5 h-5 text-feller-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-sm">
                           info@fellerautomotores.com
                        </span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-feller-red/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © {currentYear} Feller Automotores. Todos los derechos reservados.
               </p>
               <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-gray-400 hover:text-feller-red transition-colors">
                     Términos y Condiciones
                  </a>
                  <a href="#" className="text-gray-400 hover:text-feller-red transition-colors">
                     Política de Privacidad
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}
