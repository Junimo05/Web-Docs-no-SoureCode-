import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderDto } from 'src/auth/dto';
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    try {
      const orders = await this.prisma.order.findMany();
      if (orders) {
        return orders;
      }
    } catch (error) {
      throw new Error('Failed to get all orders');
    }
  }

  async getOrderById(id: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id_Order: id,
        },
      });
      if (order) {
        return order;
      }
    } catch (error) {
      throw new Error('Failed to get order with id: ' + id);
    }
  }

  async createOrder(data: Prisma.OrderCreateInput) {
    try {
      let canceled_at: Date = null;
      let completed_at: Date = null;
      let delivery_at: Date = null;
      if (data.canceled_at) {
        canceled_at = new Date(data.canceled_at);
      }
      if (data.completed_at) {
        completed_at = new Date(data.completed_at);
      }
      if (data.delivery_at) {
        delivery_at = new Date(data.delivery_at);
      }
      console.log('data = ', data);
      const order = await this.prisma.order.create({
        data: {
          ...data,
          canceled_at: canceled_at,
          completed_at: completed_at,
          delivery_at: delivery_at,
        },
      });
      if (order) {
        return order;
      }
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }

  async updateOrder(param: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }) {
    try {
      const { data, where } = param;
      const order = await this.prisma.order.update({
        data,
        where,
      });
      if (order) {
        return order;
      }
    } catch (error) {
      throw new Error('Failed to update Order');
    }
  }

  async deleteOrder(id: number) {
    try {
      await this.prisma.order.delete({
        where: {
          id_Order: id,
        },
      });
      return {
        message: 'Order deleted successfully',
      };
    } catch (error) {
      throw new Error('Failed to delete Order');
    }
  }
}
