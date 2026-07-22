import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { EventStatus } from "@prisma/client";

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(3)
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startsAt!: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;

  @IsOptional()
  @IsString()
  collaborator?: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string | null;

  @IsOptional()
  @IsString()
  posterUrl?: string | null;

  @IsOptional()
  @IsString()
  collaborator?: string | null;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class LineupItemDto {
  @IsUUID()
  artistId!: string;

  @IsString()
  @MinLength(2)
  roleLabel!: string;

  @IsInt()
  @Min(0)
  sortOrder!: number;
}

export class ReplaceLineupDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineupItemDto)
  items!: LineupItemDto[];
}

export class CreateArtistDto {
  @IsString()
  @MinLength(2)
  stageName!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  socialUrl?: string;
}
