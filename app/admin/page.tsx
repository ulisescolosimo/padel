"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Users, Trophy, Settings, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      toast.error('No tienes permisos para acceder a esta página');
      router.push('/');
    }
    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => router.push('/admin/users')}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Usuarios</h2>
            </div>
            <p className="mt-4 text-gray-400">
              Gestiona los usuarios de la plataforma
            </p>
          </div>

          <div
            onClick={() => router.push('/admin/tournaments')}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">tournaments</h2>
            </div>
            <p className="mt-4 text-gray-400">
              Administra los tournaments y sus participantes
            </p>
          </div>

          <div
            onClick={() => router.push('/admin/settings')}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Settings className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Configuración</h2>
            </div>
            <p className="mt-4 text-gray-400">
              Ajusta la configuración general del sistema
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

