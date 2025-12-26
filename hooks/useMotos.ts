import { useState, useEffect } from 'react'
import { motosAPI, type Moto } from '@/lib/api'
import toast from 'react-hot-toast'

export function useMotos() {
  const [motos, setMotos] = useState<Moto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await motosAPI.getAll()
        setMotos(response.data)
        setError(null)
      } catch (error: any) {
        console.error('Error al cargar motos:', error)
        const errorMessage = error.response?.data?.message || 'Error al cargar motos'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchMotos()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const response = await motosAPI.getAll()
      setMotos(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Error al cargar motos:', error)
      const errorMessage = error.response?.data?.message || 'Error al cargar motos'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { motos, setMotos, loading, error, refresh }
}
