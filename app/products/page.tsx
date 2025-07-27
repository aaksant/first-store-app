import LoadingProductCard from '@/components/globals/loading-product-card';
import SectionTitle from '@/components/globals/section-title';
import ProductsContainer from '@/components/products/products-container';
import { Suspense } from 'react';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ layout?: string; search?: string }>;
}) {
  const layout = (await searchParams).layout || 'grid';
  const search = (await searchParams).search || '';

  return (
    <>
      <SectionTitle text="Our Products" />
      <Suspense fallback={<LoadingProductCard />}>
        <ProductsContainer layout={layout} search={search} />
      </Suspense>
    </>
  );
}
