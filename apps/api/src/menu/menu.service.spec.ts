import { describe, it, expect, vi } from "vitest";
import { MenuService } from "./menu.service";

describe("MenuService", () => {
  it("getMenuCategories queries categories in sort order", async () => {
    const prisma = {
      menuCategory: {
        findMany: vi.fn().mockResolvedValue([
          { id: "c1", name: "Signature Cocktails", sortOrder: 1, items: [] },
        ]),
      },
    };
    const service = new MenuService(prisma as never);
    const result = await service.getMenuCategories();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Signature Cocktails");
    expect(prisma.menuCategory.findMany).toHaveBeenCalledWith({
      orderBy: { sortOrder: "asc" },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });
  });

  it("getMenuItems filters by categoryId when provided", async () => {
    const prisma = {
      menuItem: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const service = new MenuService(prisma as never);
    await service.getMenuItems("cat-123");
    expect(prisma.menuItem.findMany).toHaveBeenCalledWith({
      where: { categoryId: "cat-123" },
      include: { category: true },
      orderBy: { createdAt: "asc" },
    });
  });
});
