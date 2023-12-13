import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';
@Injectable({})
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany();
      if (products) {
        return products;
      }
    } catch (error) {
      throw new ForbiddenException('Product not found');
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id_Pro: Number(id) },
      });
      if (product) {
        return product;
      }
    } catch (error) {
      throw new ForbiddenException('can not find product');
    }
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: data,
      });
      return product;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException("can't create product");
    }
  }

  async updateProduct(id: string, data: Product): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: { id_Pro: Number(id) },
        data: data,
      });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id: number): Promise<object> {
    try {
      await this.prisma.product.delete({ where: { id_Pro: id } });
      return {
        msg: 'product deleted',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
