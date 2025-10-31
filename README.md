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
- ✅ Panel de administración (protegido por rol)
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

- `/` - Home con animación del logo
- `/autos` - Catálogo de vehículos
- `/lavado` - Servicio de lavado y reserva de turnos
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/perfil` - Panel del cliente
- `/admin` - Panel de administración (solo admin)
- `/contacto` - Página de contacto

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
│   ├── admin/             # Panel de admin
│   └── contacto/          # Contacto
├── components/
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

## 🚧 Próximos pasos

- [ ] Conectar con la API real del backend
- [ ] Agregar más filtros al catálogo de autos
- [ ] Implementar sistema de favoritos
- [ ] Agregar chat en vivo
- [ ] Mejorar el panel de administración
- [ ] Agregar tests unitarios

## 📄 Licencia

Este proyecto es parte de Feller Automotores.
