import LoadingContainer from '@/components/globals/loading-container';
import FeaturedProducts from '@/components/home/featured-products';
import Hero from '@/components/home/hero';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
