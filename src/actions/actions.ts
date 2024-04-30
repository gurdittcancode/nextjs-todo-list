'use server';

import { Todo } from '@/models/todo';
import { User } from '@/models/user';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const title = formData.get('title');
  const userId = formData.get('user');
  const form = formData.get('form');

  try {
    const newTodo = await Todo.create({ title });
    const sessionUser = await User.findById(userId);
    sessionUser.todos.push(newTodo._id);
    sessionUser.save();

    revalidatePath('/');
    if (form) form.reset();
    
  } catch (err) {
    console.log('Something went wrong:', err);
  }
}

export async function changeStatus(formData: FormData) {
  const id = formData.get('id');

  try {
    const foundTodo = await Todo.findById(id);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    await foundTodo.save();

    revalidatePath('/');
  } catch (err) {
    console.error('Failed to update todo:', err);
  }
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get('id');

  try {
    await Todo.findByIdAndDelete(id);

    revalidatePath('/');
  } catch (err) {
    console.error('Error in deleting todo: ', err);
  }
}
