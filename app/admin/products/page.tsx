import ActionButton from '@/components/form/action-button';
import FormContainer from '@/components/form/form-container';
import EmptyList from '@/components/globals/empty-list';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { deleteProductAction, getAdminProducts } from '@/db/actions';
import { formatCurrency } from '@/utils/format';
import Link from 'next/link';

function DeleteActionButton({ id }: { id: string }) {
  return (
    // bind prefills deleteProductAction with prevState.id, with the id argument
    <FormContainer action={deleteProductAction.bind(null, { id })}>
      <ActionButton actionType="delete" />
    </FormContainer>
  );
}

export default async function AdminProductsPage() {
  const adminProducts = await getAdminProducts();

  if (adminProducts.length === 0) return <EmptyList />;

  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight mb-8">
        Your products
      </h1>
      <div className="border p-8 rounded-sm">
        <Table>
          <TableCaption>Total products: {adminProducts.length}</TableCaption>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminProducts.map(({ id, name, company, price }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/products/${id}`}
                    className="underline text-primary capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${id}/edit`}>
                    <ActionButton actionType="edit" />
                  </Link>
                  <DeleteActionButton id={id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
