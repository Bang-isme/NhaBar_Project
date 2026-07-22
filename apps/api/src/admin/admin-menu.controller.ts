import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AdminRoleGuard } from "../auth/admin-role.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { MenuService } from "../menu/menu.service";

@Controller("admin/menu")
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class AdminMenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("items")
  async listItems() {
    const items = await this.menuService.getMenuItems();
    return { data: items, meta: { total: items.length } };
  }

  @Post("items")
  async createItem(
    @Body()
    body: {
      name: string;
      description?: string;
      price: number;
      flavorProfile?: string;
      abv?: string;
      isAvailable?: boolean;
      isBestSeller?: boolean;
      categoryId: string;
    },
  ) {
    const item = await this.menuService.createMenuItem(body);
    return { data: item };
  }

  @Patch("items/:id")
  async updateItem(
    @Param("id") id: string,
    @Body()
    body: {
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
    const item = await this.menuService.updateMenuItem(id, body);
    return { data: item };
  }

  @Delete("items/:id")
  async deleteItem(@Param("id") id: string) {
    await this.menuService.deleteMenuItem(id);
    return { data: { success: true } };
  }
}
