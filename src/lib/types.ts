import { Prisma } from '@prisma/client';

export type ExerciseWithMuscleGroups = Prisma.ExerciseGetPayload<{
  include: {
    muscleGroups: true;
  };
}>;
