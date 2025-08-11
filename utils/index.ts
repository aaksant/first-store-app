import { Review } from '@prisma/client';

export function formatCurrency(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getProductAverageRating(reviews: Review[]) {
  return (
    reviews
      .map((review) => review.rating)
      .reduce((prev, current) => prev + current, 0) / reviews.length
  ).toFixed(1);
}

export function getProductReviewsCount(reviews: Review[]) {
  return reviews.length;
}
