import FormContainer from '../form/form-container';
import { deleteProductAction, getPaginatedAdminProducts } from '@/db/actions';
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
import { Pen, Trash2 } from 'lucide-react';
import PaginationContainer from '../globals/pagination-container';

function UpdateActionButton({ id }: { id: string }) {
  return (
    <Link href={`/admin/products/${id}/edit`}>
      <ActionButton
        className="hover:text-primary hover:bg-blue-50"
        icon={<Pen />}
      />
    </Link>
  );
}

function DeleteActionButton({ id }: { id: string }) {
  return (
    // bind prefills deleteProductAction with prevState.id, with the id argument
    <FormContainer action={deleteProductAction.bind(null, { id })}>
      <ActionButton
        className="hover:text-destructive hover:bg-red-50"
        icon={<Trash2 />}
      />
    </FormContainer>
  );
}

export default async function AdminProductsTable({
  searchParams
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = parseInt(searchParams.page || '1');
  const {
    data: adminProducts,
    count,
    totalPages,
    currentPage,
    hasNextPage,
    hasPreviousPage
  } = await getPaginatedAdminProducts(page, 10);

  if (adminProducts.length === 0 || count === 0)
    return <EmptyList text="You have no product yet." />;

  return (
    <>
      <div className="border py-6 px-8 rounded-sm">
        <h4 className="mb-4 text-muted-foreground text-sm">
          Found {count} product
          {count > 1 ? 's' : ''}
        </h4>
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="font-semibold w-1/2">
                Product Name
              </TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminProducts.map(({ id, name, company, price }) => (
              <TableRow key={id}>
                <TableCell className="max-w-0 w-1/2">
                  <Link
                    href={`/products/${id}`}
                    className="underline text-primary capitalize block truncate"
                    title={name}
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <UpdateActionButton id={id} />
                  <DeleteActionButton id={id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            <PaginationContainer
              currentPage={currentPage}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </TableCaption>
        </Table>
      </div>
    </>
  );
}
