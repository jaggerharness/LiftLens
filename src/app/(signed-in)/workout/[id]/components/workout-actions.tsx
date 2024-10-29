'use client';

import { Button } from '@/components/shad-ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  cancelWorkout,
  completeWorkout,
  pauseWorkout,
  startWorkout,
} from '@/server/actions/actions';
import { useWorkout } from '../active-workout-provider';
import { WorkoutWithExercises } from '@/lib/types';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export function WorkoutActions({ workoutPromise }: { workoutPromise: Promise<WorkoutWithExercises | null> }) {
  const { toast } = useToast();
  const workoutContext = useWorkout();
  const workout = use(workoutPromise);
  const router = useRouter();

  if (!workout) {
    return <div>Loading...</div>;
  }

  const handleResume = async () => {
    const res = await startWorkout({ workout });
    if (res.type === 'success') {
      workoutContext.setWorkout(res.data);
      toast({
        variant: 'success',
        title: 'Workout Resumed',
        description: 'Your workout has been resumed.',
      });
      router.refresh();
    }
  };

  const handlePause = async () => {
    const res = await pauseWorkout({ workout });
    if (res.type === 'success') {
      workoutContext.setWorkout(res.data);
      toast({
        variant: 'success',
        title: 'Workout Paused',
        description: 'Your workout has been paused.',
      });
      router.refresh();
    }
  };

  const handleComplete = async () => {
    const res = await completeWorkout({ workout });
    if (res.type === 'success') {
      workoutContext.setWorkout(res.data);
      toast({
        variant: 'success',
        title: 'Workout Completed',
        description: 'Your workout has been completed.',
      });
      router.refresh();
    }
  };

  const handleCancel = async () => {
    const res = await cancelWorkout({ workout });
    if (res.type === 'success') {
      workoutContext.setWorkout(res.data);
      toast({
        variant: 'success',
        title: 'Workout Canceled',
        description: 'Your workout has been canceled.',
      });
      router.refresh();
    }
  };

  return (
    <section className="flex justify-between">
      <div>
        {(workout.currentStatusId === 4 || workout.currentStatusId === 1) && (
          <Button
            className="max-w-fit"
            variant={'outline'}
            onClick={handleResume}
          >
            {workout.currentStatusId === 4 ? 'Resume Workout' : 'Start Workout'}
          </Button>
        )}
        {workout.currentStatusId === 2 && (
          <Button
            className="max-w-fit"
            variant={'secondary'}
            onClick={handlePause}
          >
            Pause
          </Button>
        )}
      </div>
      {workout.currentStatusId !== 3 && workout.currentStatusId !== 5 && (
        <div className="flex gap-4">
          <Button
            className="max-w-fit"
            variant={'default'}
            onClick={handleComplete}
          >
            Complete
          </Button>
          <Button
            className="max-w-fit"
            variant={'destructive'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </section>
  );
}
