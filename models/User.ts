import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  level: 'Iniciación' | 'Intermedio' | 'Avanzado' | 'Profesional';
  isProfileComplete: boolean;
  phone?: string;
  address?: string;
  birthDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  level: {
    type: String,
    enum: ['Iniciación', 'Intermedio', 'Avanzado', 'Profesional'],
    default: 'Iniciación'
  },
  phone: {
    type: String,
    default: ''
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
}, {
  timestamps: true
})

// Método para verificar si el usuario es admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin'
}

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User 