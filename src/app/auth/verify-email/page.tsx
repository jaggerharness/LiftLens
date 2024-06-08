import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import prisma from '@/lib/prisma';
import { validateUserEmail } from '@/server/actions/actions';
import { LoaderIcon, MailCheck, MailQuestion } from 'lucide-react';

export default async function VerifyEmailPage() {
  let message: string = 'Verifying email...';
  let verified: boolean | null = null;
  let token: string = '1234';

  const validateToken = validateUserEmail({ token });

  await prisma.verificationToken.findFirst({
    where: {
      identifier: 'user_id',
    },
  });

  if (verified === true) {
    message = `Email verified!`;
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
          {verified && <Button className="w-full">Sign In</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
