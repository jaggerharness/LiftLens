import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { signInSchema } from './zod';

declare module 'next-auth' {
  interface User {
    firstName: String | null;
    lastName: String | null;
    emailVerified: Date | null;
    firstLogin: Boolean;
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    firstName: String | null;
    lastName: String | null;
    emailVerified: Date | null;
    firstLogin: Boolean;
  }
}

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
  debug: false,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    updateAge: 0,
    maxAge: 30 * 24 * 60 * 60,
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

          if (user === null) {
            throw new Error('User not found.');
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.emailVerified = user.emailVerified;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.firstLogin = user.firstLogin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email ?? '';
        session.user.emailVerified = token.emailVerified as Date | null;
        session.user.firstName = token.firstName as String | null;
        session.user.lastName = token.lastName as String | null;
        session.user.firstLogin = token.firstLogin as Boolean;
      }
      return session;
    },
    async authorized({ auth, request }) {
      if (auth?.user) {
        // TODO
        if (auth?.user.firstLogin) {
          return Response.redirect(
            new URL('/first-time-setup', request.nextUrl)
          );
        }
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      return true;
    },
  },
});
