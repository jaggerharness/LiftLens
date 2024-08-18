'use client';

import { Button } from '@/components/shad-ui/button';

export default function WorkoutPage({ params }: { params: { id: string } }) {
  console.log(params);

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
    <div className="flex flex-col gap-4">
      <h1>{`Workout ID: ${params.id}`}</h1>
      <Button variant={'outline'} onClick={handleAddNote}>
        Add Note
      </Button>
      <Button variant={'outline'} onClick={handlePause}>
        Pause
      </Button>
      <Button variant={'outline'} onClick={handleComplete}>
        Complete
      </Button>
      <Button variant={'outline'} onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
