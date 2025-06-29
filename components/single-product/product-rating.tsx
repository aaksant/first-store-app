import { Star } from 'lucide-react';

// will be async
export default function ProductRating() {
  const rating = 4.5;
  const ratingCount = 500;

  return (
    <span className="flex gap-x-2 items-center text-sm mt-1">
      <Star size={14} />
      {rating} ({ratingCount} reviews)
    </span>
  );
}
