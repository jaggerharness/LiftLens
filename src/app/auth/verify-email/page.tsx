import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import prisma from '@/lib/prisma';
import { validateToken } from '@/server/actions/actions';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { ResendEmail } from './components/resend-email';

interface VerifyEmailPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const token = searchParams.verifyToken;
  let message: string;
  let verified: boolean | null = null;

  if (typeof token === 'string') {
    const userId = await validateToken({ token });

    if (userId) {
      verified = true;
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    } else {
      verified = false;
    }
  }

  if (verified === true) {
    message = 'Email verified!';
    verified = true;
  } else {
    verified = false;
    message = 'User not found. Check your email for the verification link.';
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {verified ? (
        <Card className="max-w-sm text-center">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full grid place-content-center py-4">
              <MailCheck />
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              {message}
            </p>
          </CardContent>
          <CardFooter>
            <Link className="w-full" href="/">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-4/12">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              First, let&apos;s verify your email
            </CardTitle>
            <CardDescription>
              Check your inbox to complete your email verification and get
              started.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ResendEmail />
          </CardContent>
          <CardFooter className="flex flex-col justify-center text-sm">
            Having trouble?
            <Link className="hover:text-primary mt-4" href="/sign-up">
              Contact Support
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
