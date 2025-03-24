import { NextResponse } from 'next/server'

export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }

  console.error('Error no manejado:', error)
  return NextResponse.json(
    { error: 'Error interno del servidor' },
    { status: 500 }
  )
}

export function successResponse(data: any, statusCode: number = 200) {
  return NextResponse.json(data, { status: statusCode })
}

export function validateRequiredFields(fields: Record<string, any>, requiredFields: string[]) {
  const missingFields = requiredFields.filter(field => !fields[field])
  
  if (missingFields.length > 0) {
    throw new ApiError(
      `Campos requeridos faltantes: ${missingFields.join(', ')}`,
      400
    )
  }
} 