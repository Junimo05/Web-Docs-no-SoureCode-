import { Injectable } from '@nestjs/common';
import { OrderProductDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class OrderProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.Order_ProductCreateInput) {
    try {
      console.log('data = ', data);
      const item = await this.prisma.order_Product.create({
        data: data,
      });
      if (item) {
        return item;
      }
    } catch (error) {
      throw new Error('Error creating!');
    }
  }

  async getAll() {
    try {
      const item = await this.prisma.order_Product.findMany();
      if (item) {
        return item;
      }
    } catch (error) {
      throw new Error('Error getting all');
    }
  }

  async getById(id: number) {
    try {
      const item = await this.prisma.order_Product.findUnique({
        where: {
          id_Order_Pro: id,
        },
      });
      if (item) {
        return item;
      } else {
        return {
          msg: 'Product not found by id = ' + id,
        };
      }
    } catch (error) {
      throw new Error('Error getting order item by id: ' + id);
    }
  }

  async update(param: {
    where: Prisma.Order_ProductWhereUniqueInput;
    data: Prisma.Order_ProductUpdateInput;
  }) {
    try {
      const { data, where } = param;
      const item = await this.prisma.order_Product.update({
        data,
        where,
      });
      if (item) {
        return item;
      }
    } catch (error) {
      throw new Error('Error updating order item ');
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.order_Product.delete({
        where: {
          id_Order_Pro: id,
        },
      });
      return {
        message: 'Order item deleted successfully',
      };
    } catch (error) {
      throw new Error('Error deleting order');
    }
  }
}
