import { Product } from '@prisma/client';
import ProductCard from './product-card';

type ProductsGridProps = { products: Product[] };

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-center">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
