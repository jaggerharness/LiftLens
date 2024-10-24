'use client';

import { Button } from "@/components/shad-ui/button";
import { Textarea } from "@/components/shad-ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { WorkoutWithExercises } from "@/lib/types";
import { updateWorkoutNotes } from "@/server/actions/actions";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WorkoutNotes({ data }: { data: WorkoutWithExercises }) {
    const { toast } = useToast();
    const [notes, setNotes] = useState(data?.notes);
    console.log(notes);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };

    async function updateNote(formData: FormData) {
        const res = await updateWorkoutNotes({ workoutId: data.id, notes: formData.get('notes') as string });
        if (res.type === 'success') {
            toast({
                title: 'Success',
                description: `Notes updated successfully!`,
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

    return (
        <>
            <h1>{'Notes'}</h1>
            <form className="flex flex-col" action={updateNote}>
                <Textarea onChange={handleChange} name="notes" placeholder='Enter workout notes...' value={notes ?? ''} />
                <Button variant={'secondary'} className='mt-4 ml-auto' type="submit">Update Notes</Button>
            </form>
        </>
    )
}