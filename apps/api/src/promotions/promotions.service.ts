import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PromotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async listActive() {
    const now = new Date();
    return this.prisma.promotion.findMany({
      where: {
        isActive: true,
        startsAt: { lte: now },
        OR: [{ endsAt: null }, { endsAt: { gte: now } }],
      },
      orderBy: { startsAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        bannerUrl: true,
        startsAt: true,
        endsAt: true,
      },
    });
  }
}
