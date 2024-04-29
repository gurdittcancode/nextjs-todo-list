import mongoose from 'mongoose';
import { TodoType } from './todo';

export type UserType = {
  name: string;
  email: string;
  _id: mongoose.Schema.Types.ObjectId;
  todos: TodoType[];
};
