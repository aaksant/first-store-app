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
              variant="ghost"
              className={`font-normal rounded-none justify-start md:mb-2 w-full text-sm px-3 md:px-4 ${
                isActiveLink ? 'border-b-2 border-primary text-primary' : ''
              }`}
            >
              {adminLink.label}
            </Button>
          </Link>
        );
      })}
    </aside>
  );
}
