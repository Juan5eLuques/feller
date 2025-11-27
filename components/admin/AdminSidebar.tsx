'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Car,
  Bike,
  Users,
  Calendar,
  Bell,
  Package,
  DollarSign,
  Settings,
  ChevronRight,
  Globe,
  X,
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: any
  href: string
  badge?: number
}

interface AdminSidebarProps {
  currentPath: string
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function AdminSidebar({ currentPath, isMobileMenuOpen, setIsMobileMenuOpen }: AdminSidebarProps) {
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
    },
    {
      id: 'vehiculos',
      label: 'Vehículos',
      icon: Car,
      href: '/admin/vehiculos',
    },
    {
      id: 'motos',
      label: 'Motos',
      icon: Bike,
      href: '/admin/motos',
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: Users,
      href: '/admin/usuarios',
    },
    {
      id: 'turnos',
      label: 'Turnos',
      icon: Calendar,
      href: '/admin/turnos',
    },
    {
      id: 'notificaciones',
      label: 'Notificaciones',
      icon: Bell,
      href: '/admin/notificaciones',
    },
    {
      id: 'ventas',
      label: 'Ventas',
      icon: DollarSign,
      href: '/admin/ventas',
    },
    {
      id: 'inventario',
      label: 'Inventario',
      icon: Package,
      href: '/admin/inventario',
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: Settings,
      href: '/admin/configuracion',
    },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return currentPath === href
    }
    return currentPath.startsWith(href)
  }

  return (
    <>
      {/* Overlay para mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-full sm:w-80 lg:w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
      {/* Logo */}
      <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-[#2a2a2a]">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#b71c1c] rounded flex items-center justify-center mr-3">
              <img src={'/LogoDark.png'} alt="logo feller" className="w-24 md:w-36" ></img > 
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-montserrat tracking-tight">FELLER</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </Link>
        
        {/* Botón cerrar - solo visible en mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  group flex items-center justify-between px-4 py-3 rounded-lg
                  transition-all duration-200 relative overflow-hidden
                  ${
                    active
                      ? 'bg-[#b71c1c] text-white'
                      : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                  }
                `}
              >
                <div className="flex items-center space-x-3 relative z-10">
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#b71c1c] text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}

                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 w-1 h-full bg-white rounded-r"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer - Volver al sitio */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <Link
          href="/"
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors group"
        >
          <Globe className="w-5 h-5 text-[#b71c1c]" />
          <span className="font-medium">Ir al Sitio Web</span>
          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </aside>
    </>
  )
}
