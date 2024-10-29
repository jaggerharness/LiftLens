'use client';

import { calculateStartedDuration } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { WorkoutWithExercises } from '@/lib/types';

export function Stopwatch({ workoutData }: { workoutData: WorkoutWithExercises | null }) {
  const [stopwatchOffset, setStopwatchOffset] = useState(new Date());

  useEffect(() => {
    if (workoutData) {
      const newOffsetSeconds = calculateStartedDuration(
        workoutData.WorkoutStatusLog,
      );

      const newStopwatchOffset = new Date();
      newStopwatchOffset.setSeconds(
        newStopwatchOffset.getSeconds() + newOffsetSeconds,
      );
      setStopwatchOffset(newStopwatchOffset);
    }
  }, [workoutData]);

  const { seconds, minutes, hours, reset } = useStopwatch({
    autoStart:
    workoutData?.WorkoutStatusLog[workoutData.WorkoutStatusLog.length - 1]
        ?.workoutStatusId === 2,
    offsetTimestamp: stopwatchOffset,
  });

  useEffect(() => {
    if (workoutData) {
      reset(
        stopwatchOffset,
        workoutData.WorkoutStatusLog[workoutData.WorkoutStatusLog.length - 1]
          ?.workoutStatusId === 2,
      );
    }
  }, [workoutData, stopwatchOffset, reset]);

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
