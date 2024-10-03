'use client';

import { Badge } from '@/components/shad-ui/badge';
import { Button, buttonVariants } from '@/components/shad-ui/button';
import { Calendar } from '@/components/shad-ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shad-ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shad-ui/form';
import { Input } from '@/components/shad-ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shad-ui/popover';
import { ScrollArea } from '@/components/shad-ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shad-ui/table';
import { toast } from '@/hooks/use-toast';
import { ExerciseWithMuscleGroups } from '@/lib/types';
import { cn } from '@/lib/utils';
import { workoutFormSchema } from '@/lib/zod';
import { createWorkout } from '@/server/actions/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { PopoverClose } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { PlusCircle, Search, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

interface CreateWorkoutFormProps {
  exercises: ExerciseWithMuscleGroups[];
  mode: 'create' | 'edit';
  workout?: WorkoutFormValues;
}

export function CreateWorkoutForm({
  exercises,
  mode,
}: CreateWorkoutFormProps) {
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: '',
      date: new Date(),
    },
  });

  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workoutExercises',
  });

  const [open, setOpen] = useState(false);
  const [selectedIdArray, setSelectedIdArray] = useState<string[]>([]);
  const ref = useRef<HTMLButtonElement | null>(null);
  const popOverRef = useRef<HTMLButtonElement | null>(null);

  const handleSelected = (id: string) => {
    if (selectedIdArray.includes(id)) {
      setSelectedIdArray((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIdArray((prev) => [...prev, id]);
    }
  };

  const handleAddExercises = () => {
    selectedIdArray.forEach((id) => {
      addExercise(exercises.find((exercise) => exercise.id === id)!);
    });

    setSelectedIdArray([]);
    ref.current?.click();
  };

  useEffect(() => {
    setFilteredExercises(
      exercises.filter(
        (exercise) =>
          exercise.name
            .toLowerCase()
            .includes(searchQuery.trimEnd().toLowerCase()) ||
          exercise.displayName
            ?.toLowerCase()
            .includes(searchQuery.trimEnd().toLowerCase()) ||
          exercise.muscleGroups.some((muscleGroup) =>
            muscleGroup.name
              .toLowerCase()
              .includes(searchQuery.trimEnd().toLowerCase()),
          ),
      ),
    );
  }, [searchQuery, exercises]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  async function onSubmit(workoutData: any) {
    const res = await createWorkout({ workoutData });
    if (res.type === 'success') {
      setOpen(false);
      reset({
        workoutExercises: [],
      });
      router.refresh();
      toast({
        title: 'Workout Created',
        description: `Workout ${workoutData.name} created successfully!`,
        variant: 'success',
      });
      return;
    }
    toast({
      title: 'Error',
      description: `An unexpected error occurred. Please try again later.`,
      variant: 'destructive',
    });
  }

  function addExercise(exercise: ExerciseWithMuscleGroups) {
    const { id, displayName } = exercise;
    append(
      {
        exercise: { id, displayName: displayName ?? '' },
        sets: 3,
        reps: 10,
      },
      { shouldFocus: false },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        {mode === 'create' ? 'Create A Workout' : 'Edit Workout'}
      </DialogTrigger>
      <DialogClose
        onClick={() => {
          setSelectedIdArray([]);
          reset({
            name: '',
            workoutExercises: [],
          });
        }}
      />
      <DialogContent
        className="h-auto max-h-[85%] md:max-h-[75%] p-1 flex"
        onOpenAutoFocus={(e) => e.preventDefault()}
        tabIndex={-1}
        onInteractOutside={(_) => {
          setSelectedIdArray([]);
          reset({
            name: '',
            workoutExercises: [],
          });
        }}
      >
        <ScrollArea className="pt-8 pb-0 px-4">
          <DialogHeader>
            <DialogTitle>Create A Workout</DialogTitle>
            <DialogDescription>
              You can create a workout from scratch or use an existing template
            </DialogDescription>
          </DialogHeader>
          <Form {...form} handleSubmit={handleSubmit}>
            <form className="space-y-4 px-1" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>Workout Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that we will use to reference this
                      workout
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Workout Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-50 w-auto p-0" align="start">
                        <PopoverClose ref={popOverRef} />
                        <Calendar
                          className="pointer-events-auto"
                          mode="single"
                          selected={field.value}
                          onSelect={(e) => {
                            field.onChange(e);
                            popOverRef.current?.click();
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      We&rsquo;ll use this date to show when you start this
                      workout
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                  <CardDescription>
                    Select the exercises to include in this workout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table className={'relative'}>
                    {fields.length === 0 ? (
                      <TableBody>
                        <TableRow className="pointer-events-none">
                          <TableCell className="text-center text-small text-muted-foreground">
                            No exercises added yet. Add an exercise using the
                            button below.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <TableHeader>
                        <TableRow>
                          <TableHead>Exercise</TableHead>
                          <TableHead>Sets</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                    )}
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell className="font-semibold p-3">
                            {field.exercise.displayName}
                          </TableCell>
                          <TableCell className="p-3">
                            <FormField
                              control={control}
                              name={`workoutExercises.${index}.sets`}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className={
                                        'text-center sm:text-start [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none md:[&::-webkit-inner-spin-button]:appearance-auto md:[&::-webkit-outer-spin-button]:appearance-auto'
                                      }
                                      type="number"
                                      min={1}
                                      id={`workoutExercises.${index}.sets`}
                                      onFocus={(e) => e.target.select()}
                                      {...register(
                                        `workoutExercises.${index}.sets` as const,
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage>
                                    {errors.workoutExercises?.[index]?.sets && (
                                      <p>
                                        {
                                          errors.workoutExercises[index].sets
                                            .message
                                        }
                                      </p>
                                    )}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="p-3">
                            <FormField
                              control={control}
                              name={`workoutExercises.${index}.reps`}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className={
                                        'text-center sm:text-start [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none md:[&::-webkit-inner-spin-button]:appearance-auto md:[&::-webkit-outer-spin-button]:appearance-auto'
                                      }
                                      type="number"
                                      min={1}
                                      id={`workoutExercises.${index}.reps`}
                                      onFocus={(e) => e.target.select()}
                                      {...register(
                                        `workoutExercises.${index}.reps` as const,
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage>
                                    {errors.workoutExercises?.[index]?.reps && (
                                      <p>
                                        {
                                          errors.workoutExercises[index].reps
                                            .message
                                        }
                                      </p>
                                    )}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="p-3">
                            <Button
                              size={'sm'}
                              onClick={() => remove(index)}
                              variant={'destructive'}
                            >
                              <Trash2Icon className="size-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="size-3.5" />
                        Add Exercise
                      </Button>
                    </DialogTrigger>
                    <DialogClose
                      ref={ref}
                      onClick={() => setSelectedIdArray([])}
                    />
                    <DialogContent
                      className="h-[95vh] sm:h-3/4 flex flex-col"
                      onInteractOutside={(_) => {
                        setSelectedIdArray([]);
                      }}
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <DialogHeader>
                        <DialogTitle>Select Exercises</DialogTitle>
                        <DialogDescription>
                          <p>
                            Select the exercises you want to add to the workout.
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-background/95 mx-4 my-2 supports-[backdrop-filter]:bg-background/60">
                        <form>
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                            <Input
                              value={searchQuery}
                              onChange={handleOnChange}
                              placeholder="Search by exercise or muscle"
                              className="pl-8"
                            />
                          </div>
                        </form>
                      </div>
                      <ScrollArea className="flex-auto">
                        {filteredExercises.length === 0 ? (
                          <div className="text-pretty text-center text-muted-foreground">
                            No exercises found
                          </div>
                        ) : (
                          filteredExercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="flex flex-col gap-2 p-4 pt-0"
                            >
                              <button
                                key={exercise.id}
                                className={cn(
                                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                                  selectedIdArray.includes(exercise.id) &&
                                    'bg-muted border-primary',
                                )}
                                onClick={() => handleSelected(exercise.id)}
                              >
                                <div className="flex w-full flex-col gap-1">
                                  <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                      <div className="font-semibold">
                                        {exercise.displayName}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                  {exercise.description}
                                </div>
                                <div className="flex items-center gap-2">
                                  {exercise.muscleGroups.map((muscleGroup) => {
                                    return (
                                      <Badge
                                        key={muscleGroup.id}
                                        variant={'secondary'}
                                      >
                                        {muscleGroup.name}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </button>
                            </div>
                          ))
                        )}
                      </ScrollArea>
                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                          type="button"
                          onClick={() => setSelectedIdArray([])}
                          variant={'destructive'}
                          className={selectedIdArray.length > 0 ? '' : 'hidden'}
                        >
                          Clear Selected
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleAddExercises()}
                          className={selectedIdArray.length > 0 ? '' : 'hidden'}
                        >
                          {selectedIdArray.length > 0
                            ? `Add ${selectedIdArray.length} Exercises`
                            : 'Cancel'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              <div className="flex flex-col gap-4">
                <Button
                  className="w-1/2 flex mx-auto"
                  type="submit"
                  variant={'default'}
                >
                  Create Workout
                </Button>
                <Link href={'/exercises'} className="mb-4">
                  <Button
                    className="w-1/2 flex mx-auto"
                    type="submit"
                    variant={'outline'}
                  >
                    Manage Exercises
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
