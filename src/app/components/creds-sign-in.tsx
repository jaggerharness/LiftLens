'use client';

import { Button } from '@/components/shad-ui/button';
import { Input } from '@/components/shad-ui/input';
import { useToast } from '@/components/shad-ui/use-toast';
import { credentialsSignIn } from '@/server/actions/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shad-ui/form';
import { ForgotPasswordDialog } from './forgot-password-dialog';
import { signInSchema } from '@/lib/zod';

export function CredSignIn() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const [showError, setShowError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (showError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: toastMessage,
      });
      setShowError(false);
    }
  }, [showError, toast, toastMessage]);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await credentialsSignIn(values);
    if (result?.type === 'error') {
      setToastMessage(
        'An error occurred while trying to log you in. Check your credentials and try again.',
      );
      setShowError(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ForgotPasswordDialog />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
}
