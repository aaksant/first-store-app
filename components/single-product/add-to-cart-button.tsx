import { auth } from '@clerk/nextjs/server';
import { ShoppingCart } from 'lucide-react';
import ProtectedAddToCartButton from './protected-add-to-cart-button';
import ActionButton from '../form/action-button';

type AddToCartButtonProps = {
  className?: string;
};

export default async function AddToCartButton({
  className
}: AddToCartButtonProps) {
  const { userId } = await auth();

  if (!userId) return <ProtectedAddToCartButton className={className} />;

  return (
    <ActionButton
      className={className}
      icon={<ShoppingCart />}
      variant="default"
      size="default"
      text="Add to cart"
      pendingText="Adding item to cart"
    />
  );
}
