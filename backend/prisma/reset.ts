import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing database...");

  await prisma.review.deleteMany();
  await prisma.selectedOption.deleteMany();
  await prisma.image.deleteMany();
  await prisma.color.deleteMany();
  await prisma.product.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.option.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  console.log("✅ All data wiped.");
}

main().finally(() => prisma.$disconnect());
