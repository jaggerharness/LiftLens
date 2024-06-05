import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

function isRedirectError(error: Error & { digest?: string }) {
  return !!error.digest?.startsWith('NEXT_REDIRECT');
}

export function CredSignIn() {
  return (
    <form
      action={async (formData) => {
        'use server';
        // try {
        await signIn('credentials', { formData, redirectTo: '/dashboard' });
        // } catch (error) {
        //   console.log({ error });
        //   if (isRedirectError(error as Error)) throw error;
        // } finally {
        //   redirect('http://localhost:3000/dashboard');
        // }
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
