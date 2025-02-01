import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // This field is required
  },
  email: {
    type: String,
    required: true,  // This field is required
    unique: true,  // This field must be unique
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,  // This field is required
    minlength: 8,  // Password must have a minimum length of 8 characters
  },
  role: {
    type: String,
    default: 'admin',
  },
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
