import Image from 'next/image';

type NoProductFoundProps = { text?: string };

export default function NoProductFound({
  text = 'Product not found'
}: NoProductFoundProps) {
  return (
    <div className="h-full grid place-items-center">
      <Image
        src="/no-data.svg"
        alt="No product found"
        width={200}
        height={200}
      />
      <h3 className="mt-4 text-muted-foreground font-semibold tracking-tight">
        {text}
      </h3>
    </div>
  );
}
