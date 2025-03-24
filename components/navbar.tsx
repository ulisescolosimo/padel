"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Home, Trophy, Calendar, Info, Phone, ChevronDown } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { signIn } from "next-auth/react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth();
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header className={`w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "shadow-lg" : ""
    }`}>
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                Academia de Padel
              </span>
            </Link>
          </div>

          {/* Menú de navegación */}
          <nav className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-200 relative ${
                isActive("/") 
                  ? "text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Inicio
              {isActive("/") && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
              )}
            </Link>
            <Link 
              href="/tournaments" 
              className={`text-sm font-medium transition-colors duration-200 relative ${
                isActive("/tournaments") 
                  ? "text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Torneos
              {isActive("/tournaments") && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
              )}
            </Link>

          </nav>

          {/* Botones de la derecha */}
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-400 hover:text-white">
                  {user.avatar && (
                    <Image
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                  )}
                  <span className="mr-2">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      {user.isProfileComplete ? 'Mi Perfil' : 'Completar Perfil'}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Panel de Admin
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Iniciar Sesión
                </Button>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive("/") 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Inicio</span>
            </Link>
            <Link
              href="/tournaments"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive("/tournaments") 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Torneos</span>
            </Link>
            <Link
              href="/courts"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive("/courts") 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" />
            </Link>

            <div className="flex flex-col gap-2 mt-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {user.isProfileComplete ? (
                    <Link
                      href="/profile"
                      className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
                    >
                      Editar Perfil
                    </Link>
                  ) : (
                    <Link
                      href="/profile"
                      className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
                    >
                      Completar Perfil
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Iniciar Sesión con Google
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

