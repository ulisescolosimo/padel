import { NextResponse } from 'next/server'
import Booking from '@/models/Booking'
import { connectDB } from '@/lib/db'

// Obtener reservas del usuario
export async function GET(req: Request) {
  try {
    await connectDB()
    const bookings = await Booking.find().populate('user', 'name email')
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 })
  }
}

// Crear nueva reserva
export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()
    const booking = await Booking.create(data)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear reserva' }, { status: 500 })
  }
} 