// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // hashed if you're handling auth
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);