import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';
import { CartDto } from 'src/auth/dto';
@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async getAllCart() {
    try {
      const cart = await this.prisma.cart.findMany();
      if (cart) {
        return cart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart(data: Prisma.CartCreateInput) {
    try {
      const cart = await this.prisma.cart.create({
        data: data,
      });
      if (cart) {
        return cart;
      }
    } catch (error) {
      throw new Error('can not create cart!');
    }
  }

  async getcartById(id: number) {
    try {
      const cart = await this.prisma.cart.findMany({
        where: {
          user: {
            id_User: id,
          },
        },
      });
      if (cart) {
        return cart;
      }
    } catch (error) {
      throw new Error('can not find cart with id: ' + id);
    }
  }

  async updateCart(id: number, dto: CartDto) {
    try {
      const cart = await this.prisma.cart.update({
        where: {
          id_Cart: id,
        },
        data: dto,
      });
      if (cart) {
        return cart;
      }
    } catch (error) {
      throw new Error('can not update cart with id: ' + id);
    }
  }

  async deleteCart(id: number) {
    try {
      await this.prisma.cart.delete({ where: { id_Cart: id } });
      return { msg: 'delete cart successfully' };
    } catch (error) {
      throw new Error('can not delete cart with id:' + id);
    }
  }
}
