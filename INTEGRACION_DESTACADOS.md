# 🌟 Integración API de Destacados - Frontend

## ✅ Implementación Completada

Se ha integrado exitosamente la API de destacados del backend en el frontend de Feller Automotores.

---

## 📦 Archivos Modificados

### 1. **Tipos de API** (`lib/types/api.types.ts`)

#### Propiedades Agregadas a Vehículos

**Auto:**
```typescript
interface Auto {
  // ... propiedades existentes
  esDestacado: boolean;
  ordenDestacado: number | null;
}
```

**Moto:**
```typescript
interface Moto {
  // ... propiedades existentes
  esDestacado: boolean;
  ordenDestacado: number | null;
}
```

#### Nuevos Tipos para Destacados

```typescript
export type TipoVehiculoDestacado = 'Auto' | 'Moto';

export interface VehiculoDestacado {
  tipo: TipoVehiculoDestacado;
  vehiculo: Auto | Moto;
}

export type DestacadosResponse = ApiResponse<VehiculoDestacado[]>;
export type DestacadosAutosResponse = ApiResponse<Auto[]>;
export type DestacadosMotosResponse = ApiResponse<Moto[]>;
```

---

### 2. **Cliente API** (`lib/api.ts`)

#### Nuevo Módulo: `destacadosAPI`

```typescript
export const destacadosAPI = {
  // Endpoints Públicos
  getAll: async (): Promise<T.DestacadosResponse> => {...}
  getAutos: async (): Promise<T.DestacadosAutosResponse> => {...}
  getMotos: async (): Promise<T.DestacadosMotosResponse> => {...}
  
  // Endpoints Admin
  marcarAutoDestacado: async (id: number, orden?: number): Promise<T.AutoResponse> => {...}
  marcarMotoDestacada: async (id: number, orden?: number): Promise<T.MotoResponse> => {...}
  desmarcarAutoDestacado: async (id: number): Promise<T.AutoResponse> => {...}
  desmarcarMotoDestacada: async (id: number): Promise<T.MotoResponse> => {...}
}
```

---

### 3. **Sección de Destacados** (`components/cars-section.tsx`)

#### Funcionalidades Implementadas

✅ **Carga dinámica de destacados** desde la API  
✅ **Visualización de autos y motos** en un mismo grid  
✅ **Badges diferenciados** para 0km y tipo de vehículo  
✅ **Especificaciones técnicas** según tipo (auto/moto)  
✅ **Diseño moderno** con efectos hover y animaciones  
✅ **Estado de carga** con spinner  
✅ **Manejo de errores** con toast notifications  
✅ **Límite de 6 vehículos** para la home  

#### Características del Diseño

- **Cards modernas** con bordes finos y backdrop-blur
- **Overlay gradiente** en imágenes al hover
- **Badges visuales** para estado (0km/Usado) y tipo (Auto/Moto)
- **Especificaciones técnicas** en cajas con fondo
- **Botón "Ver más"** con sombra animada
- **Responsive** para mobile, tablet y desktop
- **Animaciones suaves** con Framer Motion

---

## 🎨 Diseño Visual

### Header de Sección
```tsx
- Título grande (text-6xl en desktop)
- Línea decorativa con gradiente rojo
- Descripción con font-light
- Espaciado optimizado (mb-16)
```

### Cards de Vehículos
```tsx
- Fondo: zinc-900/50 con backdrop-blur
- Bordes: zinc-800 (ultra-finos)
- Hover: border-feller-red/60 + shadow-xl
- Imagen: Zoom suave en hover
- Overlay: Gradiente oscuro en hover
```

### Badges
```tsx
// Badge 0km
- Gradiente: emerald-500 → green-500
- Sombra: shadow-green-500/30
- Icono: ✨ 0 KM

// Badge Tipo
- Fondo: zinc-900/80 + backdrop-blur
- Iconos: 🚗 Auto / 🏍️ Moto
```

### Especificaciones
```tsx
- Contenedor: bg-zinc-800/30 rounded-lg
- Iconos: text-feller-red shrink-0
- Texto: font-medium text-gray-400
```

---

## 🔌 Uso de la API

### En la Home

```typescript
const fetchDestacados = async () => {
  try {
    const response = await destacadosAPI.getAll();
    setDestacados(response.data.slice(0, 6)); // Limitar a 6
  } catch (error) {
    toast.error('Error al cargar vehículos destacados');
  }
};
```

### Para Autos Destacados Solamente

```typescript
const response = await destacadosAPI.getAutos();
// response.data es Auto[]
```

### Para Motos Destacadas Solamente

```typescript
const response = await destacadosAPI.getMotos();
// response.data es Moto[]
```

---

## 🔧 Gestión Admin (Para Implementar)

### Marcar como Destacado

```typescript
// Con orden específico
await destacadosAPI.marcarAutoDestacado(autoId, 1);

// Sin orden (auto-asigna el siguiente)
await destacadosAPI.marcarAutoDestacado(autoId);

// Igual para motos
await destacadosAPI.marcarMotoDestacada(motoId, 2);
```

### Desmarcar Destacado

```typescript
await destacadosAPI.desmarcarAutoDestacado(autoId);
await destacadosAPI.desmarcarMotoDestacada(motoId);
```

---

## 📊 Estructura de Datos

### Response de `destacadosAPI.getAll()`

```json
{
  "success": true,
  "data": [
    {
      "tipo": "Auto",
      "vehiculo": {
        "id": 1,
        "marca": "Toyota",
        "modelo": "Corolla",
        "año": 2024,
        "precio": 35000,
        "estado": "0km",
        "esDestacado": true,
        "ordenDestacado": 1,
        "puertas": 4,
        "tipoCombustible": "Nafta",
        "transmision": "Automática",
        "kilometraje": null,
        "imagenes": [...]
      }
    },
    {
      "tipo": "Moto",
      "vehiculo": {
        "id": 2,
        "marca": "Honda",
        "modelo": "CB 500X",
        "año": 2024,
        "precio": 10000,
        "estado": "0km",
        "esDestacado": true,
        "ordenDestacado": 2,
        "cilindrada": 500,
        "tipoMoto": "Touring",
        "imagenes": [...]
      }
    }
  ]
}
```

---

## 🎯 Características Implementadas

### ✅ Funcionalidades Públicas
- [x] Obtener todos los destacados (autos + motos)
- [x] Obtener solo autos destacados
- [x] Obtener solo motos destacadas
- [x] Visualización en grid moderno
- [x] Badges de estado y tipo
- [x] Especificaciones técnicas
- [x] Precios formateados
- [x] Estado de carga
- [x] Manejo de errores
- [x] Límite de 6 vehículos en home

### 🔜 Funcionalidades Admin (Pendientes)
- [ ] Panel de gestión de destacados
- [ ] Marcar/desmarcar destacados
- [ ] Reordenar destacados (drag & drop)
- [ ] Vista previa de destacados

---

## 🚀 Próximos Pasos

### 1. Panel Admin de Destacados

Crear una página en `/admin/destacados` con:

- Lista de todos los vehículos disponibles
- Botón para marcar/desmarcar como destacado
- Input para definir orden
- Drag & drop para reordenar
- Vista previa en tiempo real

### 2. Actualizar Formularios de Vehículos

Agregar en `/admin/vehiculos/nuevo`:

- Checkbox "Destacar este vehículo"
- Input de orden (opcional)
- Preview del badge de estado

### 3. Integrar en Otras Páginas

- Usar `destacadosAPI.getAutos()` en `/autos` para filtrar
- Usar `destacadosAPI.getMotos()` en `/motos` para filtrar
- Agregar badge de "Destacado" en cards individuales

---

## 📝 Notas Técnicas

### Ordenamiento
Los destacados se ordenan automáticamente por:
1. `ordenDestacado` ascendente (1, 2, 3...)
2. Vehículos sin orden van al final
3. Entre vehículos sin orden, los más recientes primero

### Límite en Home
Se muestran máximo 6 vehículos destacados en la home:
```typescript
setDestacados(response.data.slice(0, 6));
```

### Tipos de Vehículo
El componente detecta automáticamente si es auto o moto:
```typescript
const isAuto = tipo === 'Auto';
const auto = isAuto ? (vehiculo as Auto) : null;
const moto = !isAuto ? (vehiculo as Moto) : null;
```

### Manejo de Imágenes
- Si hay imágenes, muestra la primera
- Si no hay, muestra icono de placeholder (Car o Bike)
- Efecto zoom en hover

---

## 🎨 Personalización

### Cambiar Límite de Destacados

```typescript
// En cars-section.tsx
setDestacados(response.data.slice(0, 8)); // Mostrar 8 en vez de 6
```

### Modificar Grid

```typescript
// Cambiar de 3 columnas a 4
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
```

### Filtrar Solo Autos o Solo Motos

```typescript
// Solo autos
const response = await destacadosAPI.getAutos();

// Solo motos
const response = await destacadosAPI.getMotos();
```

---

## ✨ Resultado Final

La sección de destacados en la home ahora:

- ✅ Carga datos reales desde el backend
- ✅ Muestra autos y motos mezclados según orden
- ✅ Tiene diseño moderno y profesional
- ✅ Usa el mismo estilo de la página de autos
- ✅ Maneja estados de carga y error
- ✅ Es completamente responsive
- ✅ Tiene animaciones suaves y fluidas

---

## 🔗 Referencias

- **Documentación Backend**: `VEHICULOS_DESTACADOS.md`
- **Guía API**: `API_FRONTEND_GUIDE_ACTUALIZACION.md`
- **Tipos API**: `lib/types/api.types.ts`
- **Cliente API**: `lib/api.ts`
- **Componente**: `components/cars-section.tsx`

---

**Estado**: ✅ Completado  
**Versión**: 1.0.0  
**Fecha**: Noviembre 2024
