import LoadingProductCard from '@/components/globals/loading-product-card';
import FeaturedProducts from '@/components/home/featured-products';
import Hero from '@/components/home/hero';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingProductCard />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
