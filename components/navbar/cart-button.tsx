import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function CartButton() {
  // Temp
  const numOfItems = 10;

  return (
    <Button
      variant="outline"
      size="icon"
      className="btn flex justify-center items-center relative"
    >
      <Link href="/cart">
        <ShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {numOfItems}
        </span>
      </Link>
    </Button>
  );
}
