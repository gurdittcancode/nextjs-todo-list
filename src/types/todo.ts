import mongoose from 'mongoose';

export type TodoType = {
  title: string;
  createdAt: Date;
  isCompleted: boolean;
  _id: mongoose.Schema.Types.ObjectId;
};
