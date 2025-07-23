import FormContainer from '../form/form-container';
import { deleteProductAction, getAdminProducts } from '@/db/actions';
import ActionButton from '../form/action-button';
import EmptyList from '../globals/empty-list';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';

function DeleteActionButton({ id }: { id: string }) {
  return (
    // bind prefills deleteProductAction with prevState.id, with the id argument
    <FormContainer action={deleteProductAction.bind(null, { id })}>
      <ActionButton actionType="delete" />
    </FormContainer>
  );
}

export default async function AdminProductsTable() {
  const adminProducts = await getAdminProducts();

  if (adminProducts.length === 0) return <EmptyList />;

  return (
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
  );
}
