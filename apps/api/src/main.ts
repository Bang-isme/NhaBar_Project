import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

function resolveCorsOrigins(): string[] {
  const fromEnv = process.env.WEB_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return ["http://localhost:3000", "http://localhost:3002"];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: resolveCorsOrigins(),
    methods: ["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port);
}

bootstrap();
