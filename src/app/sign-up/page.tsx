import RegisterCard from '@/components/ui/register-card';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex h-screen items-center justify-evenly">
      <RegisterCard />
    </main>
  );
}
