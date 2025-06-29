import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-bold text-3xl tracking-tighter">NextStore</h1>
    </Link>
  );
}
