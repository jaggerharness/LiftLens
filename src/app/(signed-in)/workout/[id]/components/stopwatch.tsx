'use client';

import { WorkoutWithExercises } from '@/lib/types';
import { useStopwatch } from 'react-timer-hook';

export function Stopwatch({ workout }: { workout: WorkoutWithExercises }) {
  const workoutStarted = workout.WorkoutStatusLog.find(
    (element) => element.workoutStatusId === 2,
  ); // TODO - fix me

  let offsetSeconds = 0;

  if (workoutStarted) {
    const workoutStartTime = new Date(workoutStarted.timestamp).getTime();
    const currentTime = Date.now();
    offsetSeconds = Math.floor((currentTime - workoutStartTime) / 1000);
  }

  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + offsetSeconds);

  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
    offsetTimestamp: stopwatchOffset,
  });

  return (
    <section className="flex gap-4">
      <div>
        <span>{hours.toString().padStart(2, '0')}</span>:
        <span>{minutes.toString().padStart(2, '0')}</span>:
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
    </section>
  );
}
