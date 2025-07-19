import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Label } from '../ui/label';
import { Tooltip } from '../ui/tooltip';
import Image from 'next/image';
import { Input } from '../ui/input';

export default function ImageInput({
  defaultImage
}: {
  defaultImage?: string;
}) {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-center gap-x-2 mb-2">
        <Label htmlFor="image">Image</Label>
        {defaultImage && (
          <Tooltip>
            <TooltipTrigger className="text-muted-foreground text-xs">
              Show
            </TooltipTrigger>
            <TooltipContent>
              {defaultImage ? (
                <Image
                  src={defaultImage}
                  alt="current product image"
                  width={200}
                  height={200}
                  className="rounded-sm object-cover border border-secondary"
                />
              ) : (
                <p>No image for this product</p>
              )}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Input id="image" name="image" type="file" accept="image/**" />
    </div>
  );
}
