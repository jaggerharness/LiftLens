// noinspection ExceptionCaughtLocallyJS

'use server';

import { auth, signIn } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { WorkoutWithExercises } from '@/lib/types';
import { createExerciseFormSchema, workoutFormSchema } from '@/lib/zod';
import { SES } from '@aws-sdk/client-ses';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { render } from '@react-email/render';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthError } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { z } from 'zod';
import EmailVerificationEmail from '../../../emails/email-verification';
import ResetPasswordEmail from '../../../emails/reset-password';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function generateJWT(user: User) {
  const jwtPayload: JWT = {
    id: user.id,
    email: user.email,
  };

  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  return jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
}

async function sendEmailVerification(user: User, token: string) {
  try {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const verifyUrl = `${process.env.AUTH_URL}/auth/verify-email?verifyToken=${token}`;

    if (!(region && accessKeyId && secretAccessKey)) {
      throw new Error('AWS credentials or region are not set');
    }

    const ses = new SES({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const emailHtml = await render(EmailVerificationEmail({ verifyUrl }));

    const params = {
      Source: 'no-reply@liftlens.app',
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'LiftLens Email Verification',
        },
      },
    };

    await ses.sendEmail(params);
  } catch {
    throw new Error('Failed to send email');
  }
}

export async function sendPasswordReset(email: string) {
  try {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const emailTo = email;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const token = await generateJWT(user);
    const resetUrl = `${process.env.AUTH_URL}/auth/reset-password?resetToken=${token}`;

    if (!(region && accessKeyId && secretAccessKey)) {
      throw new Error('AWS credentials or region are not set');
    }

    await prisma.passwordResetToken.create({
      data: {
        identifier: user.id,
        token: token,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      },
    });

    const ses = new SES({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const emailHtml = await render(ResetPasswordEmail({ resetUrl, emailTo }));

    const params = {
      Source: 'no-reply@liftlens.app',
      Destination: {
        ToAddresses: [emailTo],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'LiftLens Password Reset',
        },
      },
    };

    await ses.sendEmail(params);
  } catch {
    throw new Error('Failed to send email');
  }
}

async function createVerificationToken(user: User, token: string) {
  await prisma.verificationToken.create({
    data: {
      identifier: user.id,
      token: token,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
  });
}

export async function registerUser({
  values,
}: {
  values: { email: string; password: string };
}) {
  const email = values.email;
  const password = values.password;

  try {
    const hashedPassword = await hashPassword(password?.toString() ?? '');

    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: email?.toString() ?? '',
          password: hashedPassword,
          email: email?.toString() ?? '',
        },
      });

      const token = await generateJWT(user);

      await createVerificationToken(user, token);

      // Attempt to send verification email
      await sendEmailVerification(user, token);

      return user;
    });

    return {
      message: 'Registration successful. Please verify email and login.',
      type: 'success',
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        message:
          'An account with this email already exists. Please use a different email or login.',
        type: 'error',
      };
    }
    if (error instanceof Error && error.message === 'Failed to send email') {
      return {
        message:
          'Failed to send email verification email. Please check email and try again.',
        type: 'error',
      };
    }
    return {
      message: 'Registration failed. Please try again later.',
      type: 'error',
    };
  }
}

interface DecodedToken {
  id: string;
  // Add other properties if needed
}

export async function validateToken({
  token,
}: {
  token: string;
}): Promise<string | null> {
  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      return null;
    }

    const decodedToken = jwt.verify(token, jwtSecret) as DecodedToken;
    if (typeof decodedToken !== 'object' || !decodedToken.id) {
      throw new Error('Invalid token format');
    }

    return decodedToken.id;
  } catch {
    throw new Error('Token validation failed');
  }
}

export async function validatePasswordResetToken({
  token,
}: {
  token: string;
}): Promise<string | null> {
  const jwtSecret = process.env.AUTH_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not set');
  }

  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    if (!passwordResetToken) {
      return null;
    }

    const decodedToken = jwt.verify(token, jwtSecret) as DecodedToken;
    if (typeof decodedToken !== 'object' || !decodedToken.id) {
      throw new Error('Invalid token format');
    }

    return decodedToken.id;
  } catch {
    throw new Error('Token validation failed');
  }
}

export async function credentialsSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn('credentials', { email, password });
    return {
      message: 'Successful sign in.',
      type: 'success',
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid Credentials',
            type: 'error',
          };
        case 'CallbackRouteError':
          return {
            message: cause?.err?.toString(),
            type: 'error',
          };
        default:
          return {
            message: 'Something went wrong.',
            type: 'error',
          };
      }
    }
    throw error;
  }
}

export async function resetPassword({
  userId,
  password,
  token,
}: {
  userId: string;
  password: string;
  token: string;
}) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await hashPassword(password),
      },
    });

    await prisma.passwordResetToken.deleteMany({
      where: {
        token,
      },
    });

    return {
      message: 'Password reset.',
      type: 'success',
    };
  } catch {
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  }
}

export async function resendEmailVerification() {
  await auth();
}

export async function createWorkout({
  workoutData,
}: {
  workoutData: z.infer<typeof workoutFormSchema>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User is not authenticated');
  }

  await prisma.workout.create({
    data: {
      name: workoutData.name,
      workoutDate: workoutData.date,
      createdBy: session.user.id,
      workoutExercises: {
        create: workoutData.workoutExercises.map((exercise, index) => ({
          exerciseId: exercise.exercise.id,
          sets: exercise.sets,
          reps: exercise.reps,
          sortOrder: index + 1,
        })),
      },
    },
  });

  return {
    message: 'Workout created.',
    type: 'success',
  };
}

export async function updateWorkout({
  workoutData,
  workoutId
}: {
  workoutData: z.infer<typeof workoutFormSchema>,
  workoutId: string
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User is not authenticated');
  }

  await prisma.workout.update({
    where: { id: workoutId },
    data: {
      name: workoutData.name,
      workoutDate: workoutData.date,
      createdBy: session.user.id,
      workoutExercises: {
        upsert: workoutData.workoutExercises.map((exercise, index) => ({
          where: {
            workoutId_exerciseId_sortOrder: {
              workoutId: workoutId,
              exerciseId: exercise.exercise.id,
              sortOrder: index + 1,
            },
          },
          update: {
            sets: exercise.sets,
            reps: exercise.reps,
          },
          create: {
            exerciseId: exercise.exercise.id,
            sets: exercise.sets,
            reps: exercise.reps,
            sortOrder: index + 1,
          },
        })),
      },
    },
  });

  return {
    message: 'Workout updated.',
    type: 'success',
  };
}

export async function deleteWorkout({
  workoutId
}: {
  workoutId: string
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User is not authenticated');
  }

  await prisma.workout.delete({
    where: { id: workoutId }
  });

  return {
    message: 'Workout deleted.',
    type: 'success',
  };
}

export async function startWorkout({
  workout,
}: {
  workout: WorkoutWithExercises;
}) {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error('User is not authenticated');
  }

  if (workout.createdBy !== userSession.user.id) {
    throw new Error('User is not authorized to start this workout');
  }

  const startedStatusId = 2;

  const updatedWorkout: WorkoutWithExercises = await prisma.workout.update({
    where: {
      id: workout.id,
    },
    data: {
      currentStatusId: startedStatusId,
      WorkoutStatusLog: {
        create: {
          workoutStatusId: startedStatusId,
        },
      },
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
      WorkoutStatusLog: true,
    },
  });

  const response = {
    type: 'success',
    data: updatedWorkout,
  };

  return response;
}

export async function pauseWorkout({
  workout,
}: {
  workout: WorkoutWithExercises;
}) {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error('User is not authenticated');
  }

  if (workout.createdBy !== userSession.user.id) {
    throw new Error('User is not authorized to pause this workout');
  }

  const pausedStatusId = 4;

  const updatedWorkout: WorkoutWithExercises = await prisma.workout.update({
    where: {
      id: workout.id,
    },
    data: {
      currentStatusId: pausedStatusId,
      WorkoutStatusLog: {
        create: {
          workoutStatusId: pausedStatusId,
        },
      },
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
      WorkoutStatusLog: true,
    },
  });

  return {
    type: 'success',
    data: updatedWorkout,
  };
}

export async function completeWorkout({
  workout,
}: {
  workout: WorkoutWithExercises;
}) {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error('User is not authenticated');
  }

  if (workout.createdBy !== userSession.user.id) {
    throw new Error('User is not authorized to complete this workout');
  }

  const completedStatusId = 3;

  const updatedWorkout: WorkoutWithExercises = await prisma.workout.update({
    where: {
      id: workout.id,
    },
    data: {
      currentStatusId: completedStatusId,
      WorkoutStatusLog: {
        create: {
          workoutStatusId: completedStatusId,
        },
      },
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
      WorkoutStatusLog: true,
    },
  });

  return {
    type: 'success',
    data: updatedWorkout,
  };
}

export async function cancelWorkout({
  workout,
}: {
  workout: WorkoutWithExercises;
}) {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error('User is not authenticated');
  }

  if (workout.createdBy !== userSession.user.id) {
    throw new Error('User is not authorized to cancel this workout');
  }

  const canceledStatusId = 5;

  const updatedWorkout: WorkoutWithExercises = await prisma.workout.update({
    where: {
      id: workout.id,
    },
    data: {
      currentStatusId: canceledStatusId,
      WorkoutStatusLog: {
        create: {
          workoutStatusId: canceledStatusId,
        },
      },
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
      WorkoutStatusLog: true,
    },
  });

  return {
    type: 'success',
    data: updatedWorkout,
  };
}

export async function updateWorkoutNotes({
  workoutId,
  notes,
}: {
  workoutId: string;
  notes: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User is not authenticated');
  }

  const updatedWorkout = await prisma.workout.update({
    where: {
      id: workoutId,
    },
    data: {
      notes,
    },
  });

  revalidatePath('/(signed-in)/workout/[id]', 'page')

  return {
    type: 'success',
    data: updatedWorkout,
  };
};

export async function createExercise({
  exerciseData,
}: {
  exerciseData: z.infer<typeof createExerciseFormSchema>;
}) {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error('User is not authenticated');
  }

  const createdExercise = await prisma.exercise.create({
    data: {
      name: exerciseData.name,
      displayName: exerciseData.name,
      description: exerciseData.description,
      isPublic: false,
      muscleGroups: {
        connect: exerciseData.muscleGroups.map((muscleGroup) => ({
          id: muscleGroup,
        })),
      },
      user: {
        connect: {
          id: userSession.user.id,
        },
      },
    },
  });

  return {
    type: 'success',
    data: createdExercise,
  };
}
