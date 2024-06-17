'use client';
import { Button } from '@/components/shad-ui/button';
import { Input } from '@/components/shad-ui/input';
import { Label } from '@/components/shad-ui/label';
import { credentialsSignIn } from '@/server/actions/actions';
import { useFormState } from 'react-dom';

export function CredSignIn() {
  interface ErrorType {
    message: string;
  }

  const initialState: ErrorType = {
    message: '',
  };

  const [state, formAction] = useFormState(credentialsSignIn, initialState);

  return (
    <form className="grid gap-2" action={formAction}>
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
      <p aria-live="polite" className="sr-only">
        {typeof state !== 'string' && state?.message}
      </p>
      <Button>Sign In</Button>
    </form>
  );
}
