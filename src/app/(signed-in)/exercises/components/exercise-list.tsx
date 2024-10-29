'use client';
import { Badge } from '@/components/shad-ui/badge';
import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shad-ui/dropdown-menu';
import { Input } from '@/components/shad-ui/input';
import { ExerciseWithMuscleGroups, MuscleGroup } from '@/lib/types';
import { FilterIcon } from 'lucide-react';
import { use, useMemo, useState } from 'react';
import CreateExerciseForm from './create-new-exercise';
import { cn } from '@/lib/utils';

export default function ExerciseList({
  exercisesPromise,
  muscleGroups,
}: {
  exercisesPromise: Promise<ExerciseWithMuscleGroups[]>;
  muscleGroups: MuscleGroup[];
}) {
  const [filters, setFilters] = useState<{ muscleGroups: MuscleGroup[] }>({
    muscleGroups: [],
  });
  const exercises = use(exercisesPromise);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch =
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.displayName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        searchQuery === '';
      const matchesFilters = filters.muscleGroups.every((filter) =>
        exercise.muscleGroups.some(
          (muscleGroup) => muscleGroup.id === filter.id,
        ),
      );
      return matchesSearch && matchesFilters;
    });
  }, [exercises, searchQuery, filters.muscleGroups]);

  const handleFilterChange = (muscleGroup: MuscleGroup) => {
    if (filters.muscleGroups.includes(muscleGroup)) {
      setFilters({
        muscleGroups: filters.muscleGroups.filter(
          (group) => group !== muscleGroup,
        ),
      });
    } else {
      setFilters({
        muscleGroups: [...filters.muscleGroups, muscleGroup],
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="px-8 pt-8">
        <div className="flex md:flex-row md:justify-between flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Exercise Library
            </h2>
            <CreateExerciseForm muscleGroups={muscleGroups} />
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-background text-foreground rounded-md px-4 py-2 w-full max-w-md"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={cn(
                  'flex items-center gap-2 focus-visible:ring-0 focus-visible:ring-offset-0',
                  filters.muscleGroups.length === 0 ? 'border-input' : 'border-primary'
                )}>
                  <FilterIcon className="size-5" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Muscle Groups</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {muscleGroups.map((group) => (
                  <DropdownMenuCheckboxItem
                    key={group.id}
                    checked={filters.muscleGroups.includes(group)}
                    onCheckedChange={() => handleFilterChange(group)}
                  >
                    {group.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{exercise.displayName}</CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroups.map((muscleGroup) => (
                  <Badge
                    variant={'secondary'}
                    className="text-primary"
                    key={muscleGroup.id}
                  >
                    {muscleGroup.name}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
