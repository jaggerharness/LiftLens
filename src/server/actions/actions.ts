'use server';

import prisma from '@/lib/prisma';
import { SES } from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import EmailVerificationEmail from '../../../emails/email-verification';

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function generateJWT(user: any) {
  const jwtPayload: JWT = {
    id: user.id,
    email: user.email,
  };

  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  return jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
}

async function sendEmail(user: any, token: string) {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const verifyUrl = `${process.env.AUTH_URL}/auth/verify-email?verifyToken=${token}`;

  if (!(region && accessKeyId && secretAccessKey)) {
    throw new Error('AWS credentials or region are not set');
  }

  const ses = new SES({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const emailHtml = render(EmailVerificationEmail({ verifyUrl }));

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
        Data: 'LiftLens Email Verification',
      },
    },
  };

  await ses.sendEmail(params);
}

async function createVerificationToken(user: any, token: string) {
  await prisma.verificationToken.create({
    data: {
      identifier: user.id,
      token: token,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
  });
}

export async function registerUser({ formData }: { formData: FormData }) {
  const email = formData.get('email');
  const password = formData.get('password');

  const hashedPassword = await hashPassword(password?.toString() ?? '');

  const user = await prisma.user.create({
    data: {
      name: email?.toString() ?? '',
      password: hashedPassword,
      email: email?.toString() ?? '',
    },
  });

  const token = await generateJWT(user);

  await sendEmail(user, token);

  await createVerificationToken(user, token);

  return user;
}

export async function validateToken({ token }: { token: string }) {
  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });

  if (!verificationToken) {
    return null;
  }

  const decodedToken = jwt.verify(token, jwtSecret) as JWT;

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: token,
      },
    },
  });

  return decodedToken.id as string;
}
