import { describe, it, expect, vi } from "vitest";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";

describe("AuthService.login", () => {
  it("returns token for valid credentials", async () => {
    const hash = await bcrypt.hash("ChangeMe123!", 4);
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "u1",
          email: "admin@nhabar.local",
          passwordHash: hash,
          displayName: "Admin",
          role: "ADMIN",
        }),
      },
    };
    const jwtService = {
      signAsync: vi.fn().mockResolvedValue("token-abc"),
    };
    const service = new AuthService(prisma as never, jwtService as never);
    const result = await service.login({
      email: "admin@nhabar.local",
      password: "ChangeMe123!",
    });
    expect(result.data.accessToken).toBe("token-abc");
    expect(result.data.user.email).toBe("admin@nhabar.local");
    expect((result.data.user as { passwordHash?: string }).passwordHash).toBeUndefined();
  });

  it("rejects bad password", async () => {
    const hash = await bcrypt.hash("ChangeMe123!", 4);
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "u1",
          email: "admin@nhabar.local",
          passwordHash: hash,
          displayName: "Admin",
          role: "ADMIN",
        }),
      },
    };
    const service = new AuthService(prisma as never, {
      signAsync: vi.fn(),
    } as never);
    await expect(
      service.login({ email: "admin@nhabar.local", password: "wrong-pass" }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
