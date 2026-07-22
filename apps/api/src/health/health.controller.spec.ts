import { describe, it, expect } from "vitest";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("returns ok payload", () => {
    const controller = new HealthController();
    expect(controller.getHealth()).toEqual({
      data: { status: "ok" },
    });
  });
});
