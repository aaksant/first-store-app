'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ActionButtonProps = {
  className?: string;
  icon?: ReactNode;
};

export default function ActionButton({ className, icon }: ActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="ghost"
      size="icon"
      className={cn('btn text-muted-foreground', className)}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : icon}
    </Button>
  );
}
