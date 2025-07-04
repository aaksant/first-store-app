'use client';

import { usePathname } from 'next/navigation';
import { adminLinks } from '../navbar/links';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-row gap-2 mb-4 justify-center md:flex-col md:gap-0">
      {adminLinks.map((adminLink) => {
        const isActiveLink = pathname === adminLink.href;

        return (
          <Link
            href={adminLink.href}
            key={adminLink.href}
            className="flex-shrink-0 md:w-full"
          >
            <Button
              variant={isActiveLink ? 'default' : 'ghost'}
              className="font-normal justify-start md:mb-2 w-full text-sm md:text-base px-3 md:px-4"
            >
              {adminLink.label}
            </Button>
          </Link>
        );
      })}
    </aside>
  );
}
