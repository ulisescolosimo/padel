import { NextResponse } from 'next/server'
import Tournament from '@/models/Tournament'
import { ApiError, handleApiError } from '@/lib/api'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'

// Obtener un torneo específico
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await connectDB()
    
    const tournament = await Tournament.findById(id)
      .populate('participants.player', 'name email level')
      .populate('createdBy', 'name email')

    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(tournament)
  } catch (error) {
    console.error('Error al obtener el torneo:', error)
    return NextResponse.json(
      { error: 'Error al obtener el torneo' },
      { status: 500 }
    )
  }
}

// Actualizar un torneo
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    await connectDB()
    
    const tournament = await Tournament.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!tournament) {
      throw new ApiError('Torneo no encontrado', 404)
    }

    return NextResponse.json(tournament)
  } catch (error) {
    return handleApiError(error)
  }
}

// Eliminar un torneo
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const token = await getToken({ req: request as NextRequest })
    
    if (!token || token.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const tournament = await Tournament.findById(id)
    
    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneo no encontrado' },
        { status: 404 }
      )
    }

    // Solo permitir eliminar tournaments que no tengan participantes
    if (tournament.participants.length > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar un torneo con participantes' },
        { status: 400 }
      )
    }

    await tournament.deleteOne()

    return NextResponse.json({ message: 'Torneo eliminado correctamente' })
  } catch (error: any) {
    console.error('Error al eliminar torneo:', error)
    return NextResponse.json(
      { error: error.message || 'Error al eliminar el torneo' },
      { status: 500 }
    )
  }
} 