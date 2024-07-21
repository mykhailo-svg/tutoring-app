import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoriesDto, CreateCategoryDto } from './category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Category,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCategories(@Body() dto: CreateCategoriesDto) {
    return this.categoryService.createCategories(dto);
  }
}
