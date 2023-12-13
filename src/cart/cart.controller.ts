import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';
import { CartDto } from 'src/auth/dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get()
  getCart() {
    return this.cartService.getAllCart();
  }

  @Post()
  createCart(@Body() data: { id_Cus: number }): Promise<Cart> {
    const { id_Cus } = data;
    return this.cartService.createCart({
      user: { connect: { id_User: id_Cus } },
    });
  }

  @Get(':id')
  getCartById(@Param('id') id: string) {
    return this.cartService.getcartById(Number(id));
  }

  @Patch(':id')
  updateCartById(@Param('id') id: string, @Body() dto: CartDto) {
    return this.cartService.updateCart(Number(id), dto);
  }

  @Delete(':id')
  deleteCartById(@Param('id') id: string) {
    return this.cartService.deleteCart(Number(id));
  }
}
