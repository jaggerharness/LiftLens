'use client';

import { Button } from '@/components/shad-ui/button';
import { useToast } from '@/components/shad-ui/use-toast';
import { WorkoutWithExercises } from '@/lib/types';
import {
  cancelWorkout,
  completeWorkout,
  pauseWorkout,
} from '@/server/actions/actions';

export function WorkoutActions({ workout }: { workout: WorkoutWithExercises }) {
  const { toast } = useToast();

  const handleAddNote = () => {
    // Logic to add a note
  };

  const handlePause = async () => {
    const res = await pauseWorkout({ workout });
    if (res.type === 'success') {
      toast({
        variant: 'success',
        title: res.message,
        description: 'Your workout has been paused.',
      });
    }
  };

  const handleComplete = async () => {
    const res = await completeWorkout({ workout });
    if (res.type === 'success') {
      toast({
        variant: 'success',
        title: res.message,
        description: 'Your workout has been completed.',
      });
    }
  };

  const handleCancel = async () => {
    const res = await cancelWorkout({ workout });
    if (res.type === 'success') {
      toast({
        variant: 'success',
        title: res.message,
        description: 'Your workout has been canceled.',
      });
    }
  };

  return (
    <section className="flex gap-4">
      <Button className="max-w-fit" variant={'outline'} onClick={handleAddNote}>
        Add Note
      </Button>
      <Button className="max-w-fit" variant={'secondary'} onClick={handlePause}>
        Pause
      </Button>
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
    </section>
  );
}
