import { cn } from '@/lib/utils';

type EmptyListProps = {
  text?: string;
  className?: string;
};

export default function EmptyList({
  text = 'No items found.',
  className
}: EmptyListProps) {
  return (
    <h2
      className={cn(
        'text-xl tracking-tight text-center text-muted-foreground tracking-tight font-semibold',
        className
      )}
    >
      {text}
    </h2>
  );
}
