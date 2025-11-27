'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Car, 
  Bike, 
  ArrowLeft, 
  Upload,
  X,
  Check,
  AlertCircle,
  Star
} from 'lucide-react'
import { autosAPI, motosAPI, destacadosAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import type { CreateAutoRequest, CreateMotoRequest } from '@/lib/types/api.types'

type TipoVehiculo = 'auto' | 'moto'

export default function NuevoVehiculoPage() {
  const router = useRouter()
  const [tipoVehiculo, setTipoVehiculo] = useState<TipoVehiculo>('auto')
  const [loading, setLoading] = useState(false)
  const [vehiculoCreado, setVehiculoCreado] = useState<{ id: number; tipo: TipoVehiculo } | null>(null)
  const [imagenes, setImagenes] = useState<File[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  // Formulario Auto
  const [autoForm, setAutoForm] = useState<Omit<CreateAutoRequest, 'disponible' | 'estado'>>({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    precio: 0,
    descripcion: '',
    puertas: 4,
    tipoCombustible: 'Nafta',
    transmision: 'Manual',
    kilometraje: 0,
  })

  // Formulario Moto
  const [motoForm, setMotoForm] = useState<Omit<CreateMotoRequest, 'disponible' | 'estado'>>({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    precio: 0,
    descripcion: '',
    cilindrada: 150,
    tipoMoto: 'Naked',
    kilometraje: 0,
  })

  const [disponible, setDisponible] = useState(true)
  const [estado, setEstado] = useState<'0km' | 'Usado'>('0km')
  const [esDestacado, setEsDestacado] = useState(false)
  const [ordenDestacado, setOrdenDestacado] = useState<number | null>(null)

  const handleCreateVehiculo = async () => {
    setLoading(true)
    try {
      if (tipoVehiculo === 'auto') {
        const payload: CreateAutoRequest = {
          ...autoForm,
          disponible,
          estado,
          kilometraje: estado === '0km' ? 0 : autoForm.kilometraje,
        }
        const response = await autosAPI.create(payload)
        
        // Si se marcó como destacado, hacer la llamada adicional
        if (esDestacado) {
          try {
            await destacadosAPI.marcarAutoDestacado(response.data.id, ordenDestacado || undefined)
          } catch (error) {
            console.error('Error al marcar como destacado:', error)
            toast.error('Auto creado pero no se pudo marcar como destacado')
          }
        }
        
        setVehiculoCreado({ id: response.data.id, tipo: 'auto' })
        toast.success('Auto creado exitosamente')
      } else {
        const payload: CreateMotoRequest = {
          ...motoForm,
          disponible,
          estado,
          kilometraje: estado === '0km' ? 0 : motoForm.kilometraje,
        }
        const response = await motosAPI.create(payload)
        
        // Si se marcó como destacado, hacer la llamada adicional
        if (esDestacado) {
          try {
            await destacadosAPI.marcarMotoDestacada(response.data.id, ordenDestacado || undefined)
          } catch (error) {
            console.error('Error al marcar como destacado:', error)
            toast.error('Moto creada pero no se pudo marcar como destacada')
          }
        }
        
        setVehiculoCreado({ id: response.data.id, tipo: 'moto' })
        toast.success('Moto creada exitosamente')
      }
    } catch (error: any) {
      console.error('Error al crear vehículo:', error)
      toast.error(error.response?.data?.message || 'Error al crear el vehículo')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      
      // Validar tamaño (5MB max por imagen)
      const invalidFiles = files.filter(f => f.size > 5 * 1024 * 1024)
      if (invalidFiles.length > 0) {
        toast.error('Algunas imágenes superan el límite de 5MB')
        return
      }

      // Validar formato
      const validFormats = ['image/jpeg', 'image/png', 'image/webp']
      const invalidFormats = files.filter(f => !validFormats.includes(f.type))
      if (invalidFormats.length > 0) {
        toast.error('Solo se permiten imágenes JPG, PNG o WebP')
        return
      }

      setImagenes(prev => [...prev, ...files])
    }
  }

  const removeImage = (index: number) => {
    setImagenes(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadImages = async () => {
    if (!vehiculoCreado || imagenes.length === 0) return

    setUploadingImages(true)
    try {
      for (const imagen of imagenes) {
        if (vehiculoCreado.tipo === 'auto') {
          await autosAPI.uploadImagen(vehiculoCreado.id, imagen)
        } else {
          await motosAPI.uploadImagen(vehiculoCreado.id, imagen)
        }
      }
      toast.success('Imágenes subidas exitosamente')
      router.push('/admin/vehiculos')
    } catch (error: any) {
      console.error('Error al subir imágenes:', error)
      toast.error(error.response?.data?.message || 'Error al subir las imágenes')
    } finally {
      setUploadingImages(false)
    }
  }

  return (
    <div >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {vehiculoCreado ? 'Agregar Imágenes' : 'Nuevo Vehículo'}
            </h1>
            <p className="text-gray-400">
              {vehiculoCreado 
                ? 'Sube las imágenes del vehículo creado'
                : 'Completa los datos del vehículo'
              }
            </p>
          </div>
        </div>
      </div>

      {!vehiculoCreado ? (
        <div className="w-full">
          {/* Selector de tipo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Tipo de Vehículo
            </label>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <button
                onClick={() => setTipoVehiculo('auto')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  tipoVehiculo === 'auto'
                    ? 'border-[#b71c1c] bg-[#b71c1c]/10'
                    : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
                }`}
              >
                <Car className={`w-8 h-8 mb-3 mx-auto ${
                  tipoVehiculo === 'auto' ? 'text-[#b71c1c]' : 'text-gray-400'
                }`} />
                <p className={`font-semibold ${
                  tipoVehiculo === 'auto' ? 'text-white' : 'text-gray-400'
                }`}>
                  Auto
                </p>
              </button>
              <button
                onClick={() => setTipoVehiculo('moto')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  tipoVehiculo === 'moto'
                    ? 'border-[#b71c1c] bg-[#b71c1c]/10'
                    : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
                }`}
              >
                <Bike className={`w-8 h-8 mb-3 mx-auto ${
                  tipoVehiculo === 'moto' ? 'text-[#b71c1c]' : 'text-gray-400'
                }`} />
                <p className={`font-semibold ${
                  tipoVehiculo === 'moto' ? 'text-white' : 'text-gray-400'
                }`}>
                  Moto
                </p>
              </button>
            </div>
          </motion.div>

          {/* Formulario común */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  value={tipoVehiculo === 'auto' ? autoForm.marca : motoForm.marca}
                  onChange={(e) => {
                    if (tipoVehiculo === 'auto') {
                      setAutoForm({ ...autoForm, marca: e.target.value })
                    } else {
                      setMotoForm({ ...motoForm, marca: e.target.value })
                    }
                  }}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  placeholder="Ej: Ford, Honda, Yamaha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  value={tipoVehiculo === 'auto' ? autoForm.modelo : motoForm.modelo}
                  onChange={(e) => {
                    if (tipoVehiculo === 'auto') {
                      setAutoForm({ ...autoForm, modelo: e.target.value })
                    } else {
                      setMotoForm({ ...motoForm, modelo: e.target.value })
                    }
                  }}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  placeholder="Ej: Focus, Civic, YBR 125"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  value={tipoVehiculo === 'auto' ? autoForm.año : motoForm.año}
                  onChange={(e) => {
                    const año = parseInt(e.target.value) || new Date().getFullYear()
                    if (tipoVehiculo === 'auto') {
                      setAutoForm({ ...autoForm, año })
                    } else {
                      setMotoForm({ ...motoForm, año })
                    }
                  }}
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Precio *
                </label>
                <input
                  type="number"
                  value={tipoVehiculo === 'auto' ? autoForm.precio : motoForm.precio}
                  onChange={(e) => {
                    const precio = parseFloat(e.target.value) || 0
                    if (tipoVehiculo === 'auto') {
                      setAutoForm({ ...autoForm, precio })
                    } else {
                      setMotoForm({ ...motoForm, precio })
                    }
                  }}
                  min={0}
                  step={1000}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado *
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as '0km' | 'Usado')}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                >
                  <option value="0km">0 KM</option>
                  <option value="Usado">Usado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Disponibilidad
                </label>
                <div className="flex items-center space-x-4 pt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponible}
                      onChange={(e) => setDisponible(e.target.checked)}
                      className="w-5 h-5 rounded border-[#2a2a2a] bg-black text-[#b71c1c] focus:ring-[#b71c1c]"
                    />
                    <span className="ml-2 text-white">Disponible para venta</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Destacado
                </label>
                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={esDestacado}
                        onChange={(e) => setEsDestacado(e.target.checked)}
                        className="w-5 h-5 rounded border-[#2a2a2a] bg-black text-yellow-600 focus:ring-yellow-600"
                      />
                      <span className="ml-2 text-white flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Marcar como destacado
                      </span>
                    </label>
                  </div>
                  
                  {esDestacado && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Orden de aparición (opcional)
                      </label>
                      <input
                        type="number"
                        value={ordenDestacado || ''}
                        onChange={(e) => setOrdenDestacado(e.target.value ? parseInt(e.target.value) : null)}
                        min={1}
                        placeholder="Se auto-asignará si se deja vacío"
                        className="w-full max-w-xs px-4 py-2 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Los vehículos destacados aparecen en la home. El orden determina su posición (1, 2, 3...).
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={tipoVehiculo === 'auto' ? autoForm.descripcion : motoForm.descripcion}
                  onChange={(e) => {
                    if (tipoVehiculo === 'auto') {
                      setAutoForm({ ...autoForm, descripcion: e.target.value })
                    } else {
                      setMotoForm({ ...motoForm, descripcion: e.target.value })
                    }
                  }}
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c] resize-none"
                  placeholder="Descripción detallada del vehículo..."
                />
              </div>
            </div>
          </motion.div>

          {/* Formulario específico */}
          {tipoVehiculo === 'auto' ? (
            <motion.div
              key="auto-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Especificaciones del Auto</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Puertas *
                  </label>
                  <select
                    value={autoForm.puertas}
                    onChange={(e) => setAutoForm({ ...autoForm, puertas: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  >
                    <option value={2}>2 puertas</option>
                    <option value={3}>3 puertas</option>
                    <option value={4}>4 puertas</option>
                    <option value={5}>5 puertas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Combustible *
                  </label>
                  <select
                    value={autoForm.tipoCombustible}
                    onChange={(e) => setAutoForm({ ...autoForm, tipoCombustible: e.target.value as any })}
                    className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  >
                    <option value="Nafta">Nafta</option>
                    <option value="Gasoil">Gasoil</option>
                    <option value="GNC">GNC</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transmisión
                  </label>
                  <select
                    value={autoForm.transmision || ''}
                    onChange={(e) => setAutoForm({ ...autoForm, transmision: e.target.value as any })}
                    className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  >
                    <option value="">No especificar</option>
                    <option value="Manual">Manual</option>
                    <option value="Automática">Automática</option>
                  </select>
                </div>

                {estado === 'Usado' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      value={autoForm.kilometraje || 0}
                      onChange={(e) => setAutoForm({ ...autoForm, kilometraje: parseInt(e.target.value) || 0 })}
                      min={0}
                      step={1000}
                      className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                      placeholder="0 km"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="moto-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Especificaciones de la Moto</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cilindrada (cc) *
                  </label>
                  <input
                    type="number"
                    value={motoForm.cilindrada}
                    onChange={(e) => setMotoForm({ ...motoForm, cilindrada: parseInt(e.target.value) || 50 })}
                    min={50}
                    max={2000}
                    step={50}
                    className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Moto *
                  </label>
                  <select
                    value={motoForm.tipoMoto}
                    onChange={(e) => setMotoForm({ ...motoForm, tipoMoto: e.target.value as any })}
                    className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                  >
                    <option value="Naked">Naked</option>
                    <option value="Deportiva">Deportiva</option>
                    <option value="Touring">Touring</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Custom">Custom</option>
                    <option value="Enduro">Enduro</option>
                    <option value="Cross">Cross</option>
                  </select>
                </div>

                {estado === 'Usado' && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      value={motoForm.kilometraje || 0}
                      onChange={(e) => setMotoForm({ ...motoForm, kilometraje: parseInt(e.target.value) || 0 })}
                      min={0}
                      step={1000}
                      className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
                      placeholder="0 km"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateVehiculo}
              disabled={loading}
              className="px-6 py-3 bg-[#b71c1c] text-white rounded-lg hover:bg-[#8b0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Crear Vehículo
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        // Sección de subida de imágenes
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg mb-6"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              ¡Vehículo creado exitosamente!
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Ahora puedes agregar las imágenes del vehículo
            </p>

            <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium mb-1">Requisitos de las imágenes</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Formatos: JPG, PNG o WebP</li>
                  <li>• Tamaño máximo: 5MB por imagen</li>
                  <li>• Se recomienda subir al menos 3 imágenes</li>
                </ul>
              </div>
            </div>

            {/* Selector de archivos */}
            <div className="mb-6">
              <label className="block w-full cursor-pointer">
                <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#b71c1c] transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    Haz clic o arrastra imágenes aquí
                  </p>
                  <p className="text-sm text-gray-400">
                    Puedes seleccionar múltiples imágenes
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview de imágenes */}
            {imagenes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Imágenes seleccionadas ({imagenes.length})
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {imagenes.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.push('/admin/vehiculos')}
              className="px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              Omitir y finalizar
            </button>
            <button
              onClick={handleUploadImages}
              disabled={uploadingImages || imagenes.length === 0}
              className="px-6 py-3 bg-[#b71c1c] text-white rounded-lg hover:bg-[#8b0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploadingImages ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Subir Imágenes ({imagenes.length})
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
