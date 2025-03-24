import mongoose from 'mongoose'
import User from './User'

export interface ITournament extends mongoose.Document {
  name: string
  description: string
  rules: string
  prizes: string
  date: Date
  minLevel: string
  pricePerPair: number
  totalPlaces: number
  location: {
    name: string
    city: string
  }
  participants: {
    player: mongoose.Types.ObjectId
    registrationDate: Date
    paymentStatus: string
  }[]
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled'
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
}

const tournamentschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del torneo es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción del torneo es requerida']
  },
  rules: {
    type: String,
    required: [true, 'Las reglas del torneo son requeridas']
  },
  prizes: {
    type: String,
    required: [true, 'Los premios del torneo son requeridos']
  },
  date: {
    type: Date,
    required: [true, 'La fecha del torneo es requerida']
  },
  minLevel: {
    type: String,
    enum: ['Iniciación', 'Intermedio', 'Avanzado', 'Profesional'],
    required: [true, 'El nivel mínimo es requerido']
  },
  pricePerPair: {
    type: Number,
    required: [true, 'El precio por pareja es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  totalPlaces: {
    type: Number,
    required: [true, 'El número total de plazas es requerido'],
    min: [2, 'Debe haber al menos 2 plazas']
  },
  location: {
    name: {
      type: String,
      required: [true, 'El nombre de la ubicación es requerido']
    },
    city: {
      type: String,
      required: [true, 'La ciudad es requerida']
    }
  },
  participants: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending'
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'in_progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
})

// Índices para mejorar el rendimiento de las consultas
tournamentschema.index({ date: 1 })
tournamentschema.index({ status: 1 })
tournamentschema.index({ minLevel: 1 })

// Método para verificar si hay plazas disponibles
tournamentschema.methods.hasAvailablePlaces = function() {
  return this.participants.length < this.totalPlaces
}

// Método para verificar si un usuario puede registrarse (por nivel)
tournamentschema.methods.canUserRegister = function(userLevel: string) {
  const levels = ['Iniciación', 'Intermedio', 'Avanzado', 'Profesional']
  const userLevelIndex = levels.indexOf(userLevel)
  const requiredLevelIndex = levels.indexOf(this.minLevel)
  return userLevelIndex >= requiredLevelIndex
}

const Tournament = mongoose.models.Tournament || mongoose.model<ITournament>('Tournament', tournamentschema)

export default Tournament 