import { Metadata } from 'next';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserNav } from '@/components/ui/user-nav';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-3xl font-bold tracking-tight">LiftLens</h2>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav session={session} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
          </div>
        </div>
      </div>
    </>
  );
}
