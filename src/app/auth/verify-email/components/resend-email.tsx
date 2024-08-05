'use client';

import { Button } from '@/components/shad-ui/button';
import { resendEmailVerification } from '@/server/actions/actions';
import { RefreshCwIcon } from 'lucide-react';

export function ResendEmail() {
  async function handleResendEmail() {
    await resendEmailVerification();
  }

  return (
    <Button onClick={handleResendEmail} type="submit" className="w-full">
      <RefreshCwIcon className="mr-2 size-4" />
      Resend Email
    </Button>
  );
}
