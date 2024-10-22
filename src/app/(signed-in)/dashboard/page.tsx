import { Metadata } from 'next';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { WorkoutWithExercises } from '@/lib/types';
import { endOfWeek, startOfWeek } from 'date-fns';
import { CreateWorkoutDialog } from './components/create-workout-drawer';
import { WorkoutTable } from './components/workout-table';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

const zeroOutTime = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

async function getWorkouts({start, end} : {start: string | undefined, end: string | undefined}): Promise<WorkoutWithExercises[]> {
  console.log({ start, end });
  const session = await auth();
  const startParam = start ? zeroOutTime(new Date(start)) : undefined;
  const endParam = end ? zeroOutTime(new Date(end)) : start;

  const currentDate = new Date();
  const startRangeValue = startParam ?? zeroOutTime(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const endRangeValue = endParam ?? zeroOutTime(endOfWeek(currentDate, { weekStartsOn: 1 }));

  console.log({ startRangeValue, endRangeValue });

  return prisma.workout.findMany({
    where: {
      createdBy: session?.user?.id,
      workoutDate: {
        gte: startRangeValue,
        lt: endRangeValue,
      },
    },
    orderBy: { workoutDate: 'asc' },
    include: {
      workoutExercises: {
        include: {
          exercise: {
            include: {
              muscleGroups: true,
            },
          },
        },
      },
      status: true,
      WorkoutStatusLog: true,
    },
  });
}

export default async function DashboardPage(props: {
  searchParams?: Promise<{
    start?: string;
    end?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const workouts = await getWorkouts({start: searchParams?.start, end: searchParams?.end});
  return (
    <main>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Workouts</CardTitle>
              <CardDescription className="text-balance leading-relaxed flex flex-row">
                Create and manage your upcoming workouts.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <CreateWorkoutDialog />
            </CardFooter>
          </Card>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        <WorkoutTable workouts={workouts} />
      </div>
    </main>
  );
}
