import { Button } from '@/components/shad-ui/button';
import { Icons } from '@/components/shad-ui/icons';
import { signIn } from '@/lib/auth';

export function GitHubSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit" variant={'secondary'} className="w-full">
        <Icons.gitHub className="mr-2 size-4" />
        GitHub
      </Button>
    </form>
  );
}
