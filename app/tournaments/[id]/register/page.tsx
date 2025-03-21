"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CreditCard, Calendar, Trophy, ChevronLeft, User, Users, Info, AlertCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { use } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para los torneos
const tournaments = [
  {
    id: "1",
    title: "Torneo Primavera",
    description: "Torneo de nivel intermedio con premios para los ganadores",
    date: "15 de Mayo, 2025",
    price: "€50 por pareja",
    level: "Intermedio",
  },
  {
    id: "2",
    title: "Copa Elite",
    description: "Torneo de alto nivel con los mejores jugadores de la academia",
    date: "2 de Junio, 2025",
    price: "€80 por pareja",
    level: "Avanzado",
  },
  {
    id: "3",
    title: "Torneo Amistoso",
    description: "Torneo para principiantes y jugadores que quieren mejorar su nivel",
    date: "20 de Mayo, 2025",
    price: "€30 por pareja",
    level: "Principiante",
  },
  {
    id: "4",
    title: "Campeonato Mensual",
    description: "Torneo mensual con diferentes categorías y niveles",
    date: "10 de Junio, 2025",
    price: "€60 por pareja",
    level: "Todos los niveles",
  },
]

export default function TournamentRegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const tournament = tournaments.find((t) => t.id === resolvedParams.id)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    level: "",
    experience: "",
    partnerName: "",
    partnerEmail: "",
    partnerPhone: "",
    partnerLevel: "",
    comments: "",
    equipment: "",
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes aceptar los términos y condiciones",
      })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Inscripción completada",
        description: "Te has inscrito correctamente al torneo",
      })
      router.push("/dashboard")
    }, 2000)
  }

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
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Link href={`/tournaments/${resolvedParams.id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver al Torneo
        </Link>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progreso de inscripción</span>
            <span className="text-sm font-medium">{currentStep}/3</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Inscripción al Torneo
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Completa el formulario para inscribirte al {tournament.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Step 1: Información Personal */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <User className="h-5 w-5 text-blue-600" />
                        Información Personal
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Tu nombre"
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellidos</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Tus apellidos"
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="tu@email.com"
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+34 600 000 000"
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Información del Jugador y Pareja */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Users className="h-5 w-5 text-blue-600" />
                        Información del Jugador y Pareja
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-4">Tu información</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="level">Nivel de Juego</Label>
                              <Select>
                                <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                  <SelectValue placeholder="Selecciona tu nivel" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Principiante</SelectItem>
                                  <SelectItem value="intermediate">Intermedio</SelectItem>
                                  <SelectItem value="advanced">Avanzado</SelectItem>
                                  <SelectItem value="professional">Profesional</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="experience">Años de Experiencia</Label>
                              <Input 
                                id="experience" 
                                type="number" 
                                min="0" 
                                placeholder="Número de años"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-4">Información de tu Pareja</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="partnerName">Nombre de la Pareja</Label>
                              <Input 
                                id="partnerName" 
                                placeholder="Nombre de tu pareja"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="partnerEmail">Email de la Pareja</Label>
                              <Input 
                                id="partnerEmail" 
                                type="email" 
                                placeholder="email@pareja.com"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="partnerPhone">Teléfono de la Pareja</Label>
                              <Input 
                                id="partnerPhone" 
                                type="tel" 
                                placeholder="+34 600 000 000"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="partnerLevel">Nivel de la Pareja</Label>
                              <Select>
                                <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                  <SelectValue placeholder="Nivel de tu pareja" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Principiante</SelectItem>
                                  <SelectItem value="intermediate">Intermedio</SelectItem>
                                  <SelectItem value="advanced">Avanzado</SelectItem>
                                  <SelectItem value="professional">Profesional</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Información Adicional y Términos */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Info className="h-5 w-5 text-blue-600" />
                        Información Adicional
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="comments">Comentarios o Requisitos Especiales</Label>
                          <Textarea 
                            id="comments" 
                            placeholder="Alergias, restricciones alimentarias, etc."
                            className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equipment">Equipamiento Necesario</Label>
                          <Select>
                            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="¿Necesitas alquilar palas?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no">No, traeré mis propias palas</SelectItem>
                              <SelectItem value="yes">Sí, necesito alquilar palas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="acceptTerms" 
                            className="mt-1"
                          />
                          <div className="space-y-1">
                            <Label htmlFor="acceptTerms">Acepto los términos y condiciones</Label>
                            <p className="text-sm text-gray-500">
                              He leído y acepto los términos y condiciones del torneo
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Procesando...
                            </>
                          ) : (
                            "Confirmar Inscripción"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resumen del Torneo */}
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Resumen del Torneo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900">{tournament.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(tournament.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Categoría</span>
                      <span className="font-medium">{tournament.level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nivel</span>
                      <span className="font-medium">{tournament.level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precio por pareja</span>
                      <span className="font-medium text-lg text-blue-600">{tournament.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información Importante */}
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Es necesario presentar DNI o documento identificativo válido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>La inscripción incluye seguro de accidentes deportivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Se proporcionará agua y fruta durante el torneo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Parking gratuito disponible en el recinto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Se recomienda llegar 30 minutos antes del inicio</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

