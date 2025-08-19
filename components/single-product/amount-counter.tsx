'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

type AmountCounterProps = {
  stock: number;
  amount: number;
  setAmount: (amount: number) => void;
};

export default function AmountCounter({
  stock,
  amount,
  setAmount
}: AmountCounterProps) {
  const increaseAmount = () => {
    if (amount < stock) {
      setAmount(amount + 1);
    }
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
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
            type="button"
            disabled={amount <= 1}
            onClick={decreaseAmount}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex h-10 w-16 items-center justify-center border-x">
            <span className="text-sm font-medium">{amount}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="btn h-10 w-10 rounded-l-none"
            type="button"
            disabled={amount > stock}
            onClick={increaseAmount}
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
