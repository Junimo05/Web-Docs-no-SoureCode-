import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput) {
    try {
      const review = await this.prisma.review.create({
        data: data,
      });
      if (review) {
        return review;
      } else {
        return {
          msg: 'Review not created',
        };
      }
    } catch (error) {
      throw new Error('can not create new review');
    }
  }

  async getAll() {
    try {
      const review = await this.prisma.review.findMany();
      if (review) {
        return review;
      } else {
        return {
          msg: 'Review not found',
        };
      }
    } catch (error) {
      throw new Error('can not get all');
    }
  }

  async getById(id: number) {
    try {
      const review = await this.prisma.review.findUnique({
        where: {
          id_Review: id,
        },
      });
      if (review) {
        return review;
      } else {
        return {
          msg: 'Review not found by id = ' + id,
        };
      }
    } catch (error) {
      throw new Error('can not get review by id ' + id);
    }
  }

  async update(param: {
    data: Prisma.ReviewUpdateInput;
    where: Prisma.ReviewWhereUniqueInput;
  }) {
    try {
      const { data, where } = param;
      const review = await this.prisma.review.update({
        data,
        where,
      });
      if (review) {
        return review;
      } else {
        return {
          msg: 'Review not updated',
        };
      }
    } catch (error) {
      throw new Error('can not update review' + param.where.id_Review);
    }
  }

  async delete(param: { where: Prisma.ReviewWhereUniqueInput }) {
    try {
      const { where } = param;
      const review = await this.prisma.review.delete({
        where,
      });
      if (review) {
        return review;
      } else {
        return {
          msg: 'Review not deleted',
        };
      }
    } catch (error) {
      throw new Error('can not delete review' + param.where.id_Review);
    }
  }
}
