import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
          We are changing the way people shop
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground px-2 sm:px-0">
          Discover a new shopping experience with curated products, seamless
          browsing, and exclusive deals. Join thousands of happy customers who
          trust us for quality and service.
        </p>
        <div className="mt-8 sm:mt-10 max-w-xl mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
