import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl ">
              Academia de Padel
            </h1>
            <p className="max-w-[700px] text-gray-200 md:text-xl">
              Participa en los mejores torneos de padel. Inscríbete, compite y disfruta.
            </p>
            <div className="space-x-4">
              <Link href="/tournaments">
                <Button size="lg" variant="outline" className="bg-white text-black">
                  Ver Torneos
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="border-white text-black">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Torneos Exclusivos</h3>
              <p className="text-gray-500">
                Participa en torneos organizados por nuestra academia con diferentes niveles de dificultad.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Reserva Fácil</h3>
              <p className="text-gray-500">
                Proceso de inscripción sencillo y rápido para todos los torneos disponibles.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Comunidad Activa</h3>
              <p className="text-gray-500">Forma parte de una comunidad apasionada por el padel y mejora tu nivel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">¿Listo para competir?</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              Regístrate ahora y comienza a participar en nuestros torneos de padel.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Crear Cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-gray-200 mt-auto">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Academia de Padel</h3>
              <p className="text-sm text-gray-400">© 2025 Todos los derechos reservados</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="text-sm hover:underline">
                Sobre Nosotros
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contacto
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

