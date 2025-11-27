'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Send,
  User,
  Phone as PhoneIcon,
  AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { notificacionesAPI } from '@/lib/api'
import { Usuario } from '@/lib/types/api.types'
import { usuariosAPI } from '@/lib/api'

export default function NotificacionesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  const [form, setForm] = useState({
    usuarioId: '',
    mensaje: '',
  })

  // Plantillas de mensajes
  const templates = [
    {
      label: 'Turno Confirmado',
      mensaje: 'Hola! Tu turno ha sido confirmado. Te esperamos en la fecha y horario establecido.',
    },
    {
      label: 'Turno Recordatorio',
      mensaje: 'Recordatorio: Tu turno de lavado es mañana. Por favor confirma tu asistencia.',
    },
    {
      label: 'Lavado Completado',
      mensaje: 'Tu vehículo ya está listo! Puedes pasar a retirarlo cuando gustes.',
    },
    {
      label: 'Vehículo Disponible',
      mensaje: 'Tenemos disponible el vehículo que te interesaba. Comunícate para más información.',
    },
  ]

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const response = await usuariosAPI.getAll()
      setUsuarios(response.data)
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleSendWhatsApp = async () => {
    if (!form.usuarioId || !form.mensaje) {
      toast.error('Selecciona un usuario y escribe un mensaje')
      return
    }

    setSending(true)
    try {
      await notificacionesAPI.enviarWhatsApp({
        usuarioId: parseInt(form.usuarioId),
        mensaje: form.mensaje,
      })
      
      toast.success('WhatsApp enviado correctamente')
      setForm({ usuarioId: '', mensaje: '' })
      setShowForm(false)
    } catch (error: any) {
      console.error('Error al enviar WhatsApp:', error)
      toast.error(error.response?.data?.message || 'Error al enviar WhatsApp')
    } finally {
      setSending(false)
    }
  }

  const selectTemplate = (mensaje: string) => {
    setForm({ ...form, mensaje })
  }

  const selectedUser = usuarios.find(u => u.id === parseInt(form.usuarioId))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b71c1c]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notificaciones</h1>
          <p className="text-gray-400">Envía mensajes de WhatsApp a tus clientes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#b71c1c] to-[#8b0000] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          {showForm ? 'Cancelar' : 'Nueva Notificación'}
        </button>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-blue-600/10 border border-blue-600/30 rounded-lg p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-400 font-medium mb-1">Sistema de Notificaciones WhatsApp</p>
          <p className="text-sm text-gray-400">
            Envía mensajes personalizados a tus clientes directamente a su WhatsApp. 
            Los mensajes se envían automáticamente cuando los turnos están finalizados.
          </p>
        </div>
      </motion.div>

      {/* Formulario de envío */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Enviar WhatsApp
          </h2>

          <div className="space-y-4">
            {/* Selector de usuario */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Destinatario
              </label>
              <select
                value={form.usuarioId}
                onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#b71c1c]"
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} - {usuario.telefono || 'Sin teléfono'}
                  </option>
                ))}
              </select>
            </div>

            {/* Vista previa del usuario seleccionado */}
            {selectedUser && (
              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#b71c1c] to-[#8b0000] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {selectedUser.nombre}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <PhoneIcon className="w-3 h-3" />
                    {selectedUser.telefono || 'Sin teléfono'}
                  </p>
                </div>
              </div>
            )}

            {/* Plantillas */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Plantillas rápidas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => selectTemplate(template.mensaje)}
                    className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 hover:border-[#b71c1c] transition-colors text-left"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Mensaje
              </label>
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                className="w-full px-4 py-3 bg-black border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#b71c1c] resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.mensaje.length} caracteres
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSendWhatsApp}
                disabled={sending || !form.usuarioId || !form.mensaje}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#b71c1c] to-[#8b0000] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar WhatsApp
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setForm({ usuarioId: '', mensaje: '' })
                  setShowForm(false)
                }}
                className="px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Notificaciones Automáticas
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            El sistema envía automáticamente notificaciones de WhatsApp cuando:
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              Un turno de lavado se marca como <span className="text-white font-medium">"Finalizado"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600 mt-0.5">○</span>
              Se confirma una venta (próximamente)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600 mt-0.5">○</span>
              Se agenda un nuevo turno (próximamente)
            </li>
          </ul>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Consejos para mensajes efectivos
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#b71c1c]">•</span>
              Sé claro y conciso en tu mensaje
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b71c1c]">•</span>
              Incluye información relevante (fecha, hora, vehículo)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b71c1c]">•</span>
              Usa un tono profesional pero amigable
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#b71c1c]">•</span>
              Verifica el número de teléfono del destinatario
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
