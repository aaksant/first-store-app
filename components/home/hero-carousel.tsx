import { dummyProducts } from '@/prisma/dummy-products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

export default function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {dummyProducts
            .map(({ title, image }, index) => (
              <CarouselItem key={index}>
                <Card className="py-0">
                  <CardContent className="p-6">
                    <Image
                      src={image}
                      alt={title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
            .slice(0, 3)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
