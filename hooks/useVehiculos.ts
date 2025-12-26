import { useState, useEffect } from 'react'
import { autosAPI, type Auto } from '@/lib/api'
import toast from 'react-hot-toast'

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await autosAPI.getAll()
        setVehiculos(response.data)
        setError(null)
      } catch (error: any) {
        console.error('Error al cargar vehículos:', error)
        const errorMessage = error.response?.data?.message || 'Error al cargar vehículos'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchVehiculos()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const response = await autosAPI.getAll()
      setVehiculos(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Error al cargar vehículos:', error)
      const errorMessage = error.response?.data?.message || 'Error al cargar vehículos'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { vehiculos, setVehiculos, loading, error, refresh }
}
