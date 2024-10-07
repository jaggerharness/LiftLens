import { Alert, AlertDescription } from '@/components/shad-ui/alert';
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
      <Alert variant="default" className="w-3/4 md:w-1/4">
        <AlertCircle className="size-4" />
        <AlertDescription>
          Beta testing is currently taking place. Data is reset frequently. Report any issues to support@liftlens.app
        </AlertDescription>
      </Alert>
      <LoginCard />
    </main>
  );
}
