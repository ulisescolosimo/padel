import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

const NIVELES_VALIDOS = ['Iniciación', 'Intermedio', 'Avanzado', 'Profesional'];

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    // Validar que el nivel sea válido si se proporciona
    if (data.level && !NIVELES_VALIDOS.includes(data.level)) {
      return NextResponse.json({ error: 'Nivel no válido' }, { status: 400 });
    }

    // Verificar si el perfil está completo (teléfono y nivel presentes y válidos)
    const isProfileComplete = Boolean(data.phone && data.level);

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { 
        ...data,
        isProfileComplete 
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Perfil actualizado correctamente',
      user: {
        ...updatedUser.toObject(),
        id: updatedUser._id,
        isProfileComplete
      }
    });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el perfil' },
      { status: 500 }
    );
  }
} 