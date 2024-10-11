import prisma from '@/lib/prisma';
import { ExerciseWithMuscleGroups } from '@/lib/types';
import { CreateWorkoutForm } from './create-workout-form';
import { auth } from '@/lib/auth';

async function getExercises(): Promise<ExerciseWithMuscleGroups[]> {
  const session = await auth();
  return prisma.exercise.findMany({
    where: {
      OR: [
        { isPublic: true },
        { createdBy: session?.user?.id },
      ],
    },
    include: {
      muscleGroups: true,
    },
  });
}

export async function CreateWorkoutDialog() {
  const exercises = await getExercises();
  return <CreateWorkoutForm exercises={exercises} mode={'create'} />;
}
