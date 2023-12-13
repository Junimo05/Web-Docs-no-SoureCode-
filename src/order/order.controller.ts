import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, Prisma } from '@prisma/client';
import { OrderDto } from 'src/auth/dto';
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('test')
  test() {
    return 'test route';
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }

  @Post()
  createOrder(
    @Body()
    data: {
      id_Cus: number;
      id_Staff: number;
      status: string;
      shipping_fee?: number;
      total?: number;
      id_Coupon: number;
      canceled_at?: string;
      completed_at?: string;
      delivery_at?: string;
    },
  ) {
    const {
      id_Cus,
      id_Staff,
      status,
      shipping_fee,
      total,
      id_Coupon,
      canceled_at,
      completed_at,
      delivery_at,
    } = data;
    return this.orderService.createOrder({
      status,
      shipping_fee,
      total,
      canceled_at,
      completed_at,
      delivery_at,
      couponName: { connect: { id_Coupon: id_Coupon } },
      customerName: { connect: { id_User: id_Cus } },
      staffName: { connect: { id_User: id_Staff } },
    });
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() dto: OrderDto) {
    let canceled_at: Date = null;
    let completed_at: Date = null;
    let delivery_at: Date = null;
    if (dto.canceled_at) {
      canceled_at = new Date(dto.canceled_at);
    }
    if (dto.completed_at) {
      completed_at = new Date(dto.completed_at);
    }
    if (dto.delivery_at) {
      delivery_at = new Date(dto.delivery_at);
    }
    return this.orderService.updateOrder({
      where: { id_Order: Number(id) },
      data: {
        ...dto,
        canceled_at: canceled_at,
        completed_at: completed_at,
        delivery_at: delivery_at,
      },
    });
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(Number(id));
  }
}
