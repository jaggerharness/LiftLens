import { signOut } from '@/lib/auth';
import { Button } from '@/components/shad-ui/button';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <Button className='text-left' type="submit" variant="ghost">
        Sign Out
      </Button>
    </form>
  );
}
