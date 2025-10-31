import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const API_BASE_URL = 'http://localhost:5000/api'

// Crear instancia de Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token JWT a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expiró, cerrar sesión
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

// Tipos
export interface Auto {
  id: string
  marca: string
  modelo: string
  año: number
  precio: number
  kilometraje: number
  color: string
  combustible: string
  transmision: string
  descripcion: string
  imagenUrl: string
  estado: 'disponible' | 'vendido' | 'reservado'
}

export interface Turno {
  id: string
  clienteId: string
  clienteNombre: string
  fecha: string
  hora: string
  tipoServicio: string
  estado: 'pendiente' | 'confirmado' | 'completado' | 'cancelado'
  vehiculo?: string
  observaciones?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  nombre: string
  email: string
  password: string
  telefono?: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    nombre: string
    email: string
    telefono?: string
    rol: 'cliente' | 'admin'
  }
}

// API Functions
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
}

export const autosAPI = {
  getAll: async (): Promise<Auto[]> => {
    const response = await apiClient.get('/autos')
    return response.data
  },
  getById: async (id: string): Promise<Auto> => {
    const response = await apiClient.get(`/autos/${id}`)
    return response.data
  },
  create: async (data: Partial<Auto>): Promise<Auto> => {
    const response = await apiClient.post('/autos', data)
    return response.data
  },
  update: async (id: string, data: Partial<Auto>): Promise<Auto> => {
    const response = await apiClient.put(`/autos/${id}`, data)
    return response.data
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/autos/${id}`)
  },
}

export const turnosAPI = {
  getAll: async (): Promise<Turno[]> => {
    const response = await apiClient.get('/turnos')
    return response.data
  },
  getMy: async (): Promise<Turno[]> => {
    const response = await apiClient.get('/turnos/mis-turnos')
    return response.data
  },
  create: async (data: Partial<Turno>): Promise<Turno> => {
    const response = await apiClient.post('/turnos', data)
    return response.data
  },
  update: async (id: string, data: Partial<Turno>): Promise<Turno> => {
    const response = await apiClient.put(`/turnos/${id}`, data)
    return response.data
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/turnos/${id}`)
  },
}
