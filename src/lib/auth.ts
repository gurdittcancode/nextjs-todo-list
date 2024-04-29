import { getServerSession, NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectToDB } from './db';
import { User } from '@/models/user';
import { UserType } from '@/types/user';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email;
      try {
        await connectToDB();
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
          const name = profile?.name;
          await User.create({ name, email });
        }
        return true;
      } catch (err) {
        console.log('Error in signing user in', err);
        return false;
      }
    },
    async session({ session }) {
      const email = session.user?.email;
      await connectToDB();
      const sessionUser: UserType = await User.findOne({ email });
      session.user.id = sessionUser._id;

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
