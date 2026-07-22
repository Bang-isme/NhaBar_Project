import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { EventStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateArtistDto,
  CreateEventDto,
  ReplaceLineupDto,
  UpdateEventDto,
} from "./dto/admin-events.dto";

@Injectable()
export class AdminEventsService {
  constructor(private readonly prisma: PrismaService) {}

  listEvents() {
    return this.prisma.event.findMany({
      orderBy: { startsAt: "desc" },
      include: {
        lineup: {
          orderBy: { sortOrder: "asc" },
          include: { artist: true },
        },
      },
    });
  }

  async createEvent(dto: CreateEventDto, userId: string) {
    try {
      return await this.prisma.event.create({
        data: {
          title: dto.title,
          slug: dto.slug,
          description: dto.description,
          startsAt: new Date(dto.startsAt),
          endsAt: dto.endsAt ? new Date(dto.endsAt) : null,
          posterUrl: dto.posterUrl,
          collaborator: dto.collaborator,
          status: dto.status ?? EventStatus.draft,
          isFeatured: dto.isFeatured ?? false,
          createdById: userId,
        },
      });
    } catch {
      throw new ConflictException({
        error: { code: "SLUG_TAKEN", message: "Event slug already exists" },
      });
    }
  }

  async updateEvent(id: string, dto: UpdateEventDto) {
    const existing = await this.prisma.event.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        error: { code: "EVENT_NOT_FOUND", message: "Event not found" },
      });
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        startsAt: dto.startsAt ? new Date(dto.startsAt) : undefined,
        endsAt:
          dto.endsAt === undefined
            ? undefined
            : dto.endsAt === null
              ? null
              : new Date(dto.endsAt),
        posterUrl: dto.posterUrl === undefined ? undefined : dto.posterUrl,
        collaborator:
          dto.collaborator === undefined ? undefined : dto.collaborator,
        status: dto.status,
        isFeatured: dto.isFeatured,
      },
    });
  }

  async replaceLineup(eventId: string, dto: ReplaceLineupDto) {
    const existing = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!existing) {
      throw new NotFoundException({
        error: { code: "EVENT_NOT_FOUND", message: "Event not found" },
      });
    }

    await this.prisma.eventArtist.deleteMany({ where: { eventId } });
    if (dto.items.length > 0) {
      await this.prisma.eventArtist.createMany({
        data: dto.items.map((item) => ({
          eventId,
          artistId: item.artistId,
          roleLabel: item.roleLabel,
          sortOrder: item.sortOrder,
        })),
      });
    }

    return this.prisma.eventArtist.findMany({
      where: { eventId },
      orderBy: { sortOrder: "asc" },
      include: { artist: true },
    });
  }

  listArtists() {
    return this.prisma.artist.findMany({ orderBy: { stageName: "asc" } });
  }

  async createArtist(dto: CreateArtistDto) {
    try {
      return await this.prisma.artist.create({
        data: {
          stageName: dto.stageName,
          bio: dto.bio,
          socialUrl: dto.socialUrl,
        },
      });
    } catch {
      throw new ConflictException({
        error: {
          code: "ARTIST_EXISTS",
          message: "Artist stage name already exists",
        },
      });
    }
  }
}
