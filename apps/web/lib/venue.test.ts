import { describe, it, expect } from "vitest";
import { VENUE } from "./venue";

describe("VENUE", () => {
  it("matches NHÀ Bar Da Nang facts", () => {
    expect(VENUE.address).toBe("35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng, Vietnam");
    expect(VENUE.hours).toBe("11:00 AM – Late");
    expect(VENUE.hoursLabel).toBe("11:00 AM – Late");
    expect(VENUE.facebookUrl).toContain("facebook.com");
  });
});
