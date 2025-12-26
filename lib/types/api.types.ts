// 📡 TIPOS DE API - Feller Automotores
// Estructura completa de Request/Response para cada endpoint

// ============================================================================
// TIPOS BASE
// ============================================================================

/**
 * Wrapper estándar de respuesta del backend
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  errors: string[] | null;
}

/**
 * Roles disponibles en el sistema
 */
export type UserRole = 'Admin' | 'Cliente';

/**
 * Estados de turno
 */
export type TurnoEstado = 'Pendiente' | 'EnProceso' | 'Finalizado' | 'Cancelado';

/**
 * Tipos de lavado disponibles
 */
export type TipoLavado = 'Básico' | 'Completo' | 'Premium';

/**
 * Tipos de notificación
 */
export type TipoNotificacion = 'WhatsApp' | 'Email' | 'SMS';

// ============================================================================
// 1. AUTENTICACIÓN
// ============================================================================

// 1.1 Registro
export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface AuthData {
  token: string;
  email: string;
  nombre: string;
  rol: UserRole;
}

export type RegisterResponse = ApiResponse<AuthData>;

// 1.2 Login
export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<AuthData>;

// 1.3 Usuario Actual
export interface UsuarioActual {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  rol: UserRole;
  fechaRegistro: string; // ISO 8601
}

export type UsuarioActualResponse = ApiResponse<UsuarioActual>;

// ============================================================================
// 2. USUARIOS (ADMIN)
// ============================================================================

// 2.1 & 2.2 Usuario (Lista e individual)
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  rol: UserRole;
  fechaRegistro: string; // ISO 8601
}

export type UsuariosListResponse = ApiResponse<Usuario[]>;
export type UsuarioResponse = ApiResponse<Usuario>;

// 2.3 Actualizar Usuario
export interface UpdateUsuarioRequest {
  nombre?: string;
  email?: string;
  telefono?: string;
  rol?: UserRole;
}

export type UpdateUsuarioResponse = ApiResponse<Usuario>;

// 2.4 Eliminar Usuario
export type DeleteUsuarioResponse = ApiResponse<null>;

// 2.5 Turnos de Usuario
export interface TurnoDeUsuario {
  id: number;
  usuarioId: number;
  nombreUsuario: string;
  emailUsuario: string;
  fecha: string; // ISO 8601
  hora: string; // "HH:mm:ss"
  tipoLavado: TipoLavado;
  estado: TurnoEstado;
  fechaFinalizacion: string | null; // ISO 8601
  fechaCreacion: string; // ISO 8601
}

export type TurnosDeUsuarioResponse = ApiResponse<TurnoDeUsuario[]>;

// ============================================================================
// 3. AUTOS
// ============================================================================

/**
 * Estados de vehículo (autos y motos)
 */
export type EstadoVehiculo = '0km' | 'Usado';

/**
 * Tipos de combustible
 */
export type TipoCombustible = 'Nafta' | 'Gasoil' | 'GNC' | 'Híbrido' | 'Eléctrico';

/**
 * Tipos de transmisión
 */
export type TipoTransmision = 'Manual' | 'Automática';

/**
 * Tipos de moto
 */
export type TipoMoto = 'Deportiva' | 'Cruiser' | 'Touring' | 'Naked' | 'Enduro';

// 3.1 Imagen de Auto
export interface AutoImagen {
  id: number;
  url: string;
}

// 3.1 & 3.2 Auto (Lista e individual)
export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string | null;
  disponible: boolean;
  estado: EstadoVehiculo;
  fechaPublicacion: string; // ISO 8601
  imagenes: AutoImagen[];
  // Propiedades específicas de autos
  puertas: number; // 2-5
  tipoCombustible: TipoCombustible;
  transmision: TipoTransmision | null;
  kilometraje: number | null;
  // Propiedades de destacados
  esDestacado: boolean;
  ordenDestacado: number | null;
}

export type AutosListResponse = ApiResponse<Auto[]>;
export type AutoResponse = ApiResponse<Auto>;

// 3.3 Crear Auto
export interface CreateAutoRequest {
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion?: string;
  disponible: boolean;
  estado: EstadoVehiculo;
  puertas: number; // 2-5
  tipoCombustible: TipoCombustible;
  transmision?: TipoTransmision;
  kilometraje?: number | null;
}

export type CreateAutoResponse = ApiResponse<Auto>;

// 3.4 Actualizar Auto
export interface UpdateAutoRequest {
  marca?: string;
  modelo?: string;
  anio?: number;
  precio?: number;
  descripcion?: string;
  disponible?: boolean;
  estado?: EstadoVehiculo;
  puertas?: number;
  tipoCombustible?: TipoCombustible;
  transmision?: TipoTransmision | null;
  kilometraje?: number | null;
}

export type UpdateAutoResponse = ApiResponse<Auto>;

// 3.5 Eliminar Auto
export type DeleteAutoResponse = ApiResponse<null>;

// 3.6 Subir Imagen
export interface UploadImagenResponse {
  id: number;
  url: string;
}

export type AutoImagenUploadResponse = ApiResponse<UploadImagenResponse>;

// 3.7 Eliminar Imagen
export type DeleteAutoImagenResponse = ApiResponse<null>;

// ============================================================================
// 4. MOTOS
// ============================================================================

// 4.1 Imagen de Moto
export interface MotoImagen {
  id: number;
  url: string;
}

// 4.1 & 4.2 Moto (Lista e individual)
export interface Moto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string | null;
  disponible: boolean;
  estado: EstadoVehiculo;
  fechaPublicacion: string; // ISO 8601
  imagenes: MotoImagen[];
  // Propiedades específicas de motos
  cilindrada: number; // 50-2000
  tipoMoto: TipoMoto | null;
  kilometraje: number | null;
  // Propiedades de destacados
  esDestacado: boolean;
  ordenDestacado: number | null;
}

export type MotosListResponse = ApiResponse<Moto[]>;
export type MotoResponse = ApiResponse<Moto>;

// 4.3 Crear Moto
export interface CreateMotoRequest {
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion?: string;
  disponible: boolean;
  estado: EstadoVehiculo;
  cilindrada: number; // 50-2000
  tipoMoto?: TipoMoto;
  kilometraje?: number | null;
}

export type CreateMotoResponse = ApiResponse<Moto>;

// 4.4 Actualizar Moto
export interface UpdateMotoRequest {
  marca?: string;
  modelo?: string;
  anio?: number;
  precio?: number;
  descripcion?: string;
  disponible?: boolean;
  estado?: EstadoVehiculo;
  cilindrada?: number;
  tipoMoto?: TipoMoto | null;
  kilometraje?: number | null;
}

export type UpdateMotoResponse = ApiResponse<Moto>;

// 4.5 Eliminar Moto
export type DeleteMotoResponse = ApiResponse<null>;

// 4.6 Subir Imagen
export type MotoImagenUploadResponse = ApiResponse<UploadImagenResponse>;

// 4.7 Eliminar Imagen
export type DeleteMotoImagenResponse = ApiResponse<null>;

// ============================================================================
// 5. ⭐ DESTACADOS
// ============================================================================

/**
 * Tipo de vehículo destacado
 */
export type TipoVehiculoDestacado = 'Auto' | 'Moto';

/**
 * Vehículo destacado (puede ser auto o moto)
 */
export interface VehiculoDestacado {
  tipo: TipoVehiculoDestacado;
  vehiculo: Auto | Moto;
}

/**
 * Lista de vehículos destacados
 */
export type DestacadosResponse = ApiResponse<VehiculoDestacado[]>;

/**
 * Lista de autos destacados
 */
export type DestacadosAutosResponse = ApiResponse<Auto[]>;

/**
 * Lista de motos destacadas
 */
export type DestacadosMotosResponse = ApiResponse<Moto[]>;

// ============================================================================
// 6. 📅 TURNOS
// ============================================================================

// 5.1 Turno (Mis Turnos y Lista Admin)
export interface Turno {
  id: number;
  usuarioId: number;
  nombreUsuario: string;
  emailUsuario: string;
  fecha: string; // ISO 8601
  hora: string; // "HH:mm:ss"
  tipoLavado: TipoLavado;
  estado: TurnoEstado;
  fechaFinalizacion: string | null; // ISO 8601
  fechaCreacion: string; // ISO 8601
}

export type MisTurnosResponse = ApiResponse<Turno[]>;
export type TurnosListResponse = ApiResponse<Turno[]>;
export type TurnoResponse = ApiResponse<Turno>;

// 5.2 Crear Turno
export interface CreateTurnoRequest {
  fecha: string; // "YYYY-MM-DD"
  hora: string; // "HH:mm:ss"
  tipoLavado: TipoLavado;
}

export type CreateTurnoResponse = ApiResponse<Turno>;

// 5.3 Verificar Disponibilidad
export interface DisponibilidadData {
  fecha: string; // ISO 8601
  horariosDisponibles: string[]; // ["09:00", "10:00", ...]
}

export type DisponibilidadResponse = ApiResponse<DisponibilidadData>;

// 5.5 Actualizar Estado
export interface UpdateEstadoTurnoRequest {
  estado: TurnoEstado;
}

export type UpdateEstadoTurnoResponse = ApiResponse<Turno>;

// 5.6 Cancelar Turno
export type CancelarTurnoResponse = ApiResponse<null>;

// ============================================================================
// 6. NOTIFICACIONES (ADMIN)
// ============================================================================

// 6.1 Notificación
export interface Notificacion {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
  mensaje: string;
  tipo: TipoNotificacion;
  fechaEnvio: string; // ISO 8601
  enviada: boolean;
}

export type NotificacionesListResponse = ApiResponse<Notificacion[]>;

// 6.2 Enviar WhatsApp Manual
export interface EnviarWhatsAppRequest {
  usuarioId: number;
  mensaje: string;
}

export interface WhatsAppData {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioTelefono: string;
  mensaje: string;
  tipo: TipoNotificacion;
  fechaEnvio: string; // ISO 8601
  enviada: boolean;
}

export type EnviarWhatsAppResponse = ApiResponse<WhatsAppData>;

// ============================================================================
// 7. DASHBOARD (ADMIN)
// ============================================================================

// 7.1 Estadísticas
export interface DashboardStats {
  autosPublicados: number;
  motosPublicadas: number;
  turnosDelDia: number;
  usuariosRegistrados: number;
  turnosPendientes: number;
  turnosEnProceso: number;
}

export type DashboardStatsResponse = ApiResponse<DashboardStats>;

// ============================================================================
// 8. SEED (SOLO DESARROLLO)
// ============================================================================

// 8.1 Crear Primer Admin
export interface FirstAdminData {
  email: string;
  password: string;
  instrucciones: string;
}

export type CreateFirstAdminResponse = ApiResponse<FirstAdminData>;

// 8.2 Crear Datos de Prueba
export interface SeedTestData {
  admin: {
    email: string;
    password: string;
  };
  cliente: {
    email: string;
    password: string;
  };
  autos: number;
  motos: number;
}

export type SeedTestDataResponse = ApiResponse<SeedTestData>;

// 8.3 Eliminar Todos los Datos
export type DeleteAllDataResponse = ApiResponse<null>;

// ============================================================================
// TIPOS DE ERROR
// ============================================================================

/**
 * Error de validación del backend
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Error de API estándar
 */
export interface ApiError {
  success: false;
  message: string;
  data: null;
  errors: string[] | null;
}

// ============================================================================
// QUERY PARAMS
// ============================================================================

/**
 * Parámetros para disponibilidad de turnos
 */
export interface DisponibilidadQueryParams {
  fecha: string; // "YYYY-MM-DD"
}

/**
 * Parámetros para eliminar todos los datos
 */
export interface DeleteAllDataQueryParams {
  confirmacion: 'CONFIRMO_ELIMINAR_TODO';
}
