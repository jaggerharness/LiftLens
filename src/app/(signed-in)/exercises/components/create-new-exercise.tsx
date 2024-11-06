"use client";

import { Button } from "@/components/shad-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shad-ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shad-ui/form";
import { Input } from "@/components/shad-ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shad-ui/toggle-group";
import { MuscleGroup } from "@/lib/types";
import { createExerciseFormSchema } from "@/lib/zod";
import { createExercise } from "@/server/actions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type CreateExerciseFormSchema = z.infer<typeof createExerciseFormSchema>;

export default function CreateExerciseForm({
  muscleGroups,
}: {
  muscleGroups: MuscleGroup[];
}) {
  const form = useForm<CreateExerciseFormSchema>({
    resolver: zodResolver(createExerciseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      muscleGroups: [],
    },
  });

  const router = useRouter();
  const dialogRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(values: z.infer<typeof createExerciseFormSchema>) {
    const res = await createExercise({ exerciseData: values });
    if (res.type === "success") {
      dialogRef.current?.click();
      toast({
        title: "Exercise Created",
        description: `Exercise ${values.name} created successfully!`,
        variant: "success",
      });
      router.refresh();
      return;
    }
    toast({
      title: "Error",
      description: `An unexpected error occurred. Please try again later.`,
      variant: "destructive",
    });
  }

  return (
    <Dialog>
      <DialogClose ref={dialogRef} />
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="gap-1">
          <PlusCircle className="size-3.5" />
          Create New Exercise
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
        tabIndex={-1}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("Form submission errors:", errors);
            })}
            className="space-y-4"
          >
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
            <p className="text-sm text-muted-foreground">
              Select Targeted Muscles:
            </p>
            <FormField
              control={form.control}
              name="muscleGroups"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      variant={"outline"}
                      type="multiple"
                      className="flex-row flex-wrap gap-2"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {muscleGroups.map((group) => (
                        <ToggleGroupItem
                          key={group.id}
                          value={group.id}
                          className="data-[state=on]:border-primary/30"
                        >
                          {group.name}
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
