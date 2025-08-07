import { getFeaturedProducts } from '@/db/actions';
import EmptyList from '../globals/empty-list';
import SectionTitle from '../globals/section-title';
import ProductsGrid from '../products/products-grid';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) return <EmptyList />;

  return (
    <section>
      <SectionTitle text="Featured Products" />
      <ProductsGrid products={products} />
    </section>
  );
}
