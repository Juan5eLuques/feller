"use client"

import { motion } from "framer-motion"
import { Car } from "lucide-react"

interface SplashScreenProps {
   onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
   return (
      <motion.div
         className="fixed inset-0 z-100 flex items-center justify-center bg-black cursor-pointer px-4"
         onClick={onComplete}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <motion.div
            className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
         >
            {/* Logo Icon */}
            <motion.div
               initial={{ rotate: -180, scale: 0 }}
               animate={{ rotate: 0, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
               <Car className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-accent" strokeWidth={1.5} />
            </motion.div>

            {/* Text */}
            <motion.div
               className="text-center sm:text-left"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5, duration: 0.6 }}
            >
               <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-2">
                  FELLER
               </h1>
               <p className="text-base sm:text-lg md:text-xl font-light tracking-wide text-muted-foreground">
                  AUTOMOTORES
               </p>
            </motion.div>
         </motion.div>

         <motion.p
            className="absolute bottom-8 sm:bottom-12 text-xs sm:text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY }}
         >
            Click para continuar
         </motion.p>
      </motion.div>
   )
}
