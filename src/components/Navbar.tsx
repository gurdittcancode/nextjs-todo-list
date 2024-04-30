'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="px-10 py-6 flex justify-between items-center">
      <div>
        <span className="text-2xl font-bold text-purple-600">Logo</span>
      </div>
      <div>
        {session?.user ? (
          <span className="flex gap-7">
            <Image
              src={session.user.image as string}
              height={40}
              width={40}
              className="rounded-full w-auto"
              alt="profile picture"
            />
            <button
              className="bg-purple-600 text-white px-4 py-3 rounded-xl"
              onClick={() => signOut()}>
              Sign Out
            </button>
          </span>
        ) : (
          <button
            className="bg-purple-600 text-white px-4 py-3 rounded-xl"
            onClick={() => signIn('google')}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
