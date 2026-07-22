import { Controller, Get } from "@nestjs/common";
import { VENUE } from "./venue.constants";

@Controller("venue")
export class VenueController {
  @Get()
  getVenue() {
    return { data: VENUE };
  }
}
