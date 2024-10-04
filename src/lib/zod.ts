import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const workoutFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  date: z.date({
    required_error: 'Workout date required.',
  }),
  workoutExercises: z
    .array(
      z.object({
        exercise: z.object({
          id: z.string(),
          displayName: z.string(),
        }),
        sets: z.coerce.number().min(1, 'Sets must be a postive number'),
        reps: z.coerce.number().min(1, 'Reps must be a postive number'),
      })
    )
    .nonempty('At least one exercise is required'),
});

export const createExerciseFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  muscleGroups: z.array(z.string()).min(1, "Select at least one muscle group"),
});
