'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const quickLinks = [
    { href: '/autos', label: 'Autos' },
    { href: '/lavado', label: 'Servicio de Lavado' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/terminos', label: 'Términos y Condiciones' },
  ]

  return (
    <footer className="bg-feller-darkgray border-t border-feller-red/20 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y Descripción */}
          <div>
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              <span className="text-white">FELLER</span>
              <span className="text-feller-red ml-1">AUTOMOTORES</span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Tu concesionaria de confianza. Venta de autos premium y servicio de lavado profesional.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-feller-black border border-feller-red/30 flex items-center justify-center hover:bg-feller-red hover:border-feller-red transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-feller-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-feller-red flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Av. Principal 1234, Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-feller-red flex-shrink-0" />
                <span className="text-sm text-gray-400">+54 11 1234-5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-feller-red flex-shrink-0" />
                <span className="text-sm text-gray-400">info@fellerautomotores.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Feller Automotores. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Diseñado con <span className="text-feller-red">❤</span> para la mejor experiencia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
