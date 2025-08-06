import { auth } from '@clerk/nextjs/server';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import ProtectedAddToCartButton from './protected-add-to-cart-button';
import { cn } from '@/lib/utils';

type AddToCartButtonProps = {
  className?: string;
};

export default async function AddToCartButton({
  className
}: AddToCartButtonProps) {
  const { userId } = await auth();

  if (!userId) return <ProtectedAddToCartButton />;

  return (
    <Button size="default" className={cn('btn', className)}>
      <ShoppingCart />
      Add to cart
    </Button>
  );
}
