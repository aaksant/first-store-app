'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoaderCircle, Pen, Trash2 } from 'lucide-react';

type ActionType = 'edit' | 'delete';

export default function ActionButton({
  actionType
}: {
  actionType: ActionType;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="ghost"
      size="icon"
      className={`btn text-muted-foreground ${
        actionType === 'edit'
          ? 'hover:text-primary hover:bg-blue-50'
          : 'hover:text-destructive hover:bg-red-50'
      }`}
    >
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : actionType === 'edit' ? (
        <Pen />
      ) : (
        <Trash2 />
      )}
    </Button>
  );
}
