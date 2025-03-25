"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isAdmin = () => {
    return user?.role === "admin"
  }

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Guardar la ruta actual para redirigir después del login
        localStorage.setItem("redirectAfterLogin", pathname)
        router.push("/auth/login")
      } else if (requireAdmin && !isAdmin()) {
        router.push("/dashboard")
      }
    }
  }, [user, loading, requireAdmin, router, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Si no está cargando y hay un usuario (y es admin si se requiere), mostrar el contenido
  if (!loading && user && (!requireAdmin || isAdmin())) {
    return <>{children}</>
  }

  // No mostrar nada mientras se redirige
  return null
}

