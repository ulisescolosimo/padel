import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { connectDB } from '@/lib/db';
import Tournament from '@/models/Tournament';

// Inicializar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

// Función para obtener la URL base según el entorno
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    // En desarrollo, usar la URL de ngrok si está disponible
    return process.env.NEXT_PUBLIC_NGROK_URL || 'http://localhost:3000';
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'https://padel2025.netlify.app';
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { tournamentId } = await request.json();
    
    if (!tournamentId) {
      return NextResponse.json(
        { error: 'ID del torneo requerido' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Buscar el torneo
    const tournament = await Tournament.findById(tournamentId);
    
    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneo no encontrado' },
        { status: 404 }
      );
    }

    // Verificar si el usuario ya está registrado
    const isAlreadyRegistered = tournament.participants.some(
      (p: any) => p.userId.toString() === session.user.id
    );

    if (isAlreadyRegistered) {
      return NextResponse.json(
        { error: 'Ya estás registrado en este torneo' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();

    // Crear preferencia de pago
    const preference = {
      items: [
        {
          id: tournamentId,
          title: `Inscripción a ${tournament.title}`,
          unit_price: Number(tournament.price),
          quantity: 1,
          currency_id: "EUR",
          description: `Inscripción al torneo ${tournament.title} - ${tournament.level}`,
        },
      ],
      payer: {
        email: session.user.email || "",
        name: session.user.name || "",
      },
      back_urls: {
        success: `${baseUrl}/tournaments/${tournamentId}/success`,
        failure: `${baseUrl}/tournaments/${tournamentId}/failure`,
        pending: `${baseUrl}/tournaments/${tournamentId}/pending`,
      },
      auto_return: "approved",
      external_reference: `${tournamentId}-${session.user.id}`,
      notification_url: `${baseUrl}/api/payments/webhook`,
    };

    const preferenceClient = new Preference(client);
    const response = await preferenceClient.create({ body: preference });

    return NextResponse.json({
      id: response.id,
      initPoint: response.init_point,
    });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    return NextResponse.json(
      { error: 'Error al crear el pago' },
      { status: 500 }
    );
  }
} 