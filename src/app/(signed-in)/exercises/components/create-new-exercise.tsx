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
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateExerciseForm() {
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

  // TODO: fetch these
  const muscles = [
    { id: 1, muscle: 'Biceps' },
    { id: 2, muscle: 'Triceps' },
    { id: 3, muscle: 'Back' },
    { id: 4, muscle: 'Hamstrings' },
    { id: 5, muscle: 'Biceps' },
    { id: 6, muscle: 'Triceps' },
    { id: 7, muscle: 'Back' },
    { id: 8, muscle: 'Hamstrings' }
  ];

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
            <ToggleGroup type="multiple" className="flex-row flex-wrap">
              {muscles.map((muscle) =>
                <ToggleGroupItem
                  key={muscle.id}
                  className="data-[state=on]:text-accent-foreground"
                  value={muscle.muscle}
                >
                  <Badge variant={'outline'}>{muscle.muscle}</Badge>
                </ToggleGroupItem>
              )}
            </ToggleGroup>
            <DialogFooter>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
