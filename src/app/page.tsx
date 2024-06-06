import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginCard from './components/login-card';
import RegisterCard from './components/register-card';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex h-screen items-center justify-evenly">
      <RegisterCard />
      <LoginCard />
    </main>
  );
}
