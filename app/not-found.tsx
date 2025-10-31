'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-feller-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-9xl font-montserrat font-bold text-feller-red mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-feller-red text-white font-semibold rounded-lg hover:bg-feller-darkred transition-colors"
          >
            Volver al inicio
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
