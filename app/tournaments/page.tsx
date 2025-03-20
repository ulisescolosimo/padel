"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Trophy, Search, Filter } from "lucide-react"
import { useAuth } from "@/lib/auth"

// Datos de ejemplo para los torneos
const tournaments = [
  {
    id: "1",
    title: "Torneo Primavera",
    description: "Torneo de nivel intermedio con premios para los ganadores",
    date: "15 de Mayo, 2025",
    location: "Pistas Centrales",
    level: "Intermedio",
    status: "Abierto",
    slots: "16 parejas",
    price: "€50 por pareja",
  },
  {
    id: "2",
    title: "Copa Elite",
    description: "Torneo de alto nivel con los mejores jugadores de la academia",
    date: "2 de Junio, 2025",
    location: "Pistas Premium",
    level: "Avanzado",
    status: "Abierto",
    slots: "8 parejas",
    price: "€80 por pareja",
  },
  {
    id: "3",
    title: "Torneo Amistoso",
    description: "Torneo para principiantes y jugadores que quieren mejorar su nivel",
    date: "20 de Mayo, 2025",
    location: "Pistas Auxiliares",
    level: "Principiante",
    status: "Abierto",
    slots: "24 parejas",
    price: "€30 por pareja",
  },
  {
    id: "4",
    title: "Campeonato Mensual",
    description: "Torneo mensual con diferentes categorías y niveles",
    date: "10 de Junio, 2025",
    location: "Todas las pistas",
    level: "Todos los niveles",
    status: "Próximamente",
    slots: "32 parejas",
    price: "€60 por pareja",
  },
]

export default function TournamentsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = levelFilter === "all" || tournament.level === levelFilter

    return matchesSearch && matchesLevel
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Torneos</h1>
          <p className="text-muted-foreground mt-1">Descubre y participa en nuestros torneos de padel</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar torneos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por nivel" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
              <SelectItem value="Todos los niveles">Mixto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{tournament.title}</CardTitle>
                  <Badge variant={tournament.status === "Abierto" ? "default" : "secondary"}>{tournament.status}</Badge>
                </div>
                <CardDescription>{tournament.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Nivel: {tournament.level}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-medium">{tournament.price}</span>
                    <span className="text-muted-foreground text-xs">{tournament.slots}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/tournaments/${tournament.id}`} className="w-full">
                  <Button className="w-full" variant={tournament.status === "Abierto" ? "default" : "outline"}>
                    {tournament.status === "Abierto" ? "Ver detalles" : "Más información"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No se encontraron torneos</h3>
            <p className="text-muted-foreground mt-1">Intenta cambiar los filtros o busca con otros términos</p>
          </div>
        )}
      </div>

      {user && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres organizar tu propio torneo?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Si eres miembro de nuestra academia, puedes solicitar la organización de un torneo personalizado para ti y
            tus amigos.
          </p>
          <Link href="/tournaments/request">
            <Button size="lg">Solicitar torneo</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

