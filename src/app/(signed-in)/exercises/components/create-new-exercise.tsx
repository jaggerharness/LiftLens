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
import { createExerciseFormSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

type CreateExerciseFormSchema = z.infer<typeof createExerciseFormSchema>;

export default function CreateExerciseForm({ muscleGroups }: { muscleGroups: MuscleGroup[] }) {
  const form = useForm<CreateExerciseFormSchema>({
    resolver: zodResolver(createExerciseFormSchema),
    defaultValues: {
      name: '',
      description: '',
      muscleGroups: [],
    },
  });

  async function onSubmit(formData: any) {
    console.log({ formData });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="gap-1">
          <PlusCircle className="size-3.5" />
          Create New Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form} handleSubmit={form.handleSubmit}>
          <form className="space-y-4 px-1" onSubmit={() => console.log('submitted')}>
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
            <Controller
              name="muscleGroups"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      variant={'outline'}
                      type="multiple"
                      className="flex-row flex-wrap gap-2"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      {muscleGroups.map((muscle) => (
                        <ToggleGroupItem
                          key={muscle.id}
                          value={muscle.name}
                          className='rounded-3xl data-[state=on]:text-primary data-[state=on]:bg-transparent'
                        >
                          {muscle.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Exercise</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
