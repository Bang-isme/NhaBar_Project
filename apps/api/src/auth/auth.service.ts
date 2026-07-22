import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      data: {
        accessToken,
        tokenType: "Bearer",
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
      },
    };
  }
}
