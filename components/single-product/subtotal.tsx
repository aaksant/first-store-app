import { formatCurrency } from '@/utils';

type SubtotalProps = {
  price: number;
  amount: number;
};

export default function Subtotal({ price, amount }: SubtotalProps) {
  return (
    <div className="w-full bg-accent p-4 rounded-md flex justify-between items-center">
      <span className="text-sm font-semibold text-muted-foreground">
        Subtotal:
      </span>
      <span className="font-bold tracking-tight">
        {formatCurrency(price * amount)}
      </span>
    </div>
  );
}
