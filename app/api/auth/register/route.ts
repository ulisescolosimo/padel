import { NextResponse } from 'next/server'
import User from '@/models/User'
import { connectDB } from '@/lib/db'

export async function POST(req: Request) {
  try {
    // Conectar a MongoDB
    await connectDB()

    // Obtener datos del request
    const data = await req.json()
    console.log('Datos recibidos:', data)

    // Crear usuario
    const user = await User.create(data)
    console.log('Usuario creado:', user)

    // Retornar respuesta exitosa
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error en registro:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 })
  }
} 