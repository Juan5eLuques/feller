// 📡 CLIENTE API - Feller Automotores
// Cliente completo para conectar con el backend .NET

import axios, { AxiosInstance } from 'axios';
import type * as T from './types/api.types';

// ============================================================================
// CONFIGURACIÓN AXIOS
// ============================================================================

/**
 * Instancia de Axios configurada con base URL y headers
 * La URL del backend se obtiene de las variables de entorno
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Log para debugging (solo en desarrollo)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔧 API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api');
}

/**
 * Interceptor REQUEST: Agregar token JWT automáticamente
 */
api.interceptors.request.use(
  (config) => {
    // Solo agregar token si estamos en el navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor RESPONSE: Manejar errores de autenticación
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token inválido o expirado (401 Unauthorized)
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Limpiar datos de sesión
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      
      // Redirigir a login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// ============================================================================
// 1. 🔐 AUTENTICACIÓN
// ============================================================================

export const authAPI = {
  /**
   * 1.1 Registro de Usuario
   * @endpoint POST /api/auth/register
   * @auth No requerida
   */
  register: async (data: T.RegisterRequest): Promise<T.RegisterResponse> => {
    const response = await api.post<T.RegisterResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * 1.2 Login
   * @endpoint POST /api/auth/login
   * @auth No requerida
   */
  login: async (data: T.LoginRequest): Promise<T.LoginResponse> => {
    const response = await api.post<T.LoginResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * 1.3 Obtener Usuario Actual
   * @endpoint GET /api/auth/me
   * @auth Requerida
   */
  me: async (): Promise<T.UsuarioActualResponse> => {
    const response = await api.get<T.UsuarioActualResponse>('/auth/me');
    return response.data;
  },
};

// ============================================================================
// 2. 👥 USUARIOS (ADMIN)
// ============================================================================

export const usuariosAPI = {
  /**
   * 2.1 Listar Todos los Usuarios
   * @endpoint GET /api/usuarios
   * @auth Requerida (Admin)
   */
  getAll: async (): Promise<T.UsuariosListResponse> => {
    const response = await api.get<T.UsuariosListResponse>('/usuarios');
    return response.data;
  },

  /**
   * 2.2 Obtener Usuario por ID
   * @endpoint GET /api/usuarios/{id}
   * @auth Requerida
   */
  getById: async (id: number): Promise<T.UsuarioResponse> => {
    const response = await api.get<T.UsuarioResponse>(`/usuarios/${id}`);
    return response.data;
  },

  /**
   * 2.3 Actualizar Usuario
   * @endpoint PUT /api/usuarios/{id}
   * @auth Requerida (Admin)
   */
  update: async (id: number, data: T.UpdateUsuarioRequest): Promise<T.UpdateUsuarioResponse> => {
    const response = await api.put<T.UpdateUsuarioResponse>(`/usuarios/${id}`, data);
    return response.data;
  },

  /**
   * 2.4 Eliminar Usuario
   * @endpoint DELETE /api/usuarios/{id}
   * @auth Requerida (Admin)
   */
  delete: async (id: number): Promise<T.DeleteUsuarioResponse> => {
    const response = await api.delete<T.DeleteUsuarioResponse>(`/usuarios/${id}`);
    return response.data;
  },

  /**
   * 2.5 Ver Turnos de un Usuario
   * @endpoint GET /api/usuarios/{id}/turnos
   * @auth Requerida
   */
  getTurnos: async (id: number): Promise<T.TurnosDeUsuarioResponse> => {
    const response = await api.get<T.TurnosDeUsuarioResponse>(`/usuarios/${id}/turnos`);
    return response.data;
  },
};

// ============================================================================
// 3. 🚗 AUTOS
// ============================================================================

export const autosAPI = {
  /**
   * 3.1 Listar Todos los Autos
   * @endpoint GET /api/autos
   * @auth No requerida
   */
  getAll: async (): Promise<T.AutosListResponse> => {
    const response = await api.get<T.AutosListResponse>('/autos');
    return response.data;
  },

  /**
   * 3.2 Obtener Auto por ID
   * @endpoint GET /api/autos/{id}
   * @auth No requerida
   */
  getById: async (id: number): Promise<T.AutoResponse> => {
    const response = await api.get<T.AutoResponse>(`/autos/${id}`);
    return response.data;
  },

  /**
   * 3.3 Crear Auto
   * @endpoint POST /api/autos
   * @auth Requerida (Admin)
   */
  create: async (data: T.CreateAutoRequest): Promise<T.CreateAutoResponse> => {
    const response = await api.post<T.CreateAutoResponse>('/autos', data);
    return response.data;
  },

  /**
   * 3.4 Actualizar Auto
   * @endpoint PUT /api/autos/{id}
   * @auth Requerida (Admin)
   */
  update: async (id: number, data: T.UpdateAutoRequest): Promise<T.UpdateAutoResponse> => {
    const response = await api.put<T.UpdateAutoResponse>(`/autos/${id}`, data);
    return response.data;
  },

  /**
   * 3.5 Eliminar Auto
   * @endpoint DELETE /api/autos/{id}
   * @auth Requerida (Admin)
   */
  delete: async (id: number): Promise<T.DeleteAutoResponse> => {
    const response = await api.delete<T.DeleteAutoResponse>(`/autos/${id}`);
    return response.data;
  },

  /**
   * 3.6 Subir Imagen de Auto
   * @endpoint POST /api/autos/{id}/imagenes
   * @auth Requerida (Admin)
   * @contentType multipart/form-data
   */
  uploadImagen: async (autoId: number, file: File): Promise<T.AutoImagenUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<T.AutoImagenUploadResponse>(
      `/autos/${autoId}/imagenes`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  },

  /**
   * 3.7 Eliminar Imagen de Auto
   * @endpoint DELETE /api/autos/{autoId}/imagenes/{imagenId}
   * @auth Requerida (Admin)
   */
  deleteImagen: async (autoId: number, imagenId: number): Promise<T.DeleteAutoImagenResponse> => {
    const response = await api.delete<T.DeleteAutoImagenResponse>(
      `/autos/${autoId}/imagenes/${imagenId}`
    );
    return response.data;
  },
};

// ============================================================================
// 4. 🏍️ MOTOS
// ============================================================================

export const motosAPI = {
  /**
   * 4.1 Listar Todas las Motos
   * @endpoint GET /api/motos
   * @auth No requerida
   */
  getAll: async (): Promise<T.MotosListResponse> => {
    const response = await api.get<T.MotosListResponse>('/motos');
    return response.data;
  },

  /**
   * 4.2 Obtener Moto por ID
   * @endpoint GET /api/motos/{id}
   * @auth No requerida
   */
  getById: async (id: number): Promise<T.MotoResponse> => {
    const response = await api.get<T.MotoResponse>(`/motos/${id}`);
    return response.data;
  },

  /**
   * 4.3 Crear Moto
   * @endpoint POST /api/motos
   * @auth Requerida (Admin)
   */
  create: async (data: T.CreateMotoRequest): Promise<T.CreateMotoResponse> => {
    const response = await api.post<T.CreateMotoResponse>('/motos', data);
    return response.data;
  },

  /**
   * 4.4 Actualizar Moto
   * @endpoint PUT /api/motos/{id}
   * @auth Requerida (Admin)
   */
  update: async (id: number, data: T.UpdateMotoRequest): Promise<T.UpdateMotoResponse> => {
    const response = await api.put<T.UpdateMotoResponse>(`/motos/${id}`, data);
    return response.data;
  },

  /**
   * 4.5 Eliminar Moto
   * @endpoint DELETE /api/motos/{id}
   * @auth Requerida (Admin)
   */
  delete: async (id: number): Promise<T.DeleteMotoResponse> => {
    const response = await api.delete<T.DeleteMotoResponse>(`/motos/${id}`);
    return response.data;
  },

  /**
   * 4.6 Subir Imagen de Moto
   * @endpoint POST /api/motos/{id}/imagenes
   * @auth Requerida (Admin)
   * @contentType multipart/form-data
   */
  uploadImagen: async (motoId: number, file: File): Promise<T.MotoImagenUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<T.MotoImagenUploadResponse>(
      `/motos/${motoId}/imagenes`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  },

  /**
   * 4.7 Eliminar Imagen de Moto
   * @endpoint DELETE /api/motos/{motoId}/imagenes/{imagenId}
   * @auth Requerida (Admin)
   */
  deleteImagen: async (motoId: number, imagenId: number): Promise<T.DeleteMotoImagenResponse> => {
    const response = await api.delete<T.DeleteMotoImagenResponse>(
      `/motos/${motoId}/imagenes/${imagenId}`
    );
    return response.data;
  },
};

// ============================================================================
// 5. ⭐ DESTACADOS
// ============================================================================

export const destacadosAPI = {
  /**
   * 5.1 Obtener Todos los Vehículos Destacados (Autos y Motos)
   * @endpoint GET /api/destacados
   * @auth No requerida
   */
  getAll: async (): Promise<T.DestacadosResponse> => {
    const response = await api.get<T.DestacadosResponse>('/destacados');
    return response.data;
  },

  /**
   * 5.2 Obtener Solo Autos Destacados
   * @endpoint GET /api/destacados/autos
   * @auth No requerida
   */
  getAutos: async (): Promise<T.DestacadosAutosResponse> => {
    const response = await api.get<T.DestacadosAutosResponse>('/destacados/autos');
    return response.data;
  },

  /**
   * 5.3 Obtener Solo Motos Destacadas
   * @endpoint GET /api/destacados/motos
   * @auth No requerida
   */
  getMotos: async (): Promise<T.DestacadosMotosResponse> => {
    const response = await api.get<T.DestacadosMotosResponse>('/destacados/motos');
    return response.data;
  },

  /**
   * 5.4 Marcar Auto como Destacado (Admin)
   * @endpoint POST /api/destacados/autos/{id}?orden={numero}
   * @auth Requerida (Admin)
   */
  marcarAutoDestacado: async (id: number, orden?: number): Promise<T.AutoResponse> => {
    const url = orden ? `/destacados/autos/${id}?orden=${orden}` : `/destacados/autos/${id}`;
    const response = await api.post<T.AutoResponse>(url);
    return response.data;
  },

  /**
   * 5.5 Marcar Moto como Destacada (Admin)
   * @endpoint POST /api/destacados/motos/{id}?orden={numero}
   * @auth Requerida (Admin)
   */
  marcarMotoDestacada: async (id: number, orden?: number): Promise<T.MotoResponse> => {
    const url = orden ? `/destacados/motos/${id}?orden=${orden}` : `/destacados/motos/${id}`;
    const response = await api.post<T.MotoResponse>(url);
    return response.data;
  },

  /**
   * 5.6 Desmarcar Auto como Destacado (Admin)
   * @endpoint DELETE /api/destacados/autos/{id}
   * @auth Requerida (Admin)
   */
  desmarcarAutoDestacado: async (id: number): Promise<T.AutoResponse> => {
    const response = await api.delete<T.AutoResponse>(`/destacados/autos/${id}`);
    return response.data;
  },

  /**
   * 5.7 Desmarcar Moto como Destacada (Admin)
   * @endpoint DELETE /api/destacados/motos/{id}
   * @auth Requerida (Admin)
   */
  desmarcarMotoDestacada: async (id: number): Promise<T.MotoResponse> => {
    const response = await api.delete<T.MotoResponse>(`/destacados/motos/${id}`);
    return response.data;
  },
};

// ============================================================================
// 6. 📅 TURNOS
// ============================================================================

export const turnosAPI = {
  /**
   * 5.1 Obtener Mis Turnos (Cliente)
   * @endpoint GET /api/turnos/mios
   * @auth Requerida
   */
  getMios: async (): Promise<T.MisTurnosResponse> => {
    const response = await api.get<T.MisTurnosResponse>('/turnos/mios');
    return response.data;
  },

  /**
   * 5.2 Crear Turno
   * @endpoint POST /api/turnos
   * @auth Requerida
   */
  create: async (data: T.CreateTurnoRequest): Promise<T.CreateTurnoResponse> => {
    const response = await api.post<T.CreateTurnoResponse>('/turnos', data);
    return response.data;
  },

  /**
   * 5.3 Verificar Disponibilidad
   * @endpoint GET /api/turnos/disponibilidad?fecha={fecha}
   * @auth Requerida
   */
  getDisponibilidad: async (fecha: string): Promise<T.DisponibilidadResponse> => {
    const response = await api.get<T.DisponibilidadResponse>(
      `/turnos/disponibilidad?fecha=${fecha}`
    );
    return response.data;
  },

  /**
   * 5.4 Listar Todos los Turnos (Admin)
   * @endpoint GET /api/turnos
   * @auth Requerida (Admin)
   */
  getAll: async (): Promise<T.TurnosListResponse> => {
    const response = await api.get<T.TurnosListResponse>('/turnos');
    return response.data;
  },

  /**
   * 5.5 Actualizar Estado de Turno (Admin)
   * @endpoint PUT /api/turnos/{id}/estado
   * @auth Requerida (Admin)
   * @note Al cambiar a "Finalizado" se envía WhatsApp automáticamente
   */
  updateEstado: async (
    id: number,
    data: T.UpdateEstadoTurnoRequest
  ): Promise<T.UpdateEstadoTurnoResponse> => {
    const response = await api.put<T.UpdateEstadoTurnoResponse>(`/turnos/${id}/estado`, data);
    return response.data;
  },

  /**
   * 5.6 Cancelar Turno
   * @endpoint DELETE /api/turnos/{id}
   * @auth Requerida
   */
  cancel: async (id: number): Promise<T.CancelarTurnoResponse> => {
    const response = await api.delete<T.CancelarTurnoResponse>(`/turnos/${id}`);
    return response.data;
  },
};

// ============================================================================
// 6. 📬 NOTIFICACIONES (ADMIN)
// ============================================================================

export const notificacionesAPI = {
  /**
   * 6.1 Ver Historial de Notificaciones
   * @endpoint GET /api/notificaciones
   * @auth Requerida (Admin)
   */
  getAll: async (): Promise<T.NotificacionesListResponse> => {
    const response = await api.get<T.NotificacionesListResponse>('/notificaciones');
    return response.data;
  },

  /**
   * 6.2 Enviar WhatsApp Manual
   * @endpoint POST /api/notificaciones/whatsapp
   * @auth Requerida (Admin)
   */
  enviarWhatsApp: async (data: T.EnviarWhatsAppRequest): Promise<T.EnviarWhatsAppResponse> => {
    const response = await api.post<T.EnviarWhatsAppResponse>('/notificaciones/whatsapp', data);
    return response.data;
  },
};

// ============================================================================
// 7. 📊 DASHBOARD (ADMIN)
// ============================================================================

export const dashboardAPI = {
  /**
   * 7.1 Obtener Resumen de Estadísticas
   * @endpoint GET /api/dashboard/resumen
   * @auth Requerida (Admin)
   */
  getResumen: async (): Promise<T.DashboardStatsResponse> => {
    const response = await api.get<T.DashboardStatsResponse>('/dashboard/resumen');
    return response.data;
  },
};

// ============================================================================
// 8. 🌱 SEED (SOLO DESARROLLO)
// ============================================================================

/**
 * ⚠️ ADVERTENCIA: Estos endpoints NO deben estar disponibles en producción
 * Eliminar SeedController.cs antes del deploy
 */
export const seedAPI = {
  /**
   * 8.1 Crear Primer Admin
   * @endpoint POST /api/seed/create-first-admin
   * @auth No requerida
   */
  createFirstAdmin: async (): Promise<T.CreateFirstAdminResponse> => {
    const response = await api.post<T.CreateFirstAdminResponse>('/seed/create-first-admin');
    return response.data;
  },

  /**
   * 8.2 Crear Datos de Prueba
   * @endpoint POST /api/seed/seed-test-data
   * @auth No requerida
   */
  seedTestData: async (): Promise<T.SeedTestDataResponse> => {
    const response = await api.post<T.SeedTestDataResponse>('/seed/seed-test-data');
    return response.data;
  },

  /**
   * 8.3 Eliminar Todos los Datos
   * @endpoint DELETE /api/seed/delete-all-data?confirmacion=CONFIRMO_ELIMINAR_TODO
   * @auth No requerida
   * @danger Acción irreversible
   */
  deleteAllData: async (): Promise<T.DeleteAllDataResponse> => {
    const response = await api.delete<T.DeleteAllDataResponse>(
      '/seed/delete-all-data?confirmacion=CONFIRMO_ELIMINAR_TODO'
    );
    return response.data;
  },
};

// ============================================================================
// 🛠️ UTILIDADES DE FORMATEO
// ============================================================================

/**
 * Formatear fecha ISO a formato argentino (DD/MM/YYYY)
 */
export const formatearFecha = (fechaISO: string): string => {
  return new Date(fechaISO).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formatear precio a formato argentino (ARS)
 */
export const formatearPrecio = (precio: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(precio);
};

/**
 * Formatear hora de "HH:mm:ss" a "HH:mm"
 */
export const formatearHora = (horaString: string): string => {
  return horaString.substring(0, 5);
};

/**
 * Formatear kilometraje
 */
export const formatearKilometraje = (km: number | null): string => {
  if (!km) return '0 km';
  return new Intl.NumberFormat('es-AR').format(km) + ' km';
};

/**
 * Obtener configuración de badge de estado
 */
export const getEstadoBadge = (estado: string): { label: string; color: string } => {
  const config: Record<string, { label: string; color: string }> = {
    '0km': {
      label: '0 KM',
      color: 'green',
    },
    'Usado': {
      label: 'Usado',
      color: 'blue',
    }
  };
  return config[estado] || config['Usado'];
};

// ============================================================================
// EXPORTACIONES
// ============================================================================

export default api;

// Re-exportar todos los tipos para facilitar importación
export type * from './types/api.types';
