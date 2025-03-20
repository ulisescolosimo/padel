"use client"; // 🚀 Obligatorio para usar React Context en Next.js (app router)

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  phone?: string; // 📌 Opcional si no siempre está presente
  level?: string; // 📌 Se usa en el perfil, debe estar definido
  createdAt: string | Date; // 📌 Para manejar fechas correctamente
}


// Definir el tipo del contexto
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

// Crear el contexto con tipado correcto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      if (email === "admin@example.com" && password === "password") {
        setUser({
          id: "1",
          name: "Admin Usuario",
          email,
          role: "admin",
          avatar: "/placeholder.svg?height=128&width=128",
          phone: "666123456",
          level: "Avanzado",
          createdAt: "2023-01-15",
        });
        return true;
      } else if (email === "user@example.com" && password === "password") {
        setUser({
          id: "2",
          name: "Usuario Normal",
          email,
          role: "user",
          avatar: "/placeholder.svg?height=128&width=128",
          phone: "666789012",
          level: "Intermedio",
          createdAt: "2023-03-20",
        });
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acceder al contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
