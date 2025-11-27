'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Upload,
  Image as ImageIcon,
  Fuel,
  Settings,
  Gauge,
  Star,
  Calendar,
  DoorClosed,
  TrendingUp,
  Package,
  DollarSign,
} from 'lucide-react'
import { autosAPI, destacadosAPI, type Auto, formatearPrecio, formatearKilometraje, getEstadoBadge } from '@/lib/api'
import toast from 'react-hot-toast'

export default function VehiculosPage() {
  const router = useRouter()
  const [vehiculos, setVehiculos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState<'todos' | '0km' | 'Usado'>('todos')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchVehiculos()
  }, [])

  const fetchVehiculos = async () => {
    try {
      const response = await autosAPI.getAll()
      setVehiculos(response.data)
    } catch (error: any) {
      console.error('Error al cargar vehículos:', error)
      toast.error(error.response?.data?.message || 'Error al cargar vehículos')
    } finally {
      setLoading(false)
    }
  }

  const filteredVehiculos = vehiculos.filter((vehiculo) => {
    const matchesSearch =
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterEstado === 'todos' || vehiculo.estado === filterEstado
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este vehículo? Se eliminarán todas las imágenes asociadas.')) {
      try {
        await autosAPI.delete(id)
        setVehiculos(vehiculos.filter((v) => v.id !== id))
        toast.success('Vehículo eliminado correctamente')
      } catch (error: any) {
        console.error('Error al eliminar vehículo:', error)
        toast.error(error.response?.data?.message || 'Error al eliminar vehículo')
      }
    }
  }

  const handleUploadImage = async (autoId: number, file: File) => {
    try {
      const response = await autosAPI.uploadImagen(autoId, file)
      toast.success('Imagen subida correctamente')
      // Actualizar el auto con la nueva imagen
      fetchVehiculos()
    } catch (error: any) {
      console.error('Error al subir imagen:', error)
      toast.error(error.response?.data?.message || 'Error al subir imagen')
    }
  }

  const handleToggleDestacado = async (vehiculo: Auto) => {
    try {
      if (vehiculo.esDestacado) {
        // Desmarcar como destacado
        await destacadosAPI.desmarcarAutoDestacado(vehiculo.id)
        toast.success('Vehículo removido de destacados')
      } else {
        // Marcar como destacado (sin orden específico, se auto-asigna)
        await destacadosAPI.marcarAutoDestacado(vehiculo.id)
        toast.success('Vehículo marcado como destacado')
      }
      // Recargar lista
      fetchVehiculos()
    } catch (error: any) {
      console.error('Error al cambiar destacado:', error)
      toast.error(error.response?.data?.message || 'Error al cambiar estado de destacado')
    }
  }

  const handleSetOrdenDestacado = async (vehiculo: Auto) => {
    const orden = prompt(`Ingrese el orden de destacado para ${vehiculo.marca} ${vehiculo.modelo}\n(Número positivo, ej: 1, 2, 3...)`, vehiculo.ordenDestacado?.toString() || '')
    
    if (orden === null) return // Usuario canceló
    
    const ordenNum = parseInt(orden)
    if (isNaN(ordenNum) || ordenNum < 1) {
      toast.error('Ingrese un número válido mayor a 0')
      return
    }

    try {
      await destacadosAPI.marcarAutoDestacado(vehiculo.id, ordenNum)
      toast.success(`Orden establecido: ${ordenNum}`)
      fetchVehiculos()
    } catch (error: any) {
      console.error('Error al establecer orden:', error)
      toast.error(error.response?.data?.message || 'Error al establecer orden')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b71c1c]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Gestión de Vehículos</h1>
            <p className="text-zinc-400 text-sm lg:text-base">Administra el inventario de autos</p>
          </div>
          <button
            onClick={() => router.push('/admin/vehiculos/nuevo')}
            className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-3 bg-feller-red text-white border border-feller-red hover:border-feller-darkred rounded-lg hover:bg-feller-darkred transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Vehículo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <Package className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400" />
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>
            <p className="text-zinc-400 text-xs mb-1">Total Vehículos</p>
            <p className="text-xl lg:text-2xl font-bold text-white">{vehiculos.length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-700"></div>
            </div>
            <p className="text-zinc-400 text-xs mb-1">0 KM</p>
            <p className="text-xl lg:text-2xl font-bold text-emerald-400">{vehiculos.filter((v) => v.estado === '0km').length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
              <div className="w-2 h-2 rounded-full bg-blue-700"></div>
            </div>
            <p className="text-zinc-400 text-xs mb-1">Usados</p>
            <p className="text-xl lg:text-2xl font-bold text-blue-400">{vehiculos.filter((v) => v.estado === 'Usado').length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-feller-red" />
              <div className="w-2 h-2 rounded-full bg-feller-red/70"></div>
            </div>
            <p className="text-zinc-400 text-xs mb-1">Disponibles</p>
            <p className="text-xl lg:text-2xl font-bold text-feller-red">{vehiculos.filter((v) => v.disponible).length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 lg:p-5 backdrop-blur-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400" />
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>
            <p className="text-zinc-400 text-xs mb-1">Valor Stock</p>
            <p className="text-base lg:text-lg font-bold text-white truncate">{formatearPrecio(vehiculos.filter((v) => v.disponible).reduce((sum, v) => sum + v.precio, 0))}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 lg:p-6 mb-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-feller-red/60 transition-colors text-sm lg:text-base"
            />
          </div>

          {/* Estado Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
            <button
              onClick={() => setFilterEstado('todos')}
              className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl transition-all whitespace-nowrap text-sm lg:text-base ${
                filterEstado === 'todos'
                  ? 'bg-feller-red text-white shadow-lg shadow-feller-red/20'
                  : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-feller-red/40'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterEstado('0km')}
              className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl transition-all whitespace-nowrap text-sm lg:text-base ${
                filterEstado === '0km'
                  ? 'bg-feller-red text-white shadow-lg shadow-feller-red/20'
                  : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-feller-red/40'
              }`}
            >
              0 KM
            </button>
            <button
              onClick={() => setFilterEstado('Usado')}
              className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl transition-all whitespace-nowrap text-sm lg:text-base ${
                filterEstado === 'Usado'
                  ? 'bg-feller-red text-white shadow-lg shadow-feller-red/20'
                  : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-feller-red/40'
              }`}
            >
              Usados
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredVehiculos.map((vehiculo, index) => {
          const estadoBadge = getEstadoBadge(vehiculo.estado)
          const imagenPrincipal = vehiculo.imagenes[0]?.url || '/placeholder.jpg'

          return (
            <div
              key={vehiculo.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-feller-red/40 hover:shadow-lg hover:shadow-feller-red/10 transition-all backdrop-blur-sm"
            >
              {/* Image */}
              <div className="relative h-48 bg-zinc-950 overflow-hidden">
                {vehiculo.imagenes.length > 0 ? (
                  <img
                    src={imagenPrincipal}
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Car className="w-16 h-16 text-zinc-700" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border ${
                      estadoBadge.color === 'green'
                        ? 'bg-emerald-500/90 text-white border-emerald-400/50'
                        : 'bg-blue-500/90 text-white border-blue-400/50'
                    }`}
                  >
                    {estadoBadge.label}
                  </span>
                  {vehiculo.disponible ? (
                    <span className="px-3 py-1.5 bg-feller-red/90 backdrop-blur-md border border-feller-red/50 text-white rounded-xl text-xs font-semibold">
                      Disponible
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-zinc-700/90 backdrop-blur-md border border-zinc-600/50 text-white rounded-xl text-xs font-semibold">
                      No disponible
                    </span>
                  )}
                  {vehiculo.esDestacado && (
                    <span className="px-3 py-1.5 bg-yellow-500/90 backdrop-blur-md border border-yellow-400/50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      #{vehiculo.ordenDestacado || '?'}
                    </span>
                  )}
                </div>

                {/* Image Count */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl text-white text-xs font-medium">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{vehiculo.imagenes.length}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {vehiculo.marca} {vehiculo.modelo}
                </h3>
                <p className="text-2xl font-bold text-[#b71c1c] mb-4">
                  {formatearPrecio(vehiculo.precio)}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{vehiculo.año}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                    <Fuel className="w-4 h-4" />
                    <span>{vehiculo.tipoCombustible}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                    <DoorClosed className="w-4 h-4" />
                    <span>{vehiculo.puertas} puertas</span>
                  </div>
                  {vehiculo.transmision && (
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                      <Settings className="w-4 h-4" />
                      <span>{vehiculo.transmision}</span>
                    </div>
                  )}
                  {vehiculo.kilometraje && (
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm col-span-2">
                      <Gauge className="w-4 h-4" />
                      <span>{formatearKilometraje(vehiculo.kilometraje)}</span>
                    </div>
                  )}
                </div>

                {vehiculo.descripcion && (
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    {vehiculo.descripcion}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Subir</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // Validar tipo
                          if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                            toast.error('Formato no permitido. Usa JPG, PNG o WebP')
                            return
                          }
                          // Validar tamaño (5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error('Archivo muy grande. Máximo 5MB')
                            return
                          }
                          handleUploadImage(vehiculo.id, file)
                        }
                      }}
                    />
                  </label>
                  
                  {/* Botón destacado */}
                  <button
                    onClick={() => handleToggleDestacado(vehiculo)}
                    className={`px-4 py-2.5 rounded-xl transition-all border ${
                      vehiculo.esDestacado
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/20'
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:border-yellow-500/40'
                    }`}
                    title={vehiculo.esDestacado ? 'Quitar de destacados' : 'Marcar como destacado'}
                  >
                    <Star className={`w-4 h-4 ${vehiculo.esDestacado ? 'fill-yellow-400' : ''}`} />
                  </button>
                  
                  {/* Botón orden (solo si está destacado) */}
                  {vehiculo.esDestacado && (
                    <button
                      onClick={() => handleSetOrdenDestacado(vehiculo)}
                      className="px-4 py-2.5 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                      title="Establecer orden"
                    >
                      <span className="text-sm font-bold">#{vehiculo.ordenDestacado || '?'}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => toast('Ver detalles: ' + vehiculo.marca)}
                    className="px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toast('Editar: ' + vehiculo.marca)}
                    className="px-4 py-2.5 bg-orange-500/10 text-orange-400 rounded-xl hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehiculo.id)}
                    className="px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredVehiculos.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-2xl backdrop-blur-sm">
          <Car className="w-20 h-20 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg font-medium">No se encontraron vehículos</p>
          <p className="text-zinc-500 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}
