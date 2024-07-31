import { buttonVariants } from '@/components/shad-ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shad-ui/drawer';
import { CreateWorkoutForm } from './create-workout-form';
import prisma from '@/lib/prisma';
import { Exercise, Prisma } from '@prisma/client';

type ExerciseWithMuscleGroups = Prisma.ExerciseGetPayload<{
  include: {
    muscleGroups: true;
  };
}>;

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
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: 'default' })}>
        Create A Workout
      </DrawerTrigger>
      <DrawerContent className="flex items-center space-y-6">
        <DrawerHeader>
          <DrawerTitle>Create A Workout</DrawerTitle>
          <DrawerDescription>
            You can create a workout from scratch or use a preexisting template
          </DrawerDescription>
        </DrawerHeader>
        <CreateWorkoutForm exercises={exercises} />
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
