import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { dummyProducts } from './dummy-products';

const prisma = new PrismaClient();

async function seedProductModel() {
  if (!dummyProducts) {
    console.log('Could not fetch sample products. Exiting seed process');
    return;
  }

  for (const dummyProduct of dummyProducts) {
    await prisma.product.create({
      data: {
        name: dummyProduct.title,
        company: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`,
        description: dummyProduct.description,
        featured: Math.random() < 0.5,
        image: dummyProduct.image,
        price: Math.round(dummyProduct.price),
        stock: faker.number.int({
          min: 5,
          max: 25
        }),
        clerkId: 'clerkId'
      }
    });
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
        { weight: 25, value: 5 },
        { weight: 35, value: 4 },
        { weight: 20, value: 3 },
        { weight: 15, value: 2 },
        { weight: 5, value: 1 }
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

async function main() {
  // clear records
  await prisma.review.deleteMany({});
  await prisma.favoriteProduct.deleteMany({});
  await prisma.product.deleteMany({});

  await seedProductModel();
  await seedReviewModel(1000);
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
