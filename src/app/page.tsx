import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/shad-ui/alert';
import { auth } from '@/lib/auth';
import { AlertCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import LoginCard from './components/login-card';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-8">
      <Alert variant="default" className="w-3/4">
        <AlertCircle className="size-4" />
        <AlertTitle>NOTE:</AlertTitle>
        <AlertDescription>
          This application is currently in development and not ready for
          production use. Feel free to create an account and explore, but note
          that the database is frequently reset, requiring you to re-enter your
          data. This message will be removed upon the release of version 1.0.
          (Coming soon!)
        </AlertDescription>
      </Alert>
      <LoginCard />
    </main>
  );
}
