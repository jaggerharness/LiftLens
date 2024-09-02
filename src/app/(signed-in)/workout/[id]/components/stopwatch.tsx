'use client';

import { calculateStartedDuration } from '@/lib/helpers';
import { WorkoutWithExercises } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

export function Stopwatch({ workout }: { workout: WorkoutWithExercises }) {
  const [workoutLogs, setWorkoutLogs] = useState(workout.WorkoutStatusLog);
  const [offsetSeconds, setOffsetSeconds] = useState(
    calculateStartedDuration(workoutLogs),
  );

  useEffect(() => {
    setWorkoutLogs(workout.WorkoutStatusLog);
  }, [workout.WorkoutStatusLog]);

  useEffect(() => {
    setOffsetSeconds(calculateStartedDuration(workoutLogs));
  }, [workoutLogs]);

  // Set the stopwatch offset
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + offsetSeconds);

  const { seconds, minutes, hours } = useStopwatch({
    autoStart: workoutLogs[workoutLogs.length - 1]?.workoutStatusId === 2,
    offsetTimestamp: stopwatchOffset,
  });

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
