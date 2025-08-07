import { Star } from 'lucide-react';

type StarRatingProps = { rating: number };

export default function StarRating({ rating }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((starValue) => (
        <Star
          key={starValue}
          className={`w-5 h-5 transition-colors ${
            starValue <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
