import FavoriteToggleButton from '@/components/products/favorite-toggle-button';
import AddToCartButton from '@/components/single-product/add-to-cart-button';
import Breadcrumbs from '@/components/single-product/breadcrumbs';
import ProductRating from '@/components/single-product/product-rating';
import {
  getProductReviewData,
  getRatingDistribution,
  getSingleProduct,
  hasUserReviewedProduct
} from '@/db/actions';
import { formatCurrency } from '@/utils/index';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ShareButton from '@/components/single-product/share-button';
import ReviewSummary from '@/components/reviews/review-summary';
import ReviewForm from '@/components/reviews/review-form';
import ReviewList from '@/components/reviews/review-list';
import { auth } from '@clerk/nextjs/server';

export default async function SingleProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getSingleProduct((await params).id);
  if (!product) redirect('/');
  const { id, name, company, description, image, price } = product;

  const { paginatedReviews, averageRating } = await getProductReviewData({
    productId: id,
    page: 1,
    limit: 5
  });
  const ratingDistribution = await getRatingDistribution(id);

  const { userId } = await auth();
  const isAlreadyReviewed = userId
    ? await hasUserReviewedProduct(userId, id)
    : null;

  return (
    <>
      <Breadcrumbs name={name} id={id} />

      <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="w-5/6 p-6 lg:w-full lg:col-span-2">
          <Image
            src={image}
            alt={name}
            width={1000}
            height={1333}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 83vw, 40vw"
          />
        </div>
        <div className="space-y-6 lg:col-span-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold capitalize md:text-2xl lg:text-3xl">
              {name}
            </h3>
            <Badge variant="outline" className="w-fit">
              {company}
            </Badge>
            <ProductRating
              averageRating={averageRating}
              count={paginatedReviews.count}
            />
          </div>
          <div>
            <h3 className="text-lg text-right text-primary font-bold tracking-tight">
              {formatCurrency(price)}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              {description}
            </p>
          </div>

          {/* quantity component here */}

          <Separator />
          <div className="w-full bg-accent p-4 rounded-md flex justify-between items-center">
            <span className="text-sm font-semibold">Subtotal:</span>
            <span className="font-bold tracking-tight">
              {formatCurrency(price)}
            </span>
          </div>
          <div className="flex gap-2">
            <AddToCartButton className="flex-1" />
            <ShareButton
              productId={id}
              name={name}
              formattedPrice={formatCurrency(price)}
            />
            <FavoriteToggleButton productId={id} as="inline" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight mt-10 mb-6">
        Customer Reviews
      </h1>

      <div className="flex-1">
        <div className="grid gap-8 h-full lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-4">
              <ReviewSummary
                count={paginatedReviews.count}
                averageRating={averageRating}
                ratingDistribution={ratingDistribution}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="max-h-[70vh] min-h-0 flex flex-col">
              <div className="mb-2 flex-shrink-0">
                <ReviewForm
                  productId={id}
                  isAlreadyReviewed={isAlreadyReviewed}
                />
              </div>
              <div className="flex-1 pr-2 overflow-y-auto">
                <ReviewList
                  initialReviews={paginatedReviews.data}
                  productId={id}
                  totalCount={paginatedReviews.count}
                  hasNextPage={paginatedReviews.hasNextPage}
                  limit={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
