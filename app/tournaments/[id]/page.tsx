"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Trophy, Info, CreditCard, User, ChevronLeft, Share2, Bookmark } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { use } from "react"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para los torneos
const tournaments = [
  {
    id: "1",
    title: "Torneo Primavera",
    description: "Torneo de nivel intermedio con premios para los ganadores",
    longDescription:
      "Participa en nuestro Torneo Primavera, un evento diseñado para jugadores de nivel intermedio que quieren poner a prueba sus habilidades. El torneo se jugará en formato de grupos seguido de eliminatorias directas. Habrá premios para los ganadores y finalistas.",
    date: "15 de Mayo, 2025",
    time: "10:00 - 18:00",
    location: "Pistas Centrales",
    address: "Av. del Deporte 123, Madrid",
    slots: "16 parejas",
    price: "€50 por pareja",
    level: "Intermedio",
    status: "Abierto",
    format: "Fase de grupos + Eliminatorias",
    prizes: ["Trofeo para campeones", "Material deportivo", "Descuentos en próximos torneos"],
    rules: [
      "Partidos a 9 juegos en fase de grupos",
      "Semifinales y final a 2 sets + super tie-break",
      "Se aplicará el reglamento oficial de la Federación",
      "Obligatorio presentarse 15 minutos antes del partido",
    ],
    participants: [
      { name: "Carlos Rodríguez y Ana Martínez", category: "Intermedio" },
      { name: "Juan López y María García", category: "Intermedio" },
      { name: "Pedro Sánchez y Laura Fernández", category: "Intermedio" },
    ],
  },
  {
    id: "2",
    title: "Copa Elite",
    description: "Torneo de alto nivel con los mejores jugadores de la academia",
    longDescription:
      "La Copa Elite es nuestro torneo más prestigioso, diseñado para los jugadores más avanzados. Compite contra los mejores jugadores de la academia en un formato exigente y demuestra tu nivel en la pista.",
    date: "2 de Junio, 2025",
    time: "09:00 - 20:00",
    location: "Pistas Premium",
    address: "Av. del Deporte 123, Madrid",
    slots: "8 parejas",
    price: "€80 por pareja",
    level: "Avanzado",
    status: "Abierto",
    format: "Cuadro eliminatorio",
    prizes: ["Trofeo para campeones y finalistas", "Premio en metálico", "Material deportivo de alta gama"],
    rules: [
      "Partidos a 3 sets con tie-break",
      "Descanso de 15 minutos entre partidos",
      "Se aplicará el reglamento oficial de la Federación",
      "Obligatorio presentarse 20 minutos antes del partido",
    ],
    participants: [
      { name: "Roberto Gómez y Elena Ruiz", category: "Avanzado" },
      { name: "Javier Martín y Sofía López", category: "Avanzado" },
    ],
  },
  {
    id: "3",
    title: "Torneo Amistoso",
    description: "Torneo para principiantes y jugadores que quieren mejorar su nivel",
    longDescription:
      "El Torneo Amistoso está diseñado para jugadores principiantes que quieren disfrutar del padel en un ambiente relajado y divertido. Es una oportunidad perfecta para ganar experiencia en competición y conocer a otros jugadores.",
    date: "20 de Mayo, 2025",
    time: "16:00 - 21:00",
    location: "Pistas Auxiliares",
    address: "Av. del Deporte 123, Madrid",
    slots: "24 parejas",
    price: "€30 por pareja",
    level: "Principiante",
    status: "Abierto",
    format: "Fase de grupos",
    prizes: ["Medallas para los ganadores", "Material deportivo básico", "Clase gratuita con entrenador"],
    rules: [
      "Partidos a 7 juegos",
      "Ambiente amistoso y deportivo",
      "Entrenadores disponibles para consejos",
      "Obligatorio presentarse 10 minutos antes del partido",
    ],
    participants: [
      { name: "Miguel Torres y Lucía Díaz", category: "Principiante" },
      { name: "David Navarro y Carmen Ortiz", category: "Principiante" },
      { name: "Antonio Moreno y Isabel Serrano", category: "Principiante" },
      { name: "Francisco Jiménez y Pilar Vázquez", category: "Principiante" },
    ],
  },
  {
    id: "4",
    title: "Campeonato Mensual",
    description: "Torneo mensual con diferentes categorías y niveles",
    longDescription:
      "Nuestro Campeonato Mensual es un evento recurrente que ofrece competición para todos los niveles. Con diferentes categorías, todos los jugadores pueden encontrar su lugar y disfrutar de la competición adaptada a su nivel.",
    date: "10 de Junio, 2025",
    time: "09:00 - 21:00",
    location: "Todas las pistas",
    address: "Av. del Deporte 123, Madrid",
    slots: "32 parejas",
    price: "€60 por pareja",
    level: "Todos los niveles",
    status: "Próximamente",
    format: "Categorías por nivel + Eliminatorias",
    prizes: ["Trofeos para todas las categorías", "Material deportivo", "Descuentos en clases"],
    rules: [
      "Diferentes formatos según categoría",
      "Inscripción en la categoría correspondiente al nivel",
      "Se aplicará el reglamento oficial de la Federación",
      "Obligatorio presentarse 15 minutos antes del partido",
    ],
    participants: [],
  },
]

export default function TournamentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const tournament = tournaments.find((t) => t.id === resolvedParams.id)
  const { user } = useAuth()

  if (!tournament) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 text-center">
        <h1 className="text-3xl font-bold">Torneo no encontrado</h1>
        <p className="mt-4 text-muted-foreground">El torneo que buscas no existe o ha sido eliminado.</p>
        <Link href="/tournaments" className="mt-6 inline-block">
          <Button>Ver todos los torneos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <Link href="/tournaments" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Volver a Torneos
      </Link>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/tournaments/${tournament.id}-hero.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-3xl">
            <Badge 
              variant={tournament.status === "Abierto" ? "default" : "secondary"}
              className="mb-4"
            >
              {tournament.status === "Abierto" ? "Inscripciones Abiertas" : "Próximamente"}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{tournament.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(tournament.date).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{tournament.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{tournament.participants.length} / {tournament.slots.split(" ")[0]} parejas</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                <span>{tournament.price} en premios</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="rules">Reglas</TabsTrigger>
              <TabsTrigger value="participants">Participantes</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Sobre el Torneo</h2>
                  <p className="text-gray-600 mb-6">{tournament.longDescription}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Categoría y Nivel</h3>
                      <p className="text-gray-600">{tournament.level}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Progreso de Inscripciones</h3>
                      <Progress value={(tournament.participants.length / Number.parseInt(tournament.slots.split(" ")[0], 10)) * 100} className="mb-2" />
                      <p className="text-sm text-gray-600">
                        {tournament.participants.length} de {tournament.slots.split(" ")[0]} plazas ocupadas
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Premios</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {tournament.prizes.map((prize, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="font-bold text-lg">{prize}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Reglas del Torneo</h2>
                  <ul className="space-y-4">
                    {tournament.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-600">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Participantes inscritos</h3>
                {tournament.participants.length > 0 ? (
                  <div className="border rounded-lg divide-y">
                    {tournament.participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          <User className="mr-2 h-5 w-5 text-muted-foreground" />
                          <span>{participant.name}</span>
                        </div>
                        <Badge variant="outline">{participant.category}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Aún no hay participantes inscritos</p>
                    {tournament.status === "Abierto" && (
                      <p className="mt-2 text-sm">¡Sé el primero en inscribirte!</p>
                    )}
                  </div>
                )}
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    Plazas disponibles:{" "}
                    {Number.parseInt(tournament.slots.split(" ")[0], 10) - tournament.participants.length} de{" "}
                    {tournament.slots.split(" ")[0]}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Inscripción</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio por pareja</span>
                  <span className="font-semibold">{tournament.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plazas disponibles</span>
                  <span className="font-semibold">{Number.parseInt(tournament.slots.split(" ")[0], 10) - tournament.participants.length}</span>
                </div>
                <div className="pt-4 border-t">
                  {user ? (
                    <Link href={`/tournaments/${resolvedParams.id}/register`} className="w-full">
                      <Button className="w-full" size="lg" disabled={tournament.status !== "Abierto"}>
                        {tournament.status === "Abierto" ? "Inscribirse ahora" : "Inscripción no disponible"}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/login" className="w-full">
                        <Button className="w-full" size="lg">
                          Iniciar sesión para inscribirse
                        </Button>
                      </Link>
                      <p className="text-sm text-muted-foreground text-center">
                        ¿No tienes cuenta?{" "}
                        <Link href="/auth/register" className="text-blue-600 hover:underline">
                          Regístrate
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Organizador</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <div className="font-semibold">Academia de Padel</div>
                  <div className="text-sm text-gray-600">Organizador oficial</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

