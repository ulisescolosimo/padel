import { NextResponse } from 'next/server'
import Tournament from '@/models/Tournament'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { ITournament } from '@/models/Tournament'

// Obtener todos los torneos
export async function GET() {
  try {
    await connectDB()
    
    // Primero obtenemos los torneos sin población
    const tournaments = await Tournament.find()
      .sort({ date: 1 })
      .lean()

    if (!tournaments || tournaments.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron torneos' },
        { status: 404 }
      )
    }

    // Luego poblamos los datos necesarios
    const populatedTournaments = await Promise.all(
      tournaments.map(async (tournament: Partial<ITournament>) => {
        const populatedTournament = await Tournament.findById(tournament._id)
          .populate('createdBy', 'name email')
          .lean()
        
        return populatedTournament
      })
    )

    return NextResponse.json(populatedTournaments)
  } catch (error) {
    console.error('Error al obtener torneos:', error)
    return NextResponse.json(
      { error: 'Error al obtener torneos', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}

// Crear nuevo torneo
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    
    if (!token || token.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    if (!token.sub) {
      return NextResponse.json(
        { error: 'ID de usuario no encontrado en el token' },
        { status: 400 }
      )
    }

    await connectDB()
    const data = await req.json()

    const tournament = await Tournament.create({
      ...data,
      createdBy: token.sub,
      status: 'draft'
    })

    return NextResponse.json(tournament, { status: 201 })
  } catch (error: any) {
    console.error('Error al crear torneo:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear el torneo' },
      { status: 500 }
    )
  }
} 