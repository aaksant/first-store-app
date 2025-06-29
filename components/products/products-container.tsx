import { getAllProducts } from '@/db/actions';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Grid2X2, Rows2 } from 'lucide-react';
import ProductsGrid from './products-grid';
import ProductsList from './products-list';
import NoProductFound from './no-product-found';

type ProductsContainerProps = { layout: string; search: string };

export default async function ProductsContainer({
  layout,
  search
}: ProductsContainerProps) {
  const products = await getAllProducts({ search });
  const totalProducts = products.length;
  const searchQuery = search ? `&search=${search}` : '';

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg tracking-tight">
            {totalProducts} product{totalProducts > 1 && 's'}
          </h4>
          <div className="space-x-2">
            <Button
              className="btn"
              variant={layout === 'grid' ? 'default' : 'outline'}
              size="icon"
              asChild
            >
              <Link href={`products?layout=grid${searchQuery}`}>
                <Grid2X2 />
              </Link>
            </Button>
            <Button
              className="btn"
              variant={layout === 'list' ? 'default' : 'outline'}
              size="icon"
              asChild
            >
              <Link href={`products?layout=list${searchQuery}`}>
                <Rows2 />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-12">
        {totalProducts === 0 ? (
          <NoProductFound />
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </section>
    </>
  );
}
