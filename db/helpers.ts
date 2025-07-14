'use server';

import { currentUser, User } from '@clerk/nextjs/server';

export async function getAuthUser(): Promise<User> {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must logged in to access this route');
  }

  return user;
}

export async function getCreateProductActionError(
  error: unknown
): Promise<{ message: string }> {
  return {
    message: error instanceof Error ? error.message : 'An error occured'
  };
}
