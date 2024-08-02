import prisma from '@/lib/prisma';
import { ExerciseWithMuscleGroups } from '@/lib/types';
import { CreateWorkoutForm } from './create-workout-form';

async function getExercises(): Promise<ExerciseWithMuscleGroups[]> {
  const exercises = await prisma.exercise.findMany({
    include: {
      muscleGroups: true,
    },
  });
  return exercises;
}

export async function CreateWorkoutDrawer() {
  const exercises = await getExercises();
  return <CreateWorkoutForm exercises={exercises} />;
}
