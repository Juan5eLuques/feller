# 📱 REGLAS DE RESPONSIVE DESIGN - FELLER BACKOFFICE

## 🎯 REGLA GENERAL
**TODO componente nuevo debe ser responsive para mobile desde su creación.**

---

## 📐 BREAKPOINTS TAILWIND
```
sm:  640px  - Móviles grandes / Tablets pequeñas
md:  768px  - Tablets
lg:  1024px - Laptops / Desktops pequeños
xl:  1280px - Desktops
2xl: 1536px - Pantallas grandes
```

---

## 🏗️ ESTRUCTURA BASE DEL ADMIN

### Layout Principal
```tsx
// ✅ CORRECTO - Sidebar oculto en mobile, visible en desktop
<div className="min-h-screen bg-black flex">
  <AdminSidebar 
    isMobileMenuOpen={isMobileMenuOpen}
    setIsMobileMenuOpen={setIsMobileMenuOpen}
  />
  
  <div className="flex-1 flex flex-col lg:ml-64"> {/* ml-64 solo en desktop */}
    <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
    <main className="flex-1 p-4 sm:p-6 lg:p-8"> {/* Padding escalonado */}
      {children}
    </main>
  </div>
</div>
```

### Sidebar Responsive
```tsx
// ✅ CORRECTO - Slide-in desde la izquierda en mobile
<aside className={`
  fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 
  flex flex-col z-50
  transition-transform duration-300 ease-in-out
  lg:translate-x-0                              // Visible siempre en desktop
  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} // Slide en mobile
`}>

// ✅ Overlay oscuro en mobile cuando sidebar está abierto
{isMobileMenuOpen && (
  <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}
```

### Header Responsive
```tsx
// ✅ CORRECTO
<header className="h-16 lg:h-20 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-8">
  {/* Botón hamburguesa - Solo en mobile */}
  <button className="lg:hidden p-2 text-zinc-400 hover:text-white">
    <Menu className="w-6 h-6" />
  </button>
  
  {/* Búsqueda - Oculta en mobile */}
  <div className="hidden md:flex flex-1 max-w-xl">
    <input type="text" placeholder="Buscar..." />
  </div>
  
  {/* Logo/Título en mobile */}
  <div className="flex-1 md:hidden">
    <h1 className="text-lg font-bold text-white">FELLER Admin</h1>
  </div>
</header>
```

---

## 📊 COMPONENTES COMUNES

### Headers de Páginas
```tsx
// ✅ CORRECTO - Stack vertical en mobile, horizontal en desktop
<div className="mb-6 lg:mb-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
        Título
      </h1>
      <p className="text-zinc-400 text-sm lg:text-base">
        Descripción
      </p>
    </div>
    <button className="w-full sm:w-auto px-4 lg:px-6 py-3">
      Acción Principal
    </button>
  </div>
</div>
```

### Grids de Estadísticas
```tsx
// ✅ CORRECTO - 2 columnas en mobile, 3 en tablet, 5 en desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5">
    <div className="flex items-center justify-between mb-2 lg:mb-3">
      <Package className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400" />
      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
    </div>
    <p className="text-zinc-400 text-xs mb-1">Total</p>
    <p className="text-xl lg:text-2xl font-bold text-white">{count}</p>
  </div>
  
  {/* Última stat ocupa 2 columnas en mobile */}
  <div className="col-span-2 md:col-span-1 ...">
    <p className="text-base lg:text-lg font-bold text-white truncate">
      {formatearPrecio(total)}
    </p>
  </div>
</div>
```

### Filtros y Búsqueda
```tsx
// ✅ CORRECTO - Stack vertical siempre, botones con scroll horizontal
<div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 lg:p-6 mb-6">
  <div className="flex flex-col gap-4">
    {/* Input de búsqueda */}
    <div className="flex-1 relative">
      <input 
        className="w-full pl-10 pr-4 py-3 text-sm lg:text-base" 
        placeholder="Buscar..."
      />
    </div>
    
    {/* Botones de filtro - Scroll horizontal en mobile */}
    <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
      <button className="px-4 lg:px-5 py-2.5 lg:py-3 whitespace-nowrap text-sm lg:text-base">
        Filtro 1
      </button>
      <button className="px-4 lg:px-5 py-2.5 lg:py-3 whitespace-nowrap text-sm lg:text-base">
        Filtro 2
      </button>
    </div>
  </div>
</div>
```

### Grids de Cards
```tsx
// ✅ CORRECTO - 1 columna mobile, 2 tablet, 3 desktop grande
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
    {/* Contenido del card */}
  </div>
</div>
```

### Botones de Acción
```tsx
// ✅ CORRECTO - Botones más pequeños en mobile
<div className="flex flex-wrap gap-2">
  <button className="px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl text-sm">
    <Upload className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
  </button>
</div>

// ✅ Para botones de formulario
<button className="w-full sm:w-auto px-4 lg:px-6 py-2.5 lg:py-3">
  Guardar
</button>
```

---

## 📋 TABLAS RESPONSIVE

### Opción 1: Scroll Horizontal
```tsx
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <table className="min-w-full">
    <thead>
      <tr>
        <th className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">
          Columna
        </th>
      </tr>
    </thead>
  </table>
</div>
```

### Opción 2: Cards en Mobile
```tsx
{/* Desktop: Tabla normal */}
<div className="hidden lg:block">
  <table>...</table>
</div>

{/* Mobile: Cards apilados */}
<div className="lg:hidden space-y-4">
  {items.map(item => (
    <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <span className="text-xs text-zinc-400">{item.date}</span>
      </div>
      {/* Resto de información */}
    </div>
  ))}
</div>
```

---

## 🎨 MODALES Y DIALOGS

```tsx
// ✅ CORRECTO - Fullscreen en mobile, centrado en desktop
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
  <div className="
    w-full sm:w-auto sm:max-w-lg 
    max-h-screen sm:max-h-[90vh]
    bg-zinc-900 
    rounded-t-2xl sm:rounded-2xl 
    overflow-hidden
  ">
    <div className="p-4 sm:p-6">
      {/* Contenido del modal */}
    </div>
  </div>
</div>
```

---

## 🖼️ IMÁGENES Y MEDIA

```tsx
// ✅ CORRECTO - Altura responsive
<div className="relative h-40 sm:h-48 lg:h-56 bg-zinc-950 overflow-hidden">
  <img 
    src={image} 
    alt="..."
    className="w-full h-full object-cover"
  />
</div>
```

---

## 📝 FORMULARIOS

```tsx
// ✅ CORRECTO - 1 columna mobile, 2-3 en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  <div>
    <label className="block text-xs lg:text-sm font-medium text-zinc-300 mb-2">
      Campo
    </label>
    <input 
      type="text"
      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-sm lg:text-base"
    />
  </div>
</div>

{/* Campos que ocupan todo el ancho */}
<div className="col-span-1 md:col-span-2 lg:col-span-3">
  <textarea className="w-full ..."></textarea>
</div>
```

---

## ⚠️ ERRORES COMUNES A EVITAR

### ❌ INCORRECTO
```tsx
// Grid sin responsive
<div className="grid grid-cols-3 gap-6">

// Padding/margin fijo sin escalar
<div className="p-8 mb-10">

// Botón sin ajuste de ancho
<button className="px-6 py-3">

// Texto sin escalar
<h1 className="text-3xl">

// Sidebar siempre visible
<aside className="fixed left-0">
```

### ✅ CORRECTO
```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

// Padding/margin escalado
<div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-10">

// Botón con width responsivo
<button className="w-full sm:w-auto px-4 lg:px-6 py-2.5 lg:py-3">

// Texto escalado
<h1 className="text-2xl lg:text-3xl">

// Sidebar con control mobile
<aside className={`fixed left-0 lg:translate-x-0 ${mobile ? 'translate-x-0' : '-translate-x-full'}`}>
```

---

## 🎯 CHECKLIST DE RESPONSIVE

Antes de considerar un componente terminado, verificar:

- [ ] Se ve bien en 375px (iPhone SE)
- [ ] Se ve bien en 768px (iPad)
- [ ] Se ve bien en 1024px (Laptop)
- [ ] Se ve bien en 1920px (Desktop)
- [ ] Los botones son accesibles con el dedo (min 44x44px)
- [ ] El texto es legible sin hacer zoom
- [ ] Los inputs son fáciles de tocar
- [ ] El sidebar se cierra al navegar en mobile
- [ ] No hay scroll horizontal no deseado
- [ ] Las imágenes cargan en tamaños apropiados

---

## 🔧 HERRAMIENTAS DE TESTING

1. **Chrome DevTools**: Toggle device toolbar (Ctrl+Shift+M)
2. **Responsive Viewer Extension**: Ver múltiples tamaños simultáneamente
3. **Dispositivos reales**: Siempre probar en al menos un dispositivo físico

---

## 📚 RECURSOS

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Mobile-First CSS](https://www.browserstack.com/guide/how-to-implement-mobile-first-design)
- [Touch Target Sizes](https://web.dev/accessible-tap-targets/)

---

## 🔘 DISEÑO PROFESIONAL DE BOTONES

### Bordes para Contraste Visual

Todos los botones deben tener bordes sutiles para mantener un aspecto profesional:

**Botones principales (feller-red):**
```tsx
className="bg-feller-red text-white border border-feller-red hover:border-feller-darkred rounded-lg transition-colors"
```

**Botones secundarios (zinc/gray):**
```tsx
className="bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
```

**Botones transparentes:**
```tsx
className="border border-transparent hover:border-zinc-600 rounded-lg transition-colors"
```

**Botones de texto/enlace:**
```tsx
className="text-feller-red border border-transparent hover:border-feller-red/30 px-2 py-1 rounded transition-colors"
```

### Excepciones

- **Botón X del sidebar**: NO debe tener borde visible
- **Botones con estados específicos**: Mantener colores de estado (verde, amarillo, rojo) con bordes del mismo color

### Patrones de Hover

- Siempre incluir `transition-colors` para transiciones suaves
- Bordes más claros en hover para mejor feedback visual
- Para botones rojos: usar `feller-darkred` en hover
- Para botones grises: usar `zinc-600` en hover
- Para botones transparentes: mostrar borde sutil en hover

---

**Última actualización**: 20 de noviembre de 2025
**Autor**: GitHub Copilot
**Proyecto**: Feller Automotores - Sistema de Gestión
