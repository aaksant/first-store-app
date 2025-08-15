import { SignInButton } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ProtectedFavoriteToggleButtonProps = {
  className?: string;
  as: 'overlay' | 'inline';
};

export default function ProtectedFavoriteToggleButton({
  className,
  as
}: ProtectedFavoriteToggleButtonProps) {
  const overlayStyle = 'btn absolute rounded-full backdrop-blur-sm';
  const inlineStyle = 'btn rounded-md py-2 px-6 border';

  return (
    <SignInButton>
      <Button
        size="icon"
        variant="ghost"
        className={cn(as === 'overlay' ? overlayStyle : inlineStyle, className)}
      >
        <Heart className="stroke-red-500 fill-none" />
      </Button>
    </SignInButton>
  );
}
