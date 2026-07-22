import { describe, it, expect } from "vitest";
import { formatEventDate, FALLBACK_FEATURED } from "./featured-event";

describe("featured-event", () => {
  it("formats startsAt in vi-VN style with day month", () => {
    const label = formatEventDate("2026-07-10T19:00:00+07:00");
    expect(label).toMatch(/10/);
    expect(label).toMatch(/7|07|tháng/i);
  });

  it("fallback featured keeps LATE SESSION title", () => {
    expect(FALLBACK_FEATURED.title).toContain("LATE SESSION");
  });
});
