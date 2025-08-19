'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ActionButtonProps = {
  className?: string;
  icon?: ReactNode;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
  size?: 'icon' | 'default' | 'sm' | 'lg';
  text?: string;
  pendingText?: string;
};

export default function ActionButton({
  className,
  icon,
  variant = 'ghost',
  size = 'icon',
  text,
  pendingText
}: ActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size={size}
      className={cn('btn', className)}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : icon}
      {pending ? pendingText : text}
    </Button>
  );
}
