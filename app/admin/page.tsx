"use client"

import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Calendar, DollarSign, TrendingUp, Activity } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground mt-1">Gestiona todos los aspectos de la academia</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Torneos Activos</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Semanales</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">+8% desde la semana pasada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€4,325</div>
              <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="tournaments">Torneos</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                  <CardDescription>Resumen de la actividad en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Nuevo torneo creado</p>
                        <p className="text-xs text-muted-foreground">Torneo Primavera - 15 de Mayo, 2025</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Hace 2 horas</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">5 nuevos usuarios registrados</p>
                        <p className="text-xs text-muted-foreground">Total de usuarios: 245</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Hoy</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">12 nuevas reservas</p>
                        <p className="text-xs text-muted-foreground">Para la próxima semana</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Ayer</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Ingresos semanales: €1,245</p>
                        <p className="text-xs text-muted-foreground">+8% respecto a la semana anterior</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Esta semana</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                  <CardDescription>Métricas clave de la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Tasa de ocupación de pistas</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">78%</span>
                        <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Inscripciones a torneos</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">45</span>
                        <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Nuevos usuarios (mes)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">28</span>
                        <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Tasa de conversión</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">12.5%</span>
                        <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tournaments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Torneos</CardTitle>
                  <CardDescription>Administra los torneos de la academia</CardDescription>
                </div>
                <Link href="/admin/tournaments">
                  <Button>Ver todos</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Torneo Primavera</CardTitle>
                        <CardDescription>15 de Mayo, 2025</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inscritos:</span>
                          <span>8/16</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Copa Elite</CardTitle>
                        <CardDescription>2 de Junio, 2025</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inscritos:</span>
                          <span>4/8</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Torneo Amistoso</CardTitle>
                        <CardDescription>20 de Mayo, 2025</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inscritos:</span>
                          <span>12/24</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Campeonato Mensual</CardTitle>
                        <CardDescription>10 de Junio, 2025</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inscritos:</span>
                          <span>0/32</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/admin/tournaments/new">
                      <Button>Crear nuevo torneo</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                  <CardDescription>Administra los usuarios de la plataforma</CardDescription>
                </div>
                <Link href="/admin/users">
                  <Button>Ver todos</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium">
                      <div>Usuario</div>
                      <div>Email</div>
                      <div>Rol</div>
                      <div>Fecha de registro</div>
                      <div className="text-right">Acciones</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-5 items-center p-4">
                        <div className="font-medium">Admin Usuario</div>
                        <div className="text-muted-foreground">admin@example.com</div>
                        <div>
                          <Badge>Admin</Badge>
                        </div>
                        <div className="text-muted-foreground">15 Ene, 2023</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center p-4">
                        <div className="font-medium">Usuario Normal</div>
                        <div className="text-muted-foreground">user@example.com</div>
                        <div>
                          <Badge variant="outline">Usuario</Badge>
                        </div>
                        <div className="text-muted-foreground">20 Mar, 2023</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center p-4">
                        <div className="font-medium">María García</div>
                        <div className="text-muted-foreground">maria@example.com</div>
                        <div>
                          <Badge variant="outline">Usuario</Badge>
                        </div>
                        <div className="text-muted-foreground">5 Abr, 2023</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Reservas</CardTitle>
                  <CardDescription>Administra las reservas de pistas</CardDescription>
                </div>
                <Link href="/admin/bookings">
                  <Button>Ver todas</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 font-medium">
                      <div>Pista</div>
                      <div>Fecha</div>
                      <div>Horario</div>
                      <div>Usuario</div>
                      <div>Estado</div>
                      <div className="text-right">Acciones</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-6 items-center p-4">
                        <div className="font-medium">Pista 1</div>
                        <div className="text-muted-foreground">15 May, 2025</div>
                        <div className="text-muted-foreground">18:00 - 19:30</div>
                        <div className="text-muted-foreground">Usuario Normal</div>
                        <div>
                          <Badge>Confirmada</Badge>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Detalles
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 items-center p-4">
                        <div className="font-medium">Pista 3</div>
                        <div className="text-muted-foreground">20 May, 2025</div>
                        <div className="text-muted-foreground">20:00 - 21:30</div>
                        <div className="text-muted-foreground">Usuario Normal</div>
                        <div>
                          <Badge variant="secondary">Pendiente</Badge>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Detalles
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 items-center p-4">
                        <div className="font-medium">Pista 2</div>
                        <div className="text-muted-foreground">18 May, 2025</div>
                        <div className="text-muted-foreground">17:00 - 18:30</div>
                        <div className="text-muted-foreground">María García</div>
                        <div>
                          <Badge>Confirmada</Badge>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Detalles
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

