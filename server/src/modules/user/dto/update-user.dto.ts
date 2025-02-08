import { Type } from 'class-transformer';
import {
  IsOptional,
  IsArray,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';

class LevelObjectDto {
  @IsString()
  level: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  languages: Record<string, LevelObjectDto>;
}
