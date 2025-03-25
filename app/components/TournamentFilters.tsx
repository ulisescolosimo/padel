'use client'

import { useState, useEffect } from 'react'
import { format, addDays, addMonths } from "date-fns"
import { Input } from "../components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Button } from "../components/button"
import { Search, X, SlidersHorizontal } from 'lucide-react'

interface TournamentFiltersProps {
  onFilterChange: (filters: {
    search: string
    minLevel: string
    dateRange: string
  }) => void
}

export default function TournamentFilters({ onFilterChange }: TournamentFiltersProps) {
  const [search, setSearch] = useState('')
  const [minLevel, setMinLevel] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [isOpen, setIsOpen] = useState(false)

  // Actualizar filtros automáticamente cuando cambien los valores
  useEffect(() => {
    onFilterChange({
      search,
      minLevel: minLevel === 'all' ? '' : minLevel,
      dateRange: dateRange === 'all' ? '' : dateRange
    })
  }, [search, minLevel, dateRange])

  const handleReset = () => {
    setSearch('')
    setMinLevel('all')
    setDateRange('all')
  }

  return (
    <div className="bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/75 rounded-lg shadow-lg transition-all duration-200 my-5">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full p-4 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
      >
        <span className="font-medium">Filtros</span>
        <SlidersHorizontal className="w-5 h-5" />
      </button>

      {/* Filters Content */}
      <div className={`${isOpen ? 'max-h-[500px] border-t border-gray-700' : 'max-h-0 md:max-h-none'} md:border-none overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="p-4 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar torneos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 h-12 md:h-10 w-full text-base md:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-none md:flex md:gap-4 gap-4 mt-4 md:mt-0">
              {/* Nivel */}
              <div className="w-full md:w-[200px]">
                <Select value={minLevel} onValueChange={setMinLevel}>
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700 h-12 md:h-10 text-base md:text-sm rounded-lg hover:bg-gray-800 transition-colors">
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all" className="focus:bg-gray-800">Todos los niveles</SelectItem>
                    <SelectItem value="Iniciación" className="focus:bg-gray-800">Iniciación</SelectItem>
                    <SelectItem value="Intermedio" className="focus:bg-gray-800">Intermedio</SelectItem>
                    <SelectItem value="Avanzado" className="focus:bg-gray-800">Avanzado</SelectItem>
                    <SelectItem value="Profesional" className="focus:bg-gray-800">Profesional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha */}
              <div className="w-full md:w-[200px]">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700 h-12 md:h-10 text-base md:text-sm rounded-lg hover:bg-gray-800 transition-colors">
                    <SelectValue placeholder="Fecha" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all" className="focus:bg-gray-800">Todas las fechas</SelectItem>
                    <SelectItem value="today" className="focus:bg-gray-800">Hoy</SelectItem>
                    <SelectItem value="tomorrow" className="focus:bg-gray-800">Mañana</SelectItem>
                    <SelectItem value="week" className="focus:bg-gray-800">Próxima semana</SelectItem>
                    <SelectItem value="month" className="focus:bg-gray-800">Próximo mes</SelectItem>
                    <SelectItem value="3months" className="focus:bg-gray-800">Próximos 3 meses</SelectItem>
                    <SelectItem value="6months" className="focus:bg-gray-800">Próximos 6 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              {(search || minLevel !== 'all' || dateRange !== 'all') && (
                <div className="md:ml-2">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full md:w-auto border-gray-700 hover:bg-gray-700 h-12 md:h-10 text-base md:text-sm rounded-lg transition-all duration-200 group"
                  >
                    <X className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="md:hidden">Limpiar filtros</span>
                    <span className="hidden md:inline">Limpiar</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
