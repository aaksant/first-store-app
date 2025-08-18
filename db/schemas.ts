import z, { ZodType } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Product name must be at least 4 characters'
    })
    .max(100, {
      message: 'Product name must be less than 100 characters'
    }),
  company: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, {
      message: 'Company name must be less than 100 characters'
    }),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: 'Price must be a positive number' }),
  image: validateImageFile(),
  description: z.string().refine(
    (input) => {
      const wordsCount = input.split(' ').length;
      return wordsCount >= 5 && wordsCount <= 1000;
    },
    {
      message: 'Description must be between 5 and 1000 words'
    }
  ),
  featured: z.coerce.boolean()
});

export const imageSchema = z.object({
  image: validateImageFile()
});

export const reviewSchema = z.object({
  authorName: z
    .string()
    .refine((input) => input.length !== 0, { message: 'Name is required' }),
  comment: z
    .string()
    .refine((input) => input.length >= 5 && input.length <= 1000, {
      message: 'Review comment must be between 5 and 1000 characters'
    }),
  productId: z.string().refine((input) => input.length !== 0, {
    message: 'Product ID cannot be empty'
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Rating must be at least 1' }),
  authorProfileImageUrl: z.string().refine((input) => input.length !== 0, {
    message: 'Your profile URL cannot be empty'
  })
});

export function createCartItemSchema(stock: number) {
  return z.object({
    productId: z.string().refine((input) => input.length !== 0, {
      message: 'Product ID cannot be empty'
    }),
    amount: z.coerce
      .number()
      .int()
      .min(1, { message: 'Amount must be at least 1' })
      .max(stock, { message: `Only ${stock} available` })
  });
}

export function validateWithZodSchema<T>(
  schema: ZodType<T>,
  inputData: unknown
) {
  const result = schema.safeParse(inputData);

  if (!result.success) {
    const errors = Object.values(z.flattenError(result.error).fieldErrors)
      .flat()
      .join('\n');

    throw new Error(errors);
  }

  return result.data;
}

function validateImageFile() {
  // 1 MB, counted by bytes
  const maxUploadSize = 1024 * 1024;
  const acceptedFileType = ['image/'];

  return z
    .instanceof(File)
    .refine((file) => !file || file.size <= maxUploadSize, {
      message: 'File must be less than 1 MB'
    })
    .refine(
      (file) =>
        !file ||
        acceptedFileType.some((fileType) => file.type.startsWith(fileType)),
      { message: 'File must be an image.' }
    );
}
