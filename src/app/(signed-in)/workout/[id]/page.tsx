import prisma from '@/lib/prisma';
import { WorkoutActions } from './components/workout-actions';
import { WorkoutNotes } from './components/workout-notes';
import { WorkoutWithExercises } from '@/lib/types';
import { cache, Suspense } from 'react';
import { WorkoutArea } from './components/workout-area';
import { WorkoutAreaSkeleton } from './components/workout-area-skeleton';

export default async function WorkoutPage({
  params,
}: {
  params: { id: string };
}) {
  const fetchWorkout = cache(() => prisma.workout.findUnique({
    where: {
      id: params.id,
    },
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
  }));

  const workoutPromise: Promise<WorkoutWithExercises | null> = fetchWorkout();


  return (
    <Suspense fallback={<WorkoutAreaSkeleton />}>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 p-6">
        <WorkoutArea workoutPromise={workoutPromise} />
        <WorkoutActions workoutPromise={workoutPromise} />
        <WorkoutNotes workoutPromise={workoutPromise} />
      </div>
    </Suspense>
  );
}
