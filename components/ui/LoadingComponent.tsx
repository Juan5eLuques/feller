'use client'

import { motion } from 'framer-motion'

export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-feller-black">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo animado */}
        <motion.div
          className="text-6xl font-montserrat font-bold mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white">FELLER</span>
          <span className="text-feller-red"> AUTOMOTORES</span>
        </motion.div>

        {/* Spinner */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-feller-red rounded-full"
              animate={{
                y: [-10, 10, -10],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
