import { signOut } from '@/lib/auth';
import { Button } from '@/components/shad-ui/button';
import { Icons } from '@/components/shad-ui/icons';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
}
