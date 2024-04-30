'use client';

import { addTodo } from '@/actions/actions';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

export default function AddTodo() {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const id = session?.user.id!;

  return (
    <form
      className="w-full flex justify-center gap-7"
      ref={ref}
      action={async (formData: FormData) => {
        formData.append('user', id);
        await addTodo(formData);
        ref.current?.reset();
      }}>
      <input
        type="text"
        className="border border-purple-600 px-2 py-2 w-1/2 rounded-xl"
        name="title"
      />
      <button className="bg-purple-600 text-white px-4 py-3 rounded-xl">
        Add Todo
      </button>
    </form>
  );
}
