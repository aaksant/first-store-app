import type { Product } from '@prisma/client';
import ProductListItem from './product-list-item';

type ProductsListProps = { products: Product[] };

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="flex flex-col space-y-6">
      {products.map((product) => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </div>
  );
}
