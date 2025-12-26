import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Feller Automotores - Venta de Autos y Servicio de Lavado',
  description: 'Concesionaria de autos premium con servicio de lavado profesional',
  keywords: ['autos', 'venta de autos', 'lavado de autos', 'Feller'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${montserrat.variable} ${poppins.variable} antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #b71c1c',
            },
            success: {
              iconTheme: {
                primary: '#b71c1c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#8b0000',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
