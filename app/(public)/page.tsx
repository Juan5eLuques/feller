'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplashScreen } from '@/components/splash-screen'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { CarsSection } from '@/components/cars-section'
import { WashSection } from '@/components/wash-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if splash has been shown before (only on client side)
    const hasSeenSplash = localStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
    }
  }, [])

  useEffect(() => {
    // Prevent scroll when splash is showing
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      // Mark that user has seen splash
      localStorage.setItem('hasSeenSplash', 'true')
    }
  }, [showSplash])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
            <Hero />
            <CarsSection />
            <WashSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
