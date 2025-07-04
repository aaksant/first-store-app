import { currentUser } from '@clerk/nextjs/server';
import { User } from 'lucide-react';
import Image from 'next/image';

export default async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt={`${user.username} profile image`}
        width={100}
        height={100}
        className="w-6 h-6 object-cover rounded-full"
      />
    );
  }

  return <User className="w-6 h-6 object-cover rounded-full" />;
}
