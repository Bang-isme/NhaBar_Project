import { Injectable, NotFoundException } from "@nestjs/common";
import { EventStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

const offerSelect = {
  id: true,
  title: true,
  description: true,
} as const;

function activePromotionFilter(now: Date) {
  return {
    isActive: true,
    startsAt: { lte: now },
    OR: [{ endsAt: null }, { endsAt: { gte: now } }],
  };
}

const publicSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  startsAt: true,
  endsAt: true,
  posterUrl: true,
  collaborator: true,
  isFeatured: true,
} as const;

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  private offersInclude(now = new Date()) {
    return {
      promotions: {
        where: { promotion: activePromotionFilter(now) },
        select: {
          promotion: { select: offerSelect },
        },
      },
    } as const;
  }

  async getFeatured() {
    const now = new Date();
    return this.prisma.event.findFirst({
      where: { status: EventStatus.published, isFeatured: true },
      orderBy: { startsAt: "asc" },
      select: {
        slug: true,
        title: true,
        startsAt: true,
        posterUrl: true,
        ...this.offersInclude(now),
      },
    });
  }

  async listPublished(filter: "upcoming" | "past" | "all" = "upcoming") {
    const now = new Date();
    const where =
      filter === "upcoming"
        ? {
            status: EventStatus.published,
            startsAt: { gte: now },
          }
        : filter === "past"
          ? {
              status: EventStatus.published,
              startsAt: { lt: now },
            }
          : { status: EventStatus.published };

    return this.prisma.event.findMany({
      where,
      orderBy: { startsAt: filter === "past" ? "desc" : "asc" },
      select: {
        ...publicSelect,
        ...this.offersInclude(now),
      },
    });
  }

  async getBySlug(slug: string) {
    const now = new Date();
    const event = await this.prisma.event.findFirst({
      where: { slug, status: EventStatus.published },
      select: {
        ...publicSelect,
        ...this.offersInclude(now),
        lineup: {
          orderBy: { sortOrder: "asc" },
          select: {
            roleLabel: true,
            sortOrder: true,
            artist: {
              select: {
                stageName: true,
                socialUrl: true,
                avatarUrl: true,
              },
            },
          },
        },
        media: {
          orderBy: { sortOrder: "asc" },
          select: {
            url: true,
            altText: true,
            sortOrder: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException({
        error: { code: "EVENT_NOT_FOUND", message: "Event not found" },
      });
    }

    return event;
  }
}

export function mapOffers(
  promotions: Array<{ promotion: { id: string; title: string; description: string | null } }>,
) {
  return promotions.map((row) => row.promotion);
}
