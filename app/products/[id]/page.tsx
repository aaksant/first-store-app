import FavoriteToggleButton from '@/components/products/favorite-toggle-button';
import AddToCartButton from '@/components/single-product/add-to-cart-button';
import Breadcrumbs from '@/components/single-product/breadcrumbs';
import ProductRating from '@/components/single-product/product-rating';
import { getReviews, getSingleProduct } from '@/db/actions';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ShareButton from '@/components/single-product/share-button';
import ReviewContainer from '@/components/reviews/review-container';

export default async function SingleProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getSingleProduct((await params).id);
  if (!product) redirect('/');
  const { id, name, company, description, image, price } = product;

  const reviews = await getReviews(id);

  return (
    <>
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
            <div>
              <Badge variant="outline" className="w-fit mb-2">
                {company}
              </Badge>
              <h3 className="font-bold text-xl tracking-tight capitalize">
                {name}
              </h3>
              <ProductRating />
              <p className="text-muted-foreground text-sm my-6">
                {description}
              </p>
              <Separator />
              <div className="flex gap-x-4 mt-6 items-center justify-end">
                <h3 className="font-bold tracking-tight">
                  {formatCurrency(price)}
                </h3>
                <AddToCartButton />
              </div>
            </div>
            <div>
              <FavoriteToggleButton productId={id} className="right-3 top-0" />
              <ShareButton
                className="absolute right-13 top-0"
                productId={id}
                name={name}
                formattedPrice={formatCurrency(price)}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12">
        <h1 className="text-2xl font-bold tracking-tight my-6">
          All reviews ({reviews.length})
        </h1>
        <ReviewContainer productId={id} reviews={reviews} />
      </section>
    </>
  );
}
