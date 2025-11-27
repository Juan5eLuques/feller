# Feller Automotores - Frontend

Frontend moderno para **Feller Automotores** construido con Next.js 15, React 19, TypeScript y TailwindCSS.

## 🚀 Tecnologías

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** - Estilos
- **Framer Motion** - Animaciones
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones

## 🎨 Características

- ✅ Tema oscuro con colores personalizados (negro y rojo oscuro)
- ✅ Animación inicial del logo que se divide en dos mitades
- ✅ Catálogo de autos con filtros y búsqueda
- ✅ Sistema de autenticación (login/registro)
- ✅ Módulo de turnos de lavado
- ✅ Panel de usuario para ver turnos
- ✅ **Panel de administración completo (backoffice)**
  - Dashboard con estadísticas en tiempo real
  - Gestión de usuarios (CRUD completo)
  - Gestión de vehículos con imágenes
  - Control de turnos y calendario
  - Sistema de notificaciones multicanal
  - Módulo de ventas y comisiones
  - Inventario y configuración
- ✅ Responsive design completo
- ✅ Animaciones suaves con Framer Motion
- ✅ Páginas de error personalizadas (404)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Rutas

### Públicas
- `/` - Home con animación del logo
- `/autos` - Catálogo de vehículos
- `/lavado` - Servicio de lavado y reserva de turnos
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/contacto` - Página de contacto

### Protegidas (Clientes)
- `/perfil` - Panel del cliente

### Protegidas (Administradores)
- `/admin` - Dashboard principal
- `/admin/usuarios` - Gestión de usuarios
- `/admin/vehiculos` - Gestión de vehículos
- `/admin/turnos` - Gestión de turnos de lavado
- `/admin/notificaciones` - Sistema de notificaciones
- `/admin/ventas` - Reportes de ventas
- `/admin/inventario` - Control de inventario (en desarrollo)
- `/admin/configuracion` - Configuración del sistema (en desarrollo)

## 🔌 API Backend

El frontend está configurado para conectarse a un backend .NET 8 Web API:

- **Base URL**: `http://localhost:5000/api`
- Los endpoints están definidos en `/lib/api.ts`

### Configuración de Mock Data

Por defecto, la aplicación utiliza datos de prueba (mock data) ubicados en `/lib/mockData.ts`. Para conectar con el backend real, debes descomentar las llamadas a la API en cada componente.

## 🎨 Tema

Los colores del tema están definidos en `tailwind.config.ts`:

- **Negro**: #000000
- **Gris oscuro**: #1a1a1a
- **Rojo oscuro**: #b71c1c
- **Rojo muy oscuro**: #8b0000

## 📁 Estructura del Proyecto

```
frontend/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── autos/             # Catálogo de autos
│   ├── lavado/            # Servicio de lavado
│   ├── login/             # Inicio de sesión
│   ├── register/          # Registro
│   ├── perfil/            # Panel de usuario
│   ├── admin/             # Panel de administración
│   │   ├── layout.tsx     # Layout del backoffice
│   │   ├── page.tsx       # Dashboard
│   │   ├── usuarios/      # Gestión de usuarios
│   │   ├── vehiculos/     # Gestión de vehículos
│   │   ├── turnos/        # Gestión de turnos
│   │   ├── notificaciones/ # Sistema de notificaciones
│   │   ├── ventas/        # Reportes de ventas
│   │   ├── inventario/    # Control de inventario
│   │   └── configuracion/ # Configuración
│   └── contacto/          # Contacto
├── components/
│   ├── admin/             # Componentes del backoffice
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── Modal.tsx
│   │   └── StatCard.tsx
│   ├── layout/            # Navbar, Footer
│   └── ui/                # Componentes reutilizables
├── lib/
│   ├── api.ts             # Cliente Axios y funciones API
│   ├── mockData.ts        # Datos de prueba
│   └── utils.ts           # Utilidades
├── store/
│   └── authStore.ts       # Store de autenticación con Zustand
└── public/                # Recursos estáticos
```

## 🔐 Autenticación

El sistema de autenticación utiliza JWT tokens almacenados en `localStorage` mediante Zustand. El token se adjunta automáticamente a todas las peticiones HTTP a través de interceptores de Axios.

## 📚 Documentación Adicional

- **[ADMIN-PANEL.md](./ADMIN-PANEL.md)** - Documentación completa del panel de administración
- **[INTEGRACION-BACKEND.md](./INTEGRACION-BACKEND.md)** - Guía de integración con el backend

## 🚧 Próximos pasos

### Prioritarios
- [ ] Conectar todas las funciones CRUD del admin con la API real
- [ ] Implementar formularios completos con validación
- [ ] Agregar sistema de upload de imágenes para vehículos
- [ ] Implementar paginación en tablas del admin
- [ ] Agregar gráficos al dashboard (Chart.js/Recharts)

### Funcionalidades
- [ ] Completar módulo de Inventario
- [ ] Completar módulo de Configuración
- [ ] Sistema de roles y permisos granular
- [ ] Calendario visual para turnos
- [ ] Exportación de reportes a PDF/Excel
- [ ] Sistema de backup y restauración

### UX/UI
- [ ] Modales elegantes para confirmaciones
- [ ] Drag & drop para imágenes
- [ ] Vista previa de imágenes
- [ ] Más filtros en catálogo de autos
- [ ] Sistema de favoritos

### Calidad
- [ ] Agregar tests unitarios
- [ ] Tests E2E con Playwright
- [ ] Optimización de rendimiento
- [ ] Documentación de API

## 📄 Licencia

Este proyecto es parte de Feller Automotores.
