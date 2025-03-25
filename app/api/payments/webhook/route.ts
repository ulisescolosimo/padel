import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Tournament from '@/models/Tournament';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verificar que es una notificación de pago
    if (body.type !== 'payment') {
      return NextResponse.json({ message: 'Not a payment notification' });
    }

    const { data } = body;
    
    // Obtener el ID del pago
    const paymentId = data.id;
    
    // Obtener los detalles del pago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await response.json();

    // Obtener la referencia externa (tournamentId-userId)
    const [tournamentId, userId] = payment.external_reference.split('-');

    await connectDB();

    // Actualizar el estado del pago en el torneo
    await Tournament.findOneAndUpdate(
      {
        _id: tournamentId,
        'participants.player': userId,
      },
      {
        $set: {
          'participants.$.paymentStatus': payment.status,
          'participants.$.paymentId': paymentId,
          'participants.$.paymentDate': new Date(),
        },
      }
    );

    return NextResponse.json({ message: 'Payment processed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 