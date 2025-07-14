'use server';

import {
  imageSchema,
  productSchema,
  validateWithZodSchema
} from '@/db/schemas';
import prisma from './db';
import { getAuthUser } from './helpers';
import { uploadImage } from './supabase';

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
): Promise<{ status: 'success' | 'error'; message: string }> {
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

    return {
      status: 'success',
      message: 'Product created. You can check it in the My Products menu'
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occured';

    return { status: 'error', message: errorMessage };
  }
}
