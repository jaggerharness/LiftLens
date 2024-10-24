import { ScrollArea } from '@/components/shad-ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shad-ui/table';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ActiveWorkoutProvider from './active-workout-provider';
import { Stopwatch } from './components/stopwatch';
import { WorkoutActions } from './components/workout-actions';
import { WorkoutNotes } from './components/workout-notes';
import { WorkoutWithExercises } from '@/lib/types';

export default async function WorkoutPage({
  params,
}: {
  params: { id: string };
}) {
  const workoutData: WorkoutWithExercises | null = await prisma.workout.findUnique({
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
    <ActiveWorkoutProvider workoutData={workoutData}>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 p-6">
        <div className="flex flex-row justify-between">
          <h1>
            {'Workout: '}
            <span className="font-semibold">{workoutData?.name}</span>
          </h1>
          <Stopwatch />
        </div>
        <ScrollArea className="m-2 px-2 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="pointer-events-none">
                <TableHead>Exercise</TableHead>
                <TableHead className="text-center">Sets</TableHead>
                <TableHead className="text-center">Reps</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workoutData.workoutExercises.map((exercise) => (
                <TableRow className="md:h-10 h-14" key={exercise.id}>
                  <TableCell>{exercise.exercise.displayName}</TableCell>
                  <TableCell className="text-center">{exercise.sets}</TableCell>
                  <TableCell className="text-center">{exercise.reps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <WorkoutActions />
        <WorkoutNotes data={workoutData} />
      </div>
    </ActiveWorkoutProvider>
  );
}
