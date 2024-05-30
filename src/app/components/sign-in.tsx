import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <Button type="submit" variant="outline">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </form>
  );
}
