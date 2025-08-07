import { SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ProtectedAddToCartButtonProps = {
  className?: string;
};

export default function ProtectedAddToCartButton({
  className
}: ProtectedAddToCartButtonProps) {
  return (
    <SignInButton>
      <Button size="default" className={cn('btn', className)}>
        Sign in
      </Button>
    </SignInButton>
  );
}
