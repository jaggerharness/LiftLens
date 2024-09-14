'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ScrollArea, ScrollBar } from '@/components/shad-ui/scroll-area';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Exercises',
    href: '/exercise-explorer',
  },
  {
    name: 'Calorie Tracking',
    href: '/calorie-log',
  },
];

interface SiteNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SiteNav({ className, ...props }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn('mb-4 flex items-center', className)} {...props}>
          {features.map((feature, index) => (
            <Link
              href={feature.href}
              key={feature.href}
              className={cn(
                'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(feature.href) ||
                  (index === 0 && pathname === '/')
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {feature.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
