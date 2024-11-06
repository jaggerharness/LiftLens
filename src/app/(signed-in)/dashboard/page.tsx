import { Metadata } from "next";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shad-ui/card";
// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { ExerciseWithMuscleGroups, WorkoutWithExercises } from "@/lib/types";
// import { endOfWeek, startOfWeek } from "date-fns";
import { CreateWorkoutDialog } from "./components/create-workout-drawer";
// import { WorkoutTable } from "./components/workout-table";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "LiftLens Dashboard",
};

// const zeroOutTime = (date: Date) => {
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// };

// const setEndOfDay = (date: Date) => {
//   date.setHours(23);
//   date.setMinutes(59);
//   date.setSeconds(59);
//   date.setMilliseconds(999);
//   return date;
// };

// async function getExercises(): Promise<ExerciseWithMuscleGroups[]> {
//   const session = await auth();
//   return prisma.exercise.findMany({
//     where: {
//       OR: [{ isPublic: true }, { createdBy: session?.user?.id }],
//     },
//     include: {
//       muscleGroups: true,
//     },
//   });
// }

// async function getWorkouts({
//   start,
//   end,
// }: {
//   start: string | undefined;
//   end: string | undefined;
// }): Promise<WorkoutWithExercises[]> {
//   const session = await auth();
//   const startParam = start ? zeroOutTime(new Date(start)) : undefined;
//   const endParam = end
//     ? setEndOfDay(new Date(end))
//     : start
//       ? setEndOfDay(new Date(start))
//       : undefined;

//   const startRangeValue =
//     startParam ?? zeroOutTime(startOfWeek(new Date(), { weekStartsOn: 1 }));
//   const endRangeValue =
//     endParam ?? setEndOfDay(endOfWeek(new Date(), { weekStartsOn: 1 }));

//   return prisma.workout.findMany({
//     where: {
//       createdBy: session?.user?.id,
//       workoutDate: {
//         gte: startRangeValue,
//         lt: endRangeValue,
//       },
//     },
//     orderBy: { workoutDate: "asc" },
//     include: {
//       workoutExercises: {
//         include: {
//           exercise: {
//             include: {
//               muscleGroups: true,
//             },
//           },
//         },
//       },
//       status: true,
//       WorkoutStatusLog: true,
//     },
//   });
// }

export default async function DashboardPage(props: {
  searchParams?: Promise<{
    start?: string;
    end?: string;
  }>;
}) {
  console.log(props);
  // const searchParams = await props.searchParams;
  // const workoutsPromise = getWorkouts({
  //   start: searchParams?.start,
  //   end: searchParams?.end,
  // });
  // const exercisesPromise = getExercises();
  return (
    <main>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Workouts</CardTitle>
              <CardDescription className="text-balance leading-relaxed flex flex-row">
                Create and manage your upcoming workouts.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <CreateWorkoutDialog />
            </CardFooter>
          </Card>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <WorkoutTable
            workoutsPromise={workoutsPromise}
            exercisesPromise={exercisesPromise}
          /> */}
        </Suspense>
      </div>
    </main>
  );
}
