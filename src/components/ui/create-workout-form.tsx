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
import { ListFilter, PlusCircle, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar } from '../shad-ui/calendar';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../shad-ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shad-ui/form';
import { ScrollArea } from '../shad-ui/scroll-area';
import { Separator } from '../shad-ui/separator';
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
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                We&rsquo;ll use this date to show when you start this workout
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
              <DialogContent className="sm:max-w-[425px] h-3/4">
                <DialogHeader>
                  <DialogTitle>Select Exercise</DialogTitle>
                  <DialogDescription>
                    Select the exercise you want to add to this workout.
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="bg-background/95 mx-4 my-2 supports-[backdrop-filter]:bg-background/60">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search" className="pl-8" />
                    </div>
                  </form>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Upcoming
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Completed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Skipped
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <ScrollArea className="h-full">
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    <button
                      key={1}
                      className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                        // mail.selected === item.id && 'bg-muted'
                      )}
                      onClick={() => console.log('clicked')}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {'Weighted Pull-Up'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {'This is a description of the exercise'}
                        </div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {'This is a description of the exercise'}
                        {/* {item.text.substring(0, 300)} */}
                      </div>
                    </button>
                  </div>
                </ScrollArea>

                <DialogFooter>
                  <Button type="button">Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
