import { useState, useEffect } from 'react'
import { turnosAPI, type Turno } from '@/lib/api'
import toast from 'react-hot-toast'

export function useTurnos() {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await turnosAPI.getAll()
        setTurnos(response.data)
        setError(null)
      } catch (error: any) {
        console.error('Error al cargar turnos:', error)
        const errorMessage = error.response?.data?.message || 'Error al cargar turnos'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchTurnos()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const response = await turnosAPI.getAll()
      setTurnos(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Error al cargar turnos:', error)
      const errorMessage = error.response?.data?.message || 'Error al cargar turnos'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { turnos, setTurnos, loading, error, refresh }
}
