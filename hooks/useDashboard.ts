import { useState, useEffect } from 'react'
import { dashboardAPI } from '@/lib/api'
import { Car, Users, Calendar, Package } from 'lucide-react'
import toast from 'react-hot-toast'

interface StatCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
  color: string
}

export function useDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Ventas del Mes',
      value: '$125,500',
      change: '+12.5%',
      trend: 'up',
      icon: Car,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Vehículos en Stock',
      value: '24',
      change: '-3',
      trend: 'down',
      icon: Car,
      color: 'from-[#b71c1c] to-[#8b0000]',
    },
    {
      title: 'Usuarios Activos',
      value: '342',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Turnos Pendientes',
      value: '12',
      change: '+5',
      trend: 'up',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getResumen()
        const data = response.data
        
        setStats([
          {
            title: 'Autos Publicados',
            value: data.autosPublicados.toString(),
            change: '+' + data.autosPublicados,
            trend: 'up',
            icon: Car,
            color: 'from-[#b71c1c] to-[#8b0000]',
          },
          {
            title: 'Usuarios Registrados',
            value: data.usuariosRegistrados.toString(),
            change: '+' + data.usuariosRegistrados,
            trend: 'up',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
          },
          {
            title: 'Turnos Pendientes',
            value: data.turnosPendientes.toString(),
            change: data.turnosPendientes.toString(),
            trend: data.turnosPendientes > 0 ? 'up' : 'down',
            icon: Calendar,
            color: 'from-orange-500 to-orange-600',
          },
          {
            title: 'Turnos del Día',
            value: data.turnosDelDia.toString(),
            change: '+' + data.turnosDelDia,
            trend: 'up',
            icon: Package,
            color: 'from-green-500 to-emerald-600',
          },
        ])
        setError(null)
      } catch (error: any) {
        console.error('Error al cargar estadísticas:', error)
        const errorMessage = error.response?.data?.message || 'Error al cargar estadísticas'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { stats, loading, error }
}
