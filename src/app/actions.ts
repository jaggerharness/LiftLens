'use server';

import { SES } from '@aws-sdk/client-ses';
import { PrismaClient } from '@prisma/client';
import { render } from '@react-email/render';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import EmailVerificationEmail from '../../emails/email-verification';

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

  const jwtPayload: JWT = {
    id: user.id,
    email: user.email,
  };

  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });

  console.log(token);

  const validToken = await new Promise<boolean>((resolve) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        resolve(false);
      } else {
        const jwtPayload = decoded as JWT;
        console.log(jwtPayload.id);
        console.log(jwtPayload.email);
        resolve(true);
      }
    });
  });

  console.log(validToken);

  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials or region are not set');
  }

  const ses = new SES({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const emailHtml = render(
    EmailVerificationEmail({ inviteLink: 'http://localhost:3000' })
  );

  const params = {
    Source: 'jagger.dev@gmail.com',
    Destination: {
      ToAddresses: [user.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Welcome to LiftLens',
      },
    },
  };

  await ses.sendEmail(params);

  return user;
}
