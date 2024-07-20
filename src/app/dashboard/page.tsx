import { Metadata } from 'next';

import { ModeToggle } from '@/components/ui/mode-toggle';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserNav } from '@/components/ui/user-nav';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-3xl font-bold tracking-tight">LiftLens</h2>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav session={session!} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight self-start">
              Workouts
            </h2>
            <Table>
              <TableCaption>A list of your workouts</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Workout</TableHead>
                  <TableHead>Estimated Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">7/19/2024</TableCell>
                  <TableCell>Upper</TableCell>
                  <TableCell>30 mins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7/17/2024</TableCell>
                  <TableCell>Lower</TableCell>
                  <TableCell>35 mins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7/15/2024</TableCell>
                  <TableCell>Upper</TableCell>
                  <TableCell>45 mins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7/13/2024</TableCell>
                  <TableCell>Lower</TableCell>
                  <TableCell>40 mins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7/11/2024</TableCell>
                  <TableCell>Upper</TableCell>
                  <TableCell>30 mins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7/09/2024</TableCell>
                  <TableCell>Lower</TableCell>
                  <TableCell>35 mins</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
