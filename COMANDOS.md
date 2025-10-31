# 🚀 Comandos Rápidos - Feller Automotores

## Navegación

```powershell
# Ir al directorio del frontend
cd c:\Users\diosc\OneDrive\Documentos\Repos\feller\frontend
```

## Instalación y Ejecución

```powershell
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start

# Verificar código con linter
npm run lint
```

## Desarrollo

```powershell
# Limpiar caché de Next.js
Remove-Item -Recurse -Force .next
npm run dev

# Ver el proyecto en el navegador
start http://localhost:3000

# Cambiar puerto (si 3000 está ocupado)
npm run dev -- -p 3001
```

## URLs del Proyecto

```
Home:              http://localhost:3000/
Autos:             http://localhost:3000/autos
Lavado:            http://localhost:3000/lavado
Login:             http://localhost:3000/login
Registro:          http://localhost:3000/register
Perfil:            http://localhost:3000/perfil
Admin:             http://localhost:3000/admin
Contacto:          http://localhost:3000/contacto
```

## Testing Rápido

### Probar Login

1. Ve a http://localhost:3000/login
2. Usa cualquier email y password (mock data)
3. Deberías ser redirigido a /perfil

### Probar Admin

1. Modifica temporalmente el rol en `authStore.ts` a 'admin'
2. O crea un usuario admin en el mock
3. Ve a http://localhost:3000/admin

### Probar Animación del Logo

1. Ve a http://localhost:3000/
2. Recarga la página (F5)
3. Observa la animación del logo dividiéndose

## Solución de Problemas

```powershell
# Si hay errores de módulos
npm install --force

# Si hay problemas con el puerto
netstat -ano | findstr :3000
# Luego mata el proceso o usa otro puerto

# Reinstalar dependencias desde cero
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Ver logs detallados
npm run dev --verbose
```

## Git (Opcional)

```powershell
# Inicializar git
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit: Frontend completo Feller Automotores"
```

## Estructura de Archivos Clave

```
frontend/
├── app/                    # 📄 Todas las páginas
├── components/            # 🧩 Componentes reutilizables
├── lib/                   # 🔧 Utilidades y API
├── store/                 # 📦 Estado global (Zustand)
├── package.json           # 📋 Dependencias
└── tailwind.config.ts     # 🎨 Configuración de estilos
```

## Edición de Archivos Importantes

```powershell
# Editar datos mock de autos
code lib/mockData.ts

# Editar configuración de API
code lib/api.ts

# Editar colores del tema
code tailwind.config.ts

# Editar página principal
code app/page.tsx

# Editar Navbar
code components/layout/Navbar.tsx
```

## Verificar Instalación

```powershell
# Ver versión de Node
node --version
# Debe ser 18+

# Ver versión de npm
npm --version
# Debe ser 9+

# Ver paquetes instalados
npm list --depth=0

# Verificar que Next.js está instalado
npm list next
```

## Abrir en VS Code

```powershell
# Abrir el proyecto completo
code c:\Users\diosc\OneDrive\Documentos\Repos\feller\frontend

# Abrir solo el frontend
code .
```

## Conectar con Backend

Una vez que el backend .NET 8 esté corriendo:

```powershell
# Terminal 1: Backend
cd c:\Users\diosc\OneDrive\Documentos\Repos\feller\backend
dotnet run

# Terminal 2: Frontend
cd c:\Users\diosc\OneDrive\Documentos\Repos\feller\frontend
npm run dev
```

Luego en el navegador: http://localhost:3000

## Performance

```powershell
# Analizar el bundle
npm run build
# El tamaño del bundle aparecerá en la salida

# Ver páginas generadas
ls .next/static
```

## Actualizar Dependencias (Opcional)

```powershell
# Ver paquetes desactualizados
npm outdated

# Actualizar todos los paquetes
npm update

# Actualizar un paquete específico
npm install next@latest
```

## Backup

```powershell
# Hacer backup del proyecto
Compress-Archive -Path frontend -DestinationPath frontend-backup.zip
```

---

💡 **Tip**: Mantén este archivo abierto para referencia rápida mientras desarrollas.
