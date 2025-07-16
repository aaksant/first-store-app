'use client';

import { ActionFunction } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { ReactNode, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

type FormContainerProps = {
  action: ActionFunction;
  children?: ReactNode;
};

export default function FormContainer({
  action,
  children
}: FormContainerProps) {
  const [state, formAction] = useActionState(action, {
    status: 'idle',
    message: ''
  });
  const router = useRouter();

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      router.refresh();
    }
    if (state.status === 'error') {
      toast.error(state.message);
      router.refresh();
    }
  }, [state, router]);

  return <form action={formAction}>{children}</form>;
}
