"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/app/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card"
import { Badge } from "@/app/components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/tabs"
import { Calendar, MapPin, Trophy, Clock, AlertCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth"

// Datos de ejemplo para los tournaments
const usertournaments = [
  {
    id: 1,
    title: "Torneo Primavera",
    date: "15 de Mayo, 2025",
    location: "Pistas Centrales",
    status: "Inscrito",
    partner: "Carlos Rodríguez",
    category: "Intermedio",
    paymentStatus: "Pagado",
  },
  {
    id: 3,
    title: "Torneo Amistoso",
    date: "20 de Mayo, 2025",
    location: "Pistas Auxiliares",
    status: "Pendiente de pago",
    partner: "Ana Martínez",
    category: "Principiante",
    paymentStatus: "Pendiente",
  },
]

// Datos de ejemplo para tournaments pasados
const pasttournaments = [
  {
    id: 5,
    title: "Torneo de Invierno",
    date: "10 de Enero, 2025",
    location: "Pistas Cubiertas",
    status: "Finalizado",
    partner: "Carlos Rodríguez",
    category: "Intermedio",
    result: "Semifinalista",
  },
  {
    id: 6,
    title: "Copa Navidad",
    date: "20 de Diciembre, 2024",
    location: "Pistas Centrales",
    status: "Finalizado",
    partner: "Ana Martínez",
    category: "Principiante",
    result: "Campeón",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 20) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")
  }, [])

  return (
    <ProtectedRoute>
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {greeting}, {user?.name}
            </h1>
            <p className="text-muted-foreground mt-1">Bienvenido a tu panel de usuario</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/tournaments">
              <Button variant="outline">Ver tournaments</Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button>Mi perfil</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Mis tournaments</CardTitle>
              <CardDescription>Gestiona tus inscripciones a tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Activos</TabsTrigger>
                  <TabsTrigger value="past">Pasados</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  {usertournaments.length > 0 ? (
                    <div className="space-y-4">
                      {usertournaments.map((tournament) => (
                        <div
                          key={tournament.id}
                          className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{tournament.title}</h3>
                              <Badge
                                className="md:hidden"
                                variant={tournament.paymentStatus === "Pagado" ? "default" : "secondary"}
                              >
                                {tournament.paymentStatus}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {tournament.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                {tournament.location}
                              </div>
                              <div className="flex items-center">
                                <Trophy className="mr-2 h-4 w-4" />
                                Categoría: {tournament.category}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                Pareja: {tournament.partner}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between mt-4 md:mt-0 md:items-end">
                            <Badge
                              className="hidden md:inline-flex"
                              variant={tournament.paymentStatus === "Pagado" ? "default" : "secondary"}
                            >
                              {tournament.paymentStatus}
                            </Badge>
                            <div className="flex gap-2 mt-4 md:mt-auto">
                              <Link href={`/tournaments/${tournament.id}`}>
                                <Button variant="outline" size="sm">
                                  Ver detalles
                                </Button>
                              </Link>
                              {tournament.paymentStatus === "Pendiente" && <Button size="sm">Completar pago</Button>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No tienes tournaments activos</h3>
                      <p className="text-muted-foreground mt-1 mb-4">Inscríbete en un torneo para verlo aquí</p>
                      <Link href="/tournaments">
                        <Button>Ver tournaments disponibles</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="past">
                  {pasttournaments.length > 0 ? (
                    <div className="space-y-4">
                      {pasttournaments.map((tournament) => (
                        <div
                          key={tournament.id}
                          className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{tournament.title}</h3>
                              <Badge className="md:hidden">{tournament.result}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {tournament.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                {tournament.location}
                              </div>
                              <div className="flex items-center">
                                <Trophy className="mr-2 h-4 w-4" />
                                Categoría: {tournament.category}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                Pareja: {tournament.partner}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between mt-4 md:mt-0 md:items-end">
                            <Badge className="hidden md:inline-flex">{tournament.result}</Badge>
                            <div className="flex gap-2 mt-4 md:mt-auto">
                              <Link href={`/tournaments/${tournament.id}/results`}>
                                <Button variant="outline" size="sm">
                                  Ver resultados
                                </Button>
                              </Link>
                              <Link href={`/tournaments/${tournament.id}/certificate`}>
                                <Button size="sm">Certificado</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No tienes tournaments pasados</h3>
                      <p className="text-muted-foreground mt-1">
                        Aquí aparecerán los tournaments en los que has participado
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos eventos</CardTitle>
              <CardDescription>tournaments y eventos destacados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Torneo Primavera</h3>
                  <p className="text-sm text-muted-foreground mt-1">15 de Mayo, 2025</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      Inscrito
                    </Badge>
                    <Badge>Pagado</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Torneo Amistoso</h3>
                  <p className="text-sm text-muted-foreground mt-1">20 de Mayo, 2025</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      Inscrito
                    </Badge>
                    <Badge variant="secondary">Pendiente</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Campeonato Mensual</h3>
                  <p className="text-sm text-muted-foreground mt-1">10 de Junio, 2025</p>
                  <div className="mt-2">
                    <Link href="/tournaments/4">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

