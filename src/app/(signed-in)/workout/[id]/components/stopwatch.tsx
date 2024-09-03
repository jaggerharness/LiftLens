'use client';

import { calculateStartedDuration } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useWorkout } from '../active-workout-provider';

export function Stopwatch() {
  const workoutContext = useWorkout();
  const workout = workoutContext.workout;

  const [stopwatchOffset, setStopwatchOffset] = useState(new Date());

  useEffect(() => {
    if (workout) {
      const newOffsetSeconds = calculateStartedDuration(
        workout.WorkoutStatusLog,
      );

      const newStopwatchOffset = new Date();
      newStopwatchOffset.setSeconds(
        newStopwatchOffset.getSeconds() + newOffsetSeconds,
      );
      setStopwatchOffset(newStopwatchOffset);
    }
  }, [workout]);

  const { seconds, minutes, hours, reset } = useStopwatch({
    autoStart:
      workout?.WorkoutStatusLog[workout.WorkoutStatusLog.length - 1]
        ?.workoutStatusId === 2,
    offsetTimestamp: stopwatchOffset,
  });

  useEffect(() => {
    if (workout) {
      reset(
        stopwatchOffset,
        workout.WorkoutStatusLog[workout.WorkoutStatusLog.length - 1]
          ?.workoutStatusId === 2,
      );
    }
  }, [workout, stopwatchOffset, reset]);

  return (
    <section className="flex gap-4">
      <div>
        <span>{'Elapsed Time: '}</span>
        <span className="font-semibold">
          {hours.toString().padStart(2, '0')}
        </span>
        :
        <span className="font-semibold">
          {minutes.toString().padStart(2, '0')}
        </span>
        :
        <span className="font-semibold">
          {seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
