import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { signInSchema } from './zod';

const prisma = new PrismaClient();

const fetchUser = async (email: string, password: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);
        const user = await fetchUser(email, password);

        if (!user) {
          throw new Error('User not found.');
        }

        return user;
      },
    }),
  ],
});
