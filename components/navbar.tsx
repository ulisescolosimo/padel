"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/button"
import { Menu, X, Home, Trophy, ChevronDown } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { signIn } from "next-auth/react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Throttle scroll event for better performance
    let timeoutId: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll()
          clearTimeout(timeoutId!)
          timeoutId = null
        }, 100)
      }
    }

    window.addEventListener("scroll", throttledScroll)
    return () => {
      window.removeEventListener("scroll", throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: "/", label: "Inicio", icon: <Home className="h-5 w-5" /> },
    { href: "/tournaments", label: "Torneos", icon: <Trophy className="h-5 w-5" /> },
  ]

  return (
    <header
      className={`w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      aria-label="Navegación principal"
    >
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Academia de Padel - Inicio">
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                Academia de Padel
              </span>
            </Link>
          </div>

          {/* Menú de navegación desktop */}
          <nav className="hidden md:flex gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  isActive(link.href) ? "text-white" : "text-gray-300 hover:text-white"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Botones de la derecha */}
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                {/* Desktop user menu */}
                <div className="relative group hidden md:block">
                  <button
                    className="flex items-center text-gray-400 hover:text-white"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                  >
                    {user.image && (
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                    )}
                    <span className="mr-2">{user.name}</span>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        role="menuitem"
                      >
                        {user.isProfileComplete ? "Mi Perfil" : "Completar Perfil"}
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          role="menuitem"
                        >
                          Panel de Admin
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        role="menuitem"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Desktop login button */}
                <div className="hidden md:block">
                  <Button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Image src="/google.svg" alt="" width={20} height={20} aria-hidden="true" />
                    <span>Iniciar Sesión</span>
                  </Button>
                </div>
              </>
            )}
            {/* Mobile menu button - always visible */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 py-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
          <nav className="flex flex-col h-full" aria-label="Menú móvil">
            {/* Enlaces principales */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(link.href) ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Separador */}
            <div className="my-4 border-t border-gray-800" />

            {/* Información del usuario y acciones */}
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt=""
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4">
                  <Link
                    href="/profile"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user.isProfileComplete ? "Editar Perfil" : "Completar Perfil"}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4">
                <Button
                  onClick={() => {
                    signIn("google", { callbackUrl: "/" });
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <Image src="/google.svg" alt="" width={24} height={24} aria-hidden="true" />
                  <span className="font-medium">Iniciar Sesión</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

