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
    },
  });

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 p-6">
      <h1>{`Workout ID: ${params.id}`}</h1>
      <WorkoutActions workout={workoutData} />
    </div>
  );
}
