import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { ZodError } from 'zod';
import { signInSchema } from './zod';

const prisma = new PrismaClient();

const fetchUser = async (email: string, password: string) => {
  const userObj = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userObj) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, userObj.password ?? '');

  if (!passwordMatch) {
    return null;
  }

  return userObj;
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
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
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await fetchUser(email, password);

          console.log({ user });

          if (user === null) {
            throw new Error('User not found.');
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          } else {
            throw new Error('Unexpected error.');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email ?? '';
      }
      return session;
    },
    async authorized({ auth, request }) {
      console.log({ auth });
      if (auth?.user) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      return true;
    },
  },
});
