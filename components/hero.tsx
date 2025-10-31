"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
   const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
         element.scrollIntoView({ behavior: "smooth" })
      }
   }

   return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img
               src="/Feller2.png"
               alt="Hero background"
               className="w-full h-full object-cover opacity-40 sm:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
         </div>

         {/* Content */}
         <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 sm:mb-8"
               >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                  <span className="text-xs sm:text-sm text-accent font-medium">Excelencia Automotriz</span>
               </motion.div>

               <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
               >
                  FELLER AUTOMOTORES
               </motion.h1>

               <motion.p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
               >
                  Excelencia en autos y lavado premium. Tu destino para vehículos de calidad y cuidado profesional.
               </motion.p>

               <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
               >
                  <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto" onClick={() => scrollToSection("cars")}>
                     Ver Autos
                     <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button
                     size="lg"
                     variant="outline"
                     className="text-sm sm:text-base bg-transparent w-full sm:w-auto"
                     onClick={() => scrollToSection("wash")}
                  >
                     Reservar Lavado
                  </Button>
               </motion.div>
            </div>
         </div>

         {/* Scroll Indicator */}
         <motion.div
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
         >
            <motion.div
               animate={{ y: [0, 8, 0] }}
               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
               className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5 sm:p-2"
            >
               <motion.div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full" />
            </motion.div>
         </motion.div>
      </section>
   )
}
