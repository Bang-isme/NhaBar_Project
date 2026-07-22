import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { EventsService, mapOffers } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("featured")
  async getFeatured() {
    const event = await this.eventsService.getFeatured();
    if (!event) {
      throw new NotFoundException({
        error: {
          code: "FEATURED_NOT_FOUND",
          message: "No featured event",
        },
      });
    }
    return {
      data: {
        slug: event.slug,
        title: event.title,
        startsAt: event.startsAt.toISOString(),
        posterUrl: event.posterUrl,
        offers: mapOffers(event.promotions),
      },
    };
  }

  @Get()
  async list(@Query("filter") filter?: string) {
    const normalized =
      filter === "past" || filter === "all" ? filter : "upcoming";
    const events = await this.eventsService.listPublished(normalized);
    return {
      data: events.map((event) => ({
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt.toISOString(),
        endsAt: event.endsAt?.toISOString() ?? null,
        posterUrl: event.posterUrl,
        collaborator: event.collaborator,
        isFeatured: event.isFeatured,
        statusLabel:
          event.startsAt.getTime() >= Date.now() ? "upcoming" : "past",
        offers: mapOffers(event.promotions),
      })),
      meta: { total: events.length, filter: normalized },
    };
  }

  @Get(":slug")
  async getBySlug(@Param("slug") slug: string) {
    const event = await this.eventsService.getBySlug(slug);
    return {
      data: {
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt.toISOString(),
        endsAt: event.endsAt?.toISOString() ?? null,
        posterUrl: event.posterUrl,
        collaborator: event.collaborator,
        isFeatured: event.isFeatured,
        statusLabel:
          event.startsAt.getTime() >= Date.now() ? "upcoming" : "past",
        offers: mapOffers(event.promotions),
        lineup: event.lineup.map((row) => ({
          roleLabel: row.roleLabel,
          sortOrder: row.sortOrder,
          stageName: row.artist.stageName,
          socialUrl: row.artist.socialUrl,
          avatarUrl: row.artist.avatarUrl,
        })),
        media: event.media,
      },
    };
  }
}
