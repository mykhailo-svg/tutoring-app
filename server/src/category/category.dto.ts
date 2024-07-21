import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  key: string;
}

export class CreateCategoriesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  @ApiProperty({ type: [CreateCategoryDto] })
  categories: CreateCategoryDto[];
}
