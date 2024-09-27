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
              <ToggleGroupItem
                className="data-[state=on]:text-accent-foreground"
                value="a"
              >
                <Badge variant={'outline'}>These will be muscles soon</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="b">
                <Badge variant={'outline'}>B</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="c">
                <Badge variant={'outline'}>C</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="d">
                <Badge variant={'outline'}>D</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="e">
                <Badge variant={'outline'}>E</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="f">
                <Badge variant={'outline'}>F</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="g">
                <Badge variant={'outline'}>G</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="h">
                <Badge variant={'outline'}>H</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="i">
                <Badge variant={'outline'}>I</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="j">
                <Badge variant={'outline'}>J</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="k">
                <Badge variant={'outline'}>K</Badge>
              </ToggleGroupItem>
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
