import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signIn } from '@/lib/auth';

export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit" variant={'secondary'} className="w-full">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </form>
  );
}
