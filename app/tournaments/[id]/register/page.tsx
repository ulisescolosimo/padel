"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/button"
import { Loader2, CreditCard, Calendar, Trophy } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { use } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/card"
import { Label } from "@/app/components/label"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/app/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/select"
import { Checkbox } from "@/app/components/checkbox"
import { useToast } from "@/app/components/use-toast"

// Datos de ejemplo para los tournaments
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const [formData, setFormData] = useState({
    partnerName: "",
    partnerEmail: "",
    partnerPhone: "",
    category: "Intermedio",
    paymentMethod: "card",
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsProcessingPayment(true)

    try {
      // Crear el pago en MercadoPago
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournamentId: resolvedParams.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el pago')
      }

      // Redirigir a MercadoPago
      window.location.href = data.initPoint
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al procesar el pago. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
      setIsProcessingPayment(false)
    }
  }

  if (!tournament) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16 text-center">
        <h1 className="text-3xl font-bold">Torneo no encontrado</h1>
        <p className="mt-4 text-muted-foreground">El torneo que buscas no existe o ha sido eliminado.</p>
        <Link href="/tournaments" className="mt-6 inline-block">
          <Button>Ver todos los tournaments</Button>
        </Link>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="w-full px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href={`/tournaments/${resolvedParams.id}`} className="text-sm text-blue-600 hover:underline flex items-center">
            ← Volver al torneo
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Inscripción al torneo</CardTitle>
                <CardDescription>Completa el formulario para inscribirte al torneo</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Información del torneo</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{tournament.title}</div>
                          <div className="text-sm text-muted-foreground">{tournament.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Fecha</div>
                          <div className="text-sm text-muted-foreground">{tournament.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tus datos</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nombre</Label>
                        <Input value={user?.name || ""} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user?.email || ""} disabled />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Datos de tu pareja</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="partnerName">Nombre completo</Label>
                        <Input
                          id="partnerName"
                          value={formData.partnerName}
                          onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partnerEmail">Email</Label>
                        <Input
                          id="partnerEmail"
                          type="email"
                          value={formData.partnerEmail}
                          onChange={(e) => setFormData({ ...formData, partnerEmail: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partnerPhone">Teléfono</Label>
                        <Input
                          id="partnerPhone"
                          value={formData.partnerPhone}
                          onChange={(e) => setFormData({ ...formData, partnerPhone: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Categoría y pago</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value:any) => setFormData({ ...formData, category: value })}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Selecciona categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Principiante">Principiante</SelectItem>
                            <SelectItem value="Intermedio">Intermedio</SelectItem>
                            <SelectItem value="Avanzado">Avanzado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Método de pago</Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value:any) => setFormData({ ...formData, paymentMethod: value })}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="paymentMethod">
                            <SelectValue placeholder="Selecciona método de pago" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Tarjeta de crédito</SelectItem>
                            <SelectItem value="transfer">Transferencia bancaria</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked:any) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      del torneo
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" disabled={isSubmitting} onClick={() => router.back()}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isProcessingPayment}>
                    {isSubmitting || isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isProcessingPayment ? "Procesando pago..." : "Procesando..."}
                      </>
                    ) : (
                      "Completar inscripción"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>Detalles de tu inscripción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Torneo</h3>
                  <p className="text-muted-foreground">{tournament.title}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Fecha</h3>
                  <p className="text-muted-foreground">{tournament.date}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Categoría</h3>
                  <p className="text-muted-foreground">{formData.category}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Precio por pareja</div>
                  <div className="text-2xl font-bold">{tournament.price}</div>
                </div>
                <div className="flex items-center text-sm">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    Pago seguro con{" "}
                    {formData.paymentMethod === "card"
                      ? "tarjeta"
                      : formData.paymentMethod === "transfer"
                        ? "transferencia"
                        : "PayPal"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

