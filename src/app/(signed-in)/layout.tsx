import { auth } from '@/lib/auth';
import { ModeToggle } from './components/mode-toggle';
import { UserNav } from './components/user-nav';
import Link from 'next/link';

export default async function UserNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <section className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href={'/dashboard'}>
            <h2 className="text-3xl font-bold tracking-tight hover:text-primary/80">
              LiftLens
            </h2>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav session={session!} />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
