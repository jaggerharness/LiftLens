'use client';

import { Badge } from '@/components/shad-ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shad-ui/table';
import { WorkoutWithExercises } from '@/lib/types';
import { format } from 'date-fns';

export function WorkoutTable({
  workouts,
}: {
  workouts: WorkoutWithExercises[];
}) {
  const handleRowClick = (workoutId: string) => {
    console.log(`Workout ID: ${workoutId}`);
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Upcoming Workouts</CardTitle>
        <CardDescription>Workouts for the week</CardDescription>
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
            {workouts.map((workout) => (
              <TableRow
                onClick={() => handleRowClick(workout.id)}
                className="cursor-pointer"
                key={workout.id}
              >
                <TableCell>
                  <div className="font-medium">{workout.name}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {workout.workoutExercises.length * 10} mins
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs -ml-1" variant="outline">
                    {workout.workoutDate >=
                    new Date(new Date().setHours(0, 0, 0, 0))
                      ? 'Upcoming'
                      : 'Completed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(workout.workoutDate), 'EEEE, MMM do')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
