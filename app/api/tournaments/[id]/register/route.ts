import { NextResponse } from 'next/server';
import Tournament from '@/models/Tournament';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import mongoose from 'mongoose';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para registrarte' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const { id } = await context.params;
    const tournament = await Tournament.findById(id)
      .populate('participants.player', 'name email level');

    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneo no encontrado' },
        { status: 404 }
      );
    }

    // Verificar si el usuario ya está registrado
    const isRegistered = tournament.participants.some(
      (participant: { player: mongoose.Types.ObjectId }) => participant.player.toString() === session.user.id
    );

    if (isRegistered) {
      return NextResponse.json(
        { error: 'Ya estás registrado en este torneo' },
        { status: 400 }
      );
    }

    // Verificar si hay plazas disponibles
    if (tournament.participants.length >= tournament.totalPlaces) {
      return NextResponse.json(
        { error: 'No hay plazas disponibles en este torneo' },
        { status: 400 }
      );
    }

    // Crear el nuevo participante con la estructura correcta
    const newParticipant = {
      player: session.user.id,
      registrationDate: new Date(),
      paymentStatus: 'pending'
    };

    // Agregar al usuario como participante
    tournament.participants.push(newParticipant);

    // Guardar el torneo
    const savedTournament = await tournament.save();

    return NextResponse.json(
      { message: 'Registro exitoso', tournament: savedTournament },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al registrar en el torneo:', error);
    return NextResponse.json(
      { error: 'Error al registrar en el torneo', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 