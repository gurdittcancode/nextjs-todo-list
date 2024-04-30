import { TodoType } from '@/types/todo';

import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { changeStatus, deleteTodo } from '@/actions/actions';
import React, { Key } from 'react';

function Todo({ todo }: { todo: TodoType }) {
  console.log(todo);
  const style: React.CSSProperties = {
    opacity: todo.isCompleted ? 0.5 : 1,
  };

  return (
    <li className="ml-10 mt-5" style={style}>
      <Card
        className={`w-[300px] h-[200px] max-h-[200px] flex flex-col justify-between
      ${todo.isCompleted ? 'text-gray-600' : 'text-purple-600'}
      `}>
        <CardHeader>
          <CardTitle
            className={todo.isCompleted ? 'text-gray-500' : 'text-purple-600'}>
            {todo.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex gap-5">
          <div className="">
            <form action={deleteTodo}>
              <input type="hidden" value={todo._id.toString()} name="id" />
              <button
                type="submit"
                className="px-4 py-3 border border-purple-600 rounded-xl">
                Delete
              </button>
            </form>
          </div>
          <div>
            <form action={changeStatus}>
              <input type="hidden" value={todo._id.toString()} name="id" />
              <button
                type="submit"
                className="bg-purple-600 px-4 py-3 rounded-xl text-white">
                Mark as done
              </button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}

export default function Todos({ todos }: { todos: TodoType[] }) {
  return (
    <ul className="mt-16 flex flex-wrap">
      {todos.map((todo) => (
        <Todo key={todo._id as unknown as Key} todo={todo} />
      ))}
    </ul>
  );
}
