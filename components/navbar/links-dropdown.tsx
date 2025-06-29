import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { navLinks } from './links';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="btn">
          <AlignJustify className="w6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navLinks.map((navLink) => (
          <DropdownMenuItem key={navLink.href}>
            <Link href={navLink.href} className="w-full">
              {navLink.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
