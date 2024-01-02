import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoriesRepo.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
