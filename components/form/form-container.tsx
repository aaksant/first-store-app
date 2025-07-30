'use client';

import { ActionFunction } from '@/utils/types';
import { ReactNode, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

type FormContainerProps = {
  action: ActionFunction;
  children?: ReactNode;
  className?: string;
};

export default function FormContainer({
  action,
  children,
  className
}: FormContainerProps) {
  const [state, formAction] = useActionState(action, {
    status: 'idle',
    message: ''
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    }
    if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}
