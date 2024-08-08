import { Metadata } from 'next';

import { Badge } from '@/components/shad-ui/badge';
import { Button } from '@/components/shad-ui/button';
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
import { WorkoutTable } from '@/components/ui/workout-table';
import { WorkoutWithExercises } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

async function getWorkouts(): Promise<WorkoutWithExercises[]> {
  return prisma.workout.findMany({
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
    }
  });
}

export default async function DashboardPage() {
  const session = await auth();
  const workouts = await getWorkouts();
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Upcoming Workouts</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Create and manage your upcoming workouts below.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CreateWorkoutDrawer />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">4 workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  You got this!
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="1 of 4 workouts completed" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">16 workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Lock in!</div>
              </CardContent>
              <CardFooter>
                <Progress value={50} aria-label="8 of 16 workouts completed" />
              </CardFooter>
            </Card>
          </div>
          <WorkoutTable workouts={workouts} />
        </div>
      </div>
    </main>
  );
}
