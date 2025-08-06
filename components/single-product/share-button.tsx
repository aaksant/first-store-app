'use client';

import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import { cn } from '@/lib/utils';

type ShareButtonProps = {
  productId: string;
  name: string;
  formattedPrice: string;
  className?: string;
};

export default function ShareButton({
  productId,
  name,
  formattedPrice,
  className
}: ShareButtonProps) {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const productUrl = `${baseUrl}/products/${productId}`;
  const shareTitle = `Check out this amazing product! ${name} is now on sale at ${formattedPrice}.`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('btn rounded-md py-2 px-6 border', className)}
        >
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-x-2 justify-center w-full p-2">
        <EmailShareButton url={productUrl} subject={shareTitle}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <WhatsappShareButton url={productUrl} title={shareTitle}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={productUrl} title={shareTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
}
