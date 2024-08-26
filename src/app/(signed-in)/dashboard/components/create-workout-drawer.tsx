import prisma from '@/lib/prisma';
import { ExerciseWithMuscleGroups } from '@/lib/types';
import { CreateWorkoutForm } from './create-workout-form';

async function getExercises(): Promise<ExerciseWithMuscleGroups[]> {
  return prisma.exercise.findMany({
    include: {
      muscleGroups: true,
    },
  });
}

export async function CreateWorkoutDialog() {
  const exercises = await getExercises();
  return <CreateWorkoutForm exercises={exercises} mode={'create'} />;
}
