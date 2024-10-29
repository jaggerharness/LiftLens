import prisma from '@/lib/prisma';
import ExerciseList from './components/exercise-list';
import { auth } from '@/lib/auth';
import { cache } from 'react';

export default async function ExercisePage() {
  const session = await auth();
  const fetchExercise = cache(() => prisma.exercise.findMany({
    where: {
      OR: [
        { isPublic: true },
        { createdBy: session?.user?.id },
      ],
    },
    include: {
      muscleGroups: true,
    },
  }));

  const exercisesPromise = fetchExercise();

  const muscleGroups = await prisma.muscleGroup.findMany();

  return (
    <div>
      <ExerciseList exercisesPromise={exercisesPromise} muscleGroups={muscleGroups} />
    </div>
  );
}
