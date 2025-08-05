import { auth } from '@clerk/nextjs/server';
import { Button } from '../ui/button';
import ProtectedAddToCartButton from './protected-add-to-cart-button';

export default async function AddToCartButton() {
  const { userId } = await auth();

  if (!userId) return <ProtectedAddToCartButton />;

  return <Button size="default">Add to cart</Button>;
}
