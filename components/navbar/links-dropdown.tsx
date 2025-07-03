import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { navLinks } from './links';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import SignOutLink from './sign-out-link';
import UserIcon from './user-icon';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="btn space-x-2">
          <AlignJustify className="w6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignedIn>
          {navLinks.map((navLink) => (
            <DropdownMenuItem key={navLink.href}>
              <Link href={navLink.href} className="w-full">
                {navLink.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton>
              <button className="w-full text-left">Sign in</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignInButton>
              <button className="w-full text-left">Register</button>
            </SignInButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
