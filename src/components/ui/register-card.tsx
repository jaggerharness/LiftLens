import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import { Input } from '@/components/shad-ui/input';
import { Label } from '@/components/shad-ui/label';
import { registerUser } from '@/server/actions/actions';
import Link from 'next/dist/client/link';
import { GitHubSignIn } from './github-sign-in';
import { GoogleSignIn } from './google-sign-in';

export default function RegisterCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <form
              className="grid gap-2"
              action={async (formData) => {
                'use server';
                await registerUser({ formData });
              }}
            >
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Create a password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Button className="mt-3 w-full">Register</Button>
            </form>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">
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
        Already have an account?
        <Link className="hover:text-primary mt-4" href="/">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
