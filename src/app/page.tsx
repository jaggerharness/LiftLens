import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginCard from './components/login-card';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-8">
      <LoginCard />
    </main>
  );
}
