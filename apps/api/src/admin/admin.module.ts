import { Module } from "@nestjs/common";
import { AdminEventsController } from "./admin-events.controller";
import { AdminEventsService } from "./admin-events.service";

@Module({
  controllers: [AdminEventsController],
  providers: [AdminEventsService],
})
export class AdminModule {}
