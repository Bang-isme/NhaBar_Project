import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuCategories() {
    return this.prisma.menuCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        items: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  async getMenuItems(categoryId?: string) {
    return this.prisma.menuItem.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true,
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async createMenuItem(data: {
    name: string;
    description?: string;
    price: number;
    flavorProfile?: string;
    abv?: string;
    isAvailable?: boolean;
    isBestSeller?: boolean;
    categoryId: string;
  }) {
    return this.prisma.menuItem.create({
      data,
      include: { category: true },
    });
  }

  async updateMenuItem(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      flavorProfile?: string;
      abv?: string;
      isAvailable?: boolean;
      isBestSeller?: boolean;
      categoryId?: string;
    },
  ) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async deleteMenuItem(id: string) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
