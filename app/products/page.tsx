import ProductsContainer from '@/components/products/products-container';

type ProductsPageProps = {
  searchParams: {
    layout?: string;
    search?: string;
  };
};

export default async function ProductsPage({
  searchParams
}: ProductsPageProps) {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';

  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}
