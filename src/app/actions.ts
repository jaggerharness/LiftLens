'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function registerUser({ formData }: { formData: FormData }) {
  const prisma = new PrismaClient();

  const email = formData.get('email');
  const password = formData.get('password');

  const hashedPassword = await bcrypt.hash(password?.toString() ?? '', 10);

  const user = await prisma.user.create({
    data: {
      name: email?.toString() ?? '',
      password: hashedPassword,
      email: email?.toString() ?? '',
      emailVerified: new Date(),
    },
  });

  return user;
}
