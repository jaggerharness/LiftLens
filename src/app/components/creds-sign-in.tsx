import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';
import { AuthError } from '@auth/core/errors';
import { isRedirectError } from 'next/dist/client/components/redirect'

export function CredSignIn() {
  return (
    <form
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
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <Button>Login</Button>
    </form>
  );
}
