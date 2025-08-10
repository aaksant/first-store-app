import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import FavoriteToggleButton from './favorite-toggle-button';
import Link from 'next/link';
import { formatCurrency } from '@/utils/index';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  company: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  company
}: ProductCardProps) {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden shadow-sm py-0">
      <Link href={`/products/${id}`} className="block">
        <div className="overflow-hidden px-4 py-8">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-fill w-full h-64"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-[1.05rem] font-medium tracking-tight capitalize">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{company}</p>
          <h3 className="text-sm font-semibold text-muted-foreground">
            {formatCurrency(price)}
          </h3>
        </CardContent>
      </Link>
      <FavoriteToggleButton
        productId={id}
        as="overlay"
        className="right-3 bottom-2"
      />
    </Card>
  );
}
