import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit" variant="outline">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </form>
  );
}
