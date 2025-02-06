import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
