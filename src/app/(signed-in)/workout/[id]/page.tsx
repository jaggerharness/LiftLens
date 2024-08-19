'use client';

import { Button } from '@/components/shad-ui/button';

export default function WorkoutPage({ params }: { params: { id: string } }) {
  const handleAddNote = () => {
    // Logic to add a note
  };

  const handlePause = () => {
    // Logic to pause the workout
  };

  const handleComplete = () => {
    // Logic to complete the workout
  };

  const handleCancel = () => {
    // Logic to cancel the workout
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 p-6">
      <h1>{`Workout ID: ${params.id}`}</h1>
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
    </div>
  );
}
