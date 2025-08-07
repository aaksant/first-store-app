import { PrismaClient } from '@prisma/client';
import { DummyProduct } from '@/utils/types';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function getDummyProducts(): Promise<DummyProduct[] | null> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function seedReviewModel(totalReviews: number) {
  try {
    const products = await prisma.product.findMany({
      select: { id: true }
    });
    const reviews = [];

    for (let i = 0; i < totalReviews; i++) {
      const rating = faker.helpers.weightedArrayElement([
        { weight: 5, value: 5 },
        { weight: 25, value: 4 },
        { weight: 40, value: 3 },
        { weight: 20, value: 2 },
        { weight: 10, value: 1 }
      ]);

      const review = {
        id: crypto.randomUUID(),
        clerkId: `user_${faker.string.alphanumeric(27)}`,
        productId: faker.helpers.arrayElement(products).id,
        rating: rating,
        comment: faker.lorem.sentences(),
        authorName: faker.person.fullName(),
        authorProfileImageUrl: faker.image.avatar(),
        createdAt: faker.date.between({
          from: new Date('2023-01-01'),
          to: new Date()
        })
      };

      reviews.push(review);
    }

    await prisma.review.createMany({
      data: reviews,
      skipDuplicates: true
    });
  } catch (error) {
    console.log(error);
  }
}

async function seedProductModel() {
  const dummyProducts = await getDummyProducts();
  if (!dummyProducts) {
    console.log('Could not fetch sample products. Exiting seed process.');
    return;
  }

  for (const sampleProduct of dummyProducts) {
    await prisma.product.create({
      data: {
        name: sampleProduct.title,
        company: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`,
        description: sampleProduct.description,
        featured: Math.random() < 0.5,
        image: sampleProduct.image,
        price: Math.round(sampleProduct.price),
        clerkId: 'clerkId'
      }
    });
  }
}

async function main() {
  // clear records
  await prisma.review.deleteMany({});
  await prisma.favoriteProduct.deleteMany({});
  await prisma.product.deleteMany({});

  await seedProductModel();
  await seedReviewModel(200);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(0);
  });
