import LoadingContainer from '@/components/globals/loading-container';
import SectionTitle from '@/components/globals/section-title';
import NoProductFound from '@/components/products/no-product-found';
import ProductsGrid from '@/components/products/products-grid';
import { getFavoriteProducts } from '@/db/actions';
import { Suspense } from 'react';

export default async function FavoritesPage() {
  const favoriteProducts = (await getFavoriteProducts()).map(
    (favoriteProduct) => favoriteProduct.product
  );
  const totalFavorites = favoriteProducts.length;

  return (
    <>
      <SectionTitle text="Favorites" />
      <Suspense fallback={<LoadingContainer />}>
        {totalFavorites === 0 ? (
          <NoProductFound text="You have no favorites" />
        ) : (
          <ProductsGrid products={favoriteProducts} />
        )}
      </Suspense>
    </>
  );
}
