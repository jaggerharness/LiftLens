'use client';

import { WorkoutWithExercises } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

interface WorkoutContextType {
  workout: WorkoutWithExercises | null;
  setWorkout: (workout: WorkoutWithExercises) => void;
}

export const ActiveWorkoutContext = createContext<WorkoutContextType>({
  workout: null,
  setWorkout: () => { },
});

export default function ActiveWorkoutProvider({
  children,
  workoutData,
}: {
  children: React.ReactNode;
  workoutData: WorkoutWithExercises;
}) {
  const [workout, setWorkout] = useState(workoutData);

  return (
    <ActiveWorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}

export const useWorkout = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
