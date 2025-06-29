import FavoriteToggleButton from '@/components/products/favorite-toggle-button';
import AddToCartButton from '@/components/single-product/add-to-cart-button';
import Breadcrumbs from '@/components/single-product/breadcrumbs';
import ProductRating from '@/components/single-product/product-rating';
import { getSingleProduct } from '@/db/actions';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function SingleProductPage({
  params
}: {
  params: { id: string };
}) {
  const product = await getSingleProduct({ productId: params.id });
  if (!product) redirect('/');
  const { id, name, company, description, image, price } = product;

  return (
    <section>
      <Breadcrumbs name={name} id={id} />
      <div className="grid gap-12 mt-8 md:grid-cols-2">
        <div className="h-full relative">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            className="w-full rounded-sm object-cover"
          />
        </div>
        <div className="relative">
          <Badge variant="outline" className="w-fit mb-2">
            {company}
          </Badge>
          <h3 className="font-bold text-xl tracking-tight capitalize">
            {name}
          </h3>
          <ProductRating />
          <p className="text-muted-foreground text-sm my-6">{description}</p>
          <Separator />
          <div className="flex gap-x-4 mt-6 items-center justify-end">
            <h3 className="font-bold tracking-tight">
              {formatCurrency(price)}
            </h3>
            <AddToCartButton />
          </div>
          <FavoriteToggleButton className="right-3 top-0" />
        </div>
      </div>
    </section>
  );
}
