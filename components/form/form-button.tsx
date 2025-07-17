'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

type ButtonSize = 'default' | 'sm' | 'lg';

type FormButtonProps = {
  text?: string;
  size?: ButtonSize;
  className?: string;
};

export default function FormButton({
  text,
  size = 'default',
  className
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size={size}
      className={cn('btn', className)}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
          Please wait...
        </span>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
}
