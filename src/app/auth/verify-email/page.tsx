import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import prisma from '@/lib/prisma';
import { validateToken } from '@/server/actions/actions';
import { LoaderIcon, MailCheck, MailQuestion } from 'lucide-react';
import Link from 'next/link';

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const token = searchParams.verifyToken;
  let message: string = 'Verifying email...';
  let verified: boolean | null = null;

  console.log({ token });

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
      <Card className="max-w-sm text-center">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full grid place-content-center py-4">
            {verified === null ? (
              <LoaderIcon className="animate-spin" />
            ) : verified === true ? (
              <MailCheck />
            ) : (
              <MailQuestion />
            )}
          </div>
          <p className="text-lg text-muted-foreground text-balance">
            {message}
          </p>
        </CardContent>
        <CardFooter>
          {verified && (
            <Link className="w-full" href="/">
              <Button className="w-full">Sign In</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
