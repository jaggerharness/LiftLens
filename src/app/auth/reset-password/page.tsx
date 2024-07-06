import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import { ResetPasswordForm } from '@/components/ui/reset-form';
import { validatePasswordResetToken } from '@/server/actions/actions';
import Link from 'next/dist/client/link';

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const token = searchParams.resetToken;

  let userId: string | null = null;
  if (typeof token === 'string') {
    userId = await validatePasswordResetToken({ token });
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {userId !== null && typeof token === 'string' ? (
        <Card className="w-4/12">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ResetPasswordForm userId={userId} token={token} />
          </CardContent>
          <CardFooter className="flex flex-col justify-center text-sm">
            Having trouble?
            <Link className="hover:text-primary mt-4" href="/sign-up">
              Contact Support
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-4/12">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Password Reset Error</CardTitle>
            <CardDescription>
              Looks like your password reset token was not found or has expired.
              Please, try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button>
              <Link className="w-full" href={'/'}>
                Back To Home
              </Link>
            </Button>
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
