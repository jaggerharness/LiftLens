import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Stopwatch } from './components/stopwatch';
import { WorkoutActions } from './components/workout-actions';

export default async function WorkoutPage({
  params,
}: {
  params: { id: string };
}) {
  const workoutData = await prisma.workout.findUnique({
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
  });

  if (!workoutData) {
    redirect('/dashboard');
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 p-6">
      <h1>{`Workout: ${workoutData?.name}`}</h1>
      <Stopwatch workout={workoutData} />
      <WorkoutActions workout={workoutData} />
    </div>
  );
}
