import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  passwordHash?: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: 'Student' | 'Psychologist' | 'Admin';
  status: 'Active' | 'Suspended' | 'Inactive';
  isActive: boolean;
  googleId?: string;
  otpCode?: string;
  otpExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['Student', 'Psychologist', 'Admin'], default: 'Student' },
    status: { type: String, enum: ['Active', 'Suspended', 'Inactive'], default: 'Suspended' },
    isActive: { type: Boolean, default: true },
    googleId: { type: String },
    otpCode: { type: String },
    otpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

export default mongoose.model<IUser>('User', userSchema);