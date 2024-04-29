import AddTodo from '@/components/AddTodo';
import Todos from '@/components/Todos';
import { getAuthSession } from '@/lib/auth';
import { User } from '@/models/user';

async function getTodos(id) {
  try {
    const foundUser = await User.findById(id).populate('todos');
    return foundUser.todos;
  } catch (err) {
    console.error('Error fetching todos:', err);
  }
}

export default async function Home() {
  const session = await getAuthSession();
  const todos = await getTodos(session?.user.id || '');

  if (!session?.user) {
    return (
      <div className="w-full flex justify-center mt-20 text-purple-600 text-xl">
        <p>You need to sign in to use this to-do list</p>
      </div>
    );
  }

  return (
    <div className="mt-20 flex flex-col items-center">
      <AddTodo />
      <Todos todos={todos} />
    </div>
  );
}
