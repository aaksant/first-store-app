import { type Review } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage src={review.authorProfileImageUrl} />
            <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="tracking-tight md:text-base">
              {review.authorName}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {review.createdAt.toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
