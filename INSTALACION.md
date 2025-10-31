# 🚀 Guía de Instalación - Feller Automotores Frontend

## Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Terminal (PowerShell, CMD, o tu preferida)

## 📦 Instalación

### 1. Navega al directorio del frontend

```powershell
cd c:\Users\diosc\OneDrive\Documentos\Repos\feller\frontend
```

### 2. Instala las dependencias

```powershell
npm install
```

Este comando instalará todas las dependencias listadas en `package.json`:

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Framer Motion
- Zustand
- Axios
- React Hot Toast
- Y todas las demás dependencias necesarias

### 3. Ejecuta el servidor de desarrollo

```powershell
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción (requiere ejecutar build primero)
- `npm run lint` - Ejecuta el linter para verificar el código

## 🔧 Configuración

### Variables de Entorno (Opcional)

Si necesitas cambiar la URL del backend, crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🌐 Acceso a la Aplicación

Una vez que el servidor esté corriendo, abre tu navegador en:

```
http://localhost:3000
```

## 📱 Páginas Disponibles

- **Home**: `http://localhost:3000/`
- **Catálogo de Autos**: `http://localhost:3000/autos`
- **Servicio de Lavado**: `http://localhost:3000/lavado`
- **Login**: `http://localhost:3000/login`
- **Registro**: `http://localhost:3000/register`
- **Perfil**: `http://localhost:3000/perfil` (requiere login)
- **Admin**: `http://localhost:3000/admin` (requiere login con rol admin)
- **Contacto**: `http://localhost:3000/contacto`

## 🎨 Características Implementadas

✅ **Animación del Logo**: Al entrar a la home, el logo aparece y se divide en dos mitades
✅ **Tema Oscuro**: Colores negro (#000000) y rojo oscuro (#b71c1c)
✅ **Responsive**: Funciona perfectamente en móvil, tablet y desktop
✅ **Autenticación**: Sistema de login/registro con mockup data
✅ **Gestión de Estado**: Zustand para manejar el estado de autenticación
✅ **Notificaciones**: Toast para mostrar mensajes de éxito/error
✅ **Animaciones**: Framer Motion para transiciones suaves
✅ **Mock Data**: Datos de prueba para autos y turnos

## 🔌 Conexión con Backend

Por defecto, la aplicación usa **mock data** (datos de prueba). Para conectar con el backend real:

1. Asegúrate de que el backend .NET 8 esté corriendo en `http://localhost:5000`
2. Los datos mockeados están en `lib/mockData.ts`
3. Las funciones de API están en `lib/api.ts`

## ⚠️ Troubleshooting

### Error: Cannot find module

Si obtienes errores de módulos faltantes, ejecuta:

```powershell
npm install
```

### Puerto ya en uso

Si el puerto 3000 está en uso, puedes cambiar el puerto:

```powershell
npm run dev -- -p 3001
```

### Errores de caché

Si tienes problemas con la caché:

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🎉 ¡Listo!

Ahora puedes explorar la aplicación. El sistema está completamente funcional con datos de prueba y listo para conectarse al backend real.

---

**Nota**: Los errores de TypeScript que ves en el editor son normales antes de instalar las dependencias. Una vez que ejecutes `npm install`, desaparecerán.
