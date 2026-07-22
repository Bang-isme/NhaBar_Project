import { describe, it, expect } from "vitest";
import { VenueController } from "./venue.controller";

describe("VenueController", () => {
  it("returns Da Nang address and late hours", () => {
    const controller = new VenueController();
    const { data } = controller.getVenue();
    expect(data.address).toContain("35 Ngõ Thì Sĩ");
    expect(data.hours).toContain("11:00");
    expect(data.hours).toContain("Late");
    expect(data.facebookUrl).toContain("facebook.com");
  });
});
