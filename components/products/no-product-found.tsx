import Image from 'next/image';

export default function NoProductFound() {
  return (
    <div className="h-full grid place-items-center">
      <Image
        src="/no-data.svg"
        alt="No product found"
        width={200}
        height={200}
      />
      <h3 className="mt-4 text-muted-foreground font-semibold tracking-tight">
        Product not found
      </h3>
    </div>
  );
}
