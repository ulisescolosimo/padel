import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Tournament from '@/models/Tournament';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verificar que sea una notificación de pago
    if (body.type !== 'payment') {
      return NextResponse.json({ message: 'Not a payment notification' });
    }

    const paymentId = body.data.id;
    
    // Obtener detalles del pago de MercadoPago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await response.json();

    // Verificar que el pago esté aprobado
    if (payment.status !== 'approved') {
      return NextResponse.json({ message: 'Payment not approved' });
    }

    // Obtener tournamentId y userId del external_reference
    const [tournamentId, userId] = payment.external_reference.split('-');

    await connectDB();

    // Registrar al participante en el torneo
    const tournament = await Tournament.findOneAndUpdate(
      { _id: tournamentId },
      {
        $push: {
          participants: {
            userId,
            status: 'confirmed',
            paymentId,
            paymentStatus: 'approved',
            registeredAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneo no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
} 