import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth';
import { AuthError } from '@auth/core/errors';
import { isRedirectError } from 'next/dist/client/components/redirect';

export function CredSignIn() {
  return (
    <form
      className="grid gap-2"
      action={async (formData) => {
        'use server';
        try {
          await signIn('credentials', formData);
          return undefined;
        } catch (error) {
          if (isRedirectError(error)) throw error;
          if (error instanceof Error) {
            const { type, cause } = error as AuthError;
            switch (type) {
              case 'CredentialsSignin':
                return 'Invalid credentials.';
              case 'CallbackRouteError':
                return cause?.err?.toString();
              default:
                return 'Something went wrong.';
            }
          }
          throw error;
        }
      }}
    >
      <Label className="sr-only" htmlFor="email">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="Email"
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
        placeholder="Password"
        type="password"
        autoCapitalize="none"
        autoCorrect="off"
      />
      <Button>Sign In</Button>
    </form>
  );
}
