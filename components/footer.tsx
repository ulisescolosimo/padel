import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la Academia */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Academia de Padel</h3>
            <p className="text-gray-400">
              Tu destino para aprender y mejorar en el mundo del pádel. Clases, tournaments y mucho más.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>

              <li>
                <Link href="/tournaments" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Torneos
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Clases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Av. del Deporte 123, Madrid</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@academiadepadel.com</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Horario</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>Lunes - Viernes: 8:00 - 23:00</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>Sábados: 9:00 - 22:00</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>Domingos: 10:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Academia de Padel. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 