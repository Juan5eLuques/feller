# 🔌 Guía de Conexión con Backend .NET 8

## 📋 Preparación

Antes de conectar el frontend con el backend real, asegúrate de:

1. ✅ El backend .NET 8 Web API esté corriendo en `http://localhost:5000`
2. ✅ El backend tenga CORS habilitado para `http://localhost:3000`
3. ✅ Los endpoints coincidan con los definidos en `lib/api.ts`

## 🔧 Configuración Backend (.NET 8)

### Program.cs - CORS Configuration

```csharp
var builder = WebApplication.CreateBuilder(args);

// Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FellerFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Usar CORS
app.UseCors("FellerFrontend");

app.Run();
```

## 📡 Endpoints Requeridos en Backend

### Autenticación

```csharp
// POST /api/auth/login
[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
{
    // Validar credenciales
    // Generar JWT token
    return Ok(new {
        token = "jwt-token",
        user = new {
            id = "user-id",
            nombre = "Nombre",
            email = "email@example.com",
            telefono = "123456789",
            rol = "cliente" // o "admin"
        }
    });
}

// POST /api/auth/register
[HttpPost("register")]
public IActionResult Register([FromBody] RegisterRequest request)
{
    // Crear usuario
    // Generar JWT token
    return Ok(new {
        token = "jwt-token",
        user = new { /* ... */ }
    });
}

// GET /api/auth/me
[Authorize]
[HttpGet("me")]
public IActionResult GetCurrentUser()
{
    // Obtener usuario del token
    return Ok(user);
}
```

### Autos

```csharp
// GET /api/autos
[HttpGet]
public IActionResult GetAutos()
{
    return Ok(autos);
}

// GET /api/autos/{id}
[HttpGet("{id}")]
public IActionResult GetAuto(string id)
{
    return Ok(auto);
}

// POST /api/autos
[Authorize(Roles = "admin")]
[HttpPost]
public IActionResult CreateAuto([FromBody] AutoRequest request)
{
    return Ok(nuevoAuto);
}

// PUT /api/autos/{id}
[Authorize(Roles = "admin")]
[HttpPut("{id}")]
public IActionResult UpdateAuto(string id, [FromBody] AutoRequest request)
{
    return Ok(autoActualizado);
}

// DELETE /api/autos/{id}
[Authorize(Roles = "admin")]
[HttpDelete("{id}")]
public IActionResult DeleteAuto(string id)
{
    return NoContent();
}
```

### Turnos

```csharp
// GET /api/turnos
[Authorize(Roles = "admin")]
[HttpGet]
public IActionResult GetAllTurnos()
{
    return Ok(turnos);
}

// GET /api/turnos/mis-turnos
[Authorize]
[HttpGet("mis-turnos")]
public IActionResult GetMyTurnos()
{
    // Filtrar por usuario actual
    return Ok(turnos);
}

// POST /api/turnos
[HttpPost]
public IActionResult CreateTurno([FromBody] TurnoRequest request)
{
    return Ok(nuevoTurno);
}

// PUT /api/turnos/{id}
[Authorize]
[HttpPut("{id}")]
public IActionResult UpdateTurno(string id, [FromBody] TurnoRequest request)
{
    return Ok(turnoActualizado);
}

// DELETE /api/turnos/{id}
[Authorize]
[HttpDelete("{id}")]
public IActionResult DeleteTurno(string id)
{
    return NoContent();
}
```

## 🔐 JWT Configuration (.NET 8)

### appsettings.json

```json
{
  "Jwt": {
    "Key": "tu-super-secret-key-aqui-minimo-32-caracteres",
    "Issuer": "FellerAutomotores",
    "Audience": "FellerFrontend",
    "ExpireMinutes": 1440
  }
}
```

### Program.cs - JWT Setup

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar JWT
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();
```

## 🔄 Activar Backend Real en Frontend

### Opción 1: Reemplazar Mock Data

En cada página que usa mock data, cambiar de:

```typescript
// ANTES (Mock)
import { mockAutos } from "@/lib/mockData";

useEffect(() => {
  setAutos(mockAutos);
}, []);
```

A:

```typescript
// DESPUÉS (API Real)
import { autosAPI } from "@/lib/api";

useEffect(() => {
  const fetchAutos = async () => {
    try {
      const data = await autosAPI.getAll();
      setAutos(data);
    } catch (error) {
      toast.error("Error al cargar autos");
    }
  };
  fetchAutos();
}, []);
```

### Opción 2: Variable de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Luego en el código:

```typescript
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

useEffect(() => {
  if (useMockData) {
    setAutos(mockAutos);
  } else {
    autosAPI.getAll().then(setAutos);
  }
}, []);
```

## 📝 Modelos de Datos (.NET)

### Auto.cs

```csharp
public class Auto
{
    public string Id { get; set; }
    public string Marca { get; set; }
    public string Modelo { get; set; }
    public int Año { get; set; }
    public decimal Precio { get; set; }
    public int Kilometraje { get; set; }
    public string Color { get; set; }
    public string Combustible { get; set; }
    public string Transmision { get; set; }
    public string Descripcion { get; set; }
    public string ImagenUrl { get; set; }
    public string Estado { get; set; } // disponible, vendido, reservado
}
```

### Turno.cs

```csharp
public class Turno
{
    public string Id { get; set; }
    public string ClienteId { get; set; }
    public string ClienteNombre { get; set; }
    public DateTime Fecha { get; set; }
    public string Hora { get; set; }
    public string TipoServicio { get; set; }
    public string Estado { get; set; } // pendiente, confirmado, completado, cancelado
    public string Vehiculo { get; set; }
    public string Observaciones { get; set; }
}
```

### User.cs

```csharp
public class User
{
    public string Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Telefono { get; set; }
    public string Rol { get; set; } // cliente, admin
}
```

## 🧪 Testing de Conexión

### 1. Verificar Backend

```powershell
# Verificar que el backend esté corriendo
curl http://localhost:5000/api/health
# o
Invoke-WebRequest http://localhost:5000/api/health
```

### 2. Test Manual de Endpoints

```powershell
# Test Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"123456"}'

# Test Get Autos
curl http://localhost:5000/api/autos

# Test Get Turnos (con token)
curl http://localhost:5000/api/turnos/mis-turnos `
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Verificar en Frontend

Abre la consola del navegador (F12) y verifica:

- Network tab: Las peticiones se hacen a localhost:5000
- Console: No hay errores CORS
- Application > Local Storage: El token JWT se guarda correctamente

## 🔍 Debugging

### Frontend (lib/api.ts)

Agregar logs para debugging:

```typescript
apiClient.interceptors.request.use((config) => {
  console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Token incluido");
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);
```

### Backend

Agregar logging en cada endpoint:

```csharp
[HttpGet]
public IActionResult GetAutos()
{
    _logger.LogInformation("GET /api/autos - Solicitando lista de autos");
    var autos = _autoService.GetAll();
    _logger.LogInformation($"Retornando {autos.Count} autos");
    return Ok(autos);
}
```

## ⚠️ Problemas Comunes

### Error CORS

**Síntoma**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solución**: Verificar configuración CORS en Program.cs

### Error 401 Unauthorized

**Síntoma**: Todas las peticiones retornan 401

**Solución**:

1. Verificar que el token se envíe en el header
2. Verificar que el token sea válido
3. Verificar configuración JWT en backend

### Error de Conexión

**Síntoma**: `ERR_CONNECTION_REFUSED`

**Solución**:

1. Verificar que el backend esté corriendo
2. Verificar el puerto correcto (5000)
3. Verificar firewall

## 📊 Monitoreo

### Backend Logs

```csharp
// Agregar logging detallado
services.AddLogging(builder =>
{
    builder.AddConsole();
    builder.AddDebug();
});
```

### Frontend Network Inspector

1. Abrir DevTools (F12)
2. Network tab
3. Filtrar por "Fetch/XHR"
4. Ver todas las peticiones a la API

## ✅ Checklist de Integración

Antes de considerar la integración completa:

- [ ] Backend corriendo en localhost:5000
- [ ] CORS habilitado y configurado
- [ ] JWT funcionando correctamente
- [ ] Endpoints de auth respondiendo
- [ ] Endpoints de autos funcionando
- [ ] Endpoints de turnos funcionando
- [ ] Frontend hace peticiones correctas
- [ ] Tokens se guardan y envían
- [ ] Errores se manejan correctamente
- [ ] Loading states funcionan
- [ ] Toast notifications aparecen
- [ ] Datos se muestran correctamente

## 🎉 ¡Listo!

Una vez completados todos estos pasos, tu frontend estará completamente integrado con el backend .NET 8.

---

**Nota**: Si prefieres seguir usando mock data durante el desarrollo, simplemente no hagas ningún cambio. El proyecto funciona perfectamente con datos de prueba.
