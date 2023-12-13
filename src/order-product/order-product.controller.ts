import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { Order_Product } from '@prisma/client';
import { OrderProductDto } from 'src/auth/dto';

@Controller('order-product')
export class OrderProductController {
  constructor(private opService: OrderProductService) {}

  @Get()
  getAll() {
    return this.opService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.opService.getById(Number(id));
  }

  @Post()
  createNew(
    @Body()
    data: {
      id_Order: number;
      id_Pro: number;
      quantity?: number;
      price?: number;
    },
  ): Promise<Order_Product> {
    const { id_Order, id_Pro, quantity, price } = data;
    return this.opService.create({
      quantity,
      price,
      order: { connect: { id_Order: id_Order } },
      product: { connect: { id_Pro: id_Pro } },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: OrderProductDto) {
    return this.opService.update({
      where: { id_Order_Pro: Number(id) },
      data: {
        ...dto,
      },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.opService.delete(Number(id));
  }
}
