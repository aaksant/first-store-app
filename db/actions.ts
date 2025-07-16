'use server';

import {
  imageSchema,
  productSchema,
  validateWithZodSchema
} from '@/db/schemas';
import prisma from './db';
import {
  getAdminUser,
  getAuthUser,
  getActionErrorMessage,
  getActionSuccessMessage
} from './helpers';
import { deleteImage, uploadImage } from './supabase';
import { ActionStatus } from '@/utils/types';

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true
    }
  });

  return products;
}

export async function getAllProducts({ search = '' }: { search: string }) {
  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getSingleProduct(productId: string) {
  return await prisma.product.findUnique({
    where: {
      id: productId
    }
  });
}

export async function createProductAction(
  prevState: unknown,
  formData: FormData
): Promise<{ status: ActionStatus; message: string }> {
  const user = await getAuthUser();

  try {
    const inputData = Object.fromEntries(formData);
    const imageFile = formData.get('image') as File;

    const validatedInputData = validateWithZodSchema(productSchema, inputData);
    const validatedImageFile = validateWithZodSchema(imageSchema, {
      image: imageFile
    });
    const imageFilePath = await uploadImage(validatedImageFile.image);

    await prisma.product.create({
      data: {
        ...validatedInputData,
        image: imageFilePath,
        clerkId: user.id
      }
    });

    return getActionSuccessMessage(
      'Product created. You can check it in the My Products menu'
    );
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

export async function deleteProductAction(prevState: {
  id: string;
}): Promise<{ status: ActionStatus; message: string }> {
  await getAdminUser();

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: prevState.id
      }
    });

    await deleteImage(deletedProduct.image);
    return getActionSuccessMessage('Product deleted');
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

export async function getAdminProducts() {
  await getAdminUser();
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}
