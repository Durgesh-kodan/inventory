import { PrismaClient, Prisma } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.deleteMany();

  const demoUserId = "133767f0-768d-4338-a612-50c8dc722b84";

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      sku: `SKU-${i + 1}-${Date.now()}`,
      price: new Prisma.Decimal(
        (Math.random() * 90 + 10).toFixed(2)
      ),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
    })),
  });

  console.log("Seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });