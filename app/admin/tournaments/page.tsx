'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Trophy, Users, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

interface Tournament {
  _id: string;
  name: string;
  description: string;
  date: string;
  minLevel: string;
  pricePerPair: number;
  totalPlaces: number;
  status: string;
  participants: any[];
  location: {
    name: string;
    city: string;
  };
}

export default function Admintournaments() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [tournaments, settournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !isAdmin) {
      toast.error('No tienes permisos para acceder a esta página');
      router.push('/');
      return;
    }

    fetchtournaments();
  }, [user, isAdmin, router]);

  const fetchtournaments = async () => {
    try {
      const res = await fetch('/api/tournaments');
      if (!res.ok) throw new Error('Error al cargar los tournaments');
      const data = await res.json();
      settournaments(data);
    } catch (error) {
      toast.error('Error al cargar los tournaments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este torneo?')) return;

    try {
      const res = await fetch(`/api/tournaments/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar el torneo');

      toast.success('Torneo eliminado correctamente');
      fetchtournaments();
    } catch (error) {
      toast.error('Error al eliminar el torneo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gestión de tournaments</h1>
          <Link
            href="/admin/tournaments/create"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Torneo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">{tournament.name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  tournament.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  tournament.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                  tournament.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                  tournament.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {tournament.status === 'published' ? 'Publicado' :
                   tournament.status === 'draft' ? 'Borrador' :
                   tournament.status === 'in_progress' ? 'En Progreso' :
                   tournament.status === 'completed' ? 'Completado' :
                   'Cancelado'}
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(tournament.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{tournament.location.name}, {tournament.location.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Nivel mínimo: {tournament.minLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{tournament.participants.length}/{tournament.totalPlaces} participantes</span>
                </div>
                <div className="text-blue-400 font-medium">
                  {tournament.pricePerPair}€ por pareja
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  href={`/admin/tournaments/${tournament._id}/edit`}
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </Link>
                <button
                  onClick={() => handleDelete(tournament._id)}
                  className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 