"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, MoreHorizontal, Search, Trash, UserPlus } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para los usuarios
const mockUsers = [
  {
    id: "1",
    name: "Admin Usuario",
    email: "admin@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=128&width=128",
    createdAt: new Date("2023-01-15"),
    lastLogin: new Date("2025-05-01"),
    status: "active",
  },
  {
    id: "2",
    name: "Usuario Normal",
    email: "user@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=128&width=128",
    createdAt: new Date("2023-03-20"),
    lastLogin: new Date("2025-05-02"),
    status: "active",
  },
  {
    id: "3",
    name: "María García",
    email: "maria@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=128&width=128",
    createdAt: new Date("2023-04-05"),
    lastLogin: new Date("2025-04-28"),
    status: "active",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=128&width=128",
    createdAt: new Date("2023-05-12"),
    lastLogin: new Date("2025-04-30"),
    status: "active",
  },
  {
    id: "5",
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=128&width=128",
    createdAt: new Date("2023-06-18"),
    lastLogin: new Date("2025-04-25"),
    status: "inactive",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado correctamente",
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">Administra los usuarios de la plataforma</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Lista de todos los usuarios registrados en la plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuarios..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "outline"}>
                        {user.role === "admin" ? "Admin" : "Usuario"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.createdAt.toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {user.lastLogin.toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={user.status === "active" ? "bg-green-500" : ""}
                      >
                        {user.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/admin/users/${user.id}`} className="flex items-center w-full">
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

