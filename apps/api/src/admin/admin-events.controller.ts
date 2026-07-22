import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AdminRoleGuard } from "../auth/admin-role.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminEventsService } from "./admin-events.service";
import {
  CreateArtistDto,
  CreateEventDto,
  ReplaceLineupDto,
  UpdateEventDto,
} from "./dto/admin-events.dto";

type AuthUser = { id: string; email: string; role: string };

@Controller("admin")
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Get("events")
  async listEvents() {
    const events = await this.adminEventsService.listEvents();
    return { data: events, meta: { total: events.length } };
  }

  @Post("events")
  async createEvent(@Body() dto: CreateEventDto, @Req() req: { user: AuthUser }) {
    const event = await this.adminEventsService.createEvent(dto, req.user.id);
    return { data: event };
  }

  @Patch("events/:id")
  async updateEvent(@Param("id") id: string, @Body() dto: UpdateEventDto) {
    const event = await this.adminEventsService.updateEvent(id, dto);
    return { data: event };
  }

  @Put("events/:id/lineup")
  async replaceLineup(
    @Param("id") id: string,
    @Body() dto: ReplaceLineupDto,
  ) {
    const lineup = await this.adminEventsService.replaceLineup(id, dto);
    return { data: lineup };
  }

  @Get("artists")
  async listArtists() {
    const artists = await this.adminEventsService.listArtists();
    return { data: artists, meta: { total: artists.length } };
  }

  @Post("artists")
  async createArtist(@Body() dto: CreateArtistDto) {
    const artist = await this.adminEventsService.createArtist(dto);
    return { data: artist };
  }
}
