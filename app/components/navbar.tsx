'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "../components/avatar"
import { Menu, X, Trophy, User, LogOut, ChevronDown, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isActive = (path: string) => pathname === path

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-gray-900"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8">
              <Image 
                src="/logo.png" 
                alt="Padel Academy Logo" 
                fill
                className="rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline group-hover:text-blue-400 transition-colors">
              Padel Academy
            </span>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              href="/" 
              className={cn(
                "text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group relative py-2",
                isActive("/") && "text-white"
              )}
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Inicio</span>
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
              )}
            </Link>
            
            <Link 
              href="/tournaments" 
              className={cn(
                "text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group relative py-2",
                isActive("/tournaments") && "text-white"
              )}
            >
              <Trophy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Torneos</span>
              {isActive("/tournaments") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 group">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 transition-all group-hover:ring-blue-400">
                        <AvatarImage src={user.image || ''} alt={user.name || ''} />
                        <AvatarFallback className="bg-blue-600">
                          {user.name?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 ml-2 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 mt-2">
                  <div className="px-2 py-1.5 text-sm text-gray-400">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-700/50 cursor-pointer">
                    <Link href="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-300 focus:text-white focus:bg-gray-700/50 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/api/auth/signin"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Botón Mobile Menu */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all hover:bg-gray-800"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 w-3/4 bg-gray-900 sm:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 px-4 pt-4 pb-6 space-y-1 overflow-y-auto">
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg transition-all",
                      isActive("/")
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Inicio</span>
                  </Link>

                  <Link
                    href="/tournaments"
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg transition-all",
                      isActive("/tournaments")
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Trophy className="h-5 w-5" />
                    <span className="font-medium">Torneos</span>
                  </Link>
                </div>

                {/* Footer del menú móvil */}
                <div className="border-t border-gray-800 px-4 py-4">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-2">
                        <Avatar className="h-10 w-10 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900">
                          <AvatarImage src={user.image || ''} alt={user.name || ''} />
                          <AvatarFallback className="bg-blue-600">
                            {user.name?.[0]?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/profile"
                          className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span className="text-sm">Mi Perfil</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setIsOpen(false)
                          }}
                          className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Salir</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/api/auth/signin"
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all hover:shadow-lg active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Iniciar Sesión</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
} 
