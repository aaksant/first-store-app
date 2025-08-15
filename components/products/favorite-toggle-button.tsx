import ActionButton from '../form/action-button';
import { getFavoriteId, toggleFavoriteProductAction } from '@/db/actions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import FormContainer from '../form/form-container';
import { auth } from '@clerk/nextjs/server';
import ProtectedFavoriteToggleButton from './protected-favorite-toggle-button';

type FavoriteToggleButtonProps = {
  productId: string;
  className?: string;
  as: 'overlay' | 'inline';
};

export default async function FavoriteToggleButton({
  productId,
  className,
  as
}: FavoriteToggleButtonProps) {
  const { userId } = await auth();
  if (!userId)
    return <ProtectedFavoriteToggleButton className={className} as={as} />;

  const favoriteId = await getFavoriteId(productId);

  const overlayStyle = 'btn absolute rounded-full backdrop-blur-sm';
  const inlineStyle = 'btn rounded-md py-2 px-6 border';

  return (
    <FormContainer
      action={toggleFavoriteProductAction.bind(null, {
        productId,
        favoriteId
      })}
    >
      <ActionButton
        icon={
          <Heart
            className={cn(
              'stroke-red-500',
              favoriteId ? 'fill-red-500' : 'fill-none'
            )}
          />
        }
        className={cn(as === 'overlay' ? overlayStyle : inlineStyle, className)}
      />
    </FormContainer>
  );
}
