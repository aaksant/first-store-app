import AdminProductsTable from '@/components/admin/admin-products-table';
import { Suspense } from 'react';
import Loading from './loading';

type AdminProductsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminProductsPage({
  searchParams
}: AdminProductsPageProps) {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight mb-8">
        Your products
      </h1>
      <Suspense fallback={<Loading />}>
        <AdminProductsTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}
