import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// For alignment
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-6xl px-8 xl:max-w-7xl', className)}>
      {children}
    </div>
  );
}
