import { Star } from 'lucide-react';
import { Progress } from '../ui/progress';
import { getRatingDistribution } from '@/db/actions';
import StarRating from './star-rating';

type ReviewSummaryProps = {
  count: number;
  averageRating: string;
  ratingDistribution: Awaited<ReturnType<typeof getRatingDistribution>>;
};

export default function ReviewSummary({
  count,
  averageRating,
  ratingDistribution
}: ReviewSummaryProps) {
  return (
    <div className="border rounded-md p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className="flex justify-center items-baseline gap-1">
            <h3 className="text-5xl font-bold">{averageRating}</h3>
            <span className="text-2xl text-muted-foreground font-semibold">
              / 5
            </span>
          </div>
          <div className="flex items-center justify-center">
            <StarRating rating={parseInt(averageRating)} />
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {count} review{count > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {ratingDistribution.map(({ _count, rating }) => (
          <div key={rating} className="flex items-center">
            <div className="inline-flex items-center gap-1 min-w-[40px]">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <Progress
              value={(_count.rating / count) * 100}
              className="flex-1 h-2 mx-auto"
            />
            <span className="text-sm text-muted-foreground min-w-[30px] text-right">
              {_count.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
