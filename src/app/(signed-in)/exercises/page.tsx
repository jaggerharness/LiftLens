import prisma from '@/lib/prisma';
import ExerciseList from './components/exercise-list';
import { auth } from '@/lib/auth';

export default async function ExercisePage() {
  const session = await auth();
  const exercises = await prisma.exercise.findMany({
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

  const muscleGroups = await prisma.muscleGroup.findMany();

  return (
    <div>
      <ExerciseList exercises={exercises} muscleGroups={muscleGroups} />
    </div>
  );
}
