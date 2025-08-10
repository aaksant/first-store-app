import { type Review } from '@prisma/client';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { formatDate } from '@/utils/index';
import StarRating from './star-rating';

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage src={review.authorProfileImageUrl} />
            <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1/3">
            <h4 className="font-semibold tracking-tight md:text-base">
              {review.authorName}
            </h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
