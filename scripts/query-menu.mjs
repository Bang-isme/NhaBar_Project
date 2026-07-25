import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const categories = await prisma.menuCategory.findMany();
  console.log("Categories found:", categories);
} catch (err) {
  console.error("Error querying menuCategory:", err.message);
}

try {
  const items = await prisma.menuItem.findMany();
  console.log("Items found:", items);
} catch (err) {
  console.error("Error querying menuItem:", err.message);
}

await prisma.$disconnect();
