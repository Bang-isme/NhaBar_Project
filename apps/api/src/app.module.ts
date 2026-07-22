import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { HealthController } from "./health/health.controller";
import { VenueController } from "./venue/venue.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { EventsController } from "./events/events.controller";
import { EventsService } from "./events/events.service";
import { PromotionsController } from "./promotions/promotions.controller";
import { PromotionsService } from "./promotions/promotions.service";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminModule,
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60_000,
        limit: 120,
      },
    ]),
  ],
  controllers: [
    HealthController,
    VenueController,
    EventsController,
    PromotionsController,
  ],
  providers: [
    EventsService,
    PromotionsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
