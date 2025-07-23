import AdminProductsTable from '@/components/admin/admin-products-table';
import { Suspense } from 'react';
import Loading from './loading';

export default function AdminProductsPage() {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight mb-8">
        Your products
      </h1>
      <Suspense fallback={<Loading />}>
        <AdminProductsTable />
      </Suspense>
    </>
  );
}
