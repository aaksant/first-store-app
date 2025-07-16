'use server';

import { ActionStatus } from '@/utils/types';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function getAuthUser(): Promise<User> {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must logged in to access this route');
  }

  return user;
}

export async function getAdminUser() {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/');

  return user;
}

export async function getActionSuccessMessage(
  successMessage: string
): Promise<{ status: ActionStatus; message: string }> {
  return {
    status: 'success',
    message: successMessage
  };
}

export async function getActionErrorMessage(
  error: unknown
): Promise<{ status: ActionStatus; message: string }> {
  const errorMessage =
    error instanceof Error ? error.message : 'An error occured';

  return { status: 'error', message: errorMessage };
}
