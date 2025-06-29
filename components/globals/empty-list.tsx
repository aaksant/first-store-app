import { cn } from '@/lib/utils';

type EmptyListProps = {
  text?: string;
  className?: string;
};

export default function EmptyList({
  text = 'No items found.',
  className
}: EmptyListProps) {
  return <h2 className={cn('text-xl tracking-tight', className)}>{text}</h2>;
}
