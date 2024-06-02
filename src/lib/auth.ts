import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [github, google],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email;
      if (email) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          const existingAccountProvider = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              providerAccountId: account?.providerAccountId.toString() ?? '',
            },
          });
          if (!existingAccountProvider) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account?.provider ?? '',
                type: account?.type ?? '',
                providerAccountId: account?.providerAccountId.toString() ?? '',
              },
            });
          }

          return true;
        }
      }
      // If no existing user is found, proceed with normal sign in
      return true;
    },
  },
});
