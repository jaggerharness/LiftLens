'use client';

import { sendPasswordReset } from '@/server/actions/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../shad-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shad-ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../shad-ui/form';
import { Input } from '../shad-ui/input';

export function ForgotPasswordDialog() {
  const [submitted, setSubmitted] = useState(false);

  const formSchema = z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    await sendPasswordReset(values.email);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-left font-medium hover:text-primary text-white tracking-tight">
        Forgot Password?
      </DialogTrigger>
      {!submitted ? (
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <DialogHeader>
                <DialogTitle>Forgot Password?</DialogTitle>
                <DialogDescription>
                  If you&rsquo;ve forgotten your password, enter your email
                  below. We&rsquo;ll send you a link to reset your password if
                  there&rsquo;s an account associated with that email address.
                </DialogDescription>
              </DialogHeader>
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
              <DialogFooter>
                <Button type="submit">Continue</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      ) : (
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Check your email</DialogTitle>
            <DialogDescription>
              If there&rsquo;s an account associated with the provided email
              address, you will receive a link containing further instructions
              to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            If you haven&rsquo;t received an email in the next few minutes use
            the button below to resend the reset form, or{' '}
            <span
              className="text-primary hover:text-primary/90 hover:cursor-pointer"
              onClick={() => setSubmitted(false)}
            >
              try with a new email
            </span>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Resend Email
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
