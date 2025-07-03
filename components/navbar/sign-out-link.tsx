'use client';

import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SignOutLink() {
  return (
    <SignOutButton>
      <Link
        href="/"
        className="w-full"
        onClick={() => toast.success('Successfuly logged out')}
      >
        Log out
      </Link>
    </SignOutButton>
  );
}
