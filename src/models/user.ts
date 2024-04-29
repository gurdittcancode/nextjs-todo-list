import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name.'],
  },
  email: {
    type: String,
    unique: [true, 'User with this email already exists.'],
    required: [true, 'User must have a email.'],
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
