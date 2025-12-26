import { useState, useEffect } from 'react'
import { usuariosAPI, Usuario } from '@/lib/api'
import toast from 'react-hot-toast'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await usuariosAPI.getAll()
        setUsuarios(response.data)
        setError(null)
      } catch (error: any) {
        console.error('Error al cargar usuarios:', error)
        const errorMessage = error.response?.data?.message || 'Error al cargar usuarios'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const response = await usuariosAPI.getAll()
      setUsuarios(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error)
      const errorMessage = error.response?.data?.message || 'Error al cargar usuarios'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { usuarios, setUsuarios, loading, error, refresh }
}
