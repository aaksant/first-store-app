'use server';

import {
  createCartItemSchema,
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
import { ActionStatus, PaginationResult } from '@/utils/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Cart, Product, Review } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

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

export async function getAdminProducts(
  page: number = 1,
  limit: number = 10
): Promise<PaginationResult<Product>> {
  await getAdminUser();

  const skip = (page - 1) * limit;

  const [data, count] = await prisma.$transaction([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.product.count()
  ]);

  const totalPages = Math.ceil(count / limit);

  return {
    data,
    count,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
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

export async function getProductReviewData({
  productId,
  page = 1,
  limit = 5
}: {
  productId: string;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  const [data, count, averageRatingResult] = await prisma.$transaction([
    prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip
    }),
    prisma.review.count({
      where: { productId }
    }),
    prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    })
  ]);

  const totalPages = Math.ceil(count / limit);
  const averageRating = averageRatingResult._avg.rating?.toFixed(1) || '0.0';
  const paginatedReviews: PaginationResult<Review> = {
    data,
    count,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };

  return {
    paginatedReviews,
    averageRating
  };
}

export async function getRatingDistribution(productId: string) {
  return await prisma.review.groupBy({
    where: { productId },
    by: ['rating'],
    _count: { rating: true },
    orderBy: { rating: 'desc' }
  });
}

export async function hasUserReviewedProduct(
  userId: string,
  productId: string
) {
  return await prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId
    }
  });
}

export async function getReviewedProducts() {
  const user = await getAuthUser();
  return await prisma.review.findMany({
    where: { clerkId: user.id },
    include: { product: true }
  });
}

export async function getItemsInCart() {
  const { userId } = await auth();
  const cart = await prisma.cart.findFirst({
    where: { clerkId: userId ?? '' },
    select: { itemsInCart: true }
  });

  return cart?.itemsInCart || 0;
}

export async function addToCartAction(
  prevState: unknown,
  formData: FormData
): Promise<{ status: ActionStatus; message: string }> {
  const user = await getAuthUser();
  try {
    const productId = formData.get('productId') as string;
    const product = await getSingleProduct(productId);
    if (!product) {
      return getActionErrorMessage('Product not found');
    }

    const inputData = Object.fromEntries(formData);
    const cartItemSchema = createCartItemSchema(product.stock);
    const { amount } = validateWithZodSchema(cartItemSchema, inputData);

    const cart = await getOrCreateCart(user.id);
    await updateOrCreateCartItem(productId, cart, amount);
    await updateCartTotals(cart);

    revalidatePath('/cart');
    revalidatePath('/');
    return getActionSuccessMessage('Item added to cart');
  } catch (error) {
    return getActionErrorMessage(error);
  }
}

async function getOrCreateCart(userId: string) {
  let cart = await prisma.cart.findFirst({
    where: { clerkId: userId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { clerkId: userId },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });
  }

  return cart;
}

async function updateOrCreateCartItem(
  productId: string,
  cart: Cart,
  amount: number
) {
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId
    }
  });

  if (existingCartItem) {
    await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { amount: existingCartItem.amount + amount }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        amount
      }
    });
  }
}

async function updateCartTotals(cart: Cart) {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true }
  });

  const itemsInCart = cartItems.reduce((total, item) => total + item.amount, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.amount,
    0
  );
  const shipping = cartTotal ? cart.shipping : 0;
  const tax = Math.round(cartTotal * cart.taxRate);
  const orderTotal = cartTotal + shipping + tax;

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      itemsInCart,
      cartTotal,
      shipping,
      tax,
      orderTotal
    }
  });
}
