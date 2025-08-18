'use client';

import AmountCounter from './amount-counter';
import { Product } from '@prisma/client';
import { ReactNode, useState } from 'react';
import FormContainer from '../form/form-container';
import { addToCartAction } from '@/db/actions';
import Subtotal from './subtotal';

type PurchasePanelProps = {
  product: Product;
  children: ReactNode;
};

export default function AmountSubtotal({
  product,
  children
}: PurchasePanelProps) {
  const [amount, setAmount] = useState<number>(1);

  return (
    <FormContainer action={addToCartAction}>
      <input type="hidden" name="productId" value={product.id} />
      <input type="hidden" name="amount" value={amount} />
      <div className="space-y-4">
        <h2 className="font-semibold tracking-tight">Set order</h2>
        <AmountCounter
          stock={product.stock}
          amount={amount}
          setAmount={setAmount}
        />
        <Subtotal price={product.price} amount={amount} />
        <div className="w-full">{children}</div>
      </div>
    </FormContainer>
  );
}
