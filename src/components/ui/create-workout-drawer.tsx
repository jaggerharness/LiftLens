'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shad-ui/drawer';
import { buttonVariants } from '@/components/shad-ui/button';
import React from 'react';
import { CreateWorkoutForm } from './create-workout-form';

export function CreateWorkoutDrawer() {
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: 'default' })}>
        Create A Workout
      </DrawerTrigger>
      <DrawerContent className="flex items-center space-y-6">
        <DrawerHeader>
          <DrawerTitle>Create A Workout</DrawerTitle>
          <DrawerDescription>
            You can create a workout from scratch or use a preexisting template
            (TODO)
          </DrawerDescription>
        </DrawerHeader>
        <CreateWorkoutForm />
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
