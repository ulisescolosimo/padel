"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/app/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card"
import { Badge } from "@/app/components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/tabs"
import { Calendar, Clock, MapPin, Users, AlertCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useToast } from "@/app/components/use-toast"

// Datos de ejemplo para las reservas
const activeBookings = [
  {
    id: 1,
    court: "Pista 1",
    date: "15 de Mayo, 2025",
    time: "18:00 - 19:30",
    players: ["Usuario", "Carlos Rodríguez"],
    status: "Confirmada",
    price: "€25",
  },
  {
    id: 2,
    court: "Pista 3",
    date: "20 de Mayo, 2025",
    time: "20:00 - 21:30",
    players: ["Usuario", "Ana Martínez", "Juan López", "María García"],
    status: "Pendiente",
    price: "€25",
  },
]

const pastBookings = [
  {
    id: 3,
    court: "Pista 2",
    date: "5 de Mayo, 2025",
    time: "17:00 - 18:30",
    players: ["Usuario", "Carlos Rodríguez"],
    status: "Completada",
    price: "€25",
  },
  {
    id: 4,
    court: "Pista 4",
    date: "1 de Mayo, 2025",
    time: "19:00 - 20:30",
    players: ["Usuario", "Ana Martínez"],
    status: "Completada",
    price: "€25",
  },
]

export default function BookingsPage() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState(activeBookings)

  const handleCancelBooking = (id: number) => {
    // Simulación de cancelación de reserva
    setBookings(bookings.filter((booking) => booking.id !== id))

    toast({
      title: "Reserva cancelada",
      description: "Tu reserva ha sido cancelada correctamente",
    })
  }

  return (
    <ProtectedRoute>
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis Reservas</h1>
            <p className="text-muted-foreground mt-1">Gestiona tus reservas de pistas</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/courts">
              <Button>Nueva reserva</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reservas de pistas</CardTitle>
            <CardDescription>Visualiza y gestiona tus reservas</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="past">Pasadas</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{booking.court}</h3>
                            <Badge
                              className="md:hidden"
                              variant={booking.status === "Confirmada" ? "default" : "secondary"}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              Academia de Padel
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              {booking.players.join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between mt-4 md:mt-0 md:items-end">
                          <div className="flex flex-col items-end">
                            <Badge
                              className="hidden md:inline-flex mb-2"
                              variant={booking.status === "Confirmada" ? "default" : "secondary"}
                            >
                              {booking.status}
                            </Badge>
                            <span className="font-medium">{booking.price}</span>
                          </div>
                          <div className="flex gap-2 mt-4 md:mt-auto">
                            <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                              Cancelar
                            </Button>
                            <Link href={`/dashboard/bookings/${booking.id}`}>
                              <Button size="sm">Detalles</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No tienes reservas activas</h3>
                    <p className="text-muted-foreground mt-1 mb-4">Realiza una reserva para verla aquí</p>
                    <Link href="/#">
                      <Button>Reservar pista</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past">
                {pastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{booking.court}</h3>
                            <Badge className="md:hidden">{booking.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              Academia de Padel
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              {booking.players.join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between mt-4 md:mt-0 md:items-end">
                          <div className="flex flex-col items-end">
                            <Badge className="hidden md:inline-flex mb-2">{booking.status}</Badge>
                            <span className="font-medium">{booking.price}</span>
                          </div>
                          <div className="flex gap-2 mt-4 md:mt-auto">
                            <Link href={`/dashboard/bookings/${booking.id}`}>
                              <Button variant="outline" size="sm">
                                Detalles
                              </Button>
                            </Link>
                            <Button size="sm">Reservar similar</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No tienes reservas pasadas</h3>
                    <p className="text-muted-foreground mt-1">Aquí aparecerán tus reservas completadas</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

