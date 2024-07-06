'use client';

import { resetPassword } from '@/server/actions/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../shad-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../shad-ui/form';
import { Input } from '../shad-ui/input';
import { useToast } from './use-toast';

export function ResetPasswordForm({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await resetPassword({
      userId: userId,
      password: values.password,
      token: token,
    });
    toast({
      variant: 'success',
      title: 'Password Reset',
      description: 'Your password has been reset. Please, sign in!',
    });
    router.push('/');
  }

  return (
    <div className="grid gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Reset Password"
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
          <Button type="submit" className="w-full">
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
}
