import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getItemsInCart } from '@/db/actions';

export default async function CartButton() {
  const itemsInCart = await getItemsInCart();

  return (
    <Button
      variant="outline"
      size="icon"
      className="btn flex justify-center items-center relative"
    >
      <Link href="/cart">
        <ShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {itemsInCart}
        </span>
      </Link>
    </Button>
  );
}
