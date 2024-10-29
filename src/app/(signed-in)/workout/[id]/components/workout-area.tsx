/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { WorkoutWithExercises } from "@/lib/types";
import { use } from "react";
import { Stopwatch } from "./stopwatch";
import { ScrollArea } from "@/components/shad-ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shad-ui/table";
import { WorkoutAreaSkeleton } from "./workout-area-skeleton";

export function WorkoutArea({
  workoutPromise,
}: {
  workoutPromise: Promise<WorkoutWithExercises | null>;
}) {
  const workoutData = use(workoutPromise);
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>
          {"Workout: "}
          <span className="font-semibold">{workoutData?.name}</span>
        </h1>
        <Stopwatch workoutData={workoutData} />
      </div>
      <ScrollArea className="m-2 px-2 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="pointer-events-none">
              <TableHead>Exercise</TableHead>
              <TableHead className="text-center">Sets</TableHead>
              <TableHead className="text-center">Reps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workoutData?.workoutExercises.map((exercise) => (
              <TableRow className="md:h-10 h-14" key={exercise.id}>
                <TableCell>{exercise.exercise.displayName}</TableCell>
                <TableCell className="text-center">{exercise.sets}</TableCell>
                <TableCell className="text-center">{exercise.reps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
