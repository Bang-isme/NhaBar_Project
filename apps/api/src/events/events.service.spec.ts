import { describe, it, expect, vi } from "vitest";
import { EventsService } from "./events.service";

describe("EventsService.getFeatured", () => {
  it("returns published featured event fields", async () => {
    const prisma = {
      event: {
        findFirst: vi.fn().mockResolvedValue({
          slug: "jump-out-da-house-rapshow",
          title: "JUMP OUT DA HOUSE // RAPSHOW",
          startsAt: new Date("2026-07-10T12:00:00.000Z"),
        }),
      },
    };
    const service = new EventsService(prisma as never);
    const result = await service.getFeatured();
    expect(result?.title).toContain("JUMP OUT");
    expect(prisma.event.findFirst).toHaveBeenCalled();
  });
});

describe("EventsService.listPublished", () => {
  it("queries upcoming published events", async () => {
    const prisma = {
      event: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const service = new EventsService(prisma as never);
    await service.listPublished("upcoming");
    expect(prisma.event.findMany).toHaveBeenCalled();
    const arg = prisma.event.findMany.mock.calls[0][0];
    expect(arg.where.status).toBe("published");
    expect(arg.where.startsAt.gte).toBeInstanceOf(Date);
  });
});
