import { Button } from '@/components/shad-ui/button';
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shad-ui/dialog';
import { Input } from '@/components/shad-ui/input';
import { Label } from '@/components/shad-ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shad-ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shad-ui/table';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar } from '../shad-ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shad-ui/form';
import { toast } from './use-toast';

const workoutFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  date: z.date({
    required_error: 'Workout date required.',
  }),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

export function CreateWorkoutForm() {
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
  });

  function onSubmit(data: WorkoutFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form className="mx-4 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that we will use to reference this workout
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-auto p-0" align="start">
                  <Calendar
                    className="pointer-events-auto"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Exercise</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">
                    Flat DB Press (Heavy)
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="sets-1" className="sr-only">
                      Sets
                    </Label>
                    <Input id="sets-1" type="number" defaultValue="3" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="reps-1" className="sr-only">
                      Reps
                    </Label>
                    <Input id="reps-1" type="number" defaultValue="10" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    2-Grip Lat Pulldown
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="sets-2" className="sr-only">
                      Sets
                    </Label>
                    <Input id="sets-2" type="number" defaultValue="3" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="reps-2" className="sr-only">
                      Reps
                    </Label>
                    <Input id="reps-2" type="number" defaultValue="10" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Seated DB Shoulder Press
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="sets-3" className="sr-only">
                      Sets
                    </Label>
                    <Input id="sets-3" type="number" defaultValue="3" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="reps-3" className="sr-only">
                      Reps
                    </Label>
                    <Input id="reps-3" type="number" defaultValue="10" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Exercise
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select Exercise</DialogTitle>
                  <DialogDescription>
                    Select the exercise you want to add to this workout.
                  </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Exercise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Hack Squat</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Seated Hamstring Curl
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Weighted Pull-Up
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Cable Chest Press
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        DB Lateral Raise
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <DialogFooter>
                  <Button type="submit">Select</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
