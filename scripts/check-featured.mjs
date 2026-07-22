import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const event = await prisma.event.findFirst({ where: { isFeatured: true } });
console.log(event?.title ?? "NO_FEATURED");
await prisma.$disconnect();
