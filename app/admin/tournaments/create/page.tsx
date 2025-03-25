'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Calendar, Award, DollarSign, Users, MapPin } from 'lucide-react';

const NIVELES_PADEL = [
  'Principiante',
  'Intermedio',
  'Intermedio Alto',
  'Avanzado',
  'Competición'
];

export default function CreateTournament() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rules: '',
    prizes: '',
    date: '',
    minLevel: '',
    pricePerPair: '',
    totalPlaces: '',
    location: {
      name: '',
      address: '',
      city: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pricePerPair: Number(formData.pricePerPair),
          totalPlaces: Number(formData.totalPlaces),
          date: new Date(formData.date),
          createdBy: user?.id
        }),
      });

      if (!response.ok) throw new Error('Error al crear el torneo');

      toast.success('Torneo creado correctamente');
      router.push('/admin/tournaments');
    } catch (error) {
      toast.error('Error al crear el torneo');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h1>
          <p className="text-gray-400">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
            Crear Nuevo Torneo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre del Torneo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="minLevel" className="block text-sm font-medium text-gray-300 mb-2">
                  Nivel Mínimo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="minLevel"
                    value={formData.minLevel}
                    onChange={(e) => setFormData({ ...formData, minLevel: e.target.value })}
                    className="w-full pl-10 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    required
                  >
                    <option value="">Selecciona un nivel</option>
                    {NIVELES_PADEL.map((nivel) => (
                      <option key={nivel} value={nivel}>
                        {nivel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="pricePerPair" className="block text-sm font-medium text-gray-300 mb-2">
                  Precio por Pareja (€)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="pricePerPair"
                    value={formData.pricePerPair}
                    onChange={(e) => setFormData({ ...formData, pricePerPair: e.target.value })}
                    className="w-full pl-10 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="totalPlaces" className="block text-sm font-medium text-gray-300 mb-2">
                  Plazas Totales
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="totalPlaces"
                    value={formData.totalPlaces}
                    onChange={(e) => setFormData({ ...formData, totalPlaces: e.target.value })}
                    className="w-full pl-10 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    min="2"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="locationName" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de la Instalación
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="locationName"
                    value={formData.location.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, name: e.target.value }
                    })}
                    className="w-full pl-10 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white h-32"
                  required
                />
              </div>

              <div>
                <label htmlFor="rules" className="block text-sm font-medium text-gray-300 mb-2">
                  Reglas
                </label>
                <textarea
                  id="rules"
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white h-32"
                  required
                />
              </div>

              <div>
                <label htmlFor="prizes" className="block text-sm font-medium text-gray-300 mb-2">
                  Premios
                </label>
                <textarea
                  id="prizes"
                  value={formData.prizes}
                  onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white h-32"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Dirección
                </label>
                <textarea
                  id="address"
                  value={formData.location.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white h-20"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/tournaments')}
                className="px-6 py-2 text-gray-300 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Torneo'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
