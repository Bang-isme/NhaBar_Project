import { Controller, Get, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("categories")
  async getCategories() {
    const categories = await this.menuService.getMenuCategories();
    return { data: categories, meta: { total: categories.length } };
  }

  @Get("items")
  async getItems(@Query("categoryId") categoryId?: string) {
    const items = await this.menuService.getMenuItems(categoryId);
    return { data: items, meta: { total: items.length } };
  }
}
