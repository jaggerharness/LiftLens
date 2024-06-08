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

async function sendEmail(user: any, inviteLink: string) {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

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

  const emailHtml = render(EmailVerificationEmail({ inviteLink }));

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

async function validateToken(token: string) {
  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }
  return await new Promise<boolean>((resolve) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        resolve(false);
        return;
      }
      // const jwtPayload = decoded as JWT;
      resolve(true);
    });
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

  await sendEmail(user, 'http://localhost:3000');

  await createVerificationToken(user, token);

  return user;
}

export async function validateUserEmail({ token }: { token: string }) {
  const validToken = await validateToken(token);
  if (validToken) {
    // process token data
    // validate user here
  } else {
    // display error, resend verification email?
  }
}
