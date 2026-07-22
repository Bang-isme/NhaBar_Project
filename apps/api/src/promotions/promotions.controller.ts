import { Controller, Get } from "@nestjs/common";
import { PromotionsService } from "./promotions.service";

@Controller("promotions")
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get("active")
  async listActive() {
    const promotions = await this.promotionsService.listActive();
    return {
      data: promotions.map((promo) => ({
        ...promo,
        startsAt: promo.startsAt.toISOString(),
        endsAt: promo.endsAt?.toISOString() ?? null,
      })),
      meta: { total: promotions.length },
    };
  }
}
