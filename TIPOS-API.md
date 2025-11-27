# 📘 ESTRUCTURA DE TIPOS - Frontend Feller Automotores

## 🎯 Objetivo

Esta estructura de tipos proporciona **type-safety completo** entre el frontend y el backend .NET, mapeando cada endpoint con sus requests y responses específicos.

---

## 📁 Archivos Principales

### `lib/types/api.types.ts`
Contiene **TODOS** los tipos TypeScript para:
- Request bodies
- Response bodies
- Entidades del dominio
- Enums y tipos de unión

### `lib/api.ts`
Cliente API que **consume** los tipos y proporciona:
- Funciones tipadas para cada endpoint
- Configuración de Axios con interceptors
- Utilidades de formateo

---

## 🏗️ Estructura de Tipos por Módulo

### 1. **TIPOS BASE**

```typescript
// Wrapper estándar de respuesta
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  errors: string[] | null;
}

// Roles del sistema
export type UserRole = 'Admin' | 'Cliente';

// Estados de turno
export type TurnoEstado = 'Pendiente' | 'EnProceso' | 'Finalizado' | 'Cancelado';

// Tipos de lavado
export type TipoLavado = 'Básico' | 'Completo' | 'Premium';

// Tipos de notificación
export type TipoNotificacion = 'WhatsApp' | 'Email' | 'SMS';
```

---

### 2. **AUTENTICACIÓN** (`/api/auth/*`)

#### Registro
```typescript
// Request
interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}

// Response data
interface AuthData {
  token: string;
  email: string;
  nombre: string;
  rol: UserRole;
}

// Response completa
type RegisterResponse = ApiResponse<AuthData>;
```

#### Login
```typescript
// Request
interface LoginRequest {
  email: string;
  password: string;
}

// Response
type LoginResponse = ApiResponse<AuthData>;
```

#### Usuario Actual (`/me`)
```typescript
// Response data
interface UsuarioActual {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  rol: UserRole;
  fechaRegistro: string; // ISO 8601
}

// Response completa
type UsuarioActualResponse = ApiResponse<UsuarioActual>;
```

---

### 3. **USUARIOS** (`/api/usuarios/*`)

#### Entidad Usuario
```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  rol: UserRole;
  fechaRegistro: string;
}
```

#### Operaciones CRUD
```typescript
// GET /usuarios - Lista completa
type UsuariosListResponse = ApiResponse<Usuario[]>;

// GET /usuarios/{id} - Individual
type UsuarioResponse = ApiResponse<Usuario>;

// PUT /usuarios/{id} - Actualizar
interface UpdateUsuarioRequest {
  nombre?: string;
  email?: string;
  telefono?: string;
  rol?: UserRole;
}
type UpdateUsuarioResponse = ApiResponse<Usuario>;

// DELETE /usuarios/{id}
type DeleteUsuarioResponse = ApiResponse<null>;
```

#### Turnos de Usuario
```typescript
// GET /usuarios/{id}/turnos
interface TurnoDeUsuario {
  id: number;
  usuarioId: number;
  nombreUsuario: string;
  emailUsuario: string;
  fecha: string;
  hora: string;
  tipoLavado: TipoLavado;
  estado: TurnoEstado;
  fechaFinalizacion: string | null;
  fechaCreacion: string;
}

type TurnosDeUsuarioResponse = ApiResponse<TurnoDeUsuario[]>;
```

---

### 4. **AUTOS** (`/api/autos/*`)

#### Entidades
```typescript
interface AutoImagen {
  id: number;
  url: string;
}

interface Auto {
  id: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  descripcion: string | null;
  disponible: boolean;
  fechaPublicacion: string;
  imagenes: AutoImagen[];
}
```

#### Operaciones CRUD
```typescript
// GET /autos
type AutosListResponse = ApiResponse<Auto[]>;

// GET /autos/{id}
type AutoResponse = ApiResponse<Auto>;

// POST /autos
interface CreateAutoRequest {
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  descripcion?: string;
  disponible: boolean;
}
type CreateAutoResponse = ApiResponse<Auto>;

// PUT /autos/{id}
interface UpdateAutoRequest {
  marca?: string;
  modelo?: string;
  año?: number;
  precio?: number;
  descripcion?: string;
  disponible?: boolean;
}
type UpdateAutoResponse = ApiResponse<Auto>;

// DELETE /autos/{id}
type DeleteAutoResponse = ApiResponse<null>;
```

#### Imágenes
```typescript
// POST /autos/{id}/imagenes
interface UploadImagenResponse {
  id: number;
  url: string;
}
type AutoImagenUploadResponse = ApiResponse<UploadImagenResponse>;

// DELETE /autos/{autoId}/imagenes/{imagenId}
type DeleteAutoImagenResponse = ApiResponse<null>;
```

---

### 5. **MOTOS** (`/api/motos/*`)

**Idéntico a Autos**, solo cambian los nombres:
- `MotoImagen` en lugar de `AutoImagen`
- `Moto` en lugar de `Auto`
- `CreateMotoRequest` en lugar de `CreateAutoRequest`
- etc.

---

### 6. **TURNOS** (`/api/turnos/*`)

#### Entidad Turno
```typescript
interface Turno {
  id: number;
  usuarioId: number;
  nombreUsuario: string;
  emailUsuario: string;
  fecha: string;
  hora: string;
  tipoLavado: TipoLavado;
  estado: TurnoEstado;
  fechaFinalizacion: string | null;
  fechaCreacion: string;
}
```

#### Operaciones
```typescript
// GET /turnos/mios (Cliente)
type MisTurnosResponse = ApiResponse<Turno[]>;

// POST /turnos
interface CreateTurnoRequest {
  fecha: string; // "YYYY-MM-DD"
  hora: string; // "HH:mm:ss"
  tipoLavado: TipoLavado;
}
type CreateTurnoResponse = ApiResponse<Turno>;

// GET /turnos/disponibilidad?fecha={fecha}
interface DisponibilidadData {
  fecha: string;
  horariosDisponibles: string[]; // ["09:00", "10:00", ...]
}
type DisponibilidadResponse = ApiResponse<DisponibilidadData>;

// GET /turnos (Admin)
type TurnosListResponse = ApiResponse<Turno[]>;

// PUT /turnos/{id}/estado (Admin)
interface UpdateEstadoTurnoRequest {
  estado: TurnoEstado;
}
type UpdateEstadoTurnoResponse = ApiResponse<Turno>;

// DELETE /turnos/{id}
type CancelarTurnoResponse = ApiResponse<null>;
```

---

### 7. **NOTIFICACIONES** (`/api/notificaciones/*`)

#### Entidad Notificación
```typescript
interface Notificacion {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
  mensaje: string;
  tipo: TipoNotificacion;
  fechaEnvio: string;
  enviada: boolean;
}
```

#### Operaciones
```typescript
// GET /notificaciones
type NotificacionesListResponse = ApiResponse<Notificacion[]>;

// POST /notificaciones/whatsapp
interface EnviarWhatsAppRequest {
  usuarioId: number;
  mensaje: string;
}

interface WhatsAppData {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioTelefono: string;
  mensaje: string;
  tipo: TipoNotificacion;
  fechaEnvio: string;
  enviada: boolean;
}

type EnviarWhatsAppResponse = ApiResponse<WhatsAppData>;
```

---

### 8. **DASHBOARD** (`/api/dashboard/*`)

```typescript
// GET /dashboard/resumen
interface DashboardStats {
  autosPublicados: number;
  motosPublicadas: number;
  turnosDelDia: number;
  usuariosRegistrados: number;
  turnosPendientes: number;
  turnosEnProceso: number;
}

type DashboardStatsResponse = ApiResponse<DashboardStats>;
```

---

### 9. **SEED** (Solo Desarrollo - `/api/seed/*`)

```typescript
// POST /seed/create-first-admin
interface FirstAdminData {
  email: string;
  password: string;
  instrucciones: string;
}
type CreateFirstAdminResponse = ApiResponse<FirstAdminData>;

// POST /seed/seed-test-data
interface SeedTestData {
  admin: { email: string; password: string };
  cliente: { email: string; password: string };
  autos: number;
  motos: number;
}
type SeedTestDataResponse = ApiResponse<SeedTestData>;

// DELETE /seed/delete-all-data
type DeleteAllDataResponse = ApiResponse<null>;
```

---

## 🔍 Uso en el Código

### Ejemplo 1: Login con Tipos

```typescript
import { authAPI, type LoginRequest, type LoginResponse } from '@/lib/api';

const handleLogin = async (email: string, password: string) => {
  try {
    // LoginRequest es inferido automáticamente
    const response: LoginResponse = await authAPI.login({
      email,
      password
    });

    // TypeScript sabe que response.data tiene: token, email, nombre, rol
    const { token, nombre, rol } = response.data;

    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userName', nombre);
    localStorage.setItem('userRole', rol);

    // Redirigir según rol (TypeScript sabe que rol es 'Admin' | 'Cliente')
    if (rol === 'Admin') {
      router.push('/admin');
    } else {
      router.push('/perfil');
    }
  } catch (error: any) {
    console.error(error.response?.data?.message);
  }
};
```

### Ejemplo 2: Crear Auto con Tipos

```typescript
import { autosAPI, type CreateAutoRequest, type CreateAutoResponse } from '@/lib/api';

const handleCrearAuto = async () => {
  try {
    // TypeScript valida que estén todos los campos requeridos
    const nuevoAuto: CreateAutoRequest = {
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      precio: 25000,
      descripcion: 'Auto en excelente estado',
      disponible: true
    };

    const response: CreateAutoResponse = await autosAPI.create(nuevoAuto);

    // TypeScript sabe que response.data es un Auto completo con id, imagenes[], etc.
    console.log('Auto creado con ID:', response.data.id);

  } catch (error: any) {
    alert(error.response?.data?.message);
  }
};
```

### Ejemplo 3: Listar Turnos con Tipos

```typescript
import { turnosAPI, type Turno, type TurnosListResponse } from '@/lib/api';

const TurnosPage = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      const response: TurnosListResponse = await turnosAPI.getAll();
      
      // TypeScript sabe que response.data es Turno[]
      setTurnos(response.data);
    };

    fetchTurnos();
  }, []);

  return (
    <div>
      {turnos.map(turno => (
        <div key={turno.id}>
          {/* TypeScript autocompleta: turno.nombreUsuario, turno.fecha, etc. */}
          <p>{turno.nombreUsuario}</p>
          <p>{turno.tipoLavado}</p>
          <p>{turno.estado}</p>
        </div>
      ))}
    </div>
  );
};
```

---

## ✅ Ventajas de esta Estructura

### 1. **Type Safety Completo**
- TypeScript valida tipos en compilación
- Autocomplete inteligente en el IDE
- Refactoring seguro

### 2. **Documentación Viva**
- Los tipos documentan la estructura de datos
- No se desincroniza con el código

### 3. **Detección Temprana de Errores**
- Errores de tipo se detectan antes de ejecutar
- No más `undefined` inesperados

### 4. **Mejor DX (Developer Experience)**
- IDE muestra qué campos son requeridos/opcionales
- Autocomplete de propiedades
- Navegación rápida con Ctrl+Click

### 5. **Mantenibilidad**
- Cambios en el backend se reflejan actualizando tipos
- Un único archivo de tipos (`api.types.ts`) centraliza todo
- Fácil de extender con nuevos endpoints

---

## 🚨 Errores Comunes y Soluciones

### Error: "Property 'estado' does not exist on type 'Auto'"

**Causa**: El tipo `Auto` de la API no tiene propiedad `estado`.

**Solución**: Usar `disponible` (boolean) en lugar de `estado`:
```typescript
// ❌ Mal
autos.filter(a => a.estado === 'disponible')

// ✅ Bien
autos.filter(a => a.disponible === true)
```

### Error: "Type 'number' is not assignable to type 'string'"

**Causa**: IDs en mockData eran `string`, pero la API usa `number`.

**Solución**: Actualizar mockData para usar `number`:
```typescript
// ❌ Mal
const auto = { id: '1', ... };

// ✅ Bien
const auto = { id: 1, ... };
```

### Error: "Type 'Admin' is not assignable to 'admin'"

**Causa**: Los roles son case-sensitive: `'Admin'` y `'Cliente'`, no `'admin'` y `'cliente'`.

**Solución**: Usar capitalización correcta:
```typescript
// ❌ Mal
if (rol === 'admin')

// ✅ Bien
if (rol === 'Admin')
```

### Error: "Property 'kilometraje' does not exist on type 'Auto'"

**Causa**: El tipo `Auto` de la API solo tiene: marca, modelo, año, precio, descripcion, disponible, imagenes.

**Solución**: Eliminar referencias a campos que no existen en la API:
```typescript
// ❌ Mal
<span>{auto.kilometraje} km</span>

// ✅ Bien
// No existe en la API del backend, remover del UI
```

---

## 📊 Resumen de Tipos por Endpoint

| Endpoint | Request Type | Response Type |
|----------|-------------|---------------|
| `POST /auth/register` | `RegisterRequest` | `ApiResponse<AuthData>` |
| `POST /auth/login` | `LoginRequest` | `ApiResponse<AuthData>` |
| `GET /auth/me` | - | `ApiResponse<UsuarioActual>` |
| `GET /usuarios` | - | `ApiResponse<Usuario[]>` |
| `GET /usuarios/{id}` | - | `ApiResponse<Usuario>` |
| `PUT /usuarios/{id}` | `UpdateUsuarioRequest` | `ApiResponse<Usuario>` |
| `DELETE /usuarios/{id}` | - | `ApiResponse<null>` |
| `GET /usuarios/{id}/turnos` | - | `ApiResponse<TurnoDeUsuario[]>` |
| `GET /autos` | - | `ApiResponse<Auto[]>` |
| `GET /autos/{id}` | - | `ApiResponse<Auto>` |
| `POST /autos` | `CreateAutoRequest` | `ApiResponse<Auto>` |
| `PUT /autos/{id}` | `UpdateAutoRequest` | `ApiResponse<Auto>` |
| `DELETE /autos/{id}` | - | `ApiResponse<null>` |
| `POST /autos/{id}/imagenes` | `FormData` | `ApiResponse<UploadImagenResponse>` |
| `DELETE /autos/{autoId}/imagenes/{imagenId}` | - | `ApiResponse<null>` |
| `GET /motos` | - | `ApiResponse<Moto[]>` |
| *(...idem Autos)* | | |
| `GET /turnos/mios` | - | `ApiResponse<Turno[]>` |
| `POST /turnos` | `CreateTurnoRequest` | `ApiResponse<Turno>` |
| `GET /turnos/disponibilidad` | `?fecha={fecha}` | `ApiResponse<DisponibilidadData>` |
| `GET /turnos` | - | `ApiResponse<Turno[]>` |
| `PUT /turnos/{id}/estado` | `UpdateEstadoTurnoRequest` | `ApiResponse<Turno>` |
| `DELETE /turnos/{id}` | - | `ApiResponse<null>` |
| `GET /notificaciones` | - | `ApiResponse<Notificacion[]>` |
| `POST /notificaciones/whatsapp` | `EnviarWhatsAppRequest` | `ApiResponse<WhatsAppData>` |
| `GET /dashboard/resumen` | - | `ApiResponse<DashboardStats>` |

---

## 🔄 Próximos Pasos

1. ✅ **Tipos creados** - `lib/types/api.types.ts`
2. ✅ **API client** - `lib/api.ts`
3. ⏳ **Actualizar mockData** - Alinear con tipos reales
4. ⏳ **Actualizar páginas admin** - Usar tipos correctos
5. ⏳ **Eliminar campos inexistentes** - Remover `estado`, `kilometraje`, etc.

---

**Autor**: GitHub Copilot  
**Fecha**: Noviembre 2024  
**Versión**: 1.0.0
