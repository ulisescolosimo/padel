"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Trophy, Info, CreditCard, User } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { use } from "react"

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
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6">
        <Link href="/tournaments" className="text-sm text-blue-600 hover:underline flex items-center">
          ← Volver a torneos
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{tournament.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{tournament.description}</CardDescription>
                </div>
                <Badge variant={tournament.status === "Abierto" ? "default" : "secondary"} className="text-sm">
                  {tournament.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="rules">Reglas</TabsTrigger>
                  <TabsTrigger value="participants">Participantes</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Fecha</div>
                        <div className="text-sm text-muted-foreground">{tournament.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Horario</div>
                        <div className="text-sm text-muted-foreground">{tournament.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Ubicación</div>
                        <div className="text-sm text-muted-foreground">{tournament.location}</div>
                        <div className="text-xs text-muted-foreground">{tournament.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Plazas</div>
                        <div className="text-sm text-muted-foreground">
                          {tournament.participants.length} / {tournament.slots.split(" ")[0]} parejas
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Descripción del torneo</h3>
                    <p className="text-muted-foreground">{tournament.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Formato</h3>
                    <div className="flex items-center mb-2">
                      <Trophy className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>{tournament.format}</span>
                    </div>
                    <div className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Nivel: {tournament.level}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Premios</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {tournament.prizes.map((prize, index) => (
                        <li key={index} className="text-muted-foreground">
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="rules">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Reglas del torneo</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {tournament.rules.map((rule, index) => (
                        <li key={index} className="text-muted-foreground">
                          {rule}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-muted p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Información importante</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Los horarios pueden estar sujetos a cambios</li>
                        <li>Es necesario presentar DNI para participar</li>
                        <li>No se permiten cambios de pareja una vez iniciado el torneo</li>
                        <li>
                          La organización se reserva el derecho de modificar el formato según el número de inscritos
                        </li>
                      </ul>
                    </div>
                  </div>
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
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inscripción</CardTitle>
              <CardDescription>Completa tu inscripción al torneo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Precio por pareja</div>
                  <div className="text-2xl font-bold">{tournament.price}</div>
                </div>
                <div className="flex items-center text-sm">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Pago seguro con tarjeta o transferencia</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
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
              <p className="text-xs text-muted-foreground text-center">
                Al inscribirte aceptas las reglas del torneo y la política de cancelación
              </p>
            </CardFooter>
          </Card>

          {tournament.status === "Abierto" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Comparte este torneo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
                      <polyline points="2 6 12 13 22 6" />
                    </svg>
                    <span className="sr-only">Email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

