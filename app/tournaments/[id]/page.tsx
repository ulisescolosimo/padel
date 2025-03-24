"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ITournament } from '@/models/Tournament'

interface Tournament extends ITournament {
  _id: string
}

export default function TournamentDetail() {
  const { id } = useParams()
  const { user, signIn } = useAuth()
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await fetch(`/api/tournaments/${id}`)
        if (!res.ok) throw new Error('Error al cargar el torneo')
        const data = await res.json()
        setTournament(data)
      } catch (err) {
        setError('Error al cargar el torneo')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTournament()
  }, [id])

  const handleRegister = async () => {
    try {
      // Verificar nuevamente si el usuario está registrado antes de hacer la petición
      if (isRegistered) {
        alert('Ya estás registrado en este torneo')
        return
      }

      const response = await fetch(`/api/tournaments/${id}/register`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al registrarse')
      }

      // Actualizar el estado del torneo
      const updatedTournament = await fetch(`/api/tournaments/${id}`).then(res => res.json())
      setTournament(updatedTournament)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Error al registrarse')
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  if (!tournament) return <div className="min-h-screen flex items-center justify-center">Torneo no encontrado</div>

  const isRegistered = tournament?.participants.some(
    participant => participant.player._id.toString() === user?.id
  )

  const availablePlaces = tournament.totalPlaces - tournament.participants.length

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">{tournament.name}</h1>
              <div className="flex gap-2">
                {isRegistered && (
                  <Badge variant="success" className="bg-green-600">
                    Inscripto
                  </Badge>
                )}
                <Badge variant={
                  tournament.status === 'published' ? 'default' :
                  tournament.status === 'in_progress' ? 'secondary' :
                  tournament.status === 'completed' ? 'success' :
                  tournament.status === 'cancelled' ? 'destructive' :
                  'outline'
                }>
                  {tournament.status === 'published' ? 'Publicado' :
                   tournament.status === 'in_progress' ? 'En Progreso' :
                   tournament.status === 'completed' ? 'Completado' :
                   tournament.status === 'cancelled' ? 'Cancelado' :
                   'Borrador'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Fecha</p>
                  <p>{format(new Date(tournament.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Ubicación</p>
                  <p>{tournament.location.name}, {tournament.location.city}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Plazas</p>
                  <p>{availablePlaces} de {tournament.totalPlaces} disponibles</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Trophy className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Nivel Mínimo</p>
                  <p>{tournament.minLevel}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Horario</p>
                  <p>{format(new Date(tournament.date), "HH:mm", { locale: es })}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <DollarSign className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Precio por Pareja</p>
                  <p>{tournament.pricePerPair}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Description */}
          <div className="px-6 py-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{tournament.description}</p>
          </div>

          {/* Rules */}
          <div className="px-6 py-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Reglas</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{tournament.rules}</p>
          </div>

          {/* Prizes */}
          <div className="px-6 py-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Premios</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{tournament.prizes}</p>
          </div>

          {/* Registration Section */}
          <div className="p-6 bg-gray-750 border-t border-gray-700">
            {user ? (
              isRegistered ? (
                <div className="text-center">
                  <Badge variant="success" className="mb-2 text-lg bg-green-600">
                    Ya estás inscripto en este torneo
                  </Badge>
                  <p className="text-gray-400 mt-2">
                    Estado del pago: {tournament.participants.find(p => p.player._id.toString() === user.id)?.paymentStatus === 'pending' ? 'Pendiente' : 'Pagado'}
                  </p>
                </div>
              ) : (
                tournament.status === 'published' && (
                  availablePlaces > 0 ? (
                    <Button
                      onClick={handleRegister}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Registrarse en el Torneo
                    </Button>
                  ) : (
                    <div className="text-center text-yellow-500">
                      No hay plazas disponibles
                    </div>
                  )
                )
              )
            ) : (
              <Button
                onClick={() => signIn('google', { callbackUrl: `/tournaments/${id}` })}
                className="w-full bg-white text-gray-900 hover:bg-gray-100"
              >
                Inicia sesión para registrarte
              </Button>
            )}

            {tournament.status !== 'published' && (
              <div className="text-center text-yellow-500 mt-2">
                Este torneo no está abierto para inscripciones
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

