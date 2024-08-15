import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import { Progress } from '@/components/shad-ui/progress';
import { CreateWorkoutDrawer } from '@/components/ui/create-workout-drawer';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserNav } from '@/components/ui/user-nav';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { WorkoutWithExercises } from '@/lib/types';
import { Workout } from '@prisma/client';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { WorkoutTable } from './workout-table';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

async function getWorkouts(): Promise<WorkoutWithExercises[]> {
  const session = await auth();
  const currentDate = new Date();
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  return prisma.workout.findMany({
    where: {
      createdBy: session?.user?.id,
      workoutDate: {
        gte: startOfWeekDate,
        lte: endOfWeekDate,
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
    },
  });
}

async function getAnalytics(): Promise<{
  weekWorkoutData: Workout[];
  monthWorkoutData: Workout[];
}> {
  const session = await auth();
  const currentDate = new Date();
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);

  const weekWorkoutData = await prisma.workout.findMany({
    where: {
      createdBy: session?.user?.id,
      workoutDate: {
        gte: startOfWeekDate,
        lte: endOfWeekDate,
      },
    },
    orderBy: { workoutDate: 'asc' },
  });

  const monthWorkoutData = await prisma.workout.findMany({
    where: {
      createdBy: session?.user?.id,
      workoutDate: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
    },
    orderBy: { workoutDate: 'asc' },
  });

  return { weekWorkoutData, monthWorkoutData };
}

export default async function DashboardPage() {
  const session = await auth();
  const workouts = await getWorkouts();
  const analytics = await getAnalytics();
  return (
    <main>
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
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-6">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Workouts</CardTitle>
                <CardDescription className="text-balance leading-relaxed flex flex-row">
                  Create and manage your upcoming workouts.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CreateWorkoutDrawer />
              </CardFooter>
            </Card>
            <Card className={workouts.length === 0 ? 'hidden' : ''}>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">
                  {workouts.length} workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  You got this!
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={
                    (analytics.weekWorkoutData.filter(
                      (dataPoint) =>
                        new Date(dataPoint.workoutDate) <
                        new Date(new Date().setHours(0, 0, 0, 0)),
                    ).length /
                      analytics.weekWorkoutData.length) *
                    100
                  }
                  aria-label={`${analytics.weekWorkoutData.filter((workout) => new Date(workout.workoutDate) < new Date(new Date().setHours(0, 0, 0, 0))).length} of ${analytics.weekWorkoutData.length} workouts completed`}
                />
              </CardFooter>
            </Card>
            <Card className={workouts.length === 0 ? 'hidden' : ''}>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">{`${analytics.monthWorkoutData.length} workouts`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Lock in!</div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={
                    (analytics.monthWorkoutData.filter(
                      (dataPoint) =>
                        new Date(dataPoint.workoutDate) <
                        new Date(new Date().setHours(0, 0, 0, 0)),
                    ).length /
                      analytics.monthWorkoutData.length) *
                    100
                  }
                  aria-label={`${analytics.monthWorkoutData.filter((workout) => new Date(workout.workoutDate) < new Date(new Date().setHours(0, 0, 0, 0))).length} of ${analytics.monthWorkoutData.length} workouts completed`}
                />
              </CardFooter>
            </Card>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
          <WorkoutTable workouts={workouts} />
        </div>
      </div>
    </main>
  );
}
