/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/auth/dto';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get('hello')
  getHello() {
    return {
      msg: 'Hello',
    };
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Get('/categorys/:category')
  async getProductByCategory(@Param('category') category: string) {
    return await this.productService.getProductByCategory(category);
  }

  @Post()
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
      discount?: number;
      quantity: number;
      sold?: number;
      status: string;
      feature?: boolean;
      slug: string;
      image_Pro?: string;
      id_Cate: number;
    },
  ): Promise<Product> {
    const {
      name,
      price,
      description,
      discount,
      quantity,
      sold,
      status,
      feature,
      slug,
      image_Pro,
      id_Cate,
    } = productData;
    return await this.productService.createProduct({
      name,
      price,
      description,
      discount,
      quantity,
      sold,
      status,
      feature,
      slug,
      image_Pro,
      nameCategory: {
        connect: { id_Cate: id_Cate },
      },
    });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    dto: Product,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<object> {
    return await this.productService.deleteProduct(Number(id));
  }
}
