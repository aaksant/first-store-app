'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

type QuantityCounterProps = {
  stock: number;
};

export default function QuantityCounter({ stock }: QuantityCounterProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className="btn h-10 w-10 rounded-r-none"
            disabled={quantity <= 1}
            onClick={decreaseQuantity}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex h-10 w-16 items-center justify-center border-x bg-background text-sm font-medium">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="btn h-10 w-10 rounded-l-none"
            disabled={quantity > stock}
            onClick={increaseQuantity}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {stock} items available
        </span>
      </div>
    </>
  );
}
