"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Trophy, Search, Filter, Users, Clock, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth"

// Datos de ejemplo para los torneos
const tournaments = [
  {
    id: 1,
    title: "Torneo de Verano 2025",
    date: "2025-07-15",
    location: "Pista Central",
    participants: 32,
    maxParticipants: 64,
    category: "Mixto",
    level: "Intermedio",
    prize: "1000€",
    status: "open",
    image: "/tournaments/summer-tournament.jpg"
  },
  {
    id: 2,
    title: "Campeonato Nacional",
    date: "2025-08-01",
    location: "Pista Premium",
    participants: 48,
    maxParticipants: 64,
    category: "Masculino",
    level: "Avanzado",
    prize: "2000€",
    status: "open",
    image: "/tournaments/national-championship.jpg"
  },
  {
    id: 3,
    title: "Torneo de Invierno",
    date: "2025-12-10",
    location: "Pista Indoor",
    participants: 16,
    maxParticipants: 32,
    category: "Femenino",
    level: "Todos los niveles",
    prize: "800€",
    status: "coming_soon",
    image: "/tournaments/winter-tournament.jpg"
  }
]

export default function TournamentsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = levelFilter === "all" || tournament.level === levelFilter

    return matchesSearch && matchesLevel
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Torneos de Padel</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Participa en los mejores torneos organizados por nuestra academia. 
          Encuentra el torneo perfecto para tu nivel y compite por premios increíbles.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input 
              type="search" 
              placeholder="Buscar torneos..." 
              className="w-full"
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="femenino">Femenino</SelectItem>
              <SelectItem value="mixto">Mixto</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="principiante">Principiante</SelectItem>
              <SelectItem value="intermedio">Intermedio</SelectItem>
              <SelectItem value="avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="relative p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tournament.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge 
                    variant={tournament.status === "open" ? "default" : "secondary"}
                    className="mb-2"
                  >
                    {tournament.status === "open" ? "Inscripciones Abiertas" : "Próximamente"}
                  </Badge>
                  <h3 className="text-xl font-bold text-white">{tournament.title}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(tournament.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{tournament.participants}/{tournament.maxParticipants} participantes</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span>{tournament.prize} en premios</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{tournament.category} - {tournament.level}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/tournaments/${tournament.id}`} className="w-full">
                <Button className="w-full group-hover:bg-blue-700 transition-colors duration-200">
                  Ver Detalles
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿No quieres perderte ningún torneo?</h2>
          <p className="mb-6">Suscríbete a nuestro newsletter y recibe las últimas novedades y ofertas especiales.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Tu email" 
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

