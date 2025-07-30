import { PrismaClient } from '@prisma/client';
import { DummyProduct } from '@/utils/types';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function getSampleProducts(): Promise<DummyProduct[] | null> {
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

async function main() {
  await prisma.review.deleteMany({});
  await prisma.favoriteProduct.deleteMany({});
  await prisma.product.deleteMany({});

  const sampleProducts = await getSampleProducts();
  if (!sampleProducts) {
    console.log('Could not fetch sample products. Exiting seed process.');
    return;
  }

  for (const sampleProduct of sampleProducts) {
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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(0);
  });
