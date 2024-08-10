import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import Link from 'next/link';
import { CredSignIn } from './creds-sign-in';
import { GitHubSignIn } from './github-sign-in';
import { GoogleSignIn } from './google-sign-in';

export default function LoginCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>
          Continue with one of the sign in options below
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <CredSignIn />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground bg-card">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <GitHubSignIn />
            <GoogleSignIn />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center text-sm">
        Don&apos;t have an account?
        <Link className="hover:text-primary mt-4" href="/sign-up">
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}
