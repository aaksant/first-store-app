import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
import FavoriteToggleButton from './favorite-toggle-button';

type ProductListItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  company?: string;
};

export default function ProductListItem({
  id,
  name,
  price,
  image,
  company
}: ProductListItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <Card className="rounded-sm py-0 border shadow-none">
        <CardContent className="flex gap-x-6 p-4 relative">
          <div className="relative w-28 h-28">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-sm"
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            />
          </div>
          <div className="max-w-xl">
            <h3 className="text-lg font-medium tracking-tight capitalize">
              {name}
            </h3>
            {company && (
              <p className="text-sm sm:text-base text-muted-foreground">
                {company}
              </p>
            )}
          </div>
          <h3 className="font-semibold ml-auto">{formatCurrency(price)}</h3>
          <FavoriteToggleButton productId={id} className="right-3 bottom-3" />
        </CardContent>
      </Card>
    </Link>
  );
}
