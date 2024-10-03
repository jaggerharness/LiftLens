'use client';

import { Badge } from '@/components/shad-ui/badge';
import { Button } from '@/components/shad-ui/button';
import {
  Dialog,
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
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shad-ui/form';
import { Input } from '@/components/shad-ui/input';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shad-ui/toggle-group';
import { MuscleGroup } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useForm, useFieldArray} from 'react-hook-form';
import { z } from 'zod';

export default function CreateExerciseForm({ muscleGroups }: { muscleGroups: MuscleGroup[] }) {
  const formSchema = z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name is required'),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, 'Description is required'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="gap-1">
          <PlusCircle className="size-3.5" />
          Create New Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={() => console.log('submit')} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Create New Exercise</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new exercise.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Display Name"
                      type="name"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      type="description"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-sm text-muted-foreground'>Select Targeted Muscles:</p>
            <ToggleGroup variant={'outline'} type="multiple" className="flex-row flex-wrap gap-2">
              {muscleGroups.map((muscle) =>
                <ToggleGroupItem
                  key={muscle.id}
                  value={muscle.name}
                  className='rounded-3xl data-[state=on]:text-primary data-[state=on]:bg-transparent'
                >
                  {muscle.name}
                </ToggleGroupItem>
              )}
            </ToggleGroup>
            <DialogFooter>
              <Button type="submit">Create Exercise</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
