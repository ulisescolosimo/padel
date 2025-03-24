import mongoose from 'mongoose'

export interface IBooking extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  court: string
  date: Date
  time: string
  players: string[]
  status: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada'
  price: string
  createdAt: Date
  updatedAt: Date
}

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es requerido'],
  },
  court: {
    type: String,
    required: [true, 'La pista es requerida'],
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida'],
  },
  time: {
    type: String,
    required: [true, 'El horario es requerido'],
  },
  players: [{
    type: String,
    required: [true, 'Los jugadores son requeridos'],
  }],
  status: {
    type: String,
    required: [true, 'El estado es requerido'],
    enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'],
    default: 'Pendiente',
  },
  price: {
    type: String,
    required: [true, 'El precio es requerido'],
  },
}, {
  timestamps: true,
})

// Índices para mejorar el rendimiento de las consultas
bookingSchema.index({ userId: 1, date: 1 })
bookingSchema.index({ court: 1, date: 1, time: 1 }, { unique: true })

// Método para verificar si la reserva está activa
bookingSchema.methods.isActive = function(): boolean {
  return this.status === 'Confirmada' || this.status === 'Pendiente'
}

// Método para verificar si la reserva puede ser cancelada
bookingSchema.methods.canBeCancelled = function(): boolean {
  const bookingDate = new Date(this.date)
  const now = new Date()
  const hoursUntilBooking = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  return this.isActive() && hoursUntilBooking > 24
}

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema) 