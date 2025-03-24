import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        level: token.level
      }
    });
  } catch (error: any) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { error: error.message || 'Error al verificar autenticación' },
      { status: 500 }
    );
  }
} 