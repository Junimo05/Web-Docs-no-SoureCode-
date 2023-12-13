import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Category, Product} from '@prisma/client'
@Injectable({})
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getCategory() {
    return await this.prismaService.category.findMany();
  }

  async getCategoryById(id: string) {
    const Id = Number(id);
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id_Cate: Id,
        },
      });
      if (category) {
        return category;
      }
    } catch (error) {
      throw new ForbiddenException('invalid category !');
    }
  }

  async createNewCategory(dto: CategoryDto) {
    try {
      const updateCategory = await this.prismaService.category.create({
        data: {
          name: dto.name,
          description: dto.description,
          image_Cate: dto.image_Cate,
          status: dto.status,
        },
      });
      return updateCategory;
    } catch (error) {
      throw new ForbiddenException(
        'invalid create category! please try again!',
      );
    }
  }

  async updateCategory(id: string, dto: CategoryDto) {
    try {
      const update = await this.prismaService.category.update({
        where: {
          id_Cate: Number(id),
        },
        data: {
          name: dto.name,
          description: dto.description,
          image_Cate: dto.image_Cate,
          status: dto.status,
        },
      });
      return update;
    } catch (error) {
      throw new ForbiddenException('can not update category!');
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.prismaService.category.delete({
        where: {
          id_Cate: Number(id),
        },
      });
      return {
        msg: 'category deleted',
      };
    } catch (error) {
      throw new ForbiddenException('can not delete category!');
    }
  }
}
