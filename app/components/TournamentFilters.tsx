'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from 'lucide-react'

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
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Búsqueda */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar torneos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 h-9"
          />
        </div>

        {/* Nivel */}
        <div className="w-full sm:w-[200px]">
          <Select value={minLevel} onValueChange={setMinLevel}>
            <SelectTrigger className="w-full bg-gray-900 border-gray-700 h-9">
              <SelectValue placeholder="Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="Iniciación">Iniciación</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
              <SelectItem value="Profesional">Profesional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fecha */}
        <div className="w-full sm:w-[200px]">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full bg-gray-900 border-gray-700 h-9">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fechas</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="tomorrow">Mañana</SelectItem>
              <SelectItem value="week">Próxima semana</SelectItem>
              <SelectItem value="month">Próximo mes</SelectItem>
              <SelectItem value="3months">Próximos 3 meses</SelectItem>
              <SelectItem value="6months">Próximos 6 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botón de reset */}
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-gray-700 hover:bg-gray-700 h-9 px-3"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
} 