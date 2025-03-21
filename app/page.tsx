import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Academia de Padel
              </h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl lg:text-2xl mx-auto">
                Participa en los mejores torneos de padel. Inscríbete, compite y disfruta.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tournaments">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                  Ver Torneos
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors duration-200">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Jugadores Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-gray-300">Torneos Mensuales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-gray-300">Pistas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8/5</div>
                <div className="text-sm text-gray-300">Valoración</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">¿Por qué elegirnos?</h2>
            <p className="text-gray-500 max-w-[600px] mx-auto">
              Descubre las ventajas de ser parte de nuestra academia de padel
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Torneos Exclusivos</h3>
              <p className="text-gray-500">
                Participa en torneos organizados por nuestra academia con diferentes niveles de dificultad.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Reserva Fácil</h3>
              <p className="text-gray-500">
                Proceso de inscripción sencillo y rápido para todos los torneos disponibles.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Comunidad Activa</h3>
              <p className="text-gray-500">Forma parte de una comunidad apasionada por el padel y mejora tu nivel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">¿Listo para competir?</h2>
            <p className="max-w-[600px] text-gray-200 md:text-xl">
              Regístrate ahora y comienza a participar en nuestros torneos de padel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                  Crear Cuenta
                </Button>
              </Link>
              <Link href="/tournaments">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors duration-200">
                  Ver Torneos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-300 mt-auto">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Academia de Padel</h3>
              <p className="text-sm text-gray-400">
                Tu lugar para aprender, competir y disfrutar del padel al máximo nivel.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tournaments" className="hover:text-white transition-colors">
                    Torneos
                  </Link>
                </li>
                <li>
                  <Link href="/courts" className="hover:text-white transition-colors">
                    Reservar Pista
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Horarios */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Horarios</h4>
              <ul className="space-y-2 text-sm">
                <li>Lunes - Viernes: 8:00 - 23:00</li>
                <li>Sábados: 9:00 - 22:00</li>
                <li>Domingos: 9:00 - 21:00</li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>Av. del Deporte 123</li>
                <li>28001 Madrid, España</li>
                <li>Tel: +34 91 123 45 67</li>
                <li>Email: info@academiadepadel.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 Academia de Padel. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

