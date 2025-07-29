import { Star } from 'lucide-react';
import { Label } from '../ui/label';

type RatingInputProps = {
  name: string;
  value: number;
  onRatingChange: (star: number) => void;
};

export default function RatingInput({
  name,
  value = 1,
  onRatingChange
}: RatingInputProps) {
  const ratings = [1, 2, 3, 4, 5];

  const handleStarClick = (rating: number) => {
    onRatingChange(rating);
  };

  return (
    <div>
      <Label className="capitalize mb-2">{name}</Label>
      <div className="flex items-center gap-1">
        <input type="hidden" name={name} value={value} required />
        <div className="flex gap-1">
          {ratings.map((star) => (
            <button
              key={star}
              type="button"
              className={`
              btn ${star <= value ? 'text-yellow-400' : 'text-gray-300'}
              transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded
            `}
              onClick={() => handleStarClick(star)}
            >
              <Star
                className={`w-full h-full ${
                  star <= value ? 'fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
