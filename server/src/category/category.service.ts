import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoriesDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAll() {
    return this.categoriesRepository.find();
  }

  createCategories(body: CreateCategoriesDto) {
    return this.categoriesRepository.save(body.categories);
  }
}
