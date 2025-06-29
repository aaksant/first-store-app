import Link from 'next/link';
import { Button } from '../ui/button';
import HeroCarousel from './hero-carousel';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center mb-12">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tighter sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
          Discover a new shopping experience with curated products, seamless
          browsing, and exclusive deals. Join thousands of happy customers who
          trust us for quality and service.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <HeroCarousel />
    </section>
  );
}
