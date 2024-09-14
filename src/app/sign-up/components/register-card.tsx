'use client';

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shad-ui/form';
import { Input } from '@/components/shad-ui/input';
import { useToast } from '@/hooks/use-toast';
import { signInSchema } from '@/lib/zod';
import { registerUser } from '@/server/actions/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/dist/client/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterCard() {
  const { toast } = useToast();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    if (showSuccess) {
      toast({
        variant: 'success',
        title: 'Account Created!',
        description: toastMessage,
      });
      setShowSuccess(false);
      redirect('/auth/verify-email');
    }
  }, [showError, showSuccess, toast, toastMessage]);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await registerUser({ values });
    if (result.type === 'error') {
      setToastMessage(result.message);
      setShowError(true);
    } else {
      setToastMessage('Please verify your email to login.');
      setShowSuccess(true);
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
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
                          placeholder="Create a password"
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
                <Button type="submit" className="mt-3 w-full">
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center text-sm">
        Already have an account?
        <Link className="hover:text-primary mt-4" href="/">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
