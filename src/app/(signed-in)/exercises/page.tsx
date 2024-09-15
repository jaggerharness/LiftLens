import prisma from '@/lib/prisma';
import ExerciseList from './components/exercise-list';

export default async function ExercisePage() {
  const exercises = await prisma.exercise.findMany({
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
