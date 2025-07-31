'use server';

import {
  imageSchema,
  productSchema,
  reviewSchema,
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
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      featured: true
    }
  });
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
    revalidatePath('/admin/products');
    return getActionSuccessMessage('Product deleted');
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

export async function updateProductAction(
  prevState: unknown,
  formData: FormData
): Promise<{ status: ActionStatus; message: string }> {
  await getAdminUser();

  try {
    const updatedProductId = formData.get('id') as string;
    const oldImageFilePath = formData.get('imagePath') as string;
    const newInputData = Object.fromEntries(formData);
    const newImageFile = formData.get('image') as File;

    const productUpdateSchema = productSchema.omit({ image: true });
    const validatedNewInputData = validateWithZodSchema(
      productUpdateSchema,
      newInputData
    );

    if (newImageFile) {
      const validatedImageFile = validateWithZodSchema(imageSchema, {
        image: newImageFile
      });
      const newImageFilePath = await uploadImage(validatedImageFile.image);

      await prisma.product.update({
        where: { id: updatedProductId },
        data: {
          ...validatedNewInputData,
          image: newImageFilePath
        }
      });
      await deleteImage(oldImageFilePath);
    } else {
      await prisma.product.update({
        where: { id: updatedProductId },
        data: {
          ...validatedNewInputData,
          image: oldImageFilePath
        }
      });
    }

    revalidatePath(`/admin/products/${updatedProductId}/edit`);
    return getActionSuccessMessage('Product updated');
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

export async function getAdminProductDetail(id: string) {
  await getAdminUser();
  const adminProduct = await prisma.product.findUnique({
    where: {
      id: id
    }
  });

  if (!adminProduct) redirect('/admin/products');
  return adminProduct;
}

export async function getFavoriteId(productId: string) {
  const user = await getAuthUser();
  const favoriteProduct = await prisma.favoriteProduct.findFirst({
    where: {
      productId,
      clerkId: user.id
    },
    select: { id: true }
  });

  return favoriteProduct?.id || null;
}

export async function toggleFavoriteProductAction(prevState: {
  productId: string;
  favoriteId: string | null;
}) {
  const user = await getAuthUser();
  const { productId, favoriteId } = prevState;

  try {
    if (favoriteId) {
      await prisma.favoriteProduct.delete({
        where: { id: favoriteId }
      });
    } else {
      await prisma.favoriteProduct.create({
        data: {
          productId: productId,
          clerkId: user.id
        }
      });
    }

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${productId}`);
    return getActionSuccessMessage(
      `${favoriteId ? 'Remove from favorites' : 'Added to favorites'}`
    );
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

export async function getFavoriteProducts() {
  const user = await getAuthUser();
  return await prisma.favoriteProduct.findMany({
    where: { clerkId: user.id },
    include: { product: true }
  });
}

export async function createReviewAction(
  prevState: unknown,
  formData: FormData
): Promise<{ status: ActionStatus; message: string }> {
  const user = await getAuthUser();

  try {
    const inputData = Object.fromEntries(formData);
    const validatedInputData = validateWithZodSchema(reviewSchema, inputData);

    await prisma.review.create({
      data: { ...validatedInputData, clerkId: user.id }
    });

    revalidatePath(`/products/${validatedInputData.productId}`);
    return getActionSuccessMessage('Review created');
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

export async function getReviews(productId: string) {
  return await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' }
  });
}
