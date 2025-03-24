"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import TournamentFilters from "../components/TournamentFilters"

interface Tournament {
  _id: string
  name: string
  description: string
  date: string
  minLevel: 'Iniciación' | 'Intermedio' | 'Avanzado' | 'Profesional'
  pricePerPair: number
  totalPlaces: number
  location: {
    name: string
    city: string
  }
  participants: {
    player: {
      _id: string
      name: string
      email: string
    }
    registrationDate: string
    paymentStatus: 'pending' | 'paid' | 'cancelled'
  }[]
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled'
  createdBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
}

export default function TournamentsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('/api/tournaments')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Error al cargar los torneos')
        }
        const data = await res.json()
        setTournaments(data)
        setFilteredTournaments(data)
      } catch (err) {
        console.error('Error detallado:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar los torneos')
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  const handleFilterChange = (filters: {
    search: string
    minLevel: string
    dateRange: string
  }) => {
    let filtered = [...tournaments]

    // Filtro por búsqueda
    if (filters.search) {
      filtered = filtered.filter(tournament =>
        tournament.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        tournament.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Filtro por nivel exacto
    if (filters.minLevel) {
      filtered = filtered.filter(tournament =>
        tournament.minLevel === filters.minLevel
      )
    }

    // Filtro por fecha
    if (filters.dateRange) {
      const now = new Date()
      now.setHours(0, 0, 0, 0)
      let maxDate = new Date()
      maxDate.setHours(23, 59, 59, 999)

      switch (filters.dateRange) {
        case 'today':
          maxDate = new Date(now)
          maxDate.setHours(23, 59, 59, 999)
          break
        case 'tomorrow':
          now.setDate(now.getDate() + 1)
          maxDate = new Date(now)
          maxDate.setHours(23, 59, 59, 999)
          break
        case 'week':
          maxDate.setDate(now.getDate() + 7)
          break
        case 'month':
          maxDate.setMonth(now.getMonth() + 1)
          break
        case '3months':
          maxDate.setMonth(now.getMonth() + 3)
          break
        case '6months':
          maxDate.setMonth(now.getMonth() + 6)
          break
      }

      filtered = filtered.filter(tournament => {
        const tournamentDate = new Date(tournament.date)
        return tournamentDate >= now && tournamentDate <= maxDate
      })
    }

    setFilteredTournaments(filtered)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {user?.role === 'admin' && (
            <Button
              onClick={() => router.push('/tournaments/new')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Torneo
            </Button>
          )}
        </div>

        <TournamentFilters onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => {
            const availablePlaces = tournament.totalPlaces - tournament.participants.length

            const isRegistered = tournament?.participants.some(
              participant => participant.player._id === user?.id
            )

            return (
              <Card
                key={tournament._id}
                className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => router.push(`/tournaments/${tournament._id}`)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-white">{tournament.name}</h2>
                    <div className="flex gap-2">
                      {isRegistered && (
                        <Badge variant="success" className="bg-green-600">
                          Inscrito
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

                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(tournament.date), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{tournament.location.name}, {tournament.location.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{availablePlaces} de {tournament.totalPlaces} plazas disponibles</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>Nivel mínimo: {tournament.minLevel}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{tournament.pricePerPair}€ por pareja</span>
                    </div>
                  </div>

                  {tournament.status === 'published' && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      {!user ? (
                        <p className="text-yellow-500 text-sm">Inicia sesión para registrarte</p>
                      ) : isRegistered ? (
                        <div className="flex flex-col gap-2">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/tournaments/${tournament._id}/details`)
                            }}
                          >
                            Ver detalles de inscripción
                          </Button>
                        </div>
                      ) : availablePlaces > 0 ? (
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/tournaments/${tournament._id}`)
                          }}
                        >
                          Registrarse
                        </Button>
                      ) : (
                        <p className="text-red-500 text-sm">No hay plazas disponibles</p>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No se encontraron torneos con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  )
}

