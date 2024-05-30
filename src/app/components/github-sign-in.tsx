import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function GitHubSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit" variant="outline">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </form>
  );
}
