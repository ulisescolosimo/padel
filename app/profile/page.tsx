'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { User, Mail, Phone, Award, Camera, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const NIVELES_PADEL = [
  'Iniciación',
  'Intermedio',
  'Avanzado',
  'Profesional'
];

export default function ProfilePage() {
  const { user, update: updateSession } = useAuth();
  console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userTournaments, setUserTournaments] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        level: user.level || 'Iniciación',
        image: user.image || '/default-avatar.png'
      });
      
      // Cargar torneos del usuario
      fetchUserTournaments();
    }
  }, [user]);

  const fetchUserTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments/user');
      if (response.ok) {
        const data = await response.json();
        setUserTournaments(data);
      }
    } catch (error) {
      console.error('Error al cargar torneos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      const updatedUser = await response.json();
      
      // Actualizar la sesión del usuario
      await updateSession(updatedUser);
      
      toast.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string | Date | undefined | null) => {
    if (!date) return 'No especificado';
    try {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'No especificado';
    }
  };

  const getFieldValue = (value: string | undefined | null) => {
    return value || 'No especificado';
  };

  // Separar torneos activos y pasados
  const activeTournaments = userTournaments.filter(t => 
    ['published', 'in_progress'].includes(t.status)
  );
  
  const pastTournaments = userTournaments.filter(t => 
    ['completed', 'cancelled'].includes(t.status)
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header del perfil */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-t-2xl shadow-xl p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700/50 group">
              <Image
                src={user?.image || '/default-avatar.png'}
                alt={user?.name || 'Usuario'}
                fill
                sizes="(max-width: 768px) 128px, 128px"
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {getFieldValue(user.name)}
              </h1>
              <p className="text-gray-400 mt-2">{getFieldValue(user.email)}</p>
              <div className="mt-4 flex justify-center md:justify-start gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-gray-800/50 backdrop-blur-lg shadow-xl p-6 border border-gray-700 border-t-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">12</div>
              <div className="text-sm text-gray-400">tournaments Jugados</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">3</div>
              <div className="text-sm text-gray-400">tournaments Ganados</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">2</div>
              <div className="text-sm text-gray-400">tournaments Activos</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">25%</div>
              <div className="text-sm text-gray-400">Tasa de Victoria</div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-b-2xl shadow-xl p-8 border border-gray-700 border-t-0">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Nombre completo
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Teléfono
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-300">
                    Nivel de Pádel
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white"
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
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Guardando...
                    </div>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información del perfil */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                      Información Personal
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Nombre</p>
                          <p className="font-medium">{getFieldValue(user.name)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium">{getFieldValue(user.email)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Teléfono</p>
                          <p className="font-medium">{getFieldValue(user.phone)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                      Información de Pádel
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Award className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Nivel</p>
                          <p className="font-medium">{getFieldValue(user.level)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <CheckCircle2 className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Miembro desde</p>
                          <p className="font-medium">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Torneos */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Torneos Activos */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Torneos Activos</h2>
                    {activeTournaments.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeTournaments.map((tournament) => (
                          <div key={tournament._id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white">{tournament.name}</h4>
                                <p className="text-sm text-gray-400">Fecha: {formatDate(tournament.date)}</p>
                                <p className="text-sm text-gray-400">Nivel: {tournament.minimumLevel}</p>
                                <p className="text-sm text-gray-400">Precio: {tournament.pricePerPair}€</p>
                              </div>
                              <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                                Activo
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-900/50 rounded-lg p-6 text-center">
                        <p className="text-gray-400">No estás participando en ningún torneo activo actualmente.</p>
                      </div>
                    )}
                  </div>

                  {/* Torneos Pasados */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Torneos Pasados</h2>
                    {pastTournaments.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pastTournaments.map((tournament) => (
                          <div key={tournament._id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white">{tournament.name}</h4>
                                <p className="text-sm text-gray-400">Fecha: {formatDate(tournament.date)}</p>
                                <p className="text-sm text-gray-400">Nivel: {tournament.minimumLevel}</p>
                              </div>
                              <span className="px-3 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
                                Completado
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-900/50 rounded-lg p-6 text-center">
                        <p className="text-gray-400">No has participado en ningún torneo anteriormente.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 