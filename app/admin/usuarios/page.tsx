'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  Shield,
  User,
} from 'lucide-react'
import { usuariosAPI, Usuario } from '@/lib/api'
import toast from 'react-hot-toast'

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRol, setFilterRol] = useState<'todos' | 'Admin' | 'Cliente'>('todos')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const response = await usuariosAPI.getAll()
      setUsuarios(response.data)
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error)
      toast.error(error.response?.data?.message || 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRol === 'todos' || usuario.rol === filterRol
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await usuariosAPI.delete(id)
        setUsuarios(usuarios.filter((u) => u.id !== id))
        toast.success('Usuario eliminado correctamente')
      } catch (error: any) {
        console.error('Error al eliminar usuario:', error)
        toast.error(error.response?.data?.message || 'Error al eliminar usuario')
      }
    }
  }

  const handleToggleEstado = async (id: number) => {
    const usuario = usuarios.find((u) => u.id === id)
    if (!usuario) return
    
    try {
      // Por ahora solo actualiza en frontend, ya que el backend no tiene campo estado
      // Puedes agregar este campo en el backend si lo necesitas
      toast.success('Funcionalidad de estado disponible próximamente')
    } catch (error: any) {
      console.error('Error al actualizar estado:', error)
      toast.error(error.response?.data?.message || 'Error al actualizar estado')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
            <p className="text-gray-400">
              Administra los usuarios de la plataforma
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedUser(null)
              setShowModal(true)
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#b71c1c] text-white rounded-lg hover:bg-[#8b0000] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Usuarios</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{usuarios.length}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#b71c1c]" />
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Activos</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400">
                  {usuarios.length}
                </p>
              </div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Administradores</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-400">
                  {usuarios.filter((u) => u.rol === 'Admin').length}
                </p>
              </div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Clientes</p>
                <p className="text-xl sm:text-2xl font-bold text-[#b71c1c]">
                  {usuarios.filter((u) => u.rol === 'Cliente').length}
                </p>
              </div>
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#b71c1c]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c]"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
          <button
            onClick={() => setFilterRol('todos')}
            className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-colors whitespace-nowrap ${
              filterRol === 'todos'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterRol('Admin')}
            className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-colors whitespace-nowrap ${
              filterRol === 'Admin'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setFilterRol('Cliente')}
            className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-colors whitespace-nowrap ${
              filterRol === 'Cliente'
                ? 'bg-[#b71c1c] text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#b71c1c]'
            }`}
          >
            Clientes
          </button>
        </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#0a0a0a]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 whitespace-nowrap">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 whitespace-nowrap">
                  Contacto
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 whitespace-nowrap">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 whitespace-nowrap">
                  Fecha de Registro
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400 whitespace-nowrap">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {filteredUsuarios.map((usuario) => (
                <motion.tr
                  key={usuario.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-[#0a0a0a] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {usuario.nombre.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm truncate">{usuario.nombre}</p>
                        <p className="text-gray-400 text-xs truncate">{usuario.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{usuario.telefono}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        usuario.rol === 'Admin'
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}
                    >
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">
                    {new Date(usuario.fechaRegistro).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(usuario)
                          toast('Ver detalles: ' + usuario.nombre)
                        }}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors flex-shrink-0"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(usuario)
                          setShowModal(true)
                        }}
                        className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors flex-shrink-0"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsuarios.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No se encontraron usuarios</p>
          </div>
        )}
      </div>
    </div>
  )
}
