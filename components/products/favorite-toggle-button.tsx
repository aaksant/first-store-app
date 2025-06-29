import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type FavoriteToggleButtonProps = {
  productId: string;
  className?: string;
};

export default function FavoriteToggleButton({
  productId,
  className
}: FavoriteToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('absolute rounded-full backdrop-blur-sm btn', className)}
    >
      <Heart className="w-5 h-5 stroke-red-500" />
    </Button>
  );
}
