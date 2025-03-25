import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { connectDB } from '@/lib/db';
import Tournament from '@/models/Tournament';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await connectDB();
    
    const tournaments = await Tournament.find({
      'participants.player': session.user.id
    })
    .populate('participants.player', 'name level')
    .sort({ date: -1 });

    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Error al obtener torneos del usuario:', error);
    return NextResponse.json(
      { error: 'Error al obtener torneos' },
      { status: 500 }
    );
  }
} 