'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shad-ui/avatar';
import { Button } from '@/components/shad-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shad-ui/dropdown-menu';
import { DashboardIcon, GearIcon } from '@radix-ui/react-icons';
import { Dumbbell, LogOut, NotebookPen } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export function UserNav({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={session?.user?.image ?? ''} alt="user avatar" />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 sm:w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Signed in as:</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email ?? ''}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuGroup className="block sm:hidden">
          <Link href={'/dashboard'}>
            <DropdownMenuItem>
              Dashboard
              <DashboardIcon className="size-4 ml-auto text-xs tracking-widest opacity-60" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuGroup className="block sm:hidden">
          <Link href={'/exercise-explorer'}>
            <DropdownMenuItem>
              Exercises
              <Dumbbell className="size-4 ml-auto text-xs tracking-widest opacity-60" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuGroup className="block sm:hidden">
          <Link href={'/calorie-log'}>
            <DropdownMenuItem>
              Calorie Tracking
              <NotebookPen className="size-4 ml-auto text-xs tracking-widest opacity-60" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Settings
            <GearIcon className="size-4 ml-auto text-xs tracking-widest opacity-60" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
          <LogOut className="size-4 ml-auto text-xs tracking-widest opacity-60" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
