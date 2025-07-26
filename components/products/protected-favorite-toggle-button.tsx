import { SignInButton } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ProtectedFavoriteToggleButtonProps = {
  className?: string;
};

export default function ProtectedFavoriteToggleButton({
  className
}: ProtectedFavoriteToggleButtonProps) {
  return (
    <SignInButton>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          'absolute rounded-full backdrop-blur-sm btn text-muted-foreground',
          className
        )}
      >
        <Heart className="stroke-red-500 fill-none" />
      </Button>
    </SignInButton>
  );
}
