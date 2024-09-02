import { WorkoutStatusLog } from './types';

export function calculateStartedDuration(
  statusLogs: WorkoutStatusLog[],
): number {
  let totalStartedTime = 0;
  let startTime: Date | null = null;
  const workoutStartedId = 2;
  const workoutCompletedId = 3;
  const workoutPausedId = 4;
  const workoutCanceledId = 5;
  const workoutArchivedId = 7;

  // Iterate through the status logs to calculate total started time
  for (const log of statusLogs) {
    if (log.workoutStatusId === workoutStartedId) {
      startTime = new Date(log.timestamp);
    } else if (
      startTime &&
      (log.workoutStatusId === workoutPausedId ||
        log.workoutStatusId === workoutCompletedId ||
        log.workoutStatusId === workoutCanceledId)
    ) {
      totalStartedTime +=
        new Date(log.timestamp).getTime() - startTime.getTime();
      startTime = null;
    }

    // Break the loop if the workout is completed, canceled, or archived
    if (
      log.workoutStatusId === workoutCompletedId ||
      log.workoutStatusId === workoutCanceledId ||
      log.workoutStatusId === workoutArchivedId
    ) {
      break;
    }
  }

  // If the workout is currently started, add the time from the last start to now
  if (startTime) {
    totalStartedTime += new Date().getTime() - startTime.getTime();
  }

  // Return the total started time in seconds
  return Math.floor(totalStartedTime / 1000);
}
