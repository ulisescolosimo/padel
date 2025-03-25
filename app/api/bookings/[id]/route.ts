import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Booking from '@/models/Booking'
import { ApiError, handleApiError } from '@/lib/api'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/auth'

// Obtener una reserva específica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      throw new ApiError('No autorizado', 401)
    }

    await connectDB()
    const booking = await Booking.findOne({
      _id: params.id,
      userId: session.user.id
    })
    
    if (!booking) {
      throw new ApiError('Reserva no encontrada', 404)
    }

    return NextResponse.json(booking)
  } catch (error) {
    return handleApiError(error)
  }
}

// Actualizar una reserva
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      throw new ApiError('No autorizado', 401)
    }

    const body = await request.json()
    await connectDB()
    
    const booking = await Booking.findOne({
      _id: params.id,
      userId: session.user.id
    })

    if (!booking) {
      throw new ApiError('Reserva no encontrada', 404)
    }

    // Verificar si la reserva puede ser modificada
    if (!booking.canBeCancelled()) {
      throw new ApiError('La reserva no puede ser modificada', 400)
    }

    // Si se está cancelando la reserva
    if (body.status === 'Cancelada') {
      booking.status = 'Cancelada'
      await booking.save()
      return NextResponse.json({ message: 'Reserva cancelada exitosamente' })
    }

    // Para otras actualizaciones, verificar disponibilidad
    if (body.court || body.date || body.time) {
      const existingBooking = await Booking.findOne({
        _id: { $ne: params.id },
        court: body.court || booking.court,
        date: body.date || booking.date,
        time: body.time || booking.time,
        status: { $in: ['Pendiente', 'Confirmada'] }
      })

      if (existingBooking) {
        throw new ApiError('La pista ya está reservada para ese horario', 400)
      }
    }

    Object.assign(booking, body)
    await booking.save()

    return NextResponse.json(booking)
  } catch (error) {
    return handleApiError(error)
  }
}

// Eliminar una reserva
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      throw new ApiError('No autorizado', 401)
    }

    await connectDB()
    const booking = await Booking.findOne({
      _id: params.id,
      userId: session.user.id
    })

    if (!booking) {
      throw new ApiError('Reserva no encontrada', 404)
    }

    if (!booking.canBeCancelled()) {
      throw new ApiError('La reserva no puede ser eliminada', 400)
    }

    await booking.deleteOne()
    return NextResponse.json({ message: 'Reserva eliminada exitosamente' })
  } catch (error) {
    return handleApiError(error)
  }
} 