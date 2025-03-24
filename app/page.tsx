'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  Star,
  Award,
  Clock,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative flex w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Academia de Padel
              </h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl lg:text-2xl mx-auto">
                Participa en los mejores tournaments de padel. Inscríbete, compite y
                disfruta.
              </p>
            </div>
            <Link href="/tournaments">
                <Button
                  size="lg"
                  className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Ver tournaments
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">500+</div>
              <div className="text-sm text-gray-400">Jugadores Activos</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">tournaments Organizados</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">1000+</div>
              <div className="text-sm text-gray-400">Partidos Jugados</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">4.8/5</div>
              <div className="text-sm text-gray-400">Valoración Media</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-12 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre las ventajas de ser parte de nuestra academia de padel
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  tournaments Exclusivos
                </h3>
              </div>
              <p className="text-gray-400">
                Participa en tournaments organizados por nuestra academia con
                diferentes niveles de dificultad.
              </p>
            </div>
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Reserva Fácil
                </h3>
              </div>
              <p className="text-gray-400">
                Proceso de inscripción sencillo y rápido para todos los tournaments
                disponibles.
              </p>
            </div>
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Comunidad Activa
                </h3>
              </div>
              <p className="text-gray-400">
                Forma parte de una comunidad apasionada por el padel y mejora tu
                nivel.
              </p>
            </div>
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Star className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Profesores Expertos
                </h3>
              </div>
              <p className="text-gray-400">
                Aprende de los mejores profesionales con años de experiencia en
                el mundo del padel.
              </p>
            </div>
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Premios y Reconocimientos
                </h3>
              </div>
              <p className="text-gray-400">
                Participa en tournaments con premios y obtén reconocimientos por tu
                desempeño.
              </p>
            </div>
            <div className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Horarios Flexibles
                </h3>
              </div>
              <p className="text-gray-400">
                Accede a las pistas en horarios adaptados a tu disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl lg:text-5xl">
              ¿Listo para competir?
            </h2>
            <p className="max-w-[600px] text-gray-200 md:text-xl">
              Regístrate ahora y comienza a participar en nuestros tournaments de
              padel.
            </p>
            <Link href="#">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                Crear Cuenta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
