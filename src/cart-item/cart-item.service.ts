import { Injectable } from '@nestjs/common';
import { Cart_Item_Dto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItem, Prisma } from '@prisma/client';
@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async createCartItem(
    data: Prisma.CartItemCreateInput,
  ): Promise<Cart_Item_Dto> {
    try {
      const cart_item = await this.prisma.cartItem.create({
        data: data,
      });
      if (cart_item) {
        return cart_item;
      }
    } catch (error) {
      throw new Error('Error creating new cart item');
    }
  }

  async getAllcartItems() {
    try {
      const cart_items = await this.prisma.cartItem.findMany();
      if (cart_items) {
        return cart_items;
      }
    } catch (error) {
      throw new Error('Error getting all cart items!');
    }
  }

  async getCartitemById(id: number): Promise<Cart_Item_Dto> {
    try {
      const cart_item = await this.prisma.cartItem.findUnique({
        where: {
          id: id,
        },
      });
      if (cart_item) {
        return cart_item;
      }
    } catch (error) {
      throw new Error('Error getting cart item');
    }
  }

  async updateCartItem(id: number, dto: Cart_Item_Dto) {
    try {
      console.log('id= ');
      console.log('dto = ', dto);

      const cart_item = await this.prisma.cartItem.update({
        where: {
          id: id,
        },
        data: dto,
      });
      if (cart_item) {
        return cart_item;
      }
    } catch (error) {
      throw new Error('Error updating cart item');
    }
  }

  async deleteCartItem(id: number) {
    try {
      await this.prisma.cartItem.delete({ where: { id: id } });
      return {
        msg: 'cart deleted',
      };
    } catch (error) {
      throw new Error('Error deleting cart item');
    }
  }
}
