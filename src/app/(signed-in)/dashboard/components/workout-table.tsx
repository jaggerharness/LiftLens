"use client";

import { Badge } from "@/components/shad-ui/badge";
import { Button } from "@/components/shad-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shad-ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shad-ui/dialog";
import { ScrollArea } from "@/components/shad-ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shad-ui/table";
import { ExerciseWithMuscleGroups, WorkoutWithExercises } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarDateRangePicker } from "./date-range-picker";
import { EditWorkout } from "./edit-workout";

export function WorkoutTable({
  workouts,
  exercisesPromise,
}: {
  workouts: WorkoutWithExercises[];
  exercisesPromise: Promise<ExerciseWithMuscleGroups[]>;
}) {
  return (
    <Card>
      <CardHeader className="px-7 flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>Upcoming Workouts</CardTitle>
          <CardDescription className="pt-2">
            Workouts for the selected date range
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2 pt-2 md:pt-0">
          <CalendarDateRangePicker />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="pointer-events-none">
              <TableHead>Workout</TableHead>
              <TableHead className="hidden sm:table-cell">
                Estimated Time
              </TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No workouts found
                </TableCell>
              </TableRow>
            ) : (
              workouts.map((workout) => (
                <Dialog key={workout.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer">
                      <TableCell>
                        <div className="font-medium">{workout.name}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {workout.workoutExercises.length * 10} mins
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs -ml-1" variant="outline">
                          {workout.status.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(workout.workoutDate), "EEEE, MMM do")}
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col max-h-full sm:max-h-[85vh]">
                    <DialogHeader>
                      <DialogTitle>Workout Details</DialogTitle>
                      <DialogDescription>
                        View workout details here. Make sure to start workout
                        when you are ready.
                      </DialogDescription>
                    </DialogHeader>
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
                          {workout.workoutExercises.map((exercise) => (
                            <TableRow
                              className="md:h-10 h-14"
                              key={exercise.id}
                            >
                              <TableCell>
                                {exercise.exercise.displayName}
                              </TableCell>
                              <TableCell className="text-center">
                                {exercise.sets}
                              </TableCell>
                              <TableCell className="text-center">
                                {exercise.reps}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <DialogFooter className="mt-2">
                      {workout.currentStatusId !== 2 &&
                        workout.currentStatusId !== 3 &&
                        workout.currentStatusId !== 5 && (
                          <EditWorkout
                            workout={workout}
                            exercisesPromise={exercisesPromise}
                          />
                        )}
                      <Link tabIndex={-1} href={`/workout/${workout.id}`}>
                        <Button type="button">View Workout</Button>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
